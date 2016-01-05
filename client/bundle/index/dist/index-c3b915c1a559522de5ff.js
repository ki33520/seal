webpackJsonp([13],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(413);
	module.exports = __webpack_require__(424);


/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _extends = __webpack_require__(209)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.wrapComponentWithActions = wrapComponentWithActions;

	var _redux = __webpack_require__(197);

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reduxThunk = __webpack_require__(215);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(216);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var logger = (0, _reduxLogger2["default"])();

	var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2["default"], logger)(_redux.createStore);

	exports["default"] = createStoreWithMiddleware;

	function wrapComponentWithActions(UnwrapperComponent, actions) {
	    var WrappedComponent = (function (_Component) {
	        _inherits(WrappedComponent, _Component);

	        function WrappedComponent() {
	            _classCallCheck(this, WrappedComponent);

	            _get(Object.getPrototypeOf(WrappedComponent.prototype), "constructor", this).apply(this, arguments);
	        }

	        _createClass(WrappedComponent, [{
	            key: "render",
	            value: function render() {
	                return _react2["default"].createElement(UnwrapperComponent, _extends({}, this.props, (0, _redux.bindActionCreators)(actions, this.props.dispatch)));
	            }
	        }]);

	        return WrappedComponent;
	    })(_react.Component);

	    return WrappedComponent;
	}

/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(210)["default"];

	exports["default"] = _Object$assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	exports.__esModule = true;

/***/ },

/***/ 210:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(211), __esModule: true };

/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(212);
	module.exports = __webpack_require__(16).Object.assign;

/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(14);

	$def($def.S + $def.F, 'Object', {assign: __webpack_require__(213)});

/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(7)
	  , toObject = __webpack_require__(214)
	  , IObject  = __webpack_require__(10);

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(17)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },

/***/ 215:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = thunkMiddleware;

	function thunkMiddleware(_ref) {
	  var dispatch = _ref.dispatch;
	  var getState = _ref.getState;

	  return function (next) {
	    return function (action) {
	      return typeof action === 'function' ? action(dispatch, getState) : next(action);
	    };
	  };
	}

	module.exports = exports['default'];

/***/ },

/***/ 216:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var repeat = function repeat(str, times) {
	  return new Array(times + 1).join(str);
	};
	var pad = function pad(num, maxLength) {
	  return repeat("0", maxLength - num.toString().length) + num;
	};

	// Use the new performance api to get better precision if available
	var timer = typeof performance !== "undefined" && typeof performance.now === "function" ? performance : Date;

	/**
	 * Creates logger with followed options
	 *
	 * @namespace
	 * @property {object} options - options for logger
	 * @property {string} options.level - console[level]
	 * @property {object} options.logger - implementation of the `console` API.
	 * @property {boolean} options.collapsed - is group collapsed?
	 * @property {boolean} options.predicate - condition which resolves logger behavior
	 * @property {bool} options.duration - print duration of each action?
	 * @property {bool} options.timestamp - print timestamp with each action?
	 * @property {function} options.transformer - transform state before print
	 * @property {function} options.actionTransformer - transform action before print
	 */

	function createLogger() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  return function (_ref) {
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        var level = options.level;
	        var logger = options.logger;
	        var collapsed = options.collapsed;
	        var predicate = options.predicate;
	        var _options$duration = options.duration;
	        var duration = _options$duration === undefined ? false : _options$duration;
	        var _options$timestamp = options.timestamp;
	        var timestamp = _options$timestamp === undefined ? true : _options$timestamp;
	        var _options$transformer = options.transformer;
	        var transformer = _options$transformer === undefined ? function (state) {
	          return state;
	        } : _options$transformer;
	        var _options$actionTransformer = options.actionTransformer;
	        var actionTransformer = _options$actionTransformer === undefined ? function (actn) {
	          return actn;
	        } : _options$actionTransformer;

	        var console = logger || window.console;

	        // exit if console undefined
	        if (typeof console === "undefined") {
	          return next(action);
	        }

	        // exit early if predicate function returns false
	        if (typeof predicate === "function" && !predicate(getState, action)) {
	          return next(action);
	        }

	        var started = timer.now();
	        var prevState = transformer(getState());

	        var returnValue = next(action);
	        var took = timer.now() - started;

	        var nextState = transformer(getState());

	        // formatters
	        var time = new Date();
	        var isCollapsed = typeof collapsed === "function" ? collapsed(getState, action) : collapsed;

	        var formattedTime = timestamp ? " @ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3) : "";
	        var formattedDuration = duration ? " in " + took.toFixed(2) + " ms" : "";
	        var formattedAction = actionTransformer(action);
	        var message = "action " + formattedAction.type + formattedTime + formattedDuration;
	        var startMessage = isCollapsed ? console.groupCollapsed : console.group;

	        // render
	        try {
	          startMessage.call(console, message);
	        } catch (e) {
	          console.log(message);
	        }

	        if (level) {
	          console[level]("%c prev state", "color: #9E9E9E; font-weight: bold", prevState);
	          console[level]("%c action", "color: #03A9F4; font-weight: bold", formattedAction);
	          console[level]("%c next state", "color: #4CAF50; font-weight: bold", nextState);
	        } else {
	          console.log("%c prev state", "color: #9E9E9E; font-weight: bold", prevState);
	          console.log("%c action", "color: #03A9F4; font-weight: bold", formattedAction);
	          console.log("%c next state", "color: #4CAF50; font-weight: bold", nextState);
	        }

	        try {
	          console.groupEnd();
	        } catch (e) {
	          console.log("—— log end ——");
	        }

	        return returnValue;
	      };
	    };
	  };
	}

	exports["default"] = createLogger;
	module.exports = exports["default"];

/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(210)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.apiRequest = apiRequest;
	exports.base64Encode = base64Encode;
	exports.base64Decode = base64Decode;
	exports.base64EncodeForURL = base64EncodeForURL;
	exports.base64DecodeForURL = base64DecodeForURL;
	exports.urlParam = urlParam;
	exports.dispatchEvent = dispatchEvent;
	exports.bindEvent = bindEvent;
	exports.unbindEvent = unbindEvent;
	exports.scrollTop = scrollTop;
	exports.registerPullDownEvent = registerPullDownEvent;

	var _reqwest = __webpack_require__(228);

	var _reqwest2 = _interopRequireDefault(_reqwest);

	var _crypto = __webpack_require__(230);

	function apiRequest(url, param) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {
	        method: "GET",
	        type: "json"
	    } : arguments[2];

	    options = _Object$assign({}, options, {
	        url: url,
	        data: param
	    });
	    return (0, _reqwest2["default"])(options);
	}

	function base64Encode(str) {
	    return _crypto.base64.encode(str);
	}

	function base64Decode(encodedStr) {
	    return _crypto.base64.decode(encodedStr);
	}

	function base64EncodeForURL(str) {
	    var encodedStr = _crypto.base64.encode(str);
	    return encodedStr.replace(/=/g, "_").replace(/\//g, ",").replace(/\+/g, "-");
	}

	function base64DecodeForURL(encodedStr) {
	    encodedStr = encodedStr.replace(/_/g, "=").replace(/,/g, "/").replace(/-/g, "+");
	    return _crypto.base64.decode(encodedStr);
	}

	function urlParam(param) {
	    var paramStr = [];
	    for (var key in param) {
	        paramStr.push(key + "=" + param[key]);
	    }
	    return paramStr.join("&");
	}

	function dispatchEvent(el, event) {
	    var e = document.createEvent('Event');
	    e.initEvent(event, true, true);
	    el.dispatchEvent(e);
	}

	function bindEvent(el, event, listener) {
	    if (el.addEventListener) {
	        el.addEventListener(event, listener, false);
	    } else if (el.attachEvent) {
	        el.attachEvent("on${event}", function (e) {
	            listener.call(el, e || window.event);
	        });
	    }
	}

	function unbindEvent(el, event, listener) {
	    if (el.removeEventListener) {
	        el.removeEventListener(event, listener);
	    } else if (el.detachEvent) {
	        el.detachEvent("on${event}", listener);
	    }
	}

	function scrollTop(value) {
	    var isCSS1Compat = document.compatMode === 'CSS1Compat';
	    var supportPageOffset = window.pageYOffset !== undefined;
	    var scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
	    var scrollLeft = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
	    if (value !== undefined) {
	        window.scrollTo(scrollLeft, value);
	    }
	    return scrollTop;
	}

	function registerPullDownEvent(callback) {
	    var _this = this;

	    this.bindEvent(window, 'scroll', function () {
	        var scrollTop = _this.scrollTop();
	        if (document.documentElement.clientHeight + scrollTop >= document.documentElement.scrollHeight) {
	            callback();
	        }
	    });
	}

	var util = {
	    bindEvent: bindEvent,
	    unbindEvent: unbindEvent,
	    scrollTop: scrollTop,
	    registerPullDownEvent: registerPullDownEvent
	};
	exports["default"] = util;

/***/ },

/***/ 230:
/***/ function(module, exports) {

	module.exports = {
	    base64: {
	        settings: { // defaults
	            "char62": "+",
	            "char63": "/",
	            "pad": "=",
	            "ascii": false
	        },
	        encode: function(str) {
	            this.char_set =
	                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + this.settings.char62 + this.settings.char63;

	            var output = ""; // final output
	            var buf = ""; // binary buffer
	            for (var i = 0; i < str.length; ++i) {
	                var c_num = str.charCodeAt(i);
	                if (this.settings.ascii)
	                    if (c_num >= 256)
	                        throw "Not an 8-bit char.";
	                var c_bin = c_num.toString(2);
	                while (c_bin.length < (this.settings.ascii ? 8 : 16))
	                    c_bin = "0" + c_bin;
	                buf += c_bin;

	                while (buf.length >= 6) {
	                    var sextet = buf.slice(0, 6);
	                    buf = buf.slice(6);
	                    output += this.char_set.charAt(parseInt(sextet, 2));
	                }
	            }

	            if (buf) { // not empty
	                while (buf.length < 6) buf += "0";
	                output += this.char_set.charAt(parseInt(buf, 2));
	            }

	            if (this.settings.pad)
	                while (output.length % (this.settings.ascii ? 4 : 8) != 0)
	                    output += this.settings.pad;

	            return output;
	        },
	        decode: function(str) {
	            this.char_set =
	                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + this.settings.char62 + this.settings.char63;

	            var output = ""; // final output
	            var buf = ""; // binary buffer
	            var bits = (this.settings.ascii ? 8 : 16);
	            for (var i = 0; i < str.length; ++i) {
	                if (str[i] == this.settings.pad) break;
	                var c_num = this.char_set.indexOf(str.charAt(i));
	                if (c_num == -1) throw "Not base64.";
	                var c_bin = c_num.toString(2);
	                while (c_bin.length < 6) c_bin = "0" + c_bin;
	                buf += c_bin;

	                while (buf.length >= bits) {
	                    var octet = buf.slice(0, bits);
	                    buf = buf.slice(bits);
	                    output += String.fromCharCode(parseInt(octet, 2));
	                }
	            }
	            return output;
	        }
	    }
	}

/***/ },

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },

