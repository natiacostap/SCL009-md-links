const fs = require('fs');
const path = require('path');
const FileHound = require('filehound');
const marked = require('marked');
const fetch = require('node-fetch');
const chalk = require('chalk');


// lee lo que se ingresa en consola
let route = process.argv[2];
//convierte ruta relativa en absoluta
route = path.resolve(route);

// console.log("Resolve:", route);
//arregla errores que pueda tener la ruta
route = path.normalize(route);
// console.log("Normalize:", route);
let option = process.argv[3]
 



// lee la extencion que tiene el archivo
let extFile = path.extname(route)
// console.log(extFile);

// //fx que revisa los archivos de un directorio entregandole una ruta
// const getFilesFromFilehound = (path) => {
//   return new Promise ((resolve, reject) => { 
//     FileHound.create()
//       .discard('node_modules')
//       .paths(route)
//       .ext('md')
//       .find()
//       .then(res => { 
//        let objectFileArray = [];
//        let filesFilehound = [];
//       //array vacio para meter los archivos que se encuentran en el directorio
//       // filesFilehound = res;
//       // recorre los archivos que encontro y luego pasa funcion links
//        res.forEach(element => {
//       console.log(element)
//       //   getLinksFromFile(element)
//       //   .then(res=>{
//       //     console.log(res)
//       //     filesFilehound.push(res)
//       //     resolve(filesFilehound)
//       //     console.log(filesFilehound)
//       //    })
//       //    .catch(err=>{
//       //    console.log('Error en leer archivos con filehound', err)
//       //    })
//       })
//       })
//       .catch(err =>{
//         reject('Error con filehound', err)
//       })
//   })
// };
// getFilesFromFilehound(route)
//  .then(res=>{
//   console.log(res)
//  })
//  .catch(err=>{
//   console.log('Error promesa filehpund', err)
//  })


//fx que lee los archivos y extrae los links que hay dentro
const getLinksFromFile = (path) => {
  return new Promise((resolve, reject) => {
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
        renderer: renderer
      })
   
      resolve(links)
    })
  })
};
getLinksFromFile(route)
.then(res => {
  if(option === '--validate'){
    checkLinks(res)
    .then(res =>{
      console.log(res)
    })
    .catch(err=> {
      console.log('Error checklinks' , err)
    })
  }
  if(option === '--stats'){
  (linkStats(res))
  }
  console.log(res)
})
.catch(err => {
console.log(err)
});


let linksDone = []; 
//Fx para validar los links que entreguen fxs de readfile
const checkLinks = (arr) => {  
  return new Promise ((resolve, reject) => { 
    arr.map(el => {
      fetch(el.href)
      .then(res => {
        el.status = res.status;
        el.statusText = res.statusText;
       //console.log(el)
       linksDone.push(el)
         resolve(linksDone)

      })

      .catch(err=>{
        reject('Error checklinks', err)
      })
  })
})
};

// //Fx para chekear si es un directorio o un archivo. Retorna true o false
//     fs.stat(route, (err, stats) => {
//       if (err) {
//       console.log('Error stats',err)
//         //console.log(err); //Handle error
//       }
//       console.log(stats.isDirectory(route))
      
//      });

const linkStats = (arr) => {
  let counter = [];
  counter = ('Links-totales:' + arr.length)
  console.log(chalk.bold.yellow(counter))
  
}



// const mdLinks = (path, option) => {
//   return new Promise((resolve, reject) => {
//     fs.stat(path, (err, stats) => {
//       if(err) {
//         console.log('Error con archivo', err)
//       }
//      if(stats.isDirectory() === true ){
//      getFilesFromFilehound(path)
//       .then(res =>{
//         console.log(res)
//          })
//       .catch(err=>{
//         console.log('Error leer directorio', err)
//       })
//       }else
//       (stats.isFile() === true)
//           getLinksFromFile(path)
//            .then(res=> {
//              checkLinks(res)
//              console.log(res)
             
//            })
//            .catch(err=>{
//              console.log('Error en leer archivo', err)
//            })
// })
// })
// }
// mdLinks(route, option);

