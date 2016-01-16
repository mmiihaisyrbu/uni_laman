angular.module('app.home')
	.controller('HomeController', HomeController)
	.factory('GetClientInfo', GetClientInfo);

function HomeController($scope, GetClientInfo, $location) {
    $scope.data = [];

    $scope.getClientInfo = function() {
        GetClientInfo.Info(function(response) {
            $scope.data.company_name = response.data.data['client_name'];
        });
    }

    $scope.loadReport = function() {
        GetClientInfo.Report(function(response) {
            $scope.data.wait_sailing = response.data.data['wait_sailing'];
            $scope.data.sailing = response.data.data['sailing'];
            $scope.data.arrived = response.data.data['arrived'];
            $scope.data.closed = response.data.data['closed'];
        });
    }

    $scope.loadReport();
    $scope.getClientInfo();

    $scope.showContainers = function(cont_status) {
    	window.localStorage['cont_status'] = '/status='+cont_status;
    	window.localStorage['from_to_cont'] = 'home';
    	$location.path('/app/containers');
    };
}

function GetClientInfo($http) {
    var service = {};

    service.Info = function(callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: "http://client.uni-laman.com/android/ver_2/index.php/client_info/"+localStorage['session_id']
            })
            .then(function(data, status, headers, config) {
                console.log(JSON.stringify(data));
                callback(data);
            }, 
            function(response) { // optional
                // bad request
            });
    };

    service.Report = function(callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: "http://client.uni-laman.com/android/ver_2/index.php/report/"+localStorage['session_id']
            })
            .then(function(data, status, headers, config) {
                console.log(JSON.stringify(data));
                callback(data);
            }, 
            function(response) { // optional
                // bad request
            });
    };

    return service;
}