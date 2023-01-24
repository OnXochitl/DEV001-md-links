const makeRequest = require('../src/utils');
const getURLInfo = require('../src/getLinks');

jest.mock('../src/utils');

describe('getURLInfo', () => {

  it('should resolve the link info with validate = false', () => {
    expect(
      getURLInfo('[Google](https://google.com)', false)
    ).resolves.toStrictEqual({
      href: 'https://google.com',
      text: 'Google'
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
      ok: 'ok'
    };

    makeRequest.mockImplementation(() => Promise.resolve(resp));
    expect(getURLInfo('[Google](https://google.com)', true)).resolves.toStrictEqual(infoLink)
  });

  it('should validate a non existent url', () => {
    const resp = {
      status: 404
    };
    const infoLink = {
      href: 'https://googlenotfound.com',
      text: 'Google',
      status: 404,
      ok: 'fail'
    };

    makeRequest.mockImplementation(() => Promise.resolve(resp));
    expect(getURLInfo('[Google](https://googlenotfound.com)', true)).resolves.toStrictEqual(infoLink)
  });

  it('should validate a url even if there is an error', () => {
    const resp = {
      status: 0
    };
    const infoLink = {
      href: 'hffps://gogle.cm',
      text: 'Google',
      status: 0,
      ok: 'fail'
    };

    makeRequest.mockImplementation(() => Promise.reject(resp));
    expect(getURLInfo('[Google](hffps://gogle.cm)', true)).resolves.toStrictEqual(infoLink)
  })
})


