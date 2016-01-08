webpackJsonp([24],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(601);
	module.exports = __webpack_require__(607);


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

/***/ 235:
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

	var Refresher = (function (_React$Component) {
	    _inherits(Refresher, _React$Component);

	    function Refresher() {
	        _classCallCheck(this, Refresher);

	        _get(Object.getPrototypeOf(Refresher.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Refresher, [{
	        key: "render",
	        value: function render() {
	            var classes = (0, _classnames2["default"])({
	                "refresher": true,
	                "refresher-active": this.props.active
	            });
	            return _react2["default"].createElement(
	                "div",
	                { className: classes },
	                _react2["default"].createElement("span", { className: "iconfont icon-loading animate-spin" }),
	                "正在加载"
	            );
	        }
	    }]);

	    return Refresher;
	})(_react2["default"].Component);

	exports["default"] = Refresher;
	module.exports = exports["default"];

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
	        value: function componentWillUnmount() {
	            // noBounceScroll.disable()
	        }
	    }, {
	        key: "shouldComponentUpdate",
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            console.log(nextProps, this.props);
	            if (nextState.activeIndex !== this.state.activeIndex || nextProps.activeIndex !== this.props.activeIndex) {
	                return true;
	            }
	            return false;
	        }
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

/***/ 601:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)["default"];

	var _sharedChunkTrendyAppJsx = __webpack_require__(602);

	var _sharedChunkTrendyAppJsx2 = _interopRequireDefault(_sharedChunkTrendyAppJsx);

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(218);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function bootstrap() {
	    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
	    _reactDom2["default"].render(_react2["default"].createElement(_sharedChunkTrendyAppJsx2["default"], { initialState: initialState }), document.getElementById('trendy-container'));
	}

	if (typeof window.addEventListener) {
	    window.addEventListener("DOMContentLoaded", bootstrap);
	} else {
	    window.attachEvent('onload', bootstrap);
	}

/***/ },

/***/ 602:
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

	var _reactRedux = __webpack_require__(190);

	var _reducerEs6 = __webpack_require__(603);

	var _reducerEs62 = _interopRequireDefault(_reducerEs6);

	var _redux = __webpack_require__(197);

	var _libReduxHelperEs6 = __webpack_require__(208);

	var _libReduxHelperEs62 = _interopRequireDefault(_libReduxHelperEs6);

	var _componentJsx = __webpack_require__(605);

	var _componentJsx2 = _interopRequireDefault(_componentJsx);

	function selector(state) {
	    var _state$goodsByParam = state.goodsByParam;
	    var titles = _state$goodsByParam.titles;
	    var list = _state$goodsByParam.list;
	    var isFetching = _state$goodsByParam.isFetching;

	    return {
	        isFetching: isFetching,
	        list: list,
	        titles: titles
	    };
	}

	var TrendyConnected = (0, _reactRedux.connect)(selector)(_componentJsx2["default"]);

	function configureStore(initialState) {
	    var store = (0, _libReduxHelperEs62["default"])(_reducerEs62["default"], initialState);
	    return store;
	}

	var TrendyApp = (function (_Component) {
	    _inherits(TrendyApp, _Component);

	    function TrendyApp() {
	        _classCallCheck(this, TrendyApp);

	        _get(Object.getPrototypeOf(TrendyApp.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(TrendyApp, [{
	        key: "render",
	        value: function render() {
	            var _props$initialState = this.props.initialState;
	            var titles = _props$initialState.titles;
	            var list = _props$initialState.list;

	            var initialState = {
	                goodsByParam: {
	                    isFetching: false,
	                    list: list,
	                    titles: titles
	                }
	            };
	            var store = configureStore(initialState);
	            return _react2["default"].createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2["default"].createElement(TrendyConnected, null)
	            );
	        }
	    }]);

	    return TrendyApp;
	})(_react.Component);

	exports["default"] = TrendyApp;
	module.exports = exports["default"];

/***/ },

/***/ 603:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(210)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _actionEs6 = __webpack_require__(604);

	var _redux = __webpack_require__(197);

	var _lodash = __webpack_require__(231);

	var _lodash2 = _interopRequireDefault(_lodash);

	function goodsByParam(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _actionEs6.REQUEST_GOODS:
	            return _Object$assign({}, state, {
	                isFetching: true
	            });
	        case _actionEs6.RECEIVE_GOODS:
	            var list = state.list;
	            var index = action.param.index;

	            list[index] = action.res;
	            return _Object$assign({}, state, {
	                isFetching: false,
	                list: list
	            });
	        default:
	            return state;
	    }
	}

	var rootReducer = (0, _redux.combineReducers)({
	    goodsByParam: goodsByParam
	});

	exports["default"] = rootReducer;
	module.exports = exports["default"];

/***/ },

/***/ 604:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = fetchGoods;

	var _libUtilEs6 = __webpack_require__(227);

	var RECEIVE_GOODS = "RECEIVE_GOODS";
	exports.RECEIVE_GOODS = RECEIVE_GOODS;
	var REQUEST_GOODS = "REQUEST_GOODS";

	exports.REQUEST_GOODS = REQUEST_GOODS;
	function receiveGoods(param, res) {
	    return {
	        type: RECEIVE_GOODS,
	        param: param,
	        res: res
	    };
	}

	function requestGoods(param) {
	    return {
	        type: REQUEST_GOODS,
	        param: param
	    };
	}

	function fetchGoods(url, param) {
	    return function (dispath) {
	        dispath(requestGoods(param));
	        return (0, _libUtilEs6.apiRequest)(url, param, { method: "POST" }).then(function (res) {
	            dispath(receiveGoods(param, res));
	        });
	    };
	}

