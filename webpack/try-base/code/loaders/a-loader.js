function loader(source){
    console.log('a-loader')
    return source
}
loader.pitch = function () {
  console.log('pitch-a');
}
module.exports = loader