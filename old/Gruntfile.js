'use strict';

module.exports = function (grunt) {

    var _config = grunt.file.readJSON('config.json');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),


        // 语法检查
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },


        // 合并文件
        concat: {
            options: {
                stripBanners: true,
                banner: '/** \n * <%= pkg.name %> - v<%= pkg.version %> \n ' +
                    '* modified: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n ' +
                    '*/\n\n' +
                    ';(function( root, undefined ){ \n\n ',
                footer: "}( window ));"
            },
            all: {
                files: [
                   // {"src": ["src/index/a.js", "src/index/b.js"], "dest": "js/index/index.js"}
                ]
            }
        },


        // 压缩文件
        uglify: {
            options: {
                //生成一个banner注释并插入到输出文件的顶部
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> by @<%= pkg.author %> */\n'
            },

            all: {
                files: []
            },

            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['*.js', '**/*.js'],
                        dest: 'js/',
                        ext: '.min.js'
                    }
                ]
            }
        },


        // 监测文件变化
        watch: {
            configFiles: {
                files: [ 'Gruntfile.js', 'config.json' ],
                options: {
                    reload: true
                }
            },

            concat: {
                files: ['src/**/*.js'],
                tasks: ['concat:all', 'uglify:all'],
                options: {
                   spawn: false,
                   nospawn : true
                }
            }

        }

        //////////////////////////////
    });


    // 加载任务插件
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-watch');


    // 监听文件变化
    grunt.event.on('watch', function (action, filepath, target) {

        var map = _config;
        var reg = /\\/g;
        var r = [];
        var src;
        var file;

        function check(file, filepath){
            grunt.log.writeln(file + ' ++++++++ ' + filepath);
            filepath = filepath.replace(/\\/g, '/');
            var arr1 = file.split('/');
            var arr2 = filepath.split('/');

            for(var i=0, len = arr1.length; i<len; i++){
                if(arr1[i].indexOf('*') === 0){
                    grunt.log.writeln(file + '========' + filepath);
                    return true;
                }
                if(arr1[i] !== arr2[i]){
                    grunt.log.writeln(file + '!!!!!!!!' + filepath);
                    return false;
                }
            }

            return true;
        }

        if(filepath === 'config.json'){
            _config = grunt.file.readJSON('config.json');
        }

        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);

        for (var i in map) {
            src = map[i];
            for (var j = 0, l = src.length; j < l; j++) {
                file = src[j];
                if ( check(file, filepath) ) {
                    r.push({src: src, dest: i});
                    break;
                }
            }
        }

        for(var cloneR = r.slice(), item, base, r2 = []; item = cloneR.shift(); ){
            base = {
                expand: true,
                //cwd: 'js',
                src: '**/*.js',
                //dest: 'js',
                ext: '.min.js'
            };

            base.src = item.dest;
            r2.push(base);
        }

        grunt.log.writeln(JSON.stringify(r2));

        grunt.config.set('concat.all.files', r);
        grunt.config.set('uglify.all.files', r2);

    });


    // 定义默认任务
    grunt.registerTask('build', ['jshint', 'concat', 'uglify']);

    grunt.registerTask('default', ['concat']);


};