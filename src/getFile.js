const fs = require('fs');

const mdLinksRegex = /\[.+\]\(.*:\/\/.*\)/g;


const getLinksfromMD = (file) => {
  const fileContent = fs.readFileSync(file, 'utf-8');
  const markdownLinks = fileContent.match(mdLinksRegex);
  return markdownLinks;
}

module.exports = {
  getLinksfromMD
};
