/*!
 * https://github.com/julienedies/brick.git
 * https://github.com/Julienedies/brick/wiki
 * license:ISC
 * V0.8.6
 * 2/21/2019, 9:21:53 PM
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["brick"] = factory(require("jquery"), require("lodash"));
	else
		root["brick"] = factory(root["$"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_jquery__, __WEBPACK_EXTERNAL_MODULE_lodash__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./brick.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./$extend/$extension.js":
/*!*******************************!*\
  !*** ./$extend/$extension.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/export */ "./core/export.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * 扩展 jquery
 * Created by julien.zhang on 2014/10/30.
 */


!jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn && (jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn = {});

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icRender = function (tpl, model, callback) {
  if (_typeof(tpl) === 'object') {
    callback = model;
    model = tpl;
    tpl = this.attr('ic-tpl') || this.attr('ic-tpl-name');
  }

  var tplFn = _core_export__WEBPACK_IMPORTED_MODULE_1__["default"].getTpl(tpl);
  if (!tplFn) return console.info('not find tpl: ' + tpl); // 如果数据模型不是对象类型,则对其包装

  if (_core_export__WEBPACK_IMPORTED_MODULE_1__["default"].get('render.wrapModel') || Array.isArray(model)) {
    model = {
      model: model
    };
  }

  var html = tplFn(model);
  return this.each(function () {
    var $th = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    setTimeout(function () {
      $th.html(html);
      $th.icCompile(true);
      callback && callback.apply(this, [$th.children()]);
    }, 30);
  });
};

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icCompile = function (is_start_form_children) {
  return this.each(function (i) {
    _core_export__WEBPACK_IMPORTED_MODULE_1__["default"].compile(this, is_start_form_children);
  });
};

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icParseProperty = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icPp = function (name, isLiteral) {
  //console.info('icParseProperty => ', name);
  var match; // js直接量  <div ic-tpl-init="{}">  object {}

  if (match = name.match(/^\s*(([{\[])(.+)[}\]])\s*$/)) {
    //console.info(match);
    try {
      return (match[3] && match[2]) == '{' ? eval('(' + match[1] + ')') : match[2] == '{' ? {} : [];
    } catch (e) {
      console.error(e);
    }
  } else // 字符串
    if (match = name.match(/^\s*((['"])[^'"]*\2)\s*$/)) {
      return match[1];
    } else // 数字
      if (match = name.match(/^\s(\d+)\s*$/)) {
        return match[1];
      }

  if (isLiteral) return name; //按直接量解析, 不通过scope链进行查找

  var params = name.split(':');
  name = params.shift(); // 从控制器scope里获取或者全局window

  var $ctrl = this.closest('[ic-ctrl]');
  var ctrl = $ctrl.attr('ic-ctrl'); //var namespace = ctrl ? $ctrl.data('ic-ctrl-scope') : {};

  var namespace = ctrl ? _core_export__WEBPACK_IMPORTED_MODULE_1__["default"].controllers.get(ctrl) : {};

  function fx(root, chain) {
    var k = chain.shift();
    var v = root && root[k];
    if (v === undefined) return;

    if (chain.length) {
      return fx(v, chain);
    }

    return v;
  }

  var v = fx(namespace, name.split('.'));
  v = v || fx(window, name.split('.')); //console.info('icParseProperty => ' + name + ' => ', v);

  if (typeof v == 'function' && params.length) {
    return function () {
      var that = this;
      var args = [].slice.call(arguments);
      var p;

      while (p = params.shift()) {
        args.push(p);
      }

      return v.apply(that, args); //window.confirm通过apply方式调用会出错,暂时不处理
    };
  }

  return v;
};

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icParseProperty2 = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icPp2 = function (name, isLiteral) {
  name = this.attr(name);
  if (name === undefined || name === '') return name;
  return this.icParseProperty(name, isLiteral);
};

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icTabs = function (options) {
  var active = options.active;
  active && this.attr('ic-tab-active', active);
  return this;
};

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icAjax = function (options) {
  if (options === undefined) return this.trigger('ic-ajax');
  options.data && this.data('ic-submit-data', options.data);
  options.disabled !== void 0 && this.attr('ic-ajax-disabled', !!options.disabled);
  return this;
};
/*$.fn.icForm = function (call, options) {
 return this.trigger('ic-form.' + call, options);
 };*/


jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icDialog = function (options, callback) {
  options = _.isObject(options) ? _.extend({
    desc: '',
    title: ''
  }, options) : {
    desc: options,
    title: ''
  };

  if (!(this[0] && this[0].hasAttribute('ic-dialog'))) {
    console.error('not is ic-dialog');
    return this;
  }

  var that = this;
  var tpl = that.attr('ic-tpl-name');
  callback && this.one('ic-dialog.close', callback);
  setTimeout(function () {
    if (options === void 0) {
      options = true;
    }

    if (!options) {
      that.icAniOut(21);
    }

    if (tpl && _.isObject(options)) {
      that.icRender(tpl, options.vm || options);
    }

    that.icAniIn(21, function () {
      that.trigger('ic-dialog.show');
    });
  }, 30);
  return this;
};

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.icDialog = function (msg, callback) {
  var options = _.isObject(msg) ? _.extend({
    desc: '',
    title: ''
  }, msg) : {
    desc: msg,
    title: ''
  };
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('[ic-dialog]:first').icDialog(options, callback);
};

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icPrompt = function (options) {
  if (!(this[0] && this[0].hasAttribute('ic-prompt'))) {
    console.error('not is ic-prompt');
    return this;
  }

  var that = this;
  var tpl = that.attr('ic-tpl-name');
  clearTimeout(that.data('ic-prompt-timer'));
  setTimeout(function () {
    if (options === void 0) {
      options = true;
    }

    if (!options) {
      that.icAniOut();
    }

    if (tpl && _.isObject(options)) {
      that.icRender(tpl, options.vm || options);
    }

    that.icAniIn(21, function () {
      that.trigger('ic-prompt.show');
      var timer = setTimeout(function () {
        that.icAniOut();
      }, 2400);
      that.data('ic-prompt-timer', timer);
    });
  }, 30);
  return this;
};

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.icPrompt = function (msg) {
  var options = _.isObject(msg) ? msg : {
    desc: msg
  };
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('[ic-prompt]:first').icPrompt(options);
};

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icDatePicker = function (call, options) {
  return this.trigger('ic-date-picker.' + call, options);
}; //监听enter键


jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icEnterPress = function (call) {
  return this.each(function (i) {
    if (/^textarea$/img.test(this.tagName)) return this;
    call = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.proxy(call, this);

    var fn = function fn(e) {
      if (e.which == 13) {
        //console.info('ic-enter-press emit.');
        call(e);
      }
    };

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('focus', function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).on('input keypress', fn);
    }).on('blur', function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).off('input keypress', fn);
    });
  });
}; //定时器


jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icTimer = function () {
  var th = this;
  var count = th.attr('ic-timer-count') * 1;
  var timer = setInterval(function () {
    if (count--) {
      th.text(count);
    } else {
      clearInterval(timer);
      th.trigger('ic-timer.' + 'end');
    }
  }, 1000);
  return this;
}; // 操作提示


var tipSize = 0;

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.tips = function (parent) {
  ++tipSize;
  var $parent = jquery__WEBPACK_IMPORTED_MODULE_0___default()(parent || 'body');
  var w = $parent.innerWidth() * 0.4 + 'px';
  var h;
  var top;
  var left;
  var wraper = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div class="tipsBox"></div>');
  this.addClass('tips1').css({
    'width': w
  });
  this.appendTo(wraper);
  wraper.appendTo($parent);
  w = this.width();
  h = this.height();
  top = '-' + h / 2 + 'px';
  left = '-' + w / 2 + 'px';
  this.css({
    'top': 40 * tipSize,
    'left': left
  });
  wraper.animate({
    top: 0,
    'opacity': '1'
  }, 500, function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('animated wobble');
  });
  setTimeout(function () {
    wraper.animate({
      'top': -300,
      'opacity': '0'
    }, 500, function () {
      --tipSize;
      wraper.remove();
    });
  }, 2000 * tipSize);
  return this;
};

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.tips = function (massge) {
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div>' + massge + '</div>').tips();
}; //设置loading


(function ($) {
  var loading = '<span ic-loader role="_loading_"><svg width="16" height="16" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z" fill="#3d7fe6"><animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 150 150" to="360 150 150" begin="0s" dur="1s" fill="freeze" repeatCount="indefinite" /></path></svg></span>';

  $.fn.icSetLoading = $.fn.setLoading = function (option) {
    var _loading = option && option.loading;

    this.icClearLoading();
    return this.each(function () {
      //this.parent().css({position:'relative'});
      var $th = $(this);
      var w = $th.outerWidth();
      var h = $th.outerHeight();
      var offset = $th.offset();
      var top = offset.top;
      var left = offset.left;
      var $loading = $(_loading || loading).css({
        width: w,
        height: h,
        position: 'absolute',
        top: top,
        left: left,
        'z-index': 1999
      }).appendTo('body'); //$loading.find('svg').css({'margin-top':($th.height()-16)/2});

      $th.css({
        opacity: '0.5'
      });
      $th.data('_ic-role-loading', $loading);
    });
  };
})(jquery__WEBPACK_IMPORTED_MODULE_0___default.a); //清除loading


jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icClearLoading = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.clearLoading = function () {
  return this.each(function () {
    var $th = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var $loading = $th.data('_ic-role-loading');
    $loading && $loading.remove();
    $th.removeData('_ic-role-loading');
    $th.css({
      opacity: '1'
    });
  });
};

/***/ }),

/***/ "./brick.js":
/*!******************!*\
  !*** ./brick.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_brick_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/brick.scss */ "./css/brick.scss");
/* harmony import */ var _css_brick_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_brick_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_export__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/export */ "./core/export.js");
/* harmony import */ var _core_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/services */ "./core/services.js");
/* harmony import */ var _core_directives__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/directives */ "./core/directives.js");
/* harmony import */ var _core_directives_ctrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/directives/ctrl */ "./core/directives/ctrl.js");
/* harmony import */ var _core_directives_event__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/directives/event */ "./core/directives/event.js");
/* harmony import */ var _core_directives_tpl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/directives/tpl */ "./core/directives/tpl.js");
/* harmony import */ var _$extend_$extension_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./$extend/$extension.js */ "./$extend/$extension.js");
/* harmony import */ var _services_recordManager_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/recordManager.js */ "./services/recordManager.js");
/* harmony import */ var _directives_ajax_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./directives/ajax.js */ "./directives/ajax.js");
/* harmony import */ var _directives_tabs_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./directives/tabs.js */ "./directives/tabs.js");
/* harmony import */ var _directives_tabs2_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./directives/tabs2.js */ "./directives/tabs2.js");
/* harmony import */ var _directives_form_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./directives/form.js */ "./directives/form.js");
/* harmony import */ var _directives_select_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./directives/select.js */ "./directives/select.js");
/* harmony import */ var _directives_enterPress_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./directives/enterPress.js */ "./directives/enterPress.js");
/* harmony import */ var _directives_scroll_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./directives/scroll.js */ "./directives/scroll.js");
/* harmony import */ var _directives_dialog_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./directives/dialog.js */ "./directives/dialog.js");
/* harmony import */ var _directives_dropdown_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./directives/dropdown.js */ "./directives/dropdown.js");
/* harmony import */ var _directives_type_ahead_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./directives/type-ahead.js */ "./directives/type-ahead.js");
/* harmony import */ var _directives_slider_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./directives/slider.js */ "./directives/slider.js");
/* harmony import */ var _directives_pagination_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./directives/pagination.js */ "./directives/pagination.js");
/* harmony import */ var _directives_drag_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./directives/drag.js */ "./directives/drag.js");
/* harmony import */ var _directives_popup_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./directives/popup.js */ "./directives/popup.js");
/* harmony import */ var _directives_viewer_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./directives/viewer.js */ "./directives/viewer.js");
/* harmony import */ var _directives_collection_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./directives/collection.js */ "./directives/collection.js");
// style







 // jQuery扩展 必选


















 // core指令 必选

