webpackJsonp([19],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(563);
	module.exports = __webpack_require__(576);


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

/***/ 217:
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

	    function Header() {
	        _classCallCheck(this, Header);

	        _get(Object.getPrototypeOf(Header.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Header, [{
	        key: "renderBackButton",
	        value: function renderBackButton() {
	            var _props = this.props;
	            var canBack = _props.canBack;
	            var handleGoBack = _props.handleGoBack;

	            if (canBack === true) {
	                return _react2["default"].createElement("a", { href: "javascript:;", onClick: handleGoBack, className: "iconfont icon-back" });
	            }
	            return null;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "header",
	                { className: "header" },
	                this.renderBackButton(),
	                this.props.children
	            );
	        }
	    }]);

	    return Header;
	})(_react.Component);

	Header.defaultProps = {
	    canBack: true,
	    handleGoBack: function handleGoBack() {
	        window.history.back();
	    }
	};

	exports["default"] = Header;
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

	function apiRequest(url) {
	    var param = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {
	        method: "GET",
	        type: "json"
	    } : arguments[2];

	    options = _Object$assign({}, options, {
	        url: url,
	        data: param
	    });
	    // console.log('url',url,param)
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

/***/ 240:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _defineProperty = __webpack_require__(241)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(234);

	var _classnames2 = _interopRequireDefault(_classnames);

	var Icon = (function (_Component) {
	    _inherits(Icon, _Component);

	    function Icon() {
	        _classCallCheck(this, Icon);

	        _get(Object.getPrototypeOf(Icon.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Icon, [{
	        key: "render",
	        value: function render() {
	            var icon = this.props.icon;

	            var classes = (0, _classnames2["default"])(this.props.className, _defineProperty({
	                "iconfont": true
	            }, "icon-" + icon, true));
	            return _react2["default"].createElement("span", { className: classes });
	        }
	    }]);

	    return Icon;
	})(_react.Component);

	exports["default"] = Icon;
	module.exports = exports["default"];

/***/ },

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(30)["default"];

	exports["default"] = function (obj, key, value) {
	  if (key in obj) {
	    _Object$defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

	exports.__esModule = true;

/***/ },

/***/ 251:
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

	var Footer = (function (_Component) {
	    _inherits(Footer, _Component);

	    function Footer(props) {
	        _classCallCheck(this, Footer);

	        _get(Object.getPrototypeOf(Footer.prototype), "constructor", this).call(this, props);
	        this.state = {
	            activeIndex: props.activeIndex
	        };
	    }

	    _createClass(Footer, [{
	        key: "handleClick",
	        value: function handleClick(index) {
	            this.setState({
	                activeIndex: index
	            });
	            switch (index) {
	                case 1:
	                    window.location.href = '/polymer';
	                    break;
	                case 2:
	                    window.location.href = '/trendy';
	                    break;
	                case 3:
	                    window.location.href = '/cart';
	                    break;
	                case 4:
	                    window.location.href = '/membercenter';
	                    break;
	                default:
	                    window.location.href = '/';
	                    break;
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {

	            var it = this;
	            var list = [];

	            var items = ["海外购", "分类", "爆款", "购物车", "个人中心"];

	            items.map(function (item, i) {
	                var key = 'item-' + i;
	                var hoverClass = (0, _classnames2["default"])({
	                    "nav-hover": i == it.state.activeIndex
	                });
	                list.push(_react2["default"].createElement(
	                    "li",
	                    { key: key, onClick: it.handleClick.bind(it, i) },
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "#", className: hoverClass },
	                        _react2["default"].createElement("i", null),
	                        item
	                    )
	                ));
	            });

	            return _react2["default"].createElement(
	                "footer",
	                { className: "bottom-nav" },
	                _react2["default"].createElement(
	                    "ul",
	                    { className: "clearfix" },
	                    list
	                )
	            );
	        }
	    }]);

	    return Footer;
	})(_react.Component);

	Footer.defaultProps = {
	    activeIndex: 0
	};

	exports["default"] = Footer;
	module.exports = exports["default"];

/***/ },

/***/ 317:
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

/***/ 319:
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

/***/ 347:
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

/***/ 375:
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

	var _slidableJsx = __webpack_require__(376);

	var _slidableJsx2 = _interopRequireDefault(_slidableJsx);

	var _libDomEs6 = __webpack_require__(238);

	var _libDomEs62 = _interopRequireDefault(_libDomEs6);

	var _libDomNobounceScrollEs6 = __webpack_require__(377);

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
	        value: function componentWillUnmount() {}
	        // noBounceScroll.disable()

	        // shouldComponentUpdate(nextProps,nextState){
	        //     if(nextState.activeIndex !== this.state.activeIndex
	        //         || nextProps.activeIndex !== this.props.activeIndex){
	        //         return true
	        //     }
	        //     return false
	        // }

	    }, {
	        key: "handleSelect",
	        value: function handleSelect(i, e) {
	            var _this = this;

	            // e && e.preventDefault()
	            this.setState({
	                activeIndex: i
	            }, function () {
	                _this.props.onSelect(i);
	            });
	        }
	    }, {
	        key: "handleContentActiveChange",
	        value: function handleContentActiveChange(i, e) {
	            var _this2 = this;

	            this.setState({
	                activeIndex: i
	            }, function () {
	                return _this2.props.onSelect(i);
	            });
	        }
	    }, {
	        key: "renderNavbar",
	        value: function renderNavbar() {
	            var _this3 = this;

	            var navigators = [];
	            _react2["default"].Children.forEach(this.props.children, function (child, i) {
	                var navigator = child.props.navigator;

	                var classes = (0, _classnames2["default"])("slide-tabs-navbar-item", {
	                    active: i === _this3.state.activeIndex
	                });
	                navigators.push(_react2["default"].createElement(
	                    "div",
	                    { className: classes, key: i, onClick: _this3.handleSelect.bind(_this3, i) },
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
	                identify: index,
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
	            var tabsContent = _react2["default"].createElement(
	                "div",
	                { className: "slide-tabs-content"
	                },
	                _react2["default"].Children.map(this.props.children, this.renderTabsItem.bind(this))
	            );
	            if (this.props.contentSlidable === true) {
	                tabsContent = _react2["default"].createElement(
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
	                );
	            }
	            return _react2["default"].createElement(
	                "div",
	                { className: classes },
	                tabsContent,
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
	    contentSlidable: true,
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
	            var identify = _props.identify;
	            var active = _props.active;

	            var classes = (0, _classnames2["default"])("slide-tabs-item", this.props.className, {
	                active: active
	            });
	            return _react2["default"].createElement(
	                "div",
	                { className: classes, key: identify, style: this.state.itemStyle,
	                    onTouchMove: this.handleTouchMove.bind(this),
	                    onTouchStart: this.handleTouchStart.bind(this) },
	                this.props.children
	            );
	        }
	    }]);

	    return SlideTabsItem;
	})(_react.Component);

	exports.SlideTabsItem = SlideTabsItem;

/***/ },

/***/ 376:
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
	            var maxBeyondY = translateNode.offsetHeight - translateNode.parentNode.offsetHeight;
	            var maxBeyondX = translateNode.offsetWidth - translateNode.parentNode.offsetWidth;
	            if (maxBeyondY <= -this.translateY && maxBeyondY > 0 && axis === "y") {
	                this.translateY = -maxBeyondY;
	            } else if (maxBeyondX <= -this.translateX && maxBeyondX > 0 && axis === "x") {
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

/***/ 377:
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

/***/ 563:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)["default"];

	var _sharedChunkPolymerAppJsx = __webpack_require__(564);

	var _sharedChunkPolymerAppJsx2 = _interopRequireDefault(_sharedChunkPolymerAppJsx);

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(218);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function bootstrap() {
	    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
	    _reactDom2["default"].render(_react2["default"].createElement(_sharedChunkPolymerAppJsx2["default"], { initialState: initialState }), document.getElementById('polymer'));
	}

	if (typeof window.addEventListener) {
	    window.addEventListener("DOMContentLoaded", bootstrap);
	} else {
	    window.attachEvent('onload', bootstrap);
	}

/***/ },

