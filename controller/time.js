const request = require('request');

module.exports.time = (req,res)=> {
    let final_date_obj;
    let longitude = req.body.longitude; //longitude from json file
    let latitude = req.body.latitude;  //latitude from json file
    const ts = ((new Date()).getTime() / 1000);
    const url_google="https://maps.googleapis.com/maps/api/timezone/json?location="+latitude+","+longitude+"&timestamp="+ts+"&key=AIzaSyBLvbHraQAuxplLf7JP-jloLz4_t_HKlUM";
    request.get({
        "url": url_google
    }, (error, response, body) => {
        if(error)
            res.status(400).send(error);
        let data = JSON.parse(body);  
        let rawoffset=parseInt(data.rawOffset);          //rawoffset from google
        let dstoffset=parseInt(data.dstOffset);   
        const ts1 = ((new Date()).getTime() / 1000);       //dstoffset from google
        const time_zone = (ts1+rawoffset+dstoffset)*1000;  //unix local timestamp
        let local_date = new Date(time_zone);         //local date 
        let date_string = '{"Date":'+JSON.stringify(local_date)+'}';     // final date JSON object
        res.status(200).send(JSON.parse(date_string));
    });
}