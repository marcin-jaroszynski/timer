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
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MINUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HOURS; });
const SECONDS = 1;
const MINUTES = 2;
const HOURS = 3;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Helper {
  static convertToHours(aTimeToConvert) {
    var strHours = '';
    if (this._isValidInteger(aTimeToConvert)) {
      let hours = Math.floor((aTimeToConvert / 60) / 60);
      if (10 > hours) {
        strHours += '0' + hours + ':';
      } else {
        strHours = hours + ':';
      }
    } else {
      strHours = '00:';
    }
    return strHours.toString();
  }

  static convertToMinutes(aTimeToConvert) {
    var strMinutes = '';
    if (this._isValidInteger(aTimeToConvert)) {
      let minutes = Math.floor((aTimeToConvert / 60) % 60);
      if (10 > minutes) {
        strMinutes = '0' + minutes + ':';
      } else {
        strMinutes = minutes + ':';
      }
    } else {
      strMinutes = '00:';
    }
    return strMinutes.toString();
  }

  static convertToSeconds(aTimeToConvert) {
    var strSeconds = '';
    if (this._isValidInteger(aTimeToConvert)) {
      let seconds = Math.round(aTimeToConvert % 60);
      if (10 > seconds) {
        strSeconds = '0' + seconds;
      } else {
        strSeconds = seconds;
      }
    } else {
      strSeconds = '00';
    }
    return strSeconds.toString();
  }

  static _isValidInteger(aTimeToConvert) {
    return Number(aTimeToConvert) === aTimeToConvert && aTimeToConvert % 1 === 0 && aTimeToConvert > 0;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Helper;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return END; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TICK; });
const START = 'start';
const END = 'end';
const TICK = 'tick';



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DOWN; });
const UP = 1;
const DOWN = 2;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__converter_converter_js__ = __webpack_require__(8);




class Timer {
  constructor(config) {
    this.id = null;
    this.event = new __WEBPACK_IMPORTED_MODULE_0__event_js__["a" /* Event */]();
    this.currentTime = config.currentTime ? config.currentTime : 0;
    this.tickTime = config.tickTime ? (config.tickTime * 1000) : 1000;
    this.repeatable = config.repeatable ? true : false; 
    this.format = config.format;
  }

  start() {
    let that = this;
    this.id = setInterval(function() {
      that._update();
      that.event.fire(__WEBPACK_IMPORTED_MODULE_1__event_js__["a" /* TICK */], [that.currentTime, that.maxTime]);
    }, this.tickTime);

    if (this.id) {
      this.event.fire(__WEBPACK_IMPORTED_MODULE_1__event_js__["c" /* START */]);
    }
  }

  stop() {
    let elapsedTime = this.restart();
    return elapsedTime;
  }

  pause() {
    clearInterval(this.id);
    this.id = null;
    return this.currentTime;
  }

  restart() {
    let elapsedTime = this.pause();
    this._setInitCurrentTime();
    this.event.fire(__WEBPACK_IMPORTED_MODULE_1__event_js__["b" /* END */], [elapsedTime]);
    return elapsedTime;
  }

  isPause() {
    return (this.id == null && this.currentTime > 0);
  }

  convert() {
    return __WEBPACK_IMPORTED_MODULE_2__converter_converter_js__["a" /* Converter */].convert(this.currentTime, this.format);
  }

  _update() {
    
  }