_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-ctrl', _core_directives_ctrl__WEBPACK_IMPORTED_MODULE_5__["default"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-event', _core_directives_event__WEBPACK_IMPORTED_MODULE_6__["default"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-tpl', _core_directives_tpl__WEBPACK_IMPORTED_MODULE_7__["default"]); // 内置services 可选

_core_services__WEBPACK_IMPORTED_MODULE_3__["default"].add('recordManager', _services_recordManager_js__WEBPACK_IMPORTED_MODULE_9__["default"]); // 内置directives 可选

_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-ajax', _directives_ajax_js__WEBPACK_IMPORTED_MODULE_10__["default"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-ajax-auto', _directives_ajax_js__WEBPACK_IMPORTED_MODULE_10__["ajaxAuto"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-ajax-enter', _directives_ajax_js__WEBPACK_IMPORTED_MODULE_10__["ajaxEnter"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-tabs', _directives_tabs_js__WEBPACK_IMPORTED_MODULE_11__["default"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-tabs2', _directives_tabs2_js__WEBPACK_IMPORTED_MODULE_12__["default"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-form', _directives_form_js__WEBPACK_IMPORTED_MODULE_13__["default"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-select', _directives_select_js__WEBPACK_IMPORTED_MODULE_14__["default"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-enter-press', _directives_enterPress_js__WEBPACK_IMPORTED_MODULE_15__["default"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-type-ahead', _directives_type_ahead_js__WEBPACK_IMPORTED_MODULE_19__["default"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-scroll', _directives_scroll_js__WEBPACK_IMPORTED_MODULE_16__["default"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-dialog', _directives_dialog_js__WEBPACK_IMPORTED_MODULE_17__["default"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-prompt', _directives_dialog_js__WEBPACK_IMPORTED_MODULE_17__["prompt"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].add('ic-dropdown', _directives_dropdown_js__WEBPACK_IMPORTED_MODULE_18__["default"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-slider', _directives_slider_js__WEBPACK_IMPORTED_MODULE_20__["default"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-pagination', _directives_pagination_js__WEBPACK_IMPORTED_MODULE_21__["default"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].add('ic-drag-view', _directives_drag_js__WEBPACK_IMPORTED_MODULE_22__["default"]);
_core_directives__WEBPACK_IMPORTED_MODULE_4__["default"].reg('ic-popup', _directives_popup_js__WEBPACK_IMPORTED_MODULE_23__["default"]); //import(/* webpackChunkName: "directives/datepicker" */'./directives/datepicker.js')
// bootstrap
// $(function () {
//     setTimeout(function () {
//         if (brick.get('bootstrap.auto') === false) return;
//         brick.bootstrap(document.body);
//     }, 30);
// });

/* harmony default export */ __webpack_exports__["default"] = (_core_export__WEBPACK_IMPORTED_MODULE_2__["default"]);

/***/ }),

/***/ "./core/compile.js":
/*!*************************!*\
  !*** ./core/compile.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _directives_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./directives.js */ "./core/directives.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Created by julien.zhang on 2014/12/9.
 */



/**
 * 编译dom节点
 * @param node  {HTMLElement | jQuery}
 * @param is_start_form_children  {Boolean} 可选,  true 表示直接从子元素开始编译;  考虑: ic-tpl指令下, 从ic-tpl属性dom开始编译还是从子元素开始编译好?
 */

function compile(node, is_start_form_children) {
  var $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()(node); // 含有ic-skip指令的元素不用编译

  if ($elm[0].hasAttribute('ic-skip')) return console.log('ic-skip:', node);
  !is_start_form_children && __compile(node);
  var $children = $elm.children();
  var child;
  var i = 0;

  while (child = $children.eq(i)[0]) {
    i++;
    compile(child);
  }
}

function __compile(node) {
  node = node.nodeType ? node : node[0]; // jquery对象转为dom对象

  if (node.nodeType !== 1) return console.info('compile exit', node);
  var $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()(node);
  var attrs = node.attributes;
  var _directives = [];
  var priority = {
    'ic-ctrl': -1000
  };
  var j = 0;

  lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(_directives_js__WEBPACK_IMPORTED_MODULE_2__["default"].get(), function (v, i, list) {
    if (_typeof(v) === 'object' && v.priority) {
      priority[i] = v.priority;
      return;
    }

    priority[i] = j++;
  });

  var name;

  for (var i = 0, l = attrs.length; i < l; i++) {
    name = attrs[i].name;

    if (_directives_js__WEBPACK_IMPORTED_MODULE_2__["default"].get(name)) {
      _directives.push(name);

      continue;
    }
  } //对指令按优先级排序


  _directives.sort(function (a, b) {
    return priority[a] - priority[b];
  }); //处理每一个指令


  while (name = _directives.shift()) {
    _directives_js__WEBPACK_IMPORTED_MODULE_2__["default"].exec(name, $elm, attrs);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (compile);

/***/ }),

/***/ "./core/config.js":
/*!************************!*\
  !*** ./core/config.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/**
 * 用于管理配置
 * Created by julien.zhang on 2014/9/16.
 */

var conf = {
  namespace: {
    prefix: 'ic'
  },
  event: {
    action: 'click'
  },
  ajax: {
    domain: ''
  } //isMobile: /iPhone|iPad|iPod|iOS|Android/i.test(navigator.userAgent)

};
/* harmony default export */ __webpack_exports__["default"] = ({
  get: function get(key) {
    if (!key) return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, conf);
    var keys = key.split('.');
    return function fx(namespace, keys) {
      var k = keys.shift();
      var o = namespace[k];
      if (o && keys.length) return fx(namespace[k], keys);
      return o;
    }(conf, keys);
  },
  set: function set(key, val) {
    var old = this.get(key);
    if (old && lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(old) && lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(val)) return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.extend(old, val);

    this._set(key, val);
  },
  _set: function _set(key, val) {
    var keys = key.split('.');

    (function fx(namespace, keys) {
      var k = keys.shift();
      var o = namespace[k];

      if (keys.length) {
        if (!o) o = namespace[k] = {};
        fx(o, keys);
      } else {
        if (val === undefined) return delete namespace[k];
        namespace[k] = val;
      }
    })(conf, keys);
  }
});

/***/ }),

/***/ "./core/controllers.js":
/*!*****************************!*\
  !*** ./core/controllers.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_export__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/export */ "./core/export.js");
/* harmony import */ var _eventManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventManager */ "./core/eventManager.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./core/services.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * 控制器管理器
 * Created by julien.zhang on 2014/9/15.
 */


 // 存储控制器

var _ctrls = {};

function extend(dist, o) {
  if (_typeof(o) == 'object') {
    for (var i in o) {
      dist[i] = o[i];
    }
  }

  return dist;
} // scope原型对象


function _F() {}

extend(_F.prototype, {
  set: function set(key, val) {
    this[key] = val;
    this.render();
  },
  get: function get(key) {
    return this[key];
  },

  /**
   * 用于触发事件
   * @param e {String} 事件名
   * @param msg {*}    任意要传递的数据
   */
  emit: function emit(e, msg) {
    var that = this;
    _eventManager__WEBPACK_IMPORTED_MODULE_1__["default"].emit(e, msg, that);
  },

  /**
   * 用于订阅事件
   * @param e  {String}   事件名
   * @param f  {Function} 回调函数，接受两个参数e(事件对象，由框架封装提供），msg(用户自定义数据)
   */
  on: function on(e, f) {
    var that = this;
    _eventManager__WEBPACK_IMPORTED_MODULE_1__["default"].on(e, f, that);
  },

  /**
   * 取消事件监听
   * @param e {String}   事件名
   * @param f {Function} 回调函数
   */
  off: function off(e, f) {
    _eventManager__WEBPACK_IMPORTED_MODULE_1__["default"].off(e, f);
  },
  render: function render(tplName, model, call) {
    var that = this;

    if (tplName === undefined) {
      tplName = this._name;
      model = this._model;
    } else if (typeof tplName == 'function') {
      call = tplName;
      tplName = that._name;
      model = that;
    } else if (_typeof(tplName) == 'object') {
      call = model;
      model = tplName;
      tplName = that._name;
    }

    setTimeout(function () {
      var $tpl_dom = that._render(tplName, model);

      if ($tpl_dom) {
        _core_export__WEBPACK_IMPORTED_MODULE_0__["default"].compile($tpl_dom, true); // 手动调用brick.compile或者从子元素开始编译; 避免陷入无限循环

        call && call.apply($tpl_dom, []);
      }
    }, 30);
  },
  _render: function _render(tplName, model) {
    console.log('render => ', tplName, model);
    var $elm = this.$elm;
    var tpl_fn = _core_export__WEBPACK_IMPORTED_MODULE_0__["default"].getTpl(tplName); //模板函数

    var selector = '[ic-tpl=?],[ic-tpl-name=?]'.replace(/[?]/img, tplName);
    var $tpl_dom; // 有ic-tpl属性的dom元素

    var html; // 如果数据模型不是对象类型,则对其包装

    if (_core_export__WEBPACK_IMPORTED_MODULE_0__["default"].get('render.wrapModel') || Array.isArray(model)) {
      model = {
        model: model
      };
    }

    $tpl_dom = $elm.filter(selector); // case: <div ic-ctrl="a" ic-tpl="a"></div>

    $tpl_dom = $tpl_dom.length ? $tpl_dom : $elm.find(selector);
    html = tpl_fn(model);
    $tpl_dom.show();
    $tpl_dom.removeAttr('ic-tpl');
    return $tpl_dom.html(html);
  }
}); // scope对象

function F(name) {
  this._name = name;
}

function f(name, o) {
  F.prototype = new _F(); // 继承scope原型对象

  extend(F.prototype, o); // 继承parent scope

  return new F(name);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  /**
   * 获取一个控制器的scope对象
   * @param name {String} 控制器ID
   */
  get: function get(name) {
    return name && _ctrls[name] && _ctrls[name].scope;
  },

  /**
   * 注册控制器
   * @param name {String}   控制器ID
   * @param ctrl {Function} 控制器的工厂函数
   * @param conf {Object}   可选，控制器config (可以定义依赖，是否注册为global变量，是否做为service)
   */
  reg: function reg(name, ctrl, conf) {
    conf = conf || {};
    var depend = conf.depend || [];
    _ctrls[name] = {
      fn: ctrl,
      depend: depend,
      service: conf.service,
      conf: conf
    };
  },

  /**
   * 运行控制器
   * @param name
   * @param parent {scope} 父scope对象
   * @param $elm  {jQuery} 绑定scope对象的dom
   */
  exec: function exec(name, parent, $elm) {
    var ctrl = _ctrls[name];
    if (!ctrl) throw new Error('not find controller ' + name);
    var conf = ctrl.conf;
    var scope;
    var depend = ctrl.depend;
    scope = parent ? f(name, parent) : f(name);
    scope._parent = parent && parent._name;
    scope.$elm = $elm;
    ctrl.scope = scope; // 如果有多个控制器实例，则该名下控制器的作用域对象引用的会是最后一个实例化控制器的作用域对象

    $elm.data('ic-ctrl-scope', scope); // 用于区别多个同名控制器下的正确继承

    depend = _services__WEBPACK_IMPORTED_MODULE_2__["default"].get(depend) || [];
    depend = depend.constructor !== Array ? [depend] : depend;
    depend.unshift(scope);
    ctrl.fn.apply(scope, depend); // 注入scope和依赖,执行factory
    //ctrl.exec = (ctrl.exec || 0) + 1;
    //if(conf.global) window[name] = scope;

    return scope;
  },
  _look: function _look() {
    return _ctrls;
  }
});

/***/ }),

/***/ "./core/createRender.js":
/*!******************************!*\
  !*** ./core/createRender.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createRender; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _export__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./export */ "./core/export.js");
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parser */ "./core/parser.js");
/**
 * 遍历dom节点，根据指令生成一个编译过的模板渲染函数
 * Created by julien.zhang on 2014/9/15.
 */




function createRender(root) {
  root = root.cloneNode(true); // 遍历dom节点，解析指令

  (function fx(node) {
    Object(_parser__WEBPACK_IMPORTED_MODULE_3__["default"])(node);
    var children = jquery__WEBPACK_IMPORTED_MODULE_1___default()(node).contents();
    var child;
    var i = 0;

    while (child = children.eq(i)[0]) {
      i++;
      fx(child);
    }
  })(root);

  var _tpl = jquery__WEBPACK_IMPORTED_MODULE_1___default()(root).html().replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\b(ic-)(?=href|src|style|class|data|value)/g, '') //早期判断是否输出属性的实现，建议使用ic-has-[prop]指令取代
  .replace(/\bic-(\w+-)?(checked|disabled|selected|enabled)\s*=\s*"\s*((?:[^"]|\\")+)["]/g, function (m, $1, $2, $3) {
    if ($1 === 'has-') return m;
    $1 = $1 ? 'ic-' + $1 : ''; //处理自定义指令  ic-tab-checked
    //$3 = $3.replace(/^(?:"|')|(?:"|')$/g,'');

    return ' <% if(?3){ %> ?2 <% } %> '.replace('?3', $3).replace('?2', $1 + $2);
  }) //实现ic-has-[prop]指令   处理两种情况=>  1: ic-has-checked  2: ic-has-tab-checked
  .replace(/\bic-has-([-_\w]+)\s*=\s*(["])((?:[^"]|\\["])+)\2/img, function (m, $1, $2, $3) {
    //$1 => 属性名   $3 => 表达式值
    console.log($1);
    console.log($3);
    $1 = /^checked|disabled|selected|enabled$/.test($1) ? $1 : 'ic-' + $1; //处理两种情况=>  1: ic-has-checked  2: ic-has-tab-checked

    return ' <% if(?3){ %> ?1 <% } %> '.replace('?3', $3).replace('?1', $1); //.replace('?1',$1 + '=' + ('"<%= ? %>"'.replace('?', $3)));
  }).replace(/&amp;&amp;/g, '&&');

  _export__WEBPACK_IMPORTED_MODULE_2__["default"].get('debug') && console.log(_tpl);
  var tpl_fn;

  try {
    tpl_fn = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.template(_tpl);
  } catch (e) {
    console.error(e, _tpl);
    throw new Error('模板编译错误');
  }

  tpl_fn._tpl_ = _tpl;
  return tpl_fn;
}

