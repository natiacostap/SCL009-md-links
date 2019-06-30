// const fs = require("fs");

// let path = "../../Escritorio/readmes";

// fs.lstat(path, (err, stats) => {

//     if(err)
//     return console.log(err); //Handle error

// console.log(`Is directory: ${stats.isDirectory()}`);

// });

//Fx que chekea el status de los href que encontramos en los archivos
  const checkLinks = (array) =>{
    //array vacio para que despues podamos push la informaicon que necesamos sobre links
    let linksDone = [];
    //recorremos los links que obtuvimos de los archivos
    array.forEach(el=> {
    //modulo que usamos para obtener el status del href
    fetch(el.href)
         .then(res=>{
           //informaicon que mostraremos en la consola sobre el archivo
              el.href = el.href;
              el.text = el.text;
              el.file = el.file;
              el.statusCode = res.status;
              el.statusText = res.statusText;
              // pusheamos toda la informacion del objeto en array vacio
              linksDone.push(el);
              // console.log(linksDone);
            //  return linksDone;
       })
       .catch(err=>{
         console.log(err.message, err.code);

       });
      })  
      console.log(linksDone);

   }
   checkLinks('../../Escritorio/readmes/links.md')
  

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

const extractMdFiles = (path) =>{
    return new Promise((resolve, reject)=>{
         const mdFiles = fileHound.create()
         .paths(path)
         .ext('md') 
         .find()
         .then(mdFiles=>{
             mdFiles.forEach(el => {
                  resolve(links(el))
             console.log(file)

              //resolve(links(mdFiles))
         })
         .catch(err => {
              reject(err)
         })
})
})}