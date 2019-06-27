const fs = require('fs');
const path = require('path');
const FileHound = require('filehound');
const marked = require('marked');

let route = process.argv[2];
route = path.resolve(route);
console.log("Resolve:", route);
route = path.normalize(route);
console.log("Normalize:", route);

let ext = path.extname(route)
console.log(ext);

const isDirectory = async path => {
  try {
    return (await require('util').promisify(require('fs').lstat)(path)).isDirectory()
  } catch (e) {
    return false // or custom the error
  }
}

const  CheckIfIsADirectory = (path)=>{
  isDirectory(path)
  .then(res => {
       let isADir = res;
       
       if(isADir===true){
         //console.log(isADir);
           getFilesFromFilehound(path); 
       }else{
        console.log(isADir);
          if(isADir === false && ext.includes('md')){
           links(path);
          }else {
            console.log('no es un archivo markdown')
      }}
  })
  .catch(err=>{
       console.log(err);
  })
}
CheckIfIsADirectory(route);


const getFilesFromFilehound = (path) => {

  const files = FileHound.create()
   .paths(route)
   .ext('md')
   .find();

let filesFilehound = [];
  
  files
  .then(res => { 
  filesFilehound = res ;
  //console.log(res);
  filesFilehound.forEach(element => {
    console.log(element)
    links(element);
      });
    });
  };
  // getFilesFromFilehound(route)



  const links = (path) => {
    fs.readFile(path,'utf-8',(error, data) => {
  if(error) throw error;

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
