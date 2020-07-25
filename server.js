const express = require('express');
const { extractFundamentals } = require('./functions/extractFundamentals');
const { extractTechnicals } = require('./functions/extractTechnicals');
const { extractCompanyLogo } = require('./functions/extractCompanyLogo');
const { extractCompanyWebsite } = require('./functions/extractCompanyWebsite');
const bodyParser = require('body-parser');

const app = express();
var port = process.env.PORT || 3100;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Expose-Headers", "X-Auth");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth");
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
	}
	next();
});

app.use(bodyParser.json());

app.post("/tickerblue/fundamentals", (req, res) => {
	const tickerSymbol = req.body.tickerSymbol;

	extractFundamentals(`${tickerSymbol} stock news`).then(result => {
		res.send(result);
	}).catch(e => {
		res.send(status);
	});
});

app.post("/tickerblue/technicals", (req , res) => {
	const tickerSymbol = req.body.tickerSymbol;
	
	extractTechnicals(tickerSymbol).then(result => {
		res.send(result);
	}).catch(e => {
		res.send(status);
	});
});

app.post("/tickerblue/company_logo", (req, res) => {
	const companyName = req.body.companyName;

	extractCompanyLogo(companyName).then(result => {
		res.send(result);
	}).catch(e => {
		res.send(status);
	})
});

app.post("/tickerblue/company_website", (req, res) => {
	const companyName = req.body.companyName;

	extractCompanyWebsite(companyName).then(result => {
		res.send(result);
	}).catch(e => {
		res.send(status);
	})
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});