angular.module('app.home')
	.controller('HomeController', HomeController)
	.factory('GetCustomerInfo', GetCustomerInfo);

function HomeController($scope, GetCustomerInfo, $location, $translate) {
	$scope.loadCustomerSettings = function() {
		GetCustomerInfo.GetCustomerSettings(function(response) {
			$translate.use(response.language_code);
			console.log(response);
		});
	}

	$scope.loadCustomerSettings();
    //$scope.data = [];

    /*$scope.getCustomerInfo = function() {
        GetCustomerInfo.Info(function(response) {
            $scope.data.company_name = response.data.data['customer_name'];
        });
    }*/

    /*$scope.loadReport = function() {
        GetCustomerInfo.Report(function(response) {
            $scope.data.wait_sailing = response.data.data['wait_sailing'];
            $scope.data.sailing = response.data.data['sailing'];
            $scope.data.arrived = response.data.data['arrived'];
            $scope.data.closed = response.data.data['closed'];
        });
    }

    $scope.loadReport();*/
    //$scope.getCustomerInfo();

    /*$scope.showContainers = function(cont_status) {
    	window.localStorage['cont_status'] = '/status='+cont_status;
    	window.localStorage['from_to_cont'] = 'home';
    	$location.path('/app/containers');
    };*/
}

function GetCustomerInfo($http) {
    var service = {};

    service.Info = function(callback) {
        var info_mode = 'client_info';
        if ( localStorage['mode'] === 'client' ) {
            info_mode = 'client_info';
        } else if ( localStorage['mode'] === 'manager' ) {
            info_mode = 'manager_info';
        }

        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: server_url+"/"+info_mode+"/"+localStorage['session_id']
            })
            .then(function(data, status, headers, config) {
                console.log(JSON.stringify(data));
                callback(data);
            },
            function(response) { // optional
                // bad request
            });
    };

		service.GetCustomerSettings = function(callback) {
			$http({
							method: "GET",
							headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
							url: server_url+"/customer-settings/"+localStorage['session_id']
					})
					.then(function(data, status, headers, config) {
							console.log(JSON.stringify(data));
							callback(data.data.data);
					},
					function(response) { // optional
							// bad request
					});
		};

    service.Report = function(callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: server_url+"/report/"+localStorage['session_id']
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
