webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(195);
	module.exports = __webpack_require__(272);


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
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)["default"];

	var _sharedChunkGooddetailAppJsx = __webpack_require__(196);

	var _sharedChunkGooddetailAppJsx2 = _interopRequireDefault(_sharedChunkGooddetailAppJsx);

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(190);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function bootstrap() {
	    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
	    _reactDom2["default"].render(_react2["default"].createElement(_sharedChunkGooddetailAppJsx2["default"], { initialState: initialState }), document.getElementById('good-detail'));
	}

	if (typeof window.addEventListener) {
	    window.addEventListener("DOMContentLoaded", bootstrap);
	} else {
	    window.attachEvent('onload', bootstrap);
	}

/***/ },
/* 196 */
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

	var _reactRedux = __webpack_require__(197);

	var _reducerEs6 = __webpack_require__(215);

	var _reducerEs62 = _interopRequireDefault(_reducerEs6);

	var _redux = __webpack_require__(204);

	var _libStoreCreatorEs6 = __webpack_require__(227);

	var _libStoreCreatorEs62 = _interopRequireDefault(_libStoreCreatorEs6);

	var _componentJsx = __webpack_require__(230);

	var _componentJsx2 = _interopRequireDefault(_componentJsx);

	function selector(state) {
	    var goodById = state.goodById;
	    var cartByUser = state.cartByUser;

	    return {
	        goodById: goodById,
	        cartByUser: cartByUser
	    };
	}

	var GoodDetailConnected = (0, _reactRedux.connect)(selector)(_componentJsx2["default"]);

	function configureStore(initialState) {
	    var store = (0, _libStoreCreatorEs62["default"])(_reducerEs62["default"], initialState);
	    return store;
	}

	var GoodDetailApp = (function (_Component) {
	    _inherits(GoodDetailApp, _Component);

	    function GoodDetailApp() {
	        _classCallCheck(this, GoodDetailApp);

	        _get(Object.getPrototypeOf(GoodDetailApp.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(GoodDetailApp, [{
	        key: "render",
	        value: function render() {
	            var _props$initialState = this.props.initialState;
	            var good = _props$initialState.good;
	            var cartCount = _props$initialState.cartCount;

	            var initialState = {
	                goodById: {
	                    good: good
	                },
	                cartByUser: {
	                    cartCount: cartCount
	                }
	            };
	            var store = configureStore(initialState);
	            return _react2["default"].createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2["default"].createElement(GoodDetailConnected, null)
	            );
	        }
	    }]);

	    return GoodDetailApp;
	})(_react.Component);

	exports["default"] = GoodDetailApp;
	module.exports = exports["default"];

/***/ },
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
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(216)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(204);

	var _actionEs6 = __webpack_require__(221);

	var _commonActionEs6 = __webpack_require__(225);

	var _commonReducerEs6 = __webpack_require__(226);

	function goodById(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _actionEs6.REQUEST_GOOD:
	            return _Object$assign({}, state, {
	                isFetching: true
	            });
	        case _actionEs6.RECEIVE_GOOD:
	            return _Object$assign({}, state, {
	                isFetching: false,
	                good: action.res
	            });
	        case _actionEs6.START_ADD_FAVORITE:
	            return _Object$assign({}, state, {
	                favoriteAdding: true
	            });
	        case _actionEs6.FINISH_ADD_FAVORITE:
	            var favored = state.favored;
	            if (action.res.code === "success") {
	                favored = true;
	            }
	            return _Object$assign({}, state, {
	                favoriteAdding: false,
	                favored: favored
	            });
	        case _commonActionEs6.SHOW_ALERT:
	        case _commonActionEs6.HIDE_ALERT:
	            return (0, _commonReducerEs6.alertReducer)(state, action);
	        default:
	            return state;
	    }
	}

	function cartByUser(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _actionEs6.START_ADD_CART:
	            return _Object$assign({}, state, {
	                cartAdding: true
	            });
	        case _actionEs6.FINISH_ADD_CART:
	            var cartCount = state.cartCount === "" ? 0 : state.cartCount;
	            var buyed = action.param.qty;
	            if (action.res.code === "success") {
	                cartCount += buyed;
	            }
	            return _Object$assign({}, state, {
	                cartAdding: false,
	                cartCount: cartCount
	            });
	        default:
	            return state;
	    }
	}

	var rootReducer = (0, _redux.combineReducers)({
	    goodById: goodById,
	    cartByUser: cartByUser
	});

	exports["default"] = rootReducer;
	module.exports = exports["default"];

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(217), __esModule: true };

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(218);
	module.exports = __webpack_require__(16).Object.assign;

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(14);

	$def($def.S + $def.F, 'Object', {assign: __webpack_require__(219)});

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(7)
	  , toObject = __webpack_require__(220)
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
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = fetchGood;
	exports.addCart = addCart;
	exports.addFavorite = addFavorite;

	var _libUtilEs6 = __webpack_require__(222);

	var REQUEST_GOOD = "REQUEST_GOOD";
	exports.REQUEST_GOOD = REQUEST_GOOD;
	var RECEIVE_GOOD = "RECEIVE_GOOD";
	exports.RECEIVE_GOOD = RECEIVE_GOOD;
	var START_ADD_CART = "START_ADD_CART";
	exports.START_ADD_CART = START_ADD_CART;
	var FINISH_ADD_CART = "FINISH_ADD_CART";
	exports.FINISH_ADD_CART = FINISH_ADD_CART;
	var START_ADD_FAVORITE = "START_ADD_FAVORITE";
	exports.START_ADD_FAVORITE = START_ADD_FAVORITE;
	var FINISH_ADD_FAVORITE = "FINISH_ADD_FAVORITE";

	exports.FINISH_ADD_FAVORITE = FINISH_ADD_FAVORITE;
	function requestGood(param) {
	    return {
	        type: REQUEST_GOOD,
	        param: param
	    };
	}

	function receiveGood(param, res) {
	    return {
	        type: RECEIVE_GOOD,
	        receiveAt: Date.now(),
	        param: param,
	        res: res
	    };
	}

	function fetchGood(url, param) {
	    return function (dispatch) {
	        dispatch(requestGood(param));
	        return (0, _libUtilEs6.apiRequest)(url, param, {
	            type: "jsonp",
	            jsonpcallback: "jsoncallback"
	        }).then(function (res) {
	            dispatch(receiveGood(param, res));
	        });
	    };
	}

	function startAddCart(param) {
	    return {
	        type: START_ADD_CART,
	        param: param
	    };
	}

	function finishAddCart(param, res) {
	    return {
	        type: FINISH_ADD_CART,
	        param: param,
	        res: res,
	        finishAt: Date.now()
	    };
	}

	function addCart(url, param) {
	    return function (dispatch) {
	        dispatch(startAddCart(param));
	        (0, _libUtilEs6.apiRequest)(url, param).then(function (res) {
	            dispatch(finishAddCart(param, res));
	        });
	    };
	}

	function startAddFavorite(param) {
	    return {
	        type: START_ADD_FAVORITE,
	        param: param
	    };
	}

	function finishAddFavorite(param, res) {
	    return {
	        type: FINISH_ADD_FAVORITE,
	        param: param,
	        res: res,
	        finishAt: Date.now()
	    };
	}

	function addFavorite(url, param) {
	    return function (dispatch) {
	        dispatch(startAddFavorite(param));
	        (0, _libUtilEs6.apiRequest)(url, param).then(function (res) {
	            dispatch(finishAddFavorite(param, res));
	        });
	    };
	}

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(216)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.apiRequest = apiRequest;

	var _reqwest = __webpack_require__(223);

	var _reqwest2 = _interopRequireDefault(_reqwest);

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

