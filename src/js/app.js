var CeefaxVideprinter = angular.module('CeefaxVideprinter', ['ui.router']);

CeefaxVideprinter.run(function(PageData, PageNumberInputService, $state, $rootScope, $window, $location) {
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function globalKeyPress(e) {
        var input = String.fromCharCode(e.charCode);
        if (isNumeric(input)) {
            PageNumberInputService.pushToPageNumberInput(input);
            if (PageNumberInputService.isFull()) {
                var newPageNumber = PageNumberInputService.pageNumberInput;
                PageNumberInputService.clearPageNumberInput();
                $state.go(newPageNumber);
            }
        }
  }
  function globalKeyDown(e) {
      var keyCode = e.keyCode;
      var currentPageId = parseInt($state.params.pageId);
      switch (keyCode) {
          case 37:
              var newPageId = currentPageId - 1;
              break;
          case 39:
              var newPageId = currentPageId + 1;
              break;
      }
      if (angular.isDefined(newPageId)) {
          $state.go('page', {pageId: newPageId});
      }
  }
    // Clear the page number input if the route isn't found
    $rootScope.$on('$stateNotFound',
        function(event, unfoundState, fromState, fromParams){
            PageNumberInputService.clearPageNumberInput();
            event.preventDefault();
    });

    $rootScope.$on('$stateChangeSuccess',
        function(event){
           if (!$window.ga)
               return;
           $window.ga('send', 'pageview', { page: $location.path() });
    });
  // register the handler
  document.addEventListener('keypress', globalKeyPress, false);
  document.addEventListener('keydown', globalKeyDown, false);
});

CeefaxVideprinter.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/337");
  $stateProvider
    .state('302', {
      url: "/302",
      templateUrl: 'views/about.html',
      onEnter: function(PageData) {
          PageData.setPageNumber(302);
          PageData.setPageTitle('About');
      }
    })
    .state('337', {
      url: "/337",
      controller: 'VideprinterCtrl',
      templateUrl: 'views/videprinter.html',
      onEnter: function(PageData) {
          PageData.setPageNumber(337);
          PageData.setPageTitle('Football');
      }
    })
});

CeefaxVideprinter.filter('trust', function($sce) { return $sce.trustAsHtml; });
CeefaxVideprinter.filter('normaliseQuotes', function(){
      return function(text) {
           text = text.replace(/\u2019|\u2018/g, '\'');
           text = text.replace(/\u201C|\u201D/g, '"');
           return text;
          };
    });
CeefaxVideprinter.filter('fillTail', function(){
      return function(value,fillToLength,fillChar) {
            while(value.length < fillToLength){
              value = value + fillChar;
            }
            return value;
      };
    });
CeefaxVideprinter.filter('cut', function () {
    return function (value, max, wordwise, tail, tailFill) {
        var tail = tail || '';
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }
        if (tailFill) {
          while(value.length < max){
            value = value + tailFill;
          }
          return value;
        }
        return value + (tail);
    };
});
