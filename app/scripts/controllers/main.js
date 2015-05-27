'use strict';

/**
 * @ngdoc function
 * @name webGuideApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webGuideApp
 */
angular.module('webGuideApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
