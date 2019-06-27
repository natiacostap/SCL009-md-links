module.exports = () => {
  // ...

const mdLinks = () => {

  function is_dir(path) {
    try {
        let stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
}


}



};
