angular.module('app.settings')
	.controller('SettingsController', SettingsController);

function SettingsController($scope, $translate) {
	$scope.languageList = {
		'en': {
			name: 'English',
			value: 'en'
		}, 
		'ru': {
		  	name: 'Русский',
			value: 'ru'
		}, 
		'ua': {
		  	name: 'Українська',
			value: 'ua'
		}
	};

	$scope.selectedLanguage = $scope.languageList[$translate.use()];

	$scope.changeLanguage = function(lang) {
		console.log("changeLanguage:"+lang);
		$translate.use(lang);
		localStorage['lang'] = lang;
	}
}