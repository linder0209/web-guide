'use strict';

angular.module('webGuideApp')
  .directive('linkActive', ['$location', function ($location) {
    return {
      restict: 'A',
      link: function (scope, element, attrs) {
        var currentUrl = $location.$$absUrl;
        var $element = $(element);
        $element.find('>li').removeClass(attrs.linkActive);
        $element.find('a').each(function (index, item) {
          var $item = $(item);
          var href = $(item).attr('ng-href');
          if (currentUrl.indexOf(href) > -1) {
            $item.parent().addClass(attrs.linkActive);
            return false;
          }
        });
      }
    };
  }]);