webpackJsonp([4],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(266);
	module.exports = __webpack_require__(329);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */
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
/* 209 */
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
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(211), __esModule: true };

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(212);
	module.exports = __webpack_require__(16).Object.assign;

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(14);

	$def($def.S + $def.F, 'Object', {assign: __webpack_require__(213)});

/***/ },
/* 213 */
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
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 215 */
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
/* 216 */
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
/* 217 */
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
	                return _react2["default"].createElement("a", { href: "javascript:void(null)", onClick: handleGoBack, className: "iconfont icon-back" });
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
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */
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
/* 228 */,
/* 229 */,
/* 230 */
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
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */
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
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */
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
/* 239 */
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
/* 240 */
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
/* 241 */
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
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */
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

	var _iconJsx = __webpack_require__(240);

	var _iconJsx2 = _interopRequireDefault(_iconJsx);

	var Checkbox = (function (_Component) {
	    _inherits(Checkbox, _Component);

	    function Checkbox(props) {
	        _classCallCheck(this, Checkbox);

	        _get(Object.getPrototypeOf(Checkbox.prototype), "constructor", this).call(this, props);
	        this.state = {
	            checked: props.checked
	        };
	    }

	    _createClass(Checkbox, [{
	        key: "componentDidUpdate",
	        value: function componentDidUpdate(prevProps, prevState) {
	            if (this.state.checked === false && prevState.checked === true) {
	                _reactDom2["default"].findDOMNode(this.refs.checkInput).checked = false;
	            }
	            if (this.state.checked === true && prevState.checked === false) {
	                _reactDom2["default"].findDOMNode(this.refs.checkInput).checked = true;
	            }
	        }
	    }, {
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(nextProps) {
	            if (nextProps.checked !== this.props.checked) {
	                this.setState({
	                    checked: nextProps.checked
	                });
	            }
	        }
	    }, {
	        key: "handleChange",
	        value: function handleChange(e) {
	            var _this = this;

	            // e && e.preventDefault();
	            var onChange = this.props.onChange;

	            this.setState({
	                checked: !this.state.checked
	            }, function () {
	                onChange(_this.state.checked);
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _props = this.props;
	            var type = _props.type;
	            var name = _props.name;
	            var checked = this.state.checked;

	            var checkedIcon = "check",
	                uncheckIcon = "check-empty";
	            var checkInput = _react2["default"].createElement("input", { type: "checkbox", onChange: this.handleChange.bind(this), ref: "checkInput", defaultChecked: checked });
	            checkedIcon = this.props.checkedIcon ? this.props.checkedIcon : checkedIcon;
	            uncheckIcon = this.props.uncheckIcon ? this.props.uncheckIcon : uncheckIcon;
	            var classes = (0, _classnames2["default"])("checkbox", this.props.className);
	            return _react2["default"].createElement(
	                "div",
	                { className: classes },
	                checkInput,
	                _react2["default"].createElement(_iconJsx2["default"], { icon: checkedIcon, className: "checked" }),
	                _react2["default"].createElement(_iconJsx2["default"], { icon: uncheckIcon, className: "unchecked" })
	            );
	        }
	    }]);

	    return Checkbox;
	})(_react.Component);

	Checkbox.defaultProps = {
	    checked: false,
	    onChange: function onChange() {}
	};

	exports["default"] = Checkbox;
	module.exports = exports["default"];

/***/ },
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(210)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	var _sharedChunkConfirmorderAppJsx = __webpack_require__(267);

	var _sharedChunkConfirmorderAppJsx2 = _interopRequireDefault(_sharedChunkConfirmorderAppJsx);

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(218);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	Object.assign = _Object$assign || __webpack_require__(328);

	function bootstrap() {
	    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
	    _reactDom2["default"].render(_react2["default"].createElement(_sharedChunkConfirmorderAppJsx2["default"], { initialState: initialState }), document.getElementById('confirm-order'));
	}

	if (typeof window.addEventListener) {
	    window.addEventListener("DOMContentLoaded", bootstrap);
	} else {
	    window.attachEvent('onload', bootstrap);
	}

/***/ },
/* 267 */
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

	var _reactRedux = __webpack_require__(190);

	var _reducerEs6 = __webpack_require__(268);

	var _reducerEs62 = _interopRequireDefault(_reducerEs6);

	var _libReduxHelperEs6 = __webpack_require__(208);

	var _libReduxHelperEs62 = _interopRequireDefault(_libReduxHelperEs6);

	var _componentJsx = __webpack_require__(272);

	var _componentJsx2 = _interopRequireDefault(_componentJsx);

	function selector(state) {
	    var _state$orderByParam = state.orderByParam;
	    var order = _state$orderByParam.order;
	    var isFetched = _state$orderByParam.isFetched;
	    var isFetching = _state$orderByParam.isFetching;
	    var orderSubmited = _state$orderByParam.orderSubmited;
	    var orderSubmiting = _state$orderByParam.orderSubmiting;
	    var result = _state$orderByParam.result;
	    var errMsg = _state$orderByParam.errMsg;
	    var alertActive = _state$orderByParam.alertActive;
	    var alertContent = _state$orderByParam.alertContent;

	    return {
	        order: order,
	        orderSubmited: orderSubmited,
	        result: result,
	        orderSubmiting: orderSubmiting,
	        alertActive: alertActive,
	        alertContent: alertContent,
	        errMsg: errMsg,
	        isFetched: isFetched,
	        isFetching: isFetching
	    };
	}

	var ConfirmOrderConnected = (0, _reactRedux.connect)(selector)(_componentJsx2["default"]);

	var ConfirmOrderApp = (function (_Component) {
	    _inherits(ConfirmOrderApp, _Component);

	    function ConfirmOrderApp() {
	        _classCallCheck(this, ConfirmOrderApp);

	        _get(Object.getPrototypeOf(ConfirmOrderApp.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(ConfirmOrderApp, [{
	        key: "render",
	        value: function render() {
	            var _props$initialState = this.props.initialState;
	            var isFetched = _props$initialState.isFetched;
	            var order = _props$initialState.order;

	            var store = (0, _libReduxHelperEs62["default"])(_reducerEs62["default"], {
	                orderByParam: {
	                    isFetching: false,
	                    isFetched: isFetched,
	                    order: _Object$assign({}, order, {
	                        checkedDeliveryTime: "NOLIMIT",
	                        useTicket: false,
	                        useBalance: false,
	                        payPassword: ""
	                    })
	                }
	            });
	            return _react2["default"].createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2["default"].createElement(ConfirmOrderConnected, null)
	            );
	        }
	    }]);

	    return ConfirmOrderApp;
	})(_react.Component);

	exports["default"] = ConfirmOrderApp;
	module.exports = exports["default"];

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = __webpack_require__(209)["default"];

	var _Object$assign = __webpack_require__(210)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(197);

	var _actionEs6 = __webpack_require__(269);

	var _commonActionEs6 = __webpack_require__(270);

	var _commonReducerEs6 = __webpack_require__(271);

	function orderByParam(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _actionEs6.CHANGE_RECEIVER:
	            var order = _extends({}, state.order, { checkedReceiver: action.checkedReceiver });
	            return _Object$assign({}, state, {
	                order: order
	            });
	        case _actionEs6.CHANGE_DELIVERYTIME:
	            var order = _extends({}, state.order, { checkedDeliveryTime: action.checkedDeliveryTime });
	            return _Object$assign({}, state, {
	                order: order
	            });
	        case _actionEs6.CHANGE_COUPON:
	            var order = _extends({}, state.order, { checkedCoupon: action.checkedCoupon });
	            return _Object$assign({}, state, {
	                order: order
	            });
	        case _actionEs6.CHANGE_INVOICE:
	            var order = _extends({}, state.order, { checkedInvoice: action.checkedInvoice });
	            return _Object$assign({}, state, {
	                order: order
	            });
	        case _actionEs6.TOGGLE_TICKET:
	            var order = _extends({}, state.order, { useTicket: action.useTicket });
	            return _Object$assign({}, state, {
	                order: order
	            });
	        case _actionEs6.TOGGLE_BALANCE:
	            var order = _extends({}, state.order, { useBalance: action.useBalance });
	            return _Object$assign({}, state, {
	                order: order
	            });
	        case _actionEs6.CHANGE_PAYPASSWORD:
	            var order = _extends({}, state.order, { payPassword: action.payPassword });
	            return _Object$assign({}, state, {
	                order: order
	            });
	        case _actionEs6.VERIFY_PAYPASSWORD_REQUEST:
	            return _Object$assign({}, state, {
	                paypasswordVerifing: true
	            });
	        case _actionEs6.VERIFY_PAYPASSWORD_RESPONSE:
	            return _Object$assign({}, state, {
	                paypasswordVerified: true,
	                paypasswordVerifing: false
	            });
	        case _actionEs6.START_SUBMITORDER:
	            return _Object$assign({}, state, {
	                orderSubmiting: true,
	                orderSubmited: false
	            });
	        case _actionEs6.FINISH_SUBMITORDER:
	            return _Object$assign({}, state, _extends({}, action.res, {
	                orderSubmiting: false
	            }));
	        case _commonActionEs6.SHOW_ALERT:
	        case _commonActionEs6.HIDE_ALERT:
	            return (0, _commonReducerEs6.alertReducer)(state, action);
	        default:
	            return state;
	    }
	}

	var rootReducer = (0, _redux.combineReducers)({
	    orderByParam: orderByParam
	});

	exports["default"] = rootReducer;
	module.exports = exports["default"];

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.changeReceiver = changeReceiver;
	exports.changeDeliveryTime = changeDeliveryTime;
	exports.changeCoupon = changeCoupon;
	exports.changeInvoice = changeInvoice;
	exports.toggleBalance = toggleBalance;
	exports.toggleTicket = toggleTicket;
	exports.changePaypassword = changePaypassword;
	exports.verifyPassword = verifyPassword;
	exports.submitOrder = submitOrder;

	var _libUtilEs6 = __webpack_require__(227);

	var VERIFY_PAYPASSWORD_REQUEST = "VERIFY_PAYPASSWORD";
	exports.VERIFY_PAYPASSWORD_REQUEST = VERIFY_PAYPASSWORD_REQUEST;
	var VERIFY_PAYPASSWORD_RESPONSE = "VERIFY_PAYPASSWORD";
	exports.VERIFY_PAYPASSWORD_RESPONSE = VERIFY_PAYPASSWORD_RESPONSE;
	var START_SUBMITORDER = "START_SUBMITORDER";
	exports.START_SUBMITORDER = START_SUBMITORDER;
	var FINISH_SUBMITORDER = "FINISH_SUBMITORDER";
	exports.FINISH_SUBMITORDER = FINISH_SUBMITORDER;
	var CHANGE_RECEIVER = "CHANGE_RECEIVER";
	exports.CHANGE_RECEIVER = CHANGE_RECEIVER;
	var CHANGE_DELIVERYTIME = "CHANGE_DELIVERYTIME";
	exports.CHANGE_DELIVERYTIME = CHANGE_DELIVERYTIME;
	var CHANGE_COUPON = "CHANGE_COUPON";
	exports.CHANGE_COUPON = CHANGE_COUPON;
	var CHANGE_INVOICE = "CHANGE_INVOICE";
	exports.CHANGE_INVOICE = CHANGE_INVOICE;
	var TOGGLE_BALANCE = "TOGGLE_BALANCE";
	exports.TOGGLE_BALANCE = TOGGLE_BALANCE;
	var TOGGLE_TICKET = "TOGGLE_TICKET";
	exports.TOGGLE_TICKET = TOGGLE_TICKET;
	var CHANGE_PAYPASSWORD = "CHANGE_PAYPASSWORD";

	exports.CHANGE_PAYPASSWORD = CHANGE_PAYPASSWORD;

	function changeReceiver(checkedReceiver) {
	    return {
	        type: CHANGE_RECEIVER,
	        checkedReceiver: checkedReceiver
	    };
	}

	function changeDeliveryTime(checkedDeliveryTime) {
	    return {
	        type: CHANGE_DELIVERYTIME,
	        checkedDeliveryTime: checkedDeliveryTime
	    };
	}

	function changeCoupon(checkedCoupon) {
	    return {
	        type: CHANGE_COUPON,
	        checkedCoupon: checkedCoupon
	    };
	}

	function changeInvoice(checkedInvoice) {
	    return {
	        type: CHANGE_INVOICE,
	        checkedInvoice: checkedInvoice
	    };
	}

	function toggleBalance(useBalance) {
	    return {
	        type: TOGGLE_BALANCE,
	        useBalance: useBalance
	    };
	}

	function toggleTicket(useTicket) {
	    return {
	        type: TOGGLE_TICKET,
	        useTicket: useTicket
	    };
	}

	function changePaypassword(payPassword) {
	    return {
	        type: CHANGE_PAYPASSWORD,
	        payPassword: payPassword
	    };
	}

	function verifyPasswordRequest(param) {
	    return {
	        type: VERIFY_PAYPASSWORD_REQUEST,
	        param: param
	    };
	}

	function verifyPasswordResponse(param, res) {
	    return {
	        type: VERIFY_PAYPASSWORD_RESPONSE,
	        param: param,
	        res: res,
	        responseAt: Date.now()
	    };
	}

	function verifyPassword(url, param) {
	    return function (dispatch) {
	        dispatch(verifyPasswordRequest(param));
	        (0, _libUtilEs6.apiRequest)(url, param, {
	            type: "jsonp",
	            jsonpCallback: "jsoncallback"
	        }).then(function (res) {
	            dispatch(verifyPasswordResponse(param, res));
	        });
	    };
	}

	function startSubmitOrder(param) {
	    return {
	        type: START_SUBMITORDER,
	        param: param
	    };
	}

	function finishSubmitOrder(param, res) {
	    return {
	        type: FINISH_SUBMITORDER,
	        param: param,
	        res: res,
	        finishAt: Date.now()
	    };
	}

	function submitOrder(url, param) {
	    return function (dispatch) {
	        dispatch(startSubmitOrder(param));
	        (0, _libUtilEs6.apiRequest)(url, param, {
	            method: "POST"
	        }).then(function (res) {
	            dispatch(finishSubmitOrder(param, res));
	        });
	    };
	}

/***/ },
/* 270 */
/***/ function(module, exports) {

	'use strict';
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.alert = alert;
	var SHOW_ALERT = "SHOW_ALERT";
	exports.SHOW_ALERT = SHOW_ALERT;
	var HIDE_ALERT = "HIDE_ALERT";

	exports.HIDE_ALERT = HIDE_ALERT;
	function showAlert(content) {
	    return {
	        type: SHOW_ALERT,
	        content: content
	    };
	}

	function hideAlert(content) {
	    return {
	        type: HIDE_ALERT,
	        content: content
	    };
	}

	function alert() {
	    var content = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
	    var delay = arguments.length <= 1 || arguments[1] === undefined ? 3000 : arguments[1];

	    return function (dispatch) {
	        dispatch(showAlert(content));
	        setTimeout(function () {
	            dispatch(hideAlert(content));
	        }, delay);
	    };
	}

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(210)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.alertReducer = alertReducer;

	var _actionEs6 = __webpack_require__(270);

	function alertReducer(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _actionEs6.SHOW_ALERT:
	            return _Object$assign({}, state, {
	                alertActive: true,
	                alertContent: action.content
	            });
	        case _actionEs6.HIDE_ALERT:
	            return _Object$assign({}, state, {
	                alertActive: false,
	                alertContent: action.content
	            });
	        default:
	            return state;
	    }
	}

