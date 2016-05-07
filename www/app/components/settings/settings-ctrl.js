angular.module('app.settings')
	.controller('SettingsController', SettingsController)
	.factory('SettingsService', SettingsService);

function SettingsController($scope, $translate, SettingsService) {

	SettingsService.GetLanguagesList(function(response) {
		$scope.languageList = response.data.data;
		$scope.selectedLanguage = $scope.languageList.filter(function(l) {
				return l.code === $translate.use();
			})[0];
	});

	$scope.changeLanguage = function(lang) {
		var language_id = $scope.languageList.filter(function(l) {
				return l.code === lang;
			})[0].id;
		SettingsService.SetCustomLanguage(language_id, function(response) {
			if ( response.status === 200 ) {
				console.log("changeLanguage:"+lang);
				$translate.use(lang);
				localStorage['lang'] = lang;
				$scope.getPushList();
			}
		});
	}

	$scope.getPushList = function() {
		SettingsService.GetPushList(function(response) {
			$scope.push_list = response.data.data;
		});
	}

	$scope.getPushList();

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

	service.GetLanguagesList = function(callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: server_url+"/languages-list/"+localStorage['session_id']
            })
            .then(function(data, status, headers, config) {
                console.log(JSON.stringify(data));
                callback(data);
            },
            function(response) { // optional
                // bad request
            });
    };

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
                	'push_list_id': push_list_id,
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

		service.SetCustomLanguage = function(language_id, callback) {
    	$http({
                method: "POST",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: server_url+"/custom-language-set",
                data: {
                	'session_id': localStorage['session_id'],
                	'language_id': language_id
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
