webpackJsonp([7],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(345);
	module.exports = __webpack_require__(352);


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

/***/ 345:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)["default"];

	var _sharedChunkFlashbuyAppJsx = __webpack_require__(346);

	var _sharedChunkFlashbuyAppJsx2 = _interopRequireDefault(_sharedChunkFlashbuyAppJsx);

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(218);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function bootstrap() {
	    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
	    _reactDom2["default"].render(_react2["default"].createElement(_sharedChunkFlashbuyAppJsx2["default"], { initialState: initialState }), document.getElementById('flashbuy'));
	}

	if (typeof window.addEventListener) {
	    window.addEventListener("DOMContentLoaded", bootstrap);
	} else {
	    window.attachEvent('onload', bootstrap);
	}

/***/ },

/***/ 346:
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

	var _reducerEs6 = __webpack_require__(348);

	var _reducerEs62 = _interopRequireDefault(_reducerEs6);

	var _libReduxHelperEs6 = __webpack_require__(208);

	var _libReduxHelperEs62 = _interopRequireDefault(_libReduxHelperEs6);

	var _componentJsx = __webpack_require__(350);

	var _componentJsx2 = _interopRequireDefault(_componentJsx);

	var _actionEs6 = __webpack_require__(349);

	var actions = _interopRequireWildcard(_actionEs6);

	var FlashBuyConnected = (0, _reactRedux.connect)(function (state) {
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

	var NavbarApp = (function (_React$Component) {
	    _inherits(NavbarApp, _React$Component);

	    function NavbarApp() {
	        _classCallCheck(this, NavbarApp);

	        _get(Object.getPrototypeOf(NavbarApp.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(NavbarApp, [{
	        key: "render",
	        value: function render() {
	            var groupGoods = this.props.initialState.groupGoods;

	            var store = configureStore({
	                flashBuy: {
	                    isFetching: false,
	                    groupGoods: groupGoods
	                }
	            });
	            return _react2["default"].createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2["default"].createElement(FlashBuyConnected, null)
	            );
	        }
	    }]);

	    return NavbarApp;
	})(_react2["default"].Component);

	exports["default"] = NavbarApp;
	module.exports = exports["default"];

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

/***/ 348:
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

	var _actionEs6 = __webpack_require__(349);

	function flashBuy(state, action) {
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
	    flashBuy: flashBuy
	});

	exports["default"] = rootReducer;
	module.exports = exports["default"];

/***/ },

/***/ 349:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.fetchGoods = fetchGoods;

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

/***/ 350:
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

	var _classnames = __webpack_require__(234);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _componentTabsJsx = __webpack_require__(351);

	var FlashBuy = (function (_Component) {
	    _inherits(FlashBuy, _Component);

	    function FlashBuy() {
	        _classCallCheck(this, FlashBuy);

	        _get(Object.getPrototypeOf(FlashBuy.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(FlashBuy, [{
	        key: "renderGoods",
	        value: function renderGoods() {
	            var groupGoods = this.props.flashBuy.groupGoods;

	            if (groupGoods) {
	                return groupGoods.map(function (good, i) {
	                    return _react2["default"].createElement(
	                        "a",
	                        { href: "/gooddetail/1", className: "clearfix", key: i },
	                        _react2["default"].createElement("img", { src: good.imageUrl }),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "right" },
	                            _react2["default"].createElement(
	                                "span",
	                                { className: "name" },
	                                good.title
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
	                                "¥",
	                                good.salePrice
	                            ),
	                            _react2["default"].createElement(
	                                "span",
	                                { className: "oldPrice" },
	                                "¥",
	                                good.originPrice
	                            )
	                        )
	                    );
	                });
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return _react2["default"].createElement(
	                "div",
	                { className: "flashbuy-content" },
	                _react2["default"].createElement(
	                    _commonHeaderJsx2["default"],
	                    null,
	                    "闪购"
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "flashList" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "flashList_title" },
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            "距本期闪购结束"
	                        ),
	                        _react2["default"].createElement("div", { className: "titleBorder" }),
	                        _react2["default"].createElement(
	                            "p",
	                            null,
	                            _react2["default"].createElement(
	                                "em",
	                                null,
	                                "14"
	                            ),
	                            "时",
	                            _react2["default"].createElement(
	                                "em",
	                                null,
	                                "14"
	                            ),
	                            "分",
	                            _react2["default"].createElement(
	                                "em",
	                                null,
	                                "14"
	                            ),
	                            "秒"
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "flashBuy" },
	                        this.renderGoods()
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "willFlash" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "willFlash_title" },
	                        _react2["default"].createElement("img", { src: "/client/asset/images/willFlash.png" })
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "willFlash_con" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "willFlash_time" },
	                            "开售时间",
	                            _react2["default"].createElement(
	                                "em",
	                                null,
	                                "12:00"
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "flashBuy" },
	                            this.renderGoods()
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "willFlash_time" },
	                            "开售时间",
	                            _react2["default"].createElement(
	                                "em",
	                                null,
	                                "12:30"
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "flashBuy" },
	                            this.renderGoods()
	                        ),
	                        _react2["default"].createElement("div", { className: "willFlash_line" })
	                    )
	                )
	            );
	        }
	    }]);

	    return FlashBuy;
	})(_react.Component);

	exports["default"] = FlashBuy;
	module.exports = exports["default"];