/***/ }),

/***/ "./core/directives.js":
/*!****************************!*\
  !*** ./core/directives.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Created by julien.zhang on 2014/9/17.
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  _pool: {},
  add: function add(name, definition, conf) {
    this.reg(name, definition, conf);
  },
  reg: function reg(name, definition, conf) {
    if (_typeof(name) == 'object') {
      conf = name;
      name = conf.name;
    } else if (_typeof(definition) == 'object') {
      conf = definition;
    } else {
      conf = conf || {};
      conf.fn = definition;
    }

    this._pool[name] = conf;
  },
  get: function get(name) {
    return name ? this._pool[name] : this._pool;
  },
  exec: function exec(name, $elm, attrs) {
    var _pool = this._pool;
    var definition = _pool[name];

    if (typeof definition === 'function') {
      definition.apply(null, [$elm, attrs]);
    } else if (definition.fn) {
      definition.fn.apply(null, [$elm, attrs]);

      if (definition.once) {
        delete _pool[i];
      }
    }
  },
  init: function init() {
    var _pool = this._pool;

    for (var _i in _pool) {
      var definition = _pool[_i];

      if (definition.selfExec) {
        definition.fn && definition.fn();

        if (definition.once) {
          delete _pool[_i];
        }
      }
    }
  }
});

/***/ }),

/***/ "./core/directives/ctrl.js":
/*!*********************************!*\
  !*** ./core/directives/ctrl.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers */ "./core/controllers.js");
/**
 * ic-ctrl
 * Created by julien.zhang on 2014/12/9.
 */

/* harmony default export */ __webpack_exports__["default"] = (function ($elm, attrs) {
  if ($elm.data('ic-ctrl-scope')) return; // 每个dom对象只执行一次 controller factory

  var ctrlName = $elm.attr('ic-ctrl');

  if (ctrlName) {
    var $parent = $elm.parent().closest('[ic-ctrl]');
    var parentName = $parent.length ? $parent.attr('ic-ctrl') : ''; //controllers.exec(ctrlName, controllers.get(parentName), $elm);  // 在多个同名控制器的情况下,不能正确的按照dom结构进行继承

    _controllers__WEBPACK_IMPORTED_MODULE_0__["default"].exec(ctrlName, $parent.data('ic-ctrl-scope'), $elm);
  }
});

/***/ }),

/***/ "./core/directives/event.js":
/*!**********************************!*\
  !*** ./core/directives/event.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _export__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../export */ "./core/export.js");
/**
 * Created by julien.zhang on 2014/10/11.
 */



/* harmony default export */ __webpack_exports__["default"] = ({
  selfExec: true,
  once: true,
  fn: function fn() {
    var eventAction = _export__WEBPACK_IMPORTED_MODULE_2__["default"].get('event.action');
    var events = _export__WEBPACK_IMPORTED_MODULE_2__["default"].get('ic-event.extend') || 'click,change';
    var targets = events.replace(/(?:^|,)(\w+?)(?=(?:,|$))/g, function (m, $1) {
      var s = '[ic-?]'.replace('?', $1);
      return m.replace($1, s);
    });
    var $doc = jquery__WEBPACK_IMPORTED_MODULE_1___default()(document);
    events = events.split(',');
    targets = targets.split(',');

    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(events, function (event, i, list) {
      var target = targets[i];
      if (event == 'click') event = eventAction;
      $doc.on(event, target, _call);
    });

    function _call(e) {
      var th = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this);
      var type = e.type;
      var fn = th.attr('ic-' + type);
      fn = th.icParseProperty(fn);
      return fn.apply(this, [e]);
    }
  }
});

/***/ }),

/***/ "./core/directives/tpl.js":
/*!********************************!*\
  !*** ./core/directives/tpl.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../export */ "./core/export.js");
/* harmony import */ var _createRender__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../createRender */ "./core/createRender.js");
/**
 * 根据dom模板生成模板函数
 * Created by julien.zhang on 2014/10/11.
 */



/* harmony default export */ __webpack_exports__["default"] = ({
  selfExec: true,
  //once: true,  // 要考虑异步加载进来的模板, 所以不能只允许调用一次
  fn: function fn($elm) {
    var __tpl = _export__WEBPACK_IMPORTED_MODULE_1__["default"].__tpl = _export__WEBPACK_IMPORTED_MODULE_1__["default"].__tpl || {};

    ($elm || jquery__WEBPACK_IMPORTED_MODULE_0___default()('[ic-tpl]').not(jquery__WEBPACK_IMPORTED_MODULE_0___default()('[ic-skip] [ic-tpl]'))).each(function () {
      var $th = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      var name = $th.attr('ic-tpl');
      var $parent; // 只处理一次

      if ($th.attr('ic-tpl-name')) return;

      if (!name) {
        $parent = $th.closest('[ic-ctrl]');
        name = $parent.attr('ic-ctrl');
      } //自动初始化渲染数据对象


      setTimeout(function () {
        var dob = $th.icParseProperty2('ic-tpl-init');
        dob && $th.icRender(name, dob);
      }, 300);
      __tpl[name] = Object(_createRender__WEBPACK_IMPORTED_MODULE_2__["default"])(this);
      $th.attr('ic-tpl-name', name);
      $th.removeAttr('ic-tpl');
      $th.empty();
    });
  }
});

/***/ }),

/***/ "./core/eventManager.js":
/*!******************************!*\
  !*** ./core/eventManager.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 事件管理器
 * Created by julien.zhang on 2014/9/15.
 */
var _events = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  /**
   * 订阅一个事件监听
   * @param e {String} 事件名
   * @param f {Function} 回调函数
   * @param context {Object} 调用watch方法的scope
   */
  on: function on(e, f, context) {
    e = e.split(/[,\s]+/g);

    for (var i in e) {
      this._bind(e[i], f, context);
    }
  },
  _bind: function _bind(e, f, context) {
    var handle = {
      f: f
    };

    var event = this._getNamespace(e);

    if (context) {
      handle.context = context;
    }

    var callback = event._callback = event._callback || [];
    callback.push(handle);
  },

  /**
   * 取消一个事件监听
   * @param e {String} 事件名
   * @param f {Function} 回调函数，可选，如果没有传递，则取消该事件下的所有监听
   */
  off: function off(e, f) {
    e = e.split(/[,\s]+/g);

    for (var i in e) {
      this._unbind(e[i], f);
    }
  },
  _unbind: function _unbind(e, f) {
    var event = this._getNamespace(e);

    var callback = event && event._callback;
    var handle;

    if (callback) {
      if (!f) {
        delete event._callback;
        return;
      }

      for (var i = 0, len = callback.length; i < len; i++) {
        handle = callback[i];

        if (f === handle.f || f.toString() === handle.f.toString()) {
          callback.splice(i, 1);
          return;
        }
      }
    }
  },

  /**
   *
   * @param e {String} 事件名
   * @param msg  {*}   任意想要传递的数据对象
   * @param that {*}
   * @example
   * e = 'a.b.c';   会触发 ["a.b.c", "a.*.c", "a.*", "a.b.*"]
   */
  emit: function emit(e, msg, that) {
    var namespace = e.split(/[.:]/i);
    var prefix = namespace.shift();
    var events = [e];

    (function x(arr, pre) {
      if (!arr.length) return;
      pre = pre ? pre + '.' : '';

      for (var i = 0, len = arr.length; i < len; i++) {
        var arr1 = arr.slice();
        arr1.splice(0, i + 1);
        var event = pre + '*' + (arr1.length ? '.' + arr1.join('.') : '');
        events.push(event);
      }

      pre += arr.shift();
      x(arr, pre);
    })(namespace.slice(), prefix);

    for (var _e; _e = events.shift();) {
      this._fire(_e, msg, that);
    }
  },
  _fire: function _fire(e, msg, that) {
    var event = this._getNamespace(e);

    var callback = event && event._callback;
    var handle;
    var context;
    var f;

    if (callback) {
      for (var i = 0, len = callback.length; i < len; i++) {
        handle = callback[i];
        context = handle.context || {};
        f = handle.f;

        if (f.constructor === Function) {
          f.apply(context, [{
            eventName: e,
            source: that
          }, msg]);
        }
      }
    }
  },
  _getNamespace: function _getNamespace(e) {
    return _events[e] = _events[e] || {};
    /*        let namespace = e.split('.');
             return (function (k, _events) {
                 let i = k.shift();
                let o = _events[i] = _events[i] || {};
                 if (k.length) {
                    return arguments.callee(k, o);
                }
                 return o;
             })(namespace, _events);*/
  },
  _look: function _look() {
    console.log(_events);
  }
});

/***/ }),

/***/ "./core/export.js":
/*!************************!*\
  !*** ./core/export.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./core/utils.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./core/config.js");
/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers */ "./core/controllers.js");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directives */ "./core/directives.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services */ "./core/services.js");
/* harmony import */ var _eventManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./eventManager */ "./core/eventManager.js");
/* harmony import */ var _createRender__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./createRender */ "./core/createRender.js");
/* harmony import */ var _compile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./compile */ "./core/compile.js");
/**
 * Created by julien.zhang on 2014/9/15.
 */







 //对外接口

var brick = {
  utils: _utils__WEBPACK_IMPORTED_MODULE_0__["default"],
  config: _config__WEBPACK_IMPORTED_MODULE_1__["default"],
  controllers: _controllers__WEBPACK_IMPORTED_MODULE_2__["default"],
  services: _services__WEBPACK_IMPORTED_MODULE_4__["default"],
  directives: _directives__WEBPACK_IMPORTED_MODULE_3__["default"],
  eventManager: _eventManager__WEBPACK_IMPORTED_MODULE_5__["default"],
  createRender: _createRender__WEBPACK_IMPORTED_MODULE_6__["default"],
  compile: _compile__WEBPACK_IMPORTED_MODULE_7__["default"],
  verbose: false,
  __tpl: {},
  debug: function debug() {},
  set: function set(k, v) {
    return this.config.set(k, v);
  },
  get: function get(k) {
    return this.config.get(k);
  },
  on: function on(e, fn) {
    this.eventManager.on(e, fn);
    return this;
  },
  off: function off(e, fn) {
    this.eventManager.off(e, fn);
    return this;
  },
  emit: function emit(e, msg) {
    this.eventManager.emit(e, msg);
    return this;
  },
  getTpl: function getTpl(name) {
    return this.__tpl[name];
  },
  reg: function reg(name, factory, conf) {
    if (/ctrl$/i.test(name)) {
      _controllers__WEBPACK_IMPORTED_MODULE_2__["default"].reg(name, factory, conf);
    } else {
      _services__WEBPACK_IMPORTED_MODULE_4__["default"].reg(name, factory, conf);
    }
  },
  bootstrap: function bootstrap(node) {
    console.info('brick start');
    this.directives.init();
    this.compile(node || document.body);

    this.bootstrap = function () {
      console.info('only bootstrap once.');
    };
  }
};
/* harmony default export */ __webpack_exports__["default"] = (brick);

/***/ }),

/***/ "./core/parser.js":
/*!************************!*\
  !*** ./core/parser.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parser; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * 主要用于解析一个dom节点上绑定的tpl指令
 * Created by julien.zhang on 2014/9/12.
 */