/***/ },
/* 272 */
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

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _partialConfirmorderJsx = __webpack_require__(273);

	var _partialConfirmorderJsx2 = _interopRequireDefault(_partialConfirmorderJsx);

	var _receiverAppJsx = __webpack_require__(287);

	var _receiverAppJsx2 = _interopRequireDefault(_receiverAppJsx);

	var _partialCouponJsx = __webpack_require__(326);

	var _partialCouponJsx2 = _interopRequireDefault(_partialCouponJsx);

	var _director = __webpack_require__(325);

	var _commonSwitcherJsx = __webpack_require__(327);

	var _actionEs6 = __webpack_require__(269);

	var ConfirmOrderRouter = (function (_Component) {
	    _inherits(ConfirmOrderRouter, _Component);

	    function ConfirmOrderRouter(props) {
	        _classCallCheck(this, ConfirmOrderRouter);

	        _get(Object.getPrototypeOf(ConfirmOrderRouter.prototype), "constructor", this).call(this, props);
	        this.state = {
	            currentRoute: null,
	            prevRoute: null
	        };
	    }

	    _createClass(ConfirmOrderRouter, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var _this = this;

	            (0, _director.Router)({
	                "/receiver": function receiver() {
	                    _this.setState({
	                        currentRoute: "receiver",
	                        prevRoute: _this.state.currentRoute
	                    });
	                },
	                "/coupon": function coupon() {
	                    _this.setState({
	                        currentRoute: "coupon",
	                        prevRoute: _this.state.currentRoute
	                    });
	                },
	                "/": function _() {
	                    _this.setState({
	                        currentRoute: "index",
	                        prevRoute: _this.state.currentRoute
	                    });
	                }
	            }).init("/");
	        }
	    }, {
	        key: "handleChangeReceiver",
	        value: function handleChangeReceiver(receiver) {
	            var dispatch = this.props.dispatch;

	            dispatch((0, _actionEs6.changeReceiver)(receiver));
	        }
	    }, {
	        key: "handleChangeCoupon",
	        value: function handleChangeCoupon(coupon) {
	            var dispatch = this.props.dispatch;

	            dispatch((0, _actionEs6.changeCoupon)(coupon));
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _state = this.state;
	            var currentRoute = _state.currentRoute;
	            var prevRoute = _state.prevRoute;

	            var receiverInitialState = {
	                receivers: this.props.order.receivers,
	                onCheck: this.handleChangeReceiver.bind(this),
	                checkedReceiver: this.props.order.checkedReceiver
	            };
	            return _react2["default"].createElement(
	                _commonSwitcherJsx.Switcher,
	                { currentRoute: currentRoute, prevRoute: prevRoute },
	                _react2["default"].createElement(
	                    _commonSwitcherJsx.SwitcherCase,
	                    { name: "index" },
	                    _react2["default"].createElement(_partialConfirmorderJsx2["default"], this.props)
	                ),
	                _react2["default"].createElement(
	                    _commonSwitcherJsx.SwitcherCase,
	                    { name: "receiver" },
	                    _react2["default"].createElement(_receiverAppJsx2["default"], _extends({ initialState: receiverInitialState }, this.props))
	                ),
	                _react2["default"].createElement(
	                    _commonSwitcherJsx.SwitcherCase,
	                    { name: "coupon" },
	                    _react2["default"].createElement(_partialCouponJsx2["default"], _extends({}, this.props.order, { onCheck: this.handleChangeCoupon.bind(this) }))
	                )
	            );
	        }
	    }]);

	    return ConfirmOrderRouter;
	})(_react.Component);

	exports["default"] = ConfirmOrderRouter;
	module.exports = exports["default"];

/***/ },
/* 273 */
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

	var _componentIconJsx = __webpack_require__(240);

	var _componentIconJsx2 = _interopRequireDefault(_componentIconJsx);

	var _componentFormCheckboxJsx = __webpack_require__(253);

	var _componentFormCheckboxJsx2 = _interopRequireDefault(_componentFormCheckboxJsx);

	var _componentSelectedSelectedJsx = __webpack_require__(274);

	var _componentSelectedSelectedJsx2 = _interopRequireDefault(_componentSelectedSelectedJsx);

	var _commonHeaderJsx = __webpack_require__(217);

	var _commonHeaderJsx2 = _interopRequireDefault(_commonHeaderJsx);

	var _ordergoodsJsx = __webpack_require__(276);

	var _ordergoodsJsx2 = _interopRequireDefault(_ordergoodsJsx);

	var _invoiceJsx = __webpack_require__(285);

	var _invoiceJsx2 = _interopRequireDefault(_invoiceJsx);

	var _commonActionEs6 = __webpack_require__(270);

	var _componentAlertJsx = __webpack_require__(286);

	var _componentAlertJsx2 = _interopRequireDefault(_componentAlertJsx);

	var _actionEs6 = __webpack_require__(269);

	var ConfirmOrder = (function (_Component) {
	    _inherits(ConfirmOrder, _Component);

	    function ConfirmOrder() {
	        _classCallCheck(this, ConfirmOrder);

	        _get(Object.getPrototypeOf(ConfirmOrder.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(ConfirmOrder, [{
	        key: "renderReceiver",
	        value: function renderReceiver(receiver) {
	            if (receiver === null) {
	                return _react2["default"].createElement(
	                    "div",
	                    { className: "order-time noReceive" },
	                    _react2["default"].createElement(
	                        "span",
	                        null,
	                        _react2["default"].createElement("i", { className: "iconfont icon-plus" }),
	                        "请添加您的收货地址"
	                    )
	                );
	            }
	            return _react2["default"].createElement(
	                "a",
	                { href: "#/receiver" },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "order-time" },
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        receiver.name,
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "mobNum" },
	                            receiver.mobileNumber
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        "433101**********1011",
	                        _react2["default"].createElement(
	                            "em",
	                            null,
	                            "实名"
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        { className: "fs12px" },
	                        receiver.provinceName + receiver.cityName + receiver.districtName + receiver.address
	                    ),
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "order-icpe" },
	                        _react2["default"].createElement("i", { className: "iconfont icon-right" })
	                    )
	                )
	            );
	        }
	    }, {
	        key: "renderTotal",
	        value: function renderTotal(order) {
	            return _react2["default"].createElement(
	                "div",
	                { className: "count-box" },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "title" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "fl title-txt" },
	                        "结算"
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "count-box-line" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "label" },
	                        "商品总价："
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "data" },
	                        " - ¥",
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            order.productFee
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "count-box-line" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "label" },
	                        "国内运费："
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "red-box" },
	                        " 包邮 "
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "data" },
	                        " - ¥",
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            order.shipFee
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "count-box-line" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "label" },
	                        "国际运费："
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "data" },
	                        " - ¥",
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            order.shipFee
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "count-box-line" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "label" },
	                        "关税："
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "red-box" },
	                        "免税"
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "data" },
	                        " - ¥",
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            order.shipFee
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "count-box-line intro" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "label" },
	                        "优惠活动："
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "data" },
	                        " - ¥",
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            order.promoAmount
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "count-box-line intro" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "label" },
	                        "优惠券："
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "data" },
	                        " - ¥ ",
	                        _react2["default"].createElement(
	                            "span",
	                            { id: "coupon_money" },
	                            order.promoAmount
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: " count-box-line no-border" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "label" },
	                        "应付金额："
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "data red-w" },
	                        "¥",
	                        _react2["default"].createElement(
	                            "span",
	                            { id: "total_amount_money" },
	                            order.totalAmount
	                        )
	                    )
	                )
	            );
	        }
	    }, {
	        key: "submitOrder",
	        value: function submitOrder() {
	            var _props = this.props;
	            var dispatch = _props.dispatch;
	            var order = _props.order;
	            var checkedCoupon = order.checkedCoupon;
	            var useBalance = order.useBalance;
	            var useTicket = order.useTicket;
	            var payPassword = order.payPassword;
	            var checkedDeliveryTime = order.checkedDeliveryTime;
	            var checkedReceiver = order.checkedReceiver;
	            var checkedInvoice = order.checkedInvoice;

	            dispatch((0, _actionEs6.submitOrder)("/submitorder", {
	                itemIds: order.itemIds,
	                buyeds: order.buyeds,
	                couponNo: checkedCoupon !== undefined ? checkedCoupon.couponNo : "",
	                ticketActive: useTicket,
	                balanceActive: useBalance,
	                payPassword: payPassword,
	                logisticTime: checkedDeliveryTime !== null ? checkedDeliveryTime : "",
	                receiverId: checkedReceiver !== null ? checkedReceiver.id : "",
	                invoiceId: checkedInvoice !== undefined ? checkedInvoice.id : ""
	            }));
	        }
	    }, {
	        key: "componentDidUpdate",
	        value: function componentDidUpdate(prevProps, prevState) {
	            var _this = this;

	            var _props2 = this.props;
	            var dispatch = _props2.dispatch;
	            var orderSubmited = _props2.orderSubmited;
	            var errMsg = _props2.errMsg;

	            if (prevProps.orderSubmiting === true && this.props.orderSubmiting === false) {
	                if (orderSubmited === true) {
	                    dispatch((0, _commonActionEs6.alert)("提交成功!", 2000));
	                    setTimeout(function () {
	                        _react2["default"].findDOMNode(_this.refs.submitForm).submit();
	                    }, 2400);
	                } else {
	                    dispatch((0, _commonActionEs6.alert)(errMsg, 2000));
	                }
	            }
	        }
	    }, {
	        key: "renderSubmitForm",
	        value: function renderSubmitForm() {
	            if (this.props.orderSubmited === true) {
	                var _props$result = this.props.result;
	                var payObject = _props$result.payObject;
	                var payUrl = _props$result.payUrl;

	                var payInputs = [];
	                for (var _name in payObject) {
	                    payInputs.push(_react2["default"].createElement("input", { type: "hidden", name: _name, value: payObject[_name] }));
	                }
	                return _react2["default"].createElement(
	                    "form",
	                    { action: payUrl, method: "POST", ref: "submitForm" },
	                    payInputs
	                );
	            }
	            return null;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _props3 = this.props;
	            var order = _props3.order;
	            var alertActive = _props3.alertActive;
	            var alertContent = _props3.alertContent;

	            return _react2["default"].createElement(
	                "div",
	                { className: "confirm-order-content" },
	                _react2["default"].createElement(
	                    _commonHeaderJsx2["default"],
	                    null,
	                    "确认订单"
	                ),
	                this.renderReceiver(order.checkedReceiver),
	                _react2["default"].createElement(_ordergoodsJsx2["default"], this.props.order),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "ckTo-box clearfix" },
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "#/coupon" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "intro" },
	                            _react2["default"].createElement(
	                                "span",
	                                null,
	                                "优惠券"
	                            ),
	                            _react2["default"].createElement(
	                                "span",
	                                null,
	                                _react2["default"].createElement(
	                                    "em",
	                                    null,
	                                    _react2["default"].createElement(
	                                        "i",
	                                        null,
	                                        "券"
	                                    ),
	                                    "新人5元券"
	                                ),
	                                _react2["default"].createElement("i", { className: "iconfont icon-right" })
	                            )
	                        )
	                    )
	                ),
	                this.renderTotal(order),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "confirmBtns" },
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "javascript:void(0);", className: "confirm_btn",
	                            onClick: this.submitOrder.bind(this) },
	                        "提交订单"
	                    ),
	                    this.renderSubmitForm()
	                ),
	                _react2["default"].createElement(
	                    _componentAlertJsx2["default"],
	                    { active: alertActive },
	                    alertContent
	                )
	            );
	        }
	    }]);

	    return ConfirmOrder;
	})(_react.Component);

	exports["default"] = ConfirmOrder;
	module.exports = exports["default"];

