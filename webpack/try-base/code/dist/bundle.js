/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/c.js":
/*!******************!*\
  !*** ./src/c.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar c = 1;\nconsole.log(c);\n/* harmony default export */ __webpack_exports__[\"default\"] = (c);\n\n//# sourceURL=webpack:///./src/c.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _c_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./c.js */ \"./src/c.js\");\n // import './index.css'\n// import './index.less'\n// import './index.scss'\n// import './asserts/1.jpg'\n// import 'expose-loader?$!jquery'\n// import b from './b.js'\n// import $ from 'jquery'\n// require('inline-loader.js!./a.js')\n// console.log('index.$',$)\n// let fn = () => alert(1)\n// fn()\n// console.log(DEV)\n// import moment from 'moment';\n// import 'moment/locale/zh-cn'; // 其他包已经忽略掉\n// moment.locale('zh-cn');\n// let r = moment(Date.now()-60*1000*60*2).fromNow();\n// console.log(r);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });