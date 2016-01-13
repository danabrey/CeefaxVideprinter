CeefaxVideprinter.controller('VideprinterCtrl', ['$scope', '$http', '$interval', "PageData", function($scope, $http, $interval, PageData) {
    var limit = 15;
    var refresh = function() {
        var url = "//polling.bbc.co.uk/sport/shared/football/videprinter.json?callback=JSON_CALLBACK";
        $http.jsonp(url)
            .success(function(data){
                var totalEvents = data.data.payload.events.length;
                if (totalEvents > 0) {
                    $scope.videprinterEvents = [];
                    angular.forEach(data.data.payload.events.reverse().slice(0,limit-1), function(val, key) {
                        if (val.label == 'FULL-TIME') val.label = 'FT';
                        if (val.label == 'HALF-TIME') val.label = 'HT';
                        if (val.label == 'GOAL!') val.label = 'GOAL';
                        if (val.label == 'RED CARD!') val.label = 'RED';
                        $scope.videprinterEvents.push(val);
                    });
                }
            });
    }
    refresh();
    $interval(refresh, 10000);
}]);
