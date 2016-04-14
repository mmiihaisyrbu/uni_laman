angular.module('app')

.constant('$ionicLoadingConfig', {
  template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
  //templateUrl: '/img/loader.gif'
})

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider

  	.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'app/shared/sidebar/menu.html',
        controller: 'MenuController'
    })
    
    .state('login', {
      url: '/login',
      controller: 'LoginController as login',
      templateUrl: 'app/components/authentication/login.html',
      hideMenus: true
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'app/components/home/home.html',
                controller: 'HomeController'
            }
        }
    })

	.state('app.containers', {
		url: '/containers',
		views: {
			'menuContent': {
				templateUrl: 'app/components/containers/containers.html',
				controller: 'ContainersController'
			}
		}
	})

	.state('app.container-info', {
		url: '/container-info',
		views: {
			'menuContent': {
				templateUrl: 'app/components/containers/container-info.html',
				controller: 'containerDetailsController'
			}
		}
	})

	.state('app.reviews', {
		url: '/reviews',
		views: {
			'menuContent': {
				templateUrl: 'app/components/reviews/reviews.html',
				controller: 'ReviewsController'
			}
		}
	})

	.state('app.review-add', {
		url: '/review-add',
		views: {
			'menuContent': {
				templateUrl: 'app/components/reviews/review-add.html',
				controller: 'ReviewsController'
			}
		}
	})

	.state('app.contact', {
		url: '/contact',
		views: {
			'menuContent': {
				templateUrl: 'app/components/contact/contact.html',
				controller: 'ContactController as contact'
			}
		}
	})

	.state('app.contact-mail', {
		url: '/contact-mail',
		views: {
			'menuContent': {
				templateUrl: 'app/components/contact/mail.html',
				controller: 'SendMailController as mail'
			}
		}
	})

	.state('app.invoices', {
		url: '/invoices',
		views: {
			'menuContent': {
				templateUrl: 'app/components/invoices/invoices.html',
				controller: 'InvoicesController'
			}
		}
	})

	.state('app.invoice-info', {
		url: '/invoice-info',
		views: {
			'menuContent': {
				templateUrl: 'app/components/invoices/invoice-info.html',
				controller: 'invoiceDetailsController'
			}
		}
	})

	.state('app.documents', {
		url: '/documents',
		views: {
			'menuContent': {
				templateUrl: 'app/components/documents/documents.html',
				controller: 'DocumentsController'
			}
		}
	});

    if ( window.localStorage['session_id'] ) {
		$urlRouterProvider.otherwise('app/home');
	} else {
		$urlRouterProvider.otherwise('/login');
	}

	$httpProvider.interceptors.push(function($rootScope, $cordovaNetwork) {
		return {
			request: function(config) {
				$rootScope.$broadcast('loading:show')
				return config
			},
			response: function(response) {
				$rootScope.$broadcast('loading:hide');
				/*window.cookies.clear(function() {
					console.log('Cookies cleared!');
				});*/
				return response
			},
			requestError: function(config) {
				//
			},
			responseError: function(response) {
				$rootScope.$broadcast('loading:hide');
				if ( ! $cordovaNetwork.isOnline() ) {
					$rootScope.showToast('The internet is disconnected on your device!');
				} else {
					$rootScope.showToast(response.data.message);
				}
			}
		}
	});
})
.run(function($ionicPlatform, $rootScope, $ionicLoading, $ionicPopup, $cordovaNetwork, $cordovaToast) {
	$rootScope.$on('loading:show', function() {
		$ionicLoading.show();
	});

	$rootScope.$on('loading:hide', function() {
	    $ionicLoading.hide();
	    $rootScope.$broadcast('scroll.refreshComplete');
	    $rootScope.$broadcast('scroll.infiniteScrollComplete');
	});

	$rootScope.showToast = function(err_msg) {
	  $cordovaToast
	    .show(err_msg, 'long', 'bottom')
	    .then(function(success) {
	      // success
	    }, function (error) {
	      // error
	    });
	};

	// listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
    	$rootScope.showToast('Network:online');
    });

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
    	$rootScope.showToast('Network:offline');
    });

	$ionicPlatform.ready(function() {
		if(window.Connection) {
            if( navigator.connection.type == Connection.NONE ) {
                $ionicPopup.confirm({
                    title: "Internet Disconnected",
                    content: "The internet is disconnected on your device."
                })
                .then(function(result) {
                    if(!result) {
                        ionic.Platform.exitApp();
                    }
                });
            }
        }
        document.addEventListener("deviceReady", function () {
            document.addEventListener("resume", function () {
            	console.log("on resume !!!!!!!");

			   }, false);
        }, false);
	});
});