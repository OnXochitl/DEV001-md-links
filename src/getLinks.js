const { makeRequest } = require('./utils');

const getURLInfo = (link, fileName, validate = false) => {
  const [urlPortion] = link.match(/\(.*:\/\/.*\)/g);
  const url = urlPortion.replace(/[()]/g, '');
  const [textPortion] = link.match(/\[.+\]/g);
  const text = textPortion.replace(/[\[\]]/g, '');

  if (validate) {
    const result = {
      href: url,
      text: text,
      file: fileName,
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
      text: text,
      file: fileName
    })
  }
}

module.exports = {
  getURLInfo
};

