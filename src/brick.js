// style
import './css/brick.scss'

import $ from 'jquery'

import brick from './core/export'
import services from './core/services'
import directives from './core/directives'

import ctrl from './core/directives/ctrl'
import event from './core/directives/event'
import tpl from './core/directives/tpl'

// jQuery扩展 必选
import './$extend/$extension.js'

import recordManager from './services/recordManager.js'

import ajax, { ajaxAuto, ajaxEnter } from './directives/ajax.js'
import tabs from './directives/tabs.js'
import tabs2 from './directives/tabs2.js'
import form from './directives/form.js'
import select from './directives/select.js'
import enterPress from './directives/enterPress.js'
import scroll from './directives/scroll.js'
import dialog, { prompt } from './directives/dialog.js'
import dropdown from './directives/dropdown.js'
import typeAhead from './directives/type-ahead.js'
import slider from './directives/slider.js'
import pagination from './directives/pagination.js'
import drag from './directives/drag.js'
import popup from './directives/popup.js'
import upload from './directives/upload.js'
import autoHeight from './directives/auto-height.js'
import './directives/viewer.js'
import './directives/collection.js'

// core指令 必选
directives.reg('ic-ctrl', ctrl)
directives.reg('ic-event', event)
directives.reg('ic-tpl', tpl)

// 内置services 可选
services.add('recordManager', recordManager)

// 内置directives 可选
directives.reg('ic-ajax', ajax)
directives.reg('ic-ajax-auto', ajaxAuto)
directives.reg('ic-ajax-enter', ajaxEnter)
directives.reg('ic-tabs', tabs)
directives.reg('ic-tabs2', tabs2)
directives.reg('ic-form', form)
directives.reg('ic-select', select)
directives.reg('ic-enter-press', enterPress)
directives.reg('ic-type-ahead', typeAhead)
directives.reg('ic-scroll', scroll)
directives.reg('ic-dialog', dialog)
directives.reg('ic-prompt', prompt)
directives.add('ic-dropdown', dropdown)
directives.reg('ic-slider', slider)
directives.reg('ic-pagination', pagination)
directives.add('ic-drag-view', drag)
directives.reg('ic-popup', popup)
directives.reg('ic-upload', upload)
directives.reg('ic-auto-height', autoHeight)
//import(/* webpackChunkName: "directives/datepicker" */'./directives/datepicker.js')

// bootstrap
$(function () {
    setTimeout(function () {
        if (brick.get('bootstrap.auto') === false) return;
        brick.bootstrap(document.body);
    }, 30);
});


export default brick
