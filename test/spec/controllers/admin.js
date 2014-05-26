'use strict';

describe('Controller: AdminCtrl', function () {

  // load the controller's module
  beforeEach(module('elasticsearchAngularjsPoweredApp',
    [
      'infinite-scroll',
      'wu.masonry',
      'base64'
    ]));

  var AdminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminCtrl = $controller('AdminCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
  });
});
