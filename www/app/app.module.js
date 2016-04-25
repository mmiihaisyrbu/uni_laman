'use strict';

angular.module('app.authentication', []);
angular.module('app.home', []);
angular.module('app.containers', ['ionic', 'jett.ionic.filter.bar']);
angular.module('app.invoices', []);
angular.module('app.contact', []);
angular.module('app.reviews', []);
angular.module('ModalWindow', []);
angular.module('mail', []);
angular.module('app.menu', ['ionic', 'ionic-material']);
angular.module('app.documents', []);
angular.module('app.settings', []);

angular.module('app', [
	'ionic', 
	'ionic.service.core',
	'ionic-material', 
	'ionMdInput', 
	'ngCordova', 
	'app.authentication', 
	'app.home', 
	'app.containers', 
	'app.invoices', 
	'app.contact', 
	'app.reviews', 
	'ModalWindow', 
	'mail', 
	'app.menu', 
	'app.documents', 
	'app.settings',
	'pascalprecht.translate'
	]);