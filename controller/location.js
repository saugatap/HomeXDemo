
const request = require('request');

module.exports.location = (req,res)=>{
    let longitude= req.body.longitude; //longitude from json file
    let latitude= req.body.latitude;  //latitude from json file
    let city = JSON.stringify('default'),state = JSON.stringify('default'),country = JSON.stringify('default');
        const url_google="https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&key=AIzaSyBLvbHraQAuxplLf7JP-jloLz4_t_HKlUM";
        request.get({
            "url": url_google
        }, (error, response, body) => {
            if(error)
                res.status(400).send(error);
            let data = JSON.parse(body);  
            if(data.results.length>0) {
            let length =data.results[0].address_components.length;
            if(length>=2)
                country=JSON.stringify(data.results[0].address_components[length-2].long_name);
            if(length>=3)
                state=JSON.stringify(data.results[0].address_components[length-3].long_name);
            if(length>=5)
                city=JSON.stringify(data.results[0].address_components[length-5].long_name);
            let google_location='{ "City" :' +city+',"State" :' +state+',"Country" :' +country+'}';
            res.status(200).send(JSON.parse(google_location));
            }
            else
            res.status(200).send({'error': 'Cannot found'});
        }); 
}