/***/ },
/* 223 */,
/* 224 */,
/* 225 */
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
/* 226 */
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
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(204);

	var _reduxThunk = __webpack_require__(228);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(229);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var logger = (0, _reduxLogger2["default"])();

	var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2["default"], logger)(_redux.createStore);

	exports["default"] = createStoreWithMiddleware;
	module.exports = exports["default"];

/***/ },
/* 228 */
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
/* 229 */
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
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _defineProperty = __webpack_require__(231)["default"];

	var _extends = __webpack_require__(232)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _lodash = __webpack_require__(233);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _classnames = __webpack_require__(235);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _libDomEs6 = __webpack_require__(236);

	var _libDomEs62 = _interopRequireDefault(_libDomEs6);

	var _libUtilEs6 = __webpack_require__(222);

	var _componentSliderSliderJsx = __webpack_require__(238);

	var _componentSliderSliderJsx2 = _interopRequireDefault(_componentSliderSliderJsx);

	var _componentSliderSlideJsx = __webpack_require__(265);

	var _componentSliderSlideJsx2 = _interopRequireDefault(_componentSliderSlideJsx);

	var _componentNumberpickerNumberpickerJsx = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../component/numberpicker/numberpicker.jsx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _componentNumberpickerNumberpickerJsx2 = _interopRequireDefault(_componentNumberpickerNumberpickerJsx);

	var _componentPullhookPullhookJsx = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../component/pullhook/pullhook.jsx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _componentPullhookPullhookJsx2 = _interopRequireDefault(_componentPullhookPullhookJsx);

	var _componentAlertAlertJsx = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../component/alert/alert.jsx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _componentAlertAlertJsx2 = _interopRequireDefault(_componentAlertAlertJsx);

	var _commonHeaderHeaderJsx = __webpack_require__(266);

	var _commonHeaderHeaderJsx2 = _interopRequireDefault(_commonHeaderHeaderJsx);

	var _partialPromotionsJsx = __webpack_require__(267);

	var _partialPromotionsJsx2 = _interopRequireDefault(_partialPromotionsJsx);

	var _partialPropertiesJsx = __webpack_require__(270);

	var _partialPropertiesJsx2 = _interopRequireDefault(_partialPropertiesJsx);

	var _partialToolbarJsx = __webpack_require__(271);

	var _partialToolbarJsx2 = _interopRequireDefault(_partialToolbarJsx);

	var _actionEs6 = __webpack_require__(221);

	var _commonActionEs6 = __webpack_require__(225);

	var GoodDetail = (function (_Component) {
	    _inherits(GoodDetail, _Component);

	    function GoodDetail(props) {
	        _classCallCheck(this, GoodDetail);

	        _get(Object.getPrototypeOf(GoodDetail.prototype), "constructor", this).call(this, props);
	        this.state = {
	            good: props.goodById.good,
	            selectedProperty: null,
	            buyed: 0,
	            selectedItem: null,
	            upperVisble: true,
	            downVisble: false
	        };
	    }

	    _createClass(GoodDetail, [{
	        key: "onPropertyChange",
	        value: function onPropertyChange(selectedProperty, selectedPropertyValue, e) {
	            e && e.preventDefault();
	            if (selectedProperty.disabled) {
	                return;
	            }
	            var good = this.state.good;
	            var items = good.items;
	            var properties = good.properties;
	            properties = properties.map(function (v, k) {
	                if (v.propertyName === selectedProperty.propertyName) {
	                    v.selectedValue = selectedPropertyValue;
	                } else if (k !== 0) {
	                    v.selectedValue = null;
	                }
	                return v;
	            });

	            var matchedItems = toggleUnselectedPropertyStatus(properties);

	            _lodash2["default"].each(properties, function (property, k) {
	                if (property.selectedValue !== null) return;
	                var propertyName = property.propertyName;
	                var propertyValues = property.propertyValues;
	                _lodash2["default"].map(propertyValues, function (v) {
	                    var value = v.value;
	                    var itemFoundPredicate = {
	                        props: _defineProperty({}, propertyName, value)
	                    };
	                    var itemFound = _lodash2["default"].findWhere(matchedItems, itemFoundPredicate);
	                    v.disabled = false;
	                    if (itemFound === undefined) {
	                        // console.log("%s:%s stock not found",propertyName,value)
	                        v.disabled = true;
	                    } else if (itemFound.remainingStock === 0) {
	                        v.disabled = true;
	                        // console.log("%s:%s stock is 0",propertyName,value)
	                    }
	                    return v;
	                });
	                properties[k].propertyValues = propertyValues;
	            });
	            good.properties = properties;

	            var notFullFilled = _lodash2["default"].some(properties, { selectedValue: null });
	            var selectedItem = this.state.selectedItem;
	            if (matchedItems.length === 1 && notFullFilled === false) {
	                good = this.reloadPriceAndStock(matchedItems, good);
	                selectedItem = matchedItems[0];
	            } else {
	                selectedItem = null;
	            }

	            this.setState({
	                selectedProperty: selectedProperty,
	                selectedItem: selectedItem,
	                good: good
	            });
	            function toggleUnselectedPropertyStatus(properties) {
	                var unselectedProperties = _lodash2["default"].filter(properties, function (property) {
	                    return property.selectedValue === null;
	                });
	                var selectedProperties = _lodash2["default"].filter(properties, function (property) {
	                    return property.selectedValue !== null;
	                });
	                var itemPredicate = { props: {} };
	                _lodash2["default"].each(selectedProperties, function (property) {
	                    var propertyName = property.propertyName;
	                    var propertyValue = property.selectedValue.value;
	                    itemPredicate.props[propertyName] = propertyValue;
	                });
	                matchedItems = _lodash2["default"].where(items, itemPredicate);

	                return matchedItems;
	            }
	        }
	    }, {
	        key: "reloadPriceAndStock",
	        value: function reloadPriceAndStock(matchedItems, good) {
	            var item = matchedItems[0];
	            good.salePrice = item.salesPrice;
	            good.originalPrice = item.standardPrice;
	            var discount = (item.salesPrice / item.standardPrice * 10).toFixed(1);
	            good.discount = discount === "10.0" ? "" : discount + "折";
	            good.stock = item.remainingStock > 0 ? item.remainingStock : 0;
	            good.buyed = item.remainingStock > 0 ? 1 : 0;
	            // console.log('reloadPriceAndStock');
	            return good;
	        }
	    }, {
	        key: "handleBuyedChanged",
	        value: function handleBuyedChanged(buyed) {
	            if (this.state.good.stock === null) {
	                return false;
	            }
	            this.setState({
	                buyed: buyed
	            });
	        }
	    }, {
	        key: "addToCart",
	        value: function addToCart(e) {
	            e && e.preventDefault();
	            var _state = this.state;
	            var selectedItem = _state.selectedItem;
	            var buyed = _state.buyed;
	            var good = _state.good;
	            var dispatch = this.props.dispatch;

	            if (selectedItem === null) {
	                var unselectedProperties = _lodash2["default"].filter(good.properties, function (property) {
	                    return property.selectedValue === null;
	                });
	                var propertyNames = _lodash2["default"].pluck(unselectedProperties, "propertyName");
	                propertyNames = propertyNames.join(",");
	                dispatch((0, _commonActionEs6.alert)("请选择" + propertyNames, 3000));
	                return;
	            } else if (buyed === 0) {
	                dispatch((0, _commonActionEs6.alert)('购买数量必须大于0', 3000));
	                return;
	            } else if (selectedItem !== null && buyed > 0) {
	                dispatch((0, _actionEs6.addCart)("/addcart", {
	                    qty: buyed,
	                    itemId: selectedItem.id
	                }));
	            }
	        }
	    }, {
	        key: "toggleFavorite",
	        value: function toggleFavorite(e) {
	            e && e.preventDefault();
	            var _props2 = this.props;
	            var good = _props2.good;
	            var dispatch = _props2.dispatch;

	            dispatch((0, _actionEs6.addFavorite)("/addfavorite", {
	                id: good.id
	            }));
	        }
	    }, {
	        key: "directBuy",
	        value: function directBuy(e) {
	            e && e.preventDefault();
	            var dispatch = this.props.dispatch;
	            var _state2 = this.state;
	            var selectedItem = _state2.selectedItem;
	            var buyed = _state2.buyed;
	            var good = _state2.good;

	            if (selectedItem === null) {
	                var unselectedProperties = _lodash2["default"].filter(good.properties, function (property) {
	                    return property.selectedValue === null;
	                });
	                var propertyNames = _lodash2["default"].pluck(unselectedProperties, "propertyName");
	                propertyNames = propertyNames.join(",");
	                dispatch((0, _commonActionEs6.alert)("请选择" + propertyNames, 3000));
	                return;
	            } else if (buyed === 0) {
	                dispatch((0, _commonActionEs6.alert)('购买数量必须大于0', 3000));
	                return;
	            } else if (selectedItem !== null && buyed > 0) {
	                var directBuyForm = _react2["default"].findDOMNode(this.refs.directBuyForm);
	                directBuyForm.submit();
	            }
	        }
	    }, {
	        key: "handlePullUp",
	        value: function handlePullUp(e) {
	            e && e.preventDefault();
	            this.setState({
	                downVisble: true,
	                upperVisble: false
	            }, function () {
	                _libDomEs62["default"].scrollTop(window, 0);
	            });
	        }
	    }, {
	        key: "handlePullDown",
	        value: function handlePullDown(e) {
	            e && e.preventDefault();
	            this.setState({
	                downVisble: false,
	                upperVisble: true
	            });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var cartCount = this.props.cartCount;
	            var _state3 = this.state;
	            var good = _state3.good;
	            var selectedItem = _state3.selectedItem;
	            var buyed = _state3.buyed;

	            var detail = good.detail.replace(/jpg_.webp/g, 'jpg');
	            var slides = good.slides.map(function (slide, i) {
	                var key = "slide-" + i;
	                return _react2["default"].createElement(
	                    _componentSliderSlideJsx2["default"],
	                    { key: key },
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "javascript:void(null)" },
	                        _react2["default"].createElement("img", { src: slide })
	                    )
	                );
	            });

	            var upperClasses = (0, _classnames2["default"])("good-detail-upper", {
	                visible: this.state.upperVisble
	            });
	            var downClasses = (0, _classnames2["default"])("good-detail-down", {
	                visible: this.state.downVisble
	            });
	            return _react2["default"].createElement(
	                "div",
	                { className: "good-detail-content" },
	                _react2["default"].createElement(_commonHeaderHeaderJsx2["default"], { title: "商品详情" }),
	                _react2["default"].createElement(
	                    "div",
	                    { className: upperClasses },
	                    _react2["default"].createElement(
	                        _componentSliderSliderJsx2["default"],
	                        { effect: "roll", autoPlay: true, speed: 200 },
	                        slides
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "good-title" },
	                        good.title
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "good-prices" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "sale-price" },
	                            good.salePrice
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "original-price" },
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "price-tag" },
	                                "专柜价:",
	                                _react2["default"].createElement(
	                                    "b",
	                                    null,
	                                    good.originalPrice
	                                ),
	                                _react2["default"].createElement(
	                                    "em",
	                                    null,
	                                    good.discount
	                                )
	                            ),
	                            _react2["default"].createElement(
	                                "div",
	                                { className: "store-tag" },
	                                "门店:",
	                                _react2["default"].createElement(
	                                    "b",
	                                    null,
	                                    good.mallName
	                                )
	                            )
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "divider-title" },
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            "促销"
	                        )
	                    ),
	                    _react2["default"].createElement(_partialPromotionsJsx2["default"], { promotions: good.marketing }),
	                    _react2["default"].createElement(_partialPropertiesJsx2["default"], { properties: good.properties,
	                        stock: good.stock,
	                        selectedProperty: this.state.selectedProperty,
	                        onPropertyChange: this.onPropertyChange.bind(this) }),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "divider-title" },
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            "数量"
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "good-buyed" },
	                        _react2["default"].createElement(_componentNumberpickerNumberpickerJsx2["default"], { value: this.state.buyed, onChange: this.handleBuyedChanged.bind(this) })
	                    ),
	                    _react2["default"].createElement(
	                        _componentPullhookPullhookJsx2["default"],
	                        {
	                            className: "pull-trigger",
	                            oriention: "BOTTOM_TO_TOP",
	                            onPullEnd: this.handlePullUp.bind(this)
	                        },
	                        "上拉显示商品详情"
	                    )
	                ),
	                _react2["default"].createElement(_partialToolbarJsx2["default"], _extends({}, this.props, {
	                    directBuy: this.directBuy.bind(this),
	                    toggleFavorite: this.toggleFavorite.bind(this),
	                    addToCart: this.addToCart.bind(this) })),
	                _react2["default"].createElement(
	                    "form",
	                    { action: "/confirmorder", method: "GET", ref: "directBuyForm" },
	                    _react2["default"].createElement("input", { type: "hidden", value: selectedItem !== null ? selectedItem.id : "", name: "itemIds" }),
	                    _react2["default"].createElement("input", { type: "hidden", value: buyed, name: "buyeds" })
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: downClasses },
	                    _react2["default"].createElement(
	                        _componentPullhookPullhookJsx2["default"],
	                        {
	                            className: "pull-trigger",
	                            oriention: "TOP_TO_BOTTOM",
	                            onPullEnd: this.handlePullDown.bind(this)
	                        },
	                        "下拉返回详情顶部"
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "good-specification" },
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "divider-title" },
	                            _react2["default"].createElement(
	                                "span",
	                                null,
	                                "规格参数"
	                            )
	                        ),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "specification-content" },
	                            null
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "divider-title" },
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            "商品图片"
	                        )
	                    ),
	                    _react2["default"].createElement("div", { className: "good-desc", dangerouslySetInnerHTML: { __html: good.detail } })
	                )
	            );
	        }
	    }]);

	    return GoodDetail;
	})(_react.Component);

	exports["default"] = GoodDetail;
	module.exports = exports["default"];

