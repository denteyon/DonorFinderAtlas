const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
const request = require('request');
module.exports.router = express.Router();

module.exports.router.post("/signup", bodyParser.urlencoded({ extended: false }), (req, res) => {
	var latitude = 0, longitude = 0;
	if (req.body.name && req.body.password && req.body.phone && req.body.blood_type && req.body.address) {
		var geoURL = `https://geocoder.api.here.com/6.2/geocode.json?app_id=xgJpkwVEfD6Irqxucqy2&app_code=TeJKeLplY0w4FE5zrDKzlA&searchtext=${req.body.address}`
		request(geoURL, (error, response, body) => {
			if (error) console.log(error);
			try {
				var geoJSON = JSON.parse(body);
				latitude = geoJSON.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
				longitude = geoJSON.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
			} catch (e) {
			}
			const user = new User({
				name: req.body.name,
				password: req.body.password,
				bloodType: req.body.blood_type,
				latitude: latitude,
				longitude: longitude,
			});
			user.save(e => {
				if (e) console.log(e);
			});
			res.redirect("/map.html");
		});
	}
	else {
		console.log(req.body);
		res.send(500);
	}
});

module.exports.router.get("/donors/:blood_type", (req, res) => {
	let donorTypes;
	switch (req.params.blood_type) {
		case "O+":
			donorTypes = ["O+", "O-"];
			break;

		case "A+":
			donorTypes = ["O+", "O-", "A+", "A-"];
			break;

		case "A-":
			donorTypes = ["O-", "A-"];
			break;

		case "B+":
			donorTypes = ["O+", "O-", "B+", "B-"];
			break;

		case "B-":
			donorTypes = ["O-", "B-"];
			break;

		case "AB+":
			donorTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
			break;

		case "AB-":
			donorTypes = ["O-", "A-", "B-", "AB-"];
			break;

		default:
			donorTypes = ["O-"];
			break;
	}

	User.find({ bloodType: { $in: donorTypes } }).then(docs => {
		res.send(JSON.stringify(docs));
	});
});
