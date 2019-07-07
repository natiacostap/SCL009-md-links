#!/usr/bin/env node

/*Modulos que necesitamos para ejecutrar fxs*/
const fs = require('fs');
const path = require('path');
const FileHound = require('filehound');
const marked = require('marked');
const fetch = require('node-fetch');
const chalk = require('chalk');


/* lee lo que se ingresa en consola*/
let route = process.argv[2];
/*convierte ruta relativa en absoluta*/
route = path.resolve(route);
/*arregla errores que pueda tener la ruta*/
route = path.normalize(route);

/* validate and stats declaration*/
let validate = false;
let stats = false

/*Recorre lo que se ingresa en la consola depsues de la ruta*/
process.argv.forEach((option, index, array) => {
    //console.log("index:", index, "value:", option);
    if(index > 1 && index < 5) {
      if(option == "--validate" || option == "--v") {
        validate = true;
      } else if(option == "--stats" || option == "--s") {
        stats = true;
      } else {
        //console.log("Opción no válida:", option);
      }
    }
   });

/*Opciones que elige el usuario*/
let options = {
  one: validate, 
  two: stats
}
// console.log("OPTION 1:", options.one);
// console.log("OPTION 2:", options.two);

/* lee la extencion que tiene el archivo*/
let extFile = path.extname(route)

/*fx que revisa los archivos de un directorio entregandole una ruta*/
const getFilesFromFilehound = (path) => {
  return new Promise ((resolve, reject) => { 
  const files = FileHound.create()
    .discard('nodes_modules')
    .paths(route)
    .ext('md')
    .find();

  files
    .then(res => {
       resolve(res)
      //array vacio para meter los archivos que se encuentran en el directorio
    //   let filesFilehound = [];
    //   res.forEach(element => {
    //     filesFilehound = element
    //     console.log(filesFilehound)
      //})
      
    });
  })
};

/*fx que lee los archivos y extrae los links que hay dentro*/
const getLinksFromFile = (path) => {
  return new Promise ((resolve, reject) => { 
  fs.readFile(path, 'utf-8', (error, data) => {
    if (error) {
    reject('Error en leer archivo', error);
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

/*Fx para validar los links que entreguen fxs de readfile*/
const checkLinks = (arr) => {
  return Promise.all(arr.map(el => {
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

/*Fx que nos da las estadisticas de los archivos*/
const linkStats = (arr) => {
  return new Promise((resolve, reject) => {
    let counter = [];
    let unique = [];
    counter = (chalk.bold.yellow('Links total:',arr.length))
    let checkUniques = arr.map(el=> el.href)
    unique = (chalk.bold.cyan('Links uniques:', [...new Set(checkUniques)].length))    
    resolve(`${counter}, ${unique}`)
  })
};


/*Fx final que reue todas las fx. Lee archivos y directiros. Ademas tiene opcion validar y stats*/
const mdLinks = (path, option) => {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (err, stats) => {
      if (err) {
        reject('No es puede leer archivo', err)
      }
      if(stats.isFile() && extFile.includes('.md')) {
         getLinksFromFile(path)
         .then(res=>{
           resolve(res)
         })
         .catch(err => {
             console.log('No no es archivo markdown',err)
         });
        }
       if(stats.isDirectory()) {
        getFilesFromFilehound(path)
        .then(res =>{
           Promise.all(res.map(el=>{
             return getLinksFromFile(el)
           }))
           .then(res=>{
                let goIntoArray = [].concat.apply([],res);
                resolve(goIntoArray)
           });
            });
        }
    });
});
};

// mdLinks(route, options)
// .then(res=>{
//  if(options.one == true && options.two == true||
//   options.two == true  && options.one === true){
//     checkLinks(res)
//     .then(res=>{
//       console.log('Res checklinks y stats:',res)
//     linkStats(res)
//     .then(res=> {
//     console.log('Res checklinks y stats:',res)
//           })  
//         })
//     }
//   else if(options.one == true){  
//   checkLinks(res)
//   .then(res=>{
//     console.log('Res mdLinks validate:',res)
//   })
//   .catch(err=>{
//       console.log('Error con checklinks', err)
//   })
//   }
//   else if(options.two == true){
//     linkStats(res)
//     .then(res=>{
//       console.log('Res mdLinks stats', res)
//     })
//     .catch(err=>{
//         console.log('Error con linksStats', err)

//     })
//   } 

//   else {
//    console.log('Res mdLinks:', res)
//   }
//  })
// .catch(err =>{
//   console.log('Error mdLinks', err)
// })


module.exports.mdLinks = mdLinks;
module.exports.checkLinks = checkLinks;
module.exports.linkStats = linkStats;
