webpackJsonp([22],{0:function(e,t,n){n(589),e.exports=n(593)},208:function(e,t,n){"use strict";function r(e,t){var n=function(n){function r(){s(this,r),a(Object.getPrototypeOf(r.prototype),"constructor",this).apply(this,arguments)}return i(r,n),o(r,[{key:"render",value:function(){return f["default"].createElement(e,u({},this.props,c.bindActionCreators(t,this.props.dispatch)))}}]),r}(d.Component);return n}var a=n(4)["default"],i=n(18)["default"],o=n(29)["default"],s=n(32)["default"],u=n(209)["default"],l=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0}),t.wrapComponentWithActions=r;var c=n(197),d=n(33),f=l(d),p=n(215),h=l(p),m=n(216),v=l(m),y=v["default"](),g=c.applyMiddleware(h["default"],y)(c.createStore);t["default"]=g},209:function(e,t,n){"use strict";var r=n(210)["default"];t["default"]=r||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},t.__esModule=!0},210:function(e,t,n){e.exports={"default":n(211),__esModule:!0}},211:function(e,t,n){n(212),e.exports=n(16).Object.assign},212:function(e,t,n){var r=n(14);r(r.S+r.F,"Object",{assign:n(213)})},213:function(e,t,n){var r=n(7),a=n(214),i=n(10);e.exports=n(17)(function(){var e=Object.assign,t={},n={},r=Symbol(),a="abcdefghijklmnopqrst";return t[r]=7,a.split("").forEach(function(e){n[e]=e}),7!=e({},t)[r]||Object.keys(e({},n)).join("")!=a})?function(e,t){for(var n=a(e),o=arguments,s=o.length,u=1,l=r.getKeys,c=r.getSymbols,d=r.isEnum;s>u;)for(var f,p=i(o[u++]),h=c?l(p).concat(c(p)):l(p),m=h.length,v=0;m>v;)d.call(p,f=h[v++])&&(n[f]=p[f]);return n}:Object.assign},214:function(e,t,n){var r=n(12);e.exports=function(e){return Object(r(e))}},215:function(e,t){"use strict";function n(e){var t=e.dispatch,n=e.getState;return function(e){return function(r){return"function"==typeof r?r(t,n):e(r)}}}t.__esModule=!0,t["default"]=n,e.exports=t["default"]},216:function(e,t){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return function(t){var n=t.getState;return function(t){return function(r){var o=e.level,s=e.logger,u=e.collapsed,l=e.predicate,c=e.duration,d=void 0===c?!1:c,f=e.timestamp,p=void 0===f?!0:f,h=e.transformer,m=void 0===h?function(e){return e}:h,v=e.actionTransformer,y=void 0===v?function(e){return e}:v,g=s||window.console;if("undefined"==typeof g)return t(r);if("function"==typeof l&&!l(n,r))return t(r);var _=i.now(),E=m(n()),b=t(r),w=i.now()-_,M=m(n()),T=new Date,k="function"==typeof u?u(n,r):u,D=p?" @ "+a(T.getHours(),2)+":"+a(T.getMinutes(),2)+":"+a(T.getSeconds(),2)+"."+a(T.getMilliseconds(),3):"",N=d?" in "+w.toFixed(2)+" ms":"",O=y(r),x="action "+O.type+D+N,C=k?g.groupCollapsed:g.group;try{C.call(g,x)}catch(S){g.log(x)}o?(g[o]("%c prev state","color: #9E9E9E; font-weight: bold",E),g[o]("%c action","color: #03A9F4; font-weight: bold",O),g[o]("%c next state","color: #4CAF50; font-weight: bold",M)):(g.log("%c prev state","color: #9E9E9E; font-weight: bold",E),g.log("%c action","color: #03A9F4; font-weight: bold",O),g.log("%c next state","color: #4CAF50; font-weight: bold",M));try{g.groupEnd()}catch(S){g.log("—— log end ——")}return b}}}}Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t){return new Array(t+1).join(e)},a=function(e,t){return r("0",t-e.toString().length)+e},i="undefined"!=typeof performance&&"function"==typeof performance.now?performance:Date;t["default"]=n,e.exports=t["default"]},217:function(e,t,n){"use strict";var r=n(4)["default"],a=n(18)["default"],i=n(29)["default"],o=n(32)["default"],s=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var u=n(33),l=s(u),c=function(e){function t(){o(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return a(t,e),i(t,[{key:"renderBackButton",value:function(){var e=this.props,t=e.canBack,n=e.handleGoBack;return t===!0?l["default"].createElement("a",{href:"javascript:;",onClick:n,className:"iconfont icon-back"}):null}},{key:"render",value:function(){return l["default"].createElement("header",{className:"header"},this.renderBackButton(),this.props.children)}}]),t}(u.Component);c.defaultProps={canBack:!0,handleGoBack:function(){window.history.back()}},t["default"]=c,e.exports=t["default"]},234:function(e,t,n){var r;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
!function(){"use strict";function a(){for(var e="",t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=typeof n;if("string"===r||"number"===r)e+=" "+n;else if(Array.isArray(n))e+=" "+a.apply(null,n);else if("object"===r)for(var o in n)i.call(n,o)&&n[o]&&(e+=" "+o)}}return e.substr(1)}var i={}.hasOwnProperty;"undefined"!=typeof e&&e.exports?e.exports=a:(r=function(){return a}.call(t,n,t,e),!(void 0!==r&&(e.exports=r)))}()},240:function(e,t,n){"use strict";var r=n(4)["default"],a=n(18)["default"],i=n(29)["default"],o=n(32)["default"],s=n(241)["default"],u=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var l=n(33),c=u(l),d=n(234),f=u(d),p=function(e){function t(){o(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return a(t,e),i(t,[{key:"render",value:function(){var e=this.props.icon,t=f["default"](this.props.className,s({iconfont:!0},"icon-"+e,!0));return c["default"].createElement("span",{className:t})}}]),t}(l.Component);t["default"]=p,e.exports=t["default"]},241:function(e,t,n){"use strict";var r=n(30)["default"];t["default"]=function(e,t,n){return t in e?r(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},t.__esModule=!0},353:function(e,t,n){"use strict";var r=n(4)["default"],a=n(18)["default"],i=n(29)["default"],o=n(32)["default"],s=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var u=n(33),l=s(u),c=n(234),d=s(c),f=function(e){function t(e){o(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e),this.state={activeIndex:e.activeIndex,prevIndex:null}}return a(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){void 0!==e.activeIndex&&e.activeIndex!==this.props.activeIndex&&this.setState({prevIndex:this.props.activeIndex,activeIndex:e.activeIndex})}},{key:"handleClick",value:function(e,t){var n=this;t&&t.preventDefault();var r=this.state.activeIndex,a=this.props.handleToggleFlag;a&&a(e,t),this.setState({activeIndex:e,prevIndex:r},function(){n.props.onSelect(e)})}},{key:"renderNav",value:function(){var e=this,t=this.props.children,n=[];return t.forEach(function(e){n.push(e.props.title)}),n.map(function(t,n){var r=d["default"]({active:n===e.state.activeIndex});return l["default"].createElement("li",{className:r,key:"tab-nav-"+n,onClick:e.handleClick.bind(e,n)},t)})}},{key:"renderContent",value:function(e,t){return l["default"].cloneElement(e,{active:t===this.state.activeIndex,index:e.key?e.key:t})}},{key:"render",value:function(){var e=this.props.effect,t=d["default"]("tabs-content",{"tabs-content-fade":"fade"===e,"tabs-content-slide":"slide"===e});return l["default"].createElement("div",{className:"tabs"},l["default"].createElement("div",{className:"polyTabs"},l["default"].createElement("ul",null,this.renderNav())),l["default"].createElement("div",{className:t},l["default"].Children.map(this.props.children,this.renderContent.bind(this))))}}]),t}(u.Component);t.Tabs=f,f.defaultProps={effect:"fade",activeIndex:0,onSelect:function(){}};var p=function(e){function t(e){o(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e),this.state={activeIndex:e.activeIndex,prevIndex:null}}return a(t,e),i(t,[{key:"handleTouch",value:function n(e,t){var r=this;t&&t.preventDefault();var e=0===e?1:0,a=this.state.activeIndex,n=this.props.handleTouch;n&&n(e,t),this.setState({activeIndex:e,prevIndex:a},function(){r.props.onSelect(e)})}},{key:"render",value:function(){var e=this.props,t=e.active,n=e.index,r=(e.handleTouch,d["default"]("tabs-item",{active:t}));return l["default"].createElement("div",{className:r,key:"tabs-item-"+n},this.props.children)}}]),t}(u.Component);t.TabsItem=p,p.defaultProps={activeIndex:0,onSelect:function(){}}},589:function(e,t,n){"use strict";function r(){var e=JSON.parse(document.getElementById("initial-state").textContent);c["default"].render(u["default"].createElement(o["default"],{initialState:e}),document.getElementById("topic"))}var a=n(2)["default"],i=n(590),o=a(i),s=n(33),u=a(s),l=n(218),c=a(l);window.addEventListener("DOMContentLoaded",r)},590:function(e,t,n){"use strict";function r(e){return e}var a=n(4)["default"],i=n(18)["default"],o=n(29)["default"],s=n(32)["default"],u=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var l=n(33),c=u(l),d=n(190),f=(n(197),n(591)),p=u(f),h=n(208),m=u(h),v=n(592),y=u(v),g=d.connect(r)(y["default"]),_=function(e){function t(){s(this,t),a(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return i(t,e),o(t,[{key:"render",value:function(){var e=this.props.initialState,t=e.data,n=e.title,r=m["default"](p["default"],{topic:{isFetching:!1,data:t,title:n}});return c["default"].createElement(d.Provider,{store:r},c["default"].createElement(g,null))}}]),t}(c["default"].Component);t["default"]=_,e.exports=t["default"]},591:function(e,t,n){"use strict";function r(e,t){switch(void 0===e&&(e={}),t.type){default:return e}}var a=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var i=n(197),o=n(231),s=(a(o),i.combineReducers({topic:r}));t["default"]=s,e.exports=t["default"]},592:function(e,t,n){"use strict";var r=n(4)["default"],a=n(18)["default"],i=n(29)["default"],o=n(32)["default"],s=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var u=n(33),l=s(u),c=n(217),d=s(c),f=n(240),p=(s(f),n(234)),h=(s(p),n(353),function(e){function t(){o(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return a(t,e),i(t,[{key:"render",value:function(){var e=this.props.topic.title;return l["default"].createElement("div",{className:"topic-content"},l["default"].createElement(d["default"],null,e),l["default"].createElement("div",{className:"flashBuy"},l["default"].createElement("a",{href:"/gooddetail/1",className:"clearfix"},l["default"].createElement("img",{src:"/client/asset/images/pic8.gif"}),l["default"].createElement("div",{className:"right"},l["default"].createElement("span",{className:"name"},"荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（..."),l["default"].createElement("span",{className:"country"},l["default"].createElement("i",null,l["default"].createElement("img",{src:"/client/asset/images/ico_flag.png",alt:""})),"荷兰"),l["default"].createElement("span",{className:"nowPrice"},"¥99.0"),l["default"].createElement("span",{className:"oldPrice"},"¥199.0"))),l["default"].createElement("a",{href:"/gooddetail/1",className:"clearfix"},l["default"].createElement("img",{src:"/client/asset/images/pic8.gif"}),l["default"].createElement("div",{className:"right"},l["default"].createElement("span",{className:"name"},"荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（..."),l["default"].createElement("span",{className:"country"},l["default"].createElement("i",null,l["default"].createElement("img",{src:"/client/asset/images/ico_flag.png",alt:""})),"荷兰"),l["default"].createElement("span",{className:"nowPrice"},"¥99.0"),l["default"].createElement("span",{className:"oldPrice"},"¥199.0"))),l["default"].createElement("a",{href:"/gooddetail/1",className:"clearfix"},l["default"].createElement("img",{src:"/client/asset/images/pic8.gif"}),l["default"].createElement("div",{className:"right"},l["default"].createElement("span",{className:"name"},"荷兰原装Hero baby【免税店】奶粉1段（0-6个月）800g（..."),l["default"].createElement("span",{className:"country"},l["default"].createElement("i",null,l["default"].createElement("img",{src:"/client/asset/images/ico_flag.png",alt:""})),"荷兰"),l["default"].createElement("span",{className:"nowPrice"},"¥99.0"),l["default"].createElement("span",{className:"oldPrice"},"¥199.0")))))}}]),t}(u.Component));t["default"]=h,e.exports=t["default"]},593:function(e,t){}});