/***/ 564:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	var _interopRequireWildcard = __webpack_require__(347)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(190);

	var _reducerEs6 = __webpack_require__(565);

	var _reducerEs62 = _interopRequireDefault(_reducerEs6);

	var _libReduxHelperEs6 = __webpack_require__(208);

	var _libReduxHelperEs62 = _interopRequireDefault(_libReduxHelperEs6);

	var _componentJsx = __webpack_require__(567);

	var _componentJsx2 = _interopRequireDefault(_componentJsx);

	var _actionEs6 = __webpack_require__(575);

	var actions = _interopRequireWildcard(_actionEs6);

	var PolymerConnected = (0, _reactRedux.connect)(function (state) {
	    return state;
	})((0, _libReduxHelperEs6.wrapComponentWithActions)(_componentJsx2["default"], actions));

	function configureStore(initialState) {
	    var store = (0, _libReduxHelperEs62["default"])(_reducerEs62["default"], initialState);
	    if (false) {
	        module.hot.accept('./reducer.es6', function () {
	            var nextRootReducer = require('./reducer.es6');
	            store.replaceReducer(nextRootReducer);
	        });
	    }
	    return store;
	}

	var CategoryApp = (function (_React$Component) {
	    _inherits(CategoryApp, _React$Component);

	    function CategoryApp() {
	        _classCallCheck(this, CategoryApp);

	        _get(Object.getPrototypeOf(CategoryApp.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(CategoryApp, [{
	        key: "render",
	        value: function render() {
	            var categories = this.props.initialState.categories;

	            var store = configureStore({
	                allCategory: {
	                    categories: categories
	                }
	            });
	            return _react2["default"].createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2["default"].createElement(PolymerConnected, null)
	            );
	        }
	    }]);

	    return CategoryApp;
	})(_react2["default"].Component);

	exports["default"] = CategoryApp;
	module.exports = exports["default"];

/***/ },

/***/ 565:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = __webpack_require__(209)["default"];

	var _Object$assign = __webpack_require__(210)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(197);

	var _constantsEs6 = __webpack_require__(566);

	function allCategory(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        default:
	            return state;
	    }
	}

	function categoryBrands(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _constantsEs6.REQUEST_CATEGORYBRANDS:
	            return _Object$assign({}, state, {
	                categoryBrandsFetched: false,
	                categoryBrandsFetching: true
	            });
	        case _constantsEs6.RESPONSE_CATEGORYBRANDS:
	            var categorybrands = action.res.result;
	            var categoryBrandsFetched = action.res.categoryBrandsFetched;
	            return _Object$assign({}, state, _extends({}, categorybrands, {
	                categoryBrandsFetched: categoryBrandsFetched,
	                categoryBrandsFetching: false
	            }));
	        default:
	            return state;
	    }
	}

	function allBrand(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _constantsEs6.REQUEST_ALLBRANDS:
	            return _Object$assign({}, state, {
	                brandsFetched: false,
	                brandsFetching: true
	            });
	        case _constantsEs6.RESPONSE_ALLBRANDS:
	            var brands = action.res.result;
	            var brandsFetched = action.res.brandsFetched;
	            return _Object$assign({}, state, {
	                brands: brands,
	                brandsFetched: brandsFetched,
	                brandsFetching: false
	            });
	        default:
	            return state;
	    }
	}

	function allOrigin(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _constantsEs6.REQUEST_ALLORIGINS:
	            return _Object$assign({}, state, {
	                originFetched: false,
	                originFetching: true
	            });
	        case _constantsEs6.RESPONSE_ALLORIGINS:
	            var origins = action.res.result;
	            var originFetched = action.res.originFetched;
	            return _Object$assign({}, state, {
	                origins: origins,
	                originFetched: originFetched,
	                originFetching: false
	            });
	        default:
	            return state;
	    }
	}

	function search(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _constantsEs6.REQUEST_HOTWORD:
	            return _Object$assign({}, state, {
	                hotwordFetched: false,
	                hotwordFetching: true
	            });
	        case _constantsEs6.RESPONSE_HOTWORD:
	            var hotwords = action.res.result;
	            var hotwordFetched = action.res.hotwordFetched;
	            return _Object$assign({}, state, {
	                hotwords: hotwords,
	                hotwordFetched: hotwordFetched,
	                hotwordFetching: false
	            });
	        default:
	            return state;
	    }
	}

	var rootReducer = (0, _redux.combineReducers)({
	    search: search,
	    allCategory: allCategory,
	    categoryBrands: categoryBrands,
	    allBrand: allBrand,
	    allOrigin: allOrigin
	});

	exports["default"] = rootReducer;
	module.exports = exports["default"];

