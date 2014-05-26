'use strict';

angular.module('elasticsearchAngularjsPoweredApp')
  .service('configService', ['$http', '$q', function Apitoken($http, $q) {

    // load the API token from our config service
    var future = $q.defer();
    $http.get('http://configserver.local').success(function(result) {
      future.resolve(result);
    });

    return {
      config: future.promise
    };
  }]);