/***/ },
/* 274 */
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

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(234);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _dropdownJsx = __webpack_require__(275);

	var _dropdownJsx2 = _interopRequireDefault(_dropdownJsx);

	var _iconJsx = __webpack_require__(240);

	var _iconJsx2 = _interopRequireDefault(_iconJsx);

	var Selected = (function (_Component) {
	    _inherits(Selected, _Component);

	    function Selected(props) {
	        _classCallCheck(this, Selected);

	        _get(Object.getPrototypeOf(Selected.prototype), "constructor", this).call(this, props);
	        this.state = {
	            value: this.props.value,
	            filterText: null
	        };
	    }

	    _createClass(Selected, [{
	        key: "getValueArray",
	        value: function getValueArray() {
	            return this.state.value ? this.state.value.split(this.props.delimiter) : [];
	        }
	    }, {
	        key: "getValue",
	        value: function getValue() {
	            return this.state.value;
	        }
	    }, {
	        key: "hasValue",
	        value: function hasValue(value) {
	            var multiple = this.props.multiple;

	            if (multiple === true) {
	                return this.getValueArray().indexOf(value) > -1;
	            } else {
	                return this.getValue() === value;
	            }
	        }
	    }, {
	        key: "setValue",
	        value: function setValue(value) {
	            var _this = this;

	            this.setState({
	                value: value
	            }, function () {
	                _this.props.onChange(value);
	            });
	        }
	    }, {
	        key: "isMounted",
	        value: function isMounted(component) {
	            try {
	                _react2["default"].findDOMNode(component);
	                return true;
	            } catch (e) {
	                return false;
	            }
	        }
	    }, {
	        key: "handleCheck",
	        value: function handleCheck(option, e) {
	            e && e.preventDefault();
	            var selectedValue = option.value;

	            if (this.props.multiple) {
	                var values = this.getValueArray();
	                if (this.hasValue(selectedValue)) {
	                    values.splice(values.indexOf(selectedValue), 1);
	                } else {
	                    values.push(selectedValue);
	                }
	                this.setValue(values.join(this.props.delimiter));
	            } else {
	                this.setValue(selectedValue);
	                // if(this.refs.dropdown.isMounted){
	                this.refs.dropdown.setDropdownState(false);
	                // }
	            }
	        }
	    }, {
	        key: "handleFilterInput",
	        value: function handleFilterInput(e) {
	            e && e.preventDefault();
	            this.setState({
	                filterText: e.target.value
	            });
	        }
	    }, {
	        key: "clearFilterInput",
	        value: function clearFilterInput() {
	            this.setState({
	                filterText: null
	            });
	            _react2["default"].findDOMNode(this.refs.filterInput).value = null;
	        }
	    }, {
	        key: "renderItem",
	        value: function renderItem() {
	            var _this2 = this;

	            var filterText = this.state.filterText;
	            var selectedLabels = [];
	            var items = [];
	            var groupHeader;
	            var _props = this.props;
	            var selectedIcon = _props.selectedIcon;
	            var unselectedIcon = _props.unselectedIcon;

	            this.props.options.forEach(function (option, i) {
	                var checked = _this2.hasValue(option.value);
	                var checkedClass = checked ? "checked" : null;
	                var checkedIcon = checked ? _react2["default"].createElement(_iconJsx2["default"], { icon: selectedIcon }) : unselectedIcon === null ? null : _react2["default"].createElement(_iconJsx2["default"], { icon: unselectedIcon });
	                checked && selectedLabels.push(option.label);
	                if (filterText && _this2.props.optionFilter(filterText, option) === false) {
	                    return;
	                }

	                if (option.group && option.group !== groupHeader) {
	                    groupHeader = option.group;
	                    var groupHeaderClasses = (0, _classnames2["default"])({
	                        "selected-group-header": true
	                    });
	                    items.push(_react2["default"].createElement(
	                        "li",
	                        { key: 'header-' + i, className: groupHeaderClasses },
	                        groupHeader
	                    ));
	                }

	                items.push(_react2["default"].createElement(
	                    "li",
	                    { className: checkedClass,
	                        key: "item-" + i,
	                        onClick: _this2.handleCheck.bind(_this2, option) },
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "selected-item" },
	                        option.label
	                    ),
	                    checkedIcon
	                ));
	            });

	            return { selectedLabels: selectedLabels, items: items };
	        }
	    }, {
	        key: "renderStatus",
	        value: function renderStatus(labels) {
	            return labels.map(function (label) {
	                return _react2["default"].createElement(
	                    "div",
	                    { className: "selected-label" },
	                    label
	                );
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var classes = (0, _classnames2["default"])(this.props.className, {
	                "selected": true
	            });

	            var _renderItem = this.renderItem();

	            var items = _renderItem.items;
	            var selectedLabels = _renderItem.selectedLabels;

	            var status = _react2["default"].createElement(
	                "span",
	                { className: "status" },
	                selectedLabels.length > 0 ? selectedLabels.length > 1 ? this.renderStatus(selectedLabels) : selectedLabels.join(",") : _react2["default"].createElement(
	                    "span",
	                    { className: "placeholder" },
	                    this.props.placeholder
	                )
	            );

	            var itemsStyle = {
	                maxHeight: this.props.maxHeight
	            };
	            return _react2["default"].createElement(
	                _dropdownJsx2["default"],
	                _extends({ className: classes, title: status, ref: "dropdown" }, this.props),
	                this.props.filterInput ? _react2["default"].createElement(
	                    "div",
	                    { className: "filter-input" },
	                    _react2["default"].createElement("input", { type: "text", onChange: this.handleFilterInput.bind(this), ref: "filterInput" }),
	                    _react2["default"].createElement(_iconJsx2["default"], { icon: "search" })
	                ) : null,
	                _react2["default"].createElement(
	                    "ul",
	                    { className: "selected-items", style: itemsStyle },
	                    items
	                ),
	                _react2["default"].createElement("input", { type: "hidden", value: this.state.value })
	            );
	        }
	    }]);

	    return Selected;
	})(_react.Component);

	Selected.defaultProps = {
	    delimiter: ",",
	    placeholder: "点击请选择...",
	    selectedIcon: "ok",
	    unselectedIcon: null,
	    maxHeight: null,
	    minWidth: null,
	    multiple: false,
	    onChange: function onChange() {},
	    optionFilter: function optionFilter(filterText, option) {
	        return option.label.toLowerCase().indexOf(filterText) > -1;
	    }

	};

	exports["default"] = Selected;
	module.exports = exports["default"];

/***/ },
/* 275 */
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

	var _iconJsx = __webpack_require__(240);

	var _iconJsx2 = _interopRequireDefault(_iconJsx);

	var _libDomEs6 = __webpack_require__(238);

	var _libDomEs62 = _interopRequireDefault(_libDomEs6);

	var Dropdown = (function (_Component) {
	    _inherits(Dropdown, _Component);

	    function Dropdown(props) {
	        _classCallCheck(this, Dropdown);

	        _get(Object.getPrototypeOf(Dropdown.prototype), "constructor", this).call(this, props);
	        this.state = {
	            open: false
	        };
	    }

	    _createClass(Dropdown, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            this.bindOuterEvent();
	        }
	    }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            this.unbindOuterEvent();
	        }
	    }, {
	        key: "setDropdownState",
	        value: function setDropdownState(state) {
	            var _this = this;

	            if (state === true) {
	                this.bindOuterEvent();
	            } else {
	                this.unbindOuterEvent();
	            }
	            this.setState({
	                open: state
	            }, function () {
	                state && _this.props.onOpen && _this.props.onOpen();
	                !state && _this.props.onClose && _this.props.onClose();
	            });
	        }
	    }, {
	        key: "bindOuterEvent",
	        value: function bindOuterEvent() {
	            _libDomEs62["default"].bindEvent(document, "click", this.handleOuterClick.bind(this));
	            _libDomEs62["default"].bindEvent(document, "keyup", this.handleKeyup.bind(this));
	        }
	    }, {
	        key: "unbindOuterEvent",
	        value: function unbindOuterEvent() {
	            _libDomEs62["default"].unbindEvent(document, "click", this.handleOuterClick.bind(this));
	            _libDomEs62["default"].unbindEvent(document, "keyup", this.handleKeyup.bind(this));
	        }
	    }, {
	        key: "handleKeyup",
	        value: function handleKeyup(e) {
	            e && e.keyCode === 27 && this.setDropdownState(false);
	        }
	    }, {
	        key: "handleOuterClick",
	        value: function handleOuterClick(e) {
	            // if(dom.hasNode(e.target,ReactDOM.findDOMNode(this)) === true){
	            //     return false;
	            // }
	            // this.setDropdownState(false);
	        }
	    }, {
	        key: "handleClick",
	        value: function handleClick(e) {
	            e && e.preventDefault();
	            this.setDropdownState(!this.state.open);
	        }
	    }, {
	        key: "renderStatus",
	        value: function renderStatus() {
	            var _props = this.props;
	            var minWidth = _props.minWidth;
	            var showStatus = _props.showStatus;
	            var unfoldIcon = _props.unfoldIcon;
	            var foldIcon = _props.foldIcon;

	            var caret = _react2["default"].createElement(_iconJsx2["default"], {
	                icon: this.state.open ? foldIcon : unfoldIcon });
	            if (showStatus === true) {
	                var btnStyle = {
	                    width: minWidth
	                };
	                return _react2["default"].createElement(
	                    "button",
	                    { onClick: this.handleClick.bind(this), style: btnStyle, ref: "dropdownTrigger" },
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "dropdown-status" },
	                        this.props.title
	                    ),
	                    caret
	                );
	            } else {
	                return _react2["default"].createElement(
	                    "div",
	                    { className: "fixed-caret", onClick: this.handleClick.bind(this) },
	                    caret
	                );
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var dropdownClasses = (0, _classnames2["default"])(this.props.className, {
	                "dropdown": this.props.showStatus,
	                "dropdown-headless": !this.props.showStatus,
	                active: this.state.open
	            });
	            var contentClasses = (0, _classnames2["default"])({
	                "dropdown-content": true,
	                active: this.state.open
	            });
	            var maxHeight = this.props.maxHeight;

	            var dropdownContentStyle = {
	                maxHeight: maxHeight
	            };
	            return _react2["default"].createElement(
	                "div",
	                { className: dropdownClasses },
	                this.renderStatus(),
	                _react2["default"].createElement(
	                    "div",
	                    { ref: "dropdownContent", className: contentClasses, style: dropdownContentStyle },
	                    this.props.children
	                )
	            );
	        }
	    }]);

	    return Dropdown;
	})(_react.Component);

	Dropdown.defaultProps = {
	    showStatus: true,
	    foldIcon: "up-open",
	    unfoldIcon: "down-open",
	    onOpen: function onOpen() {},
	    onClose: function onClose() {}
	};

	exports["default"] = Dropdown;
	module.exports = exports["default"];

/***/ },
/* 276 */
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

	var _componentLazyloadLazyloadJsx = __webpack_require__(277);

	var _componentLazyloadLazyloadJsx2 = _interopRequireDefault(_componentLazyloadLazyloadJsx);

	var _componentLazyloadImageJsx = __webpack_require__(278);

	var _componentLazyloadImageJsx2 = _interopRequireDefault(_componentLazyloadImageJsx);

	var OrderGoods = (function (_Component) {
	    _inherits(OrderGoods, _Component);

	    function OrderGoods() {
	        _classCallCheck(this, OrderGoods);

	        _get(Object.getPrototypeOf(OrderGoods.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(OrderGoods, [{
	        key: "renderGood",
	        value: function renderGood(good, cartIndex, goodIndex) {
	            var props = [];
	            for (var propName in good.props) {
	                var propKey = "prop-" + propName;
	                props.push(_react2["default"].createElement(
	                    "span",
	                    { key: propKey },
	                    propName,
	                    ":",
	                    _react2["default"].createElement(
	                        "b",
	                        null,
	                        good.props[propName]
	                    )
	                ));
	            }
	            var goodKey = "good-" + goodIndex;
	            return _react2["default"].createElement(
	                "div",
	                { className: "clearfix", key: goodKey },
	                _react2["default"].createElement(
	                    "a",
	                    { className: "img_wrap J_ytag cartlist", href: "javascript:void(null)" },
	                    _react2["default"].createElement("img", { src: good.imageUrl })
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "gd_info" },
	                    _react2["default"].createElement(
	                        "p",
	                        { className: "name" },
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            good.title
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        { className: "value" },
	                        " ",
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            "¥",
	                            good.salePrice
	                        ),
	                        _react2["default"].createElement(
	                            "b",
	                            null,
	                            "X",
	                            good.buyed
	                        ),
	                        " "
	                    )
	                )
	            );
	        }
	    }, {
	        key: "renderGroup",
	        value: function renderGroup(carts) {
	            var _this = this;

	            if (carts.list.length > 0) {
	                return carts.list.map(function (cart, i) {
	                    var cartKey = "cart-" + i;
	                    var goods = [];
	                    cart.goods.forEach(function (good, j) {
	                        goods.push(_this.renderGood(good, i, j));
	                    });
	                    return _react2["default"].createElement(
	                        "div",
	                        { className: "orderConfirm_l_box", key: cartKey },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "orderConfirm_title clearfix" },
	                            _react2["default"].createElement(
	                                "em",
	                                null,
	                                "优惠类型"
	                            ),
	                            _react2["default"].createElement(
	                                "span",
	                                null,
	                                "组合商品更多优惠"
	                            ),
	                            _react2["default"].createElement("i", { className: "iconfont icon-right" })
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "J_moveRight" },
	                            goods
	                        )
	                    );
	                });
	            }
	            return null;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var carts = this.props.carts;

	            // console.log('carts',carts);
	            return _react2["default"].createElement(
	                "div",
	                { className: "order-list" },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "order-info" },
	                    _react2["default"].createElement(
	                        "span",
	                        null,
	                        "广州保税区一号仓"
	                    ),
	                    _react2["default"].createElement(
	                        "span",
	                        null,
	                        "满XXX元减XX元，满XXXX元减XXX元。"
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "orderConfirm_l clearfix" },
	                    this.renderGroup(carts)
	                )
	            );
	        }
	    }]);

	    return OrderGoods;
	})(_react.Component);

	exports["default"] = OrderGoods;
	module.exports = exports["default"];

/***/ },
/* 277 */
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

	var _libUtilEs6 = __webpack_require__(227);

	var _libUtilEs62 = _interopRequireDefault(_libUtilEs6);

	var listeners = [];

	function checkVisble(component) {
	    var node = _react2["default"].findDOMNode(component);

	    var _node$getBoundingClientRect = node.getBoundingClientRect();

	    var top = _node$getBoundingClientRect.top;
	    var bottom = _node$getBoundingClientRect.bottom;

	    var scrollTop = _libUtilEs62["default"].scrollTop();

	    var elementTop = top + scrollTop;
	    var elementHeight = bottom - top;
	    var windowInnerHeight = window.innerHeight || document.documentElement.clientHeight;

	    if (elementTop < scrollTop + windowInnerHeight + component.props.offset && elementTop + elementHeight + component.props.offset > scrollTop) {
	        component.setState({
	            visible: true
	        });
	    }
	}

	function lazyLoadHandler() {
	    listeners.forEach(function (listener) {
	        checkVisble(listener);
	    });
	}

	var LazyLoad = (function (_Component) {
	    _inherits(LazyLoad, _Component);

	    function LazyLoad(props) {
	        _classCallCheck(this, LazyLoad);

	        _get(Object.getPrototypeOf(LazyLoad.prototype), "constructor", this).call(this, props);
	        this.state = {
	            visible: false
	        };
	    }

	    _createClass(LazyLoad, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            _libUtilEs62["default"].bindEvent(window, 'scroll', lazyLoadHandler);
	            listeners.push(this);
	            checkVisble(this);
	        }
	    }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            var index = listeners.indexOf(this);
	            if (index !== -1) {
	                listeners.splice(index, 1);
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2["default"].cloneElement(this.props.children, {
	                visible: this.state.visible
	            });
	        }
	    }]);

	    return LazyLoad;
	})(_react.Component);

	LazyLoad.defaultProps = {
	    offset: 0,
	    scroll: true,
	    resize: false
	};

	exports["default"] = LazyLoad;
	module.exports = exports["default"];

