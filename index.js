const fs = require('fs');
const path = require('path');
const FileHound = require('filehound');
const marked = require('marked');
const fetch = require('node-fetch');
const chalk = require('chalk');

let linksDone=[];

// lee lo que se ingresa en consola
let route = process.argv[2]; 
//convierte ruta relativa en absoluta
route = path.resolve(route); 

// console.log("Resolve:", route);
//arregla errores que pueda tener la ruta
route = path.normalize(route); 
// console.log("Normalize:", route);
let option  ={
      one: process.argv[3],
      two: process.argv[4]
} 


// let validate = '--validate';
// let stats = '--stats';
// option = false
// validate = false ;s
// stats =false;


// lee la extencion que tiene el archivo
let extFile = path.extname(route) 
// console.log(extFile);

//fx que revisa los archivos de un directorio entregandole una ruta
const getFilesFromFilehound = (path) => {
    const files = FileHound.create()
      .discard('nodes_modules')
      .paths(route)
      .ext('md')
      .find();
  
    files
      .then(res => { 
        //array vacio para meter los archivos que se encuentran en el directorio
        let filesFilehound = [];
        filesFilehound = res;
        // recorre los archivos que encontro y luego pasa funcion links
        filesFilehound.forEach(element => {
        //console.log(element)
         getLinksFromFile(element)
       
          
        
        });
      });
  };
     //getFilesFromFilehound(route)

     //fx que lee los archivos y extrae los links que hay dentro
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
   if(option.one === '--validate' || option.two === '--validate'){
    checkLinks(links);
   } else
   console.log(links);
   if(option.one === '--stats' || option.two === '--stats'){
   linkStats(links);
}
// else 
// console.log(links);

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
const checkLinks= (links) => {

    links.map(el=>{
      fetch(el.href)
      .then(res=> {
        el.status = res.status;
        el.statusText = res.statusText
        linksDone =el; 
        console.log(linksDone)
      })
    .catch(err =>{
        console.log(err);
    })

      })
    };

//Fx para chekear si es un directorio o un archivo. Retorna true o false
const isDirectory = (path) => {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (err, stats) => {
      if (err) {
        reject(err)
        //console.log(err); //Handle error
      }
      resolve(stats.isDirectory())
    });
  });
};



const linkStats = (links) => {
    let counter =[];
    let broken = [];
    counter= ('Links-totales:' + links.length)
    console.log(chalk.yellow(counter))
     broken = links.forEach(el=>{
    //   el.filter(el.status != 200)
   
    // })


     


     })}
    



    const mdLinks = (path, option) => {
      return new Promise((resolve,reject) => {
      isDirectory(path)
        .then(res => {
          if (res === false && extFile.includes('.md')) {
            resolve(getLinksFromFile(path)) 
            
          }
           (res=== true)
          resolve(getFilesFromFilehound(path))
          
        })
        .catch(err=>{
            reject(err)
        
        })
      })
  
  
  }
  mdLinks(route, option);

  module.exports = {
    mdLinks
  }