/* globals __webpack_hash__ */
if (module.hot) {
	var lastHash;
	var upToDate = function upToDate() {
		return lastHash.indexOf(__webpack_hash__) >= 0;
	};
	var check = function check() {
		module.hot
			.check(true)
			.then(function (updatedModules) {
				if (!updatedModules) {
					window.location.reload();
					return;
				}
				if (!upToDate()) {
					check();
				}
				if (upToDate()) {
					console.log("info", "[HMR] App is up to date.");
				}
			})
			.catch(function (err) {
				window.location.reload();
			});
	};
	// 监听webpackHotUpdate事件
	var hotEmitter = require("./emitter");
	hotEmitter.on("webpackHotUpdate", function (currentHash) {
		lastHash = currentHash;
		if (!upToDate() && module.hot.status() === "idle") {
			console.log('开始热更新check');
			check();
		}
	});
} else {
	throw new Error("[HMR] Hot Module Replacement is disabled.");
}
