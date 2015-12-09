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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(161);


/***/ },

/***/ 161:
/***/ function(module, exports) {

	"use strict";

	$(function () {
	  var _this = this;

	  var updatePaintAreaSize = function updatePaintAreaSize() {
	    var paint_area_height = document.documentElement.scrollHeight || document.body.scrollHeight;
	    var paint_area_width = document.documentElement.scrollWidth || document.body.scrollWidth;

	    if (paint_area_height < $(window).height()) paint_area_height = $(window).height();

	    if (paint_area_width < $(window).width()) paint_area_width = $(window).width();

	    $("#effect-area").css({
	      "height": paint_area_height + "px",
	      "width": paint_area_width + "px"
	    });
	  };

	  var paint = function paint(pos_x, pos_y, num, variance, fadeout) {
	    if (!pos_x) pos_x = 100;
	    if (!pos_y) pos_y = 100;
	    if (!num) num = 10;
	    if (!variance) variance = 100;

	    var ink_width = 100;

	    for (var i = 0; i < num; i++) {
	      var variance_radius = variance * Math.random();
	      var variance_radian = 2 * Math.PI * Math.random();

	      var $img = $("<img>", {
	        "class": "ink",
	        "src": image_urls["red_ink"]
	      }).css({
	        "position": "absolute",
	        "top": $(window).scrollTop() + window.innerHeight + "px",
	        "left": window.innerWidth / 2 + "px",
	        "width": ink_width / 5 + "px",
	        "pointer-events": "none",
	        "z-index": "20000"
	      });

	      $("#effect-area").append($img);

	      if (fadeout) $img.fadeIn(100).delay(500).fadeOut(2000).queue(function () {
	        _this.remove();
	      });else $img.animate({
	        "top": pos_y - ink_width / 2 + variance_radius * Math.sin(variance_radian) + ink_width / 2 + "px",
	        "left": pos_x - ink_width / 2 + variance_radius * Math.cos(variance_radian) + ink_width / 2 + "px"
	      }, 300).animate({
	        "top": pos_y - ink_width / 2 + variance_radius * Math.sin(variance_radian) + "px",
	        "left": pos_x - ink_width / 2 + variance_radius * Math.cos(variance_radian) + "px",
	        "width": ink_width + "px"
	      }, 100);
	    }
	  };

	  var image_urls = {
	    red_ink: chrome.extension.getURL("images/red_ink.png"),
	    blue_ink: chrome.extension.getURL("images/blue_ink.png"),
	    sight: chrome.extension.getURL("images/sight.png")
	  };

	  var mousedowned = false;
	  var in_interval = false;
	  var drawInterval = window.setInterval(function () {
	    in_interval = false;
	  }, 100);

	  $("body").append($("<div></div>", {
	    "id": "effect-area"
	  }).css({
	    "position": "absolute",
	    "top": "0",
	    "left": "0",
	    "overflow": "hidden",
	    "pointer-events": "none",
	    "z-index": "20000"
	  }).on("mousedown", function (event) {
	    mousedowned = true;
	    paint(event.pageX, event.pageY, 3);
	  }).on("mousemove", function (event) {
	    if (mousedowned && !in_interval) {
	      paint(event.pageX, event.pageY, 5);
	      in_interval = true;
	    }
	  }).on("mouseup", function () {
	    mousedowned = false;
	  }));

	  updatePaintAreaSize();

	  $(window).scroll(function () {
	    updatePaintAreaSize();
	  });

	  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	    if (request.type == "get_url") {
	      sendResponse(location.href);
	      return;
	    }

	    if (request.type == "change_mode") {
	      if (request.mode == "clear") {
	        $("#effect-area .ink").fadeOut(1000, function () {
	          $("#effect-area .ink").remove();
	        });
	        $("#effect-area").css({
	          "pointer-events": "none",
	          "cursor": "auto"
	        });
	      }

	      if (request.mode == "paint") {
	        $("#effect-area").css({
	          "pointer-events": "auto",
	          "cursor": "url(" + image_urls.sight + "), crosshair"
	        });
	      }
	    }
	  });
	});

/***/ }

/******/ });