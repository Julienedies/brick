/**
 * Created by julien.zhang on 2015/8/20.
 */

var p = require('../package.json');
var version = p.version;

//处理sass
fis.config.set('modules.parser.scss', 'sass');
fis.config.set('modules.parser.sass', 'sass');
fis.config.set('roadmap.ext.scss', 'css');
fis.config.set('roadmap.ext.sass', 'css');

fis.config.set('roadmap.path', [

    {
        reg: /^\/brick\.mobile\.js$/i,
        release: '$&',
        isJsLike: true
    },
    {
        reg: /^\/src\/plugins\/([-_.\w]+\.js)$/i,
        release: 'brick.$1',
        isJsLike: true
    },

    {
        reg: /^\/css\/(brick\.mobile\.css)$/i,
        release: '/$1'
    },
    //任何其它文件不发布
    {
        reg: /.*/i,
        release: false
    }
]);


fis.config.merge({
    deploy : {
        local : {
            to : './dist/' + version
        },
        //app.lulutrip.com
        app : {
            to : '../app.lulutrip.com-front-end/static/js/brick/' + version
        },
        //hybrid app
        hybrid : {
            to : '../app/src/pages/js/brick/' + version
        },
        //car.lulutrip.com
        car : {
            to : '../carp2p.driver-front-end/static/js/brick'
        }
    }
});