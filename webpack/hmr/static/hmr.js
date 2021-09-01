(() => {
  var lastHash;
  var hotCheck = function () {
    return hotDownloadManifest().then((update) => {
      update.c.forEach(chunkId => {
        hotDownloadUpdateChunkId(chunkId)
      });
      return hotUpdate
    }).catch((err) => {
      window.location.reload()
    })
  }
  var hotDownloadManifest = () => {
    return fetch(`http://localhost:9001/app.${lastHash}.hot-update.json`).then(res => res.json())
  }
  var hotDownloadUpdateChunkId = (chunkId) => {
    let script = document.createElement('script')
    script.src = `${chunkId}.${lastHash}.hot-update.js`
    document.body.appendChild(script)
  }
  self["webpackHotUpdate"] = (chunkId, moreModules) => {
    hotAddUpdateChunkId(chunkId, moreModules)
  }
  var hotUpdate = {}
  var hotAddUpdateChunkId = (chunkId, moreModules) => {
    for (var moduleId in moreModules) {
      hotUpdate[moduleId] = __webpack_modules__[moduleId] = moreModules[moduleId]
    }
    hotApplay()
  }
  var hotApplay = () => {
    for (var moduleId in hotUpdate) {
      var oldModule = __webpack_module_cache__[moduleId]
      delete __webpack_module_cache__[moduleId]
      oldModule.parents && oldModule.parents.forEach(parentModule => {
        parentModule.hot._acceptDependencies[moduleId] && parentModule.hot._acceptDependencies[moduleId]()
      })
    }
  }
  var __webpack_modules__ = ({
    "./src/index.js":
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        function render() {
          root.innerHTML = __webpack_require__("./src/print.js");
        }
        render()
        __unused_webpack_module.hot.accept(['./src/print.js'], render)
        console.log('index', __unused_webpack_module);
      }),
    "./src/print.js":
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        function printMe() {
          console.log('Updating print.js...-----4');
        }
        __unused_webpack_module.exports = printMe
        console.log('print', __unused_webpack_module);
      }),
    "./webpack/hot/dev-server.js":
      ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        if (__unused_webpack_module.hot) {
          var check = function check(currentHash) {
            __unused_webpack_module.hot
              .check()
              .then(function (updatedModules) {
                if (!updatedModules) {
                  window.location.reload();
                  return;
                }
                lastHash = currentHash
              })
              .catch(function (err) {
                window.location.reload();
              });
          };
          var hotEmitter = __webpack_require__("./webpack/hot/emitter.js");
          hotEmitter.on("webpackHotUpdate", function (currentHash) {
            check(currentHash)
          });
        } else {
          throw new Error("[HMR] Hot Module Replacement is disabled.");
        }
      }),
    "./webpack/hot/emitter.js":
      ((module) => {
        class EventEmitter {
          events = {}
          on(eventName, fn) {
            this.events[eventName] = fn
          }
          emit(eventName, ...args) {
            this.events[eventName](...args)
          }
        }
        module.exports = new EventEmitter()
      }),
    "./webpack-dev-server/client/index.js":
      ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
        var sendMessage = __webpack_require__("./webpack-dev-server/client/utils/sendMessage.js");
        var reloadApp = __webpack_require__("./webpack-dev-server/client/utils/reloadApp.js");
        var status = {
          currentHash: ''
        };
        var options = {
          hot: false,
          initial: true,
        };        
        var onSocketMessage = {
          hot: function hot() {
            options.hot = true;
            console.info('[WDS] Hot Module Replacement enabled.');
          },
          hash: function hash(_hash) {
            status.currentHash = _hash;
          },
          ok: function ok() {
            sendMessage('Ok');
            if (options.initial) {
              lastHash = status.currentHash
              return options.initial = false;
            } 
            reloadApp(options, status);
          },
        };
        // 客户端创建websocket链接
        var socket = new WebSocket('ws://127.0.0.1:9001/sockjs-node');
        socket.onmessage = function(e) {
            const data = JSON.parse(e.data)
            if(data) {
              console.log('dev-server-client', data);
              onSocketMessage[data.type](data.data)
            }
        };
      }),
    "./webpack-dev-server/client/utils/reloadApp.js":
      ((module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        function reloadApp(_ref, _ref2) {
          var hotReload = _ref.hotReload,
            hot = _ref.hot,
            liveReload = _ref.liveReload;
          var isUnloading = _ref2.isUnloading,
            currentHash = _ref2.currentHash;
          // if (isUnloading || !hotReload) {
          //   return;
          // }
          if (hot) {
            console.info('[WDS] App hot update...');
            var hotEmitter = __webpack_require__("./webpack/hot/emitter.js");
            hotEmitter.emit('webpackHotUpdate', currentHash);
            if (typeof self !== 'undefined' && self.window) {
              self.postMessage("webpackHotUpdate".concat(currentHash), '*');
            }
          }
          else if (liveReload) {
            var rootWindow = self;
            var intervalId = self.setInterval(function () {
              if (rootWindow.location.protocol !== 'about:') {
                applyReload(rootWindow, intervalId);
              } else {
                rootWindow = rootWindow.parent;
                if (rootWindow.parent === rootWindow) {
                  applyReload(rootWindow, intervalId);
                }
              }
            });
          }
          function applyReload(rootWindow, intervalId) {
            clearInterval(intervalId);
            console.info('[WDS] App updated. Reloading...');
            rootWindow.location.reload();
          }
        }
        module.exports = reloadApp;
      }),
    "./webpack-dev-server/client/utils/sendMessage.js":
      ((module) => {
        "use strict";
        function sendMsg(type, data) {
          if (typeof self !== 'undefined' && (typeof WorkerGlobalScope === 'undefined' || !(self instanceof WorkerGlobalScope))) {
            self.postMessage({
              type: "webpack".concat(type),
              data: data
            }, '*');
          }
        }
        module.exports = sendMsg;
      }),
  });
  var __webpack_module_cache__ = {};
  function hotCreateModule() {
    var hot = {
      _acceptDependencies: {},
      accept: function (deps, callback) {
        for (var i = 0; i < deps.length; i++) {
          hot._acceptDependencies[deps[i]] = callback
        }
      },
      check: hotCheck
    }
    return hot
  }
  function hotCreateRequire(parentModuleId) {
    var parentModule = __webpack_module_cache__[parentModuleId]
    if (!parentModule) return __webpack_require__
    var fn = function (childrenModuleId) {
      parentModule.children.push(childrenModuleId)
      __webpack_require__(childrenModuleId)
      var chilerenModule = __webpack_module_cache__[childrenModuleId]
      chilerenModule.parents.push(parentModule)
      return chilerenModule.exports
    }
    // 解决热更新的模块运行时报错
    fn.r = () => {}
    fn.d = () => {}
    fn.hmd = (module) => module
    return fn
  }
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = __webpack_module_cache__[moduleId] = {
      exports: {},
      hot: hotCreateModule(),
      parents: [],
      children: []
    };
    __webpack_modules__[moduleId](module, module.exports, hotCreateRequire(moduleId));
    return module.exports;
  }
  var __webpack_exports__ = {};
  __webpack_require__('./src/index.js')
  __webpack_require__("./webpack/hot/dev-server.js");
  __webpack_require__("./webpack-dev-server/client/index.js");
})()
  ;
