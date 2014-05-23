'use strict';

angular.module('elasticsearchAngularjsPoweredApp')
  .directive('category', ['$compile', '$http', '$templateCache', function ($compile, $http, $templateCache) {

  var getTemplate = function(contentType) {
    var templateLoader,
    baseUrl = 'views/rss/',
    templateMap = {
      tweet: '_twitter.html',
      image: '_image.html',
      instagram: '_image.html',
      flickr: '_image.html'
      // TODO youtube, post
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
