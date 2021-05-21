const { urlencoded } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.use(bodyParser.urlencoded());

app.post("/", function(req, res){
    const query = req.body.CityName;
    const appKey = "f0871c43120c0140cc58eed8ea2e485b";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const icons = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/"+icons+"@2x.png";
        const describe = weatherData.weather[0].description;
        const feels_lyk = weatherData.main.feels_like;
        res.write("<h1>The description of the weather is: " +describe+ "</h1>")
        res.write("<p>The Weather in "+query+" Feels like " +feels_lyk+ " degrees Celcius");
        res.write("<br><img src=" +imageURL+ ">");
        res.send();
    })
})
})



app.listen(3000, function(){
    console.log("Server is running on port 3000");
})