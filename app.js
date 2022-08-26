const express = require("express")
const https= require("https")
const bodyParser = require("body-parser")

const app=express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
  res.sendFile(__dirname+ "/index.html")
})

app.post("/", function(req, res){
  const query=req.body.inputBox
  const units="metric"
  const apiKey="a2162b02c36ddfbdb35334383aa664e9"
  const url= "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+apiKey+"&units="+units

https.get(url, function(response){
  console.log(response.statusCode);

  response.on("data", function(data){
    const weatherData=JSON.parse(data)
    // When receiving data from a web server, the data is always a string. =json
    const temp =weatherData.main.temp;
    const weatherDesc=weatherData.weather[0].description
    const icon=weatherData.weather[0].icon
    const imageUrl="http://openweathermap.org/img/wn/" + icon + "@2x.png"
    res.write('<div class="container_output">')
    res.write("<p>The weather is currently " + weatherDesc + "</p>")
    res.write(
      "<h1>the temperature in" + query + " is " + temp + " degree celsius "+ "</h1>"
    )
    res.write("<img src=" + imageUrl + ">")
      res.write("</div>")
    res.send()
  })
})
})

app.listen(3004, function(){
  console.log("server is running");
})

app.post("/", function(req,res){
  console.log("post request received");
})