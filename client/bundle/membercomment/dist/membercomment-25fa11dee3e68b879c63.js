webpackJsonp([15],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(435);
	module.exports = __webpack_require__(441);


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

/***/ 237:
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

	var _lodash = __webpack_require__(231);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _classnames = __webpack_require__(234);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _libDomEs6 = __webpack_require__(238);

	var GoTop = (function (_Component) {
	    _inherits(GoTop, _Component);

	    function GoTop(props) {
	        _classCallCheck(this, GoTop);

	        _get(Object.getPrototypeOf(GoTop.prototype), "constructor", this).call(this, props);
	        this.state = {
	            active: false
	        };
	    }

	    _createClass(GoTop, [{
	        key: "toggleVisble",
	        value: function toggleVisble() {
	            var scrollTop = _libUtilEs62["default"].scrollTop();
	            if (scrollTop > 50) {
	                this.setState({ active: true });
	            } else {
	                this.setState({ active: false });
	            }
	        }
	    }, {
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            //util.bindEvent(window,'scroll',_.debounce(this.toggleVisble.bind(this),100))
	        }
	    }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            //util.unbindEvent(window,'scroll',_.debounce(this.toggleVisble.bind(this),100))
	        }
	    }, {
	        key: "backToTop",
	        value: function backToTop() {
	            (0, _libDomEs6.smoothScroll)(window, 0);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var classes = (0, _classnames2["default"])({
	                "back-to-top": true,
	                "active": this.state.active
	            });

	            return _react2["default"].createElement(
	                "div",
	                { className: classes },
	                _react2["default"].createElement(
	                    "a",
	                    { href: null, onClick: this.backToTop },
	                    _react2["default"].createElement("span", { className: "iconfont icon-up-big" })
	                )
	            );
	        }
	    }]);

	    return GoTop;
	})(_react.Component);

	exports["default"] = GoTop;
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

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.changeField = changeField;
	exports.alert = alert;

	var _constantEs6 = __webpack_require__(262);

	function changeField(name, value) {
	    return {
	        type: _constantEs6.CHANGE_FIELD,
	        name: name,
	        value: value
	    };
	}

	function showAlert(content) {
	    return {
	        type: _constantEs6.SHOW_ALERT,
	        content: content
	    };
	}

	function hideAlert(content) {
	    return {
	        type: _constantEs6.HIDE_ALERT,
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

/***/ 262:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CHANGE_FIELD = "CHANGE_FIELD";
	exports.CHANGE_FIELD = CHANGE_FIELD;
	var SHOW_ALERT = "SHOW_ALERT";
	exports.SHOW_ALERT = SHOW_ALERT;
	var HIDE_ALERT = "HIDE_ALERT";
	exports.HIDE_ALERT = HIDE_ALERT;

/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(210)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.alertReducer = alertReducer;

	var _actionEs6 = __webpack_require__(261);

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

/***/ 281:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Array$from = __webpack_require__(282)["default"];

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

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(283), __esModule: true };

/***/ },

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(284);
	__webpack_require__(300);
	module.exports = __webpack_require__(16).Array.from;

/***/ },

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(285)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(287)(String, 'String', function(iterated){
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

/***/ 285:
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(286)
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

/***/ 286:
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },

/***/ 287:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY         = __webpack_require__(288)
	  , $def            = __webpack_require__(14)
	  , $redef          = __webpack_require__(289)
	  , hide            = __webpack_require__(290)
	  , has             = __webpack_require__(293)
	  , SYMBOL_ITERATOR = __webpack_require__(294)('iterator')
	  , Iterators       = __webpack_require__(297)
	  , $iterCreate     = __webpack_require__(298)
	  , setToStringTag  = __webpack_require__(299)
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

/***/ 288:
/***/ function(module, exports) {

	module.exports = true;

/***/ },

/***/ 289:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(290);

/***/ },

/***/ 290:
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(7)
	  , createDesc = __webpack_require__(291);
	module.exports = __webpack_require__(292) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },

/***/ 291:
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

/***/ 292:
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },

/***/ 293:
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },

/***/ 294:
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(295)('wks')
	  , uid    = __webpack_require__(296)
	  , Symbol = __webpack_require__(15).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },

/***/ 295:
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },

/***/ 296:
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },

/***/ 297:
/***/ function(module, exports) {

	module.exports = {};

/***/ },

