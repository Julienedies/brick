/*!
 * https://github.com/julienedies/brick.git
 * https://github.com/Julienedies/brick/wiki
 * license:ISC
 * V0.9.38
 * 2023-10-15 11:08:02
 * 
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery"),require("lodash"),require("@julienedies/brick")):"function"==typeof define&&define.amd?define(["jquery","lodash","brick"],t):"object"==typeof exports?exports["brick.transition"]=t(require("jquery"),require("lodash"),require("@julienedies/brick")):e["brick.transition"]=t(e.$,e._,e.brick)}(this,function(e,t,a){return function(e){var t={};function a(p){if(t[p])return t[p].exports;var o=t[p]={i:p,l:!1,exports:{}};return e[p].call(o.exports,o,o.exports,a),o.l=!0,o.exports}return a.m=e,a.c=t,a.d=function(e,t,p){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:p})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var p=Object.create(null);if(a.r(p),Object.defineProperty(p,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(p,o,function(t){return e[t]}.bind(null,o));return p},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=15)}({0:function(t,a){t.exports=e},15:function(e,t,a){"use strict";a.r(t);var p=a(2),o=a.n(p),r=a(0),i=a.n(r),n=a(5),g=a.n(n);g.a.getAniMap=function(e){var t="",a="";switch(e=(e=1*e>67?0:1*e)||Math.round(66*Math.random()+1)){case 1:t="pt-page-moveToLeft",a="pt-page-moveFromRight";break;case 2:t="pt-page-moveToRight",a="pt-page-moveFromLeft";break;case 3:t="pt-page-moveToTop",a="pt-page-moveFromBottom";break;case 4:t="pt-page-moveToBottom",a="pt-page-moveFromTop";break;case 5:t="pt-page-fade",a="pt-page-moveFromRight pt-page-ontop";break;case 6:t="pt-page-fade",a="pt-page-moveFromLeft pt-page-ontop";break;case 7:t="pt-page-fade",a="pt-page-moveFromBottom pt-page-ontop";break;case 8:t="pt-page-fade",a="pt-page-moveFromTop pt-page-ontop";break;case 9:t="pt-page-moveToLeftFade",a="pt-page-moveFromRightFade";break;case 10:t="pt-page-moveToRightFade",a="pt-page-moveFromLeftFade";break;case 11:t="pt-page-moveToTopFade",a="pt-page-moveFromBottomFade";break;case 12:t="pt-page-moveToBottomFade",a="pt-page-moveFromTopFade";break;case 13:t="pt-page-moveToLeftEasing pt-page-ontop",a="pt-page-moveFromRight";break;case 14:t="pt-page-moveToRightEasing pt-page-ontop",a="pt-page-moveFromLeft";break;case 15:t="pt-page-moveToTopEasing pt-page-ontop",a="pt-page-moveFromBottom";break;case 16:t="pt-page-moveToBottomEasing pt-page-ontop",a="pt-page-moveFromTop";break;case 17:t="pt-page-scaleDown",a="pt-page-moveFromRight pt-page-ontop";break;case 18:t="pt-page-scaleDown",a="pt-page-moveFromLeft pt-page-ontop";break;case 19:t="pt-page-scaleDown",a="pt-page-moveFromBottom pt-page-ontop";break;case 20:t="pt-page-scaleDown",a="pt-page-moveFromTop pt-page-ontop";break;case 21:t="pt-page-scaleDown",a="pt-page-scaleUpDown pt-page-delay300";break;case 22:t="pt-page-scaleDownUp",a="pt-page-scaleUp pt-page-delay300";break;case 23:t="pt-page-moveToLeft pt-page-ontop",a="pt-page-scaleUp";break;case 24:t="pt-page-moveToRight pt-page-ontop",a="pt-page-scaleUp";break;case 25:t="pt-page-moveToTop pt-page-ontop",a="pt-page-scaleUp";break;case 26:t="pt-page-moveToBottom pt-page-ontop",a="pt-page-scaleUp";break;case 27:t="pt-page-scaleDownCenter",a="pt-page-scaleUpCenter pt-page-delay400";break;case 28:t="pt-page-rotateRightSideFirst",a="pt-page-moveFromRight pt-page-delay200 pt-page-ontop";break;case 29:t="pt-page-rotateLeftSideFirst",a="pt-page-moveFromLeft pt-page-delay200 pt-page-ontop";break;case 30:t="pt-page-rotateTopSideFirst",a="pt-page-moveFromTop pt-page-delay200 pt-page-ontop";break;case 31:t="pt-page-rotateBottomSideFirst",a="pt-page-moveFromBottom pt-page-delay200 pt-page-ontop";break;case 32:t="pt-page-flipOutRight",a="pt-page-flipInLeft pt-page-delay500";break;case 33:t="pt-page-flipOutLeft",a="pt-page-flipInRight pt-page-delay500";break;case 34:t="pt-page-flipOutTop",a="pt-page-flipInBottom pt-page-delay500";break;case 35:t="pt-page-flipOutBottom",a="pt-page-flipInTop pt-page-delay500";break;case 36:t="pt-page-rotateFall pt-page-ontop",a="pt-page-scaleUp";break;case 37:t="pt-page-rotateOutNewspaper",a="pt-page-rotateInNewspaper pt-page-delay500";break;case 38:t="pt-page-rotatePushLeft",a="pt-page-moveFromRight";break;case 39:t="pt-page-rotatePushRight",a="pt-page-moveFromLeft";break;case 40:t="pt-page-rotatePushTop",a="pt-page-moveFromBottom";break;case 41:t="pt-page-rotatePushBottom",a="pt-page-moveFromTop";break;case 42:t="pt-page-rotatePushLeft",a="pt-page-rotatePullRight pt-page-delay180";break;case 43:t="pt-page-rotatePushRight",a="pt-page-rotatePullLeft pt-page-delay180";break;case 44:t="pt-page-rotatePushTop",a="pt-page-rotatePullBottom pt-page-delay180";break;case 45:t="pt-page-rotatePushBottom",a="pt-page-rotatePullTop pt-page-delay180";break;case 46:t="pt-page-rotateFoldLeft",a="pt-page-moveFromRightFade";break;case 47:t="pt-page-rotateFoldRight",a="pt-page-moveFromLeftFade";break;case 48:t="pt-page-rotateFoldTop",a="pt-page-moveFromBottomFade";break;case 49:t="pt-page-rotateFoldBottom",a="pt-page-moveFromTopFade";break;case 50:t="pt-page-moveToRightFade",a="pt-page-rotateUnfoldLeft";break;case 51:t="pt-page-moveToLeftFade",a="pt-page-rotateUnfoldRight";break;case 52:t="pt-page-moveToBottomFade",a="pt-page-rotateUnfoldTop";break;case 53:t="pt-page-moveToTopFade",a="pt-page-rotateUnfoldBottom";break;case 54:t="pt-page-rotateRoomLeftOut pt-page-ontop",a="pt-page-rotateRoomLeftIn";break;case 55:t="pt-page-rotateRoomRightOut pt-page-ontop",a="pt-page-rotateRoomRightIn";break;case 56:t="pt-page-rotateRoomTopOut pt-page-ontop",a="pt-page-rotateRoomTopIn";break;case 57:t="pt-page-rotateRoomBottomOut pt-page-ontop",a="pt-page-rotateRoomBottomIn";break;case 58:t="pt-page-rotateCubeLeftOut pt-page-ontop",a="pt-page-rotateCubeLeftIn";break;case 59:t="pt-page-rotateCubeRightOut pt-page-ontop",a="pt-page-rotateCubeRightIn";break;case 60:t="pt-page-rotateCubeTopOut pt-page-ontop",a="pt-page-rotateCubeTopIn";break;case 61:t="pt-page-rotateCubeBottomOut pt-page-ontop",a="pt-page-rotateCubeBottomIn";break;case 62:t="pt-page-rotateCarouselLeftOut pt-page-ontop",a="pt-page-rotateCarouselLeftIn";break;case 63:t="pt-page-rotateCarouselRightOut pt-page-ontop",a="pt-page-rotateCarouselRightIn";break;case 64:t="pt-page-rotateCarouselTopOut pt-page-ontop",a="pt-page-rotateCarouselTopIn";break;case 65:t="pt-page-rotateCarouselBottomOut pt-page-ontop",a="pt-page-rotateCarouselBottomIn";break;case 66:t="pt-page-rotateSidesOut",a="pt-page-rotateSidesIn pt-page-delay200";break;case 67:t="pt-page-rotateSlideOut",a="pt-page-rotateSlideIn"}return{inClass:a,outClass:t}},g.a.directives.reg("ic-view",{name:"ic-view",once:!0,fn:function(e){i()("html, body").addClass("ic-view-flag")}}),function(){i()("body");var e="webkitAnimationEnd";function t(e){e.attr("ic-isAnimating",!1),e.addClass("ic-animating"),e.attr("ic-aniEnd",!1),e.removeAttr("ic-aniIn")}function a(t,a,p){t.removeClass("ic-animating"),t.off(e).attr("ic-aniEnd",!0).trigger("ic-aniEnd"),a&&a.call(t[0],p)}i.a.fn.icAniOut=function(p,r,n){var c=[].slice.call(arguments);p=r=n=void 0,c.forEach(function(e){o.a.isFunction(e)?n=e:o.a.isObject(e)?r=e:o.a.isNumber(e)&&(p=e)}),r=i()(r);var s=this;s=!(!s[0]||!s[0].hasAttribute)&&s,(r=!(!r[0]||!r[0].hasAttribute)&&r)||p||(p=(p=(p=p||this.attr("ic-aniId"))&&1*p)&&p%2?p+1:p-1);var u=g.a.getAniMap(p),m=u.inClass,l=u.outClass;return s&&!s.hasClass("ic-animating")&&(t(s),s.addClass(l).on(e,function(){s.removeClass(l),s.removeAttr("ic-active"),s.removeAttr("ic-aniIn"),s.attr("ic-aniOut",!0),a(s,n,!1),!r||r&&r.attr("ic-aniEnd")})),r&&!r.hasClass("ic-animating")&&(t(r),r.attr("ic-aniId",p),r.attr("ic-active",!0),r.attr("ic-aniIn",!0),r.removeAttr("ic-aniOut").addClass(m).on(e,function(){r.removeClass(m),a(r,n,!0),!s||s&&s.attr("ic-aniEnd")})),this},i.a.fn.icAniIn=function(e,t,a){var p=[].slice.call(arguments);return e=t=a=void 0,p.forEach(function(p){o.a.isFunction(p)?a=p:o.a.isObject(p)?t=p:o.a.isNumber(p)&&(e=p)}),(t=t||i()({})).icAniOut(e,this,a)}}(),function(){function e(e){o.a.extend(this,e||{}),this.history=[],this.pool={},this.conf={},this.currentView="",this.$current=i()({})}var t={cache:function(e,t){var a=this.pool[e]=this.pool[e]||{};return t&&(a.$view=t,a.aniId=1*t.attr("ic-view-ani-id")||g.a.get("view.aniId")||Math.round(66*Math.random()+1)),(t=a.$view)?a:(t=i()("[ic-view=?]".replace("?",e)),this.cache(e,t))},current:function(){var e=this.currentView;if(!e){var t=i()("[ic-view][ic-active]");e=t.attr("ic-view"),this.currentView=e,this.$current=t,this.cache(e,t)}return e},to:function(e,t){if(!e)throw"must to provide name of view.";var a=this,p=this.current();if(p!==e){var o=this.cache(e),r=this.cache(p),i=r.aniId;i=t?i%2?i+1:i-1:i,r.$view.icAniOut(i,o.$view,function(r){r&&(o.$view.trigger("ic-view.active",o),!t&&a.history.push(p),a.currentView=e,a.$current=o.$view)})}},back:function(){var e=this.history.pop();e&&this.to(e,!0)}};for(var a in t)e.prototype[a]=t[a];var p=g.a.view=new e,r=g.a.get("event.action");i()(document.body).on(r,"[ic-view-to]",function(e){var t=i()(this).attr("ic-view-to");p.to(t)}).on("click","[ic-view-back]",function(e){p.back()})}()},2:function(e,a){e.exports=t},5:function(e,t){e.exports=a}}).default});
//# sourceMappingURL=brick.transition.js.map