const fs = require('fs');
const path = require('path');
const FileHound = require('filehound');
const marked = require('marked');
const fetch = require('node-fetch');

//se guarda lo que ingresamos en consola
let route = process.argv[2];
//resolvemos la ruta para que se convierta en absoluta
route = path.resolve(route);
//normalizamos la ruta para que no tenga errores 
route = path.normalize(route);

//obtenemos la extension del archivo que ingresamos
let extFile = path.extname(route);

//Array vacio para meter info que resulta de filehound
let filesFromFileHound = [];
//Array vacio para meter archviso 
let gotLinks = [];;


// const isAFile = (path) =>{
//   return new Promisse((resolve, reject) => {
//       if(extFile.includes('md')) {
//         true
//         resolve(console.log('es un file'))
//       } false
//       reject(console.log('no es un file'))
//         })
// };
// isAFile(route)
//  .then(res => {
//    console.log(res)
//  })
//  .catch(error =>{
//      console.log(error)
//  });

const checkingRoute = (path)=> {
    return new Promise ((resolve, reject) => {
fs.lstat(path, (err, stats) => {
    if(err){
        reject(err)
    console.log(err); //Handle error
    }
    resolve(stats.isDirectory())
});
})
}
checkingRoute(route)
.then(res=>{
    console.log(res)
})
.catch(err =>{
console.log(err);
})



// //Fx para leer directorios con libreria externa
// const getFilesWithFilehound = (path) => {
// const files = FileHound.create()
//   .paths(path)
//   .ext('md')
//   .find();

// files
// .then(res => {
 
//     filesFromFileHound = res;
//     filesFromFileHound.forEach(el=>{
//         getLinksWithReadFile(el)
//         .then( res=> {
//             console.log(res)
//         })
//     })
// })
// }
// getFilesWithFilehound(route)




// //const para leet arcchivos con file system
// const getLinksWithReadFile = (path) => {
//   return new Promise ((resolve, reject)=> {

//   fs.readFile(path, 'utf-8', (error, data) => {
//    if (error) {
//    reject(error);
//     }
//      const renderer = new marked.Renderer();
//     // array vacio para meter info del archivo que leemos
//     let links = [];
//     renderer.link = function (href, title, text) {
//       links.push({
//         // link que encuentra
//         href: href,
//         //texto que aparece dentro
//         text: text,
//         //ruta archivo
//         file: path,
//       });
//     }
//     marked(data, {renderer: renderer})
//     resolve(links);
//     // checkLinks(links);
//   })
// });
// };
// // getLinksWithReadFile(route)
// // .then( res=>{
// //   console.log(res)
// // })
// // .catch(err => {
// //   console.log(err)
// // });




// const mdLinks = (path, option) => {

// }