/*!
 * https://github.com/julienedies/brick.git
 * https://github.com/Julienedies/brick/wiki
 * license:ISC
 * V0.8.7
 * 2/27/2019, 8:17:11 PM
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports["brick.datepicker"]=e():t["brick.datepicker"]=e()}(this,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=12)}({12:function(t,e){brick.directives.reg("ic-date-picker",function(t){var e,n,r=new Date,i=t.attr("ic-tpl-name"),o=t.attr("ic-date-now")||r.getFullYear()+"-"+(r.getMonth()+1)+"-"+r.getDate(),a=t.attr("ic-date-format")||"YYYY-MM-DD",c=t.attr("ic-date-multiple"),d=t.attr("ic-date-week-start")||1,s=t.attr("ic-date-enabled")?"[ic-date-enabled]":"",u=(t.attr("ic-date-disabled"),t.icParseProperty2("ic-date-on-render")),f=moment(o,a),l="selected",m=function(t){var e=_.range(1,8),n=_.indexOf(e,1*t),r=e.splice(n);return r.unshift(0,0),e.splice.apply(e,r),e}(d),p=(e=(e=t.attr("ic-date-default"))&&e.trim()&&e.split(/(?:\s*,\s*)|(?:\s+)/gim))||[];function h(e,n){var r=function(t){var e=t?moment(t,a):moment(),n=t?moment(t,a):moment();n.subtract(1,"months");var r=t?moment(t,a):moment();r.add(1,"months"),console.log(r.format(a));var i=e.year(),o=e.month(),c=[],d=v(e),s=v(n),u=v(r),l=d.length,h=moment([i,o,1]).weekday();0===h&&(h=7);var g=_.indexOf(m,h),b=g;console.log(m,h,g);for(;b>0;)d.unshift(s.pop()),b--;var y=7*Math.ceil(d.length/7)-d.length;for(;y>0;)d.push(u.shift()),y--;d=d.map(function(t,e){var n=moment(t,a),r=n.diff(f,"days"),i=r<0?"over":r>0?"coming":"today",o=e<g?"prev":e>l+g-1?"next":"current",d=_.indexOf(p,t)>-1,s=t.replace(/^\d\d\d\d-\d\d-0?/i,""),u={n:s,date:t,status:i,diff:r,selected:d,position:o,custom:{}};return c.push(u),u});var k=[],x=d.splice(0,7);for(;x.length;)k.push(x),x=d.splice(0,7);return{current:e.format("YYYY-MM"),weeks:k,calendar:c,year:e.format("YYYY"),month:e.format("MM"),x:e.diff(f,"months")}}(e);u&&!n?u(r):(t.icRender(i,{vm:r}),t.trigger("ic-date-picker.init"))}h(void 0,!0),t.on("ic-date-picker.render",function(e,n){try{t.icRender(i,n),t.trigger("ic-date-picker.init")}catch(e){console.log(e)}}),t.on("ic-date-picker.recover",function(t,e){o=n}),t.on("ic-date-picker.next",function(t,e){n=o,h(o=moment(o,a).add(1,"months").format(a))}),t.on("ic-date-picker.cancel",function(e,n){t.find("[ic-date=?]".replace("?",n)).removeClass(l),p=_.without(p,n)});var g=brick.get("event.action")||"click";function v(t){var e=t.year(),n=t.month();return _.range(1,t.daysInMonth()+1).map(function(t){return moment([e,n,t]).format(a)})}t.on(g,"[ic-date-prev-m]:not([disabled]), [ic-date-next-m]:not([disabled])",function(t){var e=this.hasAttribute("ic-date-prev-m")?"subtract":"add";n=o,o=moment(o,a)[e](1,"months").format(a),console.info(o),h(o)}),t.on(g,"[ic-date]"+s,c?function(e){var n=this.getAttribute("ic-date");this.classList.contains(l)?(this.classList.remove(l),p=_.without(p,n)):(this.classList.add(l),p.push(n)),t.trigger("ic-date-picker.change",[p])}:function(e){this.classList.contains(l)||(t.find("[ic-date]").removeClass(l),(p=[]).push(this.getAttribute("ic-date")),this.classList.add(l),t.trigger("ic-date-picker.change",[p]))}),h(o)})}}).default});
//# sourceMappingURL=brick.datepicker.js.map