/***/ },

/***/ 605:
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

	var _libUtilEs6 = __webpack_require__(227);

	var _libUtilEs62 = _interopRequireDefault(_libUtilEs6);

	var _actionEs6 = __webpack_require__(604);

	var _actionEs62 = _interopRequireDefault(_actionEs6);

	var _componentSlidetabsJsx = __webpack_require__(375);

	var _componentRefresherJsx = __webpack_require__(235);

	var _componentRefresherJsx2 = _interopRequireDefault(_componentRefresherJsx);

	var _componentIconJsx = __webpack_require__(240);

	var _componentIconJsx2 = _interopRequireDefault(_componentIconJsx);

	var _partialGoodItemJsx = __webpack_require__(606);

	var _partialGoodItemJsx2 = _interopRequireDefault(_partialGoodItemJsx);

	var _commonHeaderJsx = __webpack_require__(217);

	var _commonHeaderJsx2 = _interopRequireDefault(_commonHeaderJsx);

	var _commonFooterJsx = __webpack_require__(251);

	var _commonFooterJsx2 = _interopRequireDefault(_commonFooterJsx);

	var Trendy = (function (_React$Component) {
	    _inherits(Trendy, _React$Component);

	    function Trendy() {
	        _classCallCheck(this, Trendy);

	        _get(Object.getPrototypeOf(Trendy.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Trendy, [{
	        key: "handleSearch",
	        value: function handleSearch() {
	            location.href = "/search";
	        }
	    }, {
	        key: "handleClick",
	        value: function handleClick(index) {
	            var _props = this.props;
	            var titles = _props.titles;
	            var list = _props.list;
	            var dispatch = _props.dispatch;

	            if (list[index].length) {
	                return false;
	            }

	            dispatch((0, _actionEs62["default"])('/trendyActivity', {
	                id: titles[index].id,
	                pageIndex: 1,
	                index: index
	            }));
	        }
	    }, {
	        key: "renderContent",
	        value: function renderContent(list) {
	            var goods = [];

	            list.forEach(function (item, i) {
	                goods.push(_react2["default"].createElement(_partialGoodItemJsx2["default"], { goods: item, key: "good-" + i }));
	            });

	            return _react2["default"].createElement(
	                "div",
	                { className: "activityGeneral" },
	                goods
	            );
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this = this;

	            var _props2 = this.props;
	            var titles = _props2.titles;
	            var list = _props2.list;

	            var tabs = titles.map(function (item, i) {
	                return _react2["default"].createElement(
	                    _componentSlidetabsJsx.SlideTabsItem,
	                    { navigator: function () {
	                            return _react2["default"].createElement(
	                                "i",
	                                null,
	                                item.name
	                            );
	                        }, key: i },
	                    _this.renderContent(list[i])
	                );
	            });
	            return _react2["default"].createElement(
	                "div",
	                null,
	                _react2["default"].createElement(
	                    _commonHeaderJsx2["default"],
	                    { canBack: "false" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "logo" },
	                        _react2["default"].createElement("img", { src: "/client/asset/images/indexlogo.png" })
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "btn-right", onClick: this.handleSearch.bind(this) },
	                        _react2["default"].createElement(_componentIconJsx2["default"], { icon: "search" })
	                    )
	                ),
	                _react2["default"].createElement(
	                    _componentSlidetabsJsx.SlideTabs,
	                    { axis: "x", onSelect: this.handleClick.bind(this) },
	                    tabs
	                ),
	                _react2["default"].createElement(_componentRefresherJsx2["default"], { active: this.props.isFetching }),
	                _react2["default"].createElement(_commonFooterJsx2["default"], { activeIndex: "2" })
	            );
	        }
	    }]);

	    return Trendy;
	})(_react2["default"].Component);

	exports["default"] = Trendy;
	module.exports = exports["default"];

/***/ },

/***/ 606:
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

	var GoodItem = (function (_Component) {
	    _inherits(GoodItem, _Component);

	    function GoodItem() {
	        _classCallCheck(this, GoodItem);

	        _get(Object.getPrototypeOf(GoodItem.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(GoodItem, [{
	        key: "render",
	        value: function render() {

	            var goods = this.props.goods;

	            var statusClass = (0, _classnames2["default"])({
	                "soldOut": goods.stock
	            });

	            return _react2["default"].createElement(
	                "a",
	                { href: "#", className: "clearfix" },
	                _react2["default"].createElement("img", { src: goods.imageUrl }),
	                _react2["default"].createElement("div", { className: statusClass }),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "right" },
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "name" },
	                        goods.title
	                    ),
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "country" },
	                        _react2["default"].createElement(
	                            "i",
	                            null,
	                            _react2["default"].createElement("img", { src: goods.flag })
	                        ),
	                        goods.country
	                    ),
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "nowPrice" },
	                        "¥",
	                        goods.salePrice
	                    ),
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "oldPrice" },
	                        "¥",
	                        goods.originPrice
	                    )
	                )
	            );
	        }
	    }]);

	    return GoodItem;
	})(_react.Component);

	exports["default"] = GoodItem;
	module.exports = exports["default"];

/***/ },

/***/ 607:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});