const mdLinks = require('mdLinks');

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
mdLinks.mdLinks(route, option);
//mdLinks(route, option);