'use strict';

angular.module('elasticsearchAngularjsPoweredApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'elasticjs.service',
  'infinite-scroll',
  'wu.masonry',
  'base64'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/admin/:key', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
