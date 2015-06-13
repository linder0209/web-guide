'use strict';

/**
 * 编辑规范 Controller
 * @class WebGuideManageCtrl
 * @author Linder linder0209@126.com
 * @createdDate 2015-5-29
 * */

angular.module('webGuideApp').controller('WebGuideManageCtrl',
  function ($scope, $location, $modal, webGuideManageService, publishMethod) {
    //先销毁tinyMCE实例
    if (tinymce && tinymce.get('ui-tinymce-0')) {
      tinymce.get('ui-tinymce-0').destroy();
    }

    $scope.guide = {
      type: '',
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

    $scope.switchTo = function (type, event) {
      if (type === $scope.guide.type) {
        return;
      }
      var $el = event ? $(event.currentTarget) : $('.nav-sidebar a[guide-docs="' + type + '"]');
      location.hash = type;
      webGuideManageService.getGuide(type, function (data) {
        if (data.success === true) {
          $el.parent().addClass('active').siblings().removeClass('active');
          $scope.guide.type = type;
          $scope.guide.content = data.content;
        }
      });
    };

    $scope.switchTo(location.hash !== '' ? location.hash.slice(2) : 'html');

    /**
     * 保存
     */
    $scope.saveGuide = function (confirm) {
      //生成带目录的html片段
      var guide = $scope.guide;
      var html = publishMethod.generateHtml(guide.content);
      guide.catalogueHtml = html.catalogue || '';
      guide.catalogueContent = html.content || '';

      webGuideManageService.saveGuide(guide, function (data) {
        if (confirm !== false) {
          $modal.open({
            templateUrl: '../views/templates/alert-modal.html',
            controller: 'AlertModalCtrl',
            resolve: {
              config: function () {
                return {
                  modalTitle: '提示信息',
                  modalContent: data.success === true ? '保存成功！' : '保存失败！'
                };
              }
            }
          });
        }
      });
    };

    //十分钟自动保存一次
    setInterval(function () {
      $scope.saveGuide(false);
    }, 600000);

    //添加resize事件
    $(window).resize(function () {
      tinymce.get('ui-tinymce-0').iframeElement.style.height = document.documentElement.clientHeight - 198 + 'px';
    });
  })
/**
 * 通用 Alert 模态窗口 Controller
 * @class AlertModalCtrl
 * @author Linder linder0209@126.com
 * @createdDate 2015-6-12
 * */
  .controller('AlertModalCtrl', function ($scope, $modalInstance, config) {
    $scope.modalTitle = config.modalTitle;
    $scope.modalContent = config.modalContent;
    $scope.hideClose = config.hideClose;
    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
