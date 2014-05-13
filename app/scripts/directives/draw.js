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
      audio: '_audio.html'
    };
    var templateType = templateMap[contentType];
    if (typeof templateType === 'undefined') {
      var templateUrl = baseUrl + "_undefined.html";
    } else {
      var templateUrl = baseUrl + templateType;
    }
    templateLoader = $http.get(templateUrl, {cache: $templateCache});
    return templateLoader;
  };

  var linker = function(scope, element) {

    var loader = getTemplate(scope.thing._type);

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