/***/ 238:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _domRequestAnimationFrame = __webpack_require__(239);

	var _domRequestAnimationFrame2 = _interopRequireDefault(_domRequestAnimationFrame);

	var dom = {
	  bindEvent: function bindEvent(el, event, listener) {
	    if (el.addEventListener) {
	      el.addEventListener(event, listener, false);
	    } else if (el.attachEvent) {
	      el.attachEvent("on${event}", function (e) {
	        listener.call(el, e || window.event);
	      });
	    }
	  },
	  unbindEvent: function unbindEvent(el, event, listener) {
	    if (el.removeEventListener) {
	      el.removeEventListener(event, listener, false);
	    } else if (el.detachEvent) {
	      el.detachEvent("on${event}", listener);
	    }
	  },
	  offset: function offset(element) {
	    var dynamic = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	    if (!element) {
	      return null;
	    }
	    var top = 0,
	        left = 0;
	    if ("getBoundingClientRect" in document.documentElement && !dynamic) {
	      var rect = element.getBoundingClientRect();
	      var doc = element.ownerDocument;
	      var body = doc.body;
	      var docEl = doc.documentElement;
	      var clientTop = docEl.clientTop || body.clientTop || 0;
	      var clientLeft = docEl.clientLeft || body.clientLeft || 0;
	      var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	      var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

	      return {
	        top: rect.top + scrollTop - clientTop,
	        left: rect.left + scrollLeft - clientLeft
	      };
	    } else {
	      do {
	        top += element.offsetTop || 0;
	        left += element.offsetLeft || 0;
	        element = element.offsetParent;
	      } while (element);
	      return { top: top, left: left };
	    }
	  },
	  ownerWindow: function ownerWindow(element) {
	    var doc = element && element.ownerDocument || document;
	    return doc.defaultView || doc.parentWindow || window;
	  },
	  inViewport: function inViewport(element) {
	    var container = arguments.length <= 1 || arguments[1] === undefined ? window : arguments[1];
	    var diffInViewport = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	    if (container === window) {
	      var _top = element.offsetTop;
	      var left = element.offsetLeft;
	      var width = element.offsetWidth;
	      var height = element.offsetHeight;
	      while (element.offsetParent) {
	        element = element.offsetParent;
	        _top += element.offsetTop;
	        left += element.offsetLeft;
	      }
	      return _top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && _top + height > window.pageYOffset && left + width > window.pageXOffset;
	    } else {
	      var _top2 = dom.offset(element).top;
	      var containerTop = dom.scrollTop(container);
	      var containerPaddingTop = dom.offset(container.firstChild).top;

	      return containerTop + containerPaddingTop < _top2 + element.offsetHeight && _top2 - diffInViewport < containerTop + container.offsetHeight;
	    }
	  },
	  scrollNode: function scrollNode(element) {
	    var scrollNode = element;
	    while (scrollNode !== window) {
	      scrollNode = scrollNode.parentNode;
	      if (scrollNode.scrollTop > 0) {
	        break;
	      }
	    }
	    return scrollNode;
	  },
	  scrollInView: function scrollInView(element) {
	    var container = arguments.length <= 1 || arguments[1] === undefined ? window : arguments[1];
	    var callback = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];
	    var axis = arguments.length <= 3 || arguments[3] === undefined ? "y" : arguments[3];

	    var top = dom.offset(element).top - dom.offset(container.firstChild).top;
	    var left = dom.offset(element).left - dom.offset(container.firstChild).left;
	    var step = 15;
	    var cancelScroll = function cancelScroll() {
	      abort();
	    };
	    function abort() {
	      dom.unbindEvent(element, "touchstart", cancelScroll);
	    }
	    dom.bindEvent(element, "touchstart", cancelScroll);

	    (0, _domRequestAnimationFrame2["default"])(function smoothScroll() {
	      var scrollTop = dom.scrollTop(container);
	      var scrollLeft = dom.scrollLeft(container);
	      if (axis === "y") {
	        if (top > scrollTop && scrollTop + container.offsetHeight !== container.scrollHeight) {
	          scrollTop = scrollTop + step >= top ? top : scrollTop + step;
	          dom.scrollTop(container, scrollTop);
	          (0, _domRequestAnimationFrame2["default"])(smoothScroll);
	        } else if (top < scrollTop && scrollTop >= 0) {
	          scrollTop = scrollTop - step <= top ? top : scrollTop - step;
	          dom.scrollTop(container, scrollTop);
	          (0, _domRequestAnimationFrame2["default"])(smoothScroll);
	        } else {
	          abort();
	          callback();
	        }
	      } else if (axis === "x") {
	        if (left > scrollLeft && scrollLeft + container.offsetWidth !== container.scrollWidth) {
	          //console.log("scroll right")
	          scrollLeft = scrollLeft + step >= left ? left : scrollLeft + step;
	          dom.scrollLeft(container, scrollLeft);
	          (0, _domRequestAnimationFrame2["default"])(smoothScroll());
	        } else if (left < scrollLeft && scrollLeft >= 0) {
	          //console.log("scroll left")
	          scrollLeft = scrollLeft - step <= left ? left : scrollLeft - step;
	          dom.scrollLeft(container, scrollLeft);
	          (0, _domRequestAnimationFrame2["default"])(smoothScroll());
	        } else {
	          abort();
	          callback();
	        }
	      }
	    });
	  },
	  scrollPosition: function scrollPosition(element) {
	    var isCSS1Compat = document.compatMode === 'CSS1Compat';
	    var supportPageOffset = window.pageYOffset !== undefined;
	    var scrollTop = undefined,
	        scrollLeft = undefined;
	    if (element === window) {
	      scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
	      scrollLeft = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
	    } else {
	      scrollTop = element.scrollTop;
	      scrollLeft = element.scrollLeft;
	    }
	    return {
	      scrollLeft: scrollLeft, scrollTop: scrollTop
	    };
	  },
	  scrollTop: function scrollTop(element, value) {
	    var _dom$scrollPosition = dom.scrollPosition(element);

	    var scrollTop = _dom$scrollPosition.scrollTop;
	    var scrollLeft = _dom$scrollPosition.scrollLeft;

	    if (value !== undefined) {
	      if (element === window) {
	        window.scrollTo(scrollLeft, value);
	      } else {
	        element.scrollTop = value;
	      }
	    }
	    return scrollTop;
	  },
	  scrollLeft: function scrollLeft(element, value) {
	    var _dom$scrollPosition2 = dom.scrollPosition(element);

	    var scrollTop = _dom$scrollPosition2.scrollTop;
	    var scrollLeft = _dom$scrollPosition2.scrollLeft;

	    if (value !== undefined) {
	      if (element === window) {
	        window.scrollTo(value, scrollTop);
	      } else {
	        element.scrollLeft = value;
	      }
	    }
	    return scrollLeft;
	  },
	  smoothScroll: function smoothScroll() {
	    var element = arguments.length <= 0 || arguments[0] === undefined ? window : arguments[0];
	    var position = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var axis = arguments.length <= 2 || arguments[2] === undefined ? "y" : arguments[2];

	    var targetY = position.top && parseInt(position.top, 10) || 0;
	    var targetX = position.left && parseInt(position.left, 10) || 0;
	    var initialY = dom.scrollTop(element);
	    var initialX = dom.scrollLeft(element);
	    var lastY = initialY;
	    var lastX = initialX;
	    var delta = asxis === "y" ? targetY - initialY : targetX - initialX;
	    var speed = Math.min(750, Math.min(1500, Math.abs(delta)));
	    // var scrollInProgress = true;
	    if (delta === 0) {
	      return;
	    }
	    function smooth(pos) {
	      if ((pos /= 0.5) < 1) {
	        return 0.5 * Math.pow(pos, 5);
	      }
	      return 0.5 * (Math.pow(pos - 2, 5) + 2);
	    }
	    var cancelScroll = function cancelScroll() {
	      abort();
	    };
	    function abort() {
	      dom.unbindEvent(element, "touchstart", cancelScroll);
	      // scrollInProgress = false;
	    }
	    dom.bindEvent(element, "touchstart", cancelScroll);

	    var start, t, y, x;
	    (0, _domRequestAnimationFrame2["default"])(function render() {
	      // if(!scrollInProgress){
	      //     return;
	      // }
	      // scrollInProgress = true;
	      var now = Date.now();
	      if (!start) {
	        start = now;
	      }
	      // calculate t, position of animation in [0..1]
	      t = Math.min(1, Math.max((now - start) / speed, 0));
	      if (axis === "y") {
	        y = Math.round(initialY + delta * smooth(t));
	        if (delta < 0 && y < targetY) {
	          y = targetY;
	        }
	        if (delta > 0 && y > targetY) {
	          y = targetY;
	        }
	        if (lastY !== y) {
	          dom.scrollTop(element, y);
	        }
	        // refresh current position Y
	        lastY = y;
	        if (y !== targetY) {
	          (0, _domRequestAnimationFrame2["default"])(render);
	        } else {
	          abort();
	        }
	      } else if (axis === "x") {
	        x = Math.round(initialX + delta * smooth(t));
	        if (delta < 0 && x < targetX) {
	          x = targetX;
	        }
	        if (delta > 0 && x > targetX) {
	          x = targetX;
	        }
	        if (lastX !== x) {
	          dom.scrollLeft(element, x);
	        }
	        // refresh current position Y
	        lastX = x;
	        if (x !== targetX) {
	          (0, _domRequestAnimationFrame2["default"])(render);
	        } else {
	          abort();
	        }
	      }
	    });
	  },
	  hasClass: function hasClass(element, className) {
	    if (element.classList) {
	      return !!className && element.classList.contains(className);
	    }
	    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
	  },
	  addClass: function addClass(element, className) {
	    if (element) {
	      if (element.classList) {
	        element.classList.add(className);
	      } else if (!dom.hasClass(element, className)) {
	        element.className = element.className + ' ' + className;
	      }
	    }
	    return element;
	  },
	  removeClass: function removeClass(element, className) {
	    if (element && element.classList) {
	      element.classList.remove(className);
	    } else if (dom.hasClass(element, className)) {
	      element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ') // multiple spaces to one
	      .replace(/^\s*|\s*$/g, ''); // trim the ends
	    }
	  },
	  hasNode: function hasNode(node, parent) {
	    while (node) {
	      if (node === parent) {
	        return true;
	      }
	      node = node.parentNode;
	    }
	    return false;
	  },
	  inTouchableRegion: function inTouchableRegion(x, y, element) {
	    var offset = dom.offset(element);
	    var minY = offset.top;
	    var maxY = offset.top + element.offsetHeight;
	    var minX = offset.left;
	    var maxX = offset.left + element.offsetWidth;
	    var isXValid = x >= minX && x <= maxX;
	    var isYValid = y >= minY && y <= maxY;
	    if (isXValid && isYValid) {
	      return true;
	    }
	    return false;
	  }
	};

	exports["default"] = dom;
	module.exports = exports["default"];

/***/ },

/***/ 239:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	    
	var nativeRAF = global.requestAnimationFrame ||
	  global.webkitRequestAnimationFrame ||
	  global.mozRequestAnimationFrame;

	var lastTime = 0;

	var requestAnimationFrame = nativeRAF ||
	  function(callback) {
	    var currTime = Date.now();
	    var timeDelay = Math.max(0, 16 - (currTime - lastTime));

	    lastTime = currTime + timeDelay;
	    return global.setTimeout(function() {
	      callback(Date.now());
	    }, timeDelay);
	  };

	// Works around a rare bug in Safari 6 where the first request is never invoked.
	requestAnimationFrame(function() {});

	module.exports = requestAnimationFrame;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 289:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Array$from = __webpack_require__(290)["default"];

	exports["default"] = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  } else {
	    return _Array$from(arr);
	  }
	};

	exports.__esModule = true;

/***/ },

/***/ 290:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(291), __esModule: true };

/***/ },

/***/ 291:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(292);
	__webpack_require__(308);
	module.exports = __webpack_require__(16).Array.from;

/***/ },

/***/ 292:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(293)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(295)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },

/***/ 293:
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(294)
	  , defined   = __webpack_require__(12);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },

/***/ 294:
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },

/***/ 295:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY         = __webpack_require__(296)
	  , $def            = __webpack_require__(14)
	  , $redef          = __webpack_require__(297)
	  , hide            = __webpack_require__(298)
	  , has             = __webpack_require__(301)
	  , SYMBOL_ITERATOR = __webpack_require__(302)('iterator')
	  , Iterators       = __webpack_require__(305)
	  , $iterCreate     = __webpack_require__(306)
	  , setToStringTag  = __webpack_require__(307)
	  , getProto        = __webpack_require__(7).getProto
	  , BUGGY           = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values';
	var returnThis = function(){ return this; };
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
	  }
	  // Define iterator
	  if((!LIBRARY || FORCE) && (BUGGY || !(SYMBOL_ITERATOR in proto))){
	    hide(proto, SYMBOL_ITERATOR, _default);
	  }
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEFAULT == VALUES ? _default : getMethod(VALUES),
	      keys:    IS_SET            ? _default : getMethod(KEYS),
	      entries: DEFAULT != VALUES ? _default : getMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * BUGGY, NAME, methods);
	  }
	  return methods;
	};

/***/ },

/***/ 296:
/***/ function(module, exports) {

	module.exports = true;

/***/ },

/***/ 297:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(298);

/***/ },

/***/ 298:
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(7)
	  , createDesc = __webpack_require__(299);
	module.exports = __webpack_require__(300) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },

/***/ 299:
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },

/***/ 301:
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },

/***/ 302:
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(303)('wks')
	  , uid    = __webpack_require__(304)
	  , Symbol = __webpack_require__(15).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },

/***/ 303:
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },

/***/ 304:
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },

/***/ 305:
/***/ function(module, exports) {

	module.exports = {};

/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(7)
	  , descriptor     = __webpack_require__(299)
	  , setToStringTag = __webpack_require__(307)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(298)(IteratorPrototype, __webpack_require__(302)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },

/***/ 307:
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(7).setDesc
	  , has = __webpack_require__(301)
	  , TAG = __webpack_require__(302)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },

/***/ 308:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(25)
	  , $def        = __webpack_require__(14)
	  , toObject    = __webpack_require__(214)
	  , call        = __webpack_require__(309)
	  , isArrayIter = __webpack_require__(310)
	  , toLength    = __webpack_require__(311)
	  , getIterFn   = __webpack_require__(312);
	$def($def.S + $def.F * !__webpack_require__(314)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , $$      = arguments
	      , $$len   = $$.length
	      , mapfn   = $$len > 1 ? $$[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },

/***/ 309:
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(24);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },

/***/ 310:
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(305)
	  , ITERATOR   = __webpack_require__(302)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return (Iterators.Array || ArrayProto[ITERATOR]) === it;
	};

/***/ },

/***/ 311:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(294)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },

/***/ 312:
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(313)
	  , ITERATOR  = __webpack_require__(302)('iterator')
	  , Iterators = __webpack_require__(305);
	module.exports = __webpack_require__(16).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },

/***/ 313:
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(11)
	  , TAG = __webpack_require__(302)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },

/***/ 314:
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(302)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },

/***/ 321:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _toConsumableArray = __webpack_require__(289)["default"];

	var _Object$assign = __webpack_require__(210)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(218);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames = __webpack_require__(234);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _libDomEs6 = __webpack_require__(238);

	var _libDomEs62 = _interopRequireDefault(_libDomEs6);

	var Slider = (function (_Component) {
	    _inherits(Slider, _Component);

	    function Slider(props) {
	        _classCallCheck(this, Slider);

	        _get(Object.getPrototypeOf(Slider.prototype), "constructor", this).call(this, props);
	        var defaultActiveIndex = this.needPseudoNode() ? 1 : 0;
	        this.state = {
	            activeIndex: this.props.defaultActiveIndex !== undefined ? this.props.defaultActiveIndex : defaultActiveIndex,
	            prevActiveIndex: null,
	            nextActiveIndex: null,
	            direction: null,
	            slidesStyle: null,
	            slideStyle: null
	        };
	        this.paused = false;
	        this.slides = null;
	    }

	    _createClass(Slider, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            this.initialize();
	            this.props.autoPlay && this.slideToNext();
	        }
	    }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            clearTimeout(this.timeout);
	        }
	    }, {
	        key: "initialize",
	        value: function initialize() {
	            var rect = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	            var oriention = this.props.oriention;
	            var activeIndex = this.state.activeIndex;

	            if (this.props.defaultActiveIndex !== undefined) {
	                activeIndex = this.props.defaultActiveIndex;
	            }
	            // const slideNode = React.findDOMNode(this).querySelector(".slides").firstChild;
	            var slideNode = _reactDom2["default"].findDOMNode(this);
	            var slideNodeWidth = slideNode.offsetWidth;
	            var slideNodeHeight = slideNode.querySelector(".slides").firstChild.offsetHeight;
	            if (rect !== null) {
	                slideNodeWidth = rect.width ? rect.width : slideNodeWidth;
	                slideNodeHeight = rect.height ? rect.height : slideNodeHeight;
	            }
	            var slidesWidth = slideNodeWidth * this.slides.length;
	            var slidesHeight = slideNodeHeight * this.slides.length;
	            // console.log('slidesHeight',slideNode.querySelector(".slides").offsetHeight)
	            if (slidesWidth === 0 && oriention === "horizontal" || slidesHeight === 0 && oriention === "vertical") {
	                return;
	            }
	            var slidesStyle = {
	                width: oriention === "horizontal" ? slidesWidth + "px" : null,
	                height: oriention === "vertical" ? slidesHeight + "px" : null
	            };
	            if (this.props.effect === "roll") {
	                var transform = this.props.oriention === "horizontal" ? "translate3D(-" + slideNodeWidth * activeIndex + "px,0,0)" : "translate3D(0,-" + slideNodeHeight * activeIndex + "px,0)";
	                slidesStyle = _Object$assign({}, slidesStyle, {
	                    transitionProperty: "transform",
	                    transitionTimingFunction: "ease-in-out",
	                    WebkitTransform: transform
	                });
	            }
	            // console.log('currentStyle',slideNodeHeight)
	            // const computedStyle = window.getComputedStyle(slideNode,null);
	            this.setState({
	                slideStyle: {
	                    width: oriention === "horizontal" ? slideNodeWidth : null,
	                    height: oriention === "vertical" ? slideNodeHeight : null
	                },
	                slidesStyle: slidesStyle,
	                activeIndex: activeIndex,
	                sliderStyle: {
	                    width: oriention === "horizontal" ? slideNodeWidth : null,
	                    height: oriention === "vertical" ? slideNodeHeight : null
	                }
	            });
	        }
	    }, {
	        key: "slideToNext",
	        value: function slideToNext() {
	            var self = this;
	            var count = this.slides.length;
	            this.timeout = setTimeout(function interval() {
	                var prevIndex = self.getActiveIndex();
	                self.next();
	                clearTimeout(self.timeout);
	                if (self.needPseudoNode() === true && prevIndex === count - 1 && self.paused === false) {
	                    self.timeout = setTimeout(interval, 10);
	                } else {
	                    self.timeout = setTimeout(interval, self.props.delay);
	                }
	            }, this.props.delay);
	        }
	    }, {
	        key: "needPseudoNode",
	        value: function needPseudoNode() {
	            return this.props.effect === "roll" && this.props.loop === true;
	        }
	    }, {
	        key: "play",
	        value: function play() {
	            this.paused = false;
	            this.slideToNext();
	        }
	    }, {
	        key: "pause",
	        value: function pause() {
	            this.paused = true;
	            clearTimeout(this.timeout);
	        }
	    }, {
	        key: "handleMouseOver",
	        value: function handleMouseOver() {
	            // console.log('onMouseOver')
	            if (this.props.pauseOnHover) {
	                this.pause();
	            }
	        }
	    }, {
	        key: "handleMouseOut",
	        value: function handleMouseOut() {
	            // console.log('onMouseOut')
	            if (this.paused === true) {
	                this.play();
	            }
	        }
	    }, {
	        key: "handleTouchStart",
	        value: function handleTouchStart(e) {
	            e && e.preventDefault();
	            if (this.animateSlide() === true) {
	                return;
	            }
	            if (this.touchEnabled === false) {
	                return;
	            }
	            var _e$changedTouches$0 = e.changedTouches[0];
	            var clientY = _e$changedTouches$0.clientY;
	            var clientX = _e$changedTouches$0.clientX;

	            this.startTouchX = clientX;
	            this.startTouchY = clientY;
	            // console.log('touch start',e.changedTouches,e.targetTouches,e.touches)
	        }
	    }, {
	        key: "handleTouchEnd",
	        value: function handleTouchEnd(e) {
	            e && e.preventDefault();
	            if (this.animateSlide() === true) {
	                return;
	            }
	            if (this.touchEnabled === false) {
	                return;
	            }

	            var _e$changedTouches$02 = e.changedTouches[0];
	            var clientY = _e$changedTouches$02.clientY;
	            var clientX = _e$changedTouches$02.clientX;

	            var inTouchableRegion = this.inTouchableRegion(clientX, clientY, e.currentTarget);
	            if (!inTouchableRegion) {
	                // e.preventDefault();
	                // return;
	            }
	            var offsetWidth = this.state.slideStyle.width;
	            var offsetHeight = this.state.slideStyle.height;
	            var oriention = this.props.oriention;

	            var offsetY, offsetX;
	            if (oriention === "vertical") {
	                offsetY = Math.abs(clientY) - Math.abs(this.startTouchY);
	                var absOfOffsetY = Math.abs(offsetY);
	                if (absOfOffsetY >= offsetHeight / 2) {
	                    if (offsetY < 0) {
	                        // console.log('next Y')
	                        setTimeout(this.next.bind(this), 100);
	                    } else if (offsetY > 0) {
	                        // console.log('prev Y')
	                        setTimeout(this.prev.bind(this), 100);
	                    }
	                } else {
	                    // console.log('restorePosition');
	                    absOfOffsetY > 0 && this.restorePosition();
	                }
	            }
	            if (oriention === "horizontal") {
	                offsetX = Math.abs(clientX) - Math.abs(this.startTouchX);
	                var absOfOffsetX = Math.abs(offsetX);
	                // console.log('distance',Math.abs(clientX),Math.abs(this.startTouchX))
	                if (absOfOffsetX >= offsetWidth / 2) {
	                    if (offsetX < 0) {
	                        // console.log('next X');
	                        setTimeout(this.next.bind(this), 100);
	                    } else if (offsetX > 0) {
	                        // console.log('prev X');
	                        setTimeout(this.prev.bind(this), 100);
	                    }
	                } else {
	                    absOfOffsetX > 0 && this.restorePosition();
	                }
	            }
	        }
	    }, {
	        key: "handleTouchMove",
	        value: function handleTouchMove(e) {
	            e && e.preventDefault();
	            if (this.animateSlide() === true) {
	                return;
	            }
	            if (this.touchEnabled === false) {
	                return;
	            }

	            var _e$changedTouches$03 = e.changedTouches[0];
	            var clientY = _e$changedTouches$03.clientY;
	            var clientX = _e$changedTouches$03.clientX;

	            var inTouchableRegion = this.inTouchableRegion(clientX, clientY, e.currentTarget);
	            if (!inTouchableRegion) {
	                e.preventDefault();
	                return;
	            }

	            var offsetX = Math.abs(this.startTouchX) - Math.abs(clientX);
	            var offsetY = Math.abs(this.startTouchY) - Math.abs(clientY);

	            // console.log('currentX',clientX,'currentY',clientY)
	            // console.log('lastX',this.lastMoveX,'lastY',this.lastMoveY)
	            this.transitionTouch(offsetX, offsetY);
	            this.lastMoveY = clientY;
	            this.lastMoveX = clientX;
	        }

	        /** if touch move not fill the change condition then restore the slide position */
	    }, {
	        key: "restorePosition",
	        value: function restorePosition() {
	            // console.log('restorePosition')
	            var oriention = this.props.oriention;

	            var activeIndex = this.getActiveIndex();
	            var transform = null;
	            if (oriention === "vertical") {
	                var scrollY = this.state.slideStyle.height * activeIndex;
	                transform = "translate3D(0,-" + scrollY + "px,0)";
	            } else if (oriention === "horizontal") {
	                var scrollX = this.state.slideStyle.width * activeIndex;
	                transform = "translate3D(-" + scrollX + "px,0,0)";
	            }
	            var slidesNode = _reactDom2["default"].findDOMNode(this.refs.slides);
	            if (transform !== null) {
	                slidesNode.style.WebkitTransform = transform;
	                slidesNode.style.transitionDuration = ".3s";
	            }
	        }
	    }, {
	        key: "transitionTouch",
	        value: function transitionTouch(offsetX, offsetY) {
	            var oriention = this.props.oriention;

	            var count = this.slides.length;
	            var activeIndex = this.getActiveIndex();
	            var transform = null;
	            if (oriention === "vertical" && offsetY !== 0) {
	                var scrollY = this.state.slideStyle.height * activeIndex;
	                var maxOffsetY = 1.25 * this.state.slideStyle.height;
	                // console.log('maxOffsetY',maxOffsetY,offsetY)
	                /** vertical move cant beyond limit*/
	                if (Math.abs(offsetY) > maxOffsetY) {
	                    // console.log('out of maxOffsetY',offsetY)
	                    return;
	                }
	                scrollY += offsetY;
	                transform = "translate3D(0,-" + scrollY + "px,0)";
	            } else if (oriention === "horizontal" && offsetX !== 0) {
	                var scrollX = this.state.slideStyle.width * activeIndex;
	                var maxOffsetX = 1.25 * this.state.slideStyle.width;
	                if (offsetX > maxOffsetX) {
	                    return;
	                }
	                scrollX += offsetX;
	                transform = "translate3D(-" + scrollX + "px,0,0)";
	            }
	            var slidesNode = _reactDom2["default"].findDOMNode(this.refs.slides);
	            if (transform !== null) {
	                slidesNode.style.WebkitTransform = transform;
	                slidesNode.style.transitionDuration = ".3s";
	            }
	        }
	    }, {
	        key: "inTouchableRegion",
	        value: function inTouchableRegion(x, y, element) {
	            var targetOffset = _libDomEs62["default"].offset(element);
	            var minY = targetOffset.top;
	            var maxY = targetOffset.top + element.offsetHeight;
	            var minX = targetOffset.left;
	            var maxX = targetOffset.left + element.offsetWidth;
	            var isXValid = x >= minX && x <= maxX;
	            var isYValid = y >= minY && y <= maxY;
	            if (isXValid && isYValid) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: "next",
	        value: function next(e) {
	            e && e.preventDefault();
	            var prevIndex = this.getActiveIndex();
	            var nextIndex = prevIndex + 1;
	            var count = this.slides.length;
	            if (nextIndex > count - 1) {
	                if (!this.props.loop) {
	                    return;
	                }
	                nextIndex = 0;
	            }
	            this.handleSelect(nextIndex, "next");
	        }
	    }, {
	        key: "prev",
	        value: function prev(e) {
	            e && e.preventDefault();
	            var prevIndex = this.getActiveIndex();
	            var nextIndex = prevIndex - 1;
	            var count = this.slides.length;
	            if (nextIndex < 0) {
	                if (!this.props.loop) {
	                    return;
	                }
	                nextIndex = count - 1;
	            }
	            this.handleSelect(nextIndex, 'prev');
	        }
	    }, {
	        key: "handleSelect",
	        value: function handleSelect(index, direction, e) {
	            var _this = this;

	            e && e.preventDefault();
	            var count = this.slides.length;
	            var prevActiveIndex, nextActiveIndex;
	            if (direction === "next") {
	                // console.log('index',index)
	                index = this.needPseudoNode() && index === 0 ? 1 : index;
	                prevActiveIndex = index - 1, nextActiveIndex = index + 1;
	                if (prevActiveIndex < 0) {
	                    prevActiveIndex = count - 1;
	                }
	                if (nextActiveIndex >= count) {
	                    nextActiveIndex = 0;
	                }
	            }
	            if (direction === "prev") {
	                index = this.needPseudoNode() && index === count - 1 ? count - 2 : index;
	                // console.log('index',index,count)
	                prevActiveIndex = index + 1, nextActiveIndex = index - 1;
	                if (nextActiveIndex < 0) {
	                    nextActiveIndex = count - 1;
	                }
	                if (prevActiveIndex >= count) {
	                    prevActiveIndex = 0;
	                }
	            }
	            var state = {
	                activeIndex: index,
	                prevActiveIndex: prevActiveIndex,
	                nextActiveIndex: nextActiveIndex,
	                direction: direction
	            };
	            var slidesStyle = this.transitionSlides(state, this.props, direction);
	            // console.log(slidesStyle)
	            this.setState(_Object$assign({}, state, {
	                slidesStyle: slidesStyle
	            }), function () {
	                index = _this.needPseudoNode() === true ? index - 1 : index;
	                // console.log('index will change',index)
	                _this.props.onChange(index);
	            });
	        }
	    }, {
	        key: "transitionSlides",
	        value: function transitionSlides(state, props, direction) {
	            if (state.prevActiveIndex === null) {
	                return;
	            }
	            // console.log(this.state)
	            var oriention = props.oriention;

	            var count = this.slides.length;
	            var activeIndex = state.activeIndex;
	            var slidesStyle = this.state.slidesStyle;
	            if (this.needPseudoNode() === true) {
	                var transform;
	                // if direction is next and should active is pseudo item then redirect to the first real item
	                if (activeIndex === 1 && state.direction === "next") {
	                    transform = oriention === "horizontal" ? "translate3D(-" + this.state.slideStyle.width + "px,0,0)" : "translate3D(0,-" + this.state.slideStyle.height + "px,0)";
	                    slidesStyle = _Object$assign({}, slidesStyle, {
	                        transform: transform,
	                        transitionDuration: "0s"
	                    });
	                    // if direction is prev and should active is pseudo item then redirect to the last real item
	                } else if (activeIndex === count - 2 && state.direction === "prev") {
	                        transform = oriention === "horizontal" ? "translate3D(-" + this.state.slideStyle.width * activeIndex + "px,0,0)" : "translate3D(0,-" + this.state.slideStyle.height * activeIndex + "px,0)";
	                        slidesStyle = _Object$assign({}, slidesStyle, {
	                            transform: transform,
	                            transitionDuration: "0s"
	                        });
	                    } else {
	                        var speed = props.speed / 1000;
	                        if (oriention === "horizontal") {
	                            var _scrollX = this.state.slideStyle.width * activeIndex;
	                            transform = "translate3D(-" + _scrollX + "px,0,0)";
	                        } else if (oriention === "vertical") {
	                            var _scrollY = this.state.slideStyle.height * activeIndex;
	                            transform = "translate3D(0,-" + _scrollY + "px,0)";
	                        }
	                        // console.log('transform',transform)
	                        slidesStyle = _Object$assign({}, slidesStyle, {
	                            WebkitTransform: transform,
	                            transitionDuration: speed + "s"
	                        });
	                    }
	                return slidesStyle;
	            }
	            return slidesStyle;
	        }
	    }, {
	        key: "componentDidUpdate",
	        value: function componentDidUpdate(prevProps, prevState) {
	            var count = this.slides.length;
	            var nextTick = this.props.speed + 10;
	            if (this.needPseudoNode() === true) {
	                if (prevState.activeIndex === count - 1 && this.state.direction === "next" && this.state.activeIndex === prevState.activeIndex
	                // && this.state.prevActiveIndex !== 0
	                ) {
	                        // if direction is next and should active is pseudo item then redirect to the first real item
	                        setTimeout(this.next.bind(this), nextTick);
	                    } else if (this.getActiveIndex() === 0 && this.state.direction === "prev" && this.state.activeIndex === prevState.activeIndex) {
	                    // console.log('updated ---',prevState.activeIndex,this.state.activeIndex)
	                    // if direction is prev and should active is pseudo item then redirect to the last real item
	                    setTimeout(this.prev.bind(this), nextTick);
	                    // console.log('updated',this.state.activeIndex)
	                }
	            }
	        }
	    }, {
	        key: "getActiveIndex",
	        value: function getActiveIndex() {
	            return this.props.activeIndex !== undefined ? this.props.activeIndex : this.state.activeIndex;
	        }
	    }, {
	        key: "renderSlide",
	        value: function renderSlide(child, index) {
	            var activeIndex = this.getActiveIndex();
	            var isActive = index === activeIndex;
	            var isPrevActive = this.state.prevActiveIndex !== null && this.state.prevActiveIndex === index;
	            var isNextActive = this.state.nextActiveIndex !== null && this.state.nextActiveIndex === index;
	            return _react2["default"].cloneElement(child, {
	                active: isActive,
	                prev: isPrevActive,
	                next: isNextActive,
	                key: child.key ? child.key : index,
	                style: this.state.slideStyle,
	                animateOut: isPrevActive,
	                animateIn: isActive && this.state.prevActiveIndex !== null,
	                animateSpeed: this.props.speed,
	                animateSlide: this.animateSlide(),
	                direction: this.state.direction
	            });
	        }
	    }, {
	        key: "animateSlide",
	        value: function animateSlide() {
	            return this.props.effect === "fade";
	        }
	    }, {
	        key: "renderDirectionNav",
	        value: function renderDirectionNav() {
	            if (this.props.directionNav === true) {
	                return _react2["default"].createElement(
	                    "div",
	                    { className: "direction-nav" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "direction-nav-prev", onClick: this.prev.bind(this) },
	                        _react2["default"].createElement("span", { className: "iconfont icon-left-open" })
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "direction-nav-next", onClick: this.next.bind(this) },
	                        _react2["default"].createElement("span", { className: "iconfont icon-right-open" })
	                    )
	                );
	            }
	            return null;
	        }
	    }, {
	        key: "renderControlNav",
	        value: function renderControlNav() {
	            var _this2 = this;

	            if (this.props.controlNav === true) {
	                var activeIndex;

	                var _ret = (function () {
	                    activeIndex = _this2.getActiveIndex();

	                    var slidesCount = _this2.slides.length;
	                    // console.log(slidesCount)
	                    if (_this2.needPseudoNode() === true) {
	                        // if direction is next and should active is pseudo item then redirect to 1
	                        activeIndex = activeIndex === slidesCount - 1 ? 1 : activeIndex;
	                        // if direction is prev and should active is pseudo item then redirect to the last real item
	                        activeIndex = activeIndex === 0 ? slidesCount - 2 : activeIndex;
	                    }
	                    var children = _react2["default"].Children.map(_this2.slides, function (child, i) {
	                        /* dont render pseudo control item*/
	                        if (_this2.needPseudoNode() === true && i === slidesCount - 1) {
	                            return;
	                        }
	                        if (_this2.needPseudoNode() === true && i === 0) {
	                            return;
	                        }
	                        var childrenClasses = (0, _classnames2["default"])({
	                            active: activeIndex === i
	                        });
	                        return _react2["default"].createElement("span", { onClick: _this2.handleSelect.bind(_this2, i, null), className: childrenClasses, key: i });
	                    });
	                    var classes = (0, _classnames2["default"])({
	                        'control-nav': true
	                    });
	                    return {
	                        v: _react2["default"].createElement(
	                            "div",
	                            { className: classes },
	                            children
	                        )
	                    };
	                })();

	                if (typeof _ret === "object") return _ret.v;
	            }
	            return null;
	        }
	    }, {
	        key: "processSlides",
	        value: function processSlides() {
	            var children = arguments.length <= 0 || arguments[0] === undefined ? this.props.children : arguments[0];

	            this.slides = [].concat(_toConsumableArray(children));
	            if (this.needPseudoNode() === true) {
	                var count = this.slides.length;
	                var pseudoFirstNode = _react2["default"].cloneElement(this.slides[0], {
	                    key: "pseudo-first",
	                    pseudo: true
	                });
	                var pseudoLastNode = _react2["default"].cloneElement(this.slides[count - 1], {
	                    key: "pseudo-last",
	                    pseudo: true
	                });
	                this.slides.push(pseudoFirstNode);
	                this.slides.unshift(pseudoLastNode);
	            }
	            // console.log('processSlides',this.props.children.length,this.slides.length)
	        }
	    }, {
	        key: "componentWillMount",
	        value: function componentWillMount() {
	            this.processSlides();
	        }
	    }, {
	        key: "componentWillUpdate",
	        value: function componentWillUpdate(nextProps) {
	            if (nextProps.children.length !== this.props.children.length) {
	                this.processSlides(nextProps.children);
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _state = this.state;
	            var sliderStyle = _state.sliderStyle;
	            var slidesStyle = _state.slidesStyle;
	            var slideStyle = _state.slideStyle;

	            var classes = (0, _classnames2["default"])("slider", {
	                "slider-fade": this.props.effect === "fade"
	            });
	            if (this.animateSlide()) {
	                sliderStyle = null;
	                slidesStyle = null;
	            }
	            // console.log('render slider',this.state)
	            return _react2["default"].createElement(
	                "div",
	                { className: classes,
	                    style: sliderStyle,
	                    onTouchStart: this.handleTouchStart.bind(this),
	                    onTouchMove: this.handleTouchMove.bind(this),
	                    onTouchEnd: this.handleTouchEnd.bind(this),
	                    onMouseOver: this.handleMouseOver.bind(this),
	                    onMouseOut: this.handleMouseOut.bind(this) },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "slides", style: slidesStyle, ref: "slides" },
	                    _react2["default"].Children.map(this.slides, this.renderSlide.bind(this))
	                ),
	                this.renderControlNav(),
	                this.renderDirectionNav()
	            );
	        }
	    }]);

	    return Slider;
	})(_react.Component);

	Slider.defaultProps = {
	    directionNav: false,
	    controlNav: true,
	    effect: "roll",
	    infinity: true,
	    direction: "next",
	    touchEnabled: true,
	    reverse: false,
	    oriention: "horizontal", //vertical
	    autoPlay: false,
	    loop: true,
	    speed: 300,
	    delay: 5000,
	    rect: null,
	    height: null,
	    pauseOnHover: true,
	    onChange: function onChange() {}
	};

	exports["default"] = Slider;
	module.exports = exports["default"];

