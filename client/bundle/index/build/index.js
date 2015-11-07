webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(274);
	module.exports = __webpack_require__(279);


/***/ },

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(217), __esModule: true };

/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(218);
	module.exports = __webpack_require__(16).Object.assign;

/***/ },

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(14);

	$def($def.S + $def.F, 'Object', {assign: __webpack_require__(219)});

/***/ },

/***/ 219:
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

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },

/***/ 222:
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

/***/ 227:
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

/***/ 228:
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

/***/ 229:
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

/***/ 235:
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

/***/ 274:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)["default"];

	var _sharedChunkIndexAppJsx = __webpack_require__(275);

	var _sharedChunkIndexAppJsx2 = _interopRequireDefault(_sharedChunkIndexAppJsx);

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(190);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function bootstrap() {
	    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
	    _reactDom2["default"].render(_react2["default"].createElement(_sharedChunkIndexAppJsx2["default"], { initialState: initialState }), document.getElementById('weather'));
	}

	if (typeof window.addEventListener) {
	    window.addEventListener("DOMContentLoaded", bootstrap);
	} else {
	    window.attachEvent('onload', bootstrap);
	}

/***/ },

/***/ 275:
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

	var _reducerEs6 = __webpack_require__(276);

	var _reducerEs62 = _interopRequireDefault(_reducerEs6);

	var _libStoreCreatorEs6 = __webpack_require__(227);

	var _libStoreCreatorEs62 = _interopRequireDefault(_libStoreCreatorEs6);

	var _componentJsx = __webpack_require__(278);

	var _componentJsx2 = _interopRequireDefault(_componentJsx);

	function selector(state) {
	    var weatherByCityName = state.weatherByCityName;

	    return {
	        weatherByCityName: weatherByCityName
	    };
	}

	var WeatherConnected = (0, _reactRedux.connect)(selector)(_componentJsx2["default"]);

	var WeatherApp = (function (_React$Component) {
	    _inherits(WeatherApp, _React$Component);

	    function WeatherApp() {
	        _classCallCheck(this, WeatherApp);

	        _get(Object.getPrototypeOf(WeatherApp.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(WeatherApp, [{
	        key: "render",
	        value: function render() {
	            var weather = this.props.initialState.weather;

	            var store = (0, _libStoreCreatorEs62["default"])(_reducerEs62["default"], {
	                weatherByCityName: {
	                    isFetching: false,
	                    weather: weather
	                }
	            });
	            return _react2["default"].createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2["default"].createElement(WeatherConnected, null)
	            );
	        }
	    }]);

	    return WeatherApp;
	})(_react2["default"].Component);

	exports["default"] = WeatherApp;
	module.exports = exports["default"];

/***/ },

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$assign = __webpack_require__(216)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _actionEs6 = __webpack_require__(277);

	var _redux = __webpack_require__(204);

	function weatherByCityName(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        case _actionEs6.CHANGE_FIELD:
	            var name = action.name,
	                value = action.value;

	            var weather = _Object$assign({}, state.weather);
	            weather[name] = value;
	            return _Object$assign({}, state, {
	                weather: weather
	            });
	        case _actionEs6.REQUEST_WEATHER:
	            return _Object$assign({}, state, {
	                weatherFetched: false,
	                weatherFetching: true
	            });
	        case _actionEs6.RESPONSE_WEATHER:
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
	module.exports = exports["default"];

/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.changeField = changeField;
	exports.fetchWeather = fetchWeather;

	var _libUtilEs6 = __webpack_require__(222);

	var CHANGE_FIELD = "CHANGE_FIELD";
	exports.CHANGE_FIELD = CHANGE_FIELD;
	var REQUEST_WEATHER = "REQUEST_WEATHER";
	exports.REQUEST_WEATHER = REQUEST_WEATHER;
	var RESPONSE_WEATHER = "RESPONSE_WEATHER";

	exports.RESPONSE_WEATHER = RESPONSE_WEATHER;

	function changeField(name, value) {
	    return {
	        type: CHANGE_FIELD,
	        name: name,
	        value: value
	    };
	}

	function requestWeather(param) {
	    return {
	        type: REQUEST_WEATHER,
	        param: param
	    };
	}

	function responseWeather(param, res) {
	    return {
	        type: RESPONSE_WEATHER,
	        param: param,
	        res: res,
	        receiveAt: Date.now()
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

/***/ 278:
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

	var _actionEs6 = __webpack_require__(277);

	var Weather = (function (_Component) {
	    _inherits(Weather, _Component);

	    function Weather() {
	        _classCallCheck(this, Weather);

	        _get(Object.getPrototypeOf(Weather.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Weather, [{
	        key: "handleChange",
	        value: function handleChange(e) {
	            e && e.preventDefault();
	            var dispatch = this.props.dispatch;

	            dispatch((0, _actionEs6.changeField)("city", e.target.value));
	        }
	    }, {
	        key: "handleQuery",
	        value: function handleQuery(e) {
	            e && e.preventDefault();
	            var dispatch = this.props.dispatch;
	            var weather = this.props.weatherByCityName.weather;

	            dispatch((0, _actionEs6.fetchWeather)({
	                cityname: weather.city
	            }));
	        }
	    }, {
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(nextProps) {
	            var dispatch = this.props.dispatch;

	            if (nextProps.weatherByCityName.weatherFetching === false && this.props.weatherByCityName.weatherFetching === true) {
	                if (nextProps.weatherByCityName.weatherFetched === true) {
	                    alert("fetch success!");
	                } else {
	                    alert(nextProps.errMsg);
	                }
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var weather = this.props.weatherByCityName.weather;

	            var classes = (0, _classnames2["default"])({
	                "weather-content": true
	            });
	            return _react2["default"].createElement(
	                "div",
	                { className: classes },
	                _react2["default"].createElement(
	                    "h3",
	                    null,
	                    "Weather"
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "weather-form" },
	                    _react2["default"].createElement("input", { type: "text", name: "cityname", value: weather.city, onChange: this.handleChange.bind(this) }),
	                    _react2["default"].createElement(
	                        "button",
	                        { onClick: this.handleQuery.bind(this) },
	                        "Query"
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        _react2["default"].createElement(
	                            "label",
	                            null,
	                            "City:"
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            weather.pinyin
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        _react2["default"].createElement(
	                            "label",
	                            null,
	                            "Date:"
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            weather.date
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        _react2["default"].createElement(
	                            "label",
	                            null,
	                            "Postcode:"
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            weather.postCode
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        _react2["default"].createElement(
	                            "label",
	                            null,
	                            "Sunrise:"
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            weather.sunrise
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        _react2["default"].createElement(
	                            "label",
	                            null,
	                            "Sunset:"
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            weather.sunset
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        _react2["default"].createElement(
	                            "label",
	                            null,
	                            "Coordinate:"
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            weather.longitude,
	                            "/",
	                            weather.latitude
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "p",
	                        null,
	                        _react2["default"].createElement(
	                            "label",
	                            null,
	                            "Weather:"
	                        ),
	                        _react2["default"].createElement(
	                            "span",
	                            null,
	                            weather.weather
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Weather;
	})(_react.Component);

	exports["default"] = Weather;
	module.exports = exports["default"];

/***/ },

/***/ 279:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});