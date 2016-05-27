angular.module('app.push-messages')
	.controller('PushMessagesCtrl', PushMessagesCtrl)
	.factory('GetPushMessages', GetPushMessages);

function PushMessagesCtrl($scope, GetPushMessages, $location) {
	$scope.messages = [];

	$scope.loadPushMessages = function() {
		if ( ionic.Platform.isAndroid() || ionic.Platform.isIOS() ) {
			cordova.plugins.notification.badge.clear();
		}
		GetPushMessages.MessagesList(function(response) {
			$scope.messages = response.data.data;
		});
	}

	$scope.$on('$ionicView.enter', function(){
		console.log("push view enter");
		$scope.loadPushMessages();
	});

	$scope.goToOrder = function(order_no) {
		if ( localStorage['mode'] == 'manager' ) {
			$location.path('/app/clients-list').search({'extended_search': order_no});
		} else {
			$location.path('/app/containers').search({'extended_search': order_no});
		}
	}
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
