const https = require('node:https');

const makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const responseData = {
      data: '',
      status: 0
    };
    function callbackOnData(data) {
       responseData.data += data;
    }
    function callback(res) {
      res.on('data', callbackOnData);
      res.on('end', callbackOnEnd);
      responseData.status = res.statusCode;
    }
    function callbackOnEnd() {
      resolve(responseData);
    }
    https.get(url, callback).on("error", reject)
  })
}

module.exports = makeRequest;