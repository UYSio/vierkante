'use strict';

angular.module('elasticsearchAngularjsPoweredApp')
  .controller('MainCtrl', ['$scope', 'ejsResource', '$q', function ($scope, ejsResource, $q) {
    
    var ejs = ejsResource('https://opyate.west-eu.azr.facetflow.io');
    var query = ejs.QueryStringQuery();
    var client = ejs.Request()
        .indices('my_index');
    $scope.docs = [];

    $scope.perPage = 64;
    $scope.page = 0;
    $scope.reachedEnd = false; // an infinite scroll optimisation
 
    $scope.showMore = function () {
      if (!$scope.reachedEnd) {
        var page = $scope.docs.length / $scope.perPage;
        // console.log('show more', 'docs.len', $scope.docs.length, 'page', page);
        $scope.page = page;
        $scope.search($scope.page*$scope.perPage);
      } else {
        // console.log('no more results');
      }
    };
 
    $scope.search = function(offset) {
      // console.log('Search offset', offset, 'Result size', $scope.docs.length);
      var results = client
          .query(query.query($scope.queryTerm || '*'))
          .from(offset)
          .size($scope.perPage)
          .doSearch();
      $q.when(results).then(function(result) {
        if ($scope.perPage !== result.hits.hits.length) {
          $scope.reachedEnd = true;
        }
        result.hits.hits.forEach(function(v) { $scope.docs.push(v); }, this);
      });
    };

    // Un-comment this if search isn't triggered by infinite-scroll
    //$scope.search($scope.page);

  }]);

