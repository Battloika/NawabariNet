/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var mode = "clear";

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	  if (request.type == "get_mode") {
	    sendResponse(mode);
	    return;
	  }

	  mode = request.mode;
	  changePaintMode();
	});

	chrome.tabs.onActivated.addListener(function (activeInfo) {
	  mode = "clear";
	  changePaintMode();
	});

	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
	  mode = "clear";
	  changePaintMode();
	});

	function changePaintMode() {
	  var queryInfo = {
	    active: true,
	    windowId: chrome.windows.WINDOW_ID_CURRENT
	  };

	  chrome.tabs.query(queryInfo, function (result) {
	    var currentTab = result.shift();
	    chrome.tabs.sendMessage(currentTab.id, {
	      type: "change_mode",
	      mode: mode
	    });
	  });
	}

/***/ }
/******/ ]);