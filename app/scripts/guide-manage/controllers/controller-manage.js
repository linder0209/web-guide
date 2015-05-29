'use strict';

/**
 * 编辑规范 Controller
 * @class WebGuideManageCtrl
 * @author Linder linder0209@126.com
 * @createdDate 2015-5-29
 * */

angular.module('webGuideManageApp').controller('WebGuideManageCtrl', function ($scope, $location, webGuideManageService) {
  //先销毁tinyMCE实例
  if (tinymce && tinymce.get('content')) {
    tinymce.get('content').destroy();
  }

  $scope.guide = {
    type: 'css',
    content: ''
  };

  //jshint -W106
  $scope.tinymceOptions = {
    height: 400,
    menubar: false, //Disable all menu
    content_css: '/styles/tinymce.css',
    plugins: [
      'autolink link image preview hr code fullscreen table textcolor charmap'
    ],
    toolbar: 'undo redo | bold italic underline strikethrough subscript superscript | styleselect | fontselect fontsizeselect formatselect ' +
    '| forecolor backcolor removeformat | bullist numlist outdent indent blockquote | alignleft aligncenter alignright alignjustify | ' +
    'hr image link unlink | charmap table code | preview fullscreen'
  };

  webGuideManageService.getGuide('html', function (data) {
    if (data.success === true) {
      $scope.guide.content = data.content;
    }
  });

  $scope.switchTo = function (type, event) {
    if(type === $scope.guide.type){
      return;
    }
    webGuideManageService.getGuide(type, function (data) {
      if (data.success === true) {
        $(event.currentTarget).parent().addClass('active').siblings().removeClass('active');
        $scope.guide.type = data.type;
        $scope.guide.content = data.content;
      }
    });
  };

  /**
   * 保存
   */
  $scope.save = function () {
    webGuideManageService.save($scope.guide, function (data) {
      if (data.success === true) {
        $scope.guide.content = '';
      }
    });
  };
});
