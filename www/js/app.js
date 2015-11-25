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

angular.module('laman', ['ionic', 'Authentication', 'Main', 'Containers', 'Invoices', 'Contact', 'Reviews', 'ModalWindow', 'More'])

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
			}
		}
	});
})
.run(function($ionicPlatform, $rootScope, $ionicLoading) {
	$rootScope.$on('loading:show', function() {
		$ionicLoading.show();
	})

	$rootScope.$on('loading:hide', function() {
	    $ionicLoading.hide();
	    $rootScope.$broadcast('scroll.refreshComplete');
	    $rootScope.$broadcast('scroll.infiniteScrollComplete');
	})
	$ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    /*if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }*/
    // keep user logged in after page refresh
   /* $rootScope.globals = {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }*/

    /*$rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
            $location.path('/login');
        }
    });*/
	});
})

/*.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }])*/;