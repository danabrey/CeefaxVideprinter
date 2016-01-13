CeefaxVideprinter.controller('HeaderCtrl', ['$scope', "PageData", "$location", "PageNumberInputService",  function($scope, PageData, $location, PageNumberInputService) {
    $scope.PageData = PageData;
    $scope.PageNumberInputService = PageNumberInputService;
}]);
