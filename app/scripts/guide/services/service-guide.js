angular.module('webGuideApp')
  .factory('scrollSpy', function () {
    'use strict';
    var shared;
    return {
      loadScroll: function (element, options) {
        if (!shared) {
          shared = ScrollSpy();
        }
        shared.load(element, options);
      }
    };

    /**
     * 鼠标滚动监听目录实现
     * 参考 Bootstrap ScrollSpy 实现
     * 该实现采用了单例模式
     * @param element
     * @param options
     * @constructor
     */
    function ScrollSpy() {
      var instance = {
        options: {
          offset: 10,
          immedLoad: true
        },

        init: function () {
          this.$body = $('body');
          this.offsets = [];
          this.targets = [];
          this.activeTarget = null;
          this.scrollHeight = 0;
          this.$scrollElement = null;
          this.selector = null;
        },

        /**
         * 关联相关目录
         * @param element
         * @param options
         */
        load: function (element, options) {
          this.activeTarget = null;
          this.$scrollElement = $(element).is('body') ? $(window) : $(element);
          $.extend(this.options, options);
          this.selector = (this.options.target || '') + ' .nav li > a';

          //jQuery代理，这样上下文this会指向 ScrollSpy
          var process = $.proxy(this.process, this);

          this.$scrollElement.off('scroll.hf.scrollspy').on('scroll.hf.scrollspy', process);

          var self = this;
          $(this.options.target).on('click', '.nav li > a', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $el = $(e.currentTarget);
            var target = $el.data('target') || $el.attr('href');
            var $target = $('[data-target="' + target + '"]');

            var offsetMethod = 'offset';
            var offsetBase = 0;
            if (!$.isWindow(self.$scrollElement[0])) {
              offsetMethod = 'position';
              offsetBase = self.$scrollElement.scrollTop();
            }

            self.$scrollElement.scrollTop($target[offsetMethod]().top + offsetBase - (self.options.offset - 1));
            $el[0].blur();
            process();
          });
          if (this.options.immedLoad) {
            this.refresh();
            this.process();
          }
        },

        /**
         * 计算被监听元素实际高度
         */
        getScrollHeight: function () {
          return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
        },

        /**
         * 滚动页面时，刷新相关数据
         */
        refresh: function () {
          var offsetMethod = 'offset';
          var offsetBase = 0;

          if (!$.isWindow(this.$scrollElement[0])) {
            offsetMethod = 'position';
            offsetBase = this.$scrollElement.scrollTop();
          }

          this.offsets = [];
          this.targets = [];
          this.scrollHeight = this.getScrollHeight();

          var self = this;

          //把滚动监听的元素和坐标保存到offsets和targets中
          this.$body.find(this.selector).map(function () {
            var $el = $(this);
            var target = $el.data('target') || $el.attr('href');
            var $target = $('[data-target="' + target + '"]');

            return ($target.length && $target.is(':visible') && [
                [$target[offsetMethod]().top + offsetBase, target]
              ]) || null;
          }).sort(function (a, b) {
            return a[0] - b[0];
          }).each(function () {
            self.offsets.push(this[0]);
            self.targets.push(this[1]);
          });
        },
        /**
         * 滚动时触发该方法
         * @returns {boolean|*}
         */
        process: function () {
          var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
          var scrollHeight = this.getScrollHeight();
          var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
          var offsets = this.offsets;
          var targets = this.targets;
          var activeTarget = this.activeTarget;
          var i;

          //不相等的话，重新刷新，比如改变页面窗口后
          if (this.scrollHeight !== scrollHeight) {
            this.refresh();
          }

          if (scrollTop >= maxScroll) {
            return activeTarget !== (i = targets[targets.length - 1]) && this.activate(i);
          }

          if (activeTarget && scrollTop <= offsets[0]) {
            return activeTarget !== (i = targets[0]) && this.activate(i);
          }

          for (i = offsets.length; i--;) {
            if (activeTarget !== targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1])) {
              this.activate(targets[i]);
            }
          }
        },
        /**
         * 设置当前活动的目录
         * @param target
         */
        activate: function (target) {
          this.activeTarget = target;

          $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');

          var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';

          var active = $(selector).parents('li').addClass('active');

          active.trigger('activate.hf.scrollspy');
        }
      };

      instance.init();

      return instance;
    }

  })
  // 用SyntaxHighlighter 格式化代码
  .factory('syntaxHighlighter', function () {
    'use strict';
    var pathCtx = '';

    function path() {
      var args = arguments, result = [];
      for (var i = 0; i < args.length; i++) {
        result.push(args[i].replace('@', pathCtx));
      }
      return result;
    }

    return {
      format: function (ctx) {
        pathCtx = ctx;
        SyntaxHighlighter.autoloader.apply(null, path(
          'applescript @shBrushAppleScript.js',
          'actionscript3 as3 @shBrushAS3.js',
          'bash shell @shBrushBash.js',
          'coldfusion cf @shBrushColdFusion.js',
          'cpp c @shBrushCpp.js',
          'c# c-sharp csharp @shBrushCSharp.js',
          'css @shBrushCss.js',
          'delphi pascal @shBrushDelphi.js',
          'diff patch pas @shBrushDiff.js',
          'erl erlang @shBrushErlang.js',
          'groovy @shBrushGroovy.js',
          'java @shBrushJava.js',
          'jfx javafx @shBrushJavaFX.js',
          'js jscript javascript @shBrushJScript.js',
          'perl pl @shBrushPerl.js',
          'php @shBrushPhp.js',
          'text plain @shBrushPlain.js',
          'py python @shBrushPython.js',
          'powershell ps posh @shBrushPowerShell.js',
          'ruby rails ror rb @shBrushRuby.js',
          'sass scss @shBrushSass.js',
          'scala @shBrushScala.js',
          'sql @shBrushSql.js',
          'vb vbnet @shBrushVb.js',
          'xml xhtml xslt html @shBrushXml.js'
        ));
        SyntaxHighlighter.all();
      }
    };
  });
