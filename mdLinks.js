const { isThisPathDirectory, readDirectoryFiles, readFileAsync } = require('./src/utils');
const { getURLInfo } = require('./src/getLinks');
const fs = require('fs');

const mdLinks = (filePath, options = { validate: false }) => {
  return new Promise((resolve, reject) => {
    const mdLinksRegex = /\[.*\]\(\w*:\/\/\w*\.\w*\W?[\w\/-]*\)/g;

    if (!fs.existsSync(filePath)) {
      return reject(new Error("This path doesn't exist, please enter a valid path"));
    }
    if (isThisPathDirectory(filePath)) {
      readDirectoryFiles(filePath).then((files) => {
        const markdownFiles = files.filter((file) => file.endsWith('.md'));
        const filePromises = [];
        for (let i = 0; i < markdownFiles.length; i++) {
          let fileName = markdownFiles[i];
          filePromises.push(readFileAsync(fileName));
        }
        Promise.all(filePromises).then(fileInfos => {
          // console.log(filePromises)
          const promises = [];
          for (let j = 0; j < fileInfos.length; j++) {
            const links = fileInfos[j].data.match(mdLinksRegex);
            for (let k = 0; k < links.length; k++) {
              promises.push(getURLInfo(links[k], fileInfos[j].fileName, options.validate))
            }
          } 
          Promise.all(promises).then((info) => {
            resolve(info);
          });
        });
      });
    } else {
      if (!filePath.endsWith('.md')) {
        return reject(new Error('Please, put a file with extension "md" (Example: file.md)'));
      }
      const fileName = filePath;
      readFileAsync(fileName).then(fileInfo => {
        const links = fileInfo.data.match(mdLinksRegex);
        const promises = [];
        for (let i = 0; i < links.length; i++) {
          promises.push(getURLInfo(links[i], fileName, options.validate))
        }
        Promise.all(promises).then((info) => {
          resolve(info);
        });
      });
    }
  });
}

//mdLinks('README.md', {validate: true}).then((linksInfo) => console.log(linksInfo));
// mdLinks('../DEV001-MD-LINKS', {validate: true}).then((linksInfo) => console.log(linksInfo));

module.exports = {
  mdLinks
};