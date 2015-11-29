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

angular.module('laman', ['ionic', 'ionic-toast', 'Authentication', 'Main', 'Containers', 'Invoices', 'Contact', 'Reviews', 'ModalWindow', 'More', 'Email'])

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

	$httpProvider.interceptors.push(function($rootScope) {
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
				console.log(response);
				$rootScope.showToast(response.data.message);
			}
		}
	});
})
.run(function($ionicPlatform, $rootScope, $ionicLoading, ionicToast) {
	$rootScope.$on('loading:show', function() {
		$ionicLoading.show();
	})

	$rootScope.$on('loading:hide', function() {
	    $ionicLoading.hide();
	    $rootScope.$broadcast('scroll.refreshComplete');
	    $rootScope.$broadcast('scroll.infiniteScrollComplete');
	})

	$rootScope.showToast = function(err_msg) {
	  ionicToast.show(err_msg, 'top', true, 2500);
	};

	$rootScope.hideToast = function(){
		ionicToast.hide();
	};

	$ionicPlatform.ready(function() {

	});
});