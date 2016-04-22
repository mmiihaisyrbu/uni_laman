angular.module('mail')
	.factory('EmailService', EmailService);

function EmailService($http) {
    var service = {};

    service.SendEmail = function(to, subject, message, callback) {
        $http({
                method: "POST",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: server_url+"/mail",
                data: { 'session_id': localStorage['session_id'], 'to': to, 'subject': subject, 'message': message }
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