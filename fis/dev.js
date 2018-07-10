/**
 * Created by julien.zhang on 2014/10/10.
 * data-swf="<<<u-r-i: ../../js/flowplayer/flowplayer.swf>>>"
 */

var p = require('../package.json');
var version = p.version;

//处理sass
fis.config.set('modules.parser.scss', 'node-sass');
fis.config.set('modules.parser.sass', 'node-sass');
fis.config.set('roadmap.ext.scss', 'css');
fis.config.set('roadmap.ext.sass', 'css');

//fis.config.set('project.include', /^\/(?:(?:page|src|css)\/.*|brick(?:\.mobile)?\.js)$/i);


//静态资源文件域名设置;
//线上部署前domain设为http://julienedies.github.io/brick;
fis.config.merge({
    roadmap : {
        //domain : 'http://julienedies.github.io/brick'
        domain:''
    },
    modules: {
        preprocessor: {
            js: 'defines'
        }
    },
    settings: {
        preprocessor: {
            defines: {
                strings: {
                    '{{timestamp}}': JSON.stringify((new Date).toLocaleString())
                }
            }
        }
    }
});


fis.config.set('roadmap.path', [

    //提供发布用
    {
        reg: /^\/brick(?:\.mobile)?\.js$/i,
        release: '$&',
        isJsLike: true
    },
    // brick directives
    {
        reg: /^\/directives\/.+\.js$/i,
        release: '$&',
        isJsLike: true
    },
    // brick services
    {
        reg: /^\/services\/.+\.js$/i,
        release: '$&',
        isJsLike: true
    },
    // css
    {
        reg: /^\/css\/.+\.s?css$/i,
        release: '$&'
    },

    //brick源码
    {
        reg: /^\/(.+\.js)/i,
        //release: 'src/$1',
        release:false,
        isJsLike: true
    },

    //任何其它文件不发布
    {
        reg: /.*/i,
        release: false
    }
]);


//使用fis release --dest local来使用这个配置
fis.config.merge({
    deploy : {
        ls : {
            to :  '../dist/' + version
        },
        local : {
            to : '../dist/' + version
        },
        cs : {
            to : '../../chrome-extension-contextMenuUtils/js/vendor/brick/' + version
        },
        //hybrid app
        jhandy : {
            to : '../../jHandy/js/brick/' + version
        },
        //car.lulutrip.com
        gushenwei : {
            to : '../../gushenwei.github.io/static/js/vendor/brick/' + version
        }
    }
});