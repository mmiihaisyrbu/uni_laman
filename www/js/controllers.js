'use strict';
  
angular.module('Authentication')

.controller('LoginController',
    ['$scope', '$location', 'AuthenticationService',
    function ($scope, $location, AuthenticationService) {
    	$scope.data = {};
		
	    $scope.login = function() {
	    	$scope.dataLoading = true;

	        AuthenticationService.Login($scope.data.username, $scope.data.password, function(response) {
                if( response.status == 201 ) {
                    $scope.dataLoading = false;
                    $location.path('/main');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
	    }
    }]);

angular.module('Main')

.controller('MainController',
    ['$scope', 'GetClientInfo',
    function ($scope, GetClientInfo) {
        $scope.data = {};

        GetClientInfo.Info(function(response) {
            console.log(response.data);
            $scope.data.company_name = response.data.data['client_name'];
            console.log(response.data.data['client_name']);
        });

        GetClientInfo.Report(function(response) {
            console.log(response.data);
            $scope.data.in_pol = response.data.data['in_pol'];
            $scope.data.sailing = response.data.data['sailing'];
            $scope.data.in_pod = response.data.data['in_pod'];
            $scope.data.on_road = response.data.data['on_road'];
        });
}]);