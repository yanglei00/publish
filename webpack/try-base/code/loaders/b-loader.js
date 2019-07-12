function loader(source){
    console.log('b-loader')
    return source
}
loader.pitch = function () {
    console.log('pitch-b');
    return 'xxxx'
  }
module.exports = loader