/***/ },
/* 231 */
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
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$assign = __webpack_require__(216)["default"];

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
/* 233 */,
/* 234 */,
/* 235 */
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
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _requestAnimationFrame = __webpack_require__(237);

	var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

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
	    if (!element) {
	      return null;
	    }
	    var top = 0,
	        left = 0;
	    if ("getBoundingClientRect" in document.documentElement) {
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
	  scrollTo: function scrollTo(element, options) {
	    options = options || {};
	    var scrollTarget = element || window;
	    var value = options.position && parseInt(options.position, 10) || 0;
	    var originalScrollTop = scrollTarget.scrollTop;
	    var smoothScroll = function smoothScroll() {
	      var scrollTop = scrollTarget.scrollTop;
	      if (originalScrollTop < value) {
	        if (scrollTop + scrollTarget.clientHeight === scrollTarget.scrollHeight) {
	          clearInterval(tickTock);
	        }
	        if (scrollTop > value) {
	          scrollTarget.scrollTop = value;
	          // console.log('clearInterval plus',scrollTarget.scrollTop,value);
	          clearInterval(tickTock);
	        }
	        scrollTarget.scrollTop = scrollTop + 3;
	      } else {
	        // console.log('scroll minus',originalScrollTop,scrollTop,value);
	        if (scrollTop < value) {
	          // scrollTarget.scrollTop = value;
	          // console.log('clearInterval minus',scrollTop,value);
	          clearInterval(tickTock);
	        }
	        scrollTarget.scrollTop = scrollTop - 3;
	      }
	    };

	    var tickTock = setInterval(smoothScroll, 5);
	  },
	  scrollTop: function scrollTop(element, value) {
	    var isCSS1Compat = document.compatMode === 'CSS1Compat';
	    var supportPageOffset = window.pageYOffset !== undefined;
	    var scrollTop, scrollLeft;
	    if (element === window) {
	      scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
	      scrollLeft = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
	    } else {
	      scrollTop = element.scrollTop;
	      scrollLeft = element.scrollLeft;
	    }
	    if (value !== undefined) {
	      if (element === window) {
	        window.scrollTo(scrollLeft, value);
	      } else {
	        element.scrollTop = value;
	      }
	    }
	    return scrollTop;
	  },
	  smoothScroll: function smoothScroll(element, options) {
	    options = options || {};
	    var scrollTarget = element || window;
	    var targetY = options.position && parseInt(options.position, 10) || 0;
	    var initialY = dom.scrollTop(scrollTarget);
	    var lastY = initialY;
	    var delta = targetY - initialY;
	    var speed = Math.min(750, Math.min(1500, Math.abs(delta)));
	    var cancelScroll = function cancelScroll() {
	      abort();
	    };

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
	    function abort() {
	      dom.unbindEvent(scrollTarget, "touchstart", cancelScroll);
	      // scrollInProgress = false;
	    }
	    dom.bindEvent(scrollTarget, "touchstart", cancelScroll);

	    var start, t, y;
	    (0, _requestAnimationFrame2["default"])(function render() {
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
	      // calculate the new scrollTop position (don't forget to smooth)
	      y = Math.round(initialY + delta * smooth(t));
	      // console.log("t:",t,"y:",y)
	      if (delta < 0 && y < targetY) {
	        y = targetY;
	      }
	      if (delta > 0 && y > targetY) {
	        y = targetY;
	      }
	      // only scroll then refresh
	      // console.log('y:',y,lastY)
	      if (lastY !== y) {
	        dom.scrollTop(scrollTarget, y);
	      }
	      // refresh current position Y
	      lastY = y;
	      if (y !== targetY) {
	        (0, _requestAnimationFrame2["default"])(render);
	      } else {
	        abort();
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
	  }
	};

	exports["default"] = dom;
	module.exports = exports["default"];

/***/ },
/* 237 */
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
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _toConsumableArray = __webpack_require__(239)["default"];

	var _Object$assign = __webpack_require__(216)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(190);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames = __webpack_require__(235);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _libDomEs6 = __webpack_require__(236);

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
	        key: "initialize",
	        value: function initialize() {
	            var oriention = this.props.oriention;
	            var activeIndex = this.state.activeIndex;

	            if (this.props.defaultActiveIndex !== undefined) {
	                activeIndex = this.props.defaultActiveIndex;
	            }
	            // const slideNode = React.findDOMNode(this).querySelector(".slides").firstChild;
	            var slideNode = _reactDom2["default"].findDOMNode(this);
	            var slideNodeWidth = slideNode.offsetWidth;
	            var slideNodeHeight = slideNode.querySelector(".slides").firstChild.offsetHeight;
	            var slidesWidth = slideNodeWidth * this.slides.length;
	            var slidesHeight = slideNodeHeight * this.slides.length;
	            if (slidesWidth === 0 || slidesHeight === 0) {
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
	                    transform: transform
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
	                        console.log('next Y');
	                        setTimeout(this.next.bind(this), 100);
	                    } else if (offsetY > 0) {
	                        console.log('prev Y');
	                        setTimeout(this.prev.bind(this), 100);
	                    }
	                } else {
	                    console.log('restorePosition');
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
	            var slidesNode = _react2["default"].findDOMNode(this.refs.slides);
	            if (transform !== null) {
	                slidesNode.style.transform = transform;
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
	            var slidesNode = _react2["default"].findDOMNode(this.refs.slides);
	            if (transform !== null) {
	                slidesNode.style.transform = transform;
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
	            var oriention = props.oriention;

	            var count = this.slides.length;
	            var activeIndex = state.activeIndex;
	            var slidesStyle = this.state.slidesStyle;
	            if (this.needPseudoNode() === true) {
	                var transform;
	                // var symbol = direction === "prev"?"-":"-";
	                // console.log("direction",direction)
	                // console.log('prevActiveIndex',state.prevActiveIndex)
	                // console.log('activeIndex',activeIndex)
	                // console.log('nextActiveIndex',state.nextActiveIndex)
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
	                            transform: transform,
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
	                    if (_this2.needPseudoNode() === true) {
	                        // if direction is next and should active is pseudo item then redirect to 1
	                        activeIndex = activeIndex === slidesCount - 1 ? 1 : activeIndex;
	                        // if direction is prev and should active is pseudo item then redirect to the last real item
	                        activeIndex = activeIndex === 0 ? slidesCount - 2 : activeIndex;
	                    }
	                    var children = _react2["default"].Children.map(_this2.props.children, function (child, i) {
	                        /* dont render pseudo control item*/
	                        if (_this2.needPseudoNode() === true && i === slidesCount - 1) {
	                            return;
	                        }
	                        if (_this2.needPseudoNode() === true && i === 0) {
	                            return;
	                        }
	                        // console.log('activeIndex',activeIndex,"i",i)
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
	    reverse: false,
	    oriention: "horizontal", //vertical
	    autoPlay: false,
	    loop: true,
	    speed: 300,
	    delay: 5000,
	    pauseOnHover: true,
	    onChange: function onChange() {}
	};

	exports["default"] = Slider;
	module.exports = exports["default"];

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Array$from = __webpack_require__(240)["default"];

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
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(241), __esModule: true };

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(242);
	__webpack_require__(258);
	module.exports = __webpack_require__(16).Array.from;

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(243)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(245)(String, 'String', function(iterated){
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
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(244)
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
/* 244 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY         = __webpack_require__(246)
	  , $def            = __webpack_require__(14)
	  , $redef          = __webpack_require__(247)
	  , hide            = __webpack_require__(248)
	  , has             = __webpack_require__(251)
	  , SYMBOL_ITERATOR = __webpack_require__(252)('iterator')
	  , Iterators       = __webpack_require__(255)
	  , $iterCreate     = __webpack_require__(256)
	  , setToStringTag  = __webpack_require__(257)
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
/* 246 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(248);

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(7)
	  , createDesc = __webpack_require__(249);
	module.exports = __webpack_require__(250) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 249 */
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
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 251 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(253)('wks')
	  , uid    = __webpack_require__(254)
	  , Symbol = __webpack_require__(15).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 254 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 255 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(7)
	  , descriptor     = __webpack_require__(249)
	  , setToStringTag = __webpack_require__(257)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(248)(IteratorPrototype, __webpack_require__(252)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(7).setDesc
	  , has = __webpack_require__(251)
	  , TAG = __webpack_require__(252)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(25)
	  , $def        = __webpack_require__(14)
	  , toObject    = __webpack_require__(220)
	  , call        = __webpack_require__(259)
	  , isArrayIter = __webpack_require__(260)
	  , toLength    = __webpack_require__(261)
	  , getIterFn   = __webpack_require__(262);
	$def($def.S + $def.F * !__webpack_require__(264)(function(iter){ Array.from(iter); }), 'Array', {
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
/* 259 */
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
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(255)
	  , ITERATOR   = __webpack_require__(252)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return (Iterators.Array || ArrayProto[ITERATOR]) === it;
	};

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(244)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(263)
	  , ITERATOR  = __webpack_require__(252)('iterator')
	  , Iterators = __webpack_require__(255);
	module.exports = __webpack_require__(16).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(11)
	  , TAG = __webpack_require__(252)('toStringTag')
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
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(252)('iterator')
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
/* 265 */
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

	var _classnames = __webpack_require__(235);

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
/* 266 */
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
	                return _react2["default"].createElement("a", { href: "javascript:void(null)", onClick: handleGoBack, className: "iconfont icon-left-open" });
	            }
	            return null;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var title = this.props.title;

	            return _react2["default"].createElement(
	                "header",
	                { className: "header" },
	                this.renderBackButton(),
	                _react2["default"].createElement(
	                    "h1",
	                    null,
	                    title
	                ),
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
/* 267 */
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

	var _componentDropdownJsx = __webpack_require__(268);

	var _componentDropdownJsx2 = _interopRequireDefault(_componentDropdownJsx);

	var Promotions = (function (_Component) {
	    _inherits(Promotions, _Component);

	    function Promotions() {
	        _classCallCheck(this, Promotions);

	        _get(Object.getPrototypeOf(Promotions.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Promotions, [{
	        key: "render",
	        value: function render() {
	            var promotions = [],
	                promotionBriefs = [];
	            if (this.props.promotions !== null) {
	                var i = 0;
	                for (var k in this.props.promotions) {
	                    i++;
	                    var key = "promotion-" + i;
	                    promotions.push(_react2["default"].createElement(
	                        "div",
	                        { className: "promotion", key: key },
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "promotion-title" },
	                            k
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            { className: "promotion-desc" },
	                            this.props.promotions[k]
	                        )
	                    ));
	                    promotionBriefs.push(_react2["default"].createElement(
	                        "span",
	                        { key: key },
	                        k
	                    ));
	                }
	            }
	            return _react2["default"].createElement(
	                "div",
	                { className: "good-promotions" },
	                _react2["default"].createElement(
	                    _componentDropdownJsx2["default"],
	                    { showStatus: false,
	                        foldIcon: "up-open", unfoldIcon: "right-open" },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "promotions-brief" },
	                        promotionBriefs
	                    ),
	                    _react2["default"].createElement("div", { className: "promotions" })
	                )
	            );
	        }
	    }]);

	    return Promotions;
	})(_react.Component);

	exports["default"] = Promotions;
	module.exports = exports["default"];

/***/ },
/* 268 */
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

	var _classnames = __webpack_require__(235);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _iconJsx = __webpack_require__(269);

	var _iconJsx2 = _interopRequireDefault(_iconJsx);

	var _libDomEs6 = __webpack_require__(236);

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
	            if (_libDomEs62["default"].hasNode(e.target, _react2["default"].findDOMNode(this)) === true) {
	                return false;
	            }
	            this.setDropdownState(false);
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
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _get = __webpack_require__(4)["default"];

	var _inherits = __webpack_require__(18)["default"];

	var _createClass = __webpack_require__(29)["default"];

	var _classCallCheck = __webpack_require__(32)["default"];

	var _defineProperty = __webpack_require__(231)["default"];

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(235);

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
/* 270 */
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

	var _classnames = __webpack_require__(235);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _componentPopoverPopoverJsx = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../../component/popover/popover.jsx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _componentPopoverPopoverJsx2 = _interopRequireDefault(_componentPopoverPopoverJsx);

	var Properties = (function (_Component) {
	    _inherits(Properties, _Component);

	    function Properties() {
	        _classCallCheck(this, Properties);

	        _get(Object.getPrototypeOf(Properties.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Properties, [{
	        key: "render",
	        value: function render() {
	            var _this = this;

	            var _props = this.props;
	            var onPropertyChange = _props.onPropertyChange;
	            var selectedProperty = _props.selectedProperty;
	            var stock = _props.stock;

	            var properties = this.props.properties.map(function (property, i) {
	                if (property.propertyValues.length === 0) {
	                    return null;
	                }
	                var propertyValues = [];
	                property.propertyValues.map(function (propertyValue, j) {
	                    var active = property.selectedValue !== null && property.selectedValue.value === propertyValue.value;
	                    var propertyClasses = (0, _classnames2["default"])("property-value", {
	                        active: active,
	                        "default": propertyValue.disabled === true
	                    });
	                    var popoverActive = selectedProperty !== null && selectedProperty.propertyName === property.propertyName && (stock !== null && active);
	                    // console.log('popoverActive',selectedProperty,active,popoverActive)
	                    // console.log(property.selectedValue,propertyValue)
	                    propertyValues.push(_react2["default"].createElement(
	                        "div",
	                        { className: propertyClasses,
	                            key: "property-value-" + j,
	                            onClick: onPropertyChange.bind(_this, property, propertyValue)
	                        },
	                        _react2["default"].createElement(
	                            _componentPopoverPopoverJsx2["default"],
	                            {
	                                active: popoverActive
	                            },
	                            "还剩",
	                            _react2["default"].createElement(
	                                "b",
	                                null,
	                                stock
	                            ),
	                            "件"
	                        ),
	                        propertyValue.value
	                    ));
	                });
	                return _react2["default"].createElement(
	                    "div",
	                    { className: "property", key: "property-" + i },
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "divider-title" },
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            property.propertyName
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "div",
	                        { className: "property-values" },
	                        propertyValues
	                    )
	                );
	            });
	            return _react2["default"].createElement(
	                "div",
	                { className: "properties" },
	                properties
	            );
	        }
	    }]);

	    return Properties;
	})(_react.Component);

	exports["default"] = Properties;
	module.exports = exports["default"];

/***/ },
/* 271 */
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

	var _libDomEs6 = __webpack_require__(236);

	var _libDomEs62 = _interopRequireDefault(_libDomEs6);

	var Toolbar = (function (_Component) {
	    _inherits(Toolbar, _Component);

	    function Toolbar(props) {
	        _classCallCheck(this, Toolbar);

	        _get(Object.getPrototypeOf(Toolbar.prototype), "constructor", this).call(this, props);
	        this.state = {
	            cartCount: props.cartCount
	        };
	    }

	    _createClass(Toolbar, [{
	        key: "transitionCartBadge",
	        value: function transitionCartBadge() {
	            var _this = this;

	            var imgNode = document.body.querySelector(".slides>.active img").cloneNode(true);
	            var overlayerNode = _react2["default"].findDOMNode(this.refs.cartOverlayer);
	            overlayerNode.innerHTML = "";
	            overlayerNode.appendChild(imgNode);
	            // console.log(overlayerNode)
	            _libDomEs62["default"].addClass(overlayerNode, "scale-to-buttom");
	            setTimeout(function () {
	                overlayerNode.innerHTML = "";
	                _libDomEs62["default"].removeClass(overlayerNode, "scale-to-buttom");
	                _this.setState({
	                    cartCount: _this.props.cartCount
	                });
	            }, 2000);
	        }
	    }, {
	        key: "componentDidUpdate",
	        value: function componentDidUpdate(prevProps, prevState) {
	            if (prevProps.cartCount !== this.props.cartCount) {
	                this.transitionCartBadge();
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _props = this.props;
	            var addToCart = _props.addToCart;
	            var toggleFavorite = _props.toggleFavorite;
	            var directBuy = _props.directBuy;

	            return _react2["default"].createElement(
	                "div",
	                { className: "good-toolbar" },
	                _react2["default"].createElement("div", { className: "good-toolbar-icon", onClick: toggleFavorite }),
	                _react2["default"].createElement(
	                    "a",
	                    { className: "good-toolbar-icon", href: "/cart" },
	                    _react2["default"].createElement(
	                        "span",
	                        { className: "cart-badge" },
	                        this.state.cartCount
	                    ),
	                    _react2["default"].createElement("div", { className: "cart-overlayer", ref: "cartOverlayer" })
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "good-toolbar-button" },
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "javascript:void(null)",
	                            onClick: addToCart },
	                        "加入购物袋"
	                    )
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "good-toolbar-button" },
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "javascript:void(null)",
	                            onClick: directBuy },
	                        "立即购买"
	                    ),
	                    this.props.children
	                )
	            );
	        }
	    }]);

	    return Toolbar;
	})(_react.Component);

	exports["default"] = Toolbar;
	module.exports = exports["default"];

/***/ },
/* 272 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);