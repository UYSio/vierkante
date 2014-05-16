'use strict';

angular.module('elasticsearchAngularjsPoweredApp')
  .directive('category', ['$compile', '$http', '$templateCache', function ($compile, $http, $templateCache) {

  var getTemplate = function(contentType) {
    var templateLoader,
    baseUrl = 'views/rss/',
    templateMap = {
      tweet: '_twitter.html',
      // TODO replace image with something more specific, e.g. instragram, flickr, etc.
      image: '_image.html'
    };

    var templateType = templateMap[contentType];
    var templateUrl = baseUrl;
    if (typeof templateType === 'undefined') {
      templateUrl += '_undefined.html';
    } else {
      templateUrl += templateType;
    }
    templateLoader = $http.get(templateUrl, {cache: $templateCache});
    return templateLoader;
  };

  var linker = function(scope, element) {
    var loader = getTemplate(scope.thing);

    loader.success(function(html) {
        element.html(html);
      }).then(function () {
        element.replaceWith($compile(element.html())(scope));
      });
  };

  return {
      restrict: 'E',
      scope: {
        thing: '='
      },
      replace: true,
      link: linker
    };
}]);
