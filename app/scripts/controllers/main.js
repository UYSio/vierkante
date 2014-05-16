'use strict';

angular.module('elasticsearchAngularjsPoweredApp')
  .controller('MainCtrl', ['$scope', 'ejsResource', '$q', function ($scope, ejsResource, $q) {
    
    var ejs = ejsResource('https://opyate.west-eu.azr.facetflow.io');
    var query = ejs.QueryStringQuery();
    var client = ejs.Request()
        .indices('my_index');
    $scope.resultsArr = [];

    $scope.perPage = 32;
    $scope.page = 0;
 
    $scope.showMore = function () {
        $scope.page += 1;
        $scope.search($scope.page*$scope.perPage);
      };
 
    $scope.search = function(offset) {
        $scope.resultsArr = [];
        var results = client
            .query(query.query($scope.queryTerm || '*'))
            .from(offset)
            .size($scope.perPage)
            .doSearch();
        $q.when(results).then(function(result) {
          $scope.resultsArr.push(result);
        });
      };

    $scope.search($scope.page);

  }]);

