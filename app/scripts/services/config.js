'use strict';

angular.module('elasticsearchAngularjsPoweredApp')
  .service('configService', ['$http', '$q', function Apitoken($http, $q) {

    var extract = function (result) {
      var conf = {};
      conf.apiToken = result.apiToken;
      return conf;
    };
    // load the API token from our config service
    var future = $q.defer();
    $http.get('http://configserver.local').success(function(result) {
      future.resolve(extract(result));
    });

    return {
      config: future.promise
    };
  }]);