/***/ },
/* 278 */
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

	var _reactLibReactCSSTransitionGroup = __webpack_require__(279);

	var _reactLibReactCSSTransitionGroup2 = _interopRequireDefault(_reactLibReactCSSTransitionGroup);

	var placeholder = "/client/asset/image/blank.gif";

	var Image = (function (_Component) {
	    _inherits(Image, _Component);

	    function Image(props) {
	        _classCallCheck(this, Image);

	        _get(Object.getPrototypeOf(Image.prototype), "constructor", this).call(this, props);
	        this.state = {
	            isReady: false
	        };
	    }

	    _createClass(Image, [{
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(nextProps) {
	            var _this = this;

	            if (nextProps.visible === true) {
	                setTimeout(function () {
	                    _this.setState({
	                        isReady: true
	                    });
	                }, 500);
	            }
	        }
	    }, {
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var imgNode = _react2["default"].findDOMNode(this);
	            this.initialHeight = imgNode.clientWidth;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var src = placeholder,
	                classes = "",
	                transition = "flip";
	            if (this.state.isReady === true) {
	                src = this.props.src;
	                classes = "loaded";
	            }
	            var initialStyle = {
	                height: this.initialHeight
	            };
	            return _react2["default"].createElement(
	                _reactLibReactCSSTransitionGroup2["default"],
	                { transitionName: transition, component: "div",
	                    className: "lazyload-image", style: initialStyle },
	                _react2["default"].createElement(
	                    "div",
	                    { key: src, style: initialStyle },
	                    _react2["default"].createElement("img", { src: src, className: classes }),
	                    this.state.isReady && this.props.children
	                )
	            );
	        }
	    }]);

	    return Image;
	})(_react.Component);

	exports["default"] = Image;
	module.exports = exports["default"];

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * @providesModule ReactCSSTransitionGroup
	 */

	'use strict';

	var React = __webpack_require__(34);

	var assign = __webpack_require__(71);

	var ReactTransitionGroup = __webpack_require__(280);
	var ReactCSSTransitionGroupChild = __webpack_require__(282);

	function createTransitionTimeoutPropValidator(transitionType) {
	  var timeoutPropName = 'transition' + transitionType + 'Timeout';
	  var enabledPropName = 'transition' + transitionType;

	  return function (props) {
	    // If the transition is enabled
	    if (props[enabledPropName]) {
	      // If no timeout duration is provided
	      if (props[timeoutPropName] == null) {
	        return new Error(timeoutPropName + ' wasn\'t supplied to ReactCSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

	        // If the duration isn't a number
	      } else if (typeof props[timeoutPropName] !== 'number') {
	          return new Error(timeoutPropName + ' must be a number (in milliseconds)');
	        }
	    }
	  };
	}

	var ReactCSSTransitionGroup = React.createClass({
	  displayName: 'ReactCSSTransitionGroup',

	  propTypes: {
	    transitionName: ReactCSSTransitionGroupChild.propTypes.name,

	    transitionAppear: React.PropTypes.bool,
	    transitionEnter: React.PropTypes.bool,
	    transitionLeave: React.PropTypes.bool,
	    transitionAppearTimeout: createTransitionTimeoutPropValidator('Appear'),
	    transitionEnterTimeout: createTransitionTimeoutPropValidator('Enter'),
	    transitionLeaveTimeout: createTransitionTimeoutPropValidator('Leave')
	  },

	  getDefaultProps: function () {
	    return {
	      transitionAppear: false,
	      transitionEnter: true,
	      transitionLeave: true
	    };
	  },

	  _wrapChild: function (child) {
	    // We need to provide this childFactory so that
	    // ReactCSSTransitionGroupChild can receive updates to name, enter, and
	    // leave while it is leaving.
	    return React.createElement(ReactCSSTransitionGroupChild, {
	      name: this.props.transitionName,
	      appear: this.props.transitionAppear,
	      enter: this.props.transitionEnter,
	      leave: this.props.transitionLeave,
	      appearTimeout: this.props.transitionAppearTimeout,
	      enterTimeout: this.props.transitionEnterTimeout,
	      leaveTimeout: this.props.transitionLeaveTimeout
	    }, child);
	  },

	  render: function () {
	    return React.createElement(ReactTransitionGroup, assign({}, this.props, { childFactory: this._wrapChild }));
	  }
	});

	module.exports = ReactCSSTransitionGroup;

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactTransitionGroup
	 */

	'use strict';

	var React = __webpack_require__(34);
	var ReactTransitionChildMapping = __webpack_require__(281);

	var assign = __webpack_require__(71);
	var emptyFunction = __webpack_require__(47);

	var ReactTransitionGroup = React.createClass({
	  displayName: 'ReactTransitionGroup',

	  propTypes: {
	    component: React.PropTypes.any,
	    childFactory: React.PropTypes.func
	  },

	  getDefaultProps: function () {
	    return {
	      component: 'span',
	      childFactory: emptyFunction.thatReturnsArgument
	    };
	  },

	  getInitialState: function () {
	    return {
	      children: ReactTransitionChildMapping.getChildMapping(this.props.children)
	    };
	  },

	  componentWillMount: function () {
	    this.currentlyTransitioningKeys = {};
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	  },

	  componentDidMount: function () {
	    var initialChildMapping = this.state.children;
	    for (var key in initialChildMapping) {
	      if (initialChildMapping[key]) {
	        this.performAppear(key);
	      }
	    }
	  },

	  componentWillReceiveProps: function (nextProps) {
	    var nextChildMapping = ReactTransitionChildMapping.getChildMapping(nextProps.children);
	    var prevChildMapping = this.state.children;

	    this.setState({
	      children: ReactTransitionChildMapping.mergeChildMappings(prevChildMapping, nextChildMapping)
	    });

	    var key;

	    for (key in nextChildMapping) {
	      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
	      if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
	        this.keysToEnter.push(key);
	      }
	    }

	    for (key in prevChildMapping) {
	      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
	      if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
	        this.keysToLeave.push(key);
	      }
	    }

	    // If we want to someday check for reordering, we could do it here.
	  },

	  componentDidUpdate: function () {
	    var keysToEnter = this.keysToEnter;
	    this.keysToEnter = [];
	    keysToEnter.forEach(this.performEnter);

	    var keysToLeave = this.keysToLeave;
	    this.keysToLeave = [];
	    keysToLeave.forEach(this.performLeave);
	  },

	  performAppear: function (key) {
	    this.currentlyTransitioningKeys[key] = true;

	    var component = this.refs[key];

	    if (component.componentWillAppear) {
	      component.componentWillAppear(this._handleDoneAppearing.bind(this, key));
	    } else {
	      this._handleDoneAppearing(key);
	    }
	  },

	  _handleDoneAppearing: function (key) {
	    var component = this.refs[key];
	    if (component.componentDidAppear) {
	      component.componentDidAppear();
	    }

	    delete this.currentlyTransitioningKeys[key];

	    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children);

	    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
	      // This was removed before it had fully appeared. Remove it.
	      this.performLeave(key);
	    }
	  },

	  performEnter: function (key) {
	    this.currentlyTransitioningKeys[key] = true;

	    var component = this.refs[key];

	    if (component.componentWillEnter) {
	      component.componentWillEnter(this._handleDoneEntering.bind(this, key));
	    } else {
	      this._handleDoneEntering(key);
	    }
	  },

	  _handleDoneEntering: function (key) {
	    var component = this.refs[key];
	    if (component.componentDidEnter) {
	      component.componentDidEnter();
	    }

	    delete this.currentlyTransitioningKeys[key];

	    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children);

	    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
	      // This was removed before it had fully entered. Remove it.
	      this.performLeave(key);
	    }
	  },

	  performLeave: function (key) {
	    this.currentlyTransitioningKeys[key] = true;

	    var component = this.refs[key];
	    if (component.componentWillLeave) {
	      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
	    } else {
	      // Note that this is somewhat dangerous b/c it calls setState()
	      // again, effectively mutating the component before all the work
	      // is done.
	      this._handleDoneLeaving(key);
	    }
	  },

	  _handleDoneLeaving: function (key) {
	    var component = this.refs[key];

	    if (component.componentDidLeave) {
	      component.componentDidLeave();
	    }

	    delete this.currentlyTransitioningKeys[key];

	    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children);

	    if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
	      // This entered again before it fully left. Add it again.
	      this.performEnter(key);
	    } else {
	      this.setState(function (state) {
	        var newChildren = assign({}, state.children);
	        delete newChildren[key];
	        return { children: newChildren };
	      });
	    }
	  },

	  render: function () {
	    // TODO: we could get rid of the need for the wrapper node
	    // by cloning a single child
	    var childrenToRender = [];
	    for (var key in this.state.children) {
	      var child = this.state.children[key];
	      if (child) {
	        // You may need to apply reactive updates to a child as it is leaving.
	        // The normal React way to do it won't work since the child will have
	        // already been removed. In case you need this behavior you can provide
	        // a childFactory function to wrap every child, even the ones that are
	        // leaving.
	        childrenToRender.push(React.cloneElement(this.props.childFactory(child), { ref: key, key: key }));
	      }
	    }
	    return React.createElement(this.props.component, this.props, childrenToRender);
	  }
	});

	module.exports = ReactTransitionGroup;

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 * @providesModule ReactTransitionChildMapping
	 */

	'use strict';

	var flattenChildren = __webpack_require__(148);

	var ReactTransitionChildMapping = {
	  /**
	   * Given `this.props.children`, return an object mapping key to child. Just
	   * simple syntactic sugar around flattenChildren().
	   *
	   * @param {*} children `this.props.children`
	   * @return {object} Mapping of key to child
	   */
	  getChildMapping: function (children) {
	    if (!children) {
	      return children;
	    }
	    return flattenChildren(children);
	  },

	  /**
	   * When you're adding or removing children some may be added or removed in the
	   * same render pass. We want to show *both* since we want to simultaneously
	   * animate elements in and out. This function takes a previous set of keys
	   * and a new set of keys and merges them with its best guess of the correct
	   * ordering. In the future we may expose some of the utilities in
	   * ReactMultiChild to make this easy, but for now React itself does not
	   * directly have this concept of the union of prevChildren and nextChildren
	   * so we implement it here.
	   *
	   * @param {object} prev prev children as returned from
	   * `ReactTransitionChildMapping.getChildMapping()`.
	   * @param {object} next next children as returned from
	   * `ReactTransitionChildMapping.getChildMapping()`.
	   * @return {object} a key set that contains all keys in `prev` and all keys
	   * in `next` in a reasonable order.
	   */
	  mergeChildMappings: function (prev, next) {
	    prev = prev || {};
	    next = next || {};

	    function getValueForKey(key) {
	      if (next.hasOwnProperty(key)) {
	        return next[key];
	      } else {
	        return prev[key];
	      }
	    }

	    // For each key of `next`, the list of keys to insert before that key in
	    // the combined list
	    var nextKeysPending = {};

	    var pendingKeys = [];
	    for (var prevKey in prev) {
	      if (next.hasOwnProperty(prevKey)) {
	        if (pendingKeys.length) {
	          nextKeysPending[prevKey] = pendingKeys;
	          pendingKeys = [];
	        }
	      } else {
	        pendingKeys.push(prevKey);
	      }
	    }

	    var i;
	    var childMapping = {};
	    for (var nextKey in next) {
	      if (nextKeysPending.hasOwnProperty(nextKey)) {
	        for (i = 0; i < nextKeysPending[nextKey].length; i++) {
	          var pendingNextKey = nextKeysPending[nextKey][i];
	          childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
	        }
	      }
	      childMapping[nextKey] = getValueForKey(nextKey);
	    }

	    // Finally, add the keys which didn't appear before any key in `next`
	    for (i = 0; i < pendingKeys.length; i++) {
	      childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	    }

	    return childMapping;
	  }
	};

	module.exports = ReactTransitionChildMapping;

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * @providesModule ReactCSSTransitionGroupChild
	 */

	'use strict';

	var React = __webpack_require__(34);
	var ReactDOM = __webpack_require__(35);

	var CSSCore = __webpack_require__(283);
	var ReactTransitionEvents = __webpack_require__(284);

	var onlyChild = __webpack_require__(188);

	// We don't remove the element from the DOM until we receive an animationend or
	// transitionend event. If the user screws up and forgets to add an animation
	// their node will be stuck in the DOM forever, so we detect if an animation
	// does not start and if it doesn't, we just call the end listener immediately.
	var TICK = 17;

	var ReactCSSTransitionGroupChild = React.createClass({
	  displayName: 'ReactCSSTransitionGroupChild',

	  propTypes: {
	    name: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.shape({
	      enter: React.PropTypes.string,
	      leave: React.PropTypes.string,
	      active: React.PropTypes.string
	    }), React.PropTypes.shape({
	      enter: React.PropTypes.string,
	      enterActive: React.PropTypes.string,
	      leave: React.PropTypes.string,
	      leaveActive: React.PropTypes.string,
	      appear: React.PropTypes.string,
	      appearActive: React.PropTypes.string
	    })]).isRequired,

	    // Once we require timeouts to be specified, we can remove the
	    // boolean flags (appear etc.) and just accept a number
	    // or a bool for the timeout flags (appearTimeout etc.)
	    appear: React.PropTypes.bool,
	    enter: React.PropTypes.bool,
	    leave: React.PropTypes.bool,
	    appearTimeout: React.PropTypes.number,
	    enterTimeout: React.PropTypes.number,
	    leaveTimeout: React.PropTypes.number
	  },

	  transition: function (animationType, finishCallback, userSpecifiedDelay) {
	    var node = ReactDOM.findDOMNode(this);

	    if (!node) {
	      if (finishCallback) {
	        finishCallback();
	      }
	      return;
	    }

	    var className = this.props.name[animationType] || this.props.name + '-' + animationType;
	    var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';
	    var timeout = null;

	    var endListener = function (e) {
	      if (e && e.target !== node) {
	        return;
	      }

	      clearTimeout(timeout);

	      CSSCore.removeClass(node, className);
	      CSSCore.removeClass(node, activeClassName);

	      ReactTransitionEvents.removeEndEventListener(node, endListener);

	      // Usually this optional callback is used for informing an owner of
	      // a leave animation and telling it to remove the child.
	      if (finishCallback) {
	        finishCallback();
	      }
	    };

	    CSSCore.addClass(node, className);

	    // Need to do this to actually trigger a transition.
	    this.queueClass(activeClassName);

	    // If the user specified a timeout delay.
	    if (userSpecifiedDelay) {
	      // Clean-up the animation after the specified delay
	      timeout = setTimeout(endListener, userSpecifiedDelay);
	    } else {
	      // DEPRECATED: this listener will be removed in a future version of react
	      ReactTransitionEvents.addEndEventListener(node, endListener);
	    }
	  },

	  queueClass: function (className) {
	    this.classNameQueue.push(className);

	    if (!this.timeout) {
	      this.timeout = setTimeout(this.flushClassNameQueue, TICK);
	    }
	  },

	  flushClassNameQueue: function () {
	    if (this.isMounted()) {
	      this.classNameQueue.forEach(CSSCore.addClass.bind(CSSCore, ReactDOM.findDOMNode(this)));
	    }
	    this.classNameQueue.length = 0;
	    this.timeout = null;
	  },

	  componentWillMount: function () {
	    this.classNameQueue = [];
	  },

	  componentWillUnmount: function () {
	    if (this.timeout) {
	      clearTimeout(this.timeout);
	    }
	  },

	  componentWillAppear: function (done) {
	    if (this.props.appear) {
	      this.transition('appear', done, this.props.appearTimeout);
	    } else {
	      done();
	    }
	  },

	  componentWillEnter: function (done) {
	    if (this.props.enter) {
	      this.transition('enter', done, this.props.enterTimeout);
	    } else {
	      done();
	    }
	  },

	  componentWillLeave: function (done) {
	    if (this.props.leave) {
	      this.transition('leave', done, this.props.leaveTimeout);
	    } else {
	      done();
	    }
	  },

	  render: function () {
	    return onlyChild(this.props.children);
	  }
	});

	module.exports = ReactCSSTransitionGroupChild;

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CSSCore
	 * @typechecks
	 */

	'use strict';

	var invariant = __webpack_require__(45);

	/**
	 * The CSSCore module specifies the API (and implements most of the methods)
	 * that should be used when dealing with the display of elements (via their
	 * CSS classes and visibility on screen. It is an API focused on mutating the
	 * display and not reading it as no logical state should be encoded in the
	 * display of elements.
	 */

	var CSSCore = {

	  /**
	   * Adds the class passed in to the element if it doesn't already have it.
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {DOMElement} the element passed in
	   */
	  addClass: function (element, className) {
	    !!/\s/.test(className) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CSSCore.addClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(false) : undefined;

	    if (className) {
	      if (element.classList) {
	        element.classList.add(className);
	      } else if (!CSSCore.hasClass(element, className)) {
	        element.className = element.className + ' ' + className;
	      }
	    }
	    return element;
	  },

	  /**
	   * Removes the class passed in from the element
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {DOMElement} the element passed in
	   */
	  removeClass: function (element, className) {
	    !!/\s/.test(className) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CSSCore.removeClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(false) : undefined;

	    if (className) {
	      if (element.classList) {
	        element.classList.remove(className);
	      } else if (CSSCore.hasClass(element, className)) {
	        element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ') // multiple spaces to one
	        .replace(/^\s*|\s*$/g, ''); // trim the ends
	      }
	    }
	    return element;
	  },

	  /**
	   * Helper to add or remove a class from an element based on a condition.
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @param {*} bool condition to whether to add or remove the class
	   * @return {DOMElement} the element passed in
	   */
	  conditionClass: function (element, className, bool) {
	    return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
	  },

	  /**
	   * Tests whether the element has the class specified.
	   *
	   * @param {DOMNode|DOMWindow} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {boolean} true if the element has the class, false if not
	   */
	  hasClass: function (element, className) {
	    !!/\s/.test(className) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'CSS.hasClass takes only a single class name.') : invariant(false) : undefined;
	    if (element.classList) {
	      return !!className && element.classList.contains(className);
	    }
	    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
	  }

	};

	module.exports = CSSCore;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactTransitionEvents
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(41);

	/**
	 * EVENT_NAME_MAP is used to determine which event fired when a
	 * transition/animation ends, based on the style property used to
	 * define that event.
	 */
	var EVENT_NAME_MAP = {
	  transitionend: {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'mozTransitionEnd',
	    'OTransition': 'oTransitionEnd',
	    'msTransition': 'MSTransitionEnd'
	  },

	  animationend: {
	    'animation': 'animationend',
	    'WebkitAnimation': 'webkitAnimationEnd',
	    'MozAnimation': 'mozAnimationEnd',
	    'OAnimation': 'oAnimationEnd',
	    'msAnimation': 'MSAnimationEnd'
	  }
	};

	var endEvents = [];

	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;

	  // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are useable, and if not remove them
	  // from the map
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }

	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }

	  for (var baseEventName in EVENT_NAME_MAP) {
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}

	if (ExecutionEnvironment.canUseDOM) {
	  detectEvents();
	}

	// We use the raw {add|remove}EventListener() call because EventListener
	// does not know how to remove event listeners and we really should
	// clean up. Also, these events are not triggered in older browsers
	// so we should be A-OK here.

	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}

	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}

	var ReactTransitionEvents = {
	  addEndEventListener: function (node, eventListener) {
	    if (endEvents.length === 0) {
	      // If CSS transitions are not supported, trigger an "end animation"
	      // event immediately.
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },

	  removeEndEventListener: function (node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};

	module.exports = ReactTransitionEvents;

/***/ },
/* 285 */
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

	var _componentFormCheckboxJsx = __webpack_require__(253);

	var _componentFormCheckboxJsx2 = _interopRequireDefault(_componentFormCheckboxJsx);

	var Invoice = (function (_Component) {
	    _inherits(Invoice, _Component);

	    function Invoice(props) {
	        _classCallCheck(this, Invoice);

	        _get(Object.getPrototypeOf(Invoice.prototype), "constructor", this).call(this, props);
	        this.state = {
	            invoiceEnabled: false
	        };
	    }

	    _createClass(Invoice, [{
	        key: "toggleInvoiceEnabled",
	        value: function toggleInvoiceEnabled() {
	            console.log('onChange');
	            this.setState({
	                invoiceEnabled: !this.state.invoiceEnabled
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var invoiceFormClasses = (0, _classnames2["default"])("invoice-form", {
	                active: this.state.invoiceEnabled
	            });
	            return _react2["default"].createElement(
	                "div",
	                { className: "confirm-invoice" },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "invoice-toolbar" },
	                    _react2["default"].createElement(_componentFormCheckboxJsx2["default"], { checked: this.state.invoiceEnabled,
	                        onChange: this.toggleInvoiceEnabled.bind(this) }),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "check-label" },
	                        "开具发票"
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: invoiceFormClasses },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "invoice-form-row" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "invoice-form-label" },
	                            "发票抬头"
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "invoice-form-input" },
	                            _react2["default"].createElement(
	                                "div",
	                                null,
	                                _react2["default"].createElement(_componentFormCheckboxJsx2["default"], { type: "radio", name: "invoice-title" }),
	                                _react2["default"].createElement(
	                                    "div",
	                                    { className: "check-label" },
	                                    "个人"
	                                )
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                null,
	                                _react2["default"].createElement(_componentFormCheckboxJsx2["default"], { type: "radio", name: "invoice-title" }),
	                                _react2["default"].createElement(
	                                    "div",
	                                    { className: "check-label" },
	                                    "公司"
	                                ),
	                                _react2["default"].createElement("input", { type: "text", placeholder: "公司名称" })
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Invoice;
	})(_react.Component);

	exports["default"] = Invoice;
	module.exports = exports["default"];

/***/ },
/* 286 */
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

	var _libDomEs6 = __webpack_require__(238);

	var _libDomEs62 = _interopRequireDefault(_libDomEs6);

	var Alert = (function (_Component) {
	    _inherits(Alert, _Component);

	    function Alert() {
	        _classCallCheck(this, Alert);

	        _get(Object.getPrototypeOf(Alert.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Alert, [{
	        key: "render",
	        value: function render() {
	            var classes = (0, _classnames2["default"])("alert-layer", {
	                "active": this.props.active
	            });
	            return _react2["default"].createElement(
	                "div",
	                { className: classes },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "alert" },
	                    this.props.children
	                )
	            );
	        }
	    }]);

	    return Alert;
	})(_react.Component);

	Alert.defaultProps = {
	    autoHide: true,
	    delay: 3000
	};

	exports["default"] = Alert;
	module.exports = exports["default"];

/***/ },
/* 287 */
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

	var _reducerEs6 = __webpack_require__(288);

	var _reducerEs62 = _interopRequireDefault(_reducerEs6);

	var _libReduxHelperEs6 = __webpack_require__(208);

	var _libReduxHelperEs62 = _interopRequireDefault(_libReduxHelperEs6);

	var _componentJsx = __webpack_require__(316);

	var _componentJsx2 = _interopRequireDefault(_componentJsx);

	function selector(state) {
	    var receiverByForm = state.receiverByForm;
	    var receiverByUser = state.receiverByUser;

	    return {
	        receiverByForm: receiverByForm,
	        receiverByUser: receiverByUser
	    };
	}

	var ReceiverConnected = (0, _reactRedux.connect)(selector)(_componentJsx2["default"]);

	var ReceiverApp = (function (_React$Component) {
	    _inherits(ReceiverApp, _React$Component);

	    function ReceiverApp() {
	        _classCallCheck(this, ReceiverApp);

	        _get(Object.getPrototypeOf(ReceiverApp.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(ReceiverApp, [{
	        key: "render",
	        value: function render() {
	            var _props$initialState = this.props.initialState;
	            var receivers = _props$initialState.receivers;
	            var onCheck = _props$initialState.onCheck;
	            var checkedReceiver = _props$initialState.checkedReceiver;

	            var store = (0, _libReduxHelperEs62["default"])(_reducerEs62["default"], {
	                receiverByUser: {
	                    isFetching: false,
	                    onCheck: onCheck,
	                    checkedReceiver: checkedReceiver,
	                    receivers: receivers
	                },
	                receiverByForm: {
	                    receiver: null,
	                    provinces: [{
	                        value: "",
	                        label: "请选择"
	                    }],
	                    cities: [{
	                        value: "",
	                        label: "请选择"
	                    }],
	                    districts: [{
	                        value: "",
	                        label: "请选择"
	                    }]
	                }
	            });
	            return _react2["default"].createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2["default"].createElement(ReceiverConnected, null)
	            );
	        }
	    }]);

	    return ReceiverApp;
	})(_react2["default"].Component);

	exports["default"] = ReceiverApp;
	module.exports = exports["default"];

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = __webpack_require__(209)["default"];

	var _toConsumableArray = __webpack_require__(289)["default"];

	var _Object$assign = __webpack_require__(210)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(197);

	var _actionEs6 = __webpack_require__(315);

	var _commonActionEs6 = __webpack_require__(270);

	var _commonReducerEs6 = __webpack_require__(271);

	function receiverByForm(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _actionEs6.REQUEST_RECEIVER:
	            return _Object$assign({}, state, {
	                receiverFetching: true
	            });
	        case _actionEs6.RESPONSE_RECEIVER:
	            var receiver = null,
	                receiverFetched = false;
	            if (action.res.isFetched === true) {
	                receiver = action.res.receiver;
	                receiverFetched = true;
	            }
	            return _Object$assign({}, state, {
	                receiverFetching: false,
	                receiverFetched: receiverFetched,
	                receiver: receiver
	            });
	        case _actionEs6.CHANGE_FIELD:
	            var name = action.name,
	                value = action.value;

	            var receiver = _extends({}, state.receiver);
	            receiver[name] = value;
	            return _Object$assign({}, state, {
	                receiver: receiver
	            });
	        case _actionEs6.REQUEST_PROVINCES:
	            return _Object$assign({}, state, {
	                provinceFetching: true
	            });
	        case _actionEs6.RESPONSE_PROVINCES:
	            var provinces = state.provinces;
	            var cities = state.cities;
	            var districts = state.districts;
	            // console.log('state',state)
	            provinces = [].concat(_toConsumableArray(provinces), _toConsumableArray(action.res.items));
	            cities = cities.slice(0, 1);
	            districts = districts.slice(0, 1);
	            return _Object$assign({}, state, {
	                provinceFetching: false,
	                provinces: provinces,
	                cities: cities,
	                districts: districts
	            });
	        case _actionEs6.REQUEST_CITIES:
	            return _Object$assign({}, state, {
	                cityFetching: true
	            });
	        case _actionEs6.RESPONSE_CITIES:
	            var cities = state.cities;
	            var districts = state.districts;
	            if (cities.length === 1) {
	                cities = [].concat(_toConsumableArray(cities), _toConsumableArray(action.res.items));
	            } else {
	                cities = [cities[0]].concat(_toConsumableArray(action.res.items));
	            }
	            districts = districts.slice(0, 1);
	            return _Object$assign({}, state, {
	                cityFetching: false,
	                cities: cities,
	                districts: districts
	            });
	        case _actionEs6.REQUEST_DISTRICTS:
	            return _Object$assign({}, state, {
	                districtFetching: true
	            });
	        case _actionEs6.RESPONSE_DISTRICTS:
	            var districts = state.districts;
	            if (districts.length === 1) {
	                districts = [].concat(_toConsumableArray(districts), _toConsumableArray(action.res.items));
	            } else {
	                districts = [districts[0]].concat(_toConsumableArray(action.res.items));
	            }
	            return _Object$assign({}, state, {
	                districtFetching: false,
	                districts: districts
	            });
	        case _actionEs6.START_SAVE_RECEIVER:
	            return _Object$assign({}, state, {
	                receiverSaving: true,
	                receiverSaved: false
	            });
	        case _actionEs6.FINISH_SAVE_RECEIVER:
	            return _Object$assign({}, state, _extends({
	                receiverSaving: false
	            }, action.res));
	        case _commonActionEs6.SHOW_ALERT:
	        case _commonActionEs6.HIDE_ALERT:
	            return (0, _commonReducerEs6.alertReducer)(state, action);
	        default:
	            return state;
	    }
	}

	function receiverByUser(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        default:
	            return state;
	    }
	}

	var rootReducer = (0, _redux.combineReducers)({
	    receiverByUser: receiverByUser,
	    receiverByForm: receiverByForm
	});

	exports["default"] = rootReducer;
	module.exports = exports["default"];

/***/ },
/* 289 */
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
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(291), __esModule: true };

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(292);
	__webpack_require__(308);
	module.exports = __webpack_require__(16).Array.from;

