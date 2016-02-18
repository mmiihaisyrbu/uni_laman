angular.module('app.authentication')
	.controller('LoginController', LoginController)
	.factory('AuthenticationService', AuthenticationService);

function LoginController($location, AuthenticationService, $ionicHistory) {
	//$scope.data = {username: 'test_foxx', password: 'foxx_test'};
	//$scope.data = {username: 'mcv-bus', password: 'egypt-mcv'};

    this.logIn = function() {

        AuthenticationService.LogIn(this.username, this.password, function(response) {
        	console.log('response', response);
            if( response.status == 201 ) {
            	$ionicHistory.nextViewOptions({
					disableBack: true
				});
    			window.location.reload();
                $location.path('/app/home');
            } else {
                this.error = response.message;
            }
        });
    }
}

function AuthenticationService($http, $ionicPlatform) {
    var service = {};

    service.LogIn = function(username, password, callback) {

        var url = "http://client.uni-laman.com/android/ver_2/index.php/login";

		$http({
		        method: "POST",
		        headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
		        url: url,
		        data: { 'login': username, 'pass': password }
		    })
		    .then(function(response) {
                localStorage['session_id'] = response.data['session_id'];
                localStorage['client_id'] = response.data['client_id'];

                console.log('localStorage='+JSON.stringify(localStorage));
                callback(response.data);
		    }, 
		    function(response) { // optional
                console.log(JSON.stringify(response));
			});
    };

    service.LogOut = function(callback) {

    	$http({
		        method: "POST",
		        headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
		        url: "http://client.uni-laman.com/android/ver_2/index.php/logout",
		        data: { 'session_id': localStorage['session_id'] }
		    })
		    .then(function(response) {
		        
		        $ionicPlatform.ready(function() {
			        /*window.cookies.clear(function() {
					    console.log('Cookies cleared!');
					});*/
			    });
			    localStorage.clear();

                callback(response.data);
		    }, 
		    function(response) { // optional
                // bad login
			});
    }

    return service;
}