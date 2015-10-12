'use strict';

/**
 * 创建Angular App
 * @link webGuideApp
 * @author Linder linder0209@126.com
 * */
angular.module('webGuideApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap'])
  .config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/component/list.html',
      controller: 'ComponentListCtrl'
    })
    .when('/page', {
      templateUrl: 'views/component/page.html',
      controller: 'ComponentPageCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
