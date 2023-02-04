const { makeRequest, getHttpStatusCodeMessage } = require('../src/utils');
const { getURLInfo } = require('../src/getLinks');

jest.mock('../src/utils');

describe('getURLInfo', () => {

  it('should resolve the link info with validate = false', () => {
    expect(
      getURLInfo('[Google](https://google.com)', 'prueba.md', false)
    ).resolves.toStrictEqual({
      href: 'https://google.com',
      text: 'Google',
      file: 'prueba.md'
    })
  });

  it('should validate a valid url', () => {
    const resp = {
      status: 301
    };
    const infoLink = {
      href: 'https://google.com',
      text: 'Google',
      status: 301,
      file: 'prueba.md',
      message: 'Moved Permanently',
      ok: 'OK'
    };
    
    makeRequest.mockReturnValue(Promise.resolve(resp));
    getHttpStatusCodeMessage.mockReturnValue('Moved Permanently');
    expect(getURLInfo('[Google](https://google.com)', 'prueba.md', true)).resolves.toStrictEqual(infoLink)
  });

  it('should validate a non existent url', () => {
    const resp = {
      status: 404
    };
    const infoLink = {
      href: 'https://googlenotfound.com',
      text: 'Google',
      status: 404,
      file: 'prueba.md',
      message: 'Not Found',
      ok: 'FAIL'
    };

    makeRequest.mockImplementation(() => Promise.resolve(resp));
    getHttpStatusCodeMessage.mockReturnValue('Not Found');
    expect(getURLInfo('[Google](https://googlenotfound.com)', 'prueba.md', true)).resolves.toStrictEqual(infoLink)
  });

  it('should validate a url even if there is an error', () => {
    const resp = {
      status: 0
    };
    const infoLink = {
      href: 'hffps://gogle.cm',
      text: 'Google',
      status: 0,
      file: 'prueba.md',
      message: 'Protocol Not Found',
      ok: 'FAIL'
    };

    makeRequest.mockImplementation(() => Promise.reject(new Error('Protocol Not Found')));
    expect(getURLInfo('[Google](hffps://gogle.cm)', 'prueba.md', true)).resolves.toStrictEqual(infoLink)
  })
})


