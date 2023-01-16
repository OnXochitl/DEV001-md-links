const { mdLinks } = require('./index');

mdLinks('/DEV001-MD-LINKS/index.js')
.then((es) => {
  console.log(es);
})
.catch((err) => {
  console.log(err);
})