/***/ },

/***/ 322:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(234);

	var _classnames2 = _interopRequireDefault(_classnames);

	var Slide = (function (_Component) {
	    _inherits(Slide, _Component);

	    function Slide() {
	        _classCallCheck(this, Slide);

	        _get(Object.getPrototypeOf(Slide.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Slide, [{
	        key: "render",
	        value: function render() {
	            var _props = this.props;
	            var active = _props.active;
	            var prev = _props.prev;
	            var next = _props.next;
	            var pseudo = _props.pseudo;
	            var key = _props.key;
	            var style = _props.style;
	            var animateSlide = _props.animateSlide;
	            var animateSpeed = _props.animateSpeed;

	            var classes = (0, _classnames2["default"])(this.props.className, {
	                "slide": true,
	                "active": active,
	                "prev": prev,
	                "next": next,
	                "pseudo-slide": pseudo
	                // active: (this.props.active && !this.props.animateIn) ||
	                //     this.props.animateOut,
	                // next: this.props.active && this.props.animateIn &&
	                //     this.props.direction === 'next',
	                // prev: this.props.active && this.props.animateIn &&
	                //     this.props.direction === 'prev'
	            });
	            var slideStyle = {};
	            if (style !== null) {
	                var width = style.width;
	                var height = style.height;

	                width = width !== null ? width + "px" : "100%";
	                height = height !== null ? height + "px" : "100%";
	                slideStyle = {
	                    width: width,
	                    height: height
	                };
	            }
	            if (animateSlide === true) {
	                slideStyle.animationDuration = animateSpeed / 1000 + "s";
	                slideStyle.animationName = "slide-fade";
	                slideStyle.animationTimingFunction = "ease-in-out";
	                slideStyle.width = "100%";
	                slideStyle.height = "100%";
	            }
	            return _react2["default"].createElement(
	                "div",
	                { className: classes, style: slideStyle, key: "slide-" + key },
	                this.props.children
	            );
	        }
	    }]);

	    return Slide;
	})(_react.Component);

	exports["default"] = Slide;
	module.exports = exports["default"];

/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

	

	//
	// Generated on Tue Dec 16 2014 12:13:47 GMT+0100 (CET) by Charlie Robbins, Paolo Fragomeni & the Contributors (Using Codesurgeon).
	// Version 1.2.6
	//

	(function (exports) {

	/*
	 * browser.js: Browser specific functionality for director.
	 *
	 * (C) 2011, Charlie Robbins, Paolo Fragomeni, & the Contributors.
	 * MIT LICENSE
	 *
	 */

	var dloc = document.location;

	function dlocHashEmpty() {
	  // Non-IE browsers return '' when the address bar shows '#'; Director's logic
	  // assumes both mean empty.
	  return dloc.hash === '' || dloc.hash === '#';
	}

	var listener = {
	  mode: 'modern',
	  hash: dloc.hash,
	  history: false,

	  check: function () {
	    var h = dloc.hash;
	    if (h != this.hash) {
	      this.hash = h;
	      this.onHashChanged();
	    }
	  },

	  fire: function () {
	    if (this.mode === 'modern') {
	      this.history === true ? window.onpopstate() : window.onhashchange();
	    }
	    else {
	      this.onHashChanged();
	    }
	  },

	  init: function (fn, history) {
	    var self = this;
	    this.history = history;

	    if (!Router.listeners) {
	      Router.listeners = [];
	    }

	    function onchange(onChangeEvent) {
	      for (var i = 0, l = Router.listeners.length; i < l; i++) {
	        Router.listeners[i](onChangeEvent);
	      }
	    }

	    //note IE8 is being counted as 'modern' because it has the hashchange event
	    if ('onhashchange' in window && (document.documentMode === undefined
	      || document.documentMode > 7)) {
	      // At least for now HTML5 history is available for 'modern' browsers only
	      if (this.history === true) {
	        // There is an old bug in Chrome that causes onpopstate to fire even
	        // upon initial page load. Since the handler is run manually in init(),
	        // this would cause Chrome to run it twise. Currently the only
	        // workaround seems to be to set the handler after the initial page load
	        // http://code.google.com/p/chromium/issues/detail?id=63040
	        setTimeout(function() {
	          window.onpopstate = onchange;
	        }, 500);
	      }
	      else {
	        window.onhashchange = onchange;
	      }
	      this.mode = 'modern';
	    }
	    else {
	      //
	      // IE support, based on a concept by Erik Arvidson ...
	      //
	      var frame = document.createElement('iframe');
	      frame.id = 'state-frame';
	      frame.style.display = 'none';
	      document.body.appendChild(frame);
	      this.writeFrame('');

	      if ('onpropertychange' in document && 'attachEvent' in document) {
	        document.attachEvent('onpropertychange', function () {
	          if (event.propertyName === 'location') {
	            self.check();
	          }
	        });
	      }

	      window.setInterval(function () { self.check(); }, 50);

	      this.onHashChanged = onchange;
	      this.mode = 'legacy';
	    }

	    Router.listeners.push(fn);

	    return this.mode;
	  },

	  destroy: function (fn) {
	    if (!Router || !Router.listeners) {
	      return;
	    }

	    var listeners = Router.listeners;

	    for (var i = listeners.length - 1; i >= 0; i--) {
	      if (listeners[i] === fn) {
	        listeners.splice(i, 1);
	      }
	    }
	  },

	  setHash: function (s) {
	    // Mozilla always adds an entry to the history
	    if (this.mode === 'legacy') {
	      this.writeFrame(s);
	    }

	    if (this.history === true) {
	      window.history.pushState({}, document.title, s);
	      // Fire an onpopstate event manually since pushing does not obviously
	      // trigger the pop event.
	      this.fire();
	    } else {
	      dloc.hash = (s[0] === '/') ? s : '/' + s;
	    }
	    return this;
	  },

	  writeFrame: function (s) {
	    // IE support...
	    var f = document.getElementById('state-frame');
	    var d = f.contentDocument || f.contentWindow.document;
	    d.open();
	    d.write("<script>_hash = '" + s + "'; onload = parent.listener.syncHash;<script>");
	    d.close();
	  },

	  syncHash: function () {
	    // IE support...
	    var s = this._hash;
	    if (s != dloc.hash) {
	      dloc.hash = s;
	    }
	    return this;
	  },

	  onHashChanged: function () {}
	};

	var Router = exports.Router = function (routes) {
	  if (!(this instanceof Router)) return new Router(routes);

	  this.params   = {};
	  this.routes   = {};
	  this.methods  = ['on', 'once', 'after', 'before'];
	  this.scope    = [];
	  this._methods = {};

	  this._insert = this.insert;
	  this.insert = this.insertEx;

	  this.historySupport = (window.history != null ? window.history.pushState : null) != null

	  this.configure();
	  this.mount(routes || {});
	};

	Router.prototype.init = function (r) {
	  var self = this
	    , routeTo;
	  this.handler = function(onChangeEvent) {
	    var newURL = onChangeEvent && onChangeEvent.newURL || window.location.hash;
	    var url = self.history === true ? self.getPath() : newURL.replace(/.*#/, '');
	    self.dispatch('on', url.charAt(0) === '/' ? url : '/' + url);
	  };

	  listener.init(this.handler, this.history);

	  if (this.history === false) {
	    if (dlocHashEmpty() && r) {
	      dloc.hash = r;
	    } else if (!dlocHashEmpty()) {
	      self.dispatch('on', '/' + dloc.hash.replace(/^(#\/|#|\/)/, ''));
	    }
	  }
	  else {
	    if (this.convert_hash_in_init) {
	      // Use hash as route
	      routeTo = dlocHashEmpty() && r ? r : !dlocHashEmpty() ? dloc.hash.replace(/^#/, '') : null;
	      if (routeTo) {
	        window.history.replaceState({}, document.title, routeTo);
	      }
	    }
	    else {
	      // Use canonical url
	      routeTo = this.getPath();
	    }

	    // Router has been initialized, but due to the chrome bug it will not
	    // yet actually route HTML5 history state changes. Thus, decide if should route.
	    if (routeTo || this.run_in_init === true) {
	      this.handler();
	    }
	  }

	  return this;
	};

	Router.prototype.explode = function () {
	  var v = this.history === true ? this.getPath() : dloc.hash;
	  if (v.charAt(1) === '/') { v=v.slice(1) }
	  return v.slice(1, v.length).split("/");
	};

	Router.prototype.setRoute = function (i, v, val) {
	  var url = this.explode();

	  if (typeof i === 'number' && typeof v === 'string') {
	    url[i] = v;
	  }
	  else if (typeof val === 'string') {
	    url.splice(i, v, s);
	  }
	  else {
	    url = [i];
	  }

	  listener.setHash(url.join('/'));
	  return url;
	};

	//
	// ### function insertEx(method, path, route, parent)
	// #### @method {string} Method to insert the specific `route`.
	// #### @path {Array} Parsed path to insert the `route` at.
	// #### @route {Array|function} Route handlers to insert.
	// #### @parent {Object} **Optional** Parent "routes" to insert into.
	// insert a callback that will only occur once per the matched route.
	//
	Router.prototype.insertEx = function(method, path, route, parent) {
	  if (method === "once") {
	    method = "on";
	    route = function(route) {
	      var once = false;
	      return function() {
	        if (once) return;
	        once = true;
	        return route.apply(this, arguments);
	      };
	    }(route);
	  }
	  return this._insert(method, path, route, parent);
	};

	Router.prototype.getRoute = function (v) {
	  var ret = v;

	  if (typeof v === "number") {
	    ret = this.explode()[v];
	  }
	  else if (typeof v === "string"){
	    var h = this.explode();
	    ret = h.indexOf(v);
	  }
	  else {
	    ret = this.explode();
	  }

	  return ret;
	};

	Router.prototype.destroy = function () {
	  listener.destroy(this.handler);
	  return this;
	};

	Router.prototype.getPath = function () {
	  var path = window.location.pathname;
	  if (path.substr(0, 1) !== '/') {
	    path = '/' + path;
	  }
	  return path;
	};
	function _every(arr, iterator) {
	  for (var i = 0; i < arr.length; i += 1) {
	    if (iterator(arr[i], i, arr) === false) {
	      return;
	    }
	  }
	}

	function _flatten(arr) {
	  var flat = [];
	  for (var i = 0, n = arr.length; i < n; i++) {
	    flat = flat.concat(arr[i]);
	  }
	  return flat;
	}

	function _asyncEverySeries(arr, iterator, callback) {
	  if (!arr.length) {
	    return callback();
	  }
	  var completed = 0;
	  (function iterate() {
	    iterator(arr[completed], function(err) {
	      if (err || err === false) {
	        callback(err);
	        callback = function() {};
	      } else {
	        completed += 1;
	        if (completed === arr.length) {
	          callback();
	        } else {
	          iterate();
	        }
	      }
	    });
	  })();
	}

	function paramifyString(str, params, mod) {
	  mod = str;
	  for (var param in params) {
	    if (params.hasOwnProperty(param)) {
	      mod = params[param](str);
	      if (mod !== str) {
	        break;
	      }
	    }
	  }
	  return mod === str ? "([._a-zA-Z0-9-%()]+)" : mod;
	}

	function regifyString(str, params) {
	  var matches, last = 0, out = "";
	  while (matches = str.substr(last).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/)) {
	    last = matches.index + matches[0].length;
	    matches[0] = matches[0].replace(/^\*/, "([_.()!\\ %@&a-zA-Z0-9-]+)");
	    out += str.substr(0, matches.index) + matches[0];
	  }
	  str = out += str.substr(last);
	  var captures = str.match(/:([^\/]+)/ig), capture, length;
	  if (captures) {
	    length = captures.length;
	    for (var i = 0; i < length; i++) {
	      capture = captures[i];
	      if (capture.slice(0, 2) === "::") {
	        str = capture.slice(1);
	      } else {
	        str = str.replace(capture, paramifyString(capture, params));
	      }
	    }
	  }
	  return str;
	}

	function terminator(routes, delimiter, start, stop) {
	  var last = 0, left = 0, right = 0, start = (start || "(").toString(), stop = (stop || ")").toString(), i;
	  for (i = 0; i < routes.length; i++) {
	    var chunk = routes[i];
	    if (chunk.indexOf(start, last) > chunk.indexOf(stop, last) || ~chunk.indexOf(start, last) && !~chunk.indexOf(stop, last) || !~chunk.indexOf(start, last) && ~chunk.indexOf(stop, last)) {
	      left = chunk.indexOf(start, last);
	      right = chunk.indexOf(stop, last);
	      if (~left && !~right || !~left && ~right) {
	        var tmp = routes.slice(0, (i || 1) + 1).join(delimiter);
	        routes = [ tmp ].concat(routes.slice((i || 1) + 1));
	      }
	      last = (right > left ? right : left) + 1;
	      i = 0;
	    } else {
	      last = 0;
	    }
	  }
	  return routes;
	}

	var QUERY_SEPARATOR = /\?.*/;

	Router.prototype.configure = function(options) {
	  options = options || {};
	  for (var i = 0; i < this.methods.length; i++) {
	    this._methods[this.methods[i]] = true;
	  }
	  this.recurse = options.recurse || this.recurse || false;
	  this.async = options.async || false;
	  this.delimiter = options.delimiter || "/";
	  this.strict = typeof options.strict === "undefined" ? true : options.strict;
	  this.notfound = options.notfound;
	  this.resource = options.resource;
	  this.history = options.html5history && this.historySupport || false;
	  this.run_in_init = this.history === true && options.run_handler_in_init !== false;
	  this.convert_hash_in_init = this.history === true && options.convert_hash_in_init !== false;
	  this.every = {
	    after: options.after || null,
	    before: options.before || null,
	    on: options.on || null
	  };
	  return this;
	};

	Router.prototype.param = function(token, matcher) {
	  if (token[0] !== ":") {
	    token = ":" + token;
	  }
	  var compiled = new RegExp(token, "g");
	  this.params[token] = function(str) {
	    return str.replace(compiled, matcher.source || matcher);
	  };
	  return this;
	};

	Router.prototype.on = Router.prototype.route = function(method, path, route) {
	  var self = this;
	  if (!route && typeof path == "function") {
	    route = path;
	    path = method;
	    method = "on";
	  }
	  if (Array.isArray(path)) {
	    return path.forEach(function(p) {
	      self.on(method, p, route);
	    });
	  }
	  if (path.source) {
	    path = path.source.replace(/\\\//ig, "/");
	  }
	  if (Array.isArray(method)) {
	    return method.forEach(function(m) {
	      self.on(m.toLowerCase(), path, route);
	    });
	  }
	  path = path.split(new RegExp(this.delimiter));
	  path = terminator(path, this.delimiter);
	  this.insert(method, this.scope.concat(path), route);
	};

	Router.prototype.path = function(path, routesFn) {
	  var self = this, length = this.scope.length;
	  if (path.source) {
	    path = path.source.replace(/\\\//ig, "/");
	  }
	  path = path.split(new RegExp(this.delimiter));
	  path = terminator(path, this.delimiter);
	  this.scope = this.scope.concat(path);
	  routesFn.call(this, this);
	  this.scope.splice(length, path.length);
	};

	Router.prototype.dispatch = function(method, path, callback) {
	  var self = this, fns = this.traverse(method, path.replace(QUERY_SEPARATOR, ""), this.routes, ""), invoked = this._invoked, after;
	  this._invoked = true;
	  if (!fns || fns.length === 0) {
	    this.last = [];
	    if (typeof this.notfound === "function") {
	      this.invoke([ this.notfound ], {
	        method: method,
	        path: path
	      }, callback);
	    }
	    return false;
	  }
	  if (this.recurse === "forward") {
	    fns = fns.reverse();
	  }
	  function updateAndInvoke() {
	    self.last = fns.after;
	    self.invoke(self.runlist(fns), self, callback);
	  }
	  after = this.every && this.every.after ? [ this.every.after ].concat(this.last) : [ this.last ];
	  if (after && after.length > 0 && invoked) {
	    if (this.async) {
	      this.invoke(after, this, updateAndInvoke);
	    } else {
	      this.invoke(after, this);
	      updateAndInvoke();
	    }
	    return true;
	  }
	  updateAndInvoke();
	  return true;
	};

	Router.prototype.invoke = function(fns, thisArg, callback) {
	  var self = this;
	  var apply;
	  if (this.async) {
	    apply = function(fn, next) {
	      if (Array.isArray(fn)) {
	        return _asyncEverySeries(fn, apply, next);
	      } else if (typeof fn == "function") {
	        fn.apply(thisArg, (fns.captures || []).concat(next));
	      }
	    };
	    _asyncEverySeries(fns, apply, function() {
	      if (callback) {
	        callback.apply(thisArg, arguments);
	      }
	    });
	  } else {
	    apply = function(fn) {
	      if (Array.isArray(fn)) {
	        return _every(fn, apply);
	      } else if (typeof fn === "function") {
	        return fn.apply(thisArg, fns.captures || []);
	      } else if (typeof fn === "string" && self.resource) {
	        self.resource[fn].apply(thisArg, fns.captures || []);
	      }
	    };
	    _every(fns, apply);
	  }
	};

	Router.prototype.traverse = function(method, path, routes, regexp, filter) {
	  var fns = [], current, exact, match, next, that;
	  function filterRoutes(routes) {
	    if (!filter) {
	      return routes;
	    }
	    function deepCopy(source) {
	      var result = [];
	      for (var i = 0; i < source.length; i++) {
	        result[i] = Array.isArray(source[i]) ? deepCopy(source[i]) : source[i];
	      }
	      return result;
	    }
	    function applyFilter(fns) {
	      for (var i = fns.length - 1; i >= 0; i--) {
	        if (Array.isArray(fns[i])) {
	          applyFilter(fns[i]);
	          if (fns[i].length === 0) {
	            fns.splice(i, 1);
	          }
	        } else {
	          if (!filter(fns[i])) {
	            fns.splice(i, 1);
	          }
	        }
	      }
	    }
	    var newRoutes = deepCopy(routes);
	    newRoutes.matched = routes.matched;
	    newRoutes.captures = routes.captures;
	    newRoutes.after = routes.after.filter(filter);
	    applyFilter(newRoutes);
	    return newRoutes;
	  }
	  if (path === this.delimiter && routes[method]) {
	    next = [ [ routes.before, routes[method] ].filter(Boolean) ];
	    next.after = [ routes.after ].filter(Boolean);
	    next.matched = true;
	    next.captures = [];
	    return filterRoutes(next);
	  }
	  for (var r in routes) {
	    if (routes.hasOwnProperty(r) && (!this._methods[r] || this._methods[r] && typeof routes[r] === "object" && !Array.isArray(routes[r]))) {
	      current = exact = regexp + this.delimiter + r;
	      if (!this.strict) {
	        exact += "[" + this.delimiter + "]?";
	      }
	      match = path.match(new RegExp("^" + exact));
	      if (!match) {
	        continue;
	      }
	      if (match[0] && match[0] == path && routes[r][method]) {
	        next = [ [ routes[r].before, routes[r][method] ].filter(Boolean) ];
	        next.after = [ routes[r].after ].filter(Boolean);
	        next.matched = true;
	        next.captures = match.slice(1);
	        if (this.recurse && routes === this.routes) {
	          next.push([ routes.before, routes.on ].filter(Boolean));
	          next.after = next.after.concat([ routes.after ].filter(Boolean));
	        }
	        return filterRoutes(next);
	      }
	      next = this.traverse(method, path, routes[r], current);
	      if (next.matched) {
	        if (next.length > 0) {
	          fns = fns.concat(next);
	        }
	        if (this.recurse) {
	          fns.push([ routes[r].before, routes[r].on ].filter(Boolean));
	          next.after = next.after.concat([ routes[r].after ].filter(Boolean));
	          if (routes === this.routes) {
	            fns.push([ routes["before"], routes["on"] ].filter(Boolean));
	            next.after = next.after.concat([ routes["after"] ].filter(Boolean));
	          }
	        }
	        fns.matched = true;
	        fns.captures = next.captures;
	        fns.after = next.after;
	        return filterRoutes(fns);
	      }
	    }
	  }
	  return false;
	};

	Router.prototype.insert = function(method, path, route, parent) {
	  var methodType, parentType, isArray, nested, part;
	  path = path.filter(function(p) {
	    return p && p.length > 0;
	  });
	  parent = parent || this.routes;
	  part = path.shift();
	  if (/\:|\*/.test(part) && !/\\d|\\w/.test(part)) {
	    part = regifyString(part, this.params);
	  }
	  if (path.length > 0) {
	    parent[part] = parent[part] || {};
	    return this.insert(method, path, route, parent[part]);
	  }
	  if (!part && !path.length && parent === this.routes) {
	    methodType = typeof parent[method];
	    switch (methodType) {
	     case "function":
	      parent[method] = [ parent[method], route ];
	      return;
	     case "object":
	      parent[method].push(route);
	      return;
	     case "undefined":
	      parent[method] = route;
	      return;
	    }
	    return;
	  }
	  parentType = typeof parent[part];
	  isArray = Array.isArray(parent[part]);
	  if (parent[part] && !isArray && parentType == "object") {
	    methodType = typeof parent[part][method];
	    switch (methodType) {
	     case "function":
	      parent[part][method] = [ parent[part][method], route ];
	      return;
	     case "object":
	      parent[part][method].push(route);
	      return;
	     case "undefined":
	      parent[part][method] = route;
	      return;
	    }
	  } else if (parentType == "undefined") {
	    nested = {};
	    nested[method] = route;
	    parent[part] = nested;
	    return;
	  }
	  throw new Error("Invalid route context: " + parentType);
	};



	Router.prototype.extend = function(methods) {
	  var self = this, len = methods.length, i;
	  function extend(method) {
	    self._methods[method] = true;
	    self[method] = function() {
	      var extra = arguments.length === 1 ? [ method, "" ] : [ method ];
	      self.on.apply(self, extra.concat(Array.prototype.slice.call(arguments)));
	    };
	  }
	  for (i = 0; i < len; i++) {
	    extend(methods[i]);
	  }
	};

	Router.prototype.runlist = function(fns) {
	  var runlist = this.every && this.every.before ? [ this.every.before ].concat(_flatten(fns)) : _flatten(fns);
	  if (this.every && this.every.on) {
	    runlist.push(this.every.on);
	  }
	  runlist.captures = fns.captures;
	  runlist.source = fns.source;
	  return runlist;
	};

	Router.prototype.mount = function(routes, path) {
	  if (!routes || typeof routes !== "object" || Array.isArray(routes)) {
	    return;
	  }
	  var self = this;
	  path = path || [];
	  if (!Array.isArray(path)) {
	    path = path.split(self.delimiter);
	  }
	  function insertOrMount(route, local) {
	    var rename = route, parts = route.split(self.delimiter), routeType = typeof routes[route], isRoute = parts[0] === "" || !self._methods[parts[0]], event = isRoute ? "on" : rename;
	    if (isRoute) {
	      rename = rename.slice((rename.match(new RegExp("^" + self.delimiter)) || [ "" ])[0].length);
	      parts.shift();
	    }
	    if (isRoute && routeType === "object" && !Array.isArray(routes[route])) {
	      local = local.concat(parts);
	      self.mount(routes[route], local);
	      return;
	    }
	    if (isRoute) {
	      local = local.concat(rename.split(self.delimiter));
	      local = terminator(local, self.delimiter);
	    }
	    self.insert(event, local, routes[route]);
	  }
	  for (var route in routes) {
	    if (routes.hasOwnProperty(route)) {
	      insertOrMount(route, path.slice(0));
	    }
	  }
	};



	}( true ? exports : window));

/***/ },

/***/ 327:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _Object$assign = __webpack_require__(210)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(234);

	var _classnames2 = _interopRequireDefault(_classnames);

	var Switcher = (function (_Component) {
	    _inherits(Switcher, _Component);

	    function Switcher() {
	        _classCallCheck(this, Switcher);

	        _get(Object.getPrototypeOf(Switcher.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Switcher, [{
	        key: "renderRoute",
	        value: function renderRoute(child, i) {
	            var _props = this.props;
	            var currentRoute = _props.currentRoute;
	            var prevRoute = _props.prevRoute;
	            var name = child.props.name;

	            return _react2["default"].cloneElement(child, _Object$assign({}, child.props, {
	                active: currentRoute === name,
	                prev: prevRoute === name,
	                key: i
	            }));
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "div",
	                { className: "switcher" },
	                _react2["default"].Children.map(this.props.children, this.renderRoute.bind(this))
	            );
	        }
	    }]);

	    return Switcher;
	})(_react.Component);

	exports.Switcher = Switcher;

	var SwitcherCase = (function (_Component2) {
	    _inherits(SwitcherCase, _Component2);

	    function SwitcherCase() {
	        _classCallCheck(this, SwitcherCase);

	        _get(Object.getPrototypeOf(SwitcherCase.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(SwitcherCase, [{
	        key: "render",
	        value: function render() {
	            var _props2 = this.props;
	            var key = _props2.key;
	            var active = _props2.active;
	            var prev = _props2.prev;

	            var classes = (0, _classnames2["default"])("switcher-case", {
	                active: active,
	                prev: prev
	            });
	            return _react2["default"].createElement(
	                "div",
	                { className: classes, key: key },
	                this.props.children
	            );
	        }
	    }]);

	    return SwitcherCase;
	})(_react.Component);

	exports.SwitcherCase = SwitcherCase;

/***/ },

/***/ 328:
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },

/***/ 381:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _Object$assign = __webpack_require__(210)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(218);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames = __webpack_require__(234);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _slidableJsx = __webpack_require__(382);

	var _slidableJsx2 = _interopRequireDefault(_slidableJsx);

	var _libDomEs6 = __webpack_require__(238);

	var _libDomEs62 = _interopRequireDefault(_libDomEs6);

	var _libDomNobounceScrollEs6 = __webpack_require__(383);

	var _libDomNobounceScrollEs62 = _interopRequireDefault(_libDomNobounceScrollEs6);

	var SlideTabs = (function (_Component) {
	    _inherits(SlideTabs, _Component);

	    function SlideTabs(props) {
	        _classCallCheck(this, SlideTabs);

	        _get(Object.getPrototypeOf(SlideTabs.prototype), "constructor", this).call(this, props);
	        this.state = {
	            activeIndex: props.activeIndex
	        };
	    }

	    _createClass(SlideTabs, [{
	        key: "componentDidMount",
	        // navbarSlidable:false
	        value: function componentDidMount() {
	            // noBounceScroll.enable()
	        }
	    }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            // noBounceScroll.disable()
	        }
	    }, {
	        key: "shouldComponentUpdate",
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            if (nextState.activeIndex !== this.state.activeIndex) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: "handleSelect",
	        value: function handleSelect(i, e) {
	            var _this = this;

	            console.log('handleSelect');
	            // e && e.preventDefault()
	            this.setState({
	                activeIndex: i
	            }, function () {
	                _this.props.onSelect();
	            });
	        }
	    }, {
	        key: "handleContentActiveChange",
	        value: function handleContentActiveChange(i, e) {
	            this.setState({
	                activeIndex: i
	            });
	        }
	    }, {
	        key: "renderNavbar",
	        value: function renderNavbar() {
	            var _this2 = this;

	            var navigators = [];
	            _react2["default"].Children.forEach(this.props.children, function (child, i) {
	                var navigator = child.props.navigator;

	                var classes = (0, _classnames2["default"])("slide-tabs-navbar-item", {
	                    active: i === _this2.state.activeIndex
	                });
	                navigators.push(_react2["default"].createElement(
	                    "div",
	                    { className: classes, key: i, onClick: _this2.handleSelect.bind(_this2, i) },
	                    navigator()
	                ));
	            });
	            if (this.props.navbarSlidable === true) {
	                return _react2["default"].createElement(
	                    _slidableJsx2["default"],
	                    { axis: this.props.axis, name: "navbar",
	                        activeIndex: this.state.activeIndex },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "slide-tabs-navbar" },
	                        navigators
	                    )
	                );
	            }
	            return _react2["default"].createElement(
	                "div",
	                { className: "slide-tabs-navbar" },
	                navigators
	            );
	        }
	    }, {
	        key: "renderTabsItem",
	        value: function renderTabsItem(child, index) {
	            return _react2["default"].cloneElement(child, _Object$assign({}, child.props, {
	                active: index === this.state.activeIndex,
	                key: index,
	                axis: this.props.axis
	            }));
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var classes = (0, _classnames2["default"])("slide-tabs", {
	                "slide-tabs-fixed": this.props.navbarSlidable === false,
	                "slide-tabs-vertical": this.props.axis === "y"
	            });
	            return _react2["default"].createElement(
	                "div",
	                { className: classes },
	                _react2["default"].createElement(
	                    _slidableJsx2["default"],
	                    { axis: this.props.axis, name: "content",
	                        transitionMove: true,
	                        onlyInside: true,
	                        simulateTranslate: true,
	                        handleActiveChange: this.handleContentActiveChange.bind(this),
	                        activeIndex: this.state.activeIndex },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "slide-tabs-content" },
	                        _react2["default"].Children.map(this.props.children, this.renderTabsItem.bind(this))
	                    )
	                ),
	                this.renderNavbar()
	            );
	        }
	    }]);

	    return SlideTabs;
	})(_react.Component);

	exports.SlideTabs = SlideTabs;

	SlideTabs.defaultProps = {
	    activeIndex: 0,
	    axis: "x",
	    navbarSlidable: true,
	    onSelect: function onSelect() {}
	};

	var SlideTabsItem = (function (_Component2) {
	    _inherits(SlideTabsItem, _Component2);

	    function SlideTabsItem(props) {
	        _classCallCheck(this, SlideTabsItem);

	        _get(Object.getPrototypeOf(SlideTabsItem.prototype), "constructor", this).call(this, props);
	        this.state = {
	            itemStyle: null
	        };
	    }

	    _createClass(SlideTabsItem, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var contentNode = _reactDom2["default"].findDOMNode(this);
	            var itemStyle = {};
	            if (this.props.axis === "x") {
	                itemStyle.width = contentNode.parentNode.parentNode.offsetWidth;
	            } else {
	                itemStyle.height = contentNode.parentNode.parentNode.offsetHeight;
	            }
	            this.setState({
	                itemStyle: itemStyle
	            });
	        }
	    }, {
	        key: "handleTouchStart",
	        value: function handleTouchStart(e) {
	            var _e$changedTouches$0 = e.changedTouches[0];
	            var clientY = _e$changedTouches$0.clientY;
	            var clientX = _e$changedTouches$0.clientX;

	            this.startTouchY = clientY;
	            this.startTouchX = clientX;
	            this.moveDirection = null;
	        }
	    }, {
	        key: "handleTouchMove",
	        value: function handleTouchMove(e) {
	            var _e$changedTouches$02 = e.changedTouches[0];
	            var clientY = _e$changedTouches$02.clientY;
	            var clientX = _e$changedTouches$02.clientX;

	            var moveDirection = Math.abs(clientY - this.startTouchY) > Math.abs(clientX - this.startTouchX) ? "y" : "x";
	            if (this.moveDirection && this.moveDirection !== moveDirection) {
	                return;
	            }
	            this.moveDirection = moveDirection;
	            // console.log(this.moveDirection,"this.moveDirection")
	            if (this.moveDirection === "y") {
	                e.stopPropagation();
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _props = this.props;
	            var key = _props.key;
	            var active = _props.active;

	            var classes = (0, _classnames2["default"])("slide-tabs-item", this.props.className, {
	                active: active
	            });
	            var child = _react2["default"].Children.only(this.props.children);
	            return _react2["default"].createElement(
	                "div",
	                { className: classes, key: key, style: this.state.itemStyle,
	                    onTouchMove: this.handleTouchMove.bind(this),
	                    onTouchStart: this.handleTouchStart.bind(this) },
	                _react2["default"].cloneElement(child, _Object$assign({}, child.props, {
	                    redraw: this.state.itemStyle !== null
	                }))
	            );
	        }
	    }]);

	    return SlideTabsItem;
	})(_react.Component);

	exports.SlideTabsItem = SlideTabsItem;

/***/ },

