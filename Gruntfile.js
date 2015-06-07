// Generated on 2015-05-27 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var fs = require('fs');

module.exports = function (grunt) {

  // Load grunt tasks automatically
  // 自动加载grunt tasks
  // https://github.com/sindresorhus/load-grunt-tasks
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  // 统计显示各任务执行的时间
  // https://github.com/sindresorhus/time-grunt
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    docs: (require('./bower.json').appPath || 'app') + '/docs',
    dist: 'dist',
    server: 'server',
    publish: 'publish',
    webapp: 'dist/webapp'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= express.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      express: {
        files: [ 'app.js', '<%= yeoman.server %>/**/*.js' ],
        tasks: [ 'express:dev' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      },
      less: {
        files: ['<%= yeoman.app %>/less/{,*/}*.less'],
        tasks: ['less:publish']
      }
    },

    // express 启动任务
    express: {
      options: {
        port: 9001,
        livereload: 35729
      },
      dev: {
        options: {
          open: true,
          script: './bin/web-guide.js'
        }
      }
    },

    // 把less 转换为 css 任务
    less: {
      options: {
        paths: ['<%= yeoman.app %>/']
      },
      publish: {
        files: {
          '<%= yeoman.app %>/styles/guide.css': '<%= yeoman.app %>/less/guide.less',
          '<%= yeoman.app %>/styles/guide-manager.css': '<%= yeoman.app %>/less/guide-manager.less',
          '<%= yeoman.app %>/styles/tinymce.css': '<%= yeoman.app %>/less/tinymce.less'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),//利用插件jshint-stylish输出分析结果
        reporterOutput: 'jshint.log'//设置分析结果输出到指定文件，如果不设置，则输出到控制台
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js',
          '<%= yeoman.server %>/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*',
            '!<%= yeoman.dist %>/node_modules/**'
          ]
        }]
      },
      server: '.tmp',
      docs: ['<%= yeoman.docs %>/dist','<%= yeoman.docs %>/.tmp'],
      tmp: [
        '<%= yeoman.docs %>/dist/scripts/*.*',
        '!<%= yeoman.docs %>/dist/scripts/*.min.js',
        '<%= yeoman.docs %>/dist/styles/*.*',
        '!<%= yeoman.docs %>/dist/styles/*.min.css',
        '<%= yeoman.docs %>/dist/components/bootstrap',
        '<%= yeoman.docs %>/dist/components/jquery',
        '<%= yeoman.docs %>/dist/components/SyntaxHighlighter/styles'
      ]
    },

    // Add vendor prefixed styles
    // 该任务用来分析css并为css3加上各浏览器前缀
    autoprefixer: {
      options: {
        //cascade: true,// 设置层叠显示分格
        browsers: ['last 1 version']// 指定浏览器版本，该设置表示浏览器最新版本，详见 https://github.com/ai/autoprefixer#browsers
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    // 由于项目中不同的文件加载的bower 组件不一样，故有些html文件去掉了bower install
    wiredep: {
      options: {
        dependencies: true,
        devDependencies: false,
        exclude: [],
        fileTypes: {}
      },
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      }
    },

    // Renames files for browser caching purposes
    // 该任务用来重新命名文件
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    // 注意不同的文件应该命名不同的编译名称，比如两个html文件中不能出现相同的build:js 名称
    // 该task 会生成 concat、uglify、cssmin 配置项，随后利用这几个命令来处理转换文件，处理html中类似以下定义的块
    /**
     * <!-- build:js js/app.js -->
     <script src="js/app.js"></script>
     <script src="js/controllers/thing-controller.js"></script>
     <script src="js/models/thing-model.js"></script>
     <script src="js/views/thing-view.js"></script>
     <!-- endbuild -->
     **/
    useminPrepare: {
      dist: {
        html: '<%= yeoman.app %>/index.html',
        options: {
          dest: '<%= yeoman.dist %>',
          flow: {
            html: {
              steps: {
                js: ['concat', 'uglifyjs'],
                css: ['cssmin']
              },
              post: {}
            }
          }
        }
      },
      docs: {
        options: {
          staging: '<%= yeoman.docs %>/.tmp',//临时目录
          dest: '<%= yeoman.docs %>/dist',//输出路径
          flow: {
            html: {
              steps: {
                js: ['concat', 'uglifyjs'],
                css: ['cssmin']
              },
              post: {}
            }
          }
        },
        src: [
          '<%= yeoman.docs %>/dist/*.html'
        ]
      }

    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html',
        '<%= yeoman.docs %>/dist/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css',
        '<%= yeoman.docs %>/dist/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles',
          '<%= yeoman.docs %>/dist',
          '<%= yeoman.docs %>/dist/images',
          '<%= yeoman.docs %>/dist/styles'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,// 合并多余的空格
          conservativeCollapse: true,
          collapseBooleanAttributes: true,// Collapse boolean attributes. <input disabled="disabled"> => <input disabled>
          removeCommentsFromCDATA: true,//删除script 和style中的注解
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= yeoman.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      docs: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/bower_components',
          dest: '<%= yeoman.docs %>/dist/components',
          src: ['jquery/dist/*.*','bootstrap/dist/**/*.*','SyntaxHighlighter/{scripts,styles}/*.*']
        },{
          expand: true,
          cwd: '<%= yeoman.docs %>/templates',
          dest: '<%= yeoman.docs %>/dist/scripts',
          src: ['guide.js', 'scroll-spy.js', 'back-to-top.js']
        },{
          expand: true,
          cwd: '<%= yeoman.app %>/styles',
          dest: '<%= yeoman.docs %>/dist/styles',
          src: ['guide.css']
        },{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          dest: '<%= yeoman.docs %>/dist/images',
          src: ['logo-*.*','favicon.png']
        },{
          expand: true,
          cwd: '<%= yeoman.app %>/bower_components/bootstrap/dist/fonts',
          dest: '<%= yeoman.docs %>/dist/fonts',
          src: ['*.*']
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build']);
    }

    grunt.task.run([
      'clean:server', // clean .tmp
      'wiredep',
      'less:publish',//把less转换为css
      'concurrent:server',
      'autoprefixer',// 分析css 并给css3加上浏览器前缀
      'express:dev',// 启动 express
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'autoprefixer',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'less:publish',//把less转换为css
    'useminPrepare',//合并压缩文件
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',// 处理angular 在 .tmp下
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);

  //创建指南文档
  grunt.registerTask('generateDocs',  function () {
    var guides = ['html', 'css', 'javascript', 'performance'];
    var path = __dirname + '/app/docs/';
    var commonPath = __dirname + '/app/views/common/';
    var dist = path + 'dist';
    //fs.readFileSync(filename[, options])
    //The encoding option is ignored if data is a buffer. It defaults to 'utf8'.
    var header = fs.readFileSync(path + 'templates/header.html',{encoding: 'utf8'});
    var footer = fs.readFileSync(path + 'templates/footer.html',{encoding: 'utf8'});
    var layoutDocs = fs.readFileSync(path + 'templates/layout-docs.html',{encoding: 'utf8'});
    var layout = fs.readFileSync(path + 'templates/layout.html',{encoding: 'utf8'});
    fs.mkdirSync(dist);
    //首页
    var main = fs.readFileSync(commonPath + 'main.html',{encoding: 'utf8'});
    //资源文件
    var resources = fs.readFileSync(commonPath + 'resources.html',{encoding: 'utf8'});
    var _header = header;
    guides.forEach(function (item) {
      _header = _header.replace('<%=' + item + '%>','');
    });
    layout = layout.replace('<%=footer%>', footer);
    layout = layout.replace('<%=header%>', _header);
    fs.writeFileSync(dist + '/index.html', layout.replace('<%=index%>','active').replace('<%=resources%>','').replace('<%=content%>', main));

    fs.writeFileSync(dist + '/resources.html', layout.replace('<%=index%>','').replace('<%=resources%>','active').replace('<%=content%>', resources));

    //其他指南
    guides.forEach(function (item) {
      var content = fs.readFileSync(path + 'guide/' + item + '-catalogue-content.html');
      var catalogue = fs.readFileSync(path + 'guide/' + item + '-catalogue.html');
      var _layout = layoutDocs;
      _header = header;
      _header = _header.replace('<%=index%>', '').replace('<%=resources%>', '');
      guides.forEach(function (it) {
        _header = _header.replace('<%=' + it + '%>', item === it ? 'active' : '');
      });
      _layout = _layout.replace('<%=header%>', _header);
      _layout = _layout.replace('<%=footer%>', footer);
      _layout = _layout.replace('<%=content%>', content);
      _layout = _layout.replace('<%=catalogue%>', catalogue);
      fs.writeFileSync(dist + '/' + item + '.html', _layout);
    });
  });

  grunt.registerTask('docs', [
    'clean:docs',
    'generateDocs',
    'copy:docs',
    'useminPrepare:docs',
    'concat:generated',
    'cssmin:generated',// 用 useminPrepare 生成的 cssmin config 压缩 css
    'uglify:generated',// 用 useminPrepare 生成的 uglify config 压缩 js
    'usemin', // 用重新命名的压缩文件替换
    'clean:tmp'//删除多余的文件
  ]);
};