function parser(node) {
  if (node.nodeType === 1) {
    var elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()(node);
    var attrs = node.attributes;
    var directives = [];
    var priority = {
      'skip': -100,
      'init': -10,
      'for': 0,
      'for-start': 1,
      'for-init': 10,
      'if': 100,
      'else-if': 99,
      'if-start': 100,
      'if-init': 110,
      'else': 100,
      'bind': 1000,
      'if-end': 10000,
      'for-end': 10000
    };

    for (var i = 0, _attr, name, value, l = attrs.length; i < l; i++) {
      _attr = attrs[i];
      name = _attr.name;
      value = _attr.value;

      if (/^ic-(skip|init|for|if|else|bind)/.test(name) || /\{\{.+?\}\}/.test(value)) {
        directives.push([name, value]); //continue;
      }
    } //对指令按优先级排序


    directives.sort(function (a, b) {
      return priority[a[0].replace(/^ic-/, '')] - priority[b[0].replace(/^ic-/, '')];
    }); //处理每一个指令

    var attr;

    while (attr = directives.shift()) {
      var _name = attr[0];
      var _value = attr[1];

      if (/-skip$/.test(_name)) {
        elm.remove();
        return;
      }

      if (/-init$/.test(_name)) {
        elm.before('\r\n<% var ' + _value.replace(/;(?=\s*[_\w]+\s*=)/g, ';var ') + ' %>\r\n');
        elm.removeAttr(_name);
        continue;
      }

      if (/-for$/.test(_name)) {
        //elm.before('<% for( var ' + value + '){ %>\r\n');
        // old reg /^\s*(?:(\w+?)\s*\,\s*)?(\w+?)\s*in\s*((?:[\w.]+)|(?:\[[^\[\]]+\]))\s*$/
        elm.before(_value.replace(/^\s*(?:(\w+?)\s*\,\s*)?(\w+?)\s*in\s*(.+)\s*$/, function (m, $1, $2, $3, t) {
          if ($1 && $2) return '<% for( var ' + $1 + ' in ' + $3 + '){ var ' + $2 + ' = ' + $3 + '[' + $1 + ']; %>\r\n';
          return '<% for( var ' + m + '){ %>\r\n';
        }));
        elm.after('\r\n<% } %>');
        elm.removeAttr(_name);
        continue;
      }

      if (/-for-start$/.test(_name)) {
        elm.before(_value.replace(/^\s*(?:(\w+?)\s*\,\s*)?(\w+?)\s*in\s*([\w.]+)/, function (m, $1, $2, $3, t) {
          if ($1 && $2) return '<% for( var ' + $1 + ' in ' + $3 + '){ var ' + $2 + ' = ' + $3 + '[' + $1 + ']; %>\r\n';
          return '<% for( var ' + m + '){ %>\r\n';
        }));
        elm.removeAttr(_name);
        continue;
      }

      if (/-for-end$/.test(_name) || /-if-end$/.test(_name)) {
        elm.after('\r\n<% } %>');
        elm.removeAttr(_name);
        continue;
      }

      if (/-else-if$/.test(_name)) {
        elm.before('<% } else if(' + (_value === '' ? void 0 : _value) + '){ %>\r\n');
        elm.removeAttr(_name);
        continue;
      }

      if (/-if$/.test(_name)) {
        elm.before('<% if(' + (_value === '' ? void 0 : _value) + '){ %>\r\n');
        elm.after('\r\n<% } %>');
        elm.removeAttr(_name);
        continue;
      }

      if (/-if-start$/.test(_name)) {
        elm.before('<% if(' + (_value === '' ? void 0 : _value) + '){ %>\r\n');
        elm.removeAttr(_name);
        continue;
      }

      if (/-else$/.test(_name)) {
        elm.before('<% } else{ %>\r\n');
        elm.after('\r\n<% } %>');
        elm.removeAttr(_name);
        continue;
      }

      if (/-bind$/.test(_name)) {
        elm.html('\r\n<%= ' + (_value === '' ? '\"\"' : _value) + ' %>\r\n');
        elm.removeAttr(_name);
        continue;
      }

      if (/^ic-(?:href|src|style|class|data|value)$/.test(_name)) {
        elm.removeAttr(_name);
        elm.attr(_name, _value.replace(/{{(.+?)}}/g, '<%= $1 %>'));
        continue;
      }

      elm.attr(_name, _value.replace(/{{(.+?)}}/g, '<%= $1 %>'));
    }

    return;
  }

  if (node.nodeType === 3) {
    var text = node.nodeValue;
    node.nodeValue = text.replace(/{{(.+?)}}/g, '<%= $1 %>');
  }
}

/***/ }),

/***/ "./core/services.js":
/*!**************************!*\
  !*** ./core/services.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 服务管理器 （任意类型的数据，模型对象，UI组件都可以做为服务存在；通常是单例对象）
 * Created by julien.zhang on 2014/9/15.
 */
var services = {};
var registry = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  _look: function _look() {
    console.log(registry);
  },

  /**
   * 注册服务
   * @param name {String}    服务ID
   * @param factory {Function} 服务的工厂函数
   * @param [conf] {Array|Object}   可选，依赖的其它服务
   */
  reg: function reg(name, factory, conf) {
    var depend = conf && (conf.constructor === Array ? conf : conf.depend);
    registry[name] = {
      depend: depend,
      serve: factory,
      conf: conf
    };
  },

  /*
   * 实例化一个服务
   */
  create: function create(name) {
    var that = this;
    var serv = registry[name];
    if (!serv) return;
    var depend = serv.depend;

    if (depend) {
      depend = that.get(depend);
    }

    window[name] = serv.serve.apply(null, depend || []);
    return window[name];
  },

  /**
   * 直接注册一个已经实例化的服务
   * @param name {String} 服务ID
   * @param service {*}   任意数据对象
   */
  add: function add(name, service) {
    //services[name] = service;
    this.fill(name, service);
  },
  fill: function fill(name, service) {
    services[name] = service;
  },

  /**
   * 获取一个服务实例
   * @param name {String|Array} 服务器ID
   * @return 服务 {*}  任意类型，取决于当初注册时的服务对象
   */
  get: function get(name) {
    var that = this;
    if (!name) return undefined; //外部get

    if (typeof name === 'string') {
      return services[name] = services[name] || that.create(name);
    } //内部get


    if (name.constructor === Array) {
      name = name.slice();

      for (var i = 0, v, len = name.length; i < len; i++) {
        v = name[i];
        name[i] = services[v] = services[v] || that.create(v);
      }

      return name;
    }
  }
});

/***/ }),

/***/ "./core/utils.js":
/*!***********************!*\
  !*** ./core/utils.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * 工具函数集合
 * Created by Juien on 2015/8/10.
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  cid: function cid() {
    return Math.random().toFixed(7).replace('0.', '');
  },

  /**
   * @todo 恢复被转义的html
   * @param text {string} <必须> html类型字符串
   * @returns {*}
   */
  toHtml: function toHtml(text) {
    var $c = jquery__WEBPACK_IMPORTED_MODULE_0___default()('<div></div>');
    $c.html(text);
    return $c.text();
  },

  /**
   * @todo 封装location.search为一个对象，如果不存在，返回undefined
   * @param str {string}  [可选]  location.search 格式字符串,
   * @returns {*}
   * @example brick.utils.get_query('a=1&b=2');  // {a:1, b:2}
   */
  get_query: function get_query(str) {
    var result;
    var k;

    if (str && /^[-_\w]+$/i.test(str)) {
      k = str;
      str = '';
    }

    str = str && str.split('?').length > 1 ? str.split('?')[1] : str; //let query = location.search.replace(/^\?/i, '').replace(/\&/img, ',').replace(/^\,+/img,'').replace(/([^=,\s]+)\=([^=,\s]*)/img, '"$1":"$2"');

    var query = (str || location.search).replace(/^\?/i, '').replace(/\&/img, ',').replace(/^\,+/img, '');
    query.replace(/([^=,\s]+)\=([^=,\s]*)/img, function ($, $1, $2) {
      result = result || {};
      var k;
      var arr;
      $2 = decodeURIComponent($2);

      if (/\[\]$/i.test($1)) {
        k = $1.replace(/\[\]$/i, '');
        arr = result[k] = result[k] || [];
        arr.push($2);
      } else {
        result[$1] = $2;
      }
    }); //    if(!query) return result;
    //    try {
    //        result = JSON.parse('{' + query + '}');
    //    } catch (e) {
    //        console.error(e);
    //        return;
    //    }
    //    for(let i in result){
    //        result[i] = decodeURIComponent(result[i]);
    //    }

    return k ? result && result[k] : result;
  }
});

/***/ }),

/***/ "./css/brick.scss":
/*!************************!*\
  !*** ./css/brick.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./directives/ajax.js":
/*!****************************!*\
  !*** ./directives/ajax.js ***!
  \****************************/
/*! exports provided: default, ajaxAuto, ajaxEnter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ajaxAuto", function() { return ajaxAuto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ajaxEnter", function() { return ajaxEnter; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/export */ "./core/export.js");
/**
 * Created by julien.zhang on 2014/10/31.
 */


/* harmony default export */ __webpack_exports__["default"] = ({
  selfExec: true,
  once: true,
  fn: function fn() {
    var eventAction = _core_export__WEBPACK_IMPORTED_MODULE_1__["default"].get('event.action');

    function call(e) {
      var that = this;
      if (this.hasAttribute('ic-ajax-disabled')) return;
      var $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      var name = $elm.attr('ic-ajax');

      var defaultCall = function defaultCall() {//console.log(arguments)
      };

      var before = $elm.icParseProperty2('ic-submit-before') || defaultCall;
      var data = $elm.data('ic-submit-data') || $elm.attr('ic-submit-data');

      var _data = before.call(that, data);

      if (_data === false) return;
      data = _data || data;
      var domain = _core_export__WEBPACK_IMPORTED_MODULE_1__["default"].get('ajax.domain') || '';
      var url = domain + $elm.attr('ic-submit-action');
      var dataType = $elm.attr('ic-submit-data-type') || 'json';
      var method = $elm.attr('ic-submit-method') || 'post';
      var failed = $elm.icParseProperty2('ic-submit-on-fail') || defaultCall;
      var done = $elm.icParseProperty2('ic-submit-on-done') || defaultCall;
      var always = $elm.icParseProperty2('ic-submit-on-always') || defaultCall;
      var $loading = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[ic-role-loading=?]'.replace('?', name || +new Date()));
      $loading.length ? $loading.show() && $elm.hide() : $elm.setLoading();
      $elm.attr('ic-ajax-disabled', true);
      jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
        url: url,
        type: method,
        dataType: dataType,
        data: data
      }).done(function (data) {
        $elm.clearLoading() && $loading.hide() && $elm.show();
        done.apply(that, [data]);
      }).fail(function (msg) {
        $elm.clearLoading() && $loading.hide() && $elm.show();
        failed.apply(that, [msg]);
      }).always(function () {
        $elm.clearLoading() && $loading.hide() && $elm.show();
        always.apply(that);
        $elm.removeData('ic-submit-data');
        $elm.removeAttr('ic-ajax-disabled');
      });
    }

    var $doc = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body);
    $doc.on(eventAction, '[ic-ajax]:not([ic-ajax-enter])', call);
    $doc.on('ic-ajax', '[ic-ajax]', call);
  }
});
var ajaxAuto = {
  fn: function fn($elm) {
    $elm.icAjax();
  }
};
var ajaxEnter = {
  fn: function fn($elm) {
    $elm.icEnterPress(function () {
      $elm.icAjax();
    });
  }
};


/***/ }),

/***/ "./directives/collection.js":
/*!**********************************!*\
  !*** ./directives/collection.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_directives_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/directives.js */ "./core/directives.js");
/**
 * 简单指令合集
 * Created by j on 18/8/5.
 */


_core_directives_js__WEBPACK_IMPORTED_MODULE_1__["default"].reg('ic-input-select', {
  selfExec: true,
  once: true,
  fn: function fn() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).on('click', '[ic-input-select]', function (e) {});
  }
});
/**
 * 定义ic-toggle指令;
 */

_core_directives_js__WEBPACK_IMPORTED_MODULE_1__["default"].reg('ic-toggle', {
  selfExec: true,
  once: true,
  fn: function fn() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).on('click', '[ic-toggle]', function (e) {
      var name = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('ic-toggle');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('[ic-toggle-target=?]'.replace('?', name)).toggle();
    });
  }
});
/**
 * 定义ic-close指令;
 */

_core_directives_js__WEBPACK_IMPORTED_MODULE_1__["default"].reg('ic-close', {
  selfExec: true,
  once: true,
  fn: function fn() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).on('click', '[ic-close]', function (e) {
      var $th = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      $th.closest('[ic-close-target]').toggle();
    });
  }
});
/**
 * 定义ic-checkbox指令;
 */

_core_directives_js__WEBPACK_IMPORTED_MODULE_1__["default"].reg('ic-checkbox', {
  selfExec: true,
  once: true,
  fn: function fn() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).on('click', '[ic-checkbox]', function (e) {
      if (this !== e.target) return;
      var $th = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);

      if (this.hasAttribute('selected')) {
        $th.removeAttr('selected').removeClass('selected');
      } else {
        $th.attr('selected', true).addClass('selected');
      }

      $th.trigger('ic-checkbox.change', {
        name: $th.attr('ic-checkbox')
      });
    });
  }
});
/**
 * 定义ic-dom-clone指令;
 */

