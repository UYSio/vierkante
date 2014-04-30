'use strict';

angular.module('elasticsearchAngularjsPoweredApp')
  .controller('MainCtrl', ['$scope', 'ejsResource', '$q', function ($scope, ejsResource, $q) {
    
    var ejs = ejsResource('https://opyate.west-eu.azr.facetflow.io');
    var query = ejs.QueryStringQuery().defaultField('message');
    var client = ejs.Request()
        .indices('my_index');
    $scope.resultsArr = [];
 
    $scope.search = function() {
        $scope.resultsArr = [];
        var results = client
            .query(query.query($scope.queryTerm || '*'))
            .fields(['message', 'user', 'post_date'])
            .doSearch();
        $q.when(results).then(function(result) {
          console.log(result);
          $scope.resultsArr.push(result);        
        });
    };

  }]);

