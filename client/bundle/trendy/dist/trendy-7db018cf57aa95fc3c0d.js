webpackJsonp([19],{0:function(e,t,n){n(551),e.exports=n(557)},208:function(e,t,n){"use strict";function r(e,t){var n=function(n){function r(){s(this,r),a(Object.getPrototypeOf(r.prototype),"constructor",this).apply(this,arguments)}return i(r,n),o(r,[{key:"render",value:function(){return f["default"].createElement(e,u({},this.props,c.bindActionCreators(t,this.props.dispatch)))}}]),r}(d.Component);return n}var a=n(4)["default"],i=n(18)["default"],o=n(29)["default"],s=n(32)["default"],u=n(209)["default"],l=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0}),t.wrapComponentWithActions=r;var c=n(197),d=n(33),f=l(d),p=n(215),h=l(p),m=n(216),v=l(m),g=v["default"](),_=c.applyMiddleware(h["default"],g)(c.createStore);t["default"]=_},209:function(e,t,n){"use strict";var r=n(210)["default"];t["default"]=r||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},t.__esModule=!0},210:function(e,t,n){e.exports={"default":n(211),__esModule:!0}},211:function(e,t,n){n(212),e.exports=n(16).Object.assign},212:function(e,t,n){var r=n(14);r(r.S+r.F,"Object",{assign:n(213)})},213:function(e,t,n){var r=n(7),a=n(214),i=n(10);e.exports=n(17)(function(){var e=Object.assign,t={},n={},r=Symbol(),a="abcdefghijklmnopqrst";return t[r]=7,a.split("").forEach(function(e){n[e]=e}),7!=e({},t)[r]||Object.keys(e({},n)).join("")!=a})?function(e,t){for(var n=a(e),o=arguments,s=o.length,u=1,l=r.getKeys,c=r.getSymbols,d=r.isEnum;s>u;)for(var f,p=i(o[u++]),h=c?l(p).concat(c(p)):l(p),m=h.length,v=0;m>v;)d.call(p,f=h[v++])&&(n[f]=p[f]);return n}:Object.assign},214:function(e,t,n){var r=n(12);e.exports=function(e){return Object(r(e))}},215:function(e,t){"use strict";function n(e){var t=e.dispatch,n=e.getState;return function(e){return function(r){return"function"==typeof r?r(t,n):e(r)}}}t.__esModule=!0,t["default"]=n,e.exports=t["default"]},216:function(e,t){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return function(t){var n=t.getState;return function(t){return function(r){var o=e.level,s=e.logger,u=e.collapsed,l=e.predicate,c=e.duration,d=void 0===c?!1:c,f=e.timestamp,p=void 0===f?!0:f,h=e.transformer,m=void 0===h?function(e){return e}:h,v=e.actionTransformer,g=void 0===v?function(e){return e}:v,_=s||window.console;if("undefined"==typeof _)return t(r);if("function"==typeof l&&!l(n,r))return t(r);var y=i.now(),E=m(n()),b=t(r),w=i.now()-y,M=m(n()),T=new Date,k="function"==typeof u?u(n,r):u,L=p?" @ "+a(T.getHours(),2)+":"+a(T.getMinutes(),2)+":"+a(T.getSeconds(),2)+"."+a(T.getMilliseconds(),3):"",C=d?" in "+w.toFixed(2)+" ms":"",D=g(r),N="action "+D.type+L+C,x=k?_.groupCollapsed:_.group;try{x.call(_,N)}catch(O){_.log(N)}o?(_[o]("%c prev state","color: #9E9E9E; font-weight: bold",E),_[o]("%c action","color: #03A9F4; font-weight: bold",D),_[o]("%c next state","color: #4CAF50; font-weight: bold",M)):(_.log("%c prev state","color: #9E9E9E; font-weight: bold",E),_.log("%c action","color: #03A9F4; font-weight: bold",D),_.log("%c next state","color: #4CAF50; font-weight: bold",M));try{_.groupEnd()}catch(O){_.log("—— log end ——")}return b}}}}Object.defineProperty(t,"__esModule",{value:!0});var r=function(e,t){return new Array(t+1).join(e)},a=function(e,t){return r("0",t-e.toString().length)+e},i="undefined"!=typeof performance&&"function"==typeof performance.now?performance:Date;t["default"]=n,e.exports=t["default"]},217:function(e,t,n){"use strict";var r=n(4)["default"],a=n(18)["default"],i=n(29)["default"],o=n(32)["default"],s=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var u=n(33),l=s(u),c=function(e){function t(){o(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return a(t,e),i(t,[{key:"renderBackButton",value:function(){var e=this.props,t=e.canBack,n=e.handleGoBack;return t===!0?l["default"].createElement("a",{href:"javascript:void(null)",onClick:n,className:"iconfont icon-back"}):null}},{key:"render",value:function(){return l["default"].createElement("header",{className:"header"},this.renderBackButton(),this.props.children)}}]),t}(u.Component);c.defaultProps={canBack:!0,handleGoBack:function(){window.history.back()}},t["default"]=c,e.exports=t["default"]},227:function(e,t,n){"use strict";function r(e,t){var n=arguments.length<=2||void 0===arguments[2]?{method:"GET",type:"json"}:arguments[2];return n=h({},n,{url:e,data:t}),g["default"](n)}function a(e){return _.base64.encode(e)}function i(e){return _.base64.decode(e)}function o(e){var t=_.base64.encode(e);return t.replace(/=/g,"_").replace(/\//g,",").replace(/\+/g,"-")}function s(e){return e=e.replace(/_/g,"=").replace(/,/g,"/").replace(/-/g,"+"),_.base64.decode(e)}function u(e){var t=[];for(var n in e)t.push(n+"="+e[n]);return t.join("&")}function l(e,t){var n=document.createEvent("Event");n.initEvent(t,!0,!0),e.dispatchEvent(n)}function c(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on${event}",function(t){n.call(e,t||window.event)})}function d(e,t,n){e.removeEventListener?e.removeEventListener(t,n):e.detachEvent&&e.detachEvent("on${event}",n)}function f(e){var t="CSS1Compat"===document.compatMode,n=void 0!==window.pageYOffset,r=n?window.pageYOffset:t?document.documentElement.scrollTop:document.body.scrollTop,a=n?window.pageXOffset:t?document.documentElement.scrollLeft:document.body.scrollLeft;return void 0!==e&&window.scrollTo(a,e),r}function p(e){var t=this;this.bindEvent(window,"scroll",function(){var n=t.scrollTop();document.documentElement.clientHeight+n>=document.documentElement.scrollHeight&&e()})}var h=n(210)["default"],m=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0}),t.apiRequest=r,t.base64Encode=a,t.base64Decode=i,t.base64EncodeForURL=o,t.base64DecodeForURL=s,t.urlParam=u,t.dispatchEvent=l,t.bindEvent=c,t.unbindEvent=d,t.scrollTop=f,t.registerPullDownEvent=p;var v=n(228),g=m(v),_=n(230),y={bindEvent:c,unbindEvent:d,scrollTop:f,registerPullDownEvent:p};t["default"]=y},230:function(e,t){e.exports={base64:{settings:{char62:"+",char63:"/",pad:"=",ascii:!1},encode:function(e){this.char_set="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"+this.settings.char62+this.settings.char63;for(var t="",n="",r=0;r<e.length;++r){var a=e.charCodeAt(r);if(this.settings.ascii&&a>=256)throw"Not an 8-bit char.";for(var i=a.toString(2);i.length<(this.settings.ascii?8:16);)i="0"+i;for(n+=i;n.length>=6;){var o=n.slice(0,6);n=n.slice(6),t+=this.char_set.charAt(parseInt(o,2))}}if(n){for(;n.length<6;)n+="0";t+=this.char_set.charAt(parseInt(n,2))}if(this.settings.pad)for(;t.length%(this.settings.ascii?4:8)!=0;)t+=this.settings.pad;return t},decode:function(e){this.char_set="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"+this.settings.char62+this.settings.char63;for(var t="",n="",r=this.settings.ascii?8:16,a=0;a<e.length&&e[a]!=this.settings.pad;++a){var i=this.char_set.indexOf(e.charAt(a));if(-1==i)throw"Not base64.";for(var o=i.toString(2);o.length<6;)o="0"+o;for(n+=o;n.length>=r;){var s=n.slice(0,r);n=n.slice(r),t+=String.fromCharCode(parseInt(s,2))}}return t}}}},234:function(e,t,n){var r;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
!function(){"use strict";function a(){for(var e="",t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=typeof n;if("string"===r||"number"===r)e+=" "+n;else if(Array.isArray(n))e+=" "+a.apply(null,n);else if("object"===r)for(var o in n)i.call(n,o)&&n[o]&&(e+=" "+o)}}return e.substr(1)}var i={}.hasOwnProperty;"undefined"!=typeof e&&e.exports?e.exports=a:(r=function(){return a}.call(t,n,t,e),!(void 0!==r&&(e.exports=r)))}()},235:function(e,t,n){"use strict";var r=n(4)["default"],a=n(18)["default"],i=n(29)["default"],o=n(32)["default"],s=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var u=n(33),l=s(u),c=n(234),d=s(c),f=function(e){function t(){o(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return a(t,e),i(t,[{key:"render",value:function(){var e=d["default"]({refresher:!0,"refresher-active":this.props.active});return l["default"].createElement("div",{className:e},l["default"].createElement("span",{className:"iconfont icon-loading animate-spin"}),"正在加载")}}]),t}(l["default"].Component);t["default"]=f,e.exports=t["default"]},236:function(e,t,n){"use strict";var r=n(4)["default"],a=n(18)["default"],i=n(29)["default"],o=n(32)["default"],s=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var u=n(33),l=s(u),c=function(e){function t(){o(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return a(t,e),i(t,[{key:"render",value:function(){var e=this.props.handleClick,t={display:this.props.visible===!0?"block":"none"};return l["default"].createElement("div",{className:"mask-layer",style:t,onClick:e})}}]),t}(u.Component);t["default"]=c,e.exports=t["default"]},237:function(e,t,n){"use strict";var r=n(4)["default"],a=n(18)["default"],i=n(29)["default"],o=n(32)["default"],s=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var u=n(33),l=s(u),c=n(227),d=s(c),f=n(231),p=(s(f),n(234)),h=s(p),m=n(238),v=function(e){function t(e){o(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e),this.state={active:!1}}return a(t,e),i(t,[{key:"toggleVisble",value:function(){var e=d["default"].scrollTop();e>50?this.setState({active:!0}):this.setState({active:!1})}},{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"backToTop",value:function(){m.smoothScroll(window,0)}},{key:"render",value:function(){var e=h["default"]({"back-to-top":!0,active:this.state.active});return l["default"].createElement("div",{className:e},l["default"].createElement("a",{href:null,onClick:this.backToTop},l["default"].createElement("span",{className:"iconfont icon-up-big"})))}}]),t}(u.Component);t["default"]=v,e.exports=t["default"]},238:function(e,t,n){"use strict";var r=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var a=n(239),i=r(a),o={bindEvent:function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on${event}",function(t){n.call(e,t||window.event)})},unbindEvent:function(e,t,n){e.removeEventListener?e.removeEventListener(t,n):e.detachEvent&&e.detachEvent("on${event}",n)},offset:function(e){var t=arguments.length<=1||void 0===arguments[1]?!1:arguments[1];if(!e)return null;var n=0,r=0;if("getBoundingClientRect"in document.documentElement&&!t){var a=e.getBoundingClientRect(),i=e.ownerDocument,o=i.body,s=i.documentElement,u=s.clientTop||o.clientTop||0,l=s.clientLeft||o.clientLeft||0,c=window.pageYOffset||s.scrollTop||o.scrollTop,d=window.pageXOffset||s.scrollLeft||o.scrollLeft;return{top:a.top+c-u,left:a.left+d-l}}do n+=e.offsetTop||0,r+=e.offsetLeft||0,e=e.offsetParent;while(e);return{top:n,left:r}},ownerWindow:function(e){var t=e&&e.ownerDocument||document;return t.defaultView||t.parentWindow||window},inViewport:function(e){var t=arguments.length<=1||void 0===arguments[1]?window:arguments[1],n=arguments.length<=2||void 0===arguments[2]?0:arguments[2];if(t===window){for(var r=e.offsetTop,a=e.offsetLeft,i=e.offsetWidth,s=e.offsetHeight;e.offsetParent;)e=e.offsetParent,r+=e.offsetTop,a+=e.offsetLeft;return r<window.pageYOffset+window.innerHeight&&a<window.pageXOffset+window.innerWidth&&r+s>window.pageYOffset&&a+i>window.pageXOffset}var u=o.offset(e).top,l=o.scrollTop(t),c=o.offset(t.firstChild).top;return l+c<u+e.offsetHeight&&u-n<l+t.offsetHeight},scrollNode:function s(e){for(var s=e;s!==window&&(s=s.parentNode,!(s.scrollTop>0)););return s},scrollInView:function(e){function t(){o.unbindEvent(e,"touchstart",c)}var n=arguments.length<=1||void 0===arguments[1]?window:arguments[1],r=arguments.length<=2||void 0===arguments[2]?function(){}:arguments[2],a=arguments.length<=3||void 0===arguments[3]?"y":arguments[3],s=o.offset(e).top-o.offset(n.firstChild).top,u=o.offset(e).left-o.offset(n.firstChild).left,l=15,c=function(){t()};o.bindEvent(e,"touchstart",c),i["default"](function d(){var e=o.scrollTop(n),c=o.scrollLeft(n);"y"===a?s>e&&e+n.offsetHeight!==n.scrollHeight?(e=e+l>=s?s:e+l,o.scrollTop(n,e),i["default"](d)):e>s&&e>=0?(e=s>=e-l?s:e-l,o.scrollTop(n,e),i["default"](d)):(t(),r()):"x"===a&&(u>c&&c+n.offsetWidth!==n.scrollWidth?(c=c+l>=u?u:c+l,o.scrollLeft(n,c),i["default"](d())):c>u&&c>=0?(c=u>=c-l?u:c-l,o.scrollLeft(n,c),i["default"](d())):(t(),r()))})},scrollPosition:function(e){var t="CSS1Compat"===document.compatMode,n=void 0!==window.pageYOffset,r=void 0,a=void 0;return e===window?(r=n?window.pageYOffset:t?document.documentElement.scrollTop:document.body.scrollTop,a=n?window.pageXOffset:t?document.documentElement.scrollLeft:document.body.scrollLeft):(r=e.scrollTop,a=e.scrollLeft),{scrollLeft:a,scrollTop:r}},scrollTop:function u(e,t){var n=o.scrollPosition(e),u=n.scrollTop,r=n.scrollLeft;return void 0!==t&&(e===window?window.scrollTo(r,t):e.scrollTop=t),u},scrollLeft:function l(e,t){var n=o.scrollPosition(e),r=n.scrollTop,l=n.scrollLeft;return void 0!==t&&(e===window?window.scrollTo(t,r):e.scrollLeft=t),l},smoothScroll:function(){function e(e){return(e/=.5)<1?.5*Math.pow(e,5):.5*(Math.pow(e-2,5)+2)}function t(){o.unbindEvent(n,"touchstart",m)}var n=arguments.length<=0||void 0===arguments[0]?window:arguments[0],r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],a=arguments.length<=2||void 0===arguments[2]?"y":arguments[2],s=r.top&&parseInt(r.top,10)||0,u=r.left&&parseInt(r.left,10)||0,l=o.scrollTop(n),c=o.scrollLeft(n),d=l,f=c,p="y"===asxis?s-l:u-c,h=Math.min(750,Math.min(1500,Math.abs(p)));if(0!==p){var m=function(){t()};o.bindEvent(n,"touchstart",m);var v,g,_,y;i["default"](function E(){var r=Date.now();v||(v=r),g=Math.min(1,Math.max((r-v)/h,0)),"y"===a?(_=Math.round(l+p*e(g)),0>p&&s>_&&(_=s),p>0&&_>s&&(_=s),d!==_&&o.scrollTop(n,_),d=_,_!==s?i["default"](E):t()):"x"===a&&(y=Math.round(c+p*e(g)),0>p&&u>y&&(y=u),p>0&&y>u&&(y=u),f!==y&&o.scrollLeft(n,y),f=y,y!==u?i["default"](E):t())})}},hasClass:function(e,t){return e.classList?!!t&&e.classList.contains(t):(" "+e.className+" ").indexOf(" "+t+" ")>-1},addClass:function(e,t){return e&&(e.classList?e.classList.add(t):o.hasClass(e,t)||(e.className=e.className+" "+t)),e},removeClass:function(e,t){e&&e.classList?e.classList.remove(t):o.hasClass(e,t)&&(e.className=e.className.replace(new RegExp("(^|\\s)"+t+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,""))},hasNode:function(e,t){for(;e;){if(e===t)return!0;e=e.parentNode}return!1},inTouchableRegion:function(e,t,n){var r=o.offset(n),a=r.top,i=r.top+n.offsetHeight,s=r.left,u=r.left+n.offsetWidth,l=e>=s&&u>=e,c=t>=a&&i>=t;return l&&c?!0:!1}};t["default"]=o,e.exports=t["default"]},239:function(e,t){(function(t){"use strict";var n=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame,r=0,a=n||function(e){var n=Date.now(),a=Math.max(0,16-(n-r));return r=n+a,t.setTimeout(function(){e(Date.now())},a)};a(function(){}),e.exports=a}).call(t,function(){return this}())},240:function(e,t,n){"use strict";var r=n(4)["default"],a=n(18)["default"],i=n(29)["default"],o=n(32)["default"],s=n(241)["default"],u=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var l=n(33),c=u(l),d=n(234),f=u(d),p=function(e){function t(){o(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return a(t,e),i(t,[{key:"render",value:function(){var e=this.props.icon,t=f["default"](this.props.className,s({iconfont:!0},"icon-"+e,!0));return c["default"].createElement("span",{className:t})}}]),t}(l.Component);t["default"]=p,e.exports=t["default"]},241:function(e,t,n){"use strict";var r=n(30)["default"];t["default"]=function(e,t,n){return t in e?r(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},t.__esModule=!0},251:function(e,t,n){"use strict";var r=n(4)["default"],a=n(18)["default"],i=n(29)["default"],o=n(32)["default"],s=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var u=n(33),l=s(u),c=n(234),d=s(c),f=function(e){function t(e){o(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e),this.state={activeIndex:e.activeIndex}}return a(t,e),i(t,[{key:"handleClick",value:function(e){switch(this.setState({activeIndex:e}),e){case 1:window.location.href="/classify";break;case 2:window.location.href="/trendy";break;case 3:window.location.href="/cart";break;case 4:window.location.href="/membercenter";break;default:window.location.href="/"}}},{key:"render",value:function(){var e=this,t=[],n=["海外购","分类","爆款","购物车","个人中心"];return n.map(function(n,r){var a="item-"+r,i=d["default"]({"nav-hover":r==e.state.activeIndex});t.push(l["default"].createElement("li",{key:a,onClick:e.handleClick.bind(e,r)},l["default"].createElement("a",{href:"#",className:i},l["default"].createElement("i",null),n)))}),l["default"].createElement("footer",{className:"bottom-nav"},l["default"].createElement("ul",{className:"clearfix"},t))}}]),t}(u.Component);f.defaultProps={activeIndex:0},t["default"]=f,e.exports=t["default"]},551:function(e,t,n){"use strict";function r(){var e=JSON.parse(document.getElementById("initial-state").textContent);c["default"].render(u["default"].createElement(o["default"],{initialState:e}),document.getElementById("trendy"))}var a=n(2)["default"],i=n(552),o=a(i),s=n(33),u=a(s),l=n(218),c=a(l);window.addEventListener("DOMContentLoaded",r)},552:function(e,t,n){"use strict";function r(e){var t=e.goodsByParam,n=t.pagination,r=t.isFetched,a=t.isFetching,i=t.title;return{pagination:n,isFetched:r,title:i,isFetching:a}}function a(e){var t=v["default"](h["default"],e);return t}var i=n(4)["default"],o=n(18)["default"],s=n(29)["default"],u=n(32)["default"],l=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var c=n(33),d=l(c),f=n(190),p=n(553),h=l(p),m=(n(197),n(208)),v=l(m),g=n(555),_=l(g),y=f.connect(r)(_["default"]),E=function(e){function t(){u(this,t),i(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return o(t,e),s(t,[{key:"render",value:function(){var e=this.props.initialState,t=e.isFetched,n=e.pagination,r=e.title,i={goodsByParam:{isFetching:!1,isFetched:t,title:r,pagination:n}},o=a(i);return d["default"].createElement(f.Provider,{store:o},d["default"].createElement(y,null))}}]),t}(c.Component);t["default"]=E,e.exports=t["default"]},553:function(e,t,n){"use strict";function r(e,t){switch(void 0===e&&(e={}),t.type){case o.REQUEST_GOODS:return a({},e,{isFetching:!0});case o.RECEIVE_GOODS:var n=l["default"].union(e.pagination.list,t.pagination.list);return t.pagination.list=n,a({},e,{isFetching:!1,pagination:t.pagination});default:return e}}var a=n(210)["default"],i=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var o=n(554),s=n(197),u=n(231),l=i(u),c=s.combineReducers({goodsByParam:r});t["default"]=c,e.exports=t["default"]},554:function(e,t,n){"use strict";function r(e,t){return{type:RECEIVE_GOODS,param:e,pagination:t.page,receiveAt:Date.now()}}function a(e){return{type:REQUEST_GOODS,param:e}}function i(e,t){return function(n){return n(a(t)),o.apiRequest(e,t).then(function(e){n(r(t,e))})}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i;var o=n(227),s="SORT_NORMAL";t.SORT_NORMAL=s;var u="SORT_PRICE_DESC";t.SORT_PRICE_DESC=u;var l="SORT_PRICE_ASC";t.SORT_PRICE_ASC=l;var c="SORT_SALES";t.SORT_SALES=c},555:function(e,t,n){"use strict";var r=n(4)["default"],a=n(18)["default"],i=n(29)["default"],o=n(32)["default"],s=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var u=n(33),l=s(u),c=n(234),d=(s(c),n(227)),f=(s(d),n(235)),p=(s(f),n(236)),h=(s(p),n(237)),m=(s(h),n(240)),v=s(m),g=n(556),_=s(g),y=n(217),E=s(y),b=n(251),w=s(b),M=function(e){function t(e){o(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e),this.state={maskActive:!1}}return a(t,e),i(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props,t=(e.isFetching,e.pagination),n=e.isFetched,r=[];return n===!0&&t.list.length>0&&t.list.forEach(function(e,t){var n="good-"+t;r.push(l["default"].createElement(_["default"],{goods:e,key:n}))}),l["default"].createElement("div",null,l["default"].createElement(E["default"],{canBack:"false"},l["default"].createElement("div",{className:"logo"},l["default"].createElement("img",{src:"client/asset/images/indexlogo.png"})),l["default"].createElement("div",{className:"btn-right"},l["default"].createElement(v["default"],{icon:"search"}))),l["default"].createElement("div",{className:"polyTabs"},l["default"].createElement("ul",null,l["default"].createElement("li",{className:"current"},l["default"].createElement("i",null,"美容彩妆")),l["default"].createElement("li",null,l["default"].createElement("i",null,"母婴用品")),l["default"].createElement("li",null,l["default"].createElement("i",null,"营养保健")))),l["default"].createElement("div",{className:"polyCon"},l["default"].createElement("div",{id:"page-content"},l["default"].createElement("div",{className:"poly_1 page-0 page-current"},l["default"].createElement("div",{className:"activityGeneral"},r)))),l["default"].createElement(w["default"],{activeIndex:"2"}))}}]),t}(l["default"].Component);t["default"]=M,e.exports=t["default"]},556:function(e,t,n){"use strict";var r=n(4)["default"],a=n(18)["default"],i=n(29)["default"],o=n(32)["default"],s=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var u=n(33),l=s(u),c=n(234),d=s(c),f=function(e){function t(){o(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return a(t,e),i(t,[{key:"render",value:function(){var e=this.props.goods,t=e.status,n=e.activityType,r=e.country.icon,a=e.country.name,i=e.salePrice,o=e.standardPrice,s=e.smallImageUrl,u=e.title,c=d["default"]({"sale-out":1==t});d["default"]({"flash-sale":1==n,"phone-price":2==n});return l["default"].createElement("a",{href:"#",className:"clearfix"},l["default"].createElement("img",{src:s}),l["default"].createElement("div",{className:c}),l["default"].createElement("div",{className:"right"},l["default"].createElement("span",{className:"name"},u),l["default"].createElement("span",{className:"country"},l["default"].createElement("i",null,l["default"].createElement("img",{src:r,alt:""})),a),l["default"].createElement("span",{className:"now-price"},"¥",i),l["default"].createElement("span",{className:"old-price"},"¥",o)))}}]),t}(u.Component);t["default"]=f,e.exports=t["default"]},557:function(e,t){}});