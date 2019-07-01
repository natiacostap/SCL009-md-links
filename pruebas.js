// const fs = require("fs");

// let path = "../../Escritorio/readmes";

// fs.lstat(path, (err, stats) => {

//     if(err)
//     return console.log(err); //Handle error

// console.log(`Is directory: ${stats.isDirectory()}`);

// });

// //Fx que chekea el status de los href que encontramos en los archivos
//   const checkLinks = (array) =>{
//     //array vacio para que despues podamos push la informaicon que necesamos sobre links
//     let linksDone = [];
//     //recorremos los links que obtuvimos de los archivos
//     array.forEach(el=> {
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
//       console.log(linksDone);

//    }
//    checkLinks('../../Escritorio/readmes/links.md')
  

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

// const extractMdFiles = (path) =>{
//     return new Promise((resolve, reject)=>{
//          const mdFiles = fileHound.create()
//          .paths(path)
//          .ext('md') 
//          .find()
//          .then(mdFiles=>{
//              mdFiles.forEach(el => {
//                   resolve(links(el))
//              console.log(file)

//               //resolve(links(mdFiles))
//          })
//          .catch(err => {
//               reject(err)
//          })
// })
// })}

// const fileHound = require('filehound');

// const files = (path) => {
//     return new Promise ((resolve, reject) => {
    
//       fileHound.create()
//       .paths(path)
//       .ext('.md')
//       .find()
//       .then(res => {console.log("res:", res)
//           res.forEach( Element => {
//             links(Element)
//             // .catch()
//             // traigo a link mediante una promesa
//           })
//   })
//     reject ((err) => {
//       console.log('Error: ', err)});
    
    
//     resolve ()
//   })};
//      files('../Escritorio/readmes')
  
// function linkStats(links) {
//   let counter =[];
//     links.map(el=> {
//         el.href
//     });
//      counter= el.length;
//      console.log(counter)


  //    let linkUnique =[...new Set(LinkIterab)].length;
  //    let linkBroken = links.filter(elem=> elem.status === 0 || elem.status >= 400).length;
    // }

//     const isDirectory = (path) => {
//       return new Promise((resolve, reject) => {
//         fs.lstat(path, (err, stats) => {
//           if (err) {
//             reject(err)
//             //console.log(err); //Handle error
//           }
//           resolve(stats.isDirectory())
//           console.log(stats.isDirectory())
//         });
//       });
//     };
// isDirectory(route)    
const fs = require('fs');
const marked = require('marked');
const checkLinks= (links) => {
let option = process.argv[3] 

  links.map(el=>{
    fetch(el.href)
    .then(res=> {
      el.status = res.status;
      el.statusText = res.statusText
      ; 
      console.log(el)
    })
  .catch(err =>{
      console.log(err);
  })

    })
  };

  const getLinksFromFile = (path) => {
    fs.readFile(path, 'utf-8', (error, data) => {
     if (error) {
     console.log(error);
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
     if(option === '--validate'){
      checkLinks(links);
     } else
     console.log(links);
     if(option === '--stats'){
     linkStats(links);
  }else 
  console.log(links);
  if(option === ''){
    console.log(links);
  }
    })
  
  };
  getLinksFromFile('../../Escritorio/readmes/links.md --validate')