_core_directives_js__WEBPACK_IMPORTED_MODULE_1__["default"].reg('ic-dom-clone', {
  selfExec: true,
  once: true,
  fn: function fn() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).on('click', '[ic-dom-clone]', function (e) {
      var $th = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      $th.prev('[ic-dom]').clone(true).insertBefore($th);
    });
  }
});
/**
 * 定义ic-dom-remove指令;
 */

_core_directives_js__WEBPACK_IMPORTED_MODULE_1__["default"].reg('ic-dom-remove', {
  selfExec: true,
  once: true,
  fn: function fn() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).on('click', '[ic-dom-remove]', function (e) {
      var nextAll = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).nextAll('[ic-dom]');
      nextAll.length > 1 && nextAll.eq(nextAll.length - 1).remove();
    });
  }
});

/***/ }),

/***/ "./directives/dialog.js":
/*!******************************!*\
  !*** ./directives/dialog.js ***!
  \******************************/
/*! exports provided: default, prompt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prompt", function() { return prompt; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/export */ "./core/export.js");
/**
 * Created by julien.zhang on 2014/10/29.
 */

 //ic-dialog

/* harmony default export */ __webpack_exports__["default"] = ({
  selfExec: true,
  once: true,
  fn: function fn($elm, attrs) {
    var eventAction = _core_export__WEBPACK_IMPORTED_MODULE_1__["default"].get('event.action');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).on(eventAction, '[ic-dialog-cancel], [ic-dialog-close], [ic-dialog-confirm]', function (e) {
      var $th = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      var type = this.hasAttribute('ic-dialog-confirm');
      var $dialog = $th.closest('[ic-dialog]');
      $dialog.icAniOut(21, function () {
        $dialog.trigger('ic-dialog.close', type);
        $dialog.trigger('ic-dialog.hide', type);
      });
    }).on(eventAction, '[ic-dialog-href]', function (e) {
      var target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('ic-dialog-href');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('[ic-dialog=?]'.replace('?', target)).icDialog();
      return false;
    });
  } //ic-prompt

});
var prompt = {
  selfExec: true,
  once: true,
  fn: function fn($elm, attrs) {
    var eventAction = _core_export__WEBPACK_IMPORTED_MODULE_1__["default"].get('event.action');
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).on(eventAction, '[ic-prompt-cancel], [ic-prompt-close], [ic-prompt-confirm]', function (e) {
      var $th = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      var type = this.hasAttribute('ic-prompt-confirm');
      var $dialog = $th.closest('[ic-prompt]');
      $dialog.icAniOut(21, function () {
        $dialog.trigger('ic-prompt.hide', type);
      });
    });
  }
};


/***/ }),

/***/ "./directives/drag.js":
/*!****************************!*\
  !*** ./directives/drag.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Created by julien.zhang on 2014/11/5.
 */

/* harmony default export */ __webpack_exports__["default"] = (function ($elm, attrs) {
  var $document = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document);
  var startX = 0,
      startY = 0,
      x = 0,
      y = 0;
  var vw, vh;
  var w, h;
  $document.on('click', '[ic-role-drag-key]', function (e) {
    var th = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var drag = th.attr('ic-role-drag-key');
    var d = th.attr('ic-drag-direction');
    var m = 140;
    $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[ic-role-drag-handle=?]'.replace('?', drag)).css({
      position: 'relative'
    });
    w = $elm.width();
    h = $elm.height();
    vw = $elm.closest('[ic-drag-view]').css({
      position: 'relative'
    }).width();
    vh = $elm.closest('[ic-drag-view]').width();
    var position = $elm.position();
    x = position.left;
    y = position.top;

    if (d === 'left') {
      x -= m;
      x = x < -(w - vw) ? -(w - vw) : x;
      $elm.animate({
        left: x
      }, 500);
    }

    if (d === 'right') {
      x += m;
      x = x >= 0 ? 0 : x;
      $elm.animate({
        left: x
      }, 500);
    }
  });
  $document.on('mousedown', '[ic-role-drag-handle]', function (e) {
    e.preventDefault();
    startX = e.pageX;
    startY = e.pageY;
    $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).css({
      position: 'relative'
    });
    vw = $elm.closest('[ic-drag-view]').width();
    vh = $elm.closest('[ic-drag-view]').height();
    var position = $elm.position();
    x = position.left;
    y = position.top;
    w = $elm.width();
    h = $elm.height();
    $document.on('mousemove', mousemove);
    $document.on('mouseup', mouseup);
    return false;
  });

  function mousemove(e) {
    var moveX = e.pageX - startX;
    var moveY = e.pageY - startY;
    startX = e.pageX;
    startY = e.pageY;
    x += moveX;
    y += moveY;
    x = x < -(w - vw) ? -(w - vw) : x;
    x = x >= 0 ? 0 : x;
    y = y < -(h - vh) ? -(h - vh) : y;
    y = y >= 0 ? 0 : y;
    $elm.css({
      top: y + 'px',
      left: x + 'px'
    });
    return false;
  }

  function mouseup() {
    $document.unbind('mousemove', mousemove);
    $document.unbind('mouseup', mouseup);
  }
});

/***/ }),

/***/ "./directives/dropdown.js":
/*!********************************!*\
  !*** ./directives/dropdown.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Created by julien.zhang on 2014/10/15.
 */
/* harmony default export */ __webpack_exports__["default"] = (function ($elm, attrs) {
  var th = $elm;
  th.css({
    position: 'relative'
  });
  var h = th.height();
  var menu = th.find('[ic-dropdown-menu]').css({
    position: 'absolute',
    top: h + 'px',
    display: 'none!important'
  });
  var timer;

  if (menu.length) {
    th.hover(function (e) {
      timer = setTimeout(function () {
        menu.show(300);
      }, 200);
    }, function () {
      clearTimeout(timer);
      menu.slideUp(200);
    });
  }

  var con = th.find('[ic-dropdown-con]').css({
    position: 'absolute',
    overflow: 'hidden'
  });

  if (con.length) {
    var ch = con.height(); //th.css({overflow:'hidden',height:h+'px'});

    var flag = 1;
    th.find('[ic-dropdown-toggle]').click(function (e) {
      if (flag) {
        //con.slideDown();
        con.css({
          height: 'auto'
        });
        flag = 0;
      } else {
        con.css({
          height: ch + 'px'
        });
        flag = 1;
      }
    });
  }
});

/***/ }),

/***/ "./directives/enterPress.js":
/*!**********************************!*\
  !*** ./directives/enterPress.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Created by julien.zhang on 2015/3/23.
 * 回车键按下监听指令
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'ic-enter-press',
  selfExec: true,
  once: true,
  fn: function fn($elm, attrs) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).on('focus', '[ic-enter-press]', function (e) {
      var $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      var call = $elm.attr('ic-enter-press');
      call = $elm.icParseProperty(call);
      call = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.proxy(call, this);

      var fn = function fn(e) {
        e.which === 13 && call(e);
      };

      $elm.on('keypress', fn);
      $elm.on('blur', function (e) {
        $elm.off('keypress', fn);
      });
    });
  }
});

/***/ }),

/***/ "./directives/form.js":
/*!****************************!*\
  !*** ./directives/form.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_export__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/export */ "./core/export.js");
/**
 * Created by julien.zhang on 2014/10/29.
 */