/***/ },

/***/ 566:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var REQUEST_CATEGORYBRANDS = "REQUEST_CATEGORYBRANDS";
	exports.REQUEST_CATEGORYBRANDS = REQUEST_CATEGORYBRANDS;
	var RESPONSE_CATEGORYBRANDS = "RESPONSE_CATEGORYBRANDS";
	exports.RESPONSE_CATEGORYBRANDS = RESPONSE_CATEGORYBRANDS;
	var REQUEST_ALLBRANDS = "REQUEST_ALLBRANDS";
	exports.REQUEST_ALLBRANDS = REQUEST_ALLBRANDS;
	var RESPONSE_ALLBRANDS = "RESPONSE_ALLBRANDS";
	exports.RESPONSE_ALLBRANDS = RESPONSE_ALLBRANDS;
	var REQUEST_ALLORIGINS = "REQUEST_ALLORIGINS";
	exports.REQUEST_ALLORIGINS = REQUEST_ALLORIGINS;
	var RESPONSE_ALLORIGINS = "RESPONSE_ALLORIGINS";

	exports.RESPONSE_ALLORIGINS = RESPONSE_ALLORIGINS;
	var REQUEST_HOTWORD = "REQUEST_HOTWORD";
	exports.REQUEST_HOTWORD = REQUEST_HOTWORD;
	var RESPONSE_HOTWORD = "RESPONSE_HOTWORD";
	exports.RESPONSE_HOTWORD = RESPONSE_HOTWORD;

