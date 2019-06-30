const fs = require('fs');
const path = require('path');
const FileHound = require('filehound');
const marked = require('marked');
const fetch = require('node-fetch');


let route = process.argv[2]; //se guarda lo que ingresamos en consola
route = path.resolve(route);//resolvemos la ruta para que se convierta en absoluta
route = path.normalize(route);//normalizamos la ruta para que no tenga errores 

let extFile = path.extname(route);//obtenemos la extension del archivo que ingresamos
 
let gotlinks = {}
let linksDone =[];
// //Fx para chekear si es un directorio o un archivo. Retorna true o false
// const isDirectory = (path) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(path, (err, stats) => {
//       if (err) {
//         reject(err)
//         //console.log(err); //Handle error
//       }
//       resolve(stats.isDirectory())
//     });
//   });
// };

//fx para leet arcchivos con file system
const getLinksWithReadFile = (path) => {
  if (extFile.includes('.md')) {
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
        resolve(links);
        validateLinks(links)
      })
    });
  }
};
getLinksWithReadFile(route)
.then(res=>{
    console.log(res)
    // validateLinks(res)
    // .then(res=>{
    //     console.log(res)
    // })
   
})

//fx que revisa los archivos de un directorio entregandole una ruta
const getFilesFromFilehound = (path) => {
    return new Promise ((resolve, reject) =>{
     FileHound.create()
      .discard("node_modules")
      .paths(path)
      .ext('md')
      .find()
    
      .then(res => {
        // recorre los archivos que encontro y luego pasa funcion links
        res.forEach(element => {
         console.log(element)
        })
  })
         .catch(err=>{
             reject(err)
         })
        })
    }
     getFilesFromFilehound(route)
     .then(res=>
        console.log(res))
 


//Fx para validar los links que entreguen fxs de readfile
const validateLinks = (links) => {
    return new Promise ((resolve, reject) => {
    links.map(el=>{
      fetch(el.href)
      .then(res=> {
        el.status = res.status;
        el.statusText = res.statusText
        linksDone = el
        
        resolve(linksDone)
        // console.log(linksDone)
      })
    .catch(err =>{
        reject(err);
    })

      })
    })}
    



// const mdLinks = (path) => {
//     isDirectory(path)
//       .then(res => {
//         if (res === false && extFile.includes('.md')) {
//             return new Promise((resolve,reject) => {
//           getLinksWithReadFile(path)
//             .then(res => {
//                 resolve(res)
//               console.log(res)
//             })
//             .catch(err => {
//               reject(err)
//               console.log('No es archivo Markdown')
//             }) 
           
//         })

//     } else 
//         getFilesFromFilehound(path)
//         .then(res=>{
//             console.log(res)
               
//         })
    
//       })
//     })


// mdLinks(route);
