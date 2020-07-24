const puppeteer = require("puppeteer");

const extractCompanyLogo = async companyName => {
    const browser = await puppeteer.launch({
        args: [
            "--no-sandbox"
        ] 
    });

    var params = encodeURI(`${companyName} logo`);

    const page = await browser.newPage();
    
    await page.goto(`https://www.google.com/search?tbm=isch&q=${params}`);
    
    const result = await page.evaluate(() => {
        const imageSrc = document.querySelector("#islrg > div.islrc > div > a.wXeWr.islib.nfEiy.mM5pbd > div.bRMDJf.islir > img").getAttribute("src");

        return {
            imageSrc
        }
    }).catch(e => {
        console.log(e);
    });

    browser.close();
    return result;
}

module.exports = {
    extractCompanyLogo
}