'use strict';
  
angular.module('Authentication')

.controller('LoginController',
    ['$scope', '$location', 'AuthenticationService',
    function ($scope, $location, AuthenticationService) {
    	$scope.data = {};
		
		// reset login status
        //AuthenticationService.ClearCredentials();

	    $scope.login = function() {
	    	$scope.dataLoading = true;
	        console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
	        AuthenticationService.Login($scope.data.username, $scope.data.password, function(response) {
                if(response.success) {
                    //AuthenticationService.SetCredentials(username, password);
                    $location.path('/main');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
	    }
    }]);