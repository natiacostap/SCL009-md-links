const fs = require('fs');
const path = require('path');
const FileHound = require('filehound');

let route = process.argv[2];
route = path.resolve(route);
console.log("Resolve:", route);
route = path.normalize(route);
console.log("Normalize:", route);


  const getFilesFromFilehound = (path) => {
  const files = FileHound.create()
  .paths(route)
  .ext('md')
  .find();

  files
  // .then(console.log)
  .then(res => { console.log('response:', res);
  res.forEach(element => {
    getLinksFromFile();
  })}
  )};


  const getLinksFromFile  = (path) => {
  fs.readFile(route ,'utf-8',(error, data) => {
  if(error)
  console.log(`Error ${error}`);

  let getLinks = [];
   
  const renderer = new marked.Renderer();
  renderer.link = function(href, title, text){
    getLinks.push({
      // link que encuentra
      href:href,
      //texto que aparece dentro
      text:text,
      //ruta archivo
      file:path
    });
  console.log(getLinks);
  }
  marked(data, {renderer:renderer})
    console.log(getLinks)
})
}
