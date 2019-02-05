/**
 * Created by julien.zhang on 2014/10/10.
 */

const p = require('../../package.json');
const version = p.version;

//fis.config.set('project.exclude', /^\/(?:dist|page)\//i);
//fis.config.set('project.include', /^\/(?:dist|page)\//i);
//fis.config.set('project.include', /^\/(?:(?:page|src|css)\/.*|brick(?:\.mobile)?\.js)$/i);

// 处理sass
fis.config.set('modules.parser.scss', 'node-sass');
fis.config.set('modules.parser.sass', 'node-sass');
fis.config.set('roadmap.ext.scss', 'css');
fis.config.set('roadmap.ext.sass', 'css');

//开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
//fis.config.set('modules.postpackager', 'simple');

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

//静态资源文件域名设置;
//线上部署前domain设为http://julienedies.github.io/brick;
fis.config.merge({
    roadmap : {
        domain : 'https://julienedies.github.io/brick'
        //domain:''
    }
});

fis.config.set('roadmap.path', [
    //主页相关内容
    {
        reg: /include\/.*$/i,
        release: false
    },
    {
        reg: /^\/dist\/(brick\.(?:js|css))$/i,
        release: '/brick/$1',
        url: '/public/brick/$1',
        isJsLike: true,
        useHash: true
    },
    {
        reg: /^\/(?:html|css)\/(.+\.css)$/i,
        release: '/css/$1',
        url: '/public/css/$1',
        useSprite: true,
        useHash: true
    },
    {
        reg: /^\/(?:html|css|img\/)(.+\.(?:jpg|png|gif))$/i,
        release: '/img/$1',
        url: '/public/img/$1'
    },
    {
        reg: /^\/js\/.+\.(?:css|js)$/i,
        release: '$&',
        url: '/public$&',
        isJsLike: true,
        useHash: true
    },
    {
        reg: /^\/html\/(.+\.html)/i,
        release: '/$1',
        url: '/public/$1',
        useSprite: true,
        isHtmlLike: true
    },
    // 任何其它文件不发布
    {
        reg: /.*/i,
        release: false
    }
]);

// 背景图片sprite设置
fis.config.set('settings.spriter.csssprites.margin', 10);
fis.config.set('settings.spriter.csssprites.layout', 'matrix');
fis.config.set('settings.spriter.csssprites.htmlUseSprite', true);
fis.config.set('settings.spriter.csssprites.styleReg', /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig);

// 使用fis release --dest local来使用这个配置
fis.config.merge({
    deploy : {
        local : {
            to : './public'
        }
    }
});