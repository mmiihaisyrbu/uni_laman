angular.module('app.containers')
	.controller('ContainersController', ContainersController)
	.factory('GetContainers', GetContainers);

function ContainersController($scope, GetContainers, ModalService, $location) {
    $scope.containers = [];
    $scope.offset = 0;
    $scope.offset_p = '';
    $scope.is_last = false;

    if ( window.localStorage['from_to_cont'] != 'home' ) { window.localStorage.removeItem('cont_status'); }
    var params = window.localStorage['cont_status']||"/q=0";

    $scope.loadContainers = function(more) {
    	more = typeof more !== 'undefined' ? more : false;

    	if ( more == true ) { $scope.offset++; $scope.offset_p = '&offset='+$scope.offset; };

        GetContainers.ContainersList(params+$scope.offset_p, function(response) {
            if ( response.data.data.length > 0 ) {
            	$scope.containers = $scope.containers.concat(response.data.data);
            } else {
            	$scope.is_last = true;
            }

			$scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    $scope.loadContainers();
    window.localStorage['from_to_cont'] = ' ';

    $scope.openModal = function(container) {
    	$scope.container = container;
		/*ModalService
		.init('templates/container-info.html', $scope)
		.then(function(modal) {
			modal.show();
		});*/
		$location.path('/app/container-info');
	};
}

function GetContainers($http) {
    var service = {};

    service.ContainersList = function(params, callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: "http://client.uni-laman.com/android/ver_2/index.php/containers/"+localStorage['session_id']+params
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