/***/ 298:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(7)
	  , descriptor     = __webpack_require__(291)
	  , setToStringTag = __webpack_require__(299)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(290)(IteratorPrototype, __webpack_require__(294)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },

/***/ 299:
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(7).setDesc
	  , has = __webpack_require__(293)
	  , TAG = __webpack_require__(294)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(25)
	  , $def        = __webpack_require__(14)
	  , toObject    = __webpack_require__(214)
	  , call        = __webpack_require__(301)
	  , isArrayIter = __webpack_require__(302)
	  , toLength    = __webpack_require__(303)
	  , getIterFn   = __webpack_require__(304);
	$def($def.S + $def.F * !__webpack_require__(306)(function(iter){ Array.from(iter); }), 'Array', {
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

/***/ 301:
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

/***/ 302:
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(297)
	  , ITERATOR   = __webpack_require__(294)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return (Iterators.Array || ArrayProto[ITERATOR]) === it;
	};

/***/ },

/***/ 303:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(286)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },

/***/ 304:
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(305)
	  , ITERATOR  = __webpack_require__(294)('iterator')
	  , Iterators = __webpack_require__(297);
	module.exports = __webpack_require__(16).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },

/***/ 305:
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(11)
	  , TAG = __webpack_require__(294)('toStringTag')
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

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(294)('iterator')
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

/***/ 313:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _toConsumableArray = __webpack_require__(281)["default"];

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

/***/ 314:
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

/***/ 435:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)["default"];

	var _sharedChunkMembercommentAppJsx = __webpack_require__(436);

	var _sharedChunkMembercommentAppJsx2 = _interopRequireDefault(_sharedChunkMembercommentAppJsx);

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(218);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function bootstrap() {
	    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
	    _reactDom2["default"].render(_react2["default"].createElement(_sharedChunkMembercommentAppJsx2["default"], { initialState: initialState }), document.getElementById('member-comment'));
	}

	if (typeof window.addEventListener) {
	    window.addEventListener("DOMContentLoaded", bootstrap);
	} else {
	    window.attachEvent('onload', bootstrap);
	}

/***/ },

/***/ 436:
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

	var _reducerEs6 = __webpack_require__(437);

	var _reducerEs62 = _interopRequireDefault(_reducerEs6);

	var _redux = __webpack_require__(197);

	var _libReduxHelperEs6 = __webpack_require__(208);

	var _libReduxHelperEs62 = _interopRequireDefault(_libReduxHelperEs6);

	var _componentJsx = __webpack_require__(439);

	var _componentJsx2 = _interopRequireDefault(_componentJsx);

	function selector(state) {
	    var _state$commentByUser = state.commentByUser;
	    var allComment = _state$commentByUser.allComment;
	    var showComment = _state$commentByUser.showComment;
	    var isFetching = _state$commentByUser.isFetching;
	    var isFetched = _state$commentByUser.isFetched;

	    return {
	        allComment: allComment,
	        showComment: showComment,
	        isFetched: isFetched,
	        isFetching: isFetching
	    };
	}

	var CommentListConnected = (0, _reactRedux.connect)(selector)(_componentJsx2["default"]);

	function configureStore(initialState) {
	    var store = (0, _libReduxHelperEs62["default"])(_reducerEs62["default"], initialState);
	    return store;
	}

	var CommentApp = (function (_Component) {
	    _inherits(CommentApp, _Component);

	    function CommentApp(props) {
	        _classCallCheck(this, CommentApp);

	        _get(Object.getPrototypeOf(CommentApp.prototype), "constructor", this).call(this, props);
	    }

	    _createClass(CommentApp, [{
	        key: "render",
	        value: function render() {
	            var _props$initialState = this.props.initialState;
	            var allComment = _props$initialState.allComment;
	            var showComment = _props$initialState.showComment;
	            var isFetched = _props$initialState.isFetched;

	            var initialState = {
	                commentByUser: {
	                    allComment: allComment,
	                    showComment: showComment,
	                    isFetched: isFetched,
	                    isFetching: false
	                }
	            };
	            var store = configureStore(initialState);
	            return _react2["default"].createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2["default"].createElement(CommentListConnected, null)
	            );
	        }
	    }]);

	    return CommentApp;
	})(_react.Component);

	exports["default"] = CommentApp;
	module.exports = exports["default"];

/***/ },

