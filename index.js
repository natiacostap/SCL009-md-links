#!/usr/bin/env node

const mdLinks = require('./md-links')
const path = require('path');

/* lee lo que se ingresa en consola*/
let route = process.argv[2];
/*convierte ruta relativa en absoluta*/
route = path.resolve(route);
/*arregla errores que pueda tener la ruta*/
route = path.normalize(route);

let validate = false;
let stats = false;


  /*Recorre lo que se ingresa en la consola depsues de la ruta*/
process.argv.forEach((option, index, array) => {
    //console.log("index:", index, "value:", option);
    if(index > 2 && index < 5) {
      if(option == "--validate" || option == "--v") {
        validate = true;
      } else if(option == "--stats" || option == "--s") {
        stats = true;
      } else {
        //console.log("Opción no válida:", option);
      }
    }
   });

   /*Opciones que elige el usuario*/
let options = {
  one: validate, 
  two: stats
}

// console.log('Process 3:',process.argv[3]);
// console.log('process 4:',process.argv[4])
// console.log('option1:', options.one)
// console.log('option2:', options.two)

mdLinks.mdLinks(route, options)
.then(res=>{
 if(options.one === true && options.two === true){
    mdLinks.checkLinks(res)
    .then(res=>{
      console.log('Res checklinks y stats:',res)
    mdLinks.linkStats(res)
    .then(res=> {
    console.log('Res checklinks y stats:',res)
          })  
        })
    }
  else if(options.one === true){  
 mdLinks.checkLinks(res)
  .then(res=>{
    console.log('Res mdLinks validate:',res)
  })
  .catch(err=>{
      console.log('Error con checklinks', err)
  })
  }
  else if(options.two === true){
  mdLinks.linkStats(res)
    .then(res=>{
      console.log('Res mdLinks stats', res)
    })
    .catch(err=>{
        console.log('Error con linksStats', err)

    })
  } 
  else {
   console.log('Res mdLinks:', res)
  }
 })
.catch(err =>{
  console.log('Error mdLinks', err)
})