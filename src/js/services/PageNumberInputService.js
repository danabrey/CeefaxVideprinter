CeefaxVideprinter.service("PageNumberInputService", ["$rootScope", function($rootScope){
  this.pageNumberInput = "";
  this.isFull = function() {
      return this.pageNumberInput.length >= 3;
  }
  this.pushToPageNumberInput = function(input) {
      this.pageNumberInput += input;
      // Must run global digest cycle here, as otherwise change in value is only picked up on next cycle
      $rootScope.$apply();
  }
  this.clearPageNumberInput = function() {
      this.pageNumberInput = "";
  }
}]);
