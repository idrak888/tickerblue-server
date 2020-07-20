const puppeteer = require("puppeteer");

const extractTechnicals = async symbol => {
    const browser = await puppeteer.launch({
        args: [
            "--no-sandbox"
        ] 
    });

    const page = await browser.newPage();
    
    await page.goto(`https://money.cnn.com/quote/forecast/forecast.html?symb=${symbol}`);
    
    const result = await page.evaluate(() => {
        const forecast = document.querySelector("#wsod_forecasts > div:nth-child(2) > div > img").getAttribute("src");
        const recommendations = document.querySelector("#wsod_analystRecommendationsChart > img").getAttribute("src");
        const eps = document.querySelector("#wsod_forecasts > div.wsod_forecastData > div:nth-child(2) > span").textContent;
        const sales = document.querySelector("#wsod_forecasts > div.wsod_forecastData > div:nth-child(3) > span").textContent;
        const reportingDate = document.querySelector("#wsod_forecasts > div.wsod_forecastData > div:nth-child(4) > span").textContent;

        return {
            forecast: `https:${forecast}`,
            recommendations: `https:${recommendations}`,
            eps,
            sales,
            reportingDate
        };
    }).catch(e => {
        console.log(e);
    });

    browser.close();
    return result;
}

module.exports = {
    extractTechnicals
}