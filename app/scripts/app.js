'use strict';

angular.module('elasticsearchAngularjsPoweredApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'elasticjs.service',
  'infinite-scroll',
  'wu.masonry'
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
