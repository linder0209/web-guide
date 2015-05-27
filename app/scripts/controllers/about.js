'use strict';

/**
 * @ngdoc function
 * @name webGuideApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webGuideApp
 */
angular.module('webGuideApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