/***/ },

/***/ 567:
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

	var _partialPolymerJsx = __webpack_require__(568);

	var _partialPolymerJsx2 = _interopRequireDefault(_partialPolymerJsx);

	var _partialAllbrandsJsx = __webpack_require__(572);

	var _partialAllbrandsJsx2 = _interopRequireDefault(_partialAllbrandsJsx);

	var _partialSearchJsx = __webpack_require__(574);

	var _partialSearchJsx2 = _interopRequireDefault(_partialSearchJsx);

	var _director = __webpack_require__(317);

	var _commonSwitcherJsx = __webpack_require__(319);

	var PolymerRouter = (function (_Component) {
	    _inherits(PolymerRouter, _Component);

	    function PolymerRouter(props) {
	        _classCallCheck(this, PolymerRouter);

	        _get(Object.getPrototypeOf(PolymerRouter.prototype), "constructor", this).call(this, props);
	        this.state = {
	            currentRoute: null,
	            prevRoute: null
	        };
	    }

	    _createClass(PolymerRouter, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var _this = this;

	            (0, _director.Router)({
	                "/allbrands": function allbrands() {
	                    _this.setState({
	                        currentRoute: "allbrands",
	                        prevRoute: _this.state.currentRoute
	                    });
	                },
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
	                    _react2["default"].createElement(_partialPolymerJsx2["default"], this.props)
	                ),
	                _react2["default"].createElement(
	                    _commonSwitcherJsx.SwitcherCase,
	                    { name: "allbrands" },
	                    _react2["default"].createElement(_partialAllbrandsJsx2["default"], this.props)
	                ),
	                _react2["default"].createElement(
	                    _commonSwitcherJsx.SwitcherCase,
	                    { name: "search" },
	                    _react2["default"].createElement(_partialSearchJsx2["default"], this.props)
	                )
	            );
	        }
	    }]);

	    return PolymerRouter;
	})(_react.Component);

	exports["default"] = PolymerRouter;
	module.exports = exports["default"];

/***/ },

