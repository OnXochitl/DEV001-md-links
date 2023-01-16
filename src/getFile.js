const fs = require('fs');
const chalk = require('chalk');
const marked = require('marked');

const mdLinksRegex = /\[.+\]\(.*:\/\/.*\)/g;
const linksInData = /\[.{4,40}\]/g;

let fileContent = (paths) => { fs.readFile(paths, 'utf-8', (err, data) => {
  if (err) throw err;
  let dataLinks = chalk.bgMagenta(data.match(mdLinksRegex));
  console.log(dataLinks.match(linksInData));
  })
}

fileContent('README.md');

module.exports = {
  fileContent
};
