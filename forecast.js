var https = require('https');

var FORECAST_IO_KEY = 'f34cdcbef1e2028089438939098c09f5';
var ZIPCODE_KEY = 'ZwJvwbOdEH9UpRjs4da17WJDBcH70m00TJwpVkDz1NurEOUJ14K91uMDHuLIQLIK';

try {
  var location = process.argv[2];
} catch (e) {
  console.log('The correct usage is: node forecast.js [location]');
  console.error(e);
};

var coordinates;
var request = https.get('https://www.zipcodeapi.com/rest/' + ZIPCODE_KEY + '/info.json/' + location, function(response) {
  var body = '';
  response.on('data', function(chunk) {
    body += chunk;
  });
  response.on('end', function() {
    var location_info = JSON.parse(body);
    coordinates = location_info['lat'] + ',' + location_info['lng'];
    getForecast(coordinates);
  });
});

var getForecast = function(coordinates) {
  var request = https.get('https://api.forecast.io/forecast/' + FORECAST_IO_KEY + '/' + coordinates, function(response) {
    var body = '';
    response.on('data', function(chunk) {
      body += chunk;
    });
    response.on('end', function() {
      var forecast = JSON.parse(body);
      Object.keys(forecast['currently']).forEach(function(key) {
        console.log(key + ': ' + forecast['currently'][key]);
      });
    });
  });
};
