const puppeteer = require("puppeteer");

const extractFundamentals = async searchParams => {
    const browser = await puppeteer.launch({
        args: [
            "--no-sandbox"
        ] 
    });

    const params = encodeURI(searchParams);

    const page = await browser.newPage();

    await page.goto(`https://www.google.com/search?q=${params}`);
    await page.click("#hdtb-msb-vis > div:nth-child(2) > a");
    
    await page.screenshot({path: "example.png"});
    
    const result = await page.evaluate(() => {
        const elements = document.querySelectorAll("#rso > div > g-card > div > div > div.dbsr > a");
        const articles = [];

        for (let el of elements) {
            const title = el.querySelector("div > div.hI5pFf > div.JheGif.nDgy9d").textContent;
            const url = el.getAttribute("href");

            articles.push({title, url});
        }

        console.log(articles);
        return {
            articles
        };
    }).catch(e => {
        console.log(e);
    });

    browser.close();
    return result;
}

module.exports = {
    extractFundamentals
}