var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const yelp = require('yelp-fusion');

var app = express();

const apikey='i7MVjdCQOjkDh6_A06Lvj6yA_fJ0bkCAc5ABL-MwSxEKFzMfDq-ZIvwHlwPZKIpekQoanWIDPZtlUxnq7sn_oyz2gG9KzhlbIcC9bcA8zW4p_EvD-yCLymWI916lW3Yx';

//We need to use body parser to parse HTML POST requests
app.use(bodyParser());

app.get('/', function (req, res) {
  res.sendFile('home.html', {root:path.join(__dirname, '../landing-page')});
});

app.post('/submit-form', (req, res) => {
  const postcode = req.body.postcode;
  const searchRequest = {location: postcode};
  const client = yelp.client(apikey);
  client.search(searchRequest).then(response => {
  	const firstResult = response.jsonBody.businesses[0];
  	const prettyJson = JSON.stringify(firstResult, null, 4);
  	console.log(prettyJson);
  	res.send(prettyJson);
  }).catch(e=> {
  	console.log(e);
  });
  res.end();
});

app.listen(5000, function () {
  console.log('Example app listening on port 3000!');
});

