'use strict';

describe('Controller: FondosEditCtrl', function () {

  // load the controller's module
  beforeEach(module('inexdeoAdminApp'));

  var FondosEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FondosEditCtrl = $controller('FondosEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FondosEditCtrl.awesomeThings.length).toBe(3);
  });
});