/***/ 437:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(210)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(197);

	var _actionEs6 = __webpack_require__(438);

	var _commonActionEs6 = __webpack_require__(261);

	var _commonReducerEs6 = __webpack_require__(263);

	function commentByUser(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _actionEs6.REQUEST_COMMENT:
	            return _Object$assign({}, state, {
	                isFetching: true
	            });
	        case _actionEs6.RECEIVE_COMMENT:
	            return _Object$assign({}, state, {
	                isFetching: false
	            }, action.res);
	        case _commonActionEs6.SHOW_ALERT:
	        case _commonActionEs6.HIDE_ALERT:
	            return (0, _commonReducerEs6.alertReducer)(state, action);
	        default:
	            return state;
	    }
	}

	var rootReducer = (0, _redux.combineReducers)({
	    commentByUser: commentByUser
	});

	exports["default"] = rootReducer;
	module.exports = exports["default"];

/***/ },

/***/ 438:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = fetchComment;

	var _libUtilEs6 = __webpack_require__(227);

	var REQUEST_COMMENT = "REQUEST_COMMENT";
	exports.REQUEST_COMMENT = REQUEST_COMMENT;
	var RECEIVE_COMMENT = "RECEIVE_COMMENT";

	exports.RECEIVE_COMMENT = RECEIVE_COMMENT;
	function requestComment(param) {
	    return {
	        type: REQUEST_COMMENT,
	        param: param
	    };
	}

	function receiveComment(param, res) {
	    return {
	        type: RECEIVE_COMMENT,
	        receiveAt: Date.now(),
	        param: param,
	        res: res
	    };
	}

	function fetchComment(url, param) {
	    return function (dispatch) {
	        dispatch(requestComment(param));
	        return (0, _libUtilEs6.apiRequest)(url, param).then(function (res) {
	            dispatch(receiveComment(param, res));
	        });
	    };
	}

/***/ },

/***/ 439:
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

	var _componentGotopJsx = __webpack_require__(237);

	var _componentGotopJsx2 = _interopRequireDefault(_componentGotopJsx);

	var _componentRefresherJsx = __webpack_require__(235);

	var _componentRefresherJsx2 = _interopRequireDefault(_componentRefresherJsx);

	var _actionEs6 = __webpack_require__(438);

	var _actionEs62 = _interopRequireDefault(_actionEs6);

	var _componentSlidetabsJsx = __webpack_require__(375);

	var _componentSliderSliderJsx = __webpack_require__(313);

	var _componentSliderSliderJsx2 = _interopRequireDefault(_componentSliderSliderJsx);

	var _componentSliderSlideJsx = __webpack_require__(314);

	var _componentSliderSlideJsx2 = _interopRequireDefault(_componentSliderSlideJsx);

	var _commonHeaderJsx = __webpack_require__(217);

	var _commonHeaderJsx2 = _interopRequireDefault(_commonHeaderJsx);

	var _partialFloorJsx = __webpack_require__(440);

	var _partialFloorJsx2 = _interopRequireDefault(_partialFloorJsx);

	var CommentList = (function (_Component) {
	    _inherits(CommentList, _Component);

	    function CommentList(props) {
	        _classCallCheck(this, CommentList);

	        _get(Object.getPrototypeOf(CommentList.prototype), "constructor", this).call(this, props);
	        this.state = {
	            displayFlag: 0
	        };
	    }

	    _createClass(CommentList, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var _this = this;

	            _libUtilEs62["default"].registerPullDownEvent((function () {
	                _this.beginRefresh(1);
	            }).bind(this));
	        }
	    }, {
	        key: "beginRefresh",
	        value: function beginRefresh(interval, flag) {
	            var _props = this.props;
	            var allComment = _props.allComment;
	            var showComment = _props.showComment;
	            var isFetching = _props.isFetching;
	            var dispatch = _props.dispatch;

	            var comments = allComment,
	                fetchLink = "/membercenter/comment",
	                pageCount = 1,
	                nextPage = 1;
	            var flag = flag != undefined ? flag : this.state.displayFlag;
	            if (flag === 1) {
	                fetchLink = "/membercenter/showcomment";
	                comments = showComment;
	            }
	            if (comments) {
	                pageCount = Math.ceil(comments.totalCount / comments.pageSize);
	                nextPage = comments.pageIndex + interval;
	            };
	            if (pageCount < nextPage || isFetching) {
	                return false;
	            }
	            dispatch((0, _actionEs62["default"])(fetchLink, {
	                pageIndex: nextPage
	            }));
	        }
	    }, {
	        key: "toggleFlag",
	        value: function toggleFlag(flag, e) {
	            e && e.preventDefault();
	            this.setState({
	                displayFlag: flag
	            });
	            this.beginRefresh(0, flag);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _props2 = this.props;
	            var allComment = _props2.allComment;
	            var showComment = _props2.showComment;
	            var isFetching = _props2.isFetching;

	            return _react2["default"].createElement(
	                "div",
	                { className: "comment-content" },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "comment-header" },
	                    _react2["default"].createElement(
	                        _commonHeaderJsx2["default"],
	                        null,
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "title" },
	                            "我的评论"
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "tab-content" },
	                    _react2["default"].createElement(
	                        _componentSlidetabsJsx.SlideTabs,
	                        { axis: "x", activeIndex: this.state.displayFlag, onSelect: this.toggleFlag.bind(this) },
	                        _react2["default"].createElement(
	                            _componentSlidetabsJsx.SlideTabsItem,
	                            { navigator: function () {
	                                    return _react2["default"].createElement(
	                                        "span",
	                                        null,
	                                        _react2["default"].createElement(
	                                            "b",
	                                            null,
	                                            "全部评论"
	                                        )
	                                    );
	                                } },
	                            _react2["default"].createElement(_partialFloorJsx2["default"], { comments: allComment, ref: "floor" })
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
	                                            "晒单"
	                                        )
	                                    );
	                                } },
	                            _react2["default"].createElement(_partialFloorJsx2["default"], { comments: showComment, ref: "floor" })
	                        )
	                    )
	                ),
	                _react2["default"].createElement(_componentGotopJsx2["default"], null),
	                _react2["default"].createElement(_componentRefresherJsx2["default"], { active: isFetching })
	            );
	        }
	    }]);

	    return CommentList;
	})(_react.Component);

	exports["default"] = CommentList;
	module.exports = exports["default"];

