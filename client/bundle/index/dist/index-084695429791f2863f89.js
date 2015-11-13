webpackJsonp([3],{0:function(e,t,n){n(285),e.exports=n(290)},209:function(e,t,n){"use strict";var a=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var r=n(197),o=n(210),i=a(o),l=n(211),u=a(l),s=u["default"](),c=r.applyMiddleware(i["default"],s)(r.createStore);t["default"]=c,e.exports=t["default"]},210:function(e,t){"use strict";function n(e){var t=e.dispatch,n=e.getState;return function(e){return function(a){return"function"==typeof a?a(t,n):e(a)}}}t.__esModule=!0,t["default"]=n,e.exports=t["default"]},211:function(e,t){"use strict";function n(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return function(t){var n=t.getState;return function(t){return function(a){var i=e.level,l=e.logger,u=e.collapsed,s=e.predicate,c=e.duration,d=void 0===c?!1:c,f=e.timestamp,p=void 0===f?!0:f,h=e.transformer,v=void 0===h?function(e){return e}:h,m=e.actionTransformer,y=void 0===m?function(e){return e}:m,g=l||window.console;if("undefined"==typeof g)return t(a);if("function"==typeof s&&!s(n,a))return t(a);var E=o.now(),b=v(n()),O=t(a),w=o.now()-E,x=v(n()),S=new Date,_="function"==typeof u?u(n,a):u,T=p?" @ "+r(S.getHours(),2)+":"+r(S.getMinutes(),2)+":"+r(S.getSeconds(),2)+"."+r(S.getMilliseconds(),3):"",k=d?" in "+w.toFixed(2)+" ms":"",N=y(a),C="action "+N.type+T+k,P=_?g.groupCollapsed:g.group;try{P.call(g,C)}catch(M){g.log(C)}i?(g[i]("%c prev state","color: #9E9E9E; font-weight: bold",b),g[i]("%c action","color: #03A9F4; font-weight: bold",N),g[i]("%c next state","color: #4CAF50; font-weight: bold",x)):(g.log("%c prev state","color: #9E9E9E; font-weight: bold",b),g.log("%c action","color: #03A9F4; font-weight: bold",N),g.log("%c next state","color: #4CAF50; font-weight: bold",x));try{g.groupEnd()}catch(M){g.log("—— log end ——")}return O}}}}Object.defineProperty(t,"__esModule",{value:!0});var a=function(e,t){return new Array(t+1).join(e)},r=function(e,t){return a("0",t-e.toString().length)+e},o="undefined"!=typeof performance&&"function"==typeof performance.now?performance:Date;t["default"]=n,e.exports=t["default"]},226:function(e,t,n){e.exports={"default":n(227),__esModule:!0}},227:function(e,t,n){n(228),e.exports=n(16).Object.assign},228:function(e,t,n){var a=n(14);a(a.S+a.F,"Object",{assign:n(229)})},229:function(e,t,n){var a=n(7),r=n(230),o=n(10);e.exports=n(17)(function(){var e=Object.assign,t={},n={},a=Symbol(),r="abcdefghijklmnopqrst";return t[a]=7,r.split("").forEach(function(e){n[e]=e}),7!=e({},t)[a]||Object.keys(e({},n)).join("")!=r})?function(e,t){for(var n=r(e),i=arguments,l=i.length,u=1,s=a.getKeys,c=a.getSymbols,d=a.isEnum;l>u;)for(var f,p=o(i[u++]),h=c?s(p).concat(c(p)):s(p),v=h.length,m=0;v>m;)d.call(p,f=h[m++])&&(n[f]=p[f]);return n}:Object.assign},230:function(e,t,n){var a=n(12);e.exports=function(e){return Object(a(e))}},232:function(e,t,n){"use strict";function a(e,t){var n=arguments.length<=2||void 0===arguments[2]?{method:"GET",type:"json"}:arguments[2];return n=r({},n,{url:e,data:t}),l["default"](n)}var r=n(226)["default"],o=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0}),t.apiRequest=a;var i=n(233),l=o(i)},242:function(e,t,n){var a;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
!function(){"use strict";function r(){for(var e="",t=0;t<arguments.length;t++){var n=arguments[t];if(n){var a=typeof n;if("string"===a||"number"===a)e+=" "+n;else if(Array.isArray(n))e+=" "+r.apply(null,n);else if("object"===a)for(var i in n)o.call(n,i)&&n[i]&&(e+=" "+i)}}return e.substr(1)}var o={}.hasOwnProperty;"undefined"!=typeof e&&e.exports?e.exports=r:(a=function(){return r}.call(t,n,t,e),!(void 0!==a&&(e.exports=a)))}()},285:function(e,t,n){"use strict";function a(){var e=JSON.parse(document.getElementById("initial-state").textContent);c["default"].render(u["default"].createElement(i["default"],{initialState:e}),document.getElementById("weather"))}var r=n(2)["default"],o=n(286),i=r(o),l=n(33),u=r(l),s=n(214),c=r(s);window.addEventListener("DOMContentLoaded",a)},286:function(e,t,n){"use strict";function a(e){var t=e.weatherByCityName;return{weatherByCityName:t}}var r=n(4)["default"],o=n(18)["default"],i=n(29)["default"],l=n(32)["default"],u=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var s=n(33),c=u(s),d=n(190),f=n(287),p=u(f),h=n(209),v=u(h),m=n(289),y=u(m),g=d.connect(a)(y["default"]),E=function(e){function t(){l(this,t),r(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return o(t,e),i(t,[{key:"render",value:function(){var e=this.props.initialState.weather,t=v["default"](p["default"],{weatherByCityName:{isFetching:!1,weather:e}});return c["default"].createElement(d.Provider,{store:t},c["default"].createElement(g,null))}}]),t}(c["default"].Component);t["default"]=E,e.exports=t["default"]},287:function(e,t,n){"use strict";function a(e,t){switch(void 0===e&&(e={}),t.type){case o.CHANGE_FIELD:var n=t.name,a=t.value,i=r({},e.weather);return i[n]=a,r({},e,{weather:i});case o.REQUEST_WEATHER:return r({},e,{weatherFetched:!1,weatherFetching:!0});case o.RESPONSE_WEATHER:var i=t.res.result,l=t.res.weatherFetched;return r({},e,{weather:i,weatherFetched:l,weatherFetching:!1});default:return e}}var r=n(226)["default"];Object.defineProperty(t,"__esModule",{value:!0});var o=n(288),i=n(197),l=i.combineReducers({weatherByCityName:a});t["default"]=l,e.exports=t["default"]},288:function(e,t,n){"use strict";function a(e,t){return{type:u,name:e,value:t}}function r(e){return{type:s,param:e}}function o(e,t){return{type:c,param:e,res:t,receiveAt:Date.now()}}function i(e){return function(t){t(r(e)),l.apiRequest("/weather",e,{method:"POST"}).then(function(n){t(o(e,n))})}}Object.defineProperty(t,"__esModule",{value:!0}),t.changeField=a,t.fetchWeather=i;var l=n(232),u="CHANGE_FIELD";t.CHANGE_FIELD=u;var s="REQUEST_WEATHER";t.REQUEST_WEATHER=s;var c="RESPONSE_WEATHER";t.RESPONSE_WEATHER=c},289:function(e,t,n){"use strict";var a=n(4)["default"],r=n(18)["default"],o=n(29)["default"],i=n(32)["default"],l=n(2)["default"];Object.defineProperty(t,"__esModule",{value:!0});var u=n(33),s=l(u),c=n(242),d=l(c),f=n(288),p=function(e){function t(){i(this,t),a(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return r(t,e),o(t,[{key:"handleChange",value:function(e){e&&e.preventDefault();var t=this.props.dispatch;t(f.changeField("city",e.target.value))}},{key:"handleQuery",value:function(e){e&&e.preventDefault();var t=this.props.dispatch,n=this.props.weatherByCityName.weather;t(f.fetchWeather({cityname:n.city}))}},{key:"componentWillReceiveProps",value:function(e){this.props.dispatch;e.weatherByCityName.weatherFetching===!1&&this.props.weatherByCityName.weatherFetching===!0&&(e.weatherByCityName.weatherFetched===!0?alert("fetch success!"):alert(e.errMsg))}},{key:"render",value:function(){var e=this.props.weatherByCityName.weather,t=d["default"]({"weather-content":!0});return s["default"].createElement("div",{className:t},s["default"].createElement("h3",null,"Weather"),s["default"].createElement("div",{className:"weather-form"},s["default"].createElement("input",{type:"text",name:"cityname",value:e.city,onChange:this.handleChange.bind(this)}),s["default"].createElement("button",{onClick:this.handleQuery.bind(this)},"Query"),s["default"].createElement("p",null,s["default"].createElement("label",null,"City:"),s["default"].createElement("span",null,e.pinyin)),s["default"].createElement("p",null,s["default"].createElement("label",null,"Date:"),s["default"].createElement("span",null,e.date)),s["default"].createElement("p",null,s["default"].createElement("label",null,"Postcode:"),s["default"].createElement("span",null,e.postCode)),s["default"].createElement("p",null,s["default"].createElement("label",null,"Sunrise:"),s["default"].createElement("span",null,e.sunrise)),s["default"].createElement("p",null,s["default"].createElement("label",null,"Sunset:"),s["default"].createElement("span",null,e.sunset)),s["default"].createElement("p",null,s["default"].createElement("label",null,"Coordinate:"),s["default"].createElement("span",null,e.longitude,"/",e.latitude)),s["default"].createElement("p",null,s["default"].createElement("label",null,"Weather:"),s["default"].createElement("span",null,e.weather))))}}]),t}(u.Component);t["default"]=p,e.exports=t["default"]},290:function(e,t){}});