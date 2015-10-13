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
      templateUrl: 'views/component/page.html',
      controller: 'ComponentPageCtrl'
    })
    .when('/catalogue', {
      templateUrl: 'views/component/catalogue.html',
      controller: 'ComponentCatalogueCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
