webpackJsonp([3],{0:function(e,t,n){n(257),e.exports=n(263)},208:function(e,t,n){"use strict";function a(e,t){var n=function(n){function a(){l(this,a),r(Object.getPrototypeOf(a.prototype),"constructor",this).apply(this,arguments)}return o(a,n),c(a,[{key:"render",value:function(){return f["default"].createElement(e,i({},this.props,s.bindActionCreators(t,this.props.dispatch)))}}]),a}(d.Component);return n}var r=n(4)["default"],o=n(18)["default"],c=n(29)["default"],l=n(32)["default"],i=n(209)["default"],u=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0}),t.wrapComponentWithActions=a;var s=n(197),d=n(33),f=u(d),p=n(215),m=u(p),h=n(216),v=u(h),g=v["default"](),E=s.applyMiddleware(m["default"],g)(s.createStore);t["default"]=E},209:function(e,t,n){"use strict";var a=n(210)["default"];t["default"]=a||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},t.__esModule=!0},210:function(e,t,n){e.exports={"default":n(211),__esModule:!0}},211:function(e,t,n){n(212),e.exports=n(16).Object.assign},212:function(e,t,n){var a=n(14);a(a.S+a.F,"Object",{assign:n(213)})},213:function(e,t,n){var a=n(7),r=n(214),o=n(10);e.exports=n(17)(function(){var e=Object.assign,t={},n={},a=Symbol(),r="abcdefghijklmnopqrst";return t[a]=7,r.split("").forEach(function(e){n[e]=e}),7!=e({},t)[a]||Object.keys(e({},n)).join("")!=r})?function(e,t){for(var n=r(e),c=arguments,l=c.length,i=1,u=a.getKeys,s=a.getSymbols,d=a.isEnum;l>i;)for(var f,p=o(c[i++]),m=s?u(p).concat(s(p)):u(p),h=m.length,v=0;h>v;)d.call(p,f=m[v++])&&(n[f]=p[f]);return n}:Object.assign},214:function(e,t,n){var a=n(12);e.exports=function(e){return Object(a(e))}},215:function(e,t){"use strict";function n(e){var t=e.dispatch,n=e.getState;return function(e){return function(a){return"function"==typeof a?a(t,n):e(a)}}}t.__esModule=!0,t["default"]=n,e.exports=t["default"]},216:function(e,t){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return function(t){var n=t.getState;return function(t){return function(a){var c=e.level,l=e.logger,i=e.collapsed,u=e.predicate,s=e.duration,d=void 0===s?!1:s,f=e.timestamp,p=void 0===f?!0:f,m=e.transformer,h=void 0===m?function(e){return e}:m,v=e.actionTransformer,g=void 0===v?function(e){return e}:v,E=l||window.console;if("undefined"==typeof E)return t(a);if("function"==typeof u&&!u(n,a))return t(a);var y=o.now(),b=h(n()),k=t(a),w=o.now()-y,O=h(n()),_=new Date,C="function"==typeof i?i(n,a):i,x=p?" @ "+r(_.getHours(),2)+":"+r(_.getMinutes(),2)+":"+r(_.getSeconds(),2)+"."+r(_.getMilliseconds(),3):"",N=d?" in "+w.toFixed(2)+" ms":"",S=g(a),I="action "+S.type+x+N,P=C?E.groupCollapsed:E.group;try{P.call(E,I)}catch(j){E.log(I)}c?(E[c]("%c prev state","color: #9E9E9E; font-weight: bold",b),E[c]("%c action","color: #03A9F4; font-weight: bold",S),E[c]("%c next state","color: #4CAF50; font-weight: bold",O)):(E.log("%c prev state","color: #9E9E9E; font-weight: bold",b),E.log("%c action","color: #03A9F4; font-weight: bold",S),E.log("%c next state","color: #4CAF50; font-weight: bold",O));try{E.groupEnd()}catch(j){E.log("—— log end ——")}return k}}}}Object.defineProperty(t,"__esModule",{value:!0});var a=function(e,t){return new Array(t+1).join(e)},r=function(e,t){return a("0",t-e.toString().length)+e},o="undefined"!=typeof performance&&"function"==typeof performance.now?performance:Date;t["default"]=n,e.exports=t["default"]},217:function(e,t,n){"use strict";var a=n(4)["default"],r=n(18)["default"],o=n(29)["default"],c=n(32)["default"],l=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var i=n(33),u=l(i),s=function(e){function t(){c(this,t),a(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return r(t,e),o(t,[{key:"renderBackButton",value:function(){var e=this.props,t=e.canBack,n=e.handleGoBack;return t===!0?u["default"].createElement("a",{href:"javascript:void(null)",onClick:n,className:"iconfont icon-back"}):null}},{key:"render",value:function(){return u["default"].createElement("header",{className:"header"},this.renderBackButton(),this.props.children)}}]),t}(i.Component);s.defaultProps={canBack:!0,handleGoBack:function(){window.history.back()}},t["default"]=s,e.exports=t["default"]},227:function(e,t,n){"use strict";function a(e,t){var n=arguments.length<=2||void 0===arguments[2]?{method:"GET",type:"json"}:arguments[2];return n=m({},n,{url:e,data:t}),g["default"](n)}function r(e){return E.base64.encode(e)}function o(e){return E.base64.decode(e)}function c(e){var t=E.base64.encode(e);return t.replace(/=/g,"_").replace(/\//g,",").replace(/\+/g,"-")}function l(e){return e=e.replace(/_/g,"=").replace(/,/g,"/").replace(/-/g,"+"),E.base64.decode(e)}function i(e){var t=[];for(var n in e)t.push(n+"="+e[n]);return t.join("&")}function u(e,t){var n=document.createEvent("Event");n.initEvent(t,!0,!0),e.dispatchEvent(n)}function s(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on${event}",function(t){n.call(e,t||window.event)})}function d(e,t,n){e.removeEventListener?e.removeEventListener(t,n):e.detachEvent&&e.detachEvent("on${event}",n)}function f(e){var t="CSS1Compat"===document.compatMode,n=void 0!==window.pageYOffset,a=n?window.pageYOffset:t?document.documentElement.scrollTop:document.body.scrollTop,r=n?window.pageXOffset:t?document.documentElement.scrollLeft:document.body.scrollLeft;return void 0!==e&&window.scrollTo(r,e),a}function p(e){var t=this;this.bindEvent(window,"scroll",function(){var n=t.scrollTop();document.documentElement.clientHeight+n>=document.documentElement.scrollHeight&&e()})}var m=n(210)["default"],h=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0}),t.apiRequest=a,t.base64Encode=r,t.base64Decode=o,t.base64EncodeForURL=c,t.base64DecodeForURL=l,t.urlParam=i,t.dispatchEvent=u,t.bindEvent=s,t.unbindEvent=d,t.scrollTop=f,t.registerPullDownEvent=p;var v=n(228),g=h(v),E=n(230),y={bindEvent:s,unbindEvent:d,scrollTop:f,registerPullDownEvent:p};t["default"]=y},230:function(e,t){e.exports={base64:{settings:{char62:"+",char63:"/",pad:"=",ascii:!1},encode:function(e){this.char_set="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"+this.settings.char62+this.settings.char63;for(var t="",n="",a=0;a<e.length;++a){var r=e.charCodeAt(a);if(this.settings.ascii&&r>=256)throw"Not an 8-bit char.";for(var o=r.toString(2);o.length<(this.settings.ascii?8:16);)o="0"+o;for(n+=o;n.length>=6;){var c=n.slice(0,6);n=n.slice(6),t+=this.char_set.charAt(parseInt(c,2))}}if(n){for(;n.length<6;)n+="0";t+=this.char_set.charAt(parseInt(n,2))}if(this.settings.pad)for(;t.length%(this.settings.ascii?4:8)!=0;)t+=this.settings.pad;return t},decode:function(e){this.char_set="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"+this.settings.char62+this.settings.char63;for(var t="",n="",a=this.settings.ascii?8:16,r=0;r<e.length&&e[r]!=this.settings.pad;++r){var o=this.char_set.indexOf(e.charAt(r));if(-1==o)throw"Not base64.";for(var c=o.toString(2);c.length<6;)c="0"+c;for(n+=c;n.length>=a;){var l=n.slice(0,a);n=n.slice(a),t+=String.fromCharCode(parseInt(l,2))}}return t}}}},234:function(e,t,n){var a;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
!function(){"use strict";function r(){for(var e="",t=0;t<arguments.length;t++){var n=arguments[t];if(n){var a=typeof n;if("string"===a||"number"===a)e+=" "+n;else if(Array.isArray(n))e+=" "+r.apply(null,n);else if("object"===a)for(var c in n)o.call(n,c)&&n[c]&&(e+=" "+c)}}return e.substr(1)}var o={}.hasOwnProperty;"undefined"!=typeof e&&e.exports?e.exports=r:(a=function(){return r}.call(t,n,t,e),!(void 0!==a&&(e.exports=a)))}()},240:function(e,t,n){"use strict";var a=n(4)["default"],r=n(18)["default"],o=n(29)["default"],c=n(32)["default"],l=n(241)["default"],i=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var u=n(33),s=i(u),d=n(234),f=i(d),p=function(e){function t(){c(this,t),a(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return r(t,e),o(t,[{key:"render",value:function(){var e=this.props.icon,t=f["default"](this.props.className,l({iconfont:!0},"icon-"+e,!0));return s["default"].createElement("span",{className:t})}}]),t}(u.Component);t["default"]=p,e.exports=t["default"]},241:function(e,t,n){"use strict";var a=n(30)["default"];t["default"]=function(e,t,n){return t in e?a(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},t.__esModule=!0},257:function(e,t,n){"use strict";function a(){var e=JSON.parse(document.getElementById("initial-state").textContent);s["default"].render(i["default"].createElement(c["default"],{initialState:e}),document.getElementById("category-container"))}var r=n(2)["default"],o=n(258),c=r(o),l=n(33),i=r(l),u=n(218),s=r(u);window.addEventListener("DOMContentLoaded",a)},258:function(e,t,n){"use strict";function a(e){var t=e.goodsByParam,n=t.category,a=t.isFetching;return{category:n,isFetching:a}}var r=n(4)["default"],o=n(18)["default"],c=n(29)["default"],l=n(32)["default"],i=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var u=n(33),s=i(u),d=n(190),f=n(259),p=i(f),m=n(208),h=i(m),v=n(261),g=i(v),E=d.connect(a)(g["default"]),y=function(e){function t(){l(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return o(t,e),c(t,[{key:"render",value:function(){var e=this.props.initialState.category,t=h["default"](p["default"],{goodsByParam:{isFetching:!1,category:e}});return s["default"].createElement(d.Provider,{store:t},s["default"].createElement(E,null))}}]),t}(s["default"].Component);t["default"]=y,e.exports=t["default"]},259:function(e,t,n){"use strict";function a(e,t){switch(void 0===e&&(e={}),t.type){case i.REQUEST_GOODS:return r({},e,{isFetching:!0});case i.RECEIVE_GOODS:return r({},e,{isFetching:!1,navigate:t.pagination});default:return e}}var r=n(210)["default"],o=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var c=n(197),l=n(231),i=(o(l),n(260)),u=c.combineReducers({goodsByParam:a});t["default"]=u,e.exports=t["default"]},260:function(e,t,n){"use strict";function a(e,t){return{type:i,param:e,pagination:t}}function r(e){return{type:l,param:e}}function o(e,t){return function(n){return n(r(t)),c.apiRequest(e,t).then(function(e){n(a(t,e))})}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=o;var c=n(227),l="REQUEST_GOODS";t.REQUEST_GOODS=l;var i="RECEIVE_GOODS";t.RECEIVE_GOODS=i},261:function(e,t,n){"use strict";var a=n(4)["default"],r=n(18)["default"],o=n(29)["default"],c=n(32)["default"],l=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var i=n(33),u=l(i),s=n(217),d=l(s),f=n(240),p=l(f),m=n(234),h=l(m),v=n(262),g=function(e){function t(){c(this,t),a(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return r(t,e),o(t,[{key:"handleSearch",value:function(){location.href="/search"}},{key:"render",value:function(){var e=[1],t=[1],n=[1];return e=e.map(function(e,t){var n="category-"+t;return u["default"].createElement(E,{category:e,key:n})}),t=t.map(function(e,t){var n="brand-"+t;return u["default"].createElement(y,{brand:e,key:n})}),n=n.map(function(e,t){var n="origin-"+t;return u["default"].createElement(b,{origin:e,key:n})}),u["default"].createElement("div",{className:"box"},u["default"].createElement(d["default"],null,u["default"].createElement("div",{className:"logo"},u["default"].createElement("img",{src:"/client/asset/images/indexlogo.png"})),u["default"].createElement("div",{className:"btn-right",onClick:this.handleSearch.bind(this)},u["default"].createElement(p["default"],{icon:"search"}))),u["default"].createElement("div",{className:"coupon-list"},u["default"].createElement(v.Tabs,{effect:"slide"},u["default"].createElement(v.TabsItem,{title:u["default"].createElement("i",null,"类别")},e),u["default"].createElement(v.TabsItem,{title:u["default"].createElement("i",null,"品牌")},t),u["default"].createElement(v.TabsItem,{title:u["default"].createElement("i",null,"产地")},n))))}}]),t}(i.Component),E=function(e){function t(e){c(this,t),a(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e),this.state={activeIndex:0}}return r(t,e),o(t,[{key:"handleClick",value:function(e){this.setState({activeIndex:e})}},{key:"renderNav",value:function(){var e=this,t=["母婴用品","美容彩妆","营养保健","家居洗护","进口美食"];return t.map(function(t,n){var a=h["default"]("name",{active:n===e.state.activeIndex}),r="cate-"+n;return u["default"].createElement("li",{className:a,key:r,onClick:e.handleClick.bind(e,n)},t)})}},{key:"renderContent",value:function(){var e=this,t=[1,2,3,4,5];return t.map(function(t,n){var a=h["default"]("fadeIn",{sh:n===e.state.activeIndex});return u["default"].createElement("div",{className:a,key:"content-"+n},u["default"].createElement("a",{href:"#",className:"ad"},u["default"].createElement("img",{src:"/client/asset/images/pic24.gif"})),u["default"].createElement("div",{className:"content"},u["default"].createElement("div",{className:"title"},"热门分类"),u["default"].createElement("a",{href:"/",className:"cg"},u["default"].createElement("img",{src:"/client/asset/images/965_G_1445533723842.gif"}),u["default"].createElement("div",null,"母婴直邮")),u["default"].createElement("a",{href:"/",className:"cg"},u["default"].createElement("img",{src:"/client/asset/images/965_G_1445533723842.gif"}),u["default"].createElement("div",null,"美妆直邮")),u["default"].createElement("a",{href:"/",className:"cg"},u["default"].createElement("img",{src:"/client/asset/images/965_G_1445533723842.gif"}),u["default"].createElement("div",null,"保健直邮"))))})}},{key:"render",value:function(){return u["default"].createElement("div",null,u["default"].createElement("div",{className:"category-bd"}),u["default"].createElement("ul",{className:"leftNav"},this.renderNav()),u["default"].createElement("div",{className:"rightCon"},this.renderContent()))}}]),t}(i.Component),y=function(e){function t(){c(this,t),a(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return r(t,e),o(t,[{key:"render",value:function(){this.props.brand;return u["default"].createElement("div",null,u["default"].createElement("a",{href:"#",className:"allBrand"},"全部品牌",u["default"].createElement("i",{className:"iconfont icon-right"})),u["default"].createElement("div",{className:"title"},"推荐品牌"),u["default"].createElement("div",{className:"brandList clearfix"},u["default"].createElement("a",{href:"#"},u["default"].createElement("div",null,u["default"].createElement("img",{src:"/client/asset/images/pic25.gif"}))),u["default"].createElement("a",{href:"#"},u["default"].createElement("div",null,u["default"].createElement("img",{src:"/client/asset/images/pic25.gif"}))),u["default"].createElement("a",{href:"#"},u["default"].createElement("div",null,u["default"].createElement("img",{src:"/client/asset/images/pic25.gif"})))),u["default"].createElement("div",{className:"title"},"母婴用品"),u["default"].createElement("div",{className:"brandList clearfix"},u["default"].createElement("a",{href:"#"},u["default"].createElement("div",null,u["default"].createElement("img",{src:"/client/asset/images/pic25.gif"}))),u["default"].createElement("a",{href:"#"},u["default"].createElement("div",null,u["default"].createElement("img",{src:"/client/asset/images/pic25.gif"}))),u["default"].createElement("a",{href:"#"},u["default"].createElement("div",null,u["default"].createElement("img",{src:"/client/asset/images/pic25.gif"})))),u["default"].createElement("div",{className:"title"},"母婴用品"),u["default"].createElement("div",{className:"brandList clearfix"},u["default"].createElement("a",{href:"#"},u["default"].createElement("div",null,u["default"].createElement("img",{src:"/client/asset/images/pic25.gif"}))),u["default"].createElement("a",{href:"#"},u["default"].createElement("div",null,u["default"].createElement("img",{src:"/client/asset/images/pic25.gif"}))),u["default"].createElement("a",{href:"#"},u["default"].createElement("div",null,u["default"].createElement("img",{src:"/client/asset/images/pic25.gif"})))))}}]),t}(i.Component),b=function(e){function t(){c(this,t),a(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return r(t,e),o(t,[{key:"render",value:function(){this.props.origin;return u["default"].createElement("div",null,u["default"].createElement("div",{className:"kindArea"},u["default"].createElement("a",{href:"#"},u["default"].createElement("img",{src:"/client/asset/images/area_usa.gif"})),u["default"].createElement("a",{href:"#"},u["default"].createElement("img",{src:"/client/asset/images/area_korea.gif"})),u["default"].createElement("a",{href:"#"},u["default"].createElement("img",{src:"/client/asset/images/area_japan.gif"}))))}}]),t}(i.Component);t["default"]=g,e.exports=t["default"]},262:function(e,t,n){"use strict";var a=n(4)["default"],r=n(18)["default"],o=n(29)["default"],c=n(32)["default"],l=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var i=n(33),u=l(i),s=n(234),d=l(s),f=function(e){function t(e){c(this,t),a(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e),this.state={activeIndex:e.activeIndex,prevIndex:null}}return r(t,e),o(t,[{key:"componentWillReceiveProps",value:function(e){void 0!==e.activeIndex&&e.activeIndex!==this.props.activeIndex&&this.setState({prevIndex:this.props.activeIndex,activeIndex:e.activeIndex})}},{key:"handleClick",value:function(e,t){var n=this;t&&t.preventDefault();var a=this.state.activeIndex,r=this.props.handleToggleFlag;r&&r(e,t),this.setState({activeIndex:e,prevIndex:a},function(){n.props.onSelect(e)})}},{key:"renderNav",value:function(){var e=this,t=this.props.children,n=[];return t.forEach(function(e){n.push(e.props.title)}),n.map(function(t,n){var a=d["default"]({active:n===e.state.activeIndex});return u["default"].createElement("li",{className:a,key:"tab-nav-"+n,onClick:e.handleClick.bind(e,n)},t)})}},{key:"renderContent",value:function(e,t){return u["default"].cloneElement(e,{active:t===this.state.activeIndex,index:e.key?e.key:t})}},{key:"render",value:function(){var e=this.props.effect,t=d["default"]("tabs-content",{"tabs-content-fade":"fade"===e,"tabs-content-slide":"slide"===e});return u["default"].createElement("div",{className:"tabs"},u["default"].createElement("div",{className:"polyTabs"},u["default"].createElement("ul",null,this.renderNav())),u["default"].createElement("div",{className:t},u["default"].Children.map(this.props.children,this.renderContent.bind(this))))}}]),t}(i.Component);t.Tabs=f,f.defaultProps={effect:"fade",activeIndex:0,onSelect:function(){}};var p=function(e){function t(e){c(this,t),a(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e),this.state={activeIndex:e.activeIndex,prevIndex:null}}return r(t,e),o(t,[{key:"handleTouch",value:function n(e,t){var a=this;t&&t.preventDefault();var e=0===e?1:0,r=this.state.activeIndex,n=this.props.handleTouch;n&&n(e,t),this.setState({activeIndex:e,prevIndex:r},function(){a.props.onSelect(e)})}},{key:"render",value:function(){var e=this.props,t=e.active,n=e.index,a=(e.handleTouch,d["default"]("tabs-item",{active:t}));return u["default"].createElement("div",{className:a,key:"tabs-item-"+n},this.props.children)}}]),t}(i.Component);t.TabsItem=p,p.defaultProps={activeIndex:0,onSelect:function(){}}},263:function(e,t){}});