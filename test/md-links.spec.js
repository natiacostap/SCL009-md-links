const mdLinks = require('../md-links');


describe("mdLinks", () => {
    test('Lee un archivo', () => {
      expect.assertions(1);
      return mdLinks('test/links.md').then(data => {
        expect(data).toEqual([{
          
            href: 'https://www.w3.org/Protocols/rfc2616/',
            text: 'https://www.w3.org/Protocols/rfc2616/',
            file: '/home/laboratoriad008/Escritorio/cortos/links.md'
          },
          {
            href: 'https://www.w3.org/Protocols/rfc2',
            text: 'https://www.w3.org/Protocols/rfc2',
            file: '/home/laboratoriad008/Escritorio/cortos/links.md'
          },
          {
            href: 'http://www.w3.org',
            text: 'http://www.w3.org',
            file: '/home/laboratoriad008/Escritorio/cortos/links.md'
          
        }])
  
    })})
  it("deberia retornar que no encontro archivo", () => {

  })
  it("deberia retornar nada si no hay archivo", () => {

  })
  
  
  // it('deberia retornar  ', () => {

  //   console.log('FIX ME!');
  // });

});
