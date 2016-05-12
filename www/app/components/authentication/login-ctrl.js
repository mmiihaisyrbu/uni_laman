angular.module('app.authentication')
	.controller('LoginController', LoginController)
	.factory('AuthenticationService', AuthenticationService);

function LoginController($location, AuthenticationService, $ionicHistory) {
    this.logIn = function() {

        AuthenticationService.LogIn(this.username, this.password, function(response) {
        	console.log('response', response);
            if( response.status == 201 ) {
							$ionicHistory.nextViewOptions({
								disableBack: true
							});
							if ( ionic.Platform.isAndroid() ) {
	    					window.location.reload();
							}
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

		$http({
		        method: "POST",
		        headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
		        url: server_url+"/login",
		        data: { 'login': username, 'pass': password, 'device_token': localStorage['device_token']||'' }
		    })
		    .then(function(response) {
                localStorage['session_id'] = response.data['session_id'];
                localStorage['mode'] = response.data['mode'];

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
		        url: server_url+"/logout",
		        data: { 'session_id': localStorage['session_id'] }
		    })
		    .then(function(response) {

					$ionicPlatform.ready(function() {
						window.cookies.clear(function() {
					    console.log('Cookies cleared!');
						});
			    });

			    window.localStorage.removeItem("session_id");
			    window.localStorage.removeItem("mode");

          callback(response.data);
		    },
		    function(response) { // optional
                // bad login
			});
    }

    return service;
}
