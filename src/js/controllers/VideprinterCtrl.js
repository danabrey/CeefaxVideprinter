CeefaxVideprinter.controller('VideprinterCtrl', ['$scope', '$http', '$interval', "PageData", function($scope, $http, $interval, PageData) {
    var limit = 15;
    var refresh = function() {
        var url = "https://sportinglife.com/api/football/vidiprinter";
        $http.get(url)
            .success(function(data){
                var totalEvents = data.lines.length;
                if (totalEvents > 0) {
                    $scope.videprinterEvents = [];
                    angular.forEach(data.lines, function(val) {
                        if (val.event_type.event_type == 'FULL_TIME') val.event_type.event_type = 'FT';
                        if (val.event_type.event_type == 'END_OF_FIRST_HALF') val.event_type.event_type = 'HT';
                        if (val.event_type.event_type == 'OWN_GOAL') val.event_type.event_type = 'OG';
                        if (val.event_type.event_type == 'PENALTY') {
                            val.event_type.event_type = 'GOAL';
                            val.comment = "PEN"
                        }
                        $scope.videprinterEvents.push(val);
                    });
                }
            });
    }
    refresh();
    $interval(refresh, 10000);
}]);