/***/ },
/* 292 */
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
/* 293 */
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
/* 294 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 295 */
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
/* 296 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(298);

/***/ },
/* 298 */
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
/* 299 */
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
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 301 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(303)('wks')
	  , uid    = __webpack_require__(304)
	  , Symbol = __webpack_require__(15).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 304 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 305 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 306 */
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
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(7).setDesc
	  , has = __webpack_require__(301)
	  , TAG = __webpack_require__(302)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 308 */
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
/* 309 */
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
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(305)
	  , ITERATOR   = __webpack_require__(302)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return (Iterators.Array || ArrayProto[ITERATOR]) === it;
	};

/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(294)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 312 */
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
/* 313 */
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
/* 314 */
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
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.fetchReceiver = fetchReceiver;
	exports.changeField = changeField;
	exports.fetchProvinces = fetchProvinces;
	exports.fetchCities = fetchCities;
	exports.fetchDistricts = fetchDistricts;
	exports.saveReceiver = saveReceiver;

	var _libUtilEs6 = __webpack_require__(227);

	var _commonActionEs6 = __webpack_require__(270);

	var CHANGE_FIELD = "CHANGE_FIELD";
	exports.CHANGE_FIELD = CHANGE_FIELD;
	var REQUEST_PROVINCES = "REQUEST_PROVINCES";
	exports.REQUEST_PROVINCES = REQUEST_PROVINCES;
	var RESPONSE_PROVINCES = "RESPONSE_PROVINCES";
	exports.RESPONSE_PROVINCES = RESPONSE_PROVINCES;
	var REQUEST_CITIES = "REQUEST_CITIES";
	exports.REQUEST_CITIES = REQUEST_CITIES;
	var RESPONSE_CITIES = "RESPONSE_CITIES";
	exports.RESPONSE_CITIES = RESPONSE_CITIES;
	var REQUEST_DISTRICTS = "REQUEST_DISTRICTS";
	exports.REQUEST_DISTRICTS = REQUEST_DISTRICTS;
	var RESPONSE_DISTRICTS = "RESPONSE_DISTRICTS";
	exports.RESPONSE_DISTRICTS = RESPONSE_DISTRICTS;
	var CHANGE_AREA = "CHANGE_AREA";
	exports.CHANGE_AREA = CHANGE_AREA;
	var REQUEST_RECEIVER = "REQUEST_RECEIVER";
	exports.REQUEST_RECEIVER = REQUEST_RECEIVER;
	var RESPONSE_RECEIVER = "RESPONSE_RECEIVER";
	exports.RESPONSE_RECEIVER = RESPONSE_RECEIVER;
	var START_SAVE_RECEIVER = "START_SAVE_RECEIVER";
	exports.START_SAVE_RECEIVER = START_SAVE_RECEIVER;
	var FINISH_SAVE_RECEIVER = "FINISH_SAVE_RECEIVER";

	exports.FINISH_SAVE_RECEIVER = FINISH_SAVE_RECEIVER;

	function requestReceiver() {
	    return {
	        type: REQUEST_RECEIVER
	    };
	}

	function responseReceiver(res) {
	    return {
	        type: RESPONSE_RECEIVER,
	        res: res
	    };
	}

	function fetchReceiver(url) {
	    return function (dispatch) {
	        dispatch(requestReceiver());
	        (0, _libUtilEs6.apiRequest)(url).then(function (res) {
	            dispatch(responseReceiver(res));
	        });
	    };
	}

	function changeField(name, value) {
	    return {
	        type: CHANGE_FIELD,
	        name: name,
	        value: value
	    };
	}

	function requestProvinces(param) {
	    return {
	        type: REQUEST_PROVINCES,
	        param: param
	    };
	}

	function responseProvinces(param, res) {
	    return {
	        type: RESPONSE_PROVINCES,
	        param: param,
	        res: res,
	        responseAt: Date.now()
	    };
	}

	function fetchProvinces(url, param) {
	    return function (dispatch) {
	        dispatch(requestProvinces(param));
	        (0, _libUtilEs6.apiRequest)(url, param).then(function (res) {
	            // console.log('provinces',res)
	            dispatch(responseProvinces(param, res));
	        });
	    };
	}

	function requestCities(param) {
	    return {
	        type: REQUEST_CITIES,
	        param: param
	    };
	}

	function responseCities(param, res) {
	    return {
	        type: RESPONSE_CITIES,
	        param: param,
	        res: res,
	        responseAt: Date.now()
	    };
	}

	function fetchCities(url, param) {
	    return function (dispatch) {
	        dispatch(requestCities(param));
	        (0, _libUtilEs6.apiRequest)(url, param).then(function (res) {
	            dispatch(responseCities(param, res));
	        });
	    };
	}

	function requestDistricts(param) {
	    return {
	        type: REQUEST_DISTRICTS,
	        param: param
	    };
	}

	function responseDistricts(param, res) {
	    return {
	        type: RESPONSE_DISTRICTS,
	        param: param,
	        res: res,
	        responseAt: Date.now()
	    };
	}

	function fetchDistricts(url, param) {
	    return function (dispatch) {
	        dispatch(requestDistricts(param));
	        (0, _libUtilEs6.apiRequest)(url, param).then(function (res) {
	            dispatch(responseDistricts(param, res));
	        });
	    };
	}

	function startSaveReceiver(param) {
	    return {
	        type: START_SAVE_RECEIVER,
	        param: param
	    };
	}

	function finishSaveReceiver(param, res) {
	    return {
	        type: FINISH_SAVE_RECEIVER,
	        param: param,
	        res: res,
	        finishAt: Date.now()
	    };
	}

	function saveReceiver(param) {
	    return function (dispatch) {
	        dispatch(startSaveReceiver(param));
	        (0, _libUtilEs6.apiRequest)("/savereceiver", param, {
	            method: "post",
	            type: "json"
	        }).then(function (res) {
	            dispatch(finishSaveReceiver(param, res));
	        });
	    };
	}

