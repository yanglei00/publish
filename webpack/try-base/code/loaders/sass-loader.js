
let sass = require('node-sass');


module.exports = function(source){
    console.log('yyyyyyyyyy',source)
    let result = sass.renderSync({
        data: source
      });
      console.log('-------------',result.css)
    return result.css
}