  _setInitCurrentTime() {
    this.currentTime = 0;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Timer;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__format_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__types_timer_up_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__types_timer_down_js__ = __webpack_require__(12);





class Factory {
  static getInstance(type, config) {
    switch (type) {
      case __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* UP */]:
      return new __WEBPACK_IMPORTED_MODULE_2__types_timer_up_js__["a" /* TimerUp */](config);

      case __WEBPACK_IMPORTED_MODULE_0__type_js__["b" /* DOWN */]:
      return new __WEBPACK_IMPORTED_MODULE_3__types_timer_down_js__["a" /* TimerDown */](config);
      
      default:
      return null;
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Factory;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer_type_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__timer_format_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timer_event_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__timer_factory_js__ = __webpack_require__(5);





window.onload = function() {
  let timerUpEl = document.getElementById('timer-up');
  let timerUp = __WEBPACK_IMPORTED_MODULE_3__timer_factory_js__["a" /* Factory */].getInstance(__WEBPACK_IMPORTED_MODULE_0__timer_type_js__["a" /* UP */], {format: __WEBPACK_IMPORTED_MODULE_1__timer_format_js__["a" /* HOURS */], maxTime: 15});
  timerUp.start();
  timerUp.event.on(__WEBPACK_IMPORTED_MODULE_2__timer_event_js__["a" /* TICK */], function(currentTime, maxTime) {
    timerUpEl.innerHTML = timerUp.convert();
  });

  timerUp.event.on(__WEBPACK_IMPORTED_MODULE_2__timer_event_js__["b" /* END */], function(elapsedTime) {
    timerUpEl.innerHTML = timerUp.convert();
  });

  let timerDownEl = document.getElementById('timer-down');
  let timerDown = __WEBPACK_IMPORTED_MODULE_3__timer_factory_js__["a" /* Factory */].getInstance(__WEBPACK_IMPORTED_MODULE_0__timer_type_js__["b" /* DOWN */], {format: __WEBPACK_IMPORTED_MODULE_1__timer_format_js__["b" /* MINUTES */], currentTime: 10, repeatable: true});
  timerDown.start();
  timerDown.event.on(__WEBPACK_IMPORTED_MODULE_2__timer_event_js__["a" /* TICK */], function(currentTime, maxTime) {
    timerDownEl.innerHTML = timerDown.convert();
  });
}



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Event {
  constructor() {
    this.events = {};
  }

  on(eventId, eventCallback) {
    this.events[eventId] = eventCallback;
  }

  off(eventId) {
    if (this.events[eventId]) {
      delete this.events[eventId];
    }
  }

  fire(eventId, params) {
    if (this.events[eventId]) {
      this.events[eventId].apply({}, params);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Event;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__format_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types_hours_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__types_minutes_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__types_seconds_js__ = __webpack_require__(11);





class Converter {
  static convert(aTimerToConvert, aTimerFormat) {
    switch (aTimerFormat) {
      case __WEBPACK_IMPORTED_MODULE_0__format_js__["a" /* HOURS */]:
      return __WEBPACK_IMPORTED_MODULE_1__types_hours_js__["a" /* Hours */].get(aTimerToConvert);

      case __WEBPACK_IMPORTED_MODULE_0__format_js__["b" /* MINUTES */]:
      return __WEBPACK_IMPORTED_MODULE_2__types_minutes_js__["a" /* Minutes */].get(aTimerToConvert);

      case __WEBPACK_IMPORTED_MODULE_0__format_js__["c" /* SECONDS */]:
      return __WEBPACK_IMPORTED_MODULE_3__types_seconds_js__["a" /* Seconds */].get(aTimerToConvert);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Converter;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_js__ = __webpack_require__(1);


class Hours {
  static get(aTimeToConvert) {
    let strTime = __WEBPACK_IMPORTED_MODULE_0__helper_js__["a" /* Helper */].convertToHours(aTimeToConvert);
    strTime += __WEBPACK_IMPORTED_MODULE_0__helper_js__["a" /* Helper */].convertToMinutes(aTimeToConvert);
    strTime += __WEBPACK_IMPORTED_MODULE_0__helper_js__["a" /* Helper */].convertToSeconds(aTimeToConvert);
    return strTime;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Hours;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_js__ = __webpack_require__(1);


class Minutes {
  static get(aTimeToConvert) {
    let strTime = __WEBPACK_IMPORTED_MODULE_0__helper_js__["a" /* Helper */].convertToMinutes(aTimeToConvert);
    strTime += __WEBPACK_IMPORTED_MODULE_0__helper_js__["a" /* Helper */].convertToSeconds(aTimeToConvert);
    return strTime;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Minutes;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_js__ = __webpack_require__(1);


class Seconds {
  static get(aTimeToConvert) {
    return __WEBPACK_IMPORTED_MODULE_0__helper_js__["a" /* Helper */].convertToSeconds(aTimeToConvert);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Seconds;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer_js__ = __webpack_require__(4);


class TimerDown extends __WEBPACK_IMPORTED_MODULE_0__timer_js__["a" /* Timer */] {
  constructor(config) {
    super(config);
    this.initTime = config.currentTime;
  }

  restart() {
    let elapsedTime = super.restart();
    return elapsedTime;
  }

  stop() {
    var elapsedTime = super.stop();
    return this.initTime - elapsedTime;
  }

  _update() {
    if (this.currentTime > 0) {
      this.currentTime--;
    } else {
      if (this.repeatable) {
        this.stop();
        this.start();
      } else {
        this.stop();
      }
    }
  }

  _setInitCurrentTime() {
    this.currentTime = this.initTime;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TimerDown;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer_js__ = __webpack_require__(4);


class TimerUp extends __WEBPACK_IMPORTED_MODULE_0__timer_js__["a" /* Timer */] {
  constructor(config) {
    super(config);
    this.maxTime = parseInt(config.maxTime);
    if (0 > this.maxTime || isNaN(this.maxTime)) {
      this.maxTime = 0;
    }
  }

  restart() {
    let elapsedTime = super.restart();
    return elapsedTime;
  }


  _update() {
    if (this.maxTime === 0 || this.maxTime > this.currentTime) {
      this.currentTime++;
    } else {
      if (this.repeatable) {
        this.restart();
      } else {
        this.stop();
      }
    }
  }

  _setInitCurrentTime() {
    this.currentTime = 0;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TimerUp;


/***/ })
/******/ ]);