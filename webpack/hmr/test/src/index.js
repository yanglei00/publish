
//   import _ from 'lodash';
//   import printMe from './print.js';
//   import './styles.css';

//   function component() {
//     const element = document.createElement('div');
//     const btn = document.createElement('button');

//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//     btn.innerHTML = 'Click me and check the console!';
//     btn.onclick = printMe;

//     element.appendChild(btn);

//     return element;
//   }


//   let element = component(); // 存储 element，以在 print.js 修改时重新渲染
//   document.body.appendChild(element);
  
//  if (module.hot) {
//    module.hot.accept('./print.js', function() {
//      console.log('Accepting the updated printMe module!');
//      document.body.removeChild(element);
//      element = component(); // 重新渲染 "component"，以便更新 click 事件处理函数
//      document.body.appendChild(element);
//    })
//  }


function render() {
  root.innerHTML = require('./print.js')
}
render()

module.hot?.accept(['./print.js'], render)