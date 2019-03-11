const location = require('../controller/location');
const weather = require('../controller/weather');
const time = require('../controller/time');
const express = require('express');
const router = express.Router({ mergeParams: true });

router.route('/location').post(location.location);
router.route('/weather').post(weather.weather);
router.route('/time').post(time.time);

module.exports = router;