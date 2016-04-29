angular.module('app.clients-list')
	.controller('ClientsListController', ClientsListController)
	.factory('GetClients', GetClients);


function ClientsListController($scope, GetClients) {
	$scope.clients = [];
    $scope.offset = 0;
    $scope.offset_p = '';
    $scope.is_last = false;
    $scope.order_by = 1;
    $scope.activeLoad = false;

	var params = localStorage['cont_status']||"/q=0";

    $scope.loadClientsList = function(more) {
        console.log(more);
    	more = typeof more !== 'undefined' ? more : false;

    	if ( more === true && $scope.clients !== [] ) {
            $scope.offset++; $scope.offset_p = '&offset='+$scope.offset; 
        } else {
            $scope.offset_p = '';
            $scope.is_last = false;
            $scope.clients = [];
        }

        GetClients.ClientsList(params+$scope.offset_p+'&order_by='+$scope.order_by, function(response) {
            if ( response.data.data.length > 0 ) {
            	$scope.clients = $scope.clients.concat(response.data.data);
            } else {
            	$scope.is_last = true;
            }

			$scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.activeLoad = true;
        });
    }

    $scope.expandItem = function(client) {
        angular.forEach($scope.clients, function (currentClient) {
            currentClient.showfull = currentClient === client && !currentClient.showfull;
        });
    };

    $scope.loadClientsList();
}

function GetClients($http) {
	var service = {};

	service.ClientsList = function(params, callback) {
		$http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: server_url+"/clients-list/"+localStorage['session_id']+params
            })
            .then(function(data, status, headers, config) {
                console.log(JSON.stringify(data));
                callback(data);
            }, 
            function(response) { // optional
                // bad request
            });
	}

	return service;
}