/***/ },
/* 316 */
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

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _partialReceiverJsx = __webpack_require__(317);

	var _partialReceiverJsx2 = _interopRequireDefault(_partialReceiverJsx);

	var _partialAddreceiverJsx = __webpack_require__(318);

	var _partialAddreceiverJsx2 = _interopRequireDefault(_partialAddreceiverJsx);

	var _partialUpdatereceiverJsx = __webpack_require__(323);

	var _partialUpdatereceiverJsx2 = _interopRequireDefault(_partialUpdatereceiverJsx);

	var _director = __webpack_require__(325);

	var _reactLibReactCSSTransitionGroup = __webpack_require__(279);

	var _reactLibReactCSSTransitionGroup2 = _interopRequireDefault(_reactLibReactCSSTransitionGroup);

	var _actionEs6 = __webpack_require__(315);

	var ReceiverRouter = (function (_Component) {
	    _inherits(ReceiverRouter, _Component);

	    function ReceiverRouter(props) {
	        _classCallCheck(this, ReceiverRouter);

	        _get(Object.getPrototypeOf(ReceiverRouter.prototype), "constructor", this).call(this, props);
	        this.state = {
	            currentRoute: "index",
	            currentParam: null
	        };
	    }

	    _createClass(ReceiverRouter, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var _this = this;

	            (0, _director.Router)({
	                "/addreceiver": function addreceiver() {
	                    _this.setState({
	                        currentRoute: "addreceiver"
	                    });
	                },
	                "/updatereceiver/:id": function updatereceiverId(id) {
	                    _this.setState({
	                        currentRoute: "updatereceiver",
	                        currentParam: { id: id }
	                    });
	                },
	                "/receiver": function receiver() {
	                    _this.setState({
	                        currentRoute: "index"
	                    });
	                },
	                "/": function _() {
	                    _this.setState({
	                        currentRoute: "index"
	                    });
	                }
	            }).init("/");
	        }
	    }, {
	        key: "shouldComponentUpdate",
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            if (nextState.currentRoute === "updatereceiver" && this.state.currentRoute !== "updatereceiver") {
	                var dispatch = this.props.dispatch;

	                dispatch((0, _actionEs6.fetchReceiver)("/updatereceiver/" + nextState.currentParam.id));
	                return false;
	            }
	            // start requestReceiver
	            if (this.state.currentRoute === "updatereceiver" && nextProps.receiverByForm.receiver === null) {
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _state = this.state;
	            var currentRoute = _state.currentRoute;
	            var currentParam = _state.currentParam;
	            var dispatch = this.props.dispatch;

	            var currentView = null;
	            if (currentRoute === "index") {
	                currentView = _react2["default"].createElement(_partialReceiverJsx2["default"], _extends({}, this.props.receiverByUser, { dispatch: dispatch, key: currentRoute }));
	            } else if (currentRoute === "addreceiver") {
	                currentView = _react2["default"].createElement(_partialAddreceiverJsx2["default"], _extends({}, this.props.receiverByForm, { dispatch: dispatch, key: currentRoute }));
	            } else if (currentRoute === "updatereceiver") {
	                currentView = _react2["default"].createElement(_partialUpdatereceiverJsx2["default"], _extends({}, this.props.receiverByForm, currentParam, { dispatch: dispatch,
	                    key: currentRoute }));
	            }
	            var transitionName = currentRoute !== 'index' ? 'moveRight' : 'moveLeft';
	            return _react2["default"].createElement(
	                _reactLibReactCSSTransitionGroup2["default"],
	                { component: "div", transitionName: transitionName,
	                    transitionLeave: false,
	                    transitionEnterTimeout: 500, transitionLeaveTimeout: 300 },
	                currentView
	            );
	        }
	    }]);

	    return ReceiverRouter;
	})(_react.Component);

	exports["default"] = ReceiverRouter;
	module.exports = exports["default"];

/***/ },
/* 317 */
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

	var _componentIconJsx = __webpack_require__(240);

	var _componentIconJsx2 = _interopRequireDefault(_componentIconJsx);

	var _componentFormCheckboxJsx = __webpack_require__(253);

	var _componentFormCheckboxJsx2 = _interopRequireDefault(_componentFormCheckboxJsx);

	var Receiver = (function (_Component) {
	    _inherits(Receiver, _Component);

	    function Receiver() {
	        _classCallCheck(this, Receiver);

	        _get(Object.getPrototypeOf(Receiver.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Receiver, [{
	        key: "handleCheck",
	        value: function handleCheck(receiver, checked) {
	            var onCheck = this.props.onCheck;

	            onCheck(receiver);
	        }
	    }, {
	        key: "renderReceivers",
	        value: function renderReceivers() {
	            var _this = this;

	            var _props = this.props;
	            var receivers = _props.receivers;
	            var checkable = _props.checkable;
	            var checkedReceiver = _props.checkedReceiver;

	            if (receivers !== null) {
	                var receiversContent;
	                receiversContent = receivers.map(function (receiver, i) {
	                    var key = "receiver-" + i;
	                    var checked = checkedReceiver !== null ? checkedReceiver.id === receiver.id : false;
	                    var checkbox = checkable ? _react2["default"].createElement(_componentFormCheckboxJsx2["default"], { checked: checked,
	                        onChange: _this.handleCheck.bind(_this, receiver) }) : null;
	                    return _react2["default"].createElement(
	                        "div",
	                        { className: "order-time", key: key },
	                        _react2["default"].createElement(
	                            "p",
	                            null,
	                            receiver.name,
	                            _react2["default"].createElement(
	                                "span",
	                                { className: "mobNum" },
	                                receiver.mobileNumber
	                            ),
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                "【默认】"
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "p",
	                            null,
	                            "433101**********1011",
	                            _react2["default"].createElement(
	                                "em",
	                                null,
	                                "实名"
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "p",
	                            null,
	                            receiver.provinceName + receiver.cityName + receiver.districtName + receiver.address
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "toolsArea" },
	                            _react2["default"].createElement(
	                                "span",
	                                { className: "pen" },
	                                _react2["default"].createElement(
	                                    "a",
	                                    { href: "#/updatereceiver/" + receiver.id },
	                                    _react2["default"].createElement("em", null),
	                                    "修改"
	                                )
	                            ),
	                            _react2["default"].createElement(
	                                "span",
	                                { className: "del" },
	                                _react2["default"].createElement("em", null),
	                                "删除"
	                            )
	                        )
	                    );
	                });
	                return receiversContent;
	            }
	            return _react2["default"].createElement(
	                "div",
	                { className: "empty" },
	                _react2["default"].createElement("img", { src: "/client/images/empty_address.png" }),
	                _react2["default"].createElement(
	                    "span",
	                    null,
	                    "快来添加您的收货地址吧！"
	                ),
	                _react2["default"].createElement(
	                    "a",
	                    { href: "#", className: "empty_btn" },
	                    "添加新地址"
	                )
	            );
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "div",
	                { className: "receiver-content" },
	                _react2["default"].createElement(
	                    _commonHeaderJsx2["default"],
	                    null,
	                    "收货地址"
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "selectArea" },
	                    this.renderReceivers()
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "addBtns" },
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "#/addreceiver", className: "addBtn" },
	                        "添加新地址"
	                    )
	                )
	            );
	        }
	    }]);

	    return Receiver;
	})(_react.Component);

	Receiver.defaultProps = {
	    checkable: true,
	    checkedReceiver: null,
	    onCheck: function onCheck() {}
	};

	exports["default"] = Receiver;
	module.exports = exports["default"];

