'use strict';
  
angular.module('Authentication')

.factory('AuthenticationService',
    ['$http', '$rootScope',
    function ($http, $rootScope) {
        var service = {};
 
        service.Login = function (username, password, callback) { 

            var url = "http://client.uni-laman.com/android/ver_2/index.php/login";

			$http({
			        method: "POST",
			        headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
			        url: url,
			        data: { 'login': username, 'pass': password }
			    })
			    .then(function(response) {
			        console.log(response.data);
                    /*$.each(response.data, function( index, value ) {
                        console.log( index + ": " + value );
                    });*/
                    localStorage['session_id'] = response.data['session_id'];
                    localStorage['client_id'] = response.data['client_id'];
                    callback(response.data);
			    }, 
			    function(response) { // optional
                    // bad login
				});
        };
  
        return service;
    }]);