/***/ 382:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _Object$assign = __webpack_require__(210)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(218);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _libDomEs6 = __webpack_require__(238);

	var _libDomEs62 = _interopRequireDefault(_libDomEs6);

	var _libDomRequestAnimationFrame = __webpack_require__(239);

	var _libDomRequestAnimationFrame2 = _interopRequireDefault(_libDomRequestAnimationFrame);

	var _lodash = __webpack_require__(231);

	var _lodash2 = _interopRequireDefault(_lodash);

	var Slidable = (function (_Component) {
	    _inherits(Slidable, _Component);

	    function Slidable(props) {
	        _classCallCheck(this, Slidable);

	        _get(Object.getPrototypeOf(Slidable.prototype), "constructor", this).call(this, props);
	        this.state = {
	            activeIndex: props.activeIndex
	        };
	        this.translateX = 0;
	        this.translateY = 0;
	    }

	    _createClass(Slidable, [{
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(nextProps) {
	            var _this = this;

	            if (nextProps.activeIndex !== this.props.activeIndex && nextProps.activeIndex !== this.state.activeIndex) {
	                (function () {
	                    var prevIndex = _this.state.activeIndex;
	                    _this.setState({
	                        activeIndex: nextProps.activeIndex
	                    }, function () {
	                        _this.transitionInView(prevIndex);
	                    });
	                })();
	            }
	        }
	    }, {
	        key: "transitionInView",
	        value: function transitionInView(prevIndex) {
	            var _this2 = this;

	            var activeIndex = this.state.activeIndex;
	            var _props = this.props;
	            var axis = _props.axis;
	            var pinMode = _props.pinMode;
	            var animateDuration = _props.animateDuration;

	            var itemNode = _reactDom2["default"].findDOMNode(this).firstChild;
	            var itemNodeWidth = itemNode.offsetWidth;
	            var itemNodeHeight = itemNode.offsetHeight;
	            var translateNodeWidth = _reactDom2["default"].findDOMNode(this).parentNode.parentNode.offsetWidth;
	            var translateNodeHeight = _reactDom2["default"].findDOMNode(this).parentNode.parentNode.offsetHeight;
	            if (axis === "y") {
	                var translateY = activeIndex * itemNode.offsetHeight > 0 ? -(activeIndex * itemNode.offsetHeight) : 0;
	                if (!pinMode) {
	                    if (this.translateY < translateY
	                    /*&& this.translateY > (translateY - itemNodeHeight)*/) {
	                            // console.log('left edge')
	                            this.translateY = translateY;
	                        }
	                    if ( /*translateNodeHeight > (this.translateY - translateY) &&*/
	                    translateNodeHeight < this.translateY - translateY + itemNodeHeight) {
	                        // console.log('right edge')
	                        this.translateY = this.translateY - (this.translateY - translateY + itemNodeHeight - translateNodeHeight);
	                        // console.log(this.translateY)
	                    }
	                }
	            } else {
	                    var translateX = activeIndex * itemNode.offsetWidth > 0 ? -(activeIndex * itemNode.offsetWidth) : 0;
	                    if (!pinMode) {
	                        if (this.translateX < translateX
	                        /*&& this.translateX > (translateX - itemNodeWidth)*/) {
	                                // console.log('left edge')
	                                this.translateX = translateX;
	                            }
	                        if ( /*translateNodeWidth > (this.translateX - translateX) && */
	                        translateNodeWidth < this.translateX - translateX + itemNodeWidth) {
	                            // console.log('right edge')
	                            this.translateX = this.translateX - (this.translateX - translateX + itemNodeWidth - translateNodeWidth);
	                            // console.log(this.translateX)
	                        }
	                    }
	                }
	            this.checkEdge();
	            if (this.props.simulateTranslate === true) {
	                // console.log('simulateTranslate')
	                if (axis === "x") {
	                    var tempX = this.translateX;
	                    if (prevIndex < activeIndex) {
	                        this.translateX += itemNodeWidth;
	                    } else {
	                        this.translateX -= itemNodeWidth;
	                    }
	                    this.transitionTouch(0);
	                    this.translateX = tempX;
	                } else {
	                    var tempY = this.translateY;
	                    if (prevIndex < activeIndex) {
	                        this.translateY += itemNodeHeight;
	                    } else {
	                        this.translateY -= itemNodeHeight;
	                    }
	                    this.transitionTouch(0);
	                    this.translateY = tempY;
	                }
	                setTimeout(function () {
	                    _this2.transitionTouch(0.3);
	                }, 100);
	                // rAF(this.transitionTouch.bind(this,animateDuration))
	            } else {
	                    this.transitionTouch(animateDuration);
	                }
	        }
	    }, {
	        key: "handleTouchStart",
	        value: function handleTouchStart(e) {
	            e && e.stopPropagation();
	            var _e$changedTouches$0 = e.changedTouches[0];
	            var clientY = _e$changedTouches$0.clientY;
	            var clientX = _e$changedTouches$0.clientX;
	            var axis = this.props.axis;

	            this.startTouchY = clientY;
	            this.startTouchX = clientX;
	            this.lastY = this.startTouchY;
	            this.lastX = this.startTouchX;
	            this.moveDirection = null;
	        }
	    }, {
	        key: "handleTouchEnd",
	        value: function handleTouchEnd(e) {
	            var _this3 = this;

	            e && e.stopPropagation();
	            var _e$changedTouches$02 = e.changedTouches[0];
	            var clientY = _e$changedTouches$02.clientY;
	            var clientX = _e$changedTouches$02.clientX;

	            if (this.startTouchX !== clientX || this.startTouchY !== clientY) {
	                var _props2 = this.props;
	                var axis = _props2.axis;
	                var animateDuration = _props2.animateDuration;
	                var thresholdOfChange = _props2.thresholdOfChange;

	                this.endTouchY = clientY;
	                this.endTouchX = clientX;
	                var inTouchableRegion = _libDomEs62["default"].inTouchableRegion(clientX, clientY, e.currentTarget);
	                if (this.props.onlyInside && !inTouchableRegion) {
	                    return;
	                }
	                if (this.props.handleActiveChange === false) {
	                    return;
	                }
	                // let touchDirection = Math.abs(this.endTouchX - this.startTouchX) > Math.abs(this.endTouchY - this.startTouchY) ?
	                // "x":"y";
	                if (this.moveDirection !== axis) {
	                    return;
	                }
	                var nextIndex = this.state.activeIndex;
	                var itemNode = _reactDom2["default"].findDOMNode(this).firstChild;
	                if (axis === "y") {
	                    (function () {
	                        var itemHeight = itemNode.offsetHeight;
	                        var activeIndex = Math.abs(_this3.translateY) / itemHeight;
	                        var step = (_this3.endTouchY - _this3.startTouchY) / itemHeight;
	                        activeIndex = Math.abs(step) > thresholdOfChange && step < 0 ? Math.ceil(activeIndex) : Math.floor(activeIndex);
	                        activeIndex = Math.abs(step) > thresholdOfChange && step > 0 ? Math.floor(activeIndex) : Math.ceil(activeIndex);
	                        if (_this3.lastY !== _this3.startTouchY && activeIndex !== _this3.state.activeIndex) {
	                            nextIndex = activeIndex;
	                            _this3.setState({
	                                activeIndex: activeIndex
	                            }, function () {
	                                return _this3.props.handleActiveChange(activeIndex);
	                            });
	                        }
	                        _this3.translateY = nextIndex * itemNode.offsetHeight > 0 ? -(nextIndex * itemNode.offsetHeight) : 0;
	                    })();
	                } else if (axis === "x") {
	                    (function () {
	                        var itemWidth = itemNode.offsetWidth;
	                        var activeIndex = Math.abs(_this3.translateX) / itemWidth;
	                        var step = (_this3.endTouchX - _this3.startTouchX) / itemWidth;
	                        // console.log('step',this.endTouchX,this.startTouchX,step)
	                        activeIndex = Math.abs(step) > thresholdOfChange && step < 0 ? Math.ceil(activeIndex) : Math.floor(activeIndex);
	                        activeIndex = Math.abs(step) > thresholdOfChange && step > 0 ? Math.floor(activeIndex) : Math.ceil(activeIndex);
	                        if (_this3.lastX !== _this3.startTouchX && activeIndex !== _this3.state.activeIndex) {
	                            nextIndex = activeIndex;
	                            _this3.setState({
	                                activeIndex: activeIndex
	                            }, function () {
	                                return _this3.props.handleActiveChange(activeIndex);
	                            });
	                        }
	                        _this3.translateX = nextIndex * itemNode.offsetWidth > 0 ? -(nextIndex * itemNode.offsetWidth) : 0;
	                    })();
	                }
	                this.checkEdge();
	                // console.log('this.translateX',Math.abs(this.endTouchX - this.startTouchX),Math.abs(this.endTouchY - this.startTouchY))
	                // console.log('translateY',this.translateY)
	                // this.transitionTouch(this.props.animateDuration)
	                // if(this.touchDirection() === axis){
	                (0, _libDomRequestAnimationFrame2["default"])(this.transitionTouch.bind(this, animateDuration));
	                _libDomEs62["default"].removeClass(_reactDom2["default"].findDOMNode(this), "sliding");
	            }
	        }
	    }, {
	        key: "handleTouchMove",
	        value: function handleTouchMove(e) {
	            var _this4 = this;

	            e && e.preventDefault();
	            // e && e.stopPropagation();
	            var _props3 = this.props;
	            var animateDuration = _props3.animateDuration;
	            var axis = _props3.axis;
	            var _e$changedTouches$03 = e.changedTouches[0];
	            var clientY = _e$changedTouches$03.clientY;
	            var clientX = _e$changedTouches$03.clientX;

	            var inTouchableRegion = _libDomEs62["default"].inTouchableRegion(clientX, clientY, e.currentTarget);
	            if (this.props.onlyInside && !inTouchableRegion) {
	                return;
	            }
	            var moveDirection = Math.abs(clientY - this.startTouchY) > Math.abs(clientX - this.startTouchX) ? "y" : "x";
	            if (this.moveDirection && this.moveDirection !== moveDirection) {
	                return;
	            }
	            this.moveDirection = moveDirection;
	            if (this.moveDirection === axis) {
	                _libDomEs62["default"].addClass(_reactDom2["default"].findDOMNode(this), "sliding");
	                // e && e.preventDefault()
	            }
	            if (axis === "y" && this.moveDirection === "y") {
	                this.translateY += clientY - this.lastY;
	            } else if (axis === "x" && this.moveDirection === "x") {
	                this.translateX += clientX - this.lastX;
	            }

	            this.translateY = this.translateY >= 0 ? 0 : this.translateY;
	            this.translateX = this.translateX >= 0 ? 0 : this.translateX;
	            this.checkEdge(function () {
	                _this4.lastY = clientY;
	                _this4.lastX = clientX;
	            });
	            if (this.props.transitionMove === true) {
	                var _ret4 = (function () {
	                    var transitionTouch = _this4.transitionTouch.bind(_this4, animateDuration);
	                    // console.log('this.translateX',(clientX - this.lastX),this.translateX)
	                    if (_this4.touchMoving) {
	                        return {
	                            v: undefined
	                        };
	                    }
	                    _this4.touchMoving = true;
	                    _this4.timeout = setTimeout(function () {
	                        transitionTouch();
	                        _this4.touchMoving = false;
	                        clearTimeout(_this4.timeout);
	                    }, 200);
	                    // _.throttle(transitionTouch,60)
	                })();

	                if (typeof _ret4 === "object") return _ret4.v;
	            }
	            e && e.preventDefault();
	        }
	    }, {
	        key: "checkEdge",
	        value: function checkEdge() {
	            var onEdge = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];
	            var axis = this.props.axis;
	            var translateY = this.translateY;
	            var translateX = this.translateX;

	            var translateNode = _reactDom2["default"].findDOMNode(this);
	            // let beyondY = dom.offset(translateNode.parentNode).top - dom.offset(translateNode).top;
	            // let beyondX = dom.offset(translateNode.parentNode).left - dom.offset(translateNode).left;
	            var maxBeyondY = translateNode.offsetHeight - translateNode.parentNode.parentNode.offsetHeight;
	            var maxBeyondX = translateNode.offsetWidth - translateNode.parentNode.parentNode.offsetWidth;
	            if (maxBeyondY <= -this.translateY && axis === "y") {
	                this.translateY = -maxBeyondY;
	            } else if (maxBeyondX <= -this.translateX && axis === "x") {
	                this.translateX = -maxBeyondX;
	            } else {
	                onEdge();
	            }
	        }
	    }, {
	        key: "transitionTouch",
	        value: function transitionTouch(duration) {
	            var axis = this.props.axis;
	            var translateY = this.translateY;
	            var translateX = this.translateX;

	            var transform = null;
	            if (axis === "y") {
	                translateY = window.px2rem ? window.px2rem(translateY) + "rem" : translateY + "px";
	                transform = "translate3D(0," + translateY + ",0)";
	            } else if (axis === "x") {
	                translateX = window.px2rem ? window.px2rem(translateX) + "rem" : translateX + "px";
	                transform = "translate3D(" + translateX + ",0,0)";
	            }
	            if (transform !== null) {
	                var translateNode = _reactDom2["default"].findDOMNode(this);
	                // _.delay(()=>{
	                // let duration = duration || 0.3
	                translateNode.style.transitionDuration = duration + "s";
	                translateNode.style.WebkitTransform = transform;
	                // },60)
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var child = _react2["default"].Children.only(this.props.children);
	            // console.log('activeIndex',this.state.activeIndex)
	            return _react2["default"].cloneElement(child, _Object$assign({}, child.props, {
	                onTouchStart: this.handleTouchStart.bind(this),
	                onTouchMove: this.handleTouchMove.bind(this),
	                onTouchEnd: this.handleTouchEnd.bind(this),
	                active: this.state.activeIndex,
	                style: _Object$assign({}, this.props.style, {
	                    // transitionDuration:`${this.props.animateDuration}s`,
	                    transitionProperty: "transform"
	                })
	            }));
	        }
	    }]);

	    return Slidable;
	})(_react.Component);

	Slidable.defaultProps = {
	    activeIndex: 0,
	    onlyInside: false,
	    axis: "y",
	    thresholdOfChange: 0.3,
	    animateDuration: 0.3,
	    pinMode: false,
	    transitionMove: true,
	    simulateTranslate: false,
	    handleActiveChange: false
	};

	exports["default"] = Slidable;
	module.exports = exports["default"];