/* harmony default export */ __webpack_exports__["default"] = (function ($elm, attrs) {
  /**
   * 要验证的字段 ic-form-field
   * 验证规则  ic-field-rule
   * 验证失败提示 ic-field-err-tip
   * 验证成功提示 ic-field-ok-tip
   * ic-submit-disabled
   */
  var debug = _core_export__WEBPACK_IMPORTED_MODULE_2__["default"].get('debug');
  var eventAction = _core_export__WEBPACK_IMPORTED_MODULE_2__["default"].get('event.action');
  var customRule = _core_export__WEBPACK_IMPORTED_MODULE_2__["default"].get('ic-form.rule');
  var presetRule = {
    id: /[\w_]{4,18}/,
    required: /.+/img,
    phone: /^\d[\d-]{5,16}$/,
    email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
    password: /(?:[\w]|[!@#$%^&*]){6,16}/,
    desc: /.{4,32}/,
    plate: /^[\u4e00-\u9fa5]{1}[A-Z]{1}[\s-]?[A-Z_0-9]{5}$/i
  };

  if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(customRule)) {
    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.extend(presetRule, customRule);
  }

  var keys = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(presetRule);

  keys.sort(function (a, b) {
    return b.length - a.length;
  });
  debug && console.info('当前关键字验证规则列表：', keys);
  /**
   * 对ic-field-rule属性定义的字段校验规则编译处理
   * 校验规则分为3类：
   * 1：预设的规则表示符，映射到相应的正则表达式或函数，如: 'phone';
   * 2：用户自定义的正则表达式, 如: /\d3/;
   * 3：用户自定义函数 如: equal(val); 传入校验字段校验时的字段值
   *
   * @param rule
   * @param $elm
   * @returns {}
   */

  function compileRule(rule, $elm) {
    var v; //替换预设的规则标识符

    for (var i in keys) {
      i = keys[i];
      v = presetRule[i];
      rule = rule.replace(new RegExp(i + '(?![^|&])', 'g'), function (m) {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isFunction(v) ? m + '()' : lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isRegExp(v) ? v : m;
      });
    }

    rule = rule.replace(/\/[igm]{0,3}(?=(?:\|\||\&\&|$))/g, function (m) {
      return m + '.test("?")';
    });
    debug && console.info('解析规则：', rule);
    return rule;
  }
  /**
   * 校验函数
   * @param val {String|Number} 要验证的值
   * @param rules {Function|RegExp}  正则或校验函数
   * @param tips {String} 验证提示
   * @param $field {jQuery} 相关的dom元素
   * @returns {String | Boolean} 返回错误提示或者布尔值, false表示验证无错误, true表示验证有错误
   * @private
   */


  function _verify(val, rules, tips, $field) {
    if (rules === undefined) return false;
    tips = tips || 'error';
    var fns = {};
    rules = rules.replace(/(?:^|\|\||\&\&)(\w+?)\(\)(?=(?:\|\||\&\&|$))/g, function (m, $1) {
      var fn = presetRule[$1] || $field.icParseProperty($1);
      fns[$1] = fn;
      return m.replace($1, 'fns.' + $1).replace('()', '("?")');
    });

    var _script = rules.replace(/\.\w+\("\?"\)/g, function (m) {
      return m.replace('?', val);
    });

    debug && console.info(_script);
    var result;

    try {
      result = eval(_script); //如果result是一个字符串，表示一个错误提示

      if (typeof result === 'string') {
        return result;
      } //如果为result===true,表示验证通过


      if (result === true) {
        return false;
      } else if (result) {
        return result;
      } else {
        return tips;
      }
    } catch (e) {
      console.error(e, _script);
    }
  }

  jquery__WEBPACK_IMPORTED_MODULE_1___default.a.fn.icForm = jquery__WEBPACK_IMPORTED_MODULE_1___default.a.fn.icForm || function (call, msg) {
    this.find('[ic-form-submit]').not(this.find('[ic-form] [ic-form-submit]')).icFormVerify();
    return this.data('ic-form-fields');
  };

  jquery__WEBPACK_IMPORTED_MODULE_1___default.a.fn.icFormVerify = jquery__WEBPACK_IMPORTED_MODULE_1___default.a.fn.icFormVerify || function () {
    // 提交按钮调用
    if (this[0].hasAttribute('ic-form-submit')) {
      this.trigger('ic-form.verify');
      return this.attr('ic-verification') ? fields : false;
    } // 表单字段调用


    if (this[0].hasAttribute('ic-form-field')) {
      this.trigger('change');
      return this.attr('ic-verification');
    }

    return false;
  };

  function defaultCall() {}

  var fields = {}; // 执行指令

  var namespace = $elm.attr('ic-form');
  var $fields = $elm.find('[ic-form-field]').not($elm.find('[ic-form] [ic-form-field]'));
  var $submit = $elm.find('[ic-form-submit]').not($elm.find('[ic-form] [ic-form-submit]'));
  var $loading = $elm.find('[ic-role-loading]');
  var err_cla = _core_export__WEBPACK_IMPORTED_MODULE_2__["default"].get('cla.error') || 'error'; // 对每个字段dom绑定事件监听

  $fields.each(function (i) {
    var $th = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this);
    var name = $th.attr('ic-form-field');
    var submitName = $th.attr('name') || name;
    var rules = $th.attr('ic-field-rule');
    if (!rules) return; //if ($th.attr('type') === 'hidden') return;

    var errTips = $th.attr('ic-field-err-tip');
    var $fieldBox = $elm.find('[ic-form-field-container="?"]'.replace('?', name));
    var $errTip = $elm.find('[ic-form-field-err-tip="?"]'.replace('?', name));
    var foucsTip = $errTip.text();
    rules = compileRule(rules, $elm);
    $th.on('change', function (e) {
      var val = $th.val();
      var tip;
      console.log(this, val, errTips);

      if (tip = _verify(val, rules, errTips, $th)) {
        //验证失败
        $th.addClass(err_cla);
        $fieldBox.addClass(err_cla);
        $errTip.addClass(err_cla).text(tip);
        $th.removeAttr('ic-verification');
        fields[name] = false;
        $th.trigger('ic-form-field.error', tip);
      } else {
        //验证通过
        $th.removeClass(err_cla);
        $fieldBox.removeClass(err_cla);
        $errTip.removeClass(err_cla);
        $th.attr('ic-verification', 1);

        if ($th[0].hasAttribute('ic-field-placeholder')) {} else {
          fields[submitName] = val;
        }

        $th.trigger('ic-form-field.ok', val);
      }
    });
    $th.on('focus', function () {
      $fieldBox.removeClass(err_cla);
      $errTip.removeClass(err_cla).text(foucsTip);
    });
  }); // 提交触发后先进行字段校验

  $submit.on('ic-form.verify', function (e, field) {
    fields = {}; // 没有验证规则的字段

    $fields.filter(':not("[ic-field-rule]")').each(function (i) {
      var $th = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this);
      var tag = this.tagName;
      var type = $th.attr('type');
      var name = $th.attr('ic-form-field');
      var submitName = $th.attr('name') || name;
      var val;

      if (/^input|select|textarea$/img.test(tag)) {
        if (/^checkbox|radio$/i.test(type)) {
          $th = jquery__WEBPACK_IMPORTED_MODULE_1___default()('[name=*]:checked'.replace('*', submitName));
          val = $th.val() || '';
        } else {
          val = /^number$/i.test(type) ? $th.val() * 1 : $th.val();
        }
      } else {
        //val = $th.icParseProperty2('ic-val', true);
        val = $th.data('ic-val') || $th.attr('ic-val');
      }

      fields[submitName] = val;
      /*var prev = fields[submitName];true
      if (prev) {
          prev =  ? prev : [prev];
          prev.push(val);
          fields[submitName] = prev;
      } else {
          fields[submitName] = val;
      }*/
    }); // 占位字段

    $fields.filter('[ic-field-placeholder][ic-field-rule]').each(function (i) {
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).change();
    }); //显示并且有验证规则

    $fields.filter(':visible').filter('[ic-field-rule]').each(function (i) {
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).change();
    });
    $elm.data('ic-form-fields', fields);
    console.info(fields);

    for (var i in fields) {
      if (fields[i] === false) {
        $submit.removeAttr('ic-verification');
        return false;
      }
    }

    return $submit.attr('ic-verification', true);
  }); //

  $submit.on('ic-form.submit', function (e) {
    toSubmit(e);
  }); // 提交触发

  $submit.on(eventAction, toSubmit); // 回车提交触发

  $fields.not('textarea').icEnterPress(function () {
    $submit.trigger(eventAction);
  });

  function toSubmit(e) {
    if ($submit[0].hasAttribute('ic-submit-disabled')) return;
    if (!$submit.icFormVerify()) return $elm.trigger('ic-form.error', fields); //函数调用

    if (submitType === 1) {
      return action.apply($submit[0], [fields]);
    }

    var data = before.apply($submit[0], [fields]);
    if (data === false) return;

    if ($loading.length) {
      $submit.hide();
      $loading.show();
    } else {
      $submit.icSetLoading();
    }

    $submit.attr('ic-submit-disabled', true); //同域提交

    if (submitType === 3) {
      return jquery__WEBPACK_IMPORTED_MODULE_1___default.a.ajax({
        url: domain + action,
        type: method,
        dataType: dataType,
        data: data || fields
      }).done(function (data) {
        done(data);
      }).fail(failed).always(function () {
        $submit.show();
        $loading.hide();
        $submit.clearLoading();
        always();
        $submit.removeAttr('ic-submit-disabled');
      });
    }
  } //提交


  var domain = _core_export__WEBPACK_IMPORTED_MODULE_2__["default"].get('ajax.domain') || '';
  var method = $submit.attr('ic-submit-method') || 'post';
  var action = $submit.attr('ic-submit-action');
  var before = $submit.icParseProperty2('ic-submit-before') || defaultCall;
  var failed = $submit.icParseProperty2('ic-submit-on-fail') || defaultCall;
  var done = $submit.icParseProperty2('ic-submit-on-done') || defaultCall;
  var always = $submit.icParseProperty2('ic-submit-on-always') || defaultCall;
  var dataType = $submit.attr('ic-submit-data-type') || 'json';

  var submitType = function () {
    //函数调用
    if (/[\w_.]+\(\)\;?$/i.test(action)) {
      action = $submit.icParseProperty(action.replace(/[();]/g, ''));
      return 1;
    } //普通提交


    return 3;
  }();
});

/***/ }),

/***/ "./directives/pagination.js":
/*!**********************************!*\
  !*** ./directives/pagination.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/export */ "./core/export.js");
/**
 * Created by julien.zhang on 2014/10/20.
 */


/* harmony default export */ __webpack_exports__["default"] = (function ($elm, attrs) {
  var th = $elm;
  var namespace = th.attr('ic-pagination');
  var rows = $elm.attr('ic-pagination-rows') * 1 || 10;
  var onChangeCall = th.attr('ic-pagination-on-change');
  var total = $elm.attr('ic-pagination-total') * 1;
  var step = $elm.attr('ic-pagination-step') * 1 || 10;
  var current = $elm.attr('ic-pagination-current') || 1;
  var ellipsis = $elm.find('[ic-role-pagination-ellipsis]')[0].outerHTML;
  var placeholder = /\{\{\}\}/g;
  var $tpl = $elm.prev('[ic-tpl=?]'.replace('?', namespace));
  var tplf;
  var pool;
  var onchange;
  var source = $elm.attr('ic-source-ajax');

  if (source) {
    /*$.ajax({
     url:source
     }).done(function(data){
     var html = brick._tplfs[namespace]({model:data});
     $tpl.html(html);
     });*/
  } else {
    source = $elm.attr('ic-source');

    if (source) {
      pool = $elm.icParseProperty(source);
      total = Math.ceil(pool.length / rows);

      onchange = function onchange(page) {
        --page;
        var start = page * rows - 1 < 0 ? 0 : page * rows;
        var end = start + rows;

        var _list = pool.slice(start, end);

        var list = [];
        var item;

        for (; item = _list.shift(); start++) {
          list[start] = item;
        }

        var html = _core_export__WEBPACK_IMPORTED_MODULE_1__["default"].getTpl(namespace)({
          model: list
        });
        $tpl.html(html).show();
      };
    } else {
      pool = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[ic-role-pagination-page=?]'.replace('?', namespace)).children();

      if (pool.length) {
        total = Math.ceil(pool.length / rows);

        onchange = function onchange(page) {
          --page;
          var start = page * rows - 1 < 0 ? 0 : page * rows;
          var end = start + rows;
          pool.hide();
          pool.slice(start, end).show();
        };
      }
    }
  }

  var prev = th.find('[ic-role-pagination-prev]').on('click', function (e) {
    if (current < 2) return;
    --current;
    createNums();
  });
  var next = th.find('[ic-role-pagination-next]').on('click', function (e) {
    if (current >= total) return;
    ++current;
    createNums();
  });
  var num = th.find('[ic-role-pagination-num]');
  var html = num[0].outerHTML;

  function createNums() {
    var j = Math.floor(step / 2);
    var k;
    var r = [];
    j = current - j;
    var i = j = j < 1 ? 1 : j;
    k = j + step - 1;
    k = k >= total ? total : k;
    i = j = k + step >= total ? k - step < 1 ? 1 : k - step : i;

    for (; j <= k; j++) {
      r.push(html.replace(placeholder, j));
    }

    if (i > 1) {
      r.unshift(ellipsis);
      r.unshift(html.replace(placeholder, 1));
    }

    if (total - k > 2) {
      r.push(ellipsis);
      r.push(html.replace(placeholder, total));
    }

    current == 1 ? prev.addClass('disabled') : prev.removeClass('disabled');
    current == total ? next.addClass('disabled') : next.removeClass('disabled');
    prev.siblings().not(next).remove();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(r.join('')).insertAfter(prev).filter('[ic-role-pagination-num=' + current + ']').addClass('active');
    onchange && onchange(current);
    $elm.trigger('ic-pagination.change', current);
  }

  setTimeout(createNums, 30);
  th.on('click', '[ic-role-pagination-num]', function (e) {
    var num = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('ic-role-pagination-num') * 1;
    if (current == num) return;
    current = num * 1;
    createNums();
  });
});

/***/ }),

/***/ "./directives/popup.js":
/*!*****************************!*\
  !*** ./directives/popup.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Created by j on 18/8/11.
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'ic-popup',
  selfExec: true,
  once: true,
  fn: function fn() {
    var on_show_cla = 'on-ic-popup-show';
    var $body = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body);

    function on_show($popup) {
      $popup.on('scroll', on_scroll);
      $popup.show();
      $popup.scrollTop(0);
      $body.addClass(on_show_cla);
    }

    function on_hide($popup) {
      $popup.off('scroll', on_scroll);
      $popup.hide();
      $popup[0].scrollTop = 0;
      $body.removeClass(on_show_cla);
    }

    function on_scroll(e) {
      e.stopPropagation();
    } // jquery接口


    jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icPopup = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icPopup || function (opt) {
      opt ? on_show(this) : on_hide(this);
    };

    $body.on('click', '[ic-popup-target]', function (e) {
      var name = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('ic-popup-target');
      var $popup = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[ic-popup=?]'.replace('?', name));
      on_show($popup); //$body.scrollTop() + $body.height()
    }).on('click', '[ic-popup-close]', function (e) {
      var name = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('ic-popup-close');
      var $popup = name ? jquery__WEBPACK_IMPORTED_MODULE_0___default()('[ic-popup=?]'.replace('?', name)) : jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).closest('[ic-popup]');
      on_hide($popup);
    });
  }
});

/***/ }),

/***/ "./directives/scroll.js":
/*!******************************!*\
  !*** ./directives/scroll.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Created by julien on 2015/11/30.
 */

/* harmony default export */ __webpack_exports__["default"] = (function ($elm) {
  var $th = $elm || jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
  var onScroll = $elm.icParseProperty2('ic-scroll');
  var prevScrollTop = 0;
  var scrollDirection = 'down';
  onScroll && $th.on('ic-scroll', onScroll);
  $th.on('scroll', _.throttle(function (e) {
    var scrollTop = $th.scrollTop();
    var end;
    scrollDirection = scrollTop - prevScrollTop > 1 ? 'down' : 'up';
    prevScrollTop = scrollTop;

    if (scrollDirection === 'down' && $th[0].scrollHeight <= $th[0].clientHeight + scrollTop) {
      console.log('trigger ic-scroll.end');
      $th.trigger('ic-scroll-end');
      end = true;
    }

    $th.trigger('ic-scroll', {
      direction: scrollDirection,
      end: end
    });
  }, 300));
});

/***/ }),

/***/ "./directives/select.js":
/*!******************************!*\
  !*** ./directives/select.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/export */ "./core/export.js");
/**
 * Created by j on 18/7/18.
 * ic-select  实现checkbox or radio 类似的功能
 * ic-select-cla  选中项的添加的样式类,默认 selected
 * [ic-select][ic-select-item]  定义子项选择符 jQuery选择符
 * [ic-select-item] 定义子项
 * [ic-select-type] 定义select类型,多选or单选 checkbox : radio 默认 radio
 */