/***/ 568:
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

	var _lodash = __webpack_require__(231);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _commonHeaderJsx = __webpack_require__(217);

	var _commonHeaderJsx2 = _interopRequireDefault(_commonHeaderJsx);

	var _commonFooterJsx = __webpack_require__(251);

	var _commonFooterJsx2 = _interopRequireDefault(_commonFooterJsx);

	var _componentIconJsx = __webpack_require__(240);

	var _componentIconJsx2 = _interopRequireDefault(_componentIconJsx);

	var _classnames = __webpack_require__(234);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _componentSlidetabsJsx = __webpack_require__(375);

	var _categoryJsx = __webpack_require__(569);

	var _categoryJsx2 = _interopRequireDefault(_categoryJsx);

	var _brandJsx = __webpack_require__(570);

	var _brandJsx2 = _interopRequireDefault(_brandJsx);

	var _originJsx = __webpack_require__(571);

	var _originJsx2 = _interopRequireDefault(_originJsx);

	var Polymer = (function (_Component) {
	    _inherits(Polymer, _Component);

	    function Polymer() {
	        _classCallCheck(this, Polymer);

	        _get(Object.getPrototypeOf(Polymer.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Polymer, [{
	        key: "handleSelect",
	        value: function handleSelect(i) {
	            var _props = this.props;
	            var fetchCategoryBrands = _props.fetchCategoryBrands;
	            var categoryBrands = _props.categoryBrands;
	            var fetchAllOrigins = _props.fetchAllOrigins;
	            var allOrigin = _props.allOrigin;

	            if (i === 1 && _lodash2["default"].isEmpty(categoryBrands)) {
	                fetchCategoryBrands();
	            }
	            if (i === 2 && _lodash2["default"].isEmpty(allOrigin)) {
	                fetchAllOrigins();
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "div",
	                { className: "polymer-content" },
	                _react2["default"].createElement(
	                    _commonHeaderJsx2["default"],
	                    null,
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "logo" },
	                        _react2["default"].createElement("img", { src: "/client/asset/images/indexlogo.png" })
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "btn-right" },
	                        _react2["default"].createElement(
	                            "a",
	                            { href: "#/search" },
	                            _react2["default"].createElement(_componentIconJsx2["default"], { icon: "search" })
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "polymer-list" },
	                    _react2["default"].createElement(
	                        _componentSlidetabsJsx.SlideTabs,
	                        { navbarSlidable: false, onSelect: this.handleSelect.bind(this) },
	                        _react2["default"].createElement(
	                            _componentSlidetabsJsx.SlideTabsItem,
	                            { navigator: function () {
	                                    return _react2["default"].createElement(
	                                        "i",
	                                        null,
	                                        "类别"
	                                    );
	                                } },
	                            _react2["default"].createElement(_categoryJsx2["default"], this.props.allCategory)
	                        ),
	                        _react2["default"].createElement(
	                            _componentSlidetabsJsx.SlideTabsItem,
	                            { navigator: function () {
	                                    return _react2["default"].createElement(
	                                        "i",
	                                        null,
	                                        "品牌"
	                                    );
	                                } },
	                            _react2["default"].createElement(_brandJsx2["default"], this.props)
	                        ),
	                        _react2["default"].createElement(
	                            _componentSlidetabsJsx.SlideTabsItem,
	                            { navigator: function () {
	                                    return _react2["default"].createElement(
	                                        "i",
	                                        null,
	                                        "产地"
	                                    );
	                                } },
	                            _react2["default"].createElement(_originJsx2["default"], this.props)
	                        )
	                    )
	                ),
	                _react2["default"].createElement(_commonFooterJsx2["default"], { activeIndex: "1" })
	            );
	        }
	    }]);

	    return Polymer;
	})(_react.Component);

	exports["default"] = Polymer;
	module.exports = exports["default"];

/***/ },

/***/ 569:
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

	var _componentSlidetabsJsx = __webpack_require__(375);

	var Category = (function (_Component) {
	    _inherits(Category, _Component);

	    function Category(props) {
	        _classCallCheck(this, Category);

	        _get(Object.getPrototypeOf(Category.prototype), "constructor", this).call(this, props);
	    }

	    _createClass(Category, [{
	        key: "renderCategory",
	        value: function renderCategory(category) {
	            var children = category.children.map(function (child, i) {
	                return _react2["default"].createElement(
	                    "a",
	                    { href: "/", className: "cg", key: i },
	                    _react2["default"].createElement("img", { src: "/client/asset/images/965_G_1445533723842.gif" }),
	                    _react2["default"].createElement(
	                        "div",
	                        null,
	                        child.fullName
	                    )
	                );
	            });
	            return _react2["default"].createElement(
	                "div",
	                { className: "rightCon" },
	                _react2["default"].createElement(
	                    "a",
	                    { href: "#", className: "ad" },
	                    _react2["default"].createElement("img", { src: "/client/asset/images/pic24.gif" })
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "content" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "title" },
	                        "热门分类"
	                    ),
	                    children
	                )
	            );
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this = this;

	            var categories = this.props.categories;

	            var tabs = categories.map(function (category, i) {
	                return _react2["default"].createElement(
	                    _componentSlidetabsJsx.SlideTabsItem,
	                    { navigator: function () {
	                            return _react2["default"].createElement(
	                                "span",
	                                null,
	                                category.name
	                            );
	                        }, key: i },
	                    _this.renderCategory(category)
	                );
	            });
	            return _react2["default"].createElement(
	                "div",
	                { className: "category-list" },
	                _react2["default"].createElement(
	                    _componentSlidetabsJsx.SlideTabs,
	                    { axis: "y", contentSlidable: false },
	                    tabs
	                )
	            );
	        }
	    }]);

	    return Category;
	})(_react.Component);

	exports["default"] = Category;
	module.exports = exports["default"];

/***/ },

