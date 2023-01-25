const fs = require('fs')
const https = require('node:https');
const { readFile, readdir } = require('node:fs');

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

const isThisPathFile = (file) => fs.statSync(file).isFile();

// console.log(isThisPathDirectory('../DEV001-MD-LINKS'));
// console.log(isThisPathFile('../DEV001-MD-LINKS'));
// console.log(readFilesinDirectory('../DEV001-MD-LINKS'));

module.exports = {
  makeRequest,
  isThisPathDirectory,
  readFileAsync,
  readDirectoryFiles
};