'use strict';

angular.module('elasticsearchAngularjsPoweredApp')
  .controller('AdminCtrl', ['$scope', 'ejsResource', '$q', '$base64', 'configService', '$routeParams', '$window',
      function ($scope, ejsResource, $q, $base64, configService, $routeParams, $window) {
    
    $q.when(configService.config).then(function (result) {

      if ($routeParams.key === result.admin) {

        var config = {
          server: 'https://opyate.west-eu.azr.facetflow.io',
          headers: {
            'Authorization': 'Basic ' + $base64.encode(result.apiToken + ':')
          }
        };
        var ejs = ejsResource(config);

        $scope.thing = {
          _source: {
            stars: 3
          }
        };
        $scope.upsert = function() {
          console.log('scope.thing', $scope.thing);
          // See https://gist.github.com/pulkitsinghal/5430444
          var doc = ejs.Document('my_index', $scope.thing._type, $scope.thing._id)
            .source($scope.thing._source);
          doc.doIndex(function (results) {
            console.log('index', results);
            $scope.thing._id = results._id;
            $scope.thing._version = results._version;
          });
        };

        // templates
        var loc = 'views/admin/';
        $scope.templates =
            [ { name: 'Review', url: loc + '_review.html'},
              { name: 'Thought', url: loc + 'admin/_thought.html'} ];
        $scope.template = $scope.templates[0];
      } else {
        $window.location.href = '/';
        console.log('Not authorised');
      }
    });

  }]);

