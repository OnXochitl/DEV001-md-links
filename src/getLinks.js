const makeRequest = require('./utils')

const getURLInfo = (link, validate = false) => {
  const [urlPortion] = link.match(/\(.*:\/\/.*\)/g);
  const url = urlPortion.replace(/[()]/g, '');
  const [textPortion] = link.match(/\[.+\]/g);
  const text = textPortion.replace(/[\[\]]/g, '');

  if (validate) {
    const result = {
      href: url,
      text: text,
      status: 0,
      ok: ''
    };
    return makeRequest(url).then((responseData) => {
        result.status = responseData.status;
        if (result.status >= 200 && result.status <= 399) {
          result.ok = 'ok';
        } else {
          result.ok = 'fail';
        }
        return result;
    }).catch((err) => {
      result.ok = 'fail';
      return result;
    })
  } else {
    return Promise.resolve({
      href: url,
      text: text
    })
  }
}

//console.log(getURLInfo('[Google](https://googlenotfound.com)', true));

//getURLInfo('[Google](https://googlenotfound.com)', true).then((urlInfo) => console.log(urlInfo));

module.exports = getURLInfo;

