/**
 * Created by julien.zhang on 2014/10/10.
 * data-swf="<<<uri: ../../js/flowplayer/flowplayer.swf>>>"
 */

//开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
fis.config.set('modules.postpackager', 'simple');


//通过pack设置干预自动合并结果，将公用资源合并成一个文件，更加利于页面间的共用
//fis.config.set('pack', {
//    'pkg/lib.before.js': [
//        '/js/vender/modernizr-2.6.2.min.js'
//    ],
//    'pkg/lib.after.js': [
//        '/js/vender/underscore-1.6.0.min.js',
//        '/js/vender/jquery-1.10.2.min.js',
//        '/js/vender/plugins.js']
//});


fis.config.set('project.include', /^\/(?:page|src|css)\/.*$/i);


//静态资源文件域名设置;
//线上部署前domain设为http://julienedies.github.io/brick;
fis.config.merge({
    roadmap : {
        domain : 'http://julienedies.github.io/brick'
    }
});


fis.config.set('roadmap.path', [

    //brick源码
    {
        reg: /^\/src\/(.+\.js)/i,
        release: '/js/brick/$1',
        url: '/public/js/brick/$1',
        isJsLike: true,
        useHash: true
    },
    {
        reg: /^\/css\/(brick\.css)/i,
        release: '/css/$1',
        url: '/public/css/$1',
        isJsLike: true,
        useHash: true
    },

    {
        reg: /^\/page\/(css\/.+\.css)$/i,
        release: '/$1',
        url: '/public/$1',
        useSprite: true,
        useHash: true
    },
    {
        reg: /^\/page\/(img\/.+)/i,
        release: '/$1',
        url: '/public/$1'
    },
    {
        reg: /^\/page\/(js\/.+\.js)/i,
        release: '/$1',
        url: '/public/$1',
        isJsLike: true,
        useHash: true
    },
    {
        reg: /^\/page\/html\/(.+\.html)/i,
        release: '/$1',
        url: '/public/$1',
        useSprite: true,
        isHtmlLike: true
    }
]);



//背景图片sprite设置
fis.config.set('settings.spriter.csssprites.margin', 10);
fis.config.set('settings.spriter.csssprites.layout', 'matrix');
fis.config.set('settings.spriter.csssprites.htmlUseSprite', true);
fis.config.set('settings.spriter.csssprites.styleReg', /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig);



//使用fis release --dest local来使用这个配置
fis.config.merge({
    deploy : {
        local : {
            to : './public'
        }
    }
});