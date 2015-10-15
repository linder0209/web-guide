'use strict';

angular.module('webGuideApp')
  .factory('componentService', ['guideHttpService', function (guideHttpService) {
    return {
      pageList: function (data, success) {
        guideHttpService.get('component/pagelist', data).then(success);
      },
      catalogueList: function (success) {
        guideHttpService.get('component/cataloguelist').then(success);
      },
      saveCatalogue: function (data, success) {
        guideHttpService.post('component/catalogue', data).then(success);
      },
    };
  }])
  .factory('catalogueMethod', function () {
    // Public API here
    return {
      openFormModal: function ($modal, $scope, item) {
        $modal.open({
          backdrop: 'static',// 设置为 static 表示当鼠标点击页面其他地方，modal不会关闭
          //keyboard: false,// 设为false，按 esc键不会关闭 modal
          templateUrl: 'catalogueForm.html',
          controller: 'CatalogueFormModalCtrl',
          size: 'lg',
          resolve: {// 传递数据
            formData: function () {
              return {
                item: item,
                items: $scope.items,
                filterObject: $scope.filterObject
              };
            }
          }
        });
      }
    };
  });
