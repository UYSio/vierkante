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
      photo: '_photo.html',
      video: '_video.html',
      tweet: '_tweet.html',
      link: '_link.html',
      audio: '_audio.html'
    };
    var templateUrl = baseUrl + templateMap[contentType];
    templateLoader = $http.get(templateUrl, {cache: $templateCache});
    return templateLoader;
  };

  var linker = function(scope, element, attrs) {

    var loader = getTemplate(scope.thing._type);

    var promise = loader.success(function(html) {
        element.html(html);
    }).then(function (response) {
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
