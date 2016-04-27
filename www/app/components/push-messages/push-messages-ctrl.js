angular.module('app.push-messages')
	.controller('PushMessagesCtrl', PushMessagesCtrl)
	.factory('GetPushMessages', GetPushMessages);

function PushMessagesCtrl($scope, GetPushMessages) {
	$scope.messages = [];

	$scope.loadPushMessages = function() {
		GetPushMessages.MessagesList(function(response) {
			$scope.messages = response.data.data;
		});
	}
	$scope.loadPushMessages();
}

function GetPushMessages($http) {
    var service = {};

    service.MessagesList = function(callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: server_url+"/push-messages/"+localStorage['session_id']
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