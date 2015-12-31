webpackJsonp([8],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(359);
	module.exports = __webpack_require__(369);


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

/***/ 236:
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

	var MaskLayer = (function (_Component) {
	    _inherits(MaskLayer, _Component);

	    function MaskLayer() {
	        _classCallCheck(this, MaskLayer);

	        _get(Object.getPrototypeOf(MaskLayer.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(MaskLayer, [{
	        key: "render",
	        value: function render() {
	            var handleClick = this.props.handleClick;
	            var styles = {
	                display: this.props.visible === true ? "block" : "none"
	            };
	            return _react2["default"].createElement("div", { className: "mask-layer", style: styles, onClick: handleClick });
	        }
	    }]);

	    return MaskLayer;
	})(_react.Component);

	exports["default"] = MaskLayer;
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
	      el.removeEventListener(event, listener);
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

/***/ 359:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)["default"];

	var _sharedChunkGoodlistAppJsx = __webpack_require__(360);

	var _sharedChunkGoodlistAppJsx2 = _interopRequireDefault(_sharedChunkGoodlistAppJsx);

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(218);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function bootstrap() {
	    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
	    _reactDom2["default"].render(_react2["default"].createElement(_sharedChunkGoodlistAppJsx2["default"], { initialState: initialState }), document.getElementById('good-list'));
	}

	if (typeof window.addEventListener) {
	    window.addEventListener("DOMContentLoaded", bootstrap);
	} else {
	    window.attachEvent('onload', bootstrap);
	}

/***/ },

/***/ 360:
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

	var _reducerEs6 = __webpack_require__(361);

	var _reducerEs62 = _interopRequireDefault(_reducerEs6);

	var _redux = __webpack_require__(197);

	var _libReduxHelperEs6 = __webpack_require__(208);

	var _libReduxHelperEs62 = _interopRequireDefault(_libReduxHelperEs6);

	var _componentJsx = __webpack_require__(363);

	var _componentJsx2 = _interopRequireDefault(_componentJsx);

	function selector(state) {
	    var _state$goodsByParam = state.goodsByParam;
	    var pagination = _state$goodsByParam.pagination;
	    var isFetching = _state$goodsByParam.isFetching;
	    var keywords = _state$goodsByParam.keywords;

	    return {
	        isFetching: isFetching,
	        pagination: pagination,
	        keywords: keywords
	    };
	}

	var GoodListConnected = (0, _reactRedux.connect)(selector)(_componentJsx2["default"]);

	function configureStore(initialState) {
	    var store = (0, _libReduxHelperEs62["default"])(_reducerEs62["default"], initialState);
	    return store;
	}

	var GoodListApp = (function (_Component) {
	    _inherits(GoodListApp, _Component);

	    function GoodListApp() {
	        _classCallCheck(this, GoodListApp);

	        _get(Object.getPrototypeOf(GoodListApp.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(GoodListApp, [{
	        key: "render",
	        value: function render() {
	            var _props$initialState = this.props.initialState;
	            var pagination = _props$initialState.pagination;
	            var keywords = _props$initialState.keywords;
	            var isFetching = _props$initialState.isFetching;

	            var initialState = {
	                goodsByParam: {
	                    isFetching: isFetching,
	                    pagination: pagination,
	                    keywords: keywords
	                }
	            };
	            var store = configureStore(initialState);
	            return _react2["default"].createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2["default"].createElement(GoodListConnected, null)
	            );
	        }
	    }]);

	    return GoodListApp;
	})(_react.Component);

	exports["default"] = GoodListApp;
	module.exports = exports["default"];

/***/ },

/***/ 361:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(210)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(197);

	var _lodash = __webpack_require__(231);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _actionEs6 = __webpack_require__(362);

	function goodsByParam(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _actionEs6.REQUEST_GOODS:
	            return _Object$assign({}, state, {
	                isFetching: true
	            });
	        case _actionEs6.RECEIVE_GOODS:
	            return _Object$assign({}, state, {
	                isFetching: false,
	                pagination: action.pagination
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

/***/ 362:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = fetchGoods;

	var _libUtilEs6 = __webpack_require__(227);

	var REQUEST_GOODS = "REQUEST_GOODS";
	exports.REQUEST_GOODS = REQUEST_GOODS;
	var RECEIVE_GOODS = "RECEIVE_GOODS";

	exports.RECEIVE_GOODS = RECEIVE_GOODS;
	function receiveGoods(param, res) {
	    return {
	        type: RECEIVE_GOODS,
	        param: param,
	        pagination: res
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
	        return (0, _libUtilEs6.apiRequest)(url, param).then(function (res) {
	            dispath(receiveGoods(param, res));
	        });
	    };
	}

/***/ },

/***/ 363:
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

	var _actionEs6 = __webpack_require__(362);

	var _actionEs62 = _interopRequireDefault(_actionEs6);

	var _componentRefresherJsx = __webpack_require__(235);

	var _componentRefresherJsx2 = _interopRequireDefault(_componentRefresherJsx);

	var _componentMasklayerJsx = __webpack_require__(236);

	var _componentMasklayerJsx2 = _interopRequireDefault(_componentMasklayerJsx);

	var _componentGotopJsx = __webpack_require__(237);

	var _componentGotopJsx2 = _interopRequireDefault(_componentGotopJsx);

	var _commonHeaderJsx = __webpack_require__(217);

	var _commonHeaderJsx2 = _interopRequireDefault(_commonHeaderJsx);

	var _partialFilterJsx = __webpack_require__(364);

	var _partialFilterJsx2 = _interopRequireDefault(_partialFilterJsx);

	var _partialGoodItemJsx = __webpack_require__(366);

	var _partialGoodItemJsx2 = _interopRequireDefault(_partialGoodItemJsx);

	var _partialGoodStoreJsx = __webpack_require__(367);

	var _partialGoodStoreJsx2 = _interopRequireDefault(_partialGoodStoreJsx);

	var _partialFilterClassifyJsx = __webpack_require__(368);

	var _partialFilterClassifyJsx2 = _interopRequireDefault(_partialFilterClassifyJsx);

	var GoodListApp = (function (_React$Component) {
	    _inherits(GoodListApp, _React$Component);

	    function GoodListApp(props) {
	        _classCallCheck(this, GoodListApp);

	        _get(Object.getPrototypeOf(GoodListApp.prototype), "constructor", this).call(this, props);
	        this.state = {
	            maskActive: false,
	            popupActive: false,
	            productActive: false,
	            classifyActive: false,
	            brandActive: false,
	            needClear: false,
	            isFocused: false,
	            keywords: props.keywords
	        };
	    }

	    _createClass(GoodListApp, [{
	        key: "closeAllPopups",
	        value: function closeAllPopups() {
	            this.setState({
	                maskActive: false,
	                popupActive: false,
	                classifyActive: false,
	                brandActive: false,
	                productActive: false
	            });
	        }
	    }, {
	        key: "togglePopupActive",
	        value: function togglePopupActive() {
	            var popupActive = !this.state.popupActive;
	            this.setState({
	                popupActive: popupActive,
	                maskActive: popupActive
	            });
	        }
	    }, {
	        key: "handleChangeFilter",
	        value: function handleChangeFilter(type) {
	            switch (type) {
	                case 'classfiy':
	                    this.togglePopupClassify();
	                    break;
	                case 'brand':
	                    this.togglePopupBrandFilter();
	                    break;
	                case 'product':
	                    this.togglePopupProduct();
	                    break;
	                default:
	                    break;
	            }
	        }
	    }, {
	        key: "togglePopupClassify",
	        value: function togglePopupClassify() {
	            this.setState({
	                classifyActive: !this.state.classifyActive
	            });
	        }
	    }, {
	        key: "togglePopupProduct",
	        value: function togglePopupProduct() {
	            this.setState({
	                productActive: !this.state.productActive
	            });
	        }
	    }, {
	        key: "togglePopupBrandFilter",
	        value: function togglePopupBrandFilter() {
	            this.setState({
	                brandActive: !this.state.brandActive
	            });
	        }
	    }, {
	        key: "handleChange",
	        value: function handleChange(e) {
	            e.preventDefault();
	            var keywords = e.target.value;
	            if (keywords !== this.state.keywords) {
	                this.setState({
	                    keywords: keywords
	                });
	            }

	            if (keywords.length > 0) {
	                this.setState({
	                    needClear: true
	                });
	            }
	        }
	    }, {
	        key: "handleBlur",
	        value: function handleBlur() {
	            this.setState({
	                needClear: false,
	                isFocused: false
	            });
	        }
	    }, {
	        key: "handleFocus",
	        value: function handleFocus(e) {
	            var needClear = this.state.keywords.length > 0 ? true : false;
	            e.preventDefault();
	            this.setState({
	                needClear: needClear,
	                isFocused: true
	            });
	        }
	    }, {
	        key: "handleClearInput",
	        value: function handleClearInput(e) {
	            e.preventDefault();
	            this.setState({
	                keywords: '',
	                isFocused: true
	            });
	        }
	    }, {
	        key: "toggleSortActive",
	        value: function toggleSortActive(param) {
	            var dispatch = this.props.dispatch;

	            var keywords = this.state.keywords;
	            var url = '/goodlist/' + keywords;
	            dispatch((0, _actionEs62["default"])(url, param));
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _props = this.props;
	            var isFetching = _props.isFetching;
	            var pagination = _props.pagination;
	            var keywords = _props.keywords;

	            var goods = [];

	            if (!pagination.goodsList.length) {
	                return _react2["default"].createElement(
	                    "div",
	                    { className: "empty noPadTop" },
	                    _react2["default"].createElement(
	                        _commonHeaderJsx2["default"],
	                        null,
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "title" },
	                            keywords
	                        )
	                    ),
	                    _react2["default"].createElement("img", { src: "/client/asset/images/empty_search.png" }),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "tips" },
	                        "抱歉，没有找到与“",
	                        keywords,
	                        "”相关的商品，",
	                        _react2["default"].createElement("br", null),
	                        "您可以换个词再试试~！"
	                    )
	                );
	            }

	            pagination.goodsList.forEach(function (item, i) {
	                var key = "good-" + i;
	                goods.push(_react2["default"].createElement(_partialGoodItemJsx2["default"], { goods: item, key: key }));
	            });

	            var classes = (0, _classnames2["default"])({
	                "rollOut-animate": true,
	                "good-list-content": true,
	                "rollOut-slideLeft": this.state.popupActive
	            });

	            var closebtn = (0, _classnames2["default"])({
	                "iconfont": true,
	                "icon-close": this.state.needClear
	            });

	            var searchBox = (0, _classnames2["default"])("search-box", {
	                "search-foucs": this.state.isFocused
	            });

	            return _react2["default"].createElement(
	                "div",
	                null,
	                _react2["default"].createElement(
	                    "div",
	                    { className: classes },
	                    _react2["default"].createElement(
	                        _commonHeaderJsx2["default"],
	                        null,
	                        _react2["default"].createElement(
	                            "div",
	                            { className: searchBox },
	                            _react2["default"].createElement("input", { type: "search", value: this.state.keywords,
	                                onChange: this.handleChange.bind(this),
	                                onBlur: this.handleBlur.bind(this),
	                                onFocus: this.handleFocus.bind(this) }),
	                            _react2["default"].createElement("span", null),
	                            _react2["default"].createElement("i", { className: closebtn, onClick: this.handleClearInput.bind(this) })
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "btn-right", onClick: this.togglePopupActive.bind(this) },
	                            "筛选"
	                        )
	                    ),
	                    _react2["default"].createElement(_partialGoodStoreJsx2["default"], { orderBy: this.toggleSortActive.bind(this) }),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "special-activity-list clearfix" },
	                        goods
	                    )
	                ),
	                _react2["default"].createElement(_componentMasklayerJsx2["default"], { visible: this.state.maskActive,
	                    handleClick: this.closeAllPopups.bind(this) }),
	                _react2["default"].createElement(_partialFilterJsx2["default"], {
	                    popupActive: this.state.popupActive,
	                    handleCanBuy: this.toggleSortActive.bind(this),
	                    filter: this.handleChangeFilter.bind(this),
	                    handleClose: this.togglePopupActive.bind(this) }),
	                _react2["default"].createElement(_partialFilterClassifyJsx2["default"], {
	                    category: pagination.categoryNames,
	                    active: this.state.classifyActive,
	                    handleClose: this.togglePopupClassify.bind(this) }),
	                _react2["default"].createElement(_partialFilterClassifyJsx2["default"], {
	                    category: pagination.brandNames,
	                    active: this.state.brandActive,
	                    handleClose: this.togglePopupBrandFilter.bind(this) }),
	                _react2["default"].createElement(_partialFilterClassifyJsx2["default"], {
	                    category: pagination.productNames,
	                    active: this.state.productActive,
	                    handleClose: this.togglePopupProduct.bind(this) }),
	                _react2["default"].createElement(_componentGotopJsx2["default"], null),
	                _react2["default"].createElement(_componentRefresherJsx2["default"], { active: isFetching })
	            );
	        }
	    }]);

	    return GoodListApp;
	})(_react2["default"].Component);

	exports["default"] = GoodListApp;
	module.exports = exports["default"];

