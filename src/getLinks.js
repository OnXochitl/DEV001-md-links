const { makeRequest, getHttpStatusCodeMessage } = require('./utils');

//   const [urlPortion] = link.match(/\(.*:\/\/.*\)/g);
//   const [url] = urlPortion.replace(/\[.*\]/g, '');
//   const url2 = url.replace(/[\[()\]]/g, '');
//   // const url2 = url.replace(/[\[\]]/g, '');
//   const [textPortion] = link.match(/\[.+\]/g);
//   const text = textPortion.replace(/[\[\]]/g, '');

const getURLInfo = (link, fileName, validate = false) => {
  const urlPortion = link.replace(/\[.*\]/g, '');
  const url = urlPortion.replace(/[\[()\]]/g, '');
  const [textPortion] = link.match(/\[.+\]/g);
  const text = textPortion.replace(/[\[\]]/g, '');

  if (validate) {
    const result = {
      href: url, 
      text: text,
      file: fileName,
      status: 0,
      message: '',
      ok: ''
    };
    return makeRequest(url).then((responseData) => {
     
      result.status = responseData.status;
      result.message = getHttpStatusCodeMessage(responseData.status);
      if (result.status >= 200 && result.status <= 302) {
        result.ok = 'OK';
      } else {
        result.ok = 'FAIL'
      }
      return result;
    }).catch((err) => {
      result.message = err.message;
      result.ok = 'FAIL'
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

