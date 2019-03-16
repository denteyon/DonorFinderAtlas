const express = require('express');
const bodyParser = require('body-parser');
module.exports.router = express.Router();

module.exports.router.post("/signup", bodyParser.urlencoded({ extended: false }), (req, res) => {
	console.log(req.body.name, req.body.password, req.body.phone);
	res.send("Thanks for signing up!");
	res.end();
});
