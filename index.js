const express = require('express');
const app = express();
const expressip = require('express-ip');
const PORT = process.env.PORT || 7000;
const path = require('path');
const lookup = require('country-code-lookup')

app.use(expressip().getIpInfoMiddleware);


app.set("PORT", PORT);

app.get('/', function (req, res) {
  // {
  //   "ip": "182.253.87.181",
  //   "range": [
  //   3070056192,
  //   3070056447
  //   ],
  //   "country": "ID",
  //   "region": "",
  //   "eu": "0",
  //   "timezone": "Asia/Jakarta",
  //   "city": "",
  //   "ll": [
  //   -6.175,
  //   106.8286
  //   ],
  //   "metro": 0,
  //   "area": 1000
  //   }

  const ipInfo = req.ipInfo;
  // console.log(ipInfo);

  var negara = lookup.byFips(ipInfo.country);
  
  if (negara == null) {
    var negara = lookup.byFips(ipInfo.country);
    if (negara == null) {
      var negara = lookup.byIso(ipInfo.country);
      if (negara == null) {
        var negara = lookup.byInternet(ipInfo.country);
        if (negara == null) {
          var negara = lookup.byInternet("US");
        }
      }
    }
  }
  
  console.log(negara.country)
  
  // res.send(req.ipInfo);
    var test = `<p id="ipnya">${ipInfo.ip}</p>
    <p id="negaranya">${negara.country}</p>
    <p id="timezonenya">${ipInfo.timezone}</p>`;
    res.send(test)
});

app.listen(app.get('PORT'), function () {
    console.log('Express started on http://localhost:' +
        app.get('PORT') + '; press Ctrl-C to terminate.');
});
