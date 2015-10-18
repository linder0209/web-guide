'use strict';

/**
 * 编辑规范 Controller
 * @class ComponentListCtrl
 * @author Linder linder0209@126.com
 * */

angular.module('webGuideApp').controller('ComponentCatalogueCtrl', function ($scope, $location, $uibModal, $filter, componentService, catalogueMethod) {
    /**
     * 列表数据
     * @type {Array}
     */
    $scope.items = [];

    /**
     * 过滤数据
     * @type {Object}
     */
    $scope.filterObject = {
      items: [],
      searchContent: ''
    };

    /**
     * 是否选中全部列表
     * @type {{checked: boolean}}
     */
    $scope.grid = {
      checked: false
    };

    componentService.catalogueList(function (data) {
      if (data.success === true) {
        $scope.items = data.items;
        $scope.filterObject.items = angular.copy($scope.items);
      }
    });

    /**
     * 搜索
     * 这里只在前端以过滤数据的方式来搜索
     */
    $scope.search = function () {
      $scope.filterObject.items = $filter('filter')($scope.items, {name: $scope.filterObject.searchContent});
    };

    /**
     * 创建新的记录
     */
    $scope.create = function () {
      catalogueMethod.openFormModal($uibModal, $scope);
    };

    $scope.edit = function (id) {
      componentService.editCatalogue(id, function (data) {
        catalogueMethod.openFormModal($uibModal, $scope, data.item);
      });
    };

    /**
     * 包括删除一条或多条记录
     * @param item
     */
    $scope.delete = function (item) {
      var json;
      if (!item) {//没有传参数，表示执行的是删除多条记录
        if ($scope.grid.checked === false) {
          $uibModal.open({
            templateUrl: '../views/templates/alert-modal.html',
            controller: 'AlertModalCtrl',
            resolve: {
              config: function () {
                return {
                  modalContent: '请至少选择一条记录！'
                };
              }
            }
          });
          return;
        }
        var items = [];
        angular.forEach($scope.filterObject.items, function (item, index) {
          if (item.checked === true) {
            items.push({_id: item._id, parent: item.parent});
          }
        });
        json = {params: {items: items}};
      } else {
        json = {
          params: {
            items: {
              _id: item._id,
              parent: item.parent
            }
          }
        };
      }
      var modalInstance = $uibModal.open({
        backdrop: 'static',
        templateUrl: '../views/templates/confirm-modal.html',
        controller: 'ConfirmModalCtrl',
        resolve: {
          config: function () {
            return {
              modalContent: '确定要删除所选的记录吗？'
            };
          }
        }
      });
      modalInstance.result.then(function () {
        categoryService.delete(json, function (data) {
          if (data.success === true) {
            var collection = categoryMethod.sortItems(data.items);
            $scope.items = collection.items;
            $scope.filterObject.items = angular.copy($scope.items);
            $scope.filterObject.searchContent = '';
            $scope.grid.checked = false;
          }
        });
      });
    };

    $scope.selectAll = function () {
      angular.forEach($scope.filterObject.items, function (item, index) {
        item.checked = $scope.grid.checked;
      });
    };

    $scope.selectItem = function () {
      var checked = false;
      angular.forEach($scope.filterObject.items, function (item, index) {
        if (item.checked) {
          checked = true;
          return false;
        }
      });
      $scope.grid.checked = checked;
    };
  })
  .controller('CatalogueFormModalCtrl', function ($scope, $modalInstance, componentService, formData, catalogueMethod) {
    $scope.items = formData.items;
    $scope.filterObject = formData.filterObject;
    $scope.dialogTitle = '添加目录';
    $scope.catalogue = {
      id: undefined,
      parentId: undefined,
      name: undefined,
      code: undefined,
      description: undefined
    };

    var item = formData.item;
    if (item) {
      $scope.catalogue = {
        id: item.id,
        parentId: item.parentId,
        name: item.name,
        code: item.code,
        description: item.description
      };
      $scope.dialogTitle = '修改目录';
    }

    $scope.save = function () {
      componentService.saveCatalogue($scope.catalogue, function (data) {
        if (data.success === true) {
          if (item) {//修改
            angular.extend(item, $scope.catalogue);
          }else{
            $scope.items.length = 0;
            $scope.filterObject.searchContent = '';
            $scope.filterObject.items.length = 0;
            data.items.forEach(function(item){
              $scope.items.push(item);
              $scope.filterObject.items.push(item);
            });
          }
        }
      });
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.validateName = function () {
      $scope.validator.resetForm();
      $('#name').valid();
      $('#description').valid();
    };
  });


