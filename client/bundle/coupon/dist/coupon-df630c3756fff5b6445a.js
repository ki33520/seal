webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(325);
	module.exports = __webpack_require__(330);


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

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)["default"];

	var _sharedChunkCouponAppJsx = __webpack_require__(326);

	var _sharedChunkCouponAppJsx2 = _interopRequireDefault(_sharedChunkCouponAppJsx);

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(218);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function bootstrap() {
	    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
	    _reactDom2["default"].render(_react2["default"].createElement(_sharedChunkCouponAppJsx2["default"], { initialState: initialState }), document.getElementById('coupon'));
	}

	if (typeof window.addEventListener) {
	    window.addEventListener("DOMContentLoaded", bootstrap);
	} else {
	    window.attachEvent('onload', bootstrap);
	}

/***/ },

/***/ 326:
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

	var _reducerEs6 = __webpack_require__(327);

	var _reducerEs62 = _interopRequireDefault(_reducerEs6);

	var _redux = __webpack_require__(197);

	var _libReduxHelperEs6 = __webpack_require__(208);

	var _libReduxHelperEs62 = _interopRequireDefault(_libReduxHelperEs6);

	var _componentJsx = __webpack_require__(329);

	var _componentJsx2 = _interopRequireDefault(_componentJsx);

	function selector(state) {
	    var _state$couponByUser = state.couponByUser;
	    var enableCoupons = _state$couponByUser.enableCoupons;
	    var legueCoupons = _state$couponByUser.legueCoupons;
	    var invalidCoupons = _state$couponByUser.invalidCoupons;
	    var enableIndex = _state$couponByUser.enableIndex;
	    var invalidIndex = _state$couponByUser.invalidIndex;
	    var legueIndex = _state$couponByUser.legueIndex;

	    return {
	        enableCoupons: enableCoupons,
	        legueCoupons: legueCoupons,
	        invalidCoupons: invalidCoupons,
	        enableIndex: enableIndex,
	        invalidIndex: invalidIndex,
	        legueIndex: legueIndex
	    };
	}

	var CouponConnected = (0, _reactRedux.connect)(selector)(_componentJsx2["default"]);

	function configureStore(initialState) {
	    return (0, _libReduxHelperEs62["default"])(_reducerEs62["default"], initialState);
	}

	var CouponApp = (function (_Component) {
	    _inherits(CouponApp, _Component);

	    function CouponApp() {
	        _classCallCheck(this, CouponApp);

	        _get(Object.getPrototypeOf(CouponApp.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(CouponApp, [{
	        key: "render",
	        value: function render() {
	            var _props$initialState = this.props.initialState;
	            var enableCoupons = _props$initialState.enableCoupons;
	            var legueCoupons = _props$initialState.legueCoupons;
	            var invalidCoupons = _props$initialState.invalidCoupons;
	            var enableIndex = _props$initialState.enableIndex;
	            var invalidIndex = _props$initialState.invalidIndex;
	            var legueIndex = _props$initialState.legueIndex;

	            var initialState = {
	                couponByUser: {
	                    enableCoupons: enableCoupons,
	                    legueCoupons: legueCoupons,
	                    invalidCoupons: invalidCoupons,
	                    enableIndex: enableIndex,
	                    invalidIndex: invalidIndex,
	                    legueIndex: legueIndex
	                }
	            };
	            var store = configureStore(initialState);
	            return _react2["default"].createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2["default"].createElement(CouponConnected, null)
	            );
	        }
	    }]);

	    return CouponApp;
	})(_react.Component);

	exports["default"] = CouponApp;
	module.exports = exports["default"];

/***/ },

/***/ 327:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(210)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(197);

	var _actionEs6 = __webpack_require__(328);

	function couponByUser(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _actionEs6.START_FETCH_COUPON:
	            return _Object$assign({}, state, {
	                isFetching: true,
	                isFetched: false
	            });
	        case _actionEs6.FINISH_YOUA_COUPON:
	            var pageIndex = action.res.pageIndex;
	            var coupons = action.res.coupons;
	            return _Object$assign({}, state, {
	                isFetching: false,
	                isFetched: true,
	                enableCoupons: coupons,
	                enableIndex: pageIndex
	            });
	        case _actionEs6.FINISH_UNION_COUPON:
	            var pageIndex = action.res.pageIndex;
	            var coupons = action.res.coupons;
	            return _Object$assign({}, state, {
	                isFetching: false,
	                isFetched: true,
	                legueCoupons: coupons,
	                legueIndex: pageIndex

	            });
	        case _actionEs6.FINISH_INVALID_COUPON:
	            var pageIndex = action.res.pageIndex;
	            var coupons = action.res.coupons;
	            return _Object$assign({}, state, {
	                isFetching: false,
	                isFetched: true,
	                invalidCoupons: coupons,
	                invalidIndex: pageIndex

	            });
	        default:
	            return state;
	    }
	}

	var rootReducer = (0, _redux.combineReducers)({
	    couponByUser: couponByUser
	});

	exports["default"] = rootReducer;
	module.exports = exports["default"];

