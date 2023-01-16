const fs = require('fs');
const { get } = require('https');

// import { fs } from fs;

// fs.readFile('index.html', 'utf-8', (err, contenido) => {
//   if(err) {
//     throw err;
//   }
//   else {
//     console.log(contenido);
//   }
// });

// fs.rename('index.html', 'main.html', (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('Se actualizó el nombre');
// })

// fs.appendFile('index.html', '<p>Holiwis</p>', (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('Se agregó el contenido deseado');
// })

// fs.writeFile('index.html', 'Contenido nuevo', (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('Se actualizó el contenido');
// })

const texto = `
# Markdown Links

## Índice

* [1. Preámbulo](https://google.com)
* [2. Resumen del proyecto](https://fwevcwecew)
* [3. Objetivos de aprendizaje](https://google.com)
* [4. Consideraciones generales](https://fwevcwecew.com)
* [5. Criterios de aceptación mínimos del proyecto](https://google.com)
* [6. Entregables](https://google.com)
* [7. Hacker edition](https://google.com)
* [8. Pistas, tips y lecturas complementarias](https://google.com)
* [9. Achicando el problema](https://google.com)
* [10. Para considerar Project Feedback](https://google.com)
`;

const links = texto.match(/\((.*)\)/gm);

const getLinksFromMarkdown = (texto) => {  
  const lineas = texto.split('*');
  const urls = [];
  for (let i = 0; i !== lineas.length; i++) {
    const linea =  lineas[i];
    const link = linea.split('(');
    const url = link[1];

    if (url !== undefined) {
      urls.push(url.slice(0, -2));
    }
  }
  console.log(urls);
  return urls;
};



console.log(getLinksFromMarkdown(texto));