/***/ },

/***/ 364:
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

	var _classnames = __webpack_require__(234);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _constantEs6 = __webpack_require__(365);

	var Filter = (function (_Component) {
	    _inherits(Filter, _Component);

	    function Filter(props) {
	        _classCallCheck(this, Filter);

	        _get(Object.getPrototypeOf(Filter.prototype), "constructor", this).call(this, props);
	        this.state = {
	            isHaveGoods: _constantEs6.isHaveGoods
	        };
	    }

	    _createClass(Filter, [{
	        key: "toggleCanBuy",
	        value: function toggleCanBuy() {
	            var isHaveGood = !this.state.isHaveGoods;
	            this.setState({
	                isHaveGoods: isHaveGood
	            });

	            this.props.handleCanBuy({
	                isHaveGoods: isHaveGood
	            });
	        }
	    }, {
	        key: "handleReset",
	        value: function handleReset() {
	            this.setState({
	                isHaveGoods: false
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var popupActive = this.props.popupActive;

	            var classes = (0, _classnames2["default"])({
	                "menu-slider": true,
	                "rollIn-animate": true,
	                "rollIn-slideLeft": popupActive
	            });
	            var exist = (0, _classnames2["default"])({
	                onShow: this.state.isHaveGoods
	            });

	            return _react2["default"].createElement(
	                "div",
	                { className: classes },
	                _react2["default"].createElement(
	                    _commonHeaderJsx2["default"],
	                    { canBack: false },
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "btn-left", onClick: this.handleReset.bind(this) },
	                        "重置"
	                    ),
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "btn-right", onClick: this.props.handleClose.bind(this) },
	                        "确定"
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "showHave" },
	                    _react2["default"].createElement(
	                        "dl",
	                        null,
	                        _react2["default"].createElement(
	                            "dt",
	                            null,
	                            "只显示有货"
	                        ),
	                        _react2["default"].createElement(
	                            "dd",
	                            { className: exist, onClick: this.toggleCanBuy.bind(this) },
	                            _react2["default"].createElement("i", null)
	                        )
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "helpList" },
	                    _react2["default"].createElement(
	                        "dl",
	                        { onClick: this.props.filter.bind(this, 'classfiy') },
	                        _react2["default"].createElement(
	                            "dt",
	                            null,
	                            "类别"
	                        ),
	                        _react2["default"].createElement("dd", { className: "iconfont icon-right" })
	                    ),
	                    _react2["default"].createElement(
	                        "dl",
	                        { onClick: this.props.filter.bind(this, 'brand') },
	                        _react2["default"].createElement(
	                            "dt",
	                            null,
	                            "品牌"
	                        ),
	                        _react2["default"].createElement("dd", { className: "iconfont icon-right" })
	                    ),
	                    _react2["default"].createElement(
	                        "dl",
	                        { onClick: this.props.filter.bind(this, 'product') },
	                        _react2["default"].createElement(
	                            "dt",
	                            null,
	                            "产地"
	                        ),
	                        _react2["default"].createElement("dd", { className: "iconfont icon-right" })
	                    )
	                )
	            );
	        }
	    }]);

	    return Filter;
	})(_react.Component);

	exports["default"] = Filter;
	module.exports = exports["default"];