/***/ },

/***/ 383:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var startY = 0;
	var enabled = false;

	var handleTouchmove = function handleTouchmove(e) {
	  var el = e.target;
	  while (el !== document.body) {
	    var style = window.getComputedStyle(el);
	    if (!style) {
	      break;
	    }
	    var scrolling = style.getPropertyValue('-webkit-overflow-scrolling');
	    var overflowY = style.getPropertyValue('overflow-y');
	    var height = parseInt(style.getPropertyValue('height'), 10);
	    var isScrollable = scrolling === 'touch' && (overflowY === 'auto' || overflowY === 'scroll');
	    var canScroll = el.scrollHeight > el.offsetHeight;
	    if (isScrollable && canScroll) {
	      var currentY = e.touches ? e.touches[0].screenY : e.screenY;
	      var isAtTop = startY <= currentY && el.scrollTop === 0;
	      var isAtBottom = startY >= currentY && el.scrollHeight - el.scrollTop === height;
	      if (isAtTop || isAtBottom) {
	        e.preventDefault();
	      }
	      return;
	    }
	    el = el.parentNode;
	  }
	  // e.preventDefault()
	};

	var handleTouchstart = function handleTouchstart(e) {
	  startY = e.touches ? e.touches[0].screenY : e.screenY;
	};

	function enable() {
	  // Listen to a couple key touch events
	  document.body.addEventListener('touchstart', handleTouchstart, false);
	  document.body.addEventListener('touchmove', handleTouchmove, false);
	  enabled = true;
	};
	function disable() {
	  // Stop listening
	  document.body.removeEventListener('touchstart', handleTouchstart, false);
	  document.body.removeEventListener('touchmove', handleTouchmove, false);
	  enabled = false;
	};

	function isEnabled() {
	  return enabled;
	};

	// if(undefined !== window){
	//   var testDiv = document.createElement('div');
	//   document.documentElement.appendChild(testDiv);
	//   testDiv.style.WebkitOverflowScrolling = 'touch';
	//   var scrollSupport = 'getComputedStyle' in window && window.getComputedStyle(testDiv)['-webkit-overflow-scrolling'] === 'touch';
	//   document.documentElement.removeChild(testDiv);

	//   if (scrollSupport) {
	//       enable();
	//   }
	// }

	exports['default'] = {
	  enable: enable, disable: disable, isEnabled: isEnabled
	};
	module.exports = exports['default'];

