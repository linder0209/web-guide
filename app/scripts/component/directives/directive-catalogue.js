'use strict';

angular.module('webGuideApp')
  .directive('catalogueValidator', function ($parse) {
    return {
      restrict: 'AC',
      link: function postLink(scope, element, attrs) {
        var validator = $(element).validate({
          /*rules: {
            name: {
              remote: {
                url: 'manage/category/validate/duplicate',
                type: 'get',
                dataType: 'json',
                data: {
                  id: function () {
                    return scope.category._id || '';
                  },
                  name: function () {
                    return scope.category.name;
                  },
                  parent: function () {
                    return scope.category.parentCategory ? scope.category.parentCategory._id : '';
                  }
                }
              }
            }
          },
          messages: {
            name: {
              remote: '一个拥有相同名字的父级目录已存在。'
            }
          },*/
          submitHandler: function () {
            scope.$apply(function () {
              scope.save();
            });
          }
        });

        var model = $parse(attrs.catalogueValidator);
        model.assign(scope.$parent, validator);
        model.assign(scope, validator);
      }
    };
  })
  .directive('articleCount', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var count = attrs.articleCount;
        if(count > 0){
          element.html('<a target="_blank" href="' + attrs.link + '">' + count + '</a>');
        }else{
          element.text('0');
        }
      }
    };
  });