/***/ 570:
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

	var Brand = (function (_Component) {
	    _inherits(Brand, _Component);

	    function Brand(props) {
	        _classCallCheck(this, Brand);

	        _get(Object.getPrototypeOf(Brand.prototype), "constructor", this).call(this, props);
	    }

	    _createClass(Brand, [{
	        key: "renderRecommendBrands",
	        value: function renderRecommendBrands() {
	            var recommendBrands = this.props.categoryBrands.recommendBrands;

	            if (recommendBrands) {
	                return recommendBrands.map(function (brand, i) {
	                    return _react2["default"].createElement(
	                        "a",
	                        { href: "#", key: i },
	                        _react2["default"].createElement(
	                            "div",
	                            null,
	                            _react2["default"].createElement("img", { src: brand.imageUrl })
	                        )
	                    );
	                });
	            }
	            return null;
	        }
	    }, {
	        key: "renderCategory",
	        value: function renderCategory() {
	            var categories = this.props.categoryBrands.categories;

	            if (categories) {
	                return categories.map(function (category, i) {
	                    var brands = category.brands.map(function (brand, k) {
	                        return _react2["default"].createElement(
	                            "a",
	                            { href: "#", key: k },
	                            _react2["default"].createElement(
	                                "div",
	                                null,
	                                _react2["default"].createElement("img", { src: brand.imageUrl })
	                            )
	                        );
	                    });
	                    if (brands) {
	                        return _react2["default"].createElement(
	                            "div",
	                            { className: "category-brands", key: i },
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "title" },
	                                category.name
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "brandList clearfix" },
	                                brands
	                            )
	                        );
	                    }
	                    return null;
	                });
	            }
	            return null;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "div",
	                { className: "poly_2" },
	                _react2["default"].createElement(
	                    "a",
	                    { href: "#/allbrands", className: "allBrand" },
	                    "全部品牌",
	                    _react2["default"].createElement("i", { className: "iconfont icon-right" })
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "title" },
	                    "推荐品牌"
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "brandList clearfix" },
	                    this.renderRecommendBrands()
	                ),
	                this.renderCategory()
	            );
	        }
	    }]);

	    return Brand;
	})(_react.Component);

	exports["default"] = Brand;
	module.exports = exports["default"];

/***/ },

/***/ 571:
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

	var Origin = (function (_Component) {
	    _inherits(Origin, _Component);

	    function Origin(props) {
	        _classCallCheck(this, Origin);

	        _get(Object.getPrototypeOf(Origin.prototype), "constructor", this).call(this, props);
	    }

	    _createClass(Origin, [{
	        key: "renderOrigin",
	        value: function renderOrigin() {
	            var origins = this.props.allOrigin.origins;

	            if (origins) {
	                return origins.map(function (origin, i) {
	                    return _react2["default"].createElement(
	                        "a",
	                        { href: "#", key: i },
	                        _react2["default"].createElement("img", { src: origin.backgroundImageUrl })
	                    );
	                });
	            }
	            return null;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "div",
	                null,
	                _react2["default"].createElement(
	                    "div",
	                    { className: "kindArea" },
	                    this.renderOrigin()
	                )
	            );
	        }
	    }]);

	    return Origin;
	})(_react.Component);

	exports["default"] = Origin;
	module.exports = exports["default"];

/***/ },

/***/ 572:
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

	var _commonHeaderJsx = __webpack_require__(217);

	var _commonHeaderJsx2 = _interopRequireDefault(_commonHeaderJsx);

	var _componentScrollnavJsx = __webpack_require__(573);

	var _componentScrollnavJsx2 = _interopRequireDefault(_componentScrollnavJsx);

	var _lodash = __webpack_require__(231);

	var _lodash2 = _interopRequireDefault(_lodash);

	var AllBrands = (function (_Component) {
	    _inherits(AllBrands, _Component);

	    function AllBrands(props) {
	        _classCallCheck(this, AllBrands);

	        _get(Object.getPrototypeOf(AllBrands.prototype), "constructor", this).call(this, props);
	    }

	    _createClass(AllBrands, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var fetchAllBrands = this.props.fetchAllBrands;

	            fetchAllBrands();
	        }
	    }, {
	        key: "renderBrand",
	        value: function renderBrand() {
	            var brands = this.props.allBrand.brands;

	            if (brands) {
	                var brandGroup = [];
	                for (var key in brands) {
	                    var brandGroupItems = brands[key].map(function (brand, i) {
	                        return _react2["default"].createElement(
	                            "li",
	                            { key: i },
	                            brand
	                        );
	                    });
	                    brandGroup.push(_react2["default"].createElement(
	                        "div",
	                        { className: "anchor-point", "data-anchor": "anchor-a", key: key },
	                        _react2["default"].createElement(
	                            "h5",
	                            null,
	                            key
	                        ),
	                        _react2["default"].createElement(
	                            "ul",
	                            null,
	                            brandGroupItems
	                        )
	                    ));
	                }
	                return brandGroup;
	            }
	            return null;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var brands = this.props.allBrand.brands;

	            var navbarRenderer = function navbarRenderer() {
	                var shortcuts = _lodash2["default"].keys(brands);
	                return shortcuts.map(function (v) {
	                    return _react2["default"].createElement(
	                        "span",
	                        null,
	                        v
	                    );
	                });
	            };
	            return _react2["default"].createElement(
	                "div",
	                { className: "all-brands" },
	                _react2["default"].createElement(
	                    _commonHeaderJsx2["default"],
	                    null,
	                    "全部品牌"
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "all-brands-inner" },
	                    _react2["default"].createElement(
	                        _componentScrollnavJsx2["default"],
	                        { className: "all-brands-list", navbarRenderer: navbarRenderer },
	                        this.renderBrand()
	                    )
	                )
	            );
	        }
	    }]);

	    return AllBrands;
	})(_react.Component);

	exports["default"] = AllBrands;
	module.exports = exports["default"];

