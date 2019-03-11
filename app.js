// defining express pre-requisities
var express = require('express');
var app = express();
var routes = require('./router/routes');
var router = express.Router();//port number
var port = 3000;

//middlewares
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT');
  next();
});
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT');
  next();
});
app.get('/', (req, res, next) => {
    console.error(`${req.ip} tried to reach ${req.originalUrl}`);
    let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`);
    err.statusCode = 404;
    next(err);
  });
  
  // ToDo 
  // API token management functions
app.use('/panel',routes);
// // // //listening
app.listen(port,()=>{
    console.log(`server running at ${port}`);
})
module.exports = app;