/***/ },

/***/ 413:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(210)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	var _sharedChunkIndexAppJsx = __webpack_require__(414);

	var _sharedChunkIndexAppJsx2 = _interopRequireDefault(_sharedChunkIndexAppJsx);

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(218);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	Object.assign = _Object$assign || __webpack_require__(328);

	function bootstrap() {
	    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
	    _reactDom2["default"].render(_react2["default"].createElement(_sharedChunkIndexAppJsx2["default"], { initialState: initialState }), document.getElementById('index'));
	}
	if (typeof window.addEventListener) {
	    window.addEventListener("DOMContentLoaded", bootstrap);
	} else {
	    window.attachEvent('onload', bootstrap);
	}

/***/ },

/***/ 414:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	var _interopRequireWildcard = __webpack_require__(415)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(190);

	var _reducerEs6 = __webpack_require__(416);

	var _reducerEs62 = _interopRequireDefault(_reducerEs6);

	var _libReduxHelperEs6 = __webpack_require__(208);

	var _libReduxHelperEs62 = _interopRequireDefault(_libReduxHelperEs6);

	var _componentJsx = __webpack_require__(418);

	var _componentJsx2 = _interopRequireDefault(_componentJsx);

	var _actionEs6 = __webpack_require__(423);

	var actions = _interopRequireWildcard(_actionEs6);

	var IndexConnected = (0, _reactRedux.connect)(function (state) {
	    return state;
	})((0, _libReduxHelperEs6.wrapComponentWithActions)(_componentJsx2["default"], actions));

	var IndexApp = (function (_React$Component) {
	    _inherits(IndexApp, _React$Component);

	    function IndexApp() {
	        _classCallCheck(this, IndexApp);

	        _get(Object.getPrototypeOf(IndexApp.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(IndexApp, [{
	        key: "render",
	        value: function render() {
	            var weather = this.props.initialState.weather;

	            var store = (0, _libReduxHelperEs62["default"])(_reducerEs62["default"], {
	                weatherByCityName: {
	                    isFetching: false,
	                    weather: weather
	                }
	            });
	            return _react2["default"].createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2["default"].createElement(IndexConnected, null)
	            );
	        }
	    }]);

	    return IndexApp;
	})(_react2["default"].Component);

	exports["default"] = IndexApp;
	module.exports = exports["default"];

/***/ },

/***/ 415:
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj["default"] = obj;
	    return newObj;
	  }
	};

	exports.__esModule = true;

/***/ },

/***/ 416:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(210)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.weatherByCityName = weatherByCityName;

	var _constantEs6 = __webpack_require__(417);

	var _redux = __webpack_require__(197);

	function weatherByCityName(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _constantEs6.CHANGE_FIELD:
	            var name = action.name,
	                value = action.value;

	            var weather = _Object$assign({}, state.weather);
	            weather[name] = value;
	            return _Object$assign({}, state, {
	                weather: weather
	            });
	        case _constantEs6.REQUEST_WEATHER:
	            return _Object$assign({}, state, {
	                weatherFetched: false,
	                weatherFetching: true
	            });
	        case _constantEs6.RESPONSE_WEATHER:
	            var weather = action.res.result;
	            var weatherFetched = action.res.weatherFetched;
	            return _Object$assign({}, state, {
	                weather: weather,
	                weatherFetched: weatherFetched,
	                weatherFetching: false
	            });
	        default:
	            return state;
	    }
	}

	var rootReducer = (0, _redux.combineReducers)({
	    weatherByCityName: weatherByCityName
	});

	exports["default"] = rootReducer;

/***/ },

/***/ 417:
/***/ function(module, exports) {

	'use strict';
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CHANGE_FIELD = "CHANGE_FIELD";
	exports.CHANGE_FIELD = CHANGE_FIELD;
	var REQUEST_WEATHER = "REQUEST_WEATHER";
	exports.REQUEST_WEATHER = REQUEST_WEATHER;
	var RESPONSE_WEATHER = "RESPONSE_WEATHER";
	exports.RESPONSE_WEATHER = RESPONSE_WEATHER;

/***/ },

/***/ 418:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _partialIndexJsx = __webpack_require__(419);

	var _partialIndexJsx2 = _interopRequireDefault(_partialIndexJsx);

	var _partialSearchJsx = __webpack_require__(422);

	var _partialSearchJsx2 = _interopRequireDefault(_partialSearchJsx);

	var _director = __webpack_require__(325);

	var _commonSwitcherJsx = __webpack_require__(327);

	var IndexRouter = (function (_Component) {
	    _inherits(IndexRouter, _Component);

	    function IndexRouter(props) {
	        _classCallCheck(this, IndexRouter);

	        _get(Object.getPrototypeOf(IndexRouter.prototype), "constructor", this).call(this, props);
	        this.state = {
	            currentRoute: null,
	            prevRoute: null
	        };
	    }

	    _createClass(IndexRouter, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var _this = this;

	            (0, _director.Router)({
	                "/search": function search() {
	                    _this.setState({
	                        currentRoute: "search",
	                        prevRoute: _this.state.currentRoute
	                    });
	                },
	                "/": function _() {
	                    _this.setState({
	                        currentRoute: "index",
	                        prevState: _this.state.currentRoute
	                    });
	                }
	            }).init("/");
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _state = this.state;
	            var currentRoute = _state.currentRoute;
	            var prevRoute = _state.prevRoute;

	            return _react2["default"].createElement(
	                _commonSwitcherJsx.Switcher,
	                { currentRoute: currentRoute, prevRoute: prevRoute },
	                _react2["default"].createElement(
	                    _commonSwitcherJsx.SwitcherCase,
	                    { name: "index" },
	                    _react2["default"].createElement(_partialIndexJsx2["default"], this.props)
	                ),
	                _react2["default"].createElement(
	                    _commonSwitcherJsx.SwitcherCase,
	                    { name: "search" },
	                    _react2["default"].createElement(_partialSearchJsx2["default"], this.props)
	                )
	            );
	        }
	    }]);

	    return IndexRouter;
	})(_react.Component);

	exports["default"] = IndexRouter;
	module.exports = exports["default"];

/***/ },

