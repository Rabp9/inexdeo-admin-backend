'use strict';

describe('Controller: FondosCtrl', function () {

  // load the controller's module
  beforeEach(module('inexdeoAdminApp'));

  var FondosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FondosCtrl = $controller('FondosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FondosCtrl.awesomeThings.length).toBe(3);
  });
});