/***/ },

/***/ 440:
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

	var Floor = (function (_Component) {
	    _inherits(Floor, _Component);

	    function Floor() {
	        _classCallCheck(this, Floor);

	        _get(Object.getPrototypeOf(Floor.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Floor, [{
	        key: "renderNode",
	        value: function renderNode(list) {
	            return list.map(function (child, i) {
	                var key = "comment-" + i;
	                var stars = [],
	                    imagesList = child.imageUrlList,
	                    picList = [];
	                for (var _i = 0; _i < imagesList.length; _i++) {
	                    picList.push(_react2["default"].createElement(
	                        "li",
	                        { key: _i },
	                        _react2["default"].createElement("img", { src: imagesList[_i] })
	                    ));
	                };
	                var listclass = (0, _classnames2["default"])({
	                    "pic-list": true,
	                    "hide": !picList.length
	                });
	                for (var _i2 = 0; _i2 < 5; _i2++) {
	                    var star = undefined;
	                    if (_i2 < child.rate) {
	                        star = _react2["default"].createElement("div", { key: _i2, className: "iconfont icon-star-full" });
	                    } else {
	                        star = _react2["default"].createElement("div", { key: _i2, className: "iconfont icon-star-empty" });
	                    }
	                    stars.push(star);
	                };
	                return _react2["default"].createElement(
	                    "li",
	                    { key: key },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "product" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "col col-left" },
	                            _react2["default"].createElement("img", { src: imagesList[0] })
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "col col-right" },
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "origin" },
	                                _react2["default"].createElement("img", { src: child.originImageUrl }),
	                                child.origin
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "title" },
	                                child.productName
	                            )
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "stars-culm" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "stars stars-" + child.stars },
	                            stars
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "date" },
	                            child.createdAt
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "content" },
	                        child.content
	                    ),
	                    _react2["default"].createElement(
	                        "ul",
	                        { className: listclass },
	                        picList
	                    )
	                );
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var comments = this.props.comments;

	            return _react2["default"].createElement(
	                "ul",
	                { className: "comment-list" },
	                comments && comments.list && this.renderNode(comments.list)
	            );
	        }
	    }]);

	    return Floor;
	})(_react.Component);

	exports["default"] = Floor;
	module.exports = exports["default"];

/***/ },

/***/ 441:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});