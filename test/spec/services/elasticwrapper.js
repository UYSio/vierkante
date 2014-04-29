'use strict';

describe('Service: Elasticwrapper', function () {

  // load the service's module
  beforeEach(module('elasticsearchAngularjsPoweredApp'));

  // instantiate service
  var Elasticwrapper;
  beforeEach(inject(function (_Elasticwrapper_) {
    Elasticwrapper = _Elasticwrapper_;
  }));

  it('should do something', function () {
    expect(!!Elasticwrapper).toBe(true);
  });

});
