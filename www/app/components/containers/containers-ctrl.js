angular.module('app.containers')
	.controller('ContainersController', ContainersController)
	.controller('containerDetailsController', containerDetailsController)
	.factory('GetContainers', GetContainers)
	.service('ContainerDetailsStorage', ContainerDetailsStorage);

function ContainerDetailsStorage() {
    var _container = [];
    return {
        setData: function (container) {
            _container = container;
        },
        getData: function () {
            return _container;
        }
    }
}

function ContainersController($scope, GetContainers, $location, ContainerDetailsStorage, $ionicPopover, $stateParams) {
    $scope.containers = [];
    $scope.offset = 0;
    $scope.offset_p = '';
    $scope.is_last = false;
    $scope.order_by = 1;
    $scope.activeLoad = false;
		$scope.extended_search = '';

    $scope.sortList = [{
        name: 'ETA_MAX_TO_MIN',
        value: 1
    }, {
        name: 'ETA_MIN_TO_MAX',
        value: 2
    }, {
        name: 'ETD_MAX_TO_MIN',
        value: 3
    }, {
        name: 'ETD_MIN_TO_MAX',
        value: 4
    }];

    $scope.loadContainers = function(more) {
			var params = "/q=0";
			
    	more = typeof more !== 'undefined' ? more : false;

      if ( $stateParams.archive != undefined ) {
        params += "&archive=" + $stateParams.archive;
      }

      if ( $stateParams.client_id != undefined ) {
        params += "&orderer=" + $stateParams.client_id;
      }
			if ( $stateParams.params != undefined ) {
				params += decodeURIComponent($stateParams.params);
			}
			if ( $scope.extended_search != '' ) {
				params += '&extended_search=' + $scope.extended_search;
			}

    	if ( more === true && $scope.containers !== [] ) {
        $scope.offset++; $scope.offset_p = '&offset='+$scope.offset;
	    } else {
        $scope.offset_p = '';
        $scope.is_last = false;
        $scope.containers = [];
      }

      GetContainers.ContainersList(params+$scope.offset_p+'&order_by='+$scope.order_by, function(response) {
        if ( response.data.data.length > 0 ) {
        	$scope.containers = $scope.containers.concat(response.data.data);
        } else {
        	$scope.is_last = true;
        }

				$scope.$broadcast('scroll.infiniteScrollComplete');
	      $scope.activeLoad = true;
			});
    }

    //$scope.loadContainers();

    $scope.openContainerDetails = function(container) {
        localStorage['cont_id'] = container.cont_id;
        console.log(localStorage['cont_id']);
    	ContainerDetailsStorage.setData(container);
		$location.path('/app/container-info');
	};

    /*$scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.items,
        update: function (filteredItems, filterText) {
          $scope.items = filteredItems;
          if (filterText) {
            console.log(filterText);
          }
        }
      });
    };*/
    $ionicPopover.fromTemplateUrl('app/components/containers/containers-sort.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });

    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function() {
    // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
    // Execute action
    });

    $scope.changedSort = function(order_by) {
        $scope.closePopover();
        $scope.order_by = order_by;
        $scope.loadContainers();
    }
		$scope.showSerchBar = function() {
			$scope.show_search_bar = !$scope.show_search_bar;
			if ( !$scope.show_search_bar ) {
				$scope.loadContainers();
			}
		};
}

function GetContainers($http) {
    var service = {};

    service.ContainersList = function(params, callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: server_url+"/containers/"+localStorage['session_id']+params
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

function containerDetailsController($scope, ContainerDetailsStorage, $cordovaClipboard, $cordovaToast, $translate) {
	$scope.container = ContainerDetailsStorage.getData();

	$translate('COPIED_SUCCESSFULLY').then(function (copied_successfully) {
    $scope.copied_successfully = copied_successfully;
  });

	$scope.showToast = function(text) {
		$cordovaToast
	    .show(text, 'short', 'bottom')
	    .then(function(success) {
	      // success
	    }, function (error) {
	      // error
	    });
	}

	$scope.copyToClipboard = function(text, copied_field) {
		$translate(copied_field).then(function (copied_field) {
	    $scope.copied_field = copied_field;
	  });

		$cordovaClipboard
	  .copy(text)
	  .then(function () {
	    // success
			$scope.showToast($scope.copied_field + ' ' + $scope.copied_successfully);
	  }, function () {
	    // error
	  });
	}
}
