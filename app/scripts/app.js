'use strict';

angular.module('elasticsearchAngularjsPoweredApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'elasticjs.service',
  'infinite-scroll'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
