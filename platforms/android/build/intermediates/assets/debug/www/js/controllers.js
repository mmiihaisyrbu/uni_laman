'use strict';
  
angular.module('Authentication', ['ionic'])

.controller('LoginController',
    function($scope, $location, AuthenticationService, $ionicHistory, $state, $stateParams) {
    	$scope.data = [];

    	//$scope.data = {username: 'test_foxx', password: 'foxx_test'};
    	//$scope.data = {username: 'mcv-bus', password: 'egypt-mcv'};

	    $scope.logIn = function() {

	        AuthenticationService.LogIn($scope.data.username, $scope.data.password, function(response) {
	        	console.log('response', response);
                if( response.status == 201 ) {
                	$ionicHistory.nextViewOptions({
						disableBack: true
					});
        			window.location.reload();
                    //$state.go('main');
                    $location.path('/main');
                } else {
                    $scope.error = response.message;
                }
            });
	    }
    });

angular.module('Main', ['ionic'])

.controller('MainController',
    function($scope, GetClientInfo, $location) {
        $scope.data = [];

        $scope.getClientInfo = function() {
	        GetClientInfo.Info(function(response) {
	            $scope.data.company_name = response.data.data['client_name'];
	        });
	    }

        $scope.loadReport = function() {
	        GetClientInfo.Report(function(response) {
	            $scope.data.wait_sailing = response.data.data['wait_sailing'];
	            $scope.data.sailing = response.data.data['sailing'];
	            $scope.data.arrived = response.data.data['arrived'];
	            $scope.data.closed = response.data.data['closed'];
	        });
	    }

	    $scope.loadReport();
	    $scope.getClientInfo();

        $scope.showContainers = function(cont_status) {
        	window.localStorage['cont_status'] = '/status='+cont_status;
        	window.localStorage['from_to_cont'] = 'main';
        	$location.path('/containers');
        };
	});

angular.module('More', ['ionic'])

.controller('MoreController',
	function($scope, AuthenticationService, $location, $ionicHistory, $rootScope) {
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
        $scope.containers = [];
        $scope.offset = 0;
        $scope.offset_p = '';
        $scope.is_last = false;

        if ( window.localStorage['from_to_cont'] != 'main' ) { window.localStorage.removeItem('cont_status'); }
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
        $scope.invoices = [];
        var params = "";

        $scope.loadInvoices = function() {
	        GetInvoices.InvoicesList(params, function(response) {
	            console.log(response.data.data);
	            $scope.invoices = response.data.data;
			});
	    }

	    $scope.loadInvoices();

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
	function($scope, GetClientInfo, ModalService, EmailService) {
		$scope.contact = [];

		GetClientInfo.Info(function(response) {
			$scope.contact = response.data.data;
            console.log($scope.contact);
        });

        $scope.formatPhone = function(str) {
			if ( str != null ) {
				str = str.replace(/[^\d\;\+]/gi, '');
				str = str.split(';');
			}
			return str;
		}

		$scope.openModal = function(to, to_name) {
			$scope.send_to_email = to;
			$scope.send_to_name_email = to_name;
			ModalService
			.init('templates/mail.html', $scope)
			.then(function(modal) {
				modal.show();
			});
		};

		$scope.sendEmail = function(to, subject, message) {
			EmailService.SendEmail(to, subject, message, function(response) {
				console.log(response);
				modal.hide();
			});
		};
	});

angular.module('Reviews')

.controller('ReviewsController',
	function($scope, GetReviews, ModalService) {
		$scope.reviews = [];

		$scope.loadReviews = function() {
			GetReviews.ReviewsList(function(response) {
				$scope.reviews = response.data.data;
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