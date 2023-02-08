const fs = require('fs')
const https = require('node:https');
const { readFile, readdir } = require('node:fs');

const httpStatusCodes = {
  100: 'Continue',
  101: 'Switching Protocols',
  103: 'Early Hints',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status ',
  208: 'Already Reported ',
  226: 'IM Used ',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  306: 'unused',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required Experimental',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'Im a teapot',
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  425: 'Too Early Experimental',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  510: 'Not Extended',
  511: 'Network Authentication Required'
};

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

const readFileAsync = (path, options = { encoding: 'utf-8' }) => {
  return new Promise((resolve, reject) => {
    const callback = (error, data) => {
      error ? reject(error) : resolve({fileName: path, data});
    };
    readFile(path, options, callback);
  });
}

const readDirectoryFiles = (path, options) => {
  return new Promise((resolve, reject) => {
    const callback = (error, files) => {
      error ? reject(error) : resolve(files);
    };
    readdir(path, options, callback); 
  })
}

const isThisPathDirectory = (path) => fs.statSync(path).isDirectory();

const getHttpStatusCodeMessage = (code) => httpStatusCodes[code];

const stats = (links) => {
  const linksUniques = new Set(links.map(link => link.href)).size;
  return {
    total: links.length,
    uniques: linksUniques
  }
}

const statsBroken = (links) => {
  const linksUniques = new Set(links.map(link => link.href)).size;
  const linksBroken = links.filter(link => link.ok === 'FAIL').length;
  return {
    total: links.length,
    uniques: linksUniques,
    broken: linksBroken
  }
}

// const getLinksInFile = (links, fileInfo, options) => {
//   const promises = [];
//   for (let k = 0; k < links.length; k++) {
//     promises.push(getURLInfo(links[k], fileInfo, options))
//   }
//   return promises;
// }


// console.log(isThisPathDirectory('../DEV001-MD-LINKS'));
// console.log(isThisPathFile('../DEV001-MD-LINKS'));
// console.log(readFilesinDirectory('../DEV001-MD-LINKS'));

module.exports = {
  makeRequest,
  isThisPathDirectory,
  readFileAsync,
  readDirectoryFiles,
  getHttpStatusCodeMessage,
  stats,
  statsBroken
};