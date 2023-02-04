const { isThisPathDirectory, readFileAsync, readDirectoryFiles } = require('../src/utils')
const { readFile, readdir } = require('node:fs');

jest.mock('node:fs');

const links = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  403: 'Forbidden',
  404: 'Not Found'
}

describe('All functions in file Utils', () => {

  it('Show if the pat given is Directory', () => {
    expect(isThisPathDirectory('../DEV001-MD-LINKS')).toEqual(true);
  });

  it('Read the file given', () => {
    const resp = {
      fileName: '../DEV001-MD-LINKS/prueba.md',
      data: '[UNO](1://uno.com)\n[dos](2://dos.com)'
    }
     readFile.mockReturnValue(Promise.resolve(resp))
    // readFile.mockImplementation((path, options, callback) => {
    //   callback
    // })
    expect(readFileAsync('../DEV001-MD-LINKS/prueba.md')).resolves.toEqual(resp);
  });

  // it('Read the file given if return error', () => {
  //   const resp = {};
  //   readFile.mockImplementation(() => Promise.reject(new Error('octopus')))
  //   expect(readFileAsync('../DEV001-MD-LINKS/prueba.md')).rejects.toThrow('Custom error');
  // });

  it('Read the directory given', () => {
    const resp = ['pruebaDos.md', 'pruebaUno.md']
    readdir.mockReturnValue(Promise.resolve(resp))
    expect(readDirectoryFiles('../DEV001-MD-LINKS/PruebaMarkdown')).resolves.toEqual(resp);
  });



})