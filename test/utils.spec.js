const {
  isThisPathDirectory,
  readFileAsync,
  readDirectoryFiles,
  stats,
  statsBroken,
  makeRequest
} = require('../src/utils')
const { readFile, readdir } = require('node:fs');
const https = require('node:https');

jest.mock('node:fs');
jest.mock('node:https');

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
    readFile.mockResolvedValue(resp);
    expect(readFileAsync('../DEV001-MD-LINKS/prueba.md')).resolves.toEqual(resp);
  });

  it('Read the directory given', () => {
    const resp = ['pruebaDos.md', 'pruebaUno.md']
    readdir.mockResolvedValue(resp);
    expect(readDirectoryFiles('../DEV001-MD-LINKS/PruebaMarkdown')).resolves.toEqual(resp);
  });

  it('should get total and unique stats', () => {
    const resultStats = stats([
      {href: 'google.com'},
      {href: 'google.com'},
      {href: 'facebook.com'},
      {href: 'instagram.com'},
      {href: 'linkedin.com'}
    ]);

    expect(resultStats).toStrictEqual({
      total: 5, uniques: 4
    });
  });

  it('should get total, unique and broken stats', () => {
    const resultStats = statsBroken([
      {href: 'google.com', ok: 'OK'},
      {href: 'google-not-found.com', ok: 'FAIL'},
      {href: 'facebook.com', ok: 'OK'},
      {href: 'instagram.com', ok: 'OK'},
      {href: 'linkedin-not-found.com', ok: 'FAIL'}
    ]);

    expect(resultStats).toStrictEqual({
      total: 5, uniques: 5, broken: 2
    });
  });

  it('should readFileAsync', () => {
    readFile.mockImplementation((path, options, callback) => {
      callback(new Error('Error readFileAsync'));
    });
    expect(readFileAsync('.')).rejects.toThrow('Error readFileAsync');

    readFile.mockImplementation((path, options, callback) => {
      callback(null, 'File Content');
    });
    expect(readFileAsync('.')).resolves.toStrictEqual(
      {'data': 'File Content', 'fileName': '.'}
    );
  });

  it('should readDirectoryFiles', () => {
    readdir.mockImplementation((path, options, callback) => {
      callback(new Error('Error readDirectoryFiles'));
    });
    expect(readDirectoryFiles('.')).rejects.toThrow('Error readDirectoryFiles');

    readdir.mockImplementation((path, options, callback) => {
      callback(null, ['a.js', 'b.md']);
    });
    expect(readDirectoryFiles('.')).resolves.toStrictEqual([
      'a.js', 'b.md'
    ]);
  });

  it('should makeRequest', () => {
    https.get.mockImplementation((url, callback) => {
      const on = jest
        .fn()
        .mockImplementationOnce((event, onCallback) => {onCallback("Google Content")})
        .mockImplementationOnce((event, onCallback) => {onCallback()});

      const res = {on: on, statusCode: 200};
      callback(res);
    });

    expect(
      makeRequest('google.com')
    ).resolves.toStrictEqual({
      data: 'Google Content',
      status: 200
    });
  });

})