/***/ },
/* 318 */
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

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(231);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _commonHeaderJsx = __webpack_require__(217);

	var _commonHeaderJsx2 = _interopRequireDefault(_commonHeaderJsx);

	var _cascadeareaJsx = __webpack_require__(319);

	var _cascadeareaJsx2 = _interopRequireDefault(_cascadeareaJsx);

	var _actionEs6 = __webpack_require__(315);

	var _commonActionEs6 = __webpack_require__(270);

	var _componentAlertJsx = __webpack_require__(286);

	var _componentAlertJsx2 = _interopRequireDefault(_componentAlertJsx);

	var AddReceiver = (function (_Component) {
	    _inherits(AddReceiver, _Component);

	    function AddReceiver() {
	        _classCallCheck(this, AddReceiver);

	        _get(Object.getPrototypeOf(AddReceiver.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(AddReceiver, [{
	        key: "handleFieldChange",
	        value: function handleFieldChange(fieldName, e) {
	            e && e.preventDefault();
	            var dispatch = this.props.dispatch;

	            dispatch((0, _actionEs6.changeField)(fieldName, e.target.value));
	        }
	    }, {
	        key: "loadProvinces",
	        value: function loadProvinces() {
	            var dispatch = this.props.dispatch;

	            dispatch((0, _actionEs6.fetchProvinces)("/cascadearea", {
	                code: "",
	                isprovince: true
	            }));
	        }
	    }, {
	        key: "loadCities",
	        value: function loadCities(province) {
	            var dispatch = this.props.dispatch;

	            dispatch((0, _actionEs6.fetchCities)("/cascadearea", {
	                code: province,
	                isprovince: false
	            }));
	        }
	    }, {
	        key: "loadDistricts",
	        value: function loadDistricts(city) {
	            var dispatch = this.props.dispatch;

	            dispatch((0, _actionEs6.fetchDistricts)("/cascadearea", {
	                code: city,
	                isprovince: false
	            }));
	        }
	    }, {
	        key: "handleSave",
	        value: function handleSave(e) {
	            e && e.preventDefault();
	            var _props = this.props;
	            var receiver = _props.receiver;
	            var dispatch = _props.dispatch;
	            var provinces = _props.provinces;
	            var cities = _props.cities;
	            var districts = _props.districts;
	            var consignee = receiver.consignee;
	            var mobile = receiver.mobile;
	            var zipcode = receiver.zipcode;
	            var address = receiver.address;
	            var isDefault = receiver.isDefault;
	            var province = receiver.province;
	            var city = receiver.city;
	            var district = receiver.district;

	            var selectedProvince = _lodash2["default"].findWhere(provinces, { value: province });
	            var selectedCity = _lodash2["default"].findWhere(cities, { value: city });
	            var selectedDistrict = _lodash2["default"].findWhere(districts, { value: district });
	            dispatch((0, _actionEs6.saveReceiver)({
	                consignee: consignee, mobile: mobile, zipcode: zipcode, address: address,
	                isdefault: isDefault,
	                province: selectedProvince.label,
	                provincecode: selectedProvince.value,
	                city: selectedCity.label,
	                citycode: selectedCity.value,
	                district: selectedDistrict.label,
	                districtcode: selectedDistrict.value
	            }));
	        }
	    }, {
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(nextProps) {
	            var dispatch = this.props.dispatch;

	            if (nextProps.receiverSaving === false && this.props.receiverSaving === true) {
	                if (nextProps.receiverSaved === true) {
	                    dispatch((0, _commonActionEs6.alert)("提交成功!", 2000));
	                    setTimeout(function () {
	                        return window.location.replace("/receiver");
	                    }, 2500);
	                } else {
	                    dispatch((0, _commonActionEs6.alert)(nextProps.errMsg, 2000));
	                }
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _props2 = this.props;
	            var saveSuccess = _props2.saveSuccess;
	            var alertActive = _props2.alertActive;
	            var alertContent = _props2.alertContent;
	            var receiver = _props2.receiver;

	            var _ref = receiver === null ? {} : receiver;

	            var consignee = _ref.consignee;
	            var mobile = _ref.mobile;
	            var zipcode = _ref.zipcode;
	            var address = _ref.address;
	            var isDefault = _ref.isDefault;
	            var province = _ref.province;
	            var city = _ref.city;
	            var district = _ref.district;

	            return _react2["default"].createElement(
	                "div",
	                { className: "receiver-form-content" },
	                _react2["default"].createElement(
	                    _commonHeaderJsx2["default"],
	                    null,
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "title" },
	                        "添加新地址"
	                    ),
	                    _react2["default"].createElement(
	                        "a",
	                        { className: "screening", href: "javascript:void(0);" },
	                        "保存"
	                    )
	                ),
	                _react2["default"].createElement(
	                    "p",
	                    { className: "prompt" },
	                    "温馨提示：收件人请使用和身份证号对应的真实姓名，否则您购买的商品将无法通过海关检查！"
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "receiver-form" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "receiver-form-fieldset" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "receiver-form-row" },
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                "*"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-label" },
	                                "姓名"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-field" },
	                                _react2["default"].createElement("input", { type: "text", value: consignee,
	                                    onChange: this.handleFieldChange.bind(this, "consignee"),
	                                    placeholder: "建议输入您的真实姓名"
	                                })
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "receiver-form-row" },
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                "*"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-label" },
	                                "身份证号"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-field" },
	                                _react2["default"].createElement("input", { type: "text", value: mobile,
	                                    placeholder: "填写后，我们会加密处理",
	                                    onChange: this.handleFieldChange.bind(this, "mobile") })
	                            )
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "receiver-form-fieldset" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "receiver-form-row" },
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                "*"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-label" },
	                                "手机号码"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-field" },
	                                _react2["default"].createElement("input", { type: "text", value: mobile,
	                                    placeholder: "请输入您的手机号",
	                                    onChange: this.handleFieldChange.bind(this, "mobile") })
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "receiver-form-row" },
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                "*"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-label" },
	                                "收货地址"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-field" },
	                                _react2["default"].createElement(_cascadeareaJsx2["default"], _extends({}, this.props, {
	                                    changeField: _actionEs6.changeField,
	                                    loadProvinces: this.loadProvinces.bind(this),
	                                    loadCities: this.loadCities.bind(this),
	                                    loadDistricts: this.loadDistricts.bind(this) }))
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "receiver-form-row receiver-form-textarea-row" },
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                "*"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-label" },
	                                "详细地址"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-field" },
	                                _react2["default"].createElement("textarea", { value: address,
	                                    onChange: this.handleFieldChange.bind(this, "address"),
	                                    placeholder: "请输入详细地址" })
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "receiver-form-row" },
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                "*"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-label" },
	                                "邮编"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-field" },
	                                _react2["default"].createElement("input", { type: "text", value: zipcode,
	                                    onChange: this.handleFieldChange.bind(this, "zipcode"),
	                                    placeholder: "请输入邮编" })
	                            )
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    _componentAlertJsx2["default"],
	                    { active: alertActive },
	                    alertContent
	                )
	            );
	        }
	    }]);

	    return AddReceiver;
	})(_react.Component);

	exports["default"] = AddReceiver;
	module.exports = exports["default"];

/***/ },
/* 319 */
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

	var _componentSelectedSelectedslideJsx = __webpack_require__(320);

	var _componentSelectedSelectedslideJsx2 = _interopRequireDefault(_componentSelectedSelectedslideJsx);

	var CascadeArea = (function (_Component) {
	    _inherits(CascadeArea, _Component);

	    function CascadeArea() {
	        _classCallCheck(this, CascadeArea);

	        _get(Object.getPrototypeOf(CascadeArea.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(CascadeArea, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var loadProvinces = this.props.loadProvinces;

	            loadProvinces();
	        }
	    }, {
	        key: "componentDidUpdate",
	        value: function componentDidUpdate(prevProps, prevState) {
	            var _props = this.props;
	            var receiver = _props.receiver;
	            var loadCities = _props.loadCities;
	            var loadDistricts = _props.loadDistricts;

	            var province = receiver === null ? "" : receiver.province;
	            var city = receiver === null ? "" : receiver.city;
	            if (prevProps.provinces.length === 1 && this.props.provinces.length > 1 && province !== undefined) {
	                loadCities(province);
	            }
	            if (prevProps.cities.length === 1 && this.props.cities.length > 1 && city !== undefined) {
	                loadDistricts(city);
	            }
	        }
	    }, {
	        key: "handleProvinceChange",
	        value: function handleProvinceChange(province) {
	            var _props2 = this.props;
	            var dispatch = _props2.dispatch;
	            var changeField = _props2.changeField;
	            var loadCities = _props2.loadCities;

	            dispatch(changeField("province", province));
	            loadCities(province);
	        }
	    }, {
	        key: "handleCityChange",
	        value: function handleCityChange(city) {
	            var _props3 = this.props;
	            var dispatch = _props3.dispatch;
	            var changeField = _props3.changeField;
	            var loadDistricts = _props3.loadDistricts;

	            dispatch(changeField("city", city));
	            loadDistricts(city);
	        }
	    }, {
	        key: "handleDistrictChange",
	        value: function handleDistrictChange(district) {
	            var _props4 = this.props;
	            var dispatch = _props4.dispatch;
	            var changeField = _props4.changeField;

	            dispatch(changeField("district", district));
	        }
	    }, {
	        key: "renderProvince",
	        value: function renderProvince() {
	            var _props5 = this.props;
	            var provinces = _props5.provinces;
	            var receiver = _props5.receiver;

	            var province = receiver === null ? "" : receiver.province;
	            if (provinces.length > 1) {
	                return _react2["default"].createElement(_componentSelectedSelectedslideJsx2["default"], { options: provinces,
	                    maxHeight: "8rem",
	                    value: province, onChange: this.handleProvinceChange.bind(this) });
	            }
	            return null;
	        }
	    }, {
	        key: "renderCity",
	        value: function renderCity() {
	            var _props6 = this.props;
	            var cities = _props6.cities;
	            var receiver = _props6.receiver;
	            var handleFieldChange = _props6.handleFieldChange;

	            var city = receiver === null ? "" : receiver.city;
	            return _react2["default"].createElement(_componentSelectedSelectedslideJsx2["default"], { options: cities,
	                maxHeight: "8rem",
	                value: city, onChange: this.handleCityChange.bind(this) });
	        }
	    }, {
	        key: "renderDistrict",
	        value: function renderDistrict() {
	            var _props7 = this.props;
	            var districts = _props7.districts;
	            var receiver = _props7.receiver;
	            var handleFieldChange = _props7.handleFieldChange;

	            var district = receiver === null ? "" : receiver.district;
	            // console.log('district',districts)
	            return _react2["default"].createElement(_componentSelectedSelectedslideJsx2["default"], { options: districts,
	                maxHeight: "8rem",
	                value: district, onChange: this.handleDistrictChange.bind(this) });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "div",
	                { className: "cascade-area" },
	                this.renderProvince(),
	                this.renderCity(),
	                this.renderDistrict()
	            );
	        }
	    }]);

	    return CascadeArea;
	})(_react.Component);

	exports["default"] = CascadeArea;
	module.exports = exports["default"];

/***/ },
/* 320 */
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

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(234);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _dropdownJsx = __webpack_require__(275);

	var _dropdownJsx2 = _interopRequireDefault(_dropdownJsx);

	var _iconJsx = __webpack_require__(240);

	var _iconJsx2 = _interopRequireDefault(_iconJsx);

	var _sliderSliderJsx = __webpack_require__(321);

	var _sliderSliderJsx2 = _interopRequireDefault(_sliderSliderJsx);

	var _sliderSlideJsx = __webpack_require__(322);

	var _sliderSlideJsx2 = _interopRequireDefault(_sliderSlideJsx);

	var SelectedSlide = (function (_Component) {
	    _inherits(SelectedSlide, _Component);

	    function SelectedSlide(props) {
	        _classCallCheck(this, SelectedSlide);

	        _get(Object.getPrototypeOf(SelectedSlide.prototype), "constructor", this).call(this, props);
	        this.state = {
	            value: this.props.value
	        };
	    }

	    _createClass(SelectedSlide, [{
	        key: "getValue",
	        value: function getValue() {
	            return this.state.value;
	        }
	    }, {
	        key: "hasValue",
	        value: function hasValue(value) {
	            return value === this.state.value;
	            // return this.getValueArray().indexOf(value) > -1;
	        }
	    }, {
	        key: "setValue",
	        value: function setValue(value, activeIndex) {
	            var _this = this;

	            this.setState({
	                value: value,
	                activeIndex: activeIndex
	            }, function () {
	                _this.props.onChange(value);
	            });
	        }
	    }, {
	        key: "handleCheck",
	        value: function handleCheck(activeIndex, e) {
	            e && e.preventDefault();
	            var checkedOption;
	            this.props.options.forEach(function (option, i) {
	                if (activeIndex === i) {
	                    checkedOption = option;
	                }
	            });
	            var selectedValue = checkedOption.value;
	            this.setValue(selectedValue, activeIndex);
	            // this.refs.dropdown.setDropdownState(false);
	        }
	    }, {
	        key: "renderStatus",
	        value: function renderStatus(labels) {
	            return labels.map(function (label) {
	                return _react2["default"].createElement(
	                    "div",
	                    { className: "selected-label" },
	                    label
	                );
	            });
	        }
	    }, {
	        key: "renderItem",
	        value: function renderItem() {
	            var _this2 = this;

	            var selectedLabels = [];
	            var activeIndex;
	            var items = [];
	            var groupHeader;
	            var _props = this.props;
	            var selectedIcon = _props.selectedIcon;
	            var unselectedIcon = _props.unselectedIcon;

	            this.props.options.forEach(function (option, i) {
	                var checked = _this2.hasValue(option.value);
	                var checkedClass = checked ? "checked" : null;
	                var checkedIcon = checked ? _react2["default"].createElement(_iconJsx2["default"], { icon: selectedIcon }) : unselectedIcon === null ? null : _react2["default"].createElement(_iconJsx2["default"], { icon: unselectedIcon });
	                checked && selectedLabels.push(option.label);
	                checked && (activeIndex = i);
	                items.push(_react2["default"].createElement(
	                    _sliderSlideJsx2["default"],
	                    { className: checkedClass,
	                        key: "item-" + i },
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "selected-item" },
	                        option.label
	                    ),
	                    checkedIcon
	                ));
	            });
	            // console.log('selectedLabels',selectedLabels)

	            return { selectedLabels: selectedLabels, activeIndex: activeIndex, items: items };
	        }
	    }, {
	        key: "redrawSlider",
	        value: function redrawSlider() {
	            var slider = this.refs.dropdownSlide;
	            // if(slider.isMounted){
	            slider.initialize();
	            // }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var classes = (0, _classnames2["default"])(this.props.className, "selected", "selected-slide");

	            var _renderItem = this.renderItem();

	            var items = _renderItem.items;
	            var selectedLabels = _renderItem.selectedLabels;
	            var activeIndex = _renderItem.activeIndex;

	            var status = _react2["default"].createElement(
	                "span",
	                { className: "status" },
	                selectedLabels.length > 0 ? selectedLabels.length > 1 ? this.renderStatus(selectedLabels) : selectedLabels.join(",") : _react2["default"].createElement(
	                    "span",
	                    { className: "placeholder" },
	                    this.props.placeholder
	                )
	            );
	            // console.log('items',this.props.options,items)
	            return _react2["default"].createElement(
	                _dropdownJsx2["default"],
	                _extends({ className: classes, title: status,
	                    onOpen: this.redrawSlider.bind(this),
	                    ref: "dropdown" }, this.props),
	                _react2["default"].createElement(
	                    _sliderSliderJsx2["default"],
	                    {
	                        controlNav: false,
	                        autoPlay: false,
	                        loop: false,
	                        onChange: this.handleCheck.bind(this),
	                        defaultActiveIndex: activeIndex,
	                        oriention: "vertical", ref: "dropdownSlide" },
	                    items
	                ),
	                _react2["default"].createElement("input", { type: "hidden", value: this.state.value })
	            );
	        }
	    }]);

	    return SelectedSlide;
	})(_react.Component);

	SelectedSlide.defaultProps = {
	    placeholder: "点击请选择...",
	    selectedIcon: "ok",
	    unselectedIcon: null,
	    maxHeight: null,
	    minWidth: null,
	    infinity: false,
	    onChange: function onChange() {}
	};

	exports["default"] = SelectedSlide;
	module.exports = exports["default"];

