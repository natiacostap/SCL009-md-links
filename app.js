// //modulos que se agregan para realizar funciones
const fs = require('fs');
const path = require('path');
const FileHound = require('filehound');
const marked = require('marked');
const fetch = require('node-fetch');
const linkCheck = require('link-check');


 //array vacio para meter los archivos que se encuentran en el directorio
 let filesFilehound = [];
 let toReadFilehound = [];


// lee lo que se ingresa en consola
let route = process.argv[2]; 
//convierte ruta relativa en absoluta
route = path.resolve(route); 
// console.log("Resolve:", route);
//arregla errores que pueda tener la ruta
route = path.normalize(route); 
// console.log("Normalize:", route);

// lee la extencion que tiene el archivo
let extFile = path.extname(route) 
// console.log(extFile);

// const isAFile = (path) =>{
//   return new Promisse((resolve, reject) => {
//     let extFile = path.extname(route) 
//       if(extFile.includes('md')) {
        
//         resolve(true);
//       } else{
         
//         reject(false);
//       }
//     });
//   };
      
// //fx que nos dice si es un directorio o no con un boolean 
// const isDirectory = async path => {
//   try {
//     return (await require('util').promisify(require('fs').lstat)(path)).isDirectory()
//   } catch (e) {
//     return false // or custom the error
//   }
// }
// // fx que checkea si es un directorio o no y asi usar fxs correspondientes
// const checkIfIsADirectory = (path) => {
//   isDirectory(path)
//     .then(res => {
//       let isADir = res;
//       //si es directorio utiliza pasa a fx con Filehound
//       if (isADir === true) {
//         getFilesFromFilehound(path);
        
//         // si no es directorio revisa que tenga extencion MD para pasar a fx que lee archivos
//       } else {
//         if (isADir === false && extFile.includes('.md')) { //avisa que no es un archivo markdown 
//           getLinksFromFile(path);
//           // checkLinks(path);
//           //avisa que no es un archivo markdown 
//         } else {
//           console.log('No es archivo Markdown')
//           //avisa que no es un archivo markdown 
//         }
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     })
// }
// checkIfIsADirectory(route); //inicia la funcion 

//fx que revisa los archivos de un directorio entregandole una ruta
const getFilesFromFilehound = (path) => {
  return new Promise ((resolve, reject) =>{
  const files = FileHound.create()
    .discard("node_modules")	
    .paths(route)
    .ext('md')
    .find();

  files
     .then( res =>{
       resolve(res) 
      })
      reject('error');
      });
    
    
     
    //   filesFilehound = res;
    //   console.log(filesFilehound)
    //   // recorre los archivos que encontro y luego pasa funcion links
    //   filesFilehound.forEach(element => {
    //     // getLinksFromFile(element)

    //   });
     //});
};
getFilesFromFilehound(route)
.then(res =>{
  console.log()
// })



// //fx que lee los archivos y extrae los links que hay dentro
// const getLinksFromFile = (path) => {
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
// getLinksFromFile(route)
// .then( res=>{
//   console.log(res)
// })
// .catch(err => {
//   console.log(err)
// });


// //Fx para chekear si links son validos o no con libreria linkCheck
// const checkLinks = (links) => {
//   //array vacio para meter la informacion de los links que mostraremos
//   let linksDone = [];
//   //recorrer los links para sacar casa href
//   links.forEach(el => {
//     //modulo que usaremos para sacar status y code
//     linkCheck(el.href, function (err, result) {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       // informaicon que se mostrara en consola
//      el.href = el.href;
//      el.text = el.text;
//      el.file = el.file;
//      el.status = result.status;
//      el.statusCode = result.statusCode;
//       // push de informacion del elemento y resultado de funcion
//        linksDone.push(el);
//       //  console.log(` ${result.link} is ${result.status} code: ${result.statusCode}`)
//       // console.log(linksDone);
     
//   })
// })
//     console.log(linksDone);
//   };


// //Fx que chekea el status de los href que encontramos en los archivos
//   const checkLinks = (links) =>{
  

//     //array vacio para que despues podamos push la informaicon que necesamos sobre links
//     let linksDone = [];
//     //recorremos los links que obtuvimos de los archivos
//     links.forEach(el=> {
//     //modulo que usamos para obtener el status del href
//     fetch(el.href)
//          .then(res=>{
//            //informaicon que mostraremos en la consola sobre el archivo
//               el.href = el.href;
//               el.text = el.text;
//               el.file = el.file;
//               el.statusCode = res.status;
//               el.statusText = res.statusText;
//               // pusheamos toda la informacion del objeto en array vacio
//               linksDone.push(el);
//               // console.log(linksDone);
//             //  return linksDone;
//        })
//        .catch(err=>{
//          console.log(err.message, err.code);

//        });
//       })  
//    })
//   console.log(linksDone);
//   };

// //fx con promesa
// const checkLinks = (links) => {
//   return new Promise ((resolve, reject) =>{
//     links.forEach(el => {
//       fetch(el.href)
//       .then(res => {
//         el.status = res.status
//         el.statusText = res.statusText
//         resolve(el)
//       })
//       .catch(err =>{
//         reject(error)
//         console.log(error)
//       })
//     })
//   })
// };
// checkLinks(route)

// const doStats = (linksDone) => {
//   let linksStats = []
//   linksDone.forEach(el => {
//     el.length ='',
//     el.statusCode.length != 200,
  
// console.log(el.length);
    
//   })
//   }

  
})
