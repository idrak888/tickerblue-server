const puppeteer = require("puppeteer");

const extractFundamentals = async searchParams => {
    const browser = await puppeteer.launch({
        args: [
            "--no-sandbox"
        ] 
    });

    var params = encodeURI(searchParams);

    const page = await browser.newPage();
    
    await page.goto(`https://news.google.com/search?q=${params}`);

    const result = await page.evaluate(() => {
        const elements = document.querySelectorAll("#yDmH0d > c-wiz > div > div.FVeGwb.CVnAc.Haq2Hf.bWfURe > div.ajwQHc.BL5WZb.RELBvb > div > main > c-wiz > div.lBwEZb.BL5WZb.xP6mwf > div > div > article");
        const articles = [];
        
        for (let i=0;i<10;i++) {
            var title = elements[i].querySelector("h3").textContent;
            var url = elements[i].querySelector("h3 > a").getAttribute("href");
            url = url.replace(".", "https://news.google.com");

            articles.push({title, url});
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