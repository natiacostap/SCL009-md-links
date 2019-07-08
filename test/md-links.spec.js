const mdLinks = require('../md-links');

describe("mdLinks", () => {
  
  test('Resuelve un objeto con la información de cada link', (done) => {
    return mdLinks.mdLinks('links.md').then(res => {
      expect(res).toEqual([{
        href: 'https://www.w3.org/Protocols/rfc2616/',
        text: 'https://www.w3.org/Protocols/rfc2616/',
        file: '/home/laboratoriad008/Documentos/SCL009-md-links/test/links.md'
      },
      {
        href: 'https://www.w3.org/Protocols/rfc2',
        text: 'https://www.w3.org/Protocols/rfc2',
        file: '/home/laboratoriad008/Documentos/SCL009-md-links/test/links.md'
      },
      {
        href: 'http://www.w3.org',
        text: 'http://www.w3.org',
        file: '/home/laboratoriad008/Documentos/SCL009-md-links/test/links.md'
      }]);
      done()
    });
  });

  test('Resuelve leer los archivos de un directorio', (done) => {
    return mdLinks.mdLinks('../test').then(res => {
      expect(res).toEqual([{
        href: 'https://www.w3.org/Protocols/rfc2616/',
        text: 'https://www.w3.org/Protocols/rfc2616/',
        file: '/home/laboratoriad008/Documentos/SCL009-md-links/test/links.md'
      },
      {
        href: 'https://www.w3.org/Protocols/rfc2',
        text: 'https://www.w3.org/Protocols/rfc2',
        file: '/home/laboratoriad008/Documentos/SCL009-md-links/test/links.md'
      },
      {
        href: 'http://www.w3.org',
        text: 'http://www.w3.org',
        file: '/home/laboratoriad008/Documentos/SCL009-md-links/test/links.md'
      }]);
      done()
    });
  })


})

  
