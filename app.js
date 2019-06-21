const fs = require('fs');
const path = require('path');
let route = process.argv[2];
route = path.resolve(route);
console.log("Resolve:", route);
route = path.normalize(route);
console.log("Normalize:", route);


// const ReadDirWithFileHound = () => {
//   const FileHound = require('filehound');

// const files = FileHound.create()
//   .paths('route')
//   .ext('md')
//   .find();

// files.then(console.log);
// }

// fs.readFile('README.md','utf-8',(error, data) => {
// if(error){
//   console.log(`Error ${error}`);
// }else{
//   console.log(data);
// }


// })