/***/ },
/* 321 */
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
/* 322 */
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
/* 323 */
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

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(231);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _commonHeaderJsx = __webpack_require__(217);

	var _commonHeaderJsx2 = _interopRequireDefault(_commonHeaderJsx);

	var _commonCascadeareaJsx = __webpack_require__(324);

	var _commonCascadeareaJsx2 = _interopRequireDefault(_commonCascadeareaJsx);

	var _actionEs6 = __webpack_require__(315);

	var _commonActionEs6 = __webpack_require__(270);

	var _componentAlertJsx = __webpack_require__(286);

	var _componentAlertJsx2 = _interopRequireDefault(_componentAlertJsx);

	var UpdateReceiver = (function (_Component) {
	    _inherits(UpdateReceiver, _Component);

	    function UpdateReceiver() {
	        _classCallCheck(this, UpdateReceiver);

	        _get(Object.getPrototypeOf(UpdateReceiver.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(UpdateReceiver, [{
	        key: "handleFieldChange",
	        value: function handleFieldChange(fieldName, e) {
	            e && e.preventDefault();
	            var dispatch = this.props.dispatch;

	            dispatch((0, _actionEs6.changeField)(fieldName, e.target.value));
	        }
	    }, {
	        key: "loadProvinces",
	        value: function loadProvinces() {
	            var dispatch = this.props.dispatch;

	            dispatch((0, _actionEs6.fetchProvinces)("/cascadearea", {
	                code: "",
	                isprovince: true
	            }));
	        }
	    }, {
	        key: "loadCities",
	        value: function loadCities(province) {
	            var dispatch = this.props.dispatch;

	            dispatch((0, _actionEs6.fetchCities)("/cascadearea", {
	                code: province,
	                isprovince: false
	            }));
	        }
	    }, {
	        key: "loadDistricts",
	        value: function loadDistricts(city) {
	            var dispatch = this.props.dispatch;

	            dispatch((0, _actionEs6.fetchDistricts)("/cascadearea", {
	                code: city,
	                isprovince: false
	            }));
	        }
	    }, {
	        key: "handleSave",
	        value: function handleSave(e) {
	            e && e.preventDefault();
	            var _props = this.props;
	            var receiver = _props.receiver;
	            var dispatch = _props.dispatch;
	            var provinces = _props.provinces;
	            var cities = _props.cities;
	            var districts = _props.districts;
	            var id = receiver.id;
	            var consignee = receiver.consignee;
	            var mobile = receiver.mobile;
	            var zipcode = receiver.zipcode;
	            var address = receiver.address;
	            var isDefault = receiver.isDefault;
	            var province = receiver.province;
	            var city = receiver.city;
	            var district = receiver.district;

	            var selectedProvince = _lodash2["default"].findWhere(provinces, { value: province });
	            var selectedCity = _lodash2["default"].findWhere(cities, { value: city });
	            var selectedDistrict = _lodash2["default"].findWhere(districts, { value: district });
	            dispatch((0, _actionEs6.saveReceiver)({
	                id: id, consignee: consignee, mobile: mobile, zipcode: zipcode, address: address,
	                isdefault: isDefault,
	                province: selectedProvince.label,
	                provincecode: selectedProvince.value,
	                city: selectedCity.label,
	                citycode: selectedCity.value,
	                district: selectedDistrict.label,
	                districtcode: selectedDistrict.value
	            }));
	        }
	    }, {
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(nextProps) {
	            var dispatch = this.props.dispatch;

	            if (nextProps.receiverSaving === false && this.props.receiverSaving === true) {
	                if (nextProps.receiverSaved === true) {
	                    dispatch((0, _commonActionEs6.alert)("提交成功!", 2000));
	                    setTimeout(function () {
	                        return window.location.replace("/receiver");
	                    }, 2500);
	                } else {
	                    dispatch((0, _commonActionEs6.alert)(nextProps.errMsg, 2000));
	                }
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _props2 = this.props;
	            var saveSuccess = _props2.saveSuccess;
	            var alertActive = _props2.alertActive;
	            var alertContent = _props2.alertContent;
	            var receiver = _props2.receiver;
	            var consignee = receiver.consignee;
	            var mobile = receiver.mobile;
	            var zipcode = receiver.zipcode;
	            var address = receiver.address;
	            var isDefault = receiver.isDefault;
	            var province = receiver.province;
	            var city = receiver.city;
	            var district = receiver.district;

	            return _react2["default"].createElement(
	                "div",
	                { className: "receiver-form-content" },
	                _react2["default"].createElement(
	                    _commonHeaderJsx2["default"],
	                    null,
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "title" },
	                        "修改收货地址"
	                    ),
	                    _react2["default"].createElement(
	                        "a",
	                        { className: "screening", href: "javascript:void(0);" },
	                        "保存"
	                    )
	                ),
	                _react2["default"].createElement(
	                    "p",
	                    { className: "prompt" },
	                    "温馨提示：收件人请使用和身份证号对应的真实姓名，否则您购买的商品将无法通过海关检查！"
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "receiver-form" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "receiver-form-fieldset" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "receiver-form-row" },
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                "*"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-label" },
	                                "姓名"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-field" },
	                                _react2["default"].createElement("input", { type: "text", value: consignee,
	                                    onChange: this.handleFieldChange.bind(this, "consignee"),
	                                    placeholder: "建议输入您的真实姓名"
	                                })
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "receiver-form-row" },
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                "*"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-label" },
	                                "身份证号"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-field" },
	                                _react2["default"].createElement("input", { type: "text", value: mobile,
	                                    placeholder: "填写后，我们会加密处理",
	                                    onChange: this.handleFieldChange.bind(this, "mobile") })
	                            )
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "receiver-form-fieldset" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "receiver-form-row" },
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                "*"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-label" },
	                                "手机号码"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-field" },
	                                _react2["default"].createElement("input", { type: "text", value: mobile,
	                                    placeholder: "请输入您的手机号",
	                                    onChange: this.handleFieldChange.bind(this, "mobile") })
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "receiver-form-row" },
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                "*"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-label" },
	                                "收货地址"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-field" },
	                                _react2["default"].createElement(_commonCascadeareaJsx2["default"], _extends({}, this.props, {
	                                    changeField: _actionEs6.changeField,
	                                    loadProvinces: this.loadProvinces.bind(this),
	                                    loadCities: this.loadCities.bind(this),
	                                    loadDistricts: this.loadDistricts.bind(this) }))
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "receiver-form-row receiver-form-textarea-row" },
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                "*"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-label" },
	                                "详细地址"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-field" },
	                                _react2["default"].createElement("textarea", { value: address,
	                                    onChange: this.handleFieldChange.bind(this, "address"),
	                                    placeholder: "请输入详细地址" })
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "receiver-form-row" },
	                            _react2["default"].createElement(
	                                "i",
	                                null,
	                                "*"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-label" },
	                                "邮编"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "receiver-form-field" },
	                                _react2["default"].createElement("input", { type: "text", value: zipcode,
	                                    onChange: this.handleFieldChange.bind(this, "zipcode"),
	                                    placeholder: "请输入邮编" })
	                            )
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    _componentAlertJsx2["default"],
	                    { active: alertActive },
	                    alertContent
	                )
	            );
	        }
	    }]);

	    return UpdateReceiver;
	})(_react.Component);

	exports["default"] = UpdateReceiver;
	module.exports = exports["default"];

/***/ },
/* 324 */
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

	var _componentSelectedSelectedslideJsx = __webpack_require__(320);

	var _componentSelectedSelectedslideJsx2 = _interopRequireDefault(_componentSelectedSelectedslideJsx);

	var CascadeArea = (function (_Component) {
	    _inherits(CascadeArea, _Component);

	    function CascadeArea() {
	        _classCallCheck(this, CascadeArea);

	        _get(Object.getPrototypeOf(CascadeArea.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(CascadeArea, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var loadProvinces = this.props.loadProvinces;

	            loadProvinces();
	        }
	    }, {
	        key: "componentDidUpdate",
	        value: function componentDidUpdate(prevProps, prevState) {
	            var _props = this.props;
	            var receiver = _props.receiver;
	            var loadCities = _props.loadCities;
	            var loadDistricts = _props.loadDistricts;

	            var province = receiver === null ? "" : receiver.province;
	            var city = receiver === null ? "" : receiver.city;
	            if (prevProps.provinces.length === 1 && this.props.provinces.length > 1 && province !== undefined) {
	                loadCities(province);
	            }
	            if (prevProps.cities.length === 1 && this.props.cities.length > 1 && city !== undefined) {
	                loadDistricts(city);
	            }
	        }
	    }, {
	        key: "handleProvinceChange",
	        value: function handleProvinceChange(province) {
	            var _props2 = this.props;
	            var dispatch = _props2.dispatch;
	            var changeField = _props2.changeField;
	            var loadCities = _props2.loadCities;

	            dispatch(changeField("province", province));
	            loadCities(province);
	        }
	    }, {
	        key: "handleCityChange",
	        value: function handleCityChange(city) {
	            var _props3 = this.props;
	            var dispatch = _props3.dispatch;
	            var changeField = _props3.changeField;
	            var loadDistricts = _props3.loadDistricts;

	            dispatch(changeField("city", city));
	            loadDistricts(city);
	        }
	    }, {
	        key: "handleDistrictChange",
	        value: function handleDistrictChange(district) {
	            var _props4 = this.props;
	            var dispatch = _props4.dispatch;
	            var changeField = _props4.changeField;

	            dispatch(changeField("district", district));
	        }
	    }, {
	        key: "renderProvince",
	        value: function renderProvince() {
	            var _props5 = this.props;
	            var provinces = _props5.provinces;
	            var receiver = _props5.receiver;

	            var province = receiver === null ? "" : receiver.province;
	            if (provinces.length > 1) {
	                return _react2["default"].createElement(
	                    "div",
	                    { className: "receiver-form-row" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "receiver-form-label" },
	                        "省份"
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "receiver-form-field" },
	                        _react2["default"].createElement(_componentSelectedSelectedslideJsx2["default"], { options: provinces,
	                            maxHeight: "8rem",
	                            value: province, onChange: this.handleProvinceChange.bind(this) })
	                    )
	                );
	            }
	            return null;
	        }
	    }, {
	        key: "renderCity",
	        value: function renderCity() {
	            var _props6 = this.props;
	            var cities = _props6.cities;
	            var receiver = _props6.receiver;
	            var handleFieldChange = _props6.handleFieldChange;

	            var city = receiver === null ? "" : receiver.city;
	            return _react2["default"].createElement(
	                "div",
	                { className: "receiver-form-row" },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "receiver-form-label" },
	                    "城市"
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "receiver-form-field" },
	                    _react2["default"].createElement(_componentSelectedSelectedslideJsx2["default"], { options: cities,
	                        maxHeight: "8rem",
	                        value: city, onChange: this.handleCityChange.bind(this) })
	                )
	            );
	        }
	    }, {
	        key: "renderDistrict",
	        value: function renderDistrict() {
	            var _props7 = this.props;
	            var districts = _props7.districts;
	            var receiver = _props7.receiver;
	            var handleFieldChange = _props7.handleFieldChange;

	            var district = receiver === null ? "" : receiver.district;
	            // console.log('district',districts)
	            return _react2["default"].createElement(
	                "div",
	                { className: "receiver-form-row" },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "receiver-form-label" },
	                    "区县"
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "receiver-form-field" },
	                    _react2["default"].createElement(_componentSelectedSelectedslideJsx2["default"], { options: districts,
	                        maxHeight: "8rem",
	                        value: district, onChange: this.handleDistrictChange.bind(this) })
	                )
	            );
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "div",
	                { className: "cascade-area" },
	                this.renderProvince(),
	                this.renderCity(),
	                this.renderDistrict()
	            );
	        }
	    }]);

	    return CascadeArea;
	})(_react.Component);

	exports["default"] = CascadeArea;
	module.exports = exports["default"];

/***/ },
/* 325 */
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
/* 326 */
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

	var _commonHeaderJsx = __webpack_require__(217);

	var _commonHeaderJsx2 = _interopRequireDefault(_commonHeaderJsx);

	var Coupon = (function (_Component) {
	    _inherits(Coupon, _Component);

	    function Coupon() {
	        _classCallCheck(this, Coupon);

	        _get(Object.getPrototypeOf(Coupon.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Coupon, [{
	        key: "handleCheck",
	        value: function handleCheck(coupon) {
	            var onCheck = this.props.onCheck;

	            onCheck(coupon);
	            window.history.back();
	        }
	    }, {
	        key: "renderCouponRow",
	        value: function renderCouponRow() {
	            var _this = this;

	            var coupons = this.props.coupons;

	            if (coupons.length === 0) {
	                return _react2["default"].createElement(
	                    "div",
	                    { className: "empty" },
	                    _react2["default"].createElement("img", { src: "/client/asset/images/empty_selectCoupon.png" }),
	                    _react2["default"].createElement(
	                        "span",
	                        null,
	                        "您目前没有可用优惠券哟~"
	                    )
	                );
	            }
	            return coupons.map(function (coupon, i) {
	                var key = "coupon-" + i;
	                return _react2["default"].createElement(
	                    "div",
	                    { className: "coupon haitao hover" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "left" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "price" },
	                            _react2["default"].createElement(
	                                "em",
	                                null,
	                                "¥"
	                            ),
	                            coupon.shortName
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "term" },
	                            coupon.assertion
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "right" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "kind" },
	                            "海外购www.tepin.hk"
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "date" },
	                            coupon.useDate,
	                            "-",
	                            coupon.validityDate
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "explain" },
	                            coupon.couponDesc
	                        )
	                    ),
	                    _react2["default"].createElement("div", { className: "selected", onClick: _this.handleCheck.bind(_this, coupon) })
	                );
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "div",
	                { className: "coupon-content" },
	                _react2["default"].createElement(
	                    _commonHeaderJsx2["default"],
	                    null,
	                    "选择优惠券"
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "listMain" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "list_youa" },
	                        this.renderCouponRow()
	                    )
	                )
	            );
	        }
	    }]);

	    return Coupon;
	})(_react.Component);

	exports["default"] = Coupon;
	module.exports = exports["default"];

/***/ },
/* 327 */
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
/* 328 */
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
/* 329 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);