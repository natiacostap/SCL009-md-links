// #!/usr/bin/env node

const mdLinks = require('mdLinks');

// let options = {
//   one: process.argv[3], 
//   two: process.argv[4]
// }

const mdLinks = (path, option) => {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (err, stats) => {
      if (err) {
        reject('No es puede leer archivo', err)
      }
      if(stats.isFile() && extFile.includes('.md')) {
         getLinksFromFile(path)
         .then(res=>{
           resolve(res)
         })
         .catch(err => {
             console.log('No no es archivo markdown',err)
         });
        }
       if(stats.isDirectory()) {
        getFilesFromFilehound(path)
        .then(res =>{
           Promise.all(res.map(el=>{
             return getLinksFromFile(el)
           }))
           .then(res=>{
                let goIntoArray = [].concat.apply([],res);
                resolve(goIntoArray)
           });
            });
        }
    });
});
};

mdLinks(route, options)
.then(res=>{
  if(options.one === '--validate'){  
  checkLinks(res)
  .then(res=>{
    console.log('Res mdLinks validate:',res)
  })
  .catch(err=>{
      console.log('Error con checklinks', err)
  })
  }
  else if(options.one === '--stats'){
    linkStats(res)
    .then(res=>{
      console.log('Res mdLinks stats', res)
    })
    .catch(err=>{
        console.log('Error con linksStats', err)

    })
  } 
  else if(options.one === '--stats' && options.two === '--validate' ||
  options.one === '--validate' && options.two === '--stats'){
    checkLinks(res)
      .then(res=>{
        console.log('Res checklinks y stats:',res)
        linkStats(res)
        .then(res=> {
            console.log('Res checklinks y stats:',res)
        })  
      })
  }
  else {
console.log('Res mdLinks:', res)
  }
 })
.catch(err =>{
  console.log('Error mdLinks', err)
})
