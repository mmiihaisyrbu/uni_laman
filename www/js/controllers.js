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

	        AuthenticationService.Login($scope.data.username, $scope.data.password, function(response) {
                if( response.status == 201 ) {
                    //AuthenticationService.SetCredentials(username, password);
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

.controller('MainController', ['$scope', function($scope) {
    
}]);