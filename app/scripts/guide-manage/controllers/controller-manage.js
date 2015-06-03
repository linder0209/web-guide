'use strict';

/**
 * 编辑规范 Controller
 * @class WebGuideManageCtrl
 * @author Linder linder0209@126.com
 * @createdDate 2015-5-29
 * */

angular.module('webGuideApp').controller('WebGuideManageCtrl', function ($scope, $location, webGuideManageService, publishMethod) {
  //先销毁tinyMCE实例
  if (tinymce && tinymce.get('content')) {
    tinymce.get('content').destroy();
  }

  $scope.guide = {
    type: 'html',
    content: '',//原内容
    catalogueHtml: '',//目录
    catalogueContent: ''//带目录的内容
  };

  //jshint -W106
  $scope.tinymceOptions = {
    height: document.documentElement.clientHeight - 198,
    menubar: false, //Disable all menu
    content_css: '/styles/tinymce.css',
    plugins: [
      'autolink link image preview hr code fullscreen table textcolor charmap syntaxhighlighter'
    ],
    toolbar: 'undo redo | bold italic underline strikethrough subscript superscript | styleselect | fontselect fontsizeselect formatselect ' +
    '| forecolor backcolor removeformat | bullist numlist outdent indent blockquote | alignleft aligncenter alignright alignjustify | ' +
    'hr image link unlink | charmap table syntaxhighlighter code | preview fullscreen'
  };

  webGuideManageService.getGuide('html', function (data) {
    if (data.success === true) {
      $scope.guide.content = data.content;
    }
  });

  $scope.switchTo = function (type, event) {
    if (type === $scope.guide.type) {
      return;
    }
    webGuideManageService.getGuide(type, function (data) {
      if (data.success === true) {
        $(event.currentTarget).parent().addClass('active').siblings().removeClass('active');
        $scope.guide.type = type;
        $scope.guide.content = data.content;
      }
    });
  };

  /**
   * 保存
   */
  $scope.saveGuide = function () {
    //生成带目录的html片段
    var guide = $scope.guide;
    var html = publishMethod.generateHtml(guide.content);
    guide.catalogueHtml = html.catalogue || '';
    guide.catalogueContent = html.content || '';

    webGuideManageService.saveGuide(guide, function (data) {
      if (data.success === true) {

      }
    });
  };

  //两分钟保存一次
  setInterval(function () {
    $scope.saveGuide();
  }, 10000);

  //添加resize事件
  $(window).resize(function () {
    tinymce.get('content').iframeElement.style.height = document.documentElement.clientHeight - 198 + 'px';
  });
});
