



function loader(source){
    console.log('c-loader')
    return source
}
loader.pitch = function () {
    console.log('pitch-c');
    // return 'xxxx'
  }
module.exports = loader