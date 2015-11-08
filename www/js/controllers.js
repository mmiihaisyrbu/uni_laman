'use strict';
  
angular.module('Authentication')

.controller('LoginController',
    ['$scope', '$location', 'AuthenticationService',
    function($scope, $location, AuthenticationService) {
    	$scope.data = {};
		
	    $scope.login = function() {
	    	$scope.dataLoading = true;

	        AuthenticationService.Login($scope.data.username, $scope.data.password, function(response) {
                if( response.status == 201 ) {
                    $scope.dataLoading = false;
                    $location.path('/main');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
	    }
    }]);

angular.module('Main')

.controller('MainController',
    ['$scope', 'GetClientInfo',
    function($scope, GetClientInfo) {
        $scope.data = {};

        GetClientInfo.Info(function(response) {
            console.log(response.data);
            $scope.data.company_name = response.data.data['client_name'];
        });

        GetClientInfo.Report(function(response) {
            console.log(response.data);
            $scope.data.in_pol = response.data.data['in_pol'];
            $scope.data.sailing = response.data.data['sailing'];
            $scope.data.in_pod = response.data.data['in_pod'];
            $scope.data.on_road = response.data.data['on_road'];
        });
	}]);

angular.module('Containers')

.controller('ContainersController', 
    ['$scope', 'GetContainers', '$ionicModal', 
    function($scope, GetContainers, $ionicModal) {
        $scope.containers = {};
        var params = ""; //"?params=order by 1 limit 1";

        GetContainers.ContainersList(params, function(response) {
            console.log(response.data.data);
            $scope.containers = response.data.data;
        });

        $ionicModal.fromTemplateUrl('templates/container-info.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    $scope.modal = modal;
		  });
		$scope.openModal = function(container) {
			$scope.container = container;
		    $scope.modal.show();
		};
		$scope.closeModal = function() {
			$scope.modal.hide();
		};
	}]);

angular.module('Invoices')

.controller('InvoicesController', 
    ['$scope', 'GetInvoices', '$ionicModal', 
    function($scope, GetInvoices, $ionicModal) {
        $scope.invoices = {};
        var params = ""; //"?params=order by 1 limit 1";

        GetInvoices.InvoicesList(params, function(response) {
            console.log(response.data.data);
            $scope.invoices = response.data.data;
        });

        $ionicModal.fromTemplateUrl('templates/invoice-info.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    $scope.modal = modal;
		  });
		$scope.openModal = function(invoice) {
			$scope.invoice = invoice;
		    $scope.modal.show();
		};
		$scope.closeModal = function() {
			$scope.modal.hide();
		};
	}]);

angular.module('Contact')

.controller('ContactController',
	['$scope', 'GetClientInfo',
	function($scope, GetClientInfo) {
		$scope.contact = {};

		GetClientInfo.Info(function(response) {
			$scope.contact = response.data.data;
            console.log($scope.contact);
        });
	}]);

angular.module('Reviews')

.controller('ReviewsController',
	['$scope', 'GetReviews', '$ionicModal',
	function($scope, GetReviews, $ionicModal) {
		$scope.reviews = {};

		$scope.loadReviews = function() {
			GetReviews.ReviewsList(function(response) {
				$scope.reviews = response.data.data;
	            console.log($scope.reviews);
	        });
		}
		$scope.loadReviews();

        $ionicModal.fromTemplateUrl('templates/review-add.html', {
			scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
			$scope.modal = modal;
		  });
		$scope.openModal = function() {
		    $scope.modal.show();
		};
		$scope.closeModal = function() {
			$scope.modal.hide();
		};

		$scope.addReview = function (comment) {
	    	console.log(comment);
			GetReviews.AddReview(comment, function (response) {
				$scope.modal.hide();
				$scope.loadReviews();
			});
		};
	}]);