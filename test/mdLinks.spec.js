const { mdLinks } = require('../mdLinks');
const { getURLInfo } = require('../src/getLinks')
const {
  makeRequest,
  isThisPathDirectory,
  readFileAsync,
  readDirectoryFiles,
  getHttpStatusCodeMessage
} = require('../src/utils');

const fs = require('fs'); 

jest.mock('../src/utils');
jest.mock('fs');

const mdLinksRegex = /\[.*\]\(\w*:\/\/\w*\.\w*\W?[\w\/-]*\)/g;


describe('mdLinks', () => {

  it('debería rechazar si la ruta no existe', () => {
    fs.existsSync.mockReturnValue(false);
    expect(
      mdLinks('inexistent')
    ).rejects.toThrow("This path doesn't exist, please enter a valid path");
  });

  it('debería rechazar si la extensión no es md', async() => {
    fs.existsSync.mockReturnValue(true);
    isThisPathDirectory.mockReturnValue(false);
    expect(mdLinks('index.js')).rejects.toThrow('Please, put a file with extension "md" (Example: file.md)');
  });

  it('debería regresar objetos con información de un solo archivo', () => {
    const infoLink = {
      href: 'https://google.com',
      text: 'Google',
      status: 301,
      file: 'prueba.md',
      message: 'Moved Permanently',
      ok: 'OK'
    };

    const file = {
      fileName: 'prueba.md',
      data: '[Google](https://google.com)'
    };
    
    fs.existsSync.mockReturnValue(true);
    isThisPathDirectory.mockReturnValue(false);
    readFileAsync.mockResolvedValue(file);
    makeRequest.mockResolvedValue({
      data: 'Google site content',
      status: 301
    });
    getHttpStatusCodeMessage.mockReturnValue('Moved Permanently');
    expect(mdLinks('prueba.md', {validate: true})).resolves.toStrictEqual([infoLink]);
  });

  it('debería regresar objetos con información de un directorio', () => {
    const fileInsideDirectory = ['caca.md'];
    const cacaContent = '[Caca](https://caca.com)';

    fs.existsSync.mockReturnValue(true);
    isThisPathDirectory.mockReturnValue(true);
    readDirectoryFiles.mockResolvedValue(fileInsideDirectory);
    readFileAsync.mockResolvedValue({fileName: 'caca.md', data: cacaContent});
    
    makeRequest.mockResolvedValue(
      {
        data: 'Plain Text',
        status: 200
      }
    );

    getHttpStatusCodeMessage.mockReturnValue('OK');

    const cacaInfo = {
      href: 'https://caca.com', 
      text: 'Caca',
      file: 'caca.md',
      status: 200,
      message: 'OK',
      ok: 'OK'
    };

    expect(mdLinks('validPath/', {validate: true})).resolves.toStrictEqual([cacaInfo]);
  });

  /*
  it('deberia regresar los status de los links de dos archivos', () => {});

  it('debería regresar objetos con información de un directorio usando validate false', () => {});

  it('deberia regresar los status de los links de dos archivos usando valiodate false', () => {});
  */
});
