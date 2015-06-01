'use strict';

/**
 * 创建Angular App
 * @link webGuideApp
 * @author Linder linder0209@126.com
 * @createdDate 2015-6-1
 * */
angular.module('webGuideApp', ['ngRoute', 'ngAnimate', 'ngSanitize']);
  /*.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/html', {
        templateUrl: '../docs/blogmanage/publish.html',
        controller: 'PublishCtrl'
      })
      .when('/css', {
        templateUrl: '../docs/blogmanage/publish.html',
        controller: 'PublishCtrl'
      })
      .otherwise({
        redirectTo: '/article'
      });
  }]);*/