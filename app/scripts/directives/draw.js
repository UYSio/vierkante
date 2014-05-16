'use strict';

// from https://coderwall.com/p/mgtrkg

angular.module('elasticsearchAngularjsPoweredApp')
  .directive('draw', ['$compile', '$http', '$templateCache', function ($compile, $http, $templateCache) {

  var getTemplate = function(contentType) {
    var templateLoader,
    baseUrl = 'views/',
    templateMap = {
      post: '_post.html',
      posts: '_post.html',
      image: '_image.html',
      photo: '_image.html',
      video: '_video.html',
      tweet: '_tweet.html',
      link: '_link.html',
      audio: '_audio.html',
      rss: '_rss.html'
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

    // if contentType is 'any', look at the category field for hints.
    var contentType = scope.thing._type;
    if (contentType === 'any') {
      contentType = scope.thing._source.category;
    }
    var loader = getTemplate(contentType);

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
