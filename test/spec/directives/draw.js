'use strict';

describe('Directive: draw', function () {

  // load the directive's module
  beforeEach(module('elasticsearchAngularjsPoweredApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<draw></draw>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the draw directive');
  }));
});
