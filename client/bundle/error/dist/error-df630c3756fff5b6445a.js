webpackJsonp([6],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(341);
	module.exports = __webpack_require__(343);


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

/***/ 341:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)["default"];

	var _sharedChunkCommonErrorJsx = __webpack_require__(342);

	var _sharedChunkCommonErrorJsx2 = _interopRequireDefault(_sharedChunkCommonErrorJsx);

	var _react = __webpack_require__(33);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(218);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function bootstrap() {
	    var initialState = JSON.parse(document.getElementById("initial-state").textContent);
	    _reactDom2["default"].render(_react2["default"].createElement(_sharedChunkCommonErrorJsx2["default"], { initialState: initialState }), document.getElementById('error'));
	}

	if (typeof window.addEventListener) {
	    window.addEventListener("DOMContentLoaded", bootstrap);
	} else {
	    window.attachEvent('onload', bootstrap);
	}

/***/ },

/***/ 342:
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

	var _headerJsx = __webpack_require__(217);

	var _headerJsx2 = _interopRequireDefault(_headerJsx);

	var ErrorContent = (function (_Component) {
	    _inherits(ErrorContent, _Component);

	    function ErrorContent() {
	        _classCallCheck(this, ErrorContent);

	        _get(Object.getPrototypeOf(ErrorContent.prototype), "constructor", this).apply(this, arguments);
	    }

	    _createClass(ErrorContent, [{
	        key: "render",
	        value: function render() {
	            var _props$initialState = this.props.initialState;
	            var msg = _props$initialState.msg;
	            var code = _props$initialState.code;

	            return _react2["default"].createElement(
	                "div",
	                { className: "empty noPadTop" },
	                _react2["default"].createElement(
	                    _headerJsx2["default"],
	                    null,
	                    code
	                ),
	                _react2["default"].createElement("img", { src: "/client/asset/images/404.png" }),
	                _react2["default"].createElement(
	                    "span",
	                    null,
	                    msg
	                )
	            );
	        }
	    }]);

	    return ErrorContent;
	})(_react.Component);

	ErrorContent.defaultProps = {
	    error: {
	        msg: ""
	    }
	};

	exports["default"] = ErrorContent;
	module.exports = exports["default"];

/***/ },

/***/ 343:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});