'use strict';
  
angular.module('Authentication')

.controller('LoginController',
    function($scope, $location, AuthenticationService, $ionicHistory) {
    	console.log('test', 'test');
    	$scope.data = {username: 'test_fox', password: 'fox_test'};

	    $scope.logIn = function() {

	        AuthenticationService.LogIn($scope.data.username, $scope.data.password, function(response) {
	        	console.log('response', response);
                if( response.status == 201 ) {
                	$ionicHistory.nextViewOptions({
						disableBack: true
					});
                    $location.path('/main');
                } else {
                    $scope.error = response.message;
                }
            });
	    }
    });

angular.module('Main')

.controller('MainController',
    function($scope, GetClientInfo, $location) {
        $scope.data = {};

        console.log(localStorage['session_id']);

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

        $scope.showContainers = function(cont_status) {
        	localStorage['cont_status'] = '?cont_status='+cont_status;
        	$location.path('/containers');
        };
	});

angular.module('More', ['ionic'])

.controller('MoreController',
	function($scope, AuthenticationService, $location, $ionicHistory) {
		$scope.logOut = function() {
	    	AuthenticationService.LogOut(function(response) {
                if( response.status == 200 ) {
                    $ionicHistory.nextViewOptions({
						disableBack: true
					});
					$location.path('/login');

                } else {
                    $scope.error = response.message;
                }
            });
	    }
	});

angular.module('Containers', ['ionic'])

.controller('ContainersController', 
    function($scope, GetContainers, ModalService) {
        $scope.containers = {};
        var params = '';//localStorage['cont_status'];

        GetContainers.ContainersList(params, function(response) {
            $scope.containers = response.data.data;
        });

        $scope.openModal = function(container) {
        	$scope.container = container;
			ModalService
			.init('templates/container-info.html', $scope)
			.then(function(modal) {
				modal.show();
			});
		};
	});

angular.module('Invoices')

.controller('InvoicesController', 
    function($scope, GetInvoices, ModalService) {
        $scope.invoices = {};
        var params = ""; //"?params=order by 1 limit 1";

        GetInvoices.InvoicesList(params, function(response) {
            console.log(response.data.data);
            $scope.invoices = response.data.data;
        });

        $scope.openModal = function(invoice) {
        	$scope.invoice = invoice;
			ModalService
			.init('templates/invoice-info.html', $scope)
			.then(function(modal) {
				modal.show();
			});
		};

		$scope.addHr = function(str) {
			if ( str == undefined )
				return str;
			else
				return str.replace(/,/g, '<hr>');
		};
	});

angular.module('Contact')

.controller('ContactController',
	function($scope, GetClientInfo) {
		$scope.contact = {};

		GetClientInfo.Info(function(response) {
			$scope.contact = response.data.data;
            console.log($scope.contact);
        });

        $scope.formatPhone = function(str) {
			if ( str != null ) {
				str = str.replace(/[^\d\;\+]/gi, '');
			}
			return str;
		}
	});

angular.module('Reviews')

.controller('ReviewsController',
	function($scope, GetReviews, ModalService) {
		$scope.reviews = {};

		$scope.loadReviews = function() {
			GetReviews.ReviewsList(function(response) {
				$scope.reviews = response.data.data;
	            console.log($scope.reviews);
	        });
		}
		$scope.loadReviews();

        $scope.openModal = function() {
			ModalService
			.init('templates/review-add.html', $scope)
			.then(function(modal) {
				modal.show();
			});
		};

		$scope.addReview = function (comment) {
	    	console.log(comment);
			GetReviews.AddReview(comment, function (response) {
				$scope.modal.hide();
				$scope.loadReviews();
			});
		};
	});