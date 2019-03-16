const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
module.exports.router = express.Router();

module.exports.router.post("/signup", bodyParser.urlencoded({ extended: false }), (req, res) => {
	if (req.body.name && req.body.password && req.body.phone && req.body.blood_type && req.body.longitude && req.body.latitude) {
		const user = new User({
			name: req.body.name,
			password: req.body.password,
			bloodType: req.body.blood_type,
			latitude: req.body.longitude,
			longitude: req.body.latitude,
		});
		user.save(e => {
			if (e) console.log(e);
		});
		res.redirect("/map.html");
	}
	else {
		console.log(req.body);
		res.send(500);
	}
});
