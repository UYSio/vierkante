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

    $scope.removeDoc = function(doc) {
      console.log('DELETE', doc);
      var delQuery = ejs.TermQuery();
      // we're looking to send this:
      // -d '{"query":{"term":{"_id":"1hBxs5VuSkmEl8K3e4_UIA"}}}'
      delQuery.field('_id');
      delQuery.term(doc._id);
      //delQuery.query('_id:'+doc._id);
      console.log('QUERY', delQuery.toString());
      client
        .query(delQuery)
        .doDeleteByQuery(function() {
        console.log('delete success');
      }, function(e) {
        console.log('delete error', e);
      });
    };

  }]);

