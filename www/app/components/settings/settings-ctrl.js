angular.module('app.settings')
	.controller('SettingsController', SettingsController)
	.factory('SettingsService', SettingsService);

function SettingsController($scope, $translate, SettingsService) {
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

	SettingsService.GetPushList(function(response) {
		$scope.push_list = response.data.data;
		//angular.extend(translate, {"en":{"TEST":"TEST"}});
		//console.log(translate);
	});

	$scope.updatePushCustom = function(push_list_id, receive) {
		console.log(push_list_id);
		console.log(receive);
		SettingsService.SetPushCustom(push_list_id, receive, function(response) {
			// body...
		});
	}
}

function SettingsService($http) {
	var service = {};

	service.GetPushList = function(callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: server_url+"/push-list/"+localStorage['session_id']
            })
            .then(function(data, status, headers, config) {
                console.log(JSON.stringify(data));
                callback(data);
            }, 
            function(response) { // optional
                // bad request
            });
    };

    service.SetPushCustom = function(push_list_id, receive, callback) {
    	$http({
                method: "POST",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: server_url+"/push-list-set",
                data: { 
                	'session_id': localStorage['session_id'], 
                	'push_list_id': push_list_id ,
                	'receive': receive
                }
            })
            .then(function(data) {
                console.log(JSON.stringify(data));
                callback(data);
            }, 
            function(response) { // optional
                // bad request
            });
    };

    return service;
}