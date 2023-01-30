const { mdLinks } = require('./mdLinks');

mdLinks('../DEV001-MD-LINKS/prueba2.md')
.then((linksInfo) => {
  console.log(linksInfo);
})
.catch((err) => {
  console.log(err);
})