/**
 * Created by julien.zhang on 2014/10/10.
 * data-swf="<<<uri: ../../js/flowplayer/flowplayer.swf>>>"
 */

var p = require('../package.json');
var version = p.version;

//处理sass
fis.config.set('modules.parser.scss', 'sass');
fis.config.set('modules.parser.sass', 'sass');
fis.config.set('roadmap.ext.scss', 'css');
fis.config.set('roadmap.ext.sass', 'css');

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


//fis.config.set('project.include', /^\/(?:(?:page|src|css)\/.*|brick(?:\.mobile)?\.js)$/i);


//静态资源文件域名设置;
//线上部署前domain设为http://julienedies.github.io/brick;
fis.config.merge({
    roadmap : {
        //domain : 'http://julienedies.github.io/brick'
        //domain:''
    }
});


fis.config.set('roadmap.path', [

    //制作主页用
    {
        reg: /^\/brick(?:\.mobile)?\.js$/i,
        release: 'brick/'+version+'$&',
        url: '/public/brick/'+version+'$&',
        isJsLike: true
    },
    {
        reg: /^\/src\/plugins\/([\w]+\.js)$/i,
        release: 'brick/'+version+'/brick.$1',
        url: '/public/brick/'+version+'/brick.$1',
        isJsLike: true
    },
    {
        reg: /^\/css\/(.+\.css)$/i,
        release: 'brick/'+version+'/$1',
        url: '/public/brick/'+version+'/$1'
    },

    //brick源码
    {
        reg: /^\/src\/(.+\.js)/i,
        //release: 'brick/'+ version +'/src/$1',
        release:false,
        url: '/public/brick/'+ version +'/src/$1',
        isJsLike: true,
        useHash: true
    },

    //主页相关内容
    {
        reg: /include\/.*$/i,
        release: false
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
    },

    //任何其它文件不发布
    {
        reg: /.*/i,
        release: false
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