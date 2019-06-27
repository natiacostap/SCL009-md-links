//modulos que se agregan para realizar funciones
const fs = require('fs'); 
const path = require('path'); 
const FileHound = require('filehound');
const marked = require('marked');


let route = process.argv[2]; // lee lo que se ingresa en consola
route = path.resolve(route); //convierte ruta relativa en absoluta
console.log("Resolve:", route);
route = path.normalize(route); //arregla errores que pueda tener la ruta
console.log("Normalize:", route);

let ext = path.extname(route) // lee la extencion que tiene el archivo
console.log(ext);

//fx que nos dice si es un directorio o no con un boolean 
const isDirectory = async path => {
  try {
    return (await require('util').promisify(require('fs').lstat)(path)).isDirectory()
  } catch (e) {
    return false // or custom the error
  }
}
// fx que checkea si es un directorio o no y asi usar fxs correspondientes
const  CheckIfIsADirectory = (path)=>{
  isDirectory(path)
  .then(res => {
       let isADir = res;
       //si es directorio utiliza la funcion que con Filehound
       if(isADir===true){
         //console.log(isADir);
           getFilesFromFilehound(path); 
       // si no es directorio revisa que tenga extencion MD para pasar a fx link
       }else{
        console.log(isADir);
          if(isADir === false && ext.includes('md')){
           links(path);
           //avisa que no es un archivo markdown 
          }else {
            console.log('no es un archivo markdown')
      }}
  })
  .catch(err=>{
       console.log(err);
  })
}
CheckIfIsADirectory(route); //inicia la funcion 

//fx que revisa los archivos de un directorio entregandole una ruta
const getFilesFromFilehound = (path) => {

  const files = FileHound.create()
   .paths(route)
   .ext('md')
   .find();
//array vacio para meter los archivos que se encuentran en el directorio
let filesFilehound = [];
  
  files
  .then(res => { //respuesta de filehound
  filesFilehound = res ;
  //console.log(res);
  // recorre los archivos que encontro y luego pasa funcion links
  filesFilehound.forEach(element => {
    console.log(element)
    links(element);
      });
    });
  };
  // getFilesFromFilehound(route)


//fx que lee los archivos y extrae los links que hay dentro
const links = (path) => {
  fs.readFile(path,'utf-8',(error, data) => { 
  if(error) throw error;
// array vacio para meter el archivo que lee
 let links = [];
   
  const renderer = new marked.Renderer();

  renderer.link = function(href, title, text){
    links.push({
      // link que encuentra
      href:href,
      //texto que aparece dentro
      text:text,
      //ruta archivo
      file:path
    });
  }
  marked(data, {renderer:renderer})
  console.log(links);
})
};
// links(route);
