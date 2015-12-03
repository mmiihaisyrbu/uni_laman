'use strict';
 
// declare modules
angular.module('Authentication', []);
angular.module('Main', []);
angular.module('Containers', []);
angular.module('Invoices', []);
angular.module('Contact', []);
angular.module('Reviews', []);
angular.module('ModalWindow', []);
angular.module('More', []);
angular.module('Email', []);

angular.module('laman', ['ionic', 'ngCordova', 'Authentication', 'Main', 'Containers', 'Invoices', 'Contact', 'Reviews', 'ModalWindow', 'More', 'Email'])

.constant('$ionicLoadingConfig', {
  template: 'Loading...'
  //templateUrl: '/img/loader.gif'
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider
    
    .state('login', {
      url: '/login',
      controller: 'LoginController',
      templateUrl: 'templates/login.html',
      hideMenus: true
    })
    
    .state('main', {
      url: '/main',
      controller: 'MainController',
      templateUrl: 'templates/main.html'
    })
    
    .state('more', {
      url: '/more',
      controller: 'MoreController',
      templateUrl: 'templates/more.html'
    })
    
    .state('containers', {
      url: '/containers',
      controller: 'ContainersController',
      templateUrl: 'templates/containers.html'
    })
    
    .state('reviews', {
      url: '/reviews',
      controller: 'ReviewsController',
      templateUrl: 'templates/reviews.html'
    })
    
    .state('contact', {
      url: '/contact',
      controller: 'ContactController',
      templateUrl: 'templates/contact.html'
    })
    
    .state('invoices', {
      url: '/invoices',
      controller: 'InvoicesController',
      templateUrl: 'templates/invoices.html'
    });

    if ( localStorage['session_id'] ) {
		$urlRouterProvider.otherwise('/main');
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
				$rootScope.$broadcast('loading:hide')
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
	});
});