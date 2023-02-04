const { mdLinks } = require('../mdLinks');
const { getURLInfo } = require('../src/getLinks')
const { makeRequest, isThisPathDirectory,
  readFileAsync, readDirectoryFiles,
  getHttpStatusCodeMessage, } = require('../src/utils');

jest.mock('../src/utils');
jest.mock('../src/getLinks');

const mdLinksRegex = /\[.*\]\(\w*:\/\/\w*\.\w*\W?[\w\/-]*\)/g;


describe('mdLinks', () => {

  it('debería rechazar si la extensión no es md', async() => {
    expect(mdLinks('../DEV001-MD-LINKS/cli.js')).rejects.toEqual('Please, put a file with extension "md" (Example: file.md)');
  });

  it('debería regresar objetos con información de un solo archivo', () => {
    
    const resp = {
      status: 301
    };

    const infoLink = [{
      href: 'https://google.com',
      text: 'Google',
      status: 301,
      file: '../DEV001-MD-LINKS/prueba.md',
      message: 'Moved Permanently',
      ok: 'OK'
    }];

    const infoStatusMessage = {
      message: 'Moved Permanently',
    };

    const file = {
      fileName: '../DEV001-MD-LINKS/prueba.md',
      data: '[Google](https://google.com)'
    };

    const dataLinks = {
      href: 'https://google.com',
      text: 'Google',
      status: 301,
      file: '../DEV001-MD-LINKS/prueba.md',
      message: 'Moved Permanently',
      ok: 'OK'
    };
    
    readFileAsync.mockImplementation(() => Promise.resolve(file));
    makeRequest.mockReturnValue(Promise.resolve(resp));
    getHttpStatusCodeMessage.mockReturnValue(infoStatusMessage);
    getURLInfo.mockReturnValue(dataLinks);
    expect(mdLinks('../DEV001-MD-LINKS/prueba.md')).resolves.toStrictEqual(infoLink);
  });

  // it('debería regresar objetos con información de un directorio', () => {
    
  //   const resp = [{
  //     status: 301
  //   },
  //   {
  //     status: 200
  //   },
  //   {
  //     status: 0
  //   },
  //   {
  //     status: 301
  //   }];

  //   const infoLink = [
  //     {
  //       href: 'https://facebook.com',
  //       text: 'Facebook',
  //       file: 'prueba.md',
  //       status: 301,
  //       message: 'Moved Permanently',
  //       ok: 'OK'
  //     },
  //     {
  //       href: 'https://regex101.com/',
  //       text: 'Regex',
  //       file: 'prueba2.md',
  //       status: 200,
  //       message: 'OK',
  //       ok: 'OK'
  //     },
  //     {
  //       href: 'https://googlenotfound.com',
  //       text: 'Google not Found',
  //       file: 'prueba2.md',
  //       status: 0,
  //       message: 'getaddrinfo ENOTFOUND googlenotfound.com',
  //       ok: 'FAIL'
  //     },
  //     {
  //       href: 'https://google.com',
  //       text: 'Google',
  //       file: 'prueba2.md',
  //       status: 301,
  //       message: 'Moved Permanently',
  //       ok: 'OK'
  //     }
  //   ];

  //   const infoStatusMessage = [{
  //     message: 'Moved Permanently'
  //   },
  //   {
  //     message: 'OK'
  //   },
  //   {
  //     message: 'getaddrinfo ENOTFOUND googlenotfound.com'
  //   },
  //   {
  //     message: 'Moved Permanently'
  //   }];

  //   const files = [
  //     '.editorconfig',     '.eslintrc',
  //     '.git',              '.gitignore',
  //     '.vscode',           'Marks',
  //     'PruebaMarkdown',    'cli.js',
  //     'coverage',          'index.js',
  //     'mdLinks.js',        'node_modules',
  //     'package-lock.json', 'package.json',
  //     'prueba.js',         'prueba.md',
  //     'prueba2.md',        'script.js',
  //     'src',               'test',
  //     'thumb.png'
  //   ];

  //   const file =[{
  //     fileName: 'prueba.md',
  //     data: '[Facebook](https://facebook.com)'
  //   },
  //   {
  //     fileName: 'prueba2.md',
  //     data: '[Regex](https://regex101.com/)'
  //   },
  //   {
  //     fileName: 'prueba2.md',
  //     data: '[Google not Found](https://googlenotfound.com)'
  //   },
  //   {
  //     fileName: 'prueba2.md',
  //     data: '[Google](https://google.com)'
  //   }];

  //   const fileInfos = [
  //     { fileName: 'prueba.md', data: '[Facebook](https://facebook.com)' },
  //     {
  //       fileName: 'prueba2.md',
  //       data: '[Regex](https://regex101.com/)\n' +
  //         '\n' +
  //         '[Google not Found](https://googlenotfound.com)\n' +
  //         '\n' +
  //         '[Google](https://google.com)'
  //     }
  //   ];
    
  //   const dataLinks = [
  //     {
  //       href: 'https://facebook.com',
  //       text: 'Facebook',
  //       file: 'prueba.md',
  //       status: 301,
  //       message: 'Moved Permanently',
  //       ok: 'OK'
  //     },
  //     {
  //       href: 'https://regex101.com/',
  //       text: 'Regex',
  //       file: 'prueba2.md',
  //       status: 200,
  //       message: 'OK',
  //       ok: 'OK'
  //     },
  //     {
  //       href: 'https://googlenotfound.com',
  //       text: 'Google not Found',
  //       file: 'prueba2.md',
  //       status: 0,
  //       message: 'getaddrinfo ENOTFOUND googlenotfound.com',
  //       ok: 'FAIL'
  //     },
  //     {
  //       href: 'https://google.com',
  //       text: 'Google',
  //       file: 'prueba2.md',
  //       status: 301,
  //       message: 'Moved Permanently',
  //       ok: 'OK'
  //     }
  //   ];
    
  //   isThisPathDirectory.mockReturnValue(true);
  //   readDirectoryFiles.mockImplementation(() => Promise.resolve(files.filter((filee) => filee.endsWith('.md'))))
  //   readFileAsync.mockImplementation(() => Promise.resolve(file));
  //   makeRequest.mockReturnValue(Promise.resolve(resp));
  //   getHttpStatusCodeMessage.mockReturnValue(infoStatusMessage);
  //   getURLInfo.mockReturnValue(dataLinks);
  //   expect(mdLinks('../DEV001-MD-LINKS')).resolves.toStrictEqual(infoLink);
  // });

});
