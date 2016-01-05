webpackJsonp([23],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(585);
	module.exports = __webpack_require__(589);


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

/***/ 262:
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

/***/ 585:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)["default"];

	var _sharedChunkTopicAppJsx = __webpack_require__(586);

	var _sharedChunkTopicAppJsx2 = _interopRequireDefault(_sharedChunkTopicAppJsx);

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(218);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function bootstrap() {
	    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
	    _reactDom2["default"].render(_react2["default"].createElement(_sharedChunkTopicAppJsx2["default"], { initialState: initialState }), document.getElementById('topic'));
	}

	if (typeof window.addEventListener) {
	    window.addEventListener("DOMContentLoaded", bootstrap);
	} else {
	    window.attachEvent('onload', bootstrap);
	}

/***/ },

/***/ 586:
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

	var _redux = __webpack_require__(197);

	var _reducerEs6 = __webpack_require__(587);

	var _reducerEs62 = _interopRequireDefault(_reducerEs6);

	var _libReduxHelperEs6 = __webpack_require__(208);

	var _libReduxHelperEs62 = _interopRequireDefault(_libReduxHelperEs6);

	var _componentJsx = __webpack_require__(588);

	var _componentJsx2 = _interopRequireDefault(_componentJsx);

	function selector(state) {
	    return state;
	}

	var NavbarConnected = (0, _reactRedux.connect)(selector)(_componentJsx2["default"]);

	var NavbarApp = (function (_React$Component) {
	    _inherits(NavbarApp, _React$Component);

	    function NavbarApp() {
	        _classCallCheck(this, NavbarApp);

	        _get(Object.getPrototypeOf(NavbarApp.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(NavbarApp, [{
	        key: "render",
	        value: function render() {
	            var _props$initialState = this.props.initialState;
	            var data = _props$initialState.data;
	            var title = _props$initialState.title;

	            var store = (0, _libReduxHelperEs62["default"])(_reducerEs62["default"], {
	                topic: {
	                    isFetching: false,
	                    data: data,
	                    title: title
	                }
	            });
	            return _react2["default"].createElement(
	                _reactRedux.Provider,
	                { store: store },
	                _react2["default"].createElement(NavbarConnected, null)
	            );
	        }
	    }]);

	    return NavbarApp;
	})(_react2["default"].Component);

	exports["default"] = NavbarApp;
	module.exports = exports["default"];

/***/ },

/***/ 587:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)["default"];

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(197);

	var _lodash = __webpack_require__(231);

	var _lodash2 = _interopRequireDefault(_lodash);

	function topic(state, action) {
	    if (state === undefined) state = {};

	    switch (action.type) {
	        default:
	            return state;
	    }
	}

	var rootReducer = (0, _redux.combineReducers)({
	    topic: topic
	});

	exports["default"] = rootReducer;
	module.exports = exports["default"];

/***/ },

/***/ 588:
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

	var _componentTabsJsx = __webpack_require__(262);

	var Topic = (function (_Component) {
	    _inherits(Topic, _Component);

	    function Topic() {
	        _classCallCheck(this, Topic);

	        _get(Object.getPrototypeOf(Topic.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(Topic, [{
	        key: "render",
	        value: function render() {
	            var title = this.props.topic.title;

	            return _react2["default"].createElement(
	                "div",
	                { className: "topic-content" },
	                _react2["default"].createElement(
	                    _commonHeaderJsx2["default"],
	                    null,
	                    title
	                ),
	                _react2["default"].createElement(
	                    "div",
	                    { className: "flashBuy" },
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "/gooddetail/1", className: "clearfix" },
	                        _react2["default"].createElement("img", { src: "/client/asset/images/pic8.gif" }),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "right" },
	                            _react2["default"].createElement(
	                                "span",
	                                { className: "name" },
	                                "荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（..."
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
	                                "¥99.0"
	                            ),
	                            _react2["default"].createElement(
	                                "span",
	                                { className: "oldPrice" },
	                                "¥199.0"
	                            )
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "/gooddetail/1", className: "clearfix" },
	                        _react2["default"].createElement("img", { src: "/client/asset/images/pic8.gif" }),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "right" },
	                            _react2["default"].createElement(
	                                "span",
	                                { className: "name" },
	                                "荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（..."
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
	                                "¥99.0"
	                            ),
	                            _react2["default"].createElement(
	                                "span",
	                                { className: "oldPrice" },
	                                "¥199.0"
	                            )
	                        )
	                    ),
	                    _react2["default"].createElement(
	                        "a",
	                        { href: "/gooddetail/1", className: "clearfix" },
	                        _react2["default"].createElement("img", { src: "/client/asset/images/pic8.gif" }),
	                        _react2["default"].createElement(
	                            "div",
	                            { className: "right" },
	                            _react2["default"].createElement(
	                                "span",
	                                { className: "name" },
	                                "荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（..."
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
	                                "¥99.0"
	                            ),
	                            _react2["default"].createElement(
	                                "span",
	                                { className: "oldPrice" },
	                                "¥199.0"
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Topic;
	})(_react.Component);

	exports["default"] = Topic;
	module.exports = exports["default"];

/***/ },

/***/ 589:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});