/* harmony default export */ __webpack_exports__["default"] = (function ($elm) {
  var on_change = $elm.icPp2('ic-select-on-change');
  var cla = $elm.attr('ic-select-cla') || _core_export__WEBPACK_IMPORTED_MODULE_1__["default"].get('ic-select-cla') || 'selected';
  var name = $elm.attr('ic-select');
  var s_item = $elm.attr('ic-select-item') || '[ic-select-item]';
  var type = $elm.attr('ic-select-type') || 'radio';
  var $items = $elm.find(s_item);

  if (!$items.length) {
    $items = $elm.find('>*').each(function () {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('ic-select-item', +new Date());
    });
  }

  var $selected = $items.filter('[selected]');
  var callback = type === 'checkbox' ? function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).toggleClass(cla);
    var values = [];
    $items.filter('.' + cla).each(function () {
      values.push(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('ic-val'));
    });
    $elm.attr('ic-val', JSON.stringify(values));
    $elm.data('ic-val', values);
    var msg = {
      name: name,
      value: values
    };
    $elm.trigger('ic-select.change', msg);
    on_change && on_change.apply($elm, [msg]);
  } : function () {
    $items.removeClass(cla);
    var $th = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass(cla);
    var val = $th.attr('ic-val');
    $elm.attr('ic-val', val);
    var msg = {
      name: name,
      value: val
    };
    $elm.trigger('ic-select.change', msg);
    on_change && on_change.apply($elm, [msg]);
  };
  $elm.on('click', s_item, callback);
  $selected.click();
});

/***/ }),

/***/ "./directives/slider.js":
/*!******************************!*\
  !*** ./directives/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Created by julien.zhang on 2014/10/11.
 */

/* harmony default export */ __webpack_exports__["default"] = (function ($elm, attr) {
  var th = $elm;
  var direction = th.attr('ic-slider-direction');
  var vw = th.width();
  var vh = th.height();
  th.css({
    position: 'relative',
    overflow: 'hidden'
  });
  var style1 = {
    width: vw + 'px',
    height: vh + 'px'
  };

  if (!direction) {
    style1.float = 'left';
  }

  var items = th.find('[ic-role-slider-item]').css(style1);
  var len = items.length;
  var style2 = direction ? {
    height: len * vh + 'px'
  } : {
    width: len * vw + 'px'
  };
  style2.position = 'absolute';
  var view = th.find('[ic-role-slider-view]').css(style2);
  var current = 1;
  var currentPagination = th.find('[ic-role-slider-pagination]').first().addClass('active');

  var broadcast = function broadcast() {
    th.trigger('ic-slider.change', items.eq(current - 1));
  };

  broadcast();

  var onPagination = function onPagination() {
    broadcast();
  };

  if (currentPagination) {
    onPagination = function onPagination() {
      currentPagination && currentPagination.removeClass('active');
      currentPagination = th.find('[ic-role-slider-pagination=' + current + ']').addClass('active');
      broadcast();
    };
  }

  var prev = direction ? function (e) {
    if (current <= 1) {
      current = len;
      view.animate({
        top: (-len + 1) * vh
      }, 300, onPagination);
    } else {
      view.animate({
        top: (2 - current) * vh
      }, 300, function () {
        current -= 1;
        onPagination();
      });
    }

    return false;
  } : function (e) {
    if (current <= 1) {
      current = len;
      view.animate({
        left: (-len + 1) * vw
      }, 500, onPagination);
    } else {
      view.animate({
        left: (2 - current) * vw
      }, 500, function () {
        current -= 1;
        onPagination();
      });
    }

    return false;
  };
  var next = direction ? function (e) {
    if (current >= len) {
      current = 1;
      view.animate({
        top: 0
      }, 300, onPagination);
    } else {
      view.animate({
        top: -current * vh
      }, 300, function () {
        current += 1;
        onPagination();
      });
    }

    return false;
  } : function (e) {
    if (current >= len) {
      current = 1;
      view.animate({
        left: 0
      }, 500, onPagination);
    } else {
      view.animate({
        left: -current * vw
      }, 500, function () {
        current += 1;
        onPagination();
      });
    }

    return false;
  };
  var interval = th.attr('ic-slider-interval');
  var timer;

  if (interval) {
    timer = setInterval(next, interval);
    th.hover(function (e) {
      clearInterval(timer);
    }, function (e) {
      timer = setInterval(next, interval);
    });
  }
  /* event */


  th.delegate('[ic-role-slider-prev]', 'click', prev);
  th.delegate('[ic-role-slider-next]', 'click', next);
  th.delegate('[ic-role-slider-pagination]', 'click', function (e) {
    currentPagination && currentPagination.removeClass('active');
    var th = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('active');
    var pagination = th.attr('ic-role-slider-pagination');
    current = pagination - 1;
    next();
  });
});

/***/ }),

/***/ "./directives/tabs.js":
/*!****************************!*\
  !*** ./directives/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/export */ "./core/export.js");
/**
 * Created by julien.zhang on 2014/10/11.
 */


/* harmony default export */ __webpack_exports__["default"] = (function ($elm, attrs) {
  var eventAction = _core_export__WEBPACK_IMPORTED_MODULE_1__["default"].get('event.action');
  var th = $elm;
  var name = th.attr('ic-tabs');
  var disabled = th.attr('ic-tab-disabled');
  var tabSelect = th.attr('ic-tab-select');
  var conSelect = th.attr('ic-tabc-select');
  var activeTab = th.attr('ic-tab-active');
  var cla = th.attr('ic-tab-cla') || 'active';
  var activeCon;
  var $tabSelect;

  if (tabSelect) {
    $tabSelect = th.find(tabSelect).each(function (i) {
      var th = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      th.attr('ic-tab', i);
    });
  } else {
    $tabSelect = $elm.find('[ic-tab]');
  }

  var tabc = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[ic-tabc=' + name + ']');

  if (tabc) {
    tabc.find(conSelect || '[ic-tab-con]').each(function (i) {
      i = $tabSelect.eq(i).attr('ic-tab');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('ic-tab-con', i);
    });
  }

  th.on('click', '[ic-tab]:not([ic-tab-disabled=1])', tabc.length ? call_1 : call_2);

  function call_1(e) {
    call_2(e, this);
    var con = activeTab.attr('ic-tab');
    activeCon && activeCon.hide();
    activeCon = tabc.find('[ic-tab-con=' + con + ']').show();
  }

  function call_2(e, that) {
    activeTab && activeTab.removeClass(cla);
    activeTab = jquery__WEBPACK_IMPORTED_MODULE_0___default()(that || this).addClass(cla);
    th.trigger('ic-tabs.change', {
      activeTab: activeTab,
      target: activeTab[0],
      val: activeTab.attr('ic-tab-val'),
      index: activeTab.index()
    });
  } //fire


  if (activeTab) {
    activeTab = th.find('[ic-tab=?]'.replace('?', activeTab));
  } else {
    activeTab = th.find('[ic-tab]:not([ic-tab-disabled=1])').first();
  }

  activeTab.trigger('click'); //let activeCon = activeTab.addClass('active').attr('ic-tab');
  //activeCon = tabc.length && tabc.find('[ic-tab-con]').hide().filter('[ic-tab-con=' + activeCon + ']').show();
});

/***/ }),

/***/ "./directives/tabs2.js":
/*!*****************************!*\
  !*** ./directives/tabs2.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/export */ "./core/export.js");
/**
 * Created by Julien on 2016/1/12.
 */


/* harmony default export */ __webpack_exports__["default"] = (function ($elm, attrs) {
  var th = $elm;
  var name = th.attr('ic-tabs2');
  var disabled = th.attr('ic-tab-disabled');
  var tabSelect = th.attr('ic-tab-$');
  var conSelect = th.attr('ic-tabc-$');
  var activeTab = th.attr('ic-tab-active');
  var $tabSelect;
  var cla = 'active';
  var s_tab = '[ic-tab]';

  if (tabSelect) {
    th.find(tabSelect).each(function (i) {
      var th = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
      th.attr('ic-tab', i);
    });
  }

  $elm.on('click', s_tab, function (e) {
    if (this.hasAttribute('ic-tab-disabled')) return;
    var $th = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    if ($th.hasClass(cla)) return;
    var $siblings = $th.siblings().removeClass(cla);
    $th.addClass(cla);
    $elm.trigger('ic-tabs.change', {
      target: this,
      val: $th.attr('ic-tab-val'),
      index: $th.index()
    });
  });
});

/***/ }),

/***/ "./directives/type-ahead.js":
/*!**********************************!*\
  !*** ./directives/type-ahead.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_export__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/export */ "./core/export.js");
/**
 *  定义输入提示指令
 * Created by julien.zhang on 2014/11/13.
 */


/* harmony default export */ __webpack_exports__["default"] = (function ($elm, attrs) {
  var $doc = jquery__WEBPACK_IMPORTED_MODULE_0___default()('body');
  var namespace = $elm.attr('ic-type-ahead');
  var onTypeComplete = $elm.attr('ic-on-type-complete');
  onTypeComplete = $elm.icParseProperty(onTypeComplete);
  var source = $elm.attr('ic-source-ajax');
  var offset = $elm.offset();
  var left = offset.left;
  var top = offset.top;
  var w = $elm.outerWidth();
  var h = $elm.outerHeight();
  var $selectList = jquery__WEBPACK_IMPORTED_MODULE_0___default()('[ic-role-list=?]'.replace('?', namespace));
  var tplf = _core_export__WEBPACK_IMPORTED_MODULE_1__["default"].getTpl($selectList.attr('ic-tpl-name'));
  $selectList.appendTo($doc).css({
    top: top + h,
    left: left,
    'min-width': w
  });

  var _pool;

  var pool;
  var ajax;
  var queryStr;
  var query;
  var keydownActive = 0;
  var keydownList;

  var done = function done(data) {
    if (!data) return;
    if (!data.length) return $selectList.hide();
    pool = data;
    var html = tplf({
      model: data
    });
    $selectList.show().html(html);
  };

  if (source) {
    query = function query(queryStr) {
      ajax = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.ajax({
        dataType: 'json',
        type: 'post',
        url: source,
        data: {
          query: queryStr
        }
      }).done(done);
    };
  } else {
    source = $elm.attr('ic-source');
    _pool = $elm.icParseProperty(source);

    query = function query(queryStr) {
      var reg = new RegExp(queryStr, 'img');

      var result = _.filter(_pool, function (item, i, list) {
        if (_.isObject(item)) {
          var result = _.filter(item, function (item) {
            return reg.test(item);
          });

          return result.length;
        } else {
          return reg.test(item);
        }
      });

      done(result);
    };
  } ////////////////////////////////////
  // event
  ////////////////////////////////////


  $elm.on('focus', function (e) {
    var offset = $elm.offset();
    var left = offset.left;
    var top = offset.top;
    $selectList.css({
      top: top + h + 1,
      left: left
    });
  }).on('keyup', function (e) {
    var val = $elm.val();
    if (!val) return $selectList.hide();
    if (val === queryStr) return;
    queryStr = val; //取消上个请求

    ajax && ajax.abort(); //新请求

    query(queryStr);
  }).on('keydown', function (e) {
    var keyCode = e.keyCode;

    if (!(keyCode === 38 || keyCode === 40 || keyCode === 13)) {
      keydownActive = 0;
      return;
    }

    var list = $selectList.find('[ic-role-type-item]');
    if (!list.length) return;
    var max = list.length - 1;

    if (e.keyCode === 38) {
      keydownActive = --keydownActive < 0 ? max : keydownActive;
      list.eq(keydownActive).addClass('active').siblings().removeClass('active');
      return;
    }

    if (e.keyCode === 40) {
      keydownActive = ++keydownActive > max ? 0 : keydownActive;
      list.eq(keydownActive).addClass('active').siblings().removeClass('active');
      return;
    }

    if (e.keyCode === 13) {
      list.eq(keydownActive).trigger('mousedown');
      $elm.blur();
    }
  }).on('blur', function (e) {
    $selectList.fadeOut(function () {
      $selectList.hide();
    });
  });
  $selectList.on('mousedown', '[ic-role-type-item]', function (e) {
    var index = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).index();
    var item = pool[index];
    var val = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('ic-role-type-item');
    $elm.val(val);
    $elm.trigger('type.complete', item);
    onTypeComplete && onTypeComplete.apply($elm[0], [e, item]);
  });
});

/***/ }),

/***/ "./directives/viewer.js":
/*!******************************!*\
  !*** ./directives/viewer.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_export__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/export */ "./core/export.js");
/* harmony import */ var _core_directives_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/directives.js */ "./core/directives.js");
/* harmony import */ var _tpl_viewer_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tpl/viewer.html */ "./tpl/viewer.html");
/* harmony import */ var _tpl_viewer_html__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_tpl_viewer_html__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Created by j on 18/2/16.
 */





