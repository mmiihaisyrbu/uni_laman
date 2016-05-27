angular.module('app.routes', [])
  .config(function ($stateProvider, $urlRouterProvider) {
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
  		url: '/containers?archive&client_id&params&extended_search',
  		views: {
  			'menuContent': {
  				templateUrl: 'app/components/containers/containers.html',
  				controller: 'ContainersController'
  			}
  		}
  	})

  	.state('app.clients-list', {
  		url: '/clients-list?extended_search',
  		views: {
  			'menuContent': {
  				templateUrl: 'app/components/clients-list/clients-list.html',
  				controller: 'ClientsListController'
  			}
  		}
  	})

  	.state('app.push-messages', {
  		url: '/push-messages',
  		views: {
  			'menuContent': {
  				templateUrl: 'app/components/push-messages/push-messages.html',
  				controller: 'PushMessagesCtrl'
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
  		url: '/invoices?client_id&params',
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
  	})

  	.state('app.settings', {
  		url: '/settings',
  		views: {
  			'menuContent': {
  				templateUrl: 'app/components/settings/settings.html',
  				controller: 'SettingsController'
  			}
  		}
  	})

    .state('app.today-plan', {
  		url: '/today-plan',
  		views: {
  			'menuContent': {
  				templateUrl: 'app/components/today-plan/today-plan.html',
  				controller: 'TodayPlanCtrl'
  			}
  		}
  	});

    if ( window.localStorage['session_id'] ) {
  		$urlRouterProvider.otherwise('app/home');
  	} else {
  		$urlRouterProvider.otherwise('/login');
  	}
  });
