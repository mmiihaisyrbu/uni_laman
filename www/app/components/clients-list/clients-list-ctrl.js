angular.module('app.clients-list')
	.controller('ClientsListController', ClientsListController)
	.factory('GetClients', GetClients);


function ClientsListController($scope, GetClients, $ionicModal, $stateParams) {
	$scope.clients = [];
	$scope.search_filters = {};
  $scope.offset = 0;
  $scope.offset_p = '';
  $scope.is_last = false;
  $scope.order_by = 1;
  $scope.activeLoad = false;
	$scope.show_search_bar = false;
	$scope.extended_search = '';

  $scope.loadClientsList = function(more, clear_filtres) {
		var params = '';
		more = typeof more !== 'undefined' ? more : false;
		clear_filtres = typeof clear_filtres !== 'undefined' ? clear_filtres : false;

		if ( clear_filtres === true ) {
			$scope.extended_search = '';
		}

		angular.forEach($scope.search_filters, function(value, key) {
		  console.log(key + ': ' + value);
			params += '&'+key+'='+value;
		});

		if ( $stateParams.extended_search != undefined ) {
			$scope.extended_search = $stateParams.extended_search;
		}

		if ( $scope.extended_search != '' ) {
			params += '&extended_search=' + $scope.extended_search;
		}

  	if ( more === true && $scope.clients !== [] ) {
      $scope.offset++; $scope.offset_p = '&offset='+$scope.offset;
    } else {
      $scope.offset_p = '';
      $scope.is_last = false;
      $scope.clients = [];
    }

    GetClients.ClientsList('/q=0'+params+$scope.offset_p+'&order_by='+$scope.order_by, function(response) {
      if ( response.data.data.length > 0 ) {
      	$scope.clients = $scope.clients.concat(response.data.data);
				$scope.clients['params'] = '&params=' + encodeURIComponent(params);
				if ( $scope.clients[0].count_rows <= 20 ) {
					$scope.is_last = true;
				}
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

  //$scope.loadClientsList();

	$ionicModal.fromTemplateUrl('app/components/clients-list/clients-list-filters.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openFilters = function() {
    $scope.modal.show();
  };

	$scope.applyFilters = function() {
		$scope.modal.hide();
		$scope.loadClientsList();
	};

	$scope.showSerchBar = function() {
		$scope.show_search_bar = !$scope.show_search_bar;
		if ( !$scope.show_search_bar ) {
			$scope.loadClientsList();
			$scope.offset = 0;
		}
	};
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
