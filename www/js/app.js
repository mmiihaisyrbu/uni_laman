'use strict';
 
// declare modules
angular.module('Authentication', []);
angular.module('Main', []);
angular.module('Containers', []);

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('laman', ['ionic', 'Authentication', 'Main', 'Containers'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
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
      templateUrl: 'templates/more.html'
    })
    
    .state('containers', {
      url: '/containers',
      controller: 'ContainersController',
      templateUrl: 'templates/containers.html'
    })
    
    .state('reviews', {
      url: '/reviews',
      templateUrl: 'templates/reviews.html'
    })
    
    .state('contact', {
      url: '/contact',
      templateUrl: 'templates/contact.html'
    })
    
    .state('invoices', {
      url: '/invoices',
      templateUrl: 'templates/invoices.html'
    })
    
    .state('contdetails', {
      url: '/contdetails',
      templateUrl: 'templates/contdetails.html'
    })
    
    .state('invoicedetails', {
      url: '/invoicedetails',
      templateUrl: 'templates/invoicedetails.html'
    })
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/login');
})
.run(function($ionicPlatform, $location, $http, $rootScope) {
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