/***/ },

/***/ 365:
/***/ function(module, exports) {

	
	//1:新品,2:折扣,3:价格,4:销量,5:收藏
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SORT_NORMAL = 1;
	exports.SORT_NORMAL = SORT_NORMAL;
	var SORT_PRICE = 3;
	exports.SORT_PRICE = SORT_PRICE;
	var SORT_SALES = 4;

	exports.SORT_SALES = SORT_SALES;
	//true:asc,false:desc
	var SORT_ASC = true;
	exports.SORT_ASC = SORT_ASC;
	var SORT_DESC = false;

	exports.SORT_DESC = SORT_DESC;
	var isHaveGoods = false;
	exports.isHaveGoods = isHaveGoods;

/***/ },

/***/ 366:
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
	            //console.log(goods)

	            var statusClass = (0, _classnames2["default"])({
	                "sale-out": goods.isSaleOut
	            });
	            var activityClass = (0, _classnames2["default"])({
	                "flash-sale": goods.activityType == 1,
	                "phone-price": goods.activityType == 2
	            });
	            return _react2["default"].createElement(
	                "a",
	                { href: "/gooddetail/" + goods.id },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "clearfix" },
	                    _react2["default"].createElement("div", { className: statusClass }),
	                    _react2["default"].createElement("div", { className: activityClass }),
	                    _react2["default"].createElement("img", { src: goods.smallImageUrl, alt: "" }),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "country" },
	                        _react2["default"].createElement(
	                            "i",
	                            null,
	                            _react2["default"].createElement("img", { src: goods.flag, alt: "" })
	                        ),
	                        goods.productArea
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        goods.materTitle
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        null,
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "now-price" },
	                            "¥",
	                            goods.salesPrice
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "old-price" },
	                            "¥",
	                            goods.originPrice
	                        )
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

