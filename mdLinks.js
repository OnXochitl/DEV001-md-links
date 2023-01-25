const { isThisPathDirectory, readDirectoryFiles, readFileAsync } = require('./src/utils');
const { getURLInfo } = require('./src/getLinks');

const mdLinks = (filePath, options = { validate: false }) => {
  return new Promise((resolve, reject) => {
    const mdLinksRegex = /\[.+\]\(.*:\/\/.*\)/g;

    if (isThisPathDirectory(filePath)) {
      readDirectoryFiles(filePath).then((files) => {
        const markdownFiles = files.filter((file) => file.endsWith('.md'));
        const filePromises = [];
        for (let i = 0; i < markdownFiles.length; i++) {
          let fileName = markdownFiles[i];
          filePromises.push(readFileAsync(fileName));
        }
        Promise.all(filePromises).then(fileInfos => {
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

// mdLinks('README.md', {validate: true}).then((linksInfo) => console.log(linksInfo));
mdLinks('../DEV001-MD-LINKS', {validate: true}).then((linksInfo) => console.log(linksInfo));

module.exports = {
  mdLinks
};


