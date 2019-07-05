// #!/usr/bin/env node

// const mdLinks = require('mdLinks');


// const mdLinks = (path, option) => {
//   return new Promise((resolve,reject) => {
//     checkingDirec(path)
//     .then(res => {
//       if (res === false) {
//            (getLinksFromFile(path)) 
//                   .then(res => {
//                     if(option === '--validate'){
//                        checkLinks(res)
//                        .then(res =>{
//                          console.log(res)
//                        })   
//                     }
//                        })
//                     }  
//                     else (res === true)
//                     getFilesFromFilehound(path)
//                     .then(res => {
//                         resolve(res)
                           
//                       })
//                     })    
  
//   .catch(err =>{
//     console.log('Error checkDirec' + err)
//   })
// })
// }


// mdLinks(route, option)
//   .then(res => {
//     console.log("mdLinks Resolves:", res);
//   })
//   .catch(err => {
//     console.log("mdLinks Rejects:", err);
//   })
// //mdLinks(route, option);