/***/ },

/***/ 328:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.fetchYouaCoupons = fetchYouaCoupons;
	exports.fetchUnionCoupons = fetchUnionCoupons;
	exports.fetchInvalidCoupons = fetchInvalidCoupons;

	var _libUtilEs6 = __webpack_require__(227);

	var START_FETCH_COUPON = "START_FETCH_COUPON";
	exports.START_FETCH_COUPON = START_FETCH_COUPON;
	var FINISH_YOUA_COUPON = "FINISH_YOUA_COUPON";
	exports.FINISH_YOUA_COUPON = FINISH_YOUA_COUPON;
	var FINISH_UNION_COUPON = "FINISH_UNION_COUPON";
	exports.FINISH_UNION_COUPON = FINISH_UNION_COUPON;
	var FINISH_INVALID_COUPON = "FINISH_INVALID_COUPON";

	exports.FINISH_INVALID_COUPON = FINISH_INVALID_COUPON;
	function startFetchCoupon() {
	    return {
	        type: START_FETCH_COUPON
	    };
	}

	function finishYouaCoupon(param, res) {
	    return {
	        type: FINISH_YOUA_COUPON,
	        param: param,
	        res: res
	    };
	}

	function finishUnionCoupon(param, res) {
	    return {
	        type: FINISH_UNION_COUPON,
	        param: param,
	        res: res
	    };
	}

	function finishInvalidCoupon(param, res) {
	    return {
	        type: FINISH_INVALID_COUPON,
	        param: param,
	        res: res
	    };
	}

	function fetchYouaCoupons(param) {
	    return function (dispatch) {
	        dispatch(startFetchCoupon());
	        (0, _libUtilEs6.apiRequest)('/fetchCoupon', param, { method: "POST" }).then(function (res) {
	            dispatch(finishYouaCoupon(param, res));
	        });
	    };
	}

	function fetchUnionCoupons(param) {
	    return function (dispatch) {
	        dispatch(startFetchCoupon());
	        (0, _libUtilEs6.apiRequest)('/fetchCoupon', param, { method: "POST" }).then(function (res) {
	            dispatch(finishUnionCoupon(param, res));
	        });
	    };
	}

	function fetchInvalidCoupons(param) {
	    return function (dispatch) {
	        dispatch(startFetchCoupon());
	        (0, _libUtilEs6.apiRequest)('/fetchCoupon', param, { method: "POST" }).then(function (res) {
	            dispatch(finishInvalidCoupon(param, res));
	        });
	    };
	}

/***/ },

