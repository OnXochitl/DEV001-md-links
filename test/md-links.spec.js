const { mdLinks } = require('../index.js');


describe('mdLinks', () => {

  // it('debería devolver una promesa', () => {
  //   expect(mdLinks()).toBeInstanceOf(Promise);
  // });
  it('debería rechazar si el path no existe', () => {
    return mdLinks('/noexiste/archivo.md').catch((err) => {
      expect(err).toBe('La ruta no existe, intente con otro');
    })
  });

});
