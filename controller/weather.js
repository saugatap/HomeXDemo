const request = require('request');

module.exports.weather = (req,res)=> {
    let longitude = req.body.longitude; //longitude from json file
    let latitude = req.body.latitude;  //latitude from json file
    const url="https://api.darksky.net/forecast/b660bda1d96cc4ed5e84e9bffe2cb549/"+latitude+","+longitude;
    request.get({
        "url": url
    }, (error, response, body) => {
        if(error)
            res.status(400).send(error);
        let dat=JSON.parse(body); 
        var weather='{"latitude":'+JSON.stringify(dat.latitude)+',"longitude":'+JSON.stringify(dat.longitude)+',"timezone":'+JSON.stringify(dat.timezone)+',"Weather_Summary":'+JSON.stringify(dat.currently.summary)+',"Temperature":'+JSON.stringify(dat.currently.temperature)+',"Icon":'+JSON.stringify(dat.currently.icon)+',"Humidity":'+JSON.stringify(dat.currently.humidity)+',"Windspeed":'+JSON.stringify(dat.currently.windSpeed)+'}';
        res.status(200).send(JSON.parse(weather));
    });
}