/***/ },

/***/ 351:
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

	var Tabs = (function (_Component) {
	    _inherits(Tabs, _Component);

	    function Tabs(props) {
	        _classCallCheck(this, Tabs);

	        _get(Object.getPrototypeOf(Tabs.prototype), "constructor", this).call(this, props);
	        this.state = {
	            activeIndex: props.activeIndex,
	            prevIndex: null
	        };
	    }

	    _createClass(Tabs, [{
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(nextProps) {
	            if (nextProps.activeIndex !== undefined && nextProps.activeIndex !== this.props.activeIndex) {
	                this.setState({
	                    prevIndex: this.props.activeIndex,
	                    activeIndex: nextProps.activeIndex
	                });
	            }
	        }
	    }, {
	        key: "handleClick",
	        value: function handleClick(index, e) {
	            var _this = this;

	            e && e.preventDefault();
	            var prevIndex = this.state.activeIndex;
	            var handleToggleFlag = this.props.handleToggleFlag;

	            handleToggleFlag && handleToggleFlag(index, e);
	            this.setState({
	                activeIndex: index,
	                prevIndex: prevIndex
	            }, function () {
	                _this.props.onSelect(index);
	            });
	        }
	    }, {
	        key: "renderNav",
	        value: function renderNav() {
	            var _this2 = this;

	            var children = this.props.children;
	            var titles = [];
	            children.forEach(function (child) {
	                titles.push(child.props.title);
	            });
	            return titles.map(function (title, i) {
	                var classes = (0, _classnames2["default"])({
	                    active: i === _this2.state.activeIndex
	                });
	                return _react2["default"].createElement(
	                    "li",
	                    { className: classes, key: "tab-nav-" + i,
	                        onClick: _this2.handleClick.bind(_this2, i) },
	                    title
	                );
	            });
	        }
	    }, {
	        key: "renderContent",
	        value: function renderContent(child, index) {
	            return _react2["default"].cloneElement(child, {
	                active: index === this.state.activeIndex,
	                index: child.key ? child.key : index
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var effect = this.props.effect;

	            var contentClasses = (0, _classnames2["default"])("tabs-content", {
	                "tabs-content-fade": effect === "fade",
	                "tabs-content-slide": effect === "slide"
	            });
	            return _react2["default"].createElement(
	                "div",
	                { className: "tabs" },
	                _react2["default"].createElement(
	                    "div",
	                    { className: "polyTabs" },
	                    _react2["default"].createElement(
	                        "ul",
	                        null,
	                        this.renderNav()
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: contentClasses },
	                    _react2["default"].Children.map(this.props.children, this.renderContent.bind(this))
	                )
	            );
	        }
	    }]);

	    return Tabs;
	})(_react.Component);

	exports.Tabs = Tabs;

	Tabs.defaultProps = {
	    effect: "fade",
	    activeIndex: 0,
	    onSelect: function onSelect() {}
	};

	var TabsItem = (function (_Component2) {
	    _inherits(TabsItem, _Component2);

	    function TabsItem(props) {
	        _classCallCheck(this, TabsItem);

	        _get(Object.getPrototypeOf(TabsItem.prototype), "constructor", this).call(this, props);
	        this.state = {
	            activeIndex: props.activeIndex,
	            prevIndex: null
	        };
	    }

	    _createClass(TabsItem, [{
	        key: "handleTouch",
	        value: function handleTouch(index, e) {
	            var _this3 = this;

	            e && e.preventDefault();
	            var index = index === 0 ? 1 : 0;
	            var prevIndex = this.state.activeIndex;
	            var handleTouch = this.props.handleTouch;

	            handleTouch && handleTouch(index, e);
	            this.setState({
	                activeIndex: index,
	                prevIndex: prevIndex
	            }, function () {
	                _this3.props.onSelect(index);
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _props = this.props;
	            var active = _props.active;
	            var index = _props.index;
	            var handleTouch = _props.handleTouch;

	            var classes = (0, _classnames2["default"])("tabs-item", {
	                active: active
	            });
	            // onClick={this.handleTouch.bind(this,index)}
	            return _react2["default"].createElement(
	                "div",
	                { className: classes, key: "tabs-item-" + index },
	                this.props.children
	            );
	        }
	    }]);

	    return TabsItem;
	})(_react.Component);

	exports.TabsItem = TabsItem;

	TabsItem.defaultProps = {
	    activeIndex: 0,
	    onSelect: function onSelect() {}
	};

/***/ },

/***/ 352:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});