/***/ 367:
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

	var _constantEs6 = __webpack_require__(365);

	var GoodSorter = (function (_Component) {
	    _inherits(GoodSorter, _Component);

	    function GoodSorter(props) {
	        _classCallCheck(this, GoodSorter);

	        _get(Object.getPrototypeOf(GoodSorter.prototype), "constructor", this).call(this, props);
	        this.state = {
	            type: _constantEs6.SORT_NORMAL,
	            order: _constantEs6.SORT_ASC
	        };
	    }

	    _createClass(GoodSorter, [{
	        key: "orderByDefault",
	        value: function orderByDefault() {
	            if (this.state.type === _constantEs6.SORT_NORMAL) {
	                return false;
	            }
	            this.setState({
	                type: _constantEs6.SORT_NORMAL,
	                order: _constantEs6.SORT_ASC
	            });
	            this.props.orderBy({
	                type: _constantEs6.SORT_NORMAL,
	                order: _constantEs6.SORT_DESC
	            });
	        }
	    }, {
	        key: "orderBySales",
	        value: function orderBySales() {
	            if (this.state.type === _constantEs6.SORT_SALES) {
	                return false;
	            }
	            this.setState({
	                type: _constantEs6.SORT_SALES,
	                order: _constantEs6.SORT_ASC
	            });
	            this.props.orderBy({
	                type: _constantEs6.SORT_SALES,
	                order: _constantEs6.SORT_DESC
	            });
	        }
	    }, {
	        key: "orderByPrice",
	        value: function orderByPrice() {
	            this.setState({
	                type: _constantEs6.SORT_PRICE,
	                order: this.state.order === _constantEs6.SORT_ASC ? _constantEs6.SORT_DESC : _constantEs6.SORT_ASC
	            });
	            this.props.orderBy({
	                type: _constantEs6.SORT_PRICE,
	                order: this.state.order
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {

	            var normalClass = (0, _classnames2["default"])('normal', {
	                "active": this.state.type === _constantEs6.SORT_NORMAL
	            });

	            var priceClass = (0, _classnames2["default"])("price", {
	                "active": this.state.type === _constantEs6.SORT_PRICE && this.state.order === _constantEs6.SORT_DESC,
	                "price-asc": this.state.type === _constantEs6.SORT_PRICE && this.state.order === _constantEs6.SORT_ASC
	            });

	            var salesClass = (0, _classnames2["default"])('sales', {
	                "active": this.state.type === _constantEs6.SORT_SALES
	            });

	            return _react2["default"].createElement(
	                "div",
	                null,
	                _react2["default"].createElement(
	                    "div",
	                    { className: "search-order" },
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "javascript:;", className: normalClass, onClick: this.orderByDefault.bind(this) },
	                        _react2["default"].createElement("i", null),
	                        "默认"
	                    ),
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "javascript:;", className: priceClass, onClick: this.orderByPrice.bind(this) },
	                        _react2["default"].createElement("i", null),
	                        "价格"
	                    ),
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "javascript:;", className: salesClass, onClick: this.orderBySales.bind(this) },
	                        _react2["default"].createElement("i", null),
	                        "销量"
	                    )
	                )
	            );
	        }
	    }]);

	    return GoodSorter;
	})(_react.Component);

	exports["default"] = GoodSorter;
	module.exports = exports["default"];

