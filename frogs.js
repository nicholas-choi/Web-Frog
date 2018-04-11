var port = 10310;

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// https://expressjs.com/en/starter/static-files.html
app.use(express.static('static-content')); 

app.listen(port, function () {
  	console.log('Example app listening on port '+port);
});
