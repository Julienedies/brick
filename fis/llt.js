/**
 * Created by julien.zhang on 2015/8/20.
 */

//处理sass
fis.config.set('modules.parser.scss', 'sass');
fis.config.set('modules.parser.sass', 'sass');
fis.config.set('roadmap.ext.scss', 'css');
fis.config.set('roadmap.ext.sass', 'css');

var version = 0.7;

fis.config.set('roadmap.path', [

    {
        reg: /^\/brick\.mobile\.js$/i,
        release: '$&',
        isJsLike: true
    },
    {
        reg: /^\/src\/plugins\/([\w]+\.js)$/i,
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
            //to : '../a/static/js/brick'
        },
        //car.lulutrip.com
        car : {
            //to : '../carp2p.driver-front-end/static/js/brick'
            to : '../b/static/js/brick/' + version
        }
    }
});