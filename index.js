// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Get request for timestamp
// /api/:date? takes in a date parameter in either unix or utc format
// / if no date is provided, return current date
// / if date is valid, return unix and utc format
// / if date is invalid, return error message
app.get("/api/:id?", (req, res) => { // ':' specifies route parameter
  let date;
  if(req.params.id === undefined) {  
    date = new Date();
    res.json( {"unix": date.getTime(), "utc": date.toUTCString() });
    return;
  }
  else {
    if(isNaN(req.params.id)) { // if date is in utc format
      date = new Date(req.params.id);
    }
    else { // if date is in unix format
      date = new Date(parseInt(req.params.id));
    }
    
    if(date.toString() === "Invalid Date") {
      res.json({ error : "Invalid Date" });
      return;
    }
    res.json( {"unix": date.getTime(), "utc": date.toUTCString() });
  }
}) 

// listen for requests :) 
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
