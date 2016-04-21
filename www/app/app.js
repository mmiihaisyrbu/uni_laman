var translations = {
	"en": {
		"LANGUAGE": "Language",
		"HOME": "Home",
		"CONTAINERS_LIST": "Containers List",
		"INVOICES": "Invoices",
		"CONTACT_MANAGER": "Contact Manager",
		"APP_FEEDBACK": "App Feedback",
		"SETTINGS": "Settings",
		"LOG_OUT": "Log out",
		"LOGIN": "Login",
		"USERNAME": "Username",
		"PASSWORD": "Password",
		"CONTACT_SALES_MANAGER": "Contact sales manager",
		"CONTACT_CHIEF_OF_SALES": "Contact chief of sales",
		"SEND_EMAIL": "Send email",
		"SEND": "Send",
		"SEND_TO": "To",
		"EMAIL_MESSAGE": "Message",
		"SUBJECT": "Subject",
		"PULL_TO_REFRESH": "Pull to refresh...",
		"SEARCH": "Search",
		"SORT": "Sort",
		"ETA_MAX_TO_MIN": "ETA max to min",
		"ETA_MIN_TO_MAX": "ETA min to max",
		"ETD_MAX_TO_MIN": "ETD max to min",
		"ETD_MIN_TO_MAX": "ETD min to max",
		"CONTAINERS_DETAILS": "Containers details",
		"ORDER_NO": "Order no",
		"CONT_NO": "Cont no",
		"CONT_TYPE": "Cont type",
		"ETD": "ETD",
		"ETA": "ETA",
		"POL": "Port of loading",
		"CARGO": "Cargo",
		"BRUTTO": "Brutto",
		"DOCUMENTS": "Documents",
		"DRIVER_INFO": "Driver info",
		"DRIVER": "Driver",
		"AUTO_NO": "Auto No",
		"PHONE": "Phone",
		"MARINE_CONTAINER_TRANSPORTATION": "Marine container transportation",
		"AUTO_TRANSPORT": "Auto transport",
		"LCL_CARGO": "LCL cargo",
		"RAIL_TRANSPORTATION": "Rail transportation",
		"DOCUMENTS_LIST": "Documents list",
		"ADD_NEW_REVIEW": "Add new review"
	},
	"ru": {
		"LANGUAGE": "Язык",
		"HOME": "Главная",
		"CONTAINERS_LIST": "Список контейнеров",
		"INVOICES": "Счета",
		"CONTACT_MANAGER": "Связь с менеджером",
		"APP_FEEDBACK": "Отзывы о приложении",
		"SETTINGS": "Настройки",
		"LOG_OUT": "Выйти",
		"LOGIN": "Вход",
		"USERNAME": "Логин",
		"PASSWORD": "Пароль",
		"CONTACT_SALES_MANAGER": "Связаться с менеджером",
		"CONTACT_CHIEF_OF_SALES": "Связаться с начальнико менеджера",
		"SEND_EMAIL": "Отправить email",
		"SEND": "Отправить",
		"SEND_TO": "Кому",
		"EMAIL_MESSAGE": "Текст",
		"SUBJECT": "Тема",
		"PULL_TO_REFRESH": "Потяните, чтобы обновить...",
		"SEARCH": "Поиск",
		"SORT": "Сортировка",
		"ETA_MAX_TO_MIN": "ETA по убыванию",
		"ETA_MIN_TO_MAX": "ETA по возрастанию",
		"ETD_MAX_TO_MIN": "ETD по убыванию",
		"ETD_MIN_TO_MAX": "ETD по возрастанию",
		"CONTAINERS_DETAILS": "Детальная информация",
		"ORDER_NO": "Номер заказа",
		"CONT_NO": "Номер контейнера",
		"CONT_TYPE": "Тип контейнера",
		"ETD": "ETD",
		"ETA": "ETA",
		"POL": "Порт загрузки",
		"POD": "Порт выгрузки",
		"CARGO": "Груз",
		"BRUTTO": "Вес",
		"DOCUMENTS": "Документы",
		"DRIVER_INFO": "Информация о водителе",
		"DRIVER": "Водитель",
		"AUTO_NO": "Номер авто",
		"PHONE": "Телефон",
		"MARINE_CONTAINER_TRANSPORTATION": "Морские контейнерные перевозки",
		"AUTO_TRANSPORT": "Авто перевозки",
		"LCL_CARGO": "LCL грузы",
		"RAIL_TRANSPORTATION": "Ж/Д перевозки",
		"DOCUMENTS_LIST": "Список документов",
		"ADD_NEW_REVIEW": "Добавить отзыв"
	}
}

angular.module('app')

.constant('$ionicLoadingConfig', {
  template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
  //templateUrl: '/img/loader.gif'
})

.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider) {

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
	})

	.state('app.settings', {
		url: '/settings',
		views: {
			'menuContent': {
				templateUrl: 'app/components/settings/settings.html',
				controller: 'SettingsController'
			}
		}
	});

	for(lang in translations){
		$translateProvider.translations(lang, translations[lang]);
	}


	$translateProvider.preferredLanguage('en');

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
.run(function($ionicPlatform, $rootScope, $ionicLoading, $ionicPopup, $cordovaNetwork, $cordovaToast, $translate) {
	$translate.use(localStorage['lang']);

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