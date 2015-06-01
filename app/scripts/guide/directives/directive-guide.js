'use strict';

angular.module('webGuideApp')
  .directive('generateCatalogue', ['$timeout', 'scrollSpy', function ($timeout, scrollSpy) {
    return {
      restrict: 'AC',
      link: function (scope, element) {
        //添加滚动事件，动态显示文章目录
        $(window).off('scroll.catalogue').on('scroll.catalogue', function () {
          var $aside = $('.guide-aside-panel');
          var contentBottom = $aside.offset().top + $aside.outerHeight();
          var scrollTop = $(window).scrollTop();
          var $catalogue = $('.guide-catalogue-panel');
          if (scrollTop + 70 > contentBottom) {
            $catalogue.removeClass('sr-only');
          } else {
            $catalogue.addClass('sr-only');
            $catalogue.find('.nav').show();
          }
        });

        //点击栏目图标事件
        element.find('.guide-catalogue-header span').click(function (e) {
          $(e.target).parent().next().toggle();
        });

        var $upElement = $('.guide-catalogue-arrow .up',element);
        var $downElement = $('.guide-catalogue-arrow .down',element);

        var $navElement = $('.guide-catalogue > .nav', element);
        var $rowElements = $navElement.find('li > a');

        //The first visible row element index.
        var rowIndex;
        //The visible row element size
        var visibleRowSize;
        //All of li element size;
        var rowSize;
        // Each of row default height
        var rowHeight = 30;

        function fadeInOutUp(step) {
          $downElement.removeClass('disabled');
          if ($upElement.hasClass('disabled')) {
            return;
          }
          step = step || 1;
          rowIndex = rowIndex - step;
          $navElement.css({
            top: -30 * rowIndex
          });
          if (rowIndex <= 0) {
            $upElement.addClass('disabled');
          }
        }

        function fadeInOutDown(step) {
          if(rowIndex === undefined || visibleRowSize === undefined || rowSize === undefined){
            rowIndex = 0;
            visibleRowSize = 0;
            rowSize = 0;
            var menuHeight = $('.guide-catalogue',element).outerHeight();
            var subHeight = 0;

            $rowElements.each(function(index, element) {
              var height = $(this).outerHeight();
              subHeight += height;
              rowSize +=  height / rowHeight;
              if (subHeight <= menuHeight) {
                visibleRowSize += height / rowHeight;
              }
            });

            if (visibleRowSize === rowSize) {
              $downElement.addClass('disabled');
            }
          }
          $upElement.removeClass('disabled');
          if ($downElement.hasClass('disabled')) {
            return;
          }
          step = step || 1;
          rowIndex = rowIndex + step;
          $navElement.css({
            top: -30 * rowIndex
          });
          if (rowIndex + visibleRowSize >= rowSize) {
            $downElement.addClass('disabled');
          }
        }

        function wheelFn(e) {
          e.preventDefault();
          e.stopPropagation();
          var originalEvent = e.originalEvent;
          var upDown;
          if (originalEvent.detail) {
            var detail = originalEvent.detail;
            if (detail < 0) { //up
              upDown = 'up';
            } else if (detail > 0) { //down
              upDown = 'down';
            }
          } else if (originalEvent.wheelDelta) { //IE 6 7 8
            var wd = originalEvent.wheelDelta;
            if (wd > 0) { //up
              upDown = 'up';
            }
            if (wd < 0) { //down
              upDown = 'down';
            }
          }
          if (upDown === 'up') {
            if ($upElement.hasClass('disabled')) {
              return;
            }
            fadeInOutUp();
          } else {
            if ($downElement.hasClass('disabled')) {
              return;
            }
            fadeInOutDown();
          }
        }

        // compatibility: mouse wheel event
        // http://www.w3help.org/zh-cn/causes/SD9015
        var ua = navigator.userAgent;
        // ie 11 /gecko/i.test(ua) value is true ,so need to judge /firefox/i.test(ua)
        if (/gecko/i.test(ua) && !/webkit/i.test(ua) && /firefox/i.test(ua)) {//Firefox
          $(document).off('DOMMouseScroll.catalogue').on('DOMMouseScroll.catalogue', '.guide-catalogue .nav', wheelFn);
        } else {//IE Safari Chrome Opera
          $(document).off('mousewheel.catalogue').on('mousewheel.catalogue', '.guide-catalogue .nav', wheelFn);
        }

        //显示隐藏上下翻滚箭头事件
        element.find('.guide-catalogue > ul').mouseenter(function (e) {
          if (visibleRowSize !== rowSize) {
            element.find('.guide-catalogue-arrow').show();
          }
        }).mouseleave(function (e) {
          element.find('.guide-catalogue-arrow').hide();
        });
        element.find('.guide-catalogue-arrow').mouseenter(function(e){
          $(e.currentTarget).show();
        });

        // 上下翻滚栏目事件
        element.on('click','.guide-catalogue-arrow > div', function (e) {
          var el = $(e.currentTarget);
          if (el.hasClass('disabled')) {
            return;
          }
          if(el.hasClass('up')){
            fadeInOutUp();
          }else{
            fadeInOutDown();
          }
        });

        //加载 scroll组件
        $timeout(function () {
          scrollSpy.loadScroll($('body'), {
            offset: 70,
            target: '.guide-catalogue',
            immedLoad: false
          });

          //注册监听事件，当鼠标滑轮移动到活动的target时，触发该事件
          element.on('activate.hf.scrollspy', '.guide-catalogue > .nav li', function(e){
            if(!$('.guide-catalogue-panel').hasClass('sr-only')){
              var $activeEl = $(e.currentTarget);
              var $nav = $('.guide-catalogue', element);
              var sub = $activeEl.offset().top - $nav.offset().top;
              // 在 $nav 高度范围内可见 0 - 420（也就是说 sub 值为 0 - 390 可见），否则隐藏，需要处理显示
              if(sub > 390){
                fadeInOutDown((sub - 390) / 30);
              }else if(sub < 0){
                fadeInOutUp((- sub)/ 30);
              }
            }
          });
        });
      }
    };
  }]);
