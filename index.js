const express = require('express');
const app = express();
const expressip = require('express-ip');
const PORT = process.env.PORT || 7000;
const path = require('path');

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
  console.log(ipInfo);
  var message = `Hey, you are browsing from ${ipInfo.city}, ${ipInfo.country}`;
  res.send(message);
    // res.send(req.ipInfo);
});

app.listen(app.get('PORT'), function () {
    console.log('Express started on http://localhost:' +
        app.get('PORT') + '; press Ctrl-C to terminate.');
});
