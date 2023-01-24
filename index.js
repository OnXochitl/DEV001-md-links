const fs = require('fs');
const path = require('node:path');
const chalk = require('chalk');
const fileContent = require('./src/getFile.js');
const getURLInfo = require('./src/getLinks');


const mdLinks = (paths) => {
  let linksInfo = [];
                
 
  return new Promise((resolve, reject) => {
    
    if (path.isAbsolute(paths)) {
      fileContent('README.md');
      for( file in files)

     resolve('La ruta existe');

    } else {

      reject("La ruta no existe, intente con otro");
    }
  });
}

console.log(mdLinks('/DEV001-MD-LINKS/..'));

module.exports = {
  mdLinks
};


