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

let optionValidate = process.argv[3];
let optionStats = process.argv[4];
//obtenemos la extension del archivo que ingresamos
let extFile = path.extname(route);

// //Array vacio para meter info que resulta de filehound
// let filesFromFileHound = [];
//Array vacio para meter archviso 
let gotLinks = {};
//Array con linsk listos checkados 
let linksDone = [];

//Fx para chekear si es un directorio o un archivo. Retorna true o false
const isDirectory = (path)=> {
    return new Promise ((resolve, reject) => {
fs.lstat(path, (err, stats) => {
    if(err){
        reject(err)
    //console.log(err); //Handle error
    }
    resolve(stats.isDirectory())
});
});
};

const getFilesWithFilehound = (path) => {
  return new Promise ((resolve, reject) =>{
  const files = FileHound.create()
    .discard("node_modules")	
    .paths(route)
    .ext('md')
    .find();

  files
     .then( res =>{
      gotLinks=res
      gotLinks.forEach(el=>{
          resolve(el)
      })
    })
      .catch(err=>{
        reject(err);
      })
   
      })};

    
//getFilesWithFilehound(route)




//const para leet arcchivos con file system
const getLinksWithReadFile = (path) => {
 if(extFile.includes('.md')){
  return new Promise ((resolve, reject)=> {

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
    marked(data, {renderer: renderer})
    resolve(links);
    //checkLinks(links);
  })
});
}
};
// getLinksWithReadFile(route)
// .then( res=>{
//     console.log(res)
//     // checkLinks(linksDone)
//     // .then(res =>{
//     //     console.log(res)
//     //})
// })
// .catch(err => {
//   console.log(err)
// });

//Fx para validar los links que entreguen fxs de readfile
const checkLinks = (links) => {
    return new Promise ((resolve, reject) => {
    links.map(el=>{
      fetch(el.href)
      .then(res=> {
        el.status = res.status;
        el.statusText = res.statusText
        linksDone =el
        resolve(linksDone)
      })
    .catch(err =>{
        reject(err);
    })
      })
    })}
   


 const mdLinks = (path, option) => {
     return new Promise ((resolve, reject) => { 
     isDirectory(path)
     .then(res =>{ 
         isd
        if(res === false && extFile.includes('.md')){
         getLinksWithReadFile(route)
                 .then(res=>{
                   resolve(console.log(res))
                   })
              .catch(err =>{
                  console.log(err)
                  console.log('No es archivo Markdown')
              })
            }
        })
     .catch(err =>{
         console.log(err)
            console.log('Error leyendo directorio y despues archivo')
     })
    
    })}
mdLinks(route);
// 