/***/ },

/***/ 573:
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

	var _classnames = __webpack_require__(234);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _libDomEs6 = __webpack_require__(238);

	var _libDomEs62 = _interopRequireDefault(_libDomEs6);

	var ScrollNav = _react2["default"].createClass({
	    displayName: "ScrollNav",

	    getInitialState: function getInitialState() {
	        return {
	            activeIndex: 0
	        };
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            delay: 100,
	            diffInViewport: 0,
	            navbarRenderer: function navbarRenderer() {}
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        this.checkVisible();
	        _libDomEs62["default"].bindEvent(_reactDom2["default"].findDOMNode(this.refs["content"]), "scroll", this.checkVisible);
	        // dom.unbindEvent(ReactDOM.findDOMNode(this.refs["content"]),"scroll",this.handleScroll)
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        if (this._timer) {
	            clearTimeout(this._timer);
	        }
	    },
	    checkVisible: function checkVisible(e) {
	        var _this = this;

	        console.log('checkVisible');
	        var diffInViewport = this.props.diffInViewport;

	        var activeIndex = [];
	        var containerNode = _reactDom2["default"].findDOMNode(this.refs["content"]);
	        for (var i = 0; i < containerNode.children.length; i++) {
	            var childNode = containerNode.children[i];
	            if (_libDomEs62["default"].inViewport(childNode, containerNode, diffInViewport) === true) {
	                activeIndex.push(i);
	            }
	        }
	        this._timer = setTimeout(function () {
	            _this.setState({
	                activeIndex: activeIndex[0]
	            });
	        }, this.props.delay);
	    },
	    jumpTo: function jumpTo(index, e) {
	        var _this2 = this;

	        _libDomEs62["default"].unbindEvent(_reactDom2["default"].findDOMNode(this.refs["content"]), "scroll", this.checkVisible);
	        var containerNode = _reactDom2["default"].findDOMNode(this.refs["content"]);
	        var checkNode = containerNode.children[index];

	        _libDomEs62["default"].scrollInView(checkNode, containerNode, function () {
	            _libDomEs62["default"].bindEvent(_reactDom2["default"].findDOMNode(_this2.refs["content"]), "scroll", _this2.checkVisible);
	        });
	        this._timer = setTimeout(function () {
	            _this2.setState({
	                activeIndex: index
	            });
	        }, this.props.delay);
	    },
	    renderNavbar: function renderNavbar() {
	        var _this3 = this;

	        var navbarRenderer = this.props.navbarRenderer;
	        var activeIndex = this.state.activeIndex;

	        var navbarItems = navbarRenderer.call(this);
	        return navbarItems.map(function (navbarItem, i) {
	            return _react2["default"].createElement(
	                ScrollNavbarAnchor,
	                { key: i,
	                    jumpTo: _this3.jumpTo.bind(_this3, i),
	                    active: i === activeIndex
	                },
	                navbarItem
	            );
	        });
	    },
	    render: function render() {
	        var classes = (0, _classnames2["default"])(this.props.className, "scroll-nav-content");
	        return _react2["default"].createElement(
	            "div",
	            { className: "scroll-nav" },
	            _react2["default"].createElement(
	                "div",
	                { className: "scroll-navbar" },
	                this.renderNavbar()
	            ),
	            _react2["default"].createElement(
	                "div",
	                { className: classes, ref: "content"
	                },
	                this.props.children
	            )
	        );
	    }
	});

	var ScrollNavbarAnchor = (function (_Component) {
	    _inherits(ScrollNavbarAnchor, _Component);

	    function ScrollNavbarAnchor() {
	        _classCallCheck(this, ScrollNavbarAnchor);

	        _get(Object.getPrototypeOf(ScrollNavbarAnchor.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(ScrollNavbarAnchor, [{
	        key: "render",
	        value: function render() {
	            var classes = (0, _classnames2["default"])("scroll-navbar-anchor", {
	                "active": this.props.active
	            });
	            return _react2["default"].createElement(
	                "div",
	                { className: classes, onClick: this.props.jumpTo },
	                this.props.children
	            );
	        }
	    }]);

	    return ScrollNavbarAnchor;
	})(_react.Component);

	exports["default"] = ScrollNav;
	module.exports = exports["default"];

/***/ },

/***/ 574:
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

	var _actionEs6 = __webpack_require__(575);

	var SearchBox = (function (_Component) {
	    _inherits(SearchBox, _Component);

	    function SearchBox(props) {
	        _classCallCheck(this, SearchBox);

	        _get(Object.getPrototypeOf(SearchBox.prototype), "constructor", this).call(this, props);
	    }

	    _createClass(SearchBox, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var dispatch = this.props.dispatch;

	            dispatch((0, _actionEs6.fetchHotWord)());
	        }
	    }, {
	        key: "renderHotWord",
	        value: function renderHotWord() {
	            var hotwords = this.props.search.hotwords;

	            if (hotwords) {
	                return hotwords.map(function (hotword, i) {
	                    return _react2["default"].createElement(
	                        "a",
	                        { href: "/goodlist/1", key: i },
	                        hotword.name
	                    );
	                });
	            }
	            return null;
	        }
	    }, {
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
	                        this.renderHotWord()
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

/***/ 575:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.fetchCategoryBrands = fetchCategoryBrands;
	exports.fetchAllBrands = fetchAllBrands;
	exports.fetchAllOrigins = fetchAllOrigins;
	exports.fetchHotWord = fetchHotWord;

	var _libUtilEs6 = __webpack_require__(227);

	var _constantsEs6 = __webpack_require__(566);

	function responseCategoryBrands(param, res) {
	    return {
	        type: _constantsEs6.RESPONSE_CATEGORYBRANDS,
	        param: param,
	        res: res
	    };
	}

	function requestCategoryBrands(param) {
	    return {
	        type: _constantsEs6.REQUEST_CATEGORYBRANDS,
	        param: param
	    };
	}

	function fetchCategoryBrands(param) {
	    return function (dispath) {
	        dispath(requestCategoryBrands(param));
	        return (0, _libUtilEs6.apiRequest)("/categorybrands", param).then(function (res) {
	            dispath(responseCategoryBrands(param, res));
	        });
	    };
	}

	function responseAllBrands(param, res) {
	    return {
	        type: _constantsEs6.RESPONSE_ALLBRANDS,
	        param: param,
	        res: res
	    };
	}

	function requestAllBrands(param) {
	    return {
	        type: _constantsEs6.REQUEST_ALLBRANDS,
	        param: param
	    };
	}

	function fetchAllBrands(param) {
	    return function (dispath) {
	        dispath(requestAllBrands(param));
	        return (0, _libUtilEs6.apiRequest)("/allbrands", param).then(function (res) {
	            dispath(responseAllBrands(param, res));
	        });
	    };
	}

	function responseAllOrigins(param, res) {
	    return {
	        type: _constantsEs6.RESPONSE_ALLORIGINS,
	        param: param,
	        res: res
	    };
	}

	function requestAllOrigins(param) {
	    return {
	        type: _constantsEs6.REQUEST_ALLORIGINS,
	        param: param
	    };
	}

	function fetchAllOrigins(param) {
	    return function (dispath) {
	        dispath(requestAllOrigins(param));
	        return (0, _libUtilEs6.apiRequest)("/allorigins", param).then(function (res) {
	            dispath(responseAllOrigins(param, res));
	        });
	    };
	}

	function requestHotWord(param) {
	    return {
	        type: _constantsEs6.REQUEST_HOTWORD,
	        param: param
	    };
	}

	function responseHotWord(param, res) {
	    return {
	        type: _constantsEs6.RESPONSE_HOTWORD,
	        param: param,
	        res: res
	    };
	}

	function fetchHotWord(param) {
	    return function (dispatch) {
	        dispatch(requestHotWord(param));
	        (0, _libUtilEs6.apiRequest)("/searchhotwords", param).then(function (res) {
	            dispatch(responseHotWord(param, res));
	        });
	    };
	}

/***/ },

/***/ 576:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});