/***/ 329:
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

	var _commonHeaderJsx = __webpack_require__(217);

	var _commonHeaderJsx2 = _interopRequireDefault(_commonHeaderJsx);

	var _actionEs6 = __webpack_require__(328);

	var Coupon = (function (_React$Component) {
	    _inherits(Coupon, _React$Component);

	    function Coupon(props) {
	        _classCallCheck(this, Coupon);

	        _get(Object.getPrototypeOf(Coupon.prototype), "constructor", this).call(this, props);
	        this.state = {
	            displayFlag: "enable"
	        };
	    }

	    _createClass(Coupon, [{
	        key: "toggleFlag",
	        value: function toggleFlag(flag) {
	            var dispatch = this.props.dispatch;
	            var _props = this.props;
	            var enableIndex = _props.enableIndex;
	            var invalidIndex = _props.invalidIndex;
	            var legueIndex = _props.legueIndex;

	            this.setState({
	                displayFlag: flag
	            });

	            if (flag == "legue" && !legueIndex) {
	                dispatch((0, _actionEs6.fetchUnionCoupons)({
	                    pageIndex: legueIndex,
	                    isMerchants: 1,
	                    pageIndex: 1,
	                    status: 0
	                }));
	            } else if (flag == "invalid" && !invalidIndex) {
	                dispatch((0, _actionEs6.fetchInvalidCoupons)({
	                    pageIndex: invalidIndex,
	                    pageIndex: 1,
	                    status: 1
	                }));
	            }
	        }
	    }, {
	        key: "renderTab",
	        value: function renderTab() {
	            var firstClasses = (0, _classnames2["default"])({
	                current: this.state.displayFlag === "enable"
	            });
	            var secondClasses = (0, _classnames2["default"])({
	                current: this.state.displayFlag === "legue"
	            });
	            var thirdClasses = (0, _classnames2["default"])({
	                current: this.state.displayFlag === "invalid"
	            });
	            return _react2["default"].createElement(
	                "ul",
	                null,
	                _react2["default"].createElement(
	                    "li",
	                    { className: firstClasses,
	                        onClick: this.toggleFlag.bind(this, "enable") },
	                    _react2["default"].createElement(
	                        "i",
	                        null,
	                        "友阿优惠券"
	                    )
	                ),
	                _react2["default"].createElement(
	                    "li",
	                    { className: secondClasses,
	                        onClick: this.toggleFlag.bind(this, "legue") },
	                    _react2["default"].createElement(
	                        "i",
	                        null,
	                        "联盟优惠券"
	                    )
	                ),
	                _react2["default"].createElement(
	                    "li",
	                    { className: thirdClasses,
	                        onClick: this.toggleFlag.bind(this, "invalid") },
	                    _react2["default"].createElement(
	                        "i",
	                        null,
	                        "已失效优惠券"
	                    )
	                )
	            );
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _props2 = this.props;
	            var enableCoupons = _props2.enableCoupons;
	            var legueCoupons = _props2.legueCoupons;
	            var invalidCoupons = _props2.invalidCoupons;

	            var youaClasses = (0, _classnames2["default"])("list_youa", {
	                hide: this.state.displayFlag !== "enable"
	            });
	            var unionClasses = (0, _classnames2["default"])("list_union", {
	                hide: this.state.displayFlag !== "legue"
	            });
	            var invalidClasses = (0, _classnames2["default"])("invalid", {
	                hide: this.state.displayFlag !== "invalid"
	            });

	            if (enableCoupons.length > 0) {
	                enableCoupons = enableCoupons.map(function (enableCoupon, i) {
	                    var key = "coupon-" + i;
	                    return _react2["default"].createElement(CouponRow, { coupon: enableCoupon, key: key });
	                });
	            } else {
	                enableCoupons = _react2["default"].createElement(NoCoupon, { message: "您目前没有友阿优惠券哟！" });
	            }

	            if (legueCoupons.length > 0) {
	                legueCoupons = legueCoupons.map(function (legueCoupon, i) {
	                    var key = "legueCoupon-" + i;
	                    return _react2["default"].createElement(LegueCouponRow, { coupon: legueCoupon, key: key });
	                });
	            } else {
	                legueCoupons = _react2["default"].createElement(NoCoupon, { message: "您目前没有联盟优惠券哟！" });
	            }

	            if (invalidCoupons.length > 0) {
	                invalidCoupons = invalidCoupons.map(function (invalidCoupon, i) {
	                    var key = "invalidCoupon-" + i;
	                    if (invalidCoupon.flag === "legue") {
	                        return _react2["default"].createElement(LegueCouponRow, { coupon: invalidCoupon, key: key, invalid: true });
	                    }
	                    return _react2["default"].createElement(CouponRow, { coupon: invalidCoupon, key: key, invalid: true });
	                });
	            } else {
	                invalidCoupons = _react2["default"].createElement(NoCoupon, { message: "您目前没有已失效优惠券哟！" });
	            }

	            return _react2["default"].createElement(
	                "div",
	                null,
	                _react2["default"].createElement(
	                    _commonHeaderJsx2["default"],
	                    null,
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "title" },
	                        "优惠券"
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "polyTabs" },
	                    this.renderTab()
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "listMain" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "tabCon" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: youaClasses },
	                            enableCoupons
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: unionClasses },
	                            legueCoupons
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: invalidClasses },
	                            invalidCoupons
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Coupon;
	})(_react2["default"].Component);

	var CouponRow = (function (_Component) {
	    _inherits(CouponRow, _Component);

	    function CouponRow() {
	        _classCallCheck(this, CouponRow);

	        _get(Object.getPrototypeOf(CouponRow.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(CouponRow, [{
	        key: "render",
	        value: function render() {
	            var _props3 = this.props;
	            var coupon = _props3.coupon;
	            var invalid = _props3.invalid;

	            var beUsed = (0, _classnames2["default"])({
	                beUsed: invalid
	            });

	            var classes = (0, _classnames2["default"])("coupon", {
	                youa_invalid: invalid,
	                haitao: coupon.flag == "haitao",
	                tepin: coupon.flag == "tepin",
	                hnmall: coupon.flag == "hnmall"
	            });
	            return _react2["default"].createElement(
	                "a",
	                { href: "/coupondetail/" + coupon.couponNo },
	                _react2["default"].createElement(
	                    "div",
	                    { className: classes },
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
	                            coupon.money
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "term" },
	                            coupon.couponDefName
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "right" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "kind" },
	                            coupon.site
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "date" },
	                            coupon.issueDate,
	                            " - ",
	                            coupon.validityDate
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "explain" },
	                            "可在XXX使用使用使用使用使用使用使用"
	                        )
	                    ),
	                    _react2["default"].createElement("div", { className: beUsed })
	                )
	            );
	        }
	    }]);

	    return CouponRow;
	})(_react.Component);

	var LegueCouponRow = (function (_Component2) {
	    _inherits(LegueCouponRow, _Component2);

	    function LegueCouponRow() {
	        _classCallCheck(this, LegueCouponRow);

	        _get(Object.getPrototypeOf(LegueCouponRow.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(LegueCouponRow, [{
	        key: "render",
	        value: function render() {
	            var _props4 = this.props;
	            var coupon = _props4.coupon;
	            var invalid = _props4.invalid;

	            var classes = (0, _classnames2["default"])("coupon", {
	                union_invalid: invalid
	            });
	            var expired = (0, _classnames2["default"])({
	                expired: invalid
	            });
	            return _react2["default"].createElement(
	                "a",
	                { href: "/coupondetail/" + coupon.couponNo },
	                _react2["default"].createElement(
	                    "div",
	                    { className: classes },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "content" },
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
	                                "20"
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "right" },
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "company" },
	                                "罗莎蛋糕"
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "explain" },
	                                "仅可购买蛋糕类商品，奶品除外"
	                            )
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "bottom" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "term" },
	                            "满100使用"
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "date" },
	                            "2015.06.12-2015.07.18"
	                        )
	                    ),
	                    _react2["default"].createElement("div", { className: expired })
	                )
	            );
	        }
	    }]);

	    return LegueCouponRow;
	})(_react.Component);

	var NoCoupon = (function (_Component3) {
	    _inherits(NoCoupon, _Component3);

	    function NoCoupon() {
	        _classCallCheck(this, NoCoupon);

	        _get(Object.getPrototypeOf(NoCoupon.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(NoCoupon, [{
	        key: "render",
	        value: function render() {
	            var message = this.props.message;

	            return _react2["default"].createElement(
	                "div",
	                { className: "empty" },
	                _react2["default"].createElement("img", { src: "client/asset/images/empty_coupon.png" }),
	                _react2["default"].createElement(
	                    "span",
	                    null,
	                    message
	                )
	            );
	        }
	    }]);

	    return NoCoupon;
	})(_react.Component);

	exports["default"] = Coupon;
	module.exports = exports["default"];

/***/ },

/***/ 330:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});