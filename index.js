// const fs = require('fs');
// const path = require('node:path');
// const chalk = require('chalk');
// const fileContent = require('./src/getFile.js');
// const getURLInfo = require('./src/getLinks');


// const mdLinks = (paths) => {
//   let linksInfo = [];
                
 
//   return new Promise((resolve, reject) => {
    
//     if (path.isAbsolute(paths)) {
//       fileContent('README.md');
//       for( file in files)

//      resolve('La ruta existe');

//     } else {

//       reject("La ruta no existe, intente con otro");
//     }
//   });
// }

// console.log(mdLinks('/DEV001-MD-LINKS/..'));

// module.exports = {
//   mdLinks
// };


// const mdLinks = (path, option) =>
//   new Promise((resolve, reject) => {
//     const pathAbsolute = paths.isAbsolute(path)? path: pathconvertToAbs(path);
//     if (fs.existsSync(path)) {
//       const filterArray = filterTheMdLinks(pathAbsolute);
//       if (filterArray.length === 0) {
//         reject('THERE ARE NO ".MD" FILES, TRY ENTERING ANOTHER PATH MARKDOWN');
//       }
//       readFileAndSearchLinks(filterArray).then((response) =>{
//       if(option.validate === true){
//       validateLinks(response).then((arrOfLinks) =>{
//         resolve(arrOfLinks)
//       })
//     }
//     if(option.validate === false){
//       resolve(response)
//     }
//       })

//     }
//     else{
//       reject('THE ROUTE DOES NOT EXIST, TRY WITH ANOTHER PATH')
//     }


//   });