/***/ 419:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(234);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _componentSlidetabsJsx = __webpack_require__(381);

	var _componentSliderSliderJsx = __webpack_require__(321);

	var _componentSliderSliderJsx2 = _interopRequireDefault(_componentSliderSliderJsx);

	var _componentSliderSlideJsx = __webpack_require__(322);

	var _componentSliderSlideJsx2 = _interopRequireDefault(_componentSliderSlideJsx);

	var _headerJsx = __webpack_require__(420);

	var _headerJsx2 = _interopRequireDefault(_headerJsx);

	var _floorJsx = __webpack_require__(421);

	var _floorJsx2 = _interopRequireDefault(_floorJsx);

	var Index = (function (_Component) {
	    _inherits(Index, _Component);

	    function Index() {
	        _classCallCheck(this, Index);

	        _get(Object.getPrototypeOf(Index.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Index, [{
	        key: "render",
	        value: function render() {
	            var weather = this.props.weatherByCityName.weather;

	            var classes = (0, _classnames2["default"])({
	                "index-content": true
	            });
	            return _react2["default"].createElement(
	                "div",
	                { className: classes },
	                _react2["default"].createElement(_headerJsx2["default"], null),
	                _react2["default"].createElement(
	                    _componentSlidetabsJsx.SlideTabs,
	                    { axis: "x" },
	                    _react2["default"].createElement(
	                        _componentSlidetabsJsx.SlideTabsItem,
	                        { navigator: function () {
	                                return _react2["default"].createElement(
	                                    "span",
	                                    null,
	                                    _react2["default"].createElement(
	                                        "b",
	                                        null,
	                                        "首页"
	                                    )
	                                );
	                            } },
	                        _react2["default"].createElement(_floorJsx2["default"], { ref: "floor" })
	                    ),
	                    _react2["default"].createElement(
	                        _componentSlidetabsJsx.SlideTabsItem,
	                        { navigator: function () {
	                                return _react2["default"].createElement(
	                                    "span",
	                                    null,
	                                    _react2["default"].createElement(
	                                        "b",
	                                        null,
	                                        "母婴用品"
	                                    )
	                                );
	                            } },
	                        _react2["default"].createElement(_floorJsx2["default"], { ref: "floor" })
	                    ),
	                    _react2["default"].createElement(
	                        _componentSlidetabsJsx.SlideTabsItem,
	                        { navigator: function () {
	                                return _react2["default"].createElement(
	                                    "span",
	                                    null,
	                                    _react2["default"].createElement(
	                                        "b",
	                                        null,
	                                        "美妆个护"
	                                    )
	                                );
	                            } },
	                        _react2["default"].createElement(_floorJsx2["default"], { ref: "floor" })
	                    ),
	                    _react2["default"].createElement(
	                        _componentSlidetabsJsx.SlideTabsItem,
	                        { navigator: function () {
	                                return _react2["default"].createElement(
	                                    "span",
	                                    null,
	                                    _react2["default"].createElement(
	                                        "b",
	                                        null,
	                                        "营养保健"
	                                    )
	                                );
	                            } },
	                        _react2["default"].createElement(_floorJsx2["default"], { ref: "floor" })
	                    ),
	                    _react2["default"].createElement(
	                        _componentSlidetabsJsx.SlideTabsItem,
	                        { navigator: function () {
	                                return _react2["default"].createElement(
	                                    "span",
	                                    null,
	                                    _react2["default"].createElement(
	                                        "b",
	                                        null,
	                                        "家居生活"
	                                    )
	                                );
	                            } },
	                        _react2["default"].createElement(_floorJsx2["default"], { ref: "floor" })
	                    ),
	                    _react2["default"].createElement(
	                        _componentSlidetabsJsx.SlideTabsItem,
	                        { navigator: function () {
	                                return _react2["default"].createElement(
	                                    "span",
	                                    null,
	                                    _react2["default"].createElement(
	                                        "b",
	                                        null,
	                                        "国际轻奢"
	                                    )
	                                );
	                            } },
	                        _react2["default"].createElement(_floorJsx2["default"], { ref: "floor" })
	                    )
	                ),
	                _react2["default"].createElement(
	                    "nav",
	                    { className: "bottomNav" },
	                    _react2["default"].createElement(
	                        "ul",
	                        { className: "clearfix" },
	                        _react2["default"].createElement(
	                            "li",
	                            null,
	                            _react2["default"].createElement(
	                                "a",
	                                { href: "/", className: "nav_hover" },
	                                _react2["default"].createElement("i", null),
	                                "海外购"
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "li",
	                            null,
	                            _react2["default"].createElement(
	                                "a",
	                                { href: "/category" },
	                                _react2["default"].createElement("i", null),
	                                "分类"
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "li",
	                            null,
	                            _react2["default"].createElement(
	                                "a",
	                                { href: "/trendy" },
	                                _react2["default"].createElement("i", null),
	                                "爆款"
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "li",
	                            null,
	                            _react2["default"].createElement(
	                                "a",
	                                { href: "/cart" },
	                                _react2["default"].createElement("i", null),
	                                "购物车"
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "li",
	                            null,
	                            _react2["default"].createElement(
	                                "a",
	                                { href: "/membercenter" },
	                                _react2["default"].createElement("i", null),
	                                "个人中心"
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Index;
	})(_react.Component);

	exports["default"] = Index;
	module.exports = exports["default"];

/***/ },

/***/ 420:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var Header = (function (_Component) {
	    _inherits(Header, _Component);

	    function Header(props) {
	        _classCallCheck(this, Header);

	        _get(Object.getPrototypeOf(Header.prototype), "constructor", this).call(this, props);
	    }

	    _createClass(Header, [{
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "header",
	                null,
	                _react2["default"].createElement(
	                    "a",
	                    { className: "logo", href: "#/" },
	                    _react2["default"].createElement("img", { src: "/client/asset/images/indexlogo.png" })
	                ),
	                _react2["default"].createElement("a", { className: "indexQrcode", href: "#" }),
	                _react2["default"].createElement("a", { className: "indexSearch", href: "#/search" })
	            );
	        }
	    }]);

	    return Header;
	})(_react.Component);

	exports["default"] = Header;
	module.exports = exports["default"];

/***/ },

/***/ 421:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(218);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _componentSliderSliderJsx = __webpack_require__(321);

	var _componentSliderSliderJsx2 = _interopRequireDefault(_componentSliderSliderJsx);

	var _componentSliderSlideJsx = __webpack_require__(322);

	var _componentSliderSlideJsx2 = _interopRequireDefault(_componentSliderSlideJsx);

	var Floor = (function (_Component) {
	    _inherits(Floor, _Component);

	    function Floor(props) {
	        _classCallCheck(this, Floor);

	        _get(Object.getPrototypeOf(Floor.prototype), "constructor", this).call(this, props);
	    }

	    _createClass(Floor, [{
	        key: "renderSingleRecommend",
	        value: function renderSingleRecommend() {
	            return _react2["default"].createElement(
	                "div",
	                { className: "indexSingle" },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "title" },
	                    _react2["default"].createElement(
	                        "span",
	                        null,
	                        _react2["default"].createElement("i", null),
	                        "单品推荐"
	                    )
	                ),
	                _react2["default"].createElement(
	                    "a",
	                    { href: "/gooddetail/1", className: "clearfix" },
	                    _react2["default"].createElement("img", { src: "/client/asset/images/pic15.gif" }),
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "name" },
	                        "阿瓦隆B群防脱洗发水414ml"
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        "拯救你的“纤细稀薄”秀发！“治愈性”洗发水，不只是清洁防脱，更能促进毛囊生长、增加发量！生物素+锯棕榈，解决稀疏问题！无硅、无SLS起泡剂。"
	                    ),
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "country" },
	                        _react2["default"].createElement(
	                            "i",
	                            null,
	                            _react2["default"].createElement("img", { src: "/client/asset/images/ico_flag.png", alt: "" })
	                        ),
	                        "荷兰直采"
	                    ),
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "singlePrice" },
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "nowPrice" },
	                            "¥99.0"
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "oldPrice" },
	                            "¥199.0"
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "a",
	                    { href: "/gooddetail/2", className: "clearfix" },
	                    _react2["default"].createElement("img", { src: "/client/asset/images/pic16.gif" }),
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "name" },
	                        "阿瓦隆B群防脱洗发水414ml"
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        "拯救你的“纤细稀薄”秀发！“治愈性”洗发水，不只是清洁防脱，更能促进毛囊生长、增加发量！生物素+锯棕榈，解决稀疏问题！无硅、无SLS起泡剂。"
	                    ),
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "country" },
	                        _react2["default"].createElement(
	                            "i",
	                            null,
	                            _react2["default"].createElement("img", { src: "/client/asset/images/ico_flag.png", alt: "" })
	                        ),
	                        "荷兰直采"
	                    ),
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "singlePrice" },
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "nowPrice" },
	                            "¥99.0"
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "oldPrice" },
	                            "¥199.0"
	                        )
	                    )
	                )
	            );
	        }
	    }, {
	        key: "renderNewRecommend",
	        value: function renderNewRecommend() {
	            return _react2["default"].createElement(
	                "div",
	                { className: "activityGeneral" },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "title" },
	                    _react2["default"].createElement(
	                        "span",
	                        null,
	                        _react2["default"].createElement("i", null),
	                        "新品推荐"
	                    )
	                ),
	                _react2["default"].createElement(
	                    "a",
	                    { href: "/gooddetail/1", className: "clearfix" },
	                    _react2["default"].createElement("img", { src: "/client/asset/images/pic21.gif" }),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "right" },
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "name" },
	                            "荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（..."
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "country" },
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                _react2["default"].createElement("img", { src: "/client/asset/images/ico_flag.png", alt: "" })
	                            ),
	                            "荷兰"
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "nowPrice" },
	                            "¥99.0"
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "oldPrice" },
	                            "¥199.0"
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "a",
	                    { href: "/gooddetail/2", className: "clearfix" },
	                    _react2["default"].createElement("img", { src: "/client/asset/images/pic21.gif" }),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "right" },
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "name" },
	                            "荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（..."
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "country" },
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                _react2["default"].createElement("img", { src: "/client/asset/images/ico_flag.png", alt: "" })
	                            ),
	                            "荷兰"
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "nowPrice" },
	                            "¥99.0"
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "oldPrice" },
	                            "¥199.0"
	                        )
	                    )
	                )
	            );
	        }
	    }, {
	        key: "renderSlider",
	        value: function renderSlider() {
	            return _react2["default"].createElement(
	                _componentSliderSliderJsx2["default"],
	                { ref: "slider", autoPlay: true, touchEnabled: false, effect: "fade" },
	                _react2["default"].createElement(
	                    _componentSliderSlideJsx2["default"],
	                    null,
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "/activity" },
	                        _react2["default"].createElement("img", { src: "/client/asset/images/banner.gif", alt: "" })
	                    )
	                ),
	                _react2["default"].createElement(
	                    _componentSliderSlideJsx2["default"],
	                    null,
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "/activity" },
	                        _react2["default"].createElement("img", { src: "/client/asset/images/banner.gif", alt: "" })
	                    )
	                ),
	                _react2["default"].createElement(
	                    _componentSliderSlideJsx2["default"],
	                    null,
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "/activity" },
	                        _react2["default"].createElement("img", { src: "/client/asset/images/banner.gif", alt: "" })
	                    )
	                )
	            );
	        }
	    }, {
	        key: "componentDidUpdate",
	        value: function componentDidUpdate() {
	            if (this.props.redraw === true) {
	                var sliderNode = _reactDom2["default"].findDOMNode(this);
	                // console.log(sliderNode.parentNode.offsetWidth)
	                // this.refs["slider"].initialize({
	                //     width:sliderNode.parentNode.offsetWidth
	                // })
	                // this.refs["slider"].play()
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "div",
	                { className: "floor-content" },
	                this.renderSlider(),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "m-entry" },
	                    _react2["default"].createElement(
	                        "span",
	                        null,
	                        "精选特卖"
	                    ),
	                    _react2["default"].createElement(
	                        "span",
	                        null,
	                        "热销排行"
	                    ),
	                    _react2["default"].createElement(
	                        "span",
	                        null,
	                        "正品保障"
	                    ),
	                    _react2["default"].createElement(
	                        "span",
	                        null,
	                        "新人福利"
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "panic" },
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "/activity" },
	                        _react2["default"].createElement("img", { src: "/client/asset/images/pic1.gif" }),
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                _react2["default"].createElement("img", { src: "/client/asset/images/flashClock.png", alt: "" })
	                            ),
	                            "距本期活动结束：01天34时10分46秒"
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "/activity" },
	                        _react2["default"].createElement("img", { src: "/client/asset/images/pic2.gif" }),
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                _react2["default"].createElement("img", { src: "/client/asset/images/flashClock.png", alt: "" })
	                            ),
	                            "距本期活动结束：01天34时10分46秒"
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "activity" },
	                    _react2["default"].createElement(
	                        "ul",
	                        { className: "clearfix" },
	                        _react2["default"].createElement(
	                            "li",
	                            null,
	                            _react2["default"].createElement(
	                                "a",
	                                { href: "/mobileonly" },
	                                _react2["default"].createElement("img", { src: "/client/asset/images/pic3.gif", alt: "" }),
	                                _react2["default"].createElement("span", null)
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "li",
	                            null,
	                            _react2["default"].createElement(
	                                "a",
	                                { href: "/finest" },
	                                _react2["default"].createElement("img", { src: "/client/asset/images/pic4.gif", alt: "" }),
	                                _react2["default"].createElement("span", null)
	                            ),
	                            _react2["default"].createElement(
	                                "a",
	                                { href: "/stockup" },
	                                _react2["default"].createElement("img", { src: "/client/asset/images/pic5.gif", alt: "" }),
	                                _react2["default"].createElement("span", null)
	                            )
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "activity_2" },
	                    _react2["default"].createElement(
	                        "ul",
	                        { className: "clearfix" },
	                        _react2["default"].createElement(
	                            "li",
	                            null,
	                            _react2["default"].createElement(
	                                "a",
	                                { href: "/activity" },
	                                _react2["default"].createElement("img", { src: "/client/asset/images/pic6.gif", alt: "" })
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "li",
	                            null,
	                            _react2["default"].createElement(
	                                "a",
	                                { href: "/activity" },
	                                _react2["default"].createElement("img", { src: "/client/asset/images/pic7.gif", alt: "" })
	                            )
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "flashBuy" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "title" },
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            _react2["default"].createElement("i", null),
	                            "闪购精选"
	                        ),
	                        _react2["default"].createElement(
	                            "a",
	                            { href: "/flashbuy" },
	                            "更多",
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                _react2["default"].createElement("img", { src: "/client/asset/images/ico_more.png" })
	                            )
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "/gooddetail/1", className: "clearfix" },
	                        _react2["default"].createElement("img", { src: "/client/asset/images/pic8.gif" }),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "right" },
	                            _react2["default"].createElement(
	                                "p",
	                                null,
	                                "距本期闪购结束",
	                                _react2["default"].createElement(
	                                    "em",
	                                    null,
	                                    _react2["default"].createElement(
	                                        "i",
	                                        null,
	                                        "01"
	                                    ),
	                                    "天",
	                                    _react2["default"].createElement(
	                                        "i",
	                                        null,
	                                        "34"
	                                    ),
	                                    "时",
	                                    _react2["default"].createElement(
	                                        "i",
	                                        null,
	                                        "10分"
	                                    ),
	                                    _react2["default"].createElement(
	                                        "i",
	                                        null,
	                                        "46秒"
	                                    )
	                                )
	                            ),
	                            _react2["default"].createElement("div", { className: "flashDot" }),
	                            _react2["default"].createElement(
	                                "span",
	                                { className: "name" },
	                                "荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（..."
	                            ),
	                            _react2["default"].createElement(
	                                "span",
	                                { className: "country" },
	                                _react2["default"].createElement(
	                                    "i",
	                                    null,
	                                    _react2["default"].createElement("img", { src: "/client/asset/images/ico_flag.png", alt: "" })
	                                ),
	                                "荷兰"
	                            ),
	                            _react2["default"].createElement(
	                                "span",
	                                { className: "nowPrice" },
	                                "¥99.0"
	                            ),
	                            _react2["default"].createElement(
	                                "span",
	                                { className: "oldPrice" },
	                                "¥199.0"
	                            )
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "activity_3" },
	                    _react2["default"].createElement(
	                        "ul",
	                        { className: "clearfix" },
	                        _react2["default"].createElement(
	                            "li",
	                            null,
	                            _react2["default"].createElement(
	                                "a",
	                                { href: "/activity" },
	                                _react2["default"].createElement("img", { src: "/client/asset/images/pic11.gif", alt: "" })
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "li",
	                            null,
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "clearfix" },
	                                _react2["default"].createElement(
	                                    "a",
	                                    { href: "/activity" },
	                                    _react2["default"].createElement("img", { src: "/client/asset/images/pic12.gif", alt: "" })
	                                ),
	                                _react2["default"].createElement(
	                                    "a",
	                                    { href: "/activity" },
	                                    _react2["default"].createElement("img", { src: "/client/asset/images/pic13.gif", alt: "" })
	                                )
	                            ),
	                            _react2["default"].createElement(
	                                "a",
	                                { href: "/activity" },
	                                _react2["default"].createElement("img", { src: "/client/asset/images/pic14.gif", alt: "" })
	                            )
	                        )
	                    )
	                ),
	                this.renderSingleRecommend(),
	                this.renderNewRecommend()
	            );
	        }
	    }]);

	    return Floor;
	})(_react.Component);

	exports["default"] = Floor;
	module.exports = exports["default"];

/***/ },

/***/ 422:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var SearchBox = (function (_Component) {
	    _inherits(SearchBox, _Component);

	    function SearchBox(props) {
	        _classCallCheck(this, SearchBox);

	        _get(Object.getPrototypeOf(SearchBox.prototype), "constructor", this).call(this, props);
	    }

	    _createClass(SearchBox, [{
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "div",
	                { className: "search-wrap" },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "search-header" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "search-box" },
	                        _react2["default"].createElement("input", { id: "search-box", type: "search", placeholder: "寻找宝贝" }),
	                        _react2["default"].createElement("span", null),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "reset" },
	                            _react2["default"].createElement("i", { className: "iconfont icon-closefill" })
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "search-btn" },
	                        _react2["default"].createElement(
	                            "a",
	                            { href: "#/" },
	                            "取消"
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "searchHot clearfix" },
	                    _react2["default"].createElement(
	                        "span",
	                        null,
	                        "热搜"
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        null,
	                        _react2["default"].createElement(
	                            "a",
	                            { href: "/goodlist/1" },
	                            "洗衣液"
	                        ),
	                        _react2["default"].createElement(
	                            "a",
	                            { href: "/goodlist/2" },
	                            "女士香水"
	                        ),
	                        _react2["default"].createElement(
	                            "a",
	                            { href: "/goodlist/2" },
	                            "洗衣液"
	                        ),
	                        _react2["default"].createElement(
	                            "a",
	                            { href: "/goodlist/2" },
	                            "女士香水"
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "searchList" },
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "clearfix" },
	                        _react2["default"].createElement(
	                            "em",
	                            null,
	                            "历史搜索"
	                        ),
	                        _react2["default"].createElement(
	                            "i",
	                            null,
	                            "清空记录"
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "/goodlist/2" },
	                        "洗衣液"
	                    ),
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "/goodlist/2" },
	                        "洗衣液"
	                    ),
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "/goodlist/2" },
	                        "洗衣液"
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "searchOut" },
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "/goodlist/2" },
	                        "金利来"
	                    ),
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "/goodlist/2" },
	                        "金纺"
	                    ),
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "/goodlist/2" },
	                        "金立手机"
	                    )
	                )
	            );
	        }
	    }]);

	    return SearchBox;
	})(_react.Component);

	exports["default"] = SearchBox;
	module.exports = exports["default"];

/***/ },

/***/ 423:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.changeField = changeField;
	exports.fetchWeather = fetchWeather;

	var _libUtilEs6 = __webpack_require__(227);

	var _constantEs6 = __webpack_require__(417);

	function changeField(name, value) {
	    return {
	        type: _constantEs6.CHANGE_FIELD,
	        name: name,
	        value: value
	    };
	}

	function requestWeather(param) {
	    return {
	        type: _constantEs6.REQUEST_WEATHER,
	        param: param
	    };
	}

	function responseWeather(param, res) {
	    return {
	        type: _constantEs6.RESPONSE_WEATHER,
	        param: param,
	        res: res
	    };
	}

	function fetchWeather(param) {
	    return function (dispatch) {
	        dispatch(requestWeather(param));
	        (0, _libUtilEs6.apiRequest)("/weather", param, { method: "POST" }).then(function (res) {
	            dispatch(responseWeather(param, res));
	        });
	    };
	}

/***/ },

/***/ 424:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});