const fs = require("fs");

let path = "../../Escritorio/readmes";

fs.lstat(path, (err, stats) => {

    if(err)
    return console.log(err); //Handle error

console.log(`Is directory: ${stats.isDirectory()}`);

});