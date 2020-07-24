const puppeteer = require("puppeteer");

const extractCompanyWebsite = async companyName => {
    const browser = await puppeteer.launch({
        args: [
            "--no-sandbox"
        ] 
    });

    var params = encodeURI(`${companyName} website`);

    const page = await browser.newPage();
    
    await page.goto(`https://www.google.com/search?q=${params}`);
    await page.screenshot({path: "example.png"});

    const result = await page.evaluate(() => {
        const websiteLink = document.querySelector("#rso > div:nth-child(1) > div > div > div.r > a").getAttribute("href");

        return {
            websiteLink
        }
    }).catch(e => {
        console.log(e);
    });

    browser.close();
    return result;
}

module.exports = {
    extractCompanyWebsite
}