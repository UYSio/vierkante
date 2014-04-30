'use strict';

angular.module('elasticsearchAngularjsPoweredApp')
  .controller('MainCtrl', ['$scope', 'ejsResource', '$q', function ($scope, ejsResource, $q) {
    
    var ejs = ejsResource('https://opyate.west-eu.azr.facetflow.io');
    var query = ejs.QueryStringQuery();
    var client = ejs.Request()
        .indices('my_index');
    $scope.resultsArr = [];
 
    $scope.search = function() {
        $scope.resultsArr = [];
        var results = client
            .query(query.query($scope.queryTerm || '*'))
            .doSearch();
        $q.when(results).then(function(result) {
          $scope.resultsArr.push(result);        
        });
    };

    $scope.search();

  }]);