/***/ },

/***/ 368:
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

	var _classnames = __webpack_require__(234);

	var _classnames2 = _interopRequireDefault(_classnames);

	var FilterClassify = (function (_Component) {
	    _inherits(FilterClassify, _Component);

	    function FilterClassify(props) {
	        _classCallCheck(this, FilterClassify);

	        _get(Object.getPrototypeOf(FilterClassify.prototype), "constructor", this).call(this, props);
	        this.state = {
	            isChecked: {}
	        };
	    }

	    _createClass(FilterClassify, [{
	        key: "handleCheck",
	        value: function handleCheck(i, e) {
	            var isChecked = this.state.isChecked;
	            isChecked[i] = !isChecked[i];
	            this.setState({
	                isChecked: isChecked
	            });
	        }
	    }, {
	        key: "renderNav",
	        value: function renderNav(category) {
	            var _this = this;

	            if (!category || category.length < 1) {
	                return '暂无分类';
	            }
	            var menu = category.map(function (item, i) {
	                var key = "nav-" + i;
	                var checked = (0, _classnames2["default"])("iconfont", {
	                    "icon-check": _this.state.isChecked[key]
	                });
	                return _react2["default"].createElement(
	                    "dl",
	                    { onClick: _this.handleCheck.bind(_this, key), key: key },
	                    _react2["default"].createElement(
	                        "dt",
	                        null,
	                        item.name
	                    ),
	                    _react2["default"].createElement("dd", { className: checked })
	                );
	            });

	            return _react2["default"].createElement(
	                "div",
	                { className: "helpList" },
	                menu
	            );
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _props = this.props;
	            var active = _props.active;
	            var category = _props.category;
	            var handleClose = _props.handleClose;

	            var classess = (0, _classnames2["default"])({
	                "second-slider": true,
	                "rollIn-animate": true,
	                "rollIn-slideLeft": active
	            });

	            return _react2["default"].createElement(
	                "div",
	                { className: classess },
	                _react2["default"].createElement(
	                    _commonHeaderJsx2["default"],
	                    { handleGoBack: handleClose.bind(this) },
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "btn-right", onClick: handleClose.bind(this) },
	                        "确定"
	                    )
	                ),
	                this.renderNav(category)
	            );
	        }
	    }]);

	    return FilterClassify;
	})(_react.Component);

	exports["default"] = FilterClassify;
	module.exports = exports["default"];

/***/ },

/***/ 369:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});