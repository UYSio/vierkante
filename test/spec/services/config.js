'use strict';

describe('Service: Apitoken', function () {

  // load the service's module
  beforeEach(module('elasticsearchAngularjsPoweredApp'));

  // instantiate service
  var Apitoken;
  beforeEach(inject(function (_Apitoken_) {
    Apitoken = _Apitoken_;
  }));

  it('should do something', function () {
    expect(!!Apitoken).toBe(true);
  });

});
