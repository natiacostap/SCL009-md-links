const fs = require('fs');
const path = require('path');
const FileHound = require('filehound');
const marked = require('marked');
const fetch = require('node-fetch');
const chalk = require('chalk');

let linksDone = [];

// lee lo que se ingresa en consola
let route = process.argv[2];
//convierte ruta relativa en absoluta
route = path.resolve(route);

// console.log("Resolve:", route);
//arregla errores que pueda tener la ruta
route = path.normalize(route);
// console.log("Normalize:", route);
let option = process.argv[3]
let bothOption = {
  one:process.argv[3], 
  two: process.argv[4]
}



// lee la extencion que tiene el archivo
let extFile = path.extname(route)
// console.log(extFile);

//fx que revisa los archivos de un directorio entregandole una ruta
const getFilesFromFilehound = (path) => {
  return new Promise ((resolve, reject) => { 
  const files = FileHound.create()
    .discard('nodes_modules')
    .paths(route)
    .ext('md')
    .find();

  files
    .then(res => {
      //array vacio para meter los archivos que se encuentran en el directorio
      let filesFilehound = {};
      // filesFilehound = res;
      // recorre los archivos que encontro y luego pasa funcion links
      res.forEach(element => {
        filesFilehound =element
      })
        getLinksFromFile(filesFilehound)
          .then(res=>{
            console.log('coonsole de arriba',res)
           resolve(res)
          })
      
    });
  })
};
//getFilesFromFilehound(route)

//fx que lee los archivos y extrae los links que hay dentro
const getLinksFromFile = (path) => {
  return new Promise ((resolve, reject) => { 
  fs.readFile(path, 'utf-8', (error, data) => {
    if (error) {
    reject(error);
    }
    const renderer = new marked.Renderer();
    // array vacio para meter info del archivo que leemos
    let links = [];
    renderer.link = function (href, title, text) {
      links.push({
        // link que encuentra
        href: href,
        //texto que aparece dentro
        text: text,
        //ruta archivo
        file: path,
      });
    }
    marked(data, {
      renderer: renderer})
    // if (option.one === '--validate' || option.two === '--validate') {
    //   checkLinks(links)
    //     .then(res => {
    //      console.log(res)
    //     })
    // } 
    // if (option.one === '--stats' || option.two === '--stats') {
    //   linkStats(links)
    //     .then(res => {
    //       console.log(res)
    //     })
    // }else
    resolve(links)
  })
})
};
//getLinksFromFile(route)
// .then( res=>{
//   console.log(res)
// })
// .catch(err => {
//   console.log(err)
// });


//Fx para validar los links que entreguen fxs de readfile
const checkLinks = (arr) => {
  return Promise.all(  arr.map(el => {
  return new Promise((resolve, reject) => {
      fetch(el.href)
        .then(res => {
          el.status = res.status;
          el.statusText = res.statusText
          resolve(el)
        })
        .catch(err => {
          reject('Error', err);
        })
    })
  }))
};

//Fx para chekear si es un directorio o un archivo. Retorna true o false
const isDirectory = (path) => {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (err, stats) => {
      if (err) {
        reject(err)
        //console.log(err); //Handle error
      }
      resolve(stats.isDirectory() === true)
    });
  });
};


const linkStats = (arr) => {
  return new Promise((resolve, reject) => {
    let counter = [];
    counter = ('Links-totales:' + arr.length)
    resolve(chalk.bold.yellow(counter))
  })
}


const mdLinks = (path, option) => {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (err, stats) => {
      if (err) {
        reject(err)
      }
      if(stats.isFile()) {
      // .then(res => {
        // if (res === false && extFile.includes('.md')) {
         (getLinksFromFile(path))
         .then(res=>{
           resolve(res)
         })
        }
       if
        (stats.isDirectory()) {
        // (res === true)
        getFilesFromFilehound(path)
        .then(res=>{
          resolve(res)
        })
        }
      })
      // .catch(err => {
      //   reject(err)

      // })
  })
}
mdLinks(route, option)
.then(res=>{
  if(option === '--validate'){  
  checkLinks(res)
  .then(res=>{
    console.log('Res mdLinks validate:',res)
  })
  }
  if(option === '--stats'){
    linkStats(res)
    .then(res=>{
      console.log('Res mdLinks stats', res)
    })
  }
  console.log('Res mdLinks:', res)

//   if(bothOption.one === '---validate' && bothOption.two === '--stats' || bothOption.one=== '--stats' && bothOption.two ==='--validate') {
//     checkLinks(res)
//     .then(linkStats(res))
//       .then(res=> {
//         console.log('Res mdLinks validate y stats:', res)

//     })
//   }
// hdshgdfgf(path)
// .then(gafsgdfg(hagshdghs(path)))
 })
.catch(err =>{
  console.log('Error mdLinks', err)
})

module.exports = {
  mdLinks
}
