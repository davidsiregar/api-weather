const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { read } = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

app.post("/", function (req, res) {
	const query = req.body.inputBox;
	const units = "metric";
	const apiKey = "a2162b02c36ddfbdb35334383aa664e9";
	const url =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		query +
		"&appid=" +
		apiKey +
		"&units=" +
		units;

	https.get(url, function (response) {
		console.log(response.statusCode);

		response.on("data", function (data) {
			const weatherData = JSON.parse(data);
			// When receiving data from a web server, the data is always a string. =json
			const temp = weatherData.main.temp;
			// const tempMax = weatherData.main.temp_max;
			const weatherDesc = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

			res.write('<div style="border: 2px dotted">');
			res.write(
				'<h1 style="color:grey;text-align:center; margin-top: 10rem;line-height: 5;border: 3px solid dotted;">'
			);
			res.write("<p>The weather is currently " + weatherDesc + "</p>");
			res.write(
				'<h2 style="color:red;text-align:center;">the temperature in ' +
					query +
					" is " +
					temp +
					" degree celsius " +
					"</h2>"
			);

			res.write(
				' <img style="margin-left: 45rem;border: 1px solid; width: 7rem; "  src=' +
					imageUrl +
					"> "
			);

			res.write("</h1>");
			res.write("</div>");
			res.send();
		});
	});
});

app.listen(3004, function () {
	console.log("server is running");
});

app.post("/", function (req, res) {
	console.log("post request received");
});
