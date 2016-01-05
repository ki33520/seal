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

/***/ 270:
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

/***/ 271:
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

/***/ 286:
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

/***/ 435:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)["default"];

	var _sharedChunkMembercollectAppJsx = __webpack_require__(436);

	var _sharedChunkMembercollectAppJsx2 = _interopRequireDefault(_sharedChunkMembercollectAppJsx);

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(218);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function bootstrap() {
	    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
	    _reactDom2["default"].render(_react2["default"].createElement(_sharedChunkMembercollectAppJsx2["default"], { initialState: initialState }), document.getElementById('member-collect'));
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
	    var _state$memberCollectByUser = state.memberCollectByUser;
	    var collect = _state$memberCollectByUser.collect;
	    var isFetched = _state$memberCollectByUser.isFetched;
	    var isFetching = _state$memberCollectByUser.isFetching;
	    var pageSize = _state$memberCollectByUser.pageSize;

	    return {
	        collect: collect,
	        isFetched: isFetched,
	        isFetching: isFetching,
	        pageSize: pageSize
	    };
	}

	var MembercollectListConnected = (0, _reactRedux.connect)(selector)(_componentJsx2["default"]);

	function configureStore(initialState) {
	    var store = (0, _libReduxHelperEs62["default"])(_reducerEs62["default"], initialState);
	    return store;
	}

	var MembercollectApp = (function (_Component) {
	    _inherits(MembercollectApp, _Component);

	    function MembercollectApp() {
	        _classCallCheck(this, MembercollectApp);

	        _get(Object.getPrototypeOf(MembercollectApp.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(MembercollectApp, [{
	        key: "render",
	        value: function render() {
	            var _props$initialState = this.props.initialState;
	            var collect = _props$initialState.collect;
	            var isFetched = _props$initialState.isFetched;
	            var pageSize = _props$initialState.pageSize;

	            var initialState = {
	                memberCollectByUser: {
	                    isFetching: false,
	                    isFetched: isFetched,
	                    pageSize: pageSize,
	                    collect: collect
	                }
	            };
	            var store = configureStore(initialState);
	            return _react2["default"].createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2["default"].createElement(MembercollectListConnected, null)
	            );
	        }
	    }]);

	    return MembercollectApp;
	})(_react.Component);

	exports["default"] = MembercollectApp;
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

	var _commonActionEs6 = __webpack_require__(270);

	var _commonReducerEs6 = __webpack_require__(271);

	function memberCollectByUser(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _actionEs6.REQUEST_COLLECT:
	            return _Object$assign({}, state, {
	                isFetched: false,
	                isFetching: true
	            });
	        case _actionEs6.RECEIVE_COLLECT:
	            return _Object$assign({}, state, {
	                isFetched: true,
	                isFetching: false,
	                collect: action.res
	            });
	        case _commonActionEs6.SHOW_ALERT:
	        case _commonActionEs6.HIDE_ALERT:
	            return (0, _commonReducerEs6.alertReducer)(state, action);
	        default:
	            return state;
	    }
	}

	var rootReducer = (0, _redux.combineReducers)({
	    memberCollectByUser: memberCollectByUser
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
	exports["default"] = fetchCollect;

	var _libUtilEs6 = __webpack_require__(227);

	var REQUEST_COLLECT = "REQUEST_COLLECT";
	exports.REQUEST_COLLECT = REQUEST_COLLECT;
	var RECEIVE_COLLECT = "RECEIVE_COLLECT";

	exports.RECEIVE_COLLECT = RECEIVE_COLLECT;
	function requestCollect(param) {
	    return {
	        type: REQUEST_COLLECT,
	        param: param
	    };
	}

	function receiveCollect(param, res) {
	    return {
	        type: RECEIVE_COLLECT,
	        receiveAt: Date.now(),
	        param: param,
	        res: res
	    };
	}

	function fetchCollect(url, param) {
	    return function (dispatch) {
	        dispatch(requestCollect(param));
	        return (0, _libUtilEs6.apiRequest)(url, param).then(function (res) {
	            dispatch(receiveCollect(param, res));
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

	var _lodash = __webpack_require__(231);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _classnames = __webpack_require__(234);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _libDomEs6 = __webpack_require__(238);

	var _libDomEs62 = _interopRequireDefault(_libDomEs6);

	var _libUtilEs6 = __webpack_require__(227);

	var _libUtilEs62 = _interopRequireDefault(_libUtilEs6);

	var _componentAlertJsx = __webpack_require__(286);

	var _componentAlertJsx2 = _interopRequireDefault(_componentAlertJsx);

	var _commonHeaderJsx = __webpack_require__(217);

	var _commonHeaderJsx2 = _interopRequireDefault(_commonHeaderJsx);

	var _componentGotopJsx = __webpack_require__(237);

	var _componentGotopJsx2 = _interopRequireDefault(_componentGotopJsx);

	var _componentRefresherJsx = __webpack_require__(235);

	var _componentRefresherJsx2 = _interopRequireDefault(_componentRefresherJsx);

	var _partialNodeJsx = __webpack_require__(440);

	var _partialNodeJsx2 = _interopRequireDefault(_partialNodeJsx);

	var _actionEs6 = __webpack_require__(438);

	var _actionEs62 = _interopRequireDefault(_actionEs6);

	var _commonActionEs6 = __webpack_require__(270);

	var MembercollectList = (function (_Component) {
	    _inherits(MembercollectList, _Component);

	    function MembercollectList(props) {
	        _classCallCheck(this, MembercollectList);

	        _get(Object.getPrototypeOf(MembercollectList.prototype), "constructor", this).call(this, props);
	        var collect = props.collect;
	        var isFetching = props.isFetching;
	        var isFetched = props.isFetched;
	    }

	    _createClass(MembercollectList, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var _this = this;

	            _libUtilEs62["default"].registerPullDownEvent((function () {
	                _this.beginRefresh();
	            }).bind(this));
	        }
	    }, {
	        key: "beginRefresh",
	        value: function beginRefresh() {
	            var dispatch = this.props.dispatch;
	            var _props = this.props;
	            var collect = _props.collect;
	            var isFetching = _props.isFetching;

	            var pageCount = Math.ceil(collect.totalCount / collect.pageSize);
	            var pageIndex = collect.pageIndex;
	            var nextPage = pageIndex + 1;
	            if (pageCount < nextPage) {
	                // this.setState({isFetching:false});
	                return false;
	            }
	            if (isFetching === true) {
	                return false;
	            }
	            dispatch((0, _actionEs62["default"])(window.location.href, {
	                pageIndex: nextPage
	            }));
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            //console.log(this.props)
	            var _props2 = this.props;
	            var collect = _props2.collect;
	            var isFetching = _props2.isFetching;

	            return _react2["default"].createElement(
	                "div",
	                { className: "collect-content" },
	                _react2["default"].createElement(
	                    _commonHeaderJsx2["default"],
	                    null,
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "title" },
	                        "我的收藏"
	                    )
	                ),
	                _react2["default"].createElement(_partialNodeJsx2["default"], collect),
	                _react2["default"].createElement(_componentGotopJsx2["default"], null),
	                _react2["default"].createElement(_componentRefresherJsx2["default"], { active: isFetching })
	            );
	        }
	    }]);

	    return MembercollectList;
	})(_react.Component);

	exports["default"] = MembercollectList;
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

	var Node = (function (_Component) {
	    _inherits(Node, _Component);

	    function Node() {
	        _classCallCheck(this, Node);

	        _get(Object.getPrototypeOf(Node.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Node, [{
	        key: "render",
	        value: function render() {
	            var list = this.props.list;

	            return _react2["default"].createElement(
	                "ul",
	                { className: "collect-list" },
	                list.map(function (child, key) {
	                    return _react2["default"].createElement(
	                        "li",
	                        { id: child.goodId, key: key },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "col col-left" },
	                            _react2["default"].createElement("img", { src: child.imageUrl })
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "col col-right" },
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "title" },
	                                child.title
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "origin" },
	                                _react2["default"].createElement("img", { src: child.originImageUrl }),
	                                child.origin
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "price" },
	                                _react2["default"].createElement(
	                                    "span",
	                                    null,
	                                    _react2["default"].createElement(
	                                        "i",
	                                        null,
	                                        "￥"
	                                    ),
	                                    child.salesPrice
	                                ),
	                                _react2["default"].createElement(
	                                    "span",
	                                    null,
	                                    _react2["default"].createElement(
	                                        "i",
	                                        null,
	                                        "￥"
	                                    ),
	                                    child.standardPrice
	                                )
	                            )
	                        )
	                    );
	                })
	            );
	        }
	    }]);

	    return Node;
	})(_react.Component);

	exports["default"] = Node;
	module.exports = exports["default"];

/***/ },

/***/ 441:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});