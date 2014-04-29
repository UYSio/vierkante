'use strict';

describe('Controller: OracleCtrl', function () {

  // load the controller's module
  beforeEach(module('elasticsearchAngularjsPoweredApp'));

  var OracleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OracleCtrl = $controller('OracleCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});