var icViewer = {
  _show: function _show(src, index) {
    icViewer.$img.attr('src', src);
    icViewer.$sn.text(index);
    icViewer.on_show(index, src, icViewer.$info);
  },
  show: function show(arg) {
    var urls = this.urls = arg.urls;
    var src = arg.src;
    var index = this.index = src ? urls.indexOf(src) : 0;
    src = src || urls[index];

    icViewer._show(src, index);

    icViewer.$elm.fadeIn();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).on('mousewheel', icViewer.on_mousewheel);
    this.timer = null;
    this.interval = arg.interval || 5;
    arg.autoplay && icViewer.autoplay();
  },
  init: function init(options) {
    this.on_show = options.on_show || function () {};

    if (this.$elm) return icViewer;
    var $elm = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#ic-viewer-box-wrap');
    $elm = this.$elm = options.$imgBox || $elm.length ? $elm : jquery__WEBPACK_IMPORTED_MODULE_0___default()(_tpl_viewer_html__WEBPACK_IMPORTED_MODULE_4___default.a).appendTo(jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body));
    this.$img = this.$elm.find('#ic-viewer-box > img');
    this.$info = this.$elm.find('#ic-viewer-info');
    this.$autoplay = this.$elm.find('#ic-viewer-autoplay');
    this.$sn = this.$elm.find('#ic-viewer-sn');
    $elm.on('click', '#ic-viewer-close', function (e) {
      $elm.fadeOut();
      icViewer.autoplay(false);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).off('mousewheel', icViewer.on_mousewheel);
    });
    $elm.on('click', '#ic-viewer-autoplay', function (e) {
      icViewer.autoplay(!icViewer.timer);
    });
    return icViewer;
  },
  on_mousewheel: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.debounce(function (e) {
    //正负值表示滚动方向
    e = e || {
      originalEvent: {
        deltaY: icViewer.order
      }
    };
    e.originalEvent.deltaY < 0 ? --icViewer.index : ++icViewer.index;
    var max = icViewer.urls.length - 1;

    if (icViewer.index < 0) {
      icViewer.index = max;
    }

    if (icViewer.index > max) {
      icViewer.index = 0;
    }

    icViewer._show(icViewer.urls[icViewer.index], icViewer.index);

    return false;
  }, 100),
  autoplay: function autoplay(is_play) {
    if (is_play || is_play === undefined) {
      icViewer.timer = setInterval(icViewer.on_mousewheel, icViewer.interval * 1000);
      icViewer.$autoplay.text('停止播放');
    } else {
      clearInterval(icViewer.timer);
      icViewer.timer = null;
      icViewer.$autoplay.text('自动播放');
    }
  }
};

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.icViewer = function (options) {
  return this.each(function () {
    var $that = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
    var $imgBox = options.$imgBox;
    var item = options.item || 'img';
    var $imgs = options.$imgs || $that.find(item);
    var url = options.url || 'src';
    var urls = options.urls || $imgs.map(function (i) {
      return jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('ic-viewer-item', i).attr(url);
    }).get();
    $that.on('click', item, function (e) {
      icViewer.init(options).show({
        urls: urls,
        src: jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr(url)
      });
      return false;
    });
  });
};

_core_directives_js__WEBPACK_IMPORTED_MODULE_3__["default"].reg('ic-viewer', function ($elm) {
  var s_box = 'ic-viewer-box'; // img box 选择符

  var s_item = 'ic-viewer-item'; // img item 选择符

  var s_urls = 'ic-viewer-sources'; // scope 数据源 图像url数据

  var s_interval = 'ic-viewer-interval'; // 间隔自动播放

  var s_on_show = 'ic-viewer-on-show'; // 回调函数

  var $imgBox = jquery__WEBPACK_IMPORTED_MODULE_0___default()($elm.attr(s_box));
  var item = $elm.attr(s_item) || _core_export__WEBPACK_IMPORTED_MODULE_2__["default"].get(s_item) || 'img';
  $elm.icViewer({
    $imgBox: $imgBox.length ? $imgBox : undefined,
    item: item,
    $imgs: $elm.find(item),
    urls: $elm.icPp2(s_urls),
    on_show: $elm.icPp2(s_on_show),
    interval: $elm.icPp2(s_interval, true),
    url: $elm.attr('ic-viewer-url') || _core_export__WEBPACK_IMPORTED_MODULE_2__["default"].get('ic-viewer-url') || 'src'
  });
});

/***/ }),

/***/ "./services/recordManager.js":
/*!***********************************!*\
  !*** ./services/recordManager.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_eventManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/eventManager */ "./core/eventManager.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Created by Julien on 2014/8/13.
 * 记录管理器
 * var recordManager = brick.services.get('recordManager');
 * var serv = recordManager(
 *                              {
 *                                  scope:scope,
 *                                  broadcast:true, //是否广播事件
 *                                  eventPrefix:'holdModel', //广播事件前缀
 *                                  key:'hold.id',  //记录id
 *                                  beforeSave:function(record,index){}
 *                              }
 *                              );
 */



function RecordManager(conf) {
  if (conf && conf.constructor === Object) {
    for (var i in conf) {
      this[i] = conf[i];
    }
  }

  this._pool = {};
}

var proto = {
  /**
   * 默认每条记录的主键为id；
   */
  key: 'id',

  /**
   *
   * @param data {Array | Object}
   * @return {this}
   */
  init: function init(data) {
    if (_typeof(data) !== 'object') throw 'must be Array or Object on init';
    var pool = this._pool;

    for (var i in data) {
      var record = data[i];
      this.beforeSave(record, i);
    }

    this._pool = data;
    this.fire('init');
    return this;
  },

  /**
   * 获取查询结果
   * @param value  {*}            要查询的key值
   * @param query  {String}       要查询的key
   * @returns      {Array}        根据查询结果返回数组
   * @example
   *
   * new recordManager().init([{id:1,y:2},{id:2,x:3}]).get();          // return [{id:1,y:2},{id:2,x:3}];
   * new recordManager().init([{id:1,y:2}]).get(1);                    // return [{id:1,y:2}];
   * new recordManager({k:'x'}).init([{x:1,y:2}]).get(1);              // return [{x:1,y:2}];
   * new recordManager({k:'x'}).init([{x:1,y:{z:3}}]).get(3,'y.z');    // return [{x:1,y:{z:3}}];
   * new recordManager().init([{id:1,y:2}]).get(2);                    // return [];
   */
  get: function get(value, query) {
    var pool = this._pool;
    var r = [];

    if (value === void 0) {
      for (var i in pool) {
        r.push(jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, {}, pool[i]));
      }

      return r;
    }

    if (_typeof(value) === 'object') {
      query = this.key;
      value = value[query];
    }

    for (var j in pool) {
      var record = pool[j];

      if (value === this._queryKeyValue(record, query)) {
        r.push(jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, {}, record));
      }
    }

    return r;
  },

  /**
   * 对查询结果记录进行修改
   * @param data      {Object}            要更新的数据
   * @param query     {String}            对key进行限定，只有对应的key变化，才修改
   * @returns         {Array | Boolean}    返回修改过的记录数组，如果没有修改任何记录，返回false
   * @example
   *
   * new recoredManager().init([{x:1,y:2},{x:1,y:5}]).find(1,'x').set({y:3});     // result [{x:1,y:3},{x:1,y:3}]
   * new recoredManager().init([{x:1,y:2}]).find(2,'x').set({y:3});               // result false
   */
  set: function set(data, query) {
    var pool = this._pool;
    var find = this._find || [];
    var result = [];

    for (var i in find) {
      var record = find[i];
      if (query && this._queryKeyValue(record, query) === this._queryKeyValue(data, query)) continue;

      var id = this._queryKeyValue(record);

      var index = this._getIndex(id);

      record = pool[index];
      result.push(jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, record, data));
      this.beforeSave(record);
      this.fire('change', {
        change: record
      });
    }

    this.end();
    return result.length ? result : false;
  },

  /**
   * 添加一条记录
   * @param record
   */
  add: function add(record) {
    var pool = this._pool;

    var id = this._queryKeyValue(record);

    this.beforeSave(record);
    pool.push ? pool.push(record) : pool[id] = record;
    this.fire('add', {
      add: record
    });
    return this;
  },

  /**
   * 调整记录位置,在队列里向前移动
   * @return
   * @example
   *
   * new recoredManager().init([{x:1,y:2},{x:1,y:5}]).find(1,'x').prev();
   */
  prev: function prev() {
    var pool = this._pool;
    var find = this._find || [];

    for (var i in find) {
      var record = find[i];

      var id = this._queryKeyValue(record);

      var index = this._getIndex(id);

      if (pool.splice) {
        pool.splice(index, 1);
        pool.splice(--index, 0, record);
      }

      this.fire('order', {
        target: record
      });
    }

    this.end();
  },

  /**
   * 删除一条记录
   * @return   {Array}   被删除的记录集合
   * @example
   *
   * new recoredManager().init([{x:1,y:2},{x:1,y:5}]).find(1,'x').remove();  // result this._pool == {}; return [{x:1,y:2},{x:1,y:5}];
   */
  remove: function remove() {
    var pool = this._pool;
    var find = this._find || [];

    for (var i in find) {
      var record = find[i];

      var id = this._queryKeyValue(record);

      var index = this._getIndex(id);

      pool.splice && index !== undefined ? pool.splice(index, 1) : delete pool[id];
      this.fire('remove', {
        remove: record
      });
    }

    this.end();
    return find;
  },

  /**
   * 清空所有记录
   * @returns {proto}
   */
  clear: function clear() {
    this._pool = {};
    this.end();
    this.fire('clear');
    return this;
  },

  /**
   * 根据key value查找记录
   * @param value  {*}            要查询的key值
   * @param key  {String}         要查询的key
   * @returns {this}
   * @example
   *
   * new recoredManager().init([{x:1,y:2},{x:1,y:{z:7}}]).find(1,'x')  // result this._find == [{x:1,y:2},{x:1,y:5}];
   * new recoredManager().init([{x:1,y:2},{x:1,y:{z:7}}]).find(7,'y.z')  // result this._find == [{x:1,y:{z:7}}];
   */
  find: function find(value, key) {
    this._find = this.get(value, key);
    return this;
  },

  /**
   * 获取查询结果记录集合
   * @returns {Array | undefined}
   * @example
   *
   * new recoredManager().init([{x:1,y:2},{x:1,y:5}]).find(1,'x')  // return [{x:1,y:2},{x:1,y:5}];
   */
  result: function result() {
    return this._find;
  },
  end: function end() {
    this._find = void 0;
  },
  emit: function emit(e, msg) {
    this.fire(e, msg);
  },
  fire: function fire(e, msg) {
    var scope = this.scope;
    var broadcast = this.broadcast;
    var pool = this.get();
    var prefix = this.eventPrefix ? this.eventPrefix + '.' : '';
    msg = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend({
      pool: pool
    }, msg || {});
    broadcast && _core_eventManager__WEBPACK_IMPORTED_MODULE_1__["default"].emit(prefix + e, msg);
    scope && scope.fire && scope.fire(prefix + e, msg);
  },

  /**
   * 插入或修改一条记录时的回调函数
   * @param record
   * @param index
   */
  beforeSave: function beforeSave(record, index) {},
  _queryKeyValue: function _queryKeyValue(record, k) {
    return this._get(record, k).v;
  },
  _get: function _get(record, k) {
    var chain = (k || this.key).split('.');

    var value = function fx(chain, record) {
      var k = chain.shift();
      var v = record[k];

      if (chain.length) {
        return fx(chain, v);
      }

      return v;
    }(chain, record);

    return {
      r: record,
      v: value
    };
  },
  _getIndex: function _getIndex(record, query) {
    var pool = this._pool;
    var v = _typeof(record) === 'object' ? this._queryKeyValue(record, query) : record;

    for (var i in pool) {
      if (this._queryKeyValue(pool[i], query) === v) return i;
    }
  },
  _look: function _look() {
    console.log(this._pool);
  }
};

for (var i in proto) {
  RecordManager.prototype[i] = proto[i];
}

function recordManager(conf) {
  return new RecordManager(conf);
} //内置服务


/* harmony default export */ __webpack_exports__["default"] = (recordManager);

/***/ }),

/***/ "./tpl/viewer.html":
/*!*************************!*\
  !*** ./tpl/viewer.html ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"ic-viewer-box-wrap\">\n\n    <div id=\"ic-viewer-box\">\n        <img/>\n    </div>\n\n    <div id=\"ic-viewer-info\"></div>\n    <div id=\"ic-viewer-handle\">\n        <div id=\"ic-viewer-autoplay\">自动播放</div>\n        <div id=\"ic-viewer-sn\"></div>\n        <div id=\"ic-viewer-close\">关闭</div>\n    </div>\n\n</div>";

/***/ }),

/***/ "jquery":
/*!*************************************************************************************!*\
  !*** external {"commonjs":"jquery","commonjs2":"jquery","amd":"jquery","root":"$"} ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_jquery__;

/***/ }),

/***/ "lodash":
/*!*************************************************************************************!*\
  !*** external {"commonjs":"lodash","commonjs2":"lodash","amd":"lodash","root":"_"} ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=brick.js.map