'use strict';

/**
 * 通用 Alert 模态窗口 Controller
 * @class AlertModalCtrl
 * @author Linder linder0209@126.com
 * */
angular.module('webGuideApp')
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
