const puppeteer = require("puppeteer");

const extractFundamentals = async searchParams => {
    const browser = await puppeteer.launch({
        args: [
            "--no-sandbox"
        ] 
    });

    var params = encodeURI(searchParams);

    const page = await browser.newPage();
    
    await page.goto(`https://www.google.com/search?q=${params}`);
    await page.$eval("#hdtb-msb-vis > div:nth-child(2) > a", a => a.click());
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    const result = await page.evaluate(() => {
        const elements = document.querySelectorAll("#rso > div > g-card > div > div > div.dbsr > a");
        const articles = [];

        for (let elem of elements) {
            const url = elem.getAttribute("href");
            const title = elem.querySelector("div > div.hI5pFf > div.JheGif.nDgy9d") || elem.querySelector("div > div.JheGif.nDgy9d"); 

            articles.push({url, title: title.textContent});
        }
        
        return {
            articles
        }
    }).catch(e => {
        console.log(e);
    });

    browser.close();
    return result;
}

module.exports = {
    extractFundamentals
}