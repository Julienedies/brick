/*!
 * https://github.com/julienedies/brick.git
 * https://github.com/Julienedies/brick/wiki
 * license:ISC
 * V0.9.38
 * 2023-10-15 11:08:02
 * 
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery"),require("lodash"),require("moment"),require("@julienedies/brick")):"function"==typeof define&&define.amd?define(["jquery","lodash","moment","brick"],t):"object"==typeof exports?exports["brick.datepicker"]=t(require("jquery"),require("lodash"),require("moment"),require("@julienedies/brick")):e["brick.datepicker"]=t(e.$,e._,e.moment,e.brick)}(this,function(e,t,r,n){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=14)}([function(t,r){t.exports=e},,function(e,r){e.exports=t},,function(e,t){e.exports=r},function(e,t){e.exports=n},,,,,,,,,function(e,t,r){"use strict";r.r(t);var n=r(2),i=r.n(n),a=(r(0),r(4)),o=r.n(a),c=r(5),d=r.n(c);d.a.directives.reg("ic-date-picker",function(e){var t,r,n=new Date,a=e.attr("ic-tpl-name"),c=e.attr("ic-date-now")||n.getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate(),u=e.attr("ic-date-format")||"YYYY-MM-DD",s=e.attr("ic-date-multiple"),f=e.attr("ic-date-week-start")||1,l=e.attr("ic-date-enabled")?"[ic-date-enabled]":"",p=(e.attr("ic-date-disabled"),e.icParseProperty2("ic-date-on-render")),m=o()(c,u),h="selected",v=function(e){var t=i.a.range(1,8),r=i.a.indexOf(t,1*e),n=t.splice(r);return n.unshift(0,0),t.splice.apply(t,n),t}(f),g=(t=(t=e.attr("ic-date-default"))&&t.trim()&&t.split(/(?:\s*,\s*)|(?:\s+)/gim))||[];function b(t,r){var n=function(e){var t=e?o()(e,u):o()(),r=e?o()(e,u):o()();r.subtract(1,"months");var n=e?o()(e,u):o()();n.add(1,"months"),console.log(n.format(u));var a=t.year(),c=t.month(),d=[],s=k(t),f=k(r),l=k(n),p=s.length,h=o()([a,c,1]).weekday();0===h&&(h=7);var b=i.a.indexOf(v,h),y=b;console.log(v,h,b);for(;y>0;)s.unshift(f.pop()),y--;var x=7*Math.ceil(s.length/7)-s.length;for(;x>0;)s.push(l.shift()),x--;s=s.map(function(e,t){var r=o()(e,u),n=r.diff(m,"days"),a=n<0?"over":n>0?"coming":"today",c=t<b?"prev":t>p+b-1?"next":"current",s=i.a.indexOf(g,e)>-1,f=e.replace(/^\d\d\d\d-\d\d-0?/i,""),l={n:f,date:e,status:a,diff:n,selected:s,position:c,custom:{}};return d.push(l),l});var j=[],M=s.splice(0,7);for(;M.length;)j.push(M),M=s.splice(0,7);return{current:t.format("YYYY-MM"),weeks:j,calendar:d,year:t.format("YYYY"),month:t.format("MM"),x:t.diff(m,"months")}}(t);p&&!r?p(n):(e.icRender(a,{vm:n}),e.trigger("ic-date-picker.init"))}b(void 0,!0),e.on("ic-date-picker.render",function(t,r){try{e.icRender(a,r),e.trigger("ic-date-picker.init")}catch(t){console.log(t)}}),e.on("ic-date-picker.recover",function(e,t){c=r}),e.on("ic-date-picker.next",function(e,t){r=c,b(c=o()(c,u).add(1,"months").format(u))}),e.on("ic-date-picker.cancel",function(t,r){e.find("[ic-date=?]".replace("?",r)).removeClass(h),g=i.a.without(g,r)});var y=d.a.get("event.action")||"click";function k(e){var t=e.year(),r=e.month();return i.a.range(1,e.daysInMonth()+1).map(function(e){return o()([t,r,e]).format(u)})}e.on(y,"[ic-date-prev-m]:not([disabled]), [ic-date-next-m]:not([disabled])",function(e){var t=this.hasAttribute("ic-date-prev-m")?"subtract":"add";r=c,c=o()(c,u)[t](1,"months").format(u),console.info(c),b(c)}),e.on(y,"[ic-date]"+l,s?function(t){var r=this.getAttribute("ic-date");this.classList.contains(h)?(this.classList.remove(h),g=i.a.without(g,r)):(this.classList.add(h),g.push(r)),e.trigger("ic-date-picker.change",[g])}:function(t){this.classList.contains(h)||(e.find("[ic-date]").removeClass(h),(g=[]).push(this.getAttribute("ic-date")),this.classList.add(h),e.trigger("ic-date-picker.change",[g]))}),b(c)})}]).default});
//# sourceMappingURL=brick.datepicker.js.map