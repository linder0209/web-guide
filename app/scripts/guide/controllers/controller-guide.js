'use strict';

/**
 * 规范 Controller
 * @class WebGuideCtrl
 * @author Linder linder0209@126.com
 * @createdDate 2015-6-1
 * */

angular.module('webGuideApp').controller('WebGuideCtrl', function ($scope, $timeout, syntaxHighlighter) {
  $timeout(function () {
    syntaxHighlighter.format('/bower_components/SyntaxHighlighter/scripts/');
  }, 100);
});
