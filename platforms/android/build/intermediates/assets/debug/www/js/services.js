'use strict';
  
angular.module('Authentication')

.factory('AuthenticationService',
    ['$http',
    function($http) {
        var service = {};
 
        service.LogIn = function(username, password, callback) { 

            var url = "http://client.uni-laman.com/android/ver_2/index.php/login";

			$http({
			        method: "POST",
			        headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
			        url: url,
			        data: { 'login': username, 'pass': password }
			    })
			    .then(function(response) {
                    localStorage['session_id'] = response.data['session_id'];
                    localStorage['client_id'] = response.data['client_id'];
                    callback(response.data);
			    }, 
			    function(response) { // optional
                    console.log(JSON.stringify(response));
				});
        };

        service.LogOut = function(callback) {

        	var session_id = localStorage["session_id"];

        	$http({
			        method: "POST",
			        headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
			        url: "http://client.uni-laman.com/android/ver_2/index.php/logout",
			        data: { 'session_id': session_id }
			    })
			    .then(function(response) {
			        localStorage.clear();
                    callback(response.data);
			    }, 
			    function(response) { // optional
                    // bad login
				});
        }
  
        return service;
    }]);

angular.module('Main')

.factory('GetClientInfo', function($http) {
    var service = {};
    var session_id = localStorage['session_id'];

    service.Info = function(callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: "http://client.uni-laman.com/android/ver_2/index.php/client_info/"+session_id
            })
            .then(function(data, status, headers, config) {
                console.log(data);
                callback(data);
            }, 
            function(response) { // optional
                // bad request
            });
    };

    service.Report = function(callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: "http://client.uni-laman.com/android/ver_2/index.php/report/"+session_id
            })
            .then(function(data, status, headers, config) {
                console.log(data);
                callback(data);
            }, 
            function(response) { // optional
                // bad request
            });
    };

    return service;
});

angular.module('Containers')

.factory('GetContainers', function($http, $ionicModal) {
    var service = {};
    var session_id = localStorage['session_id'];

    service.ContainersList = function(params, callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: "http://client.uni-laman.com/android/ver_2/index.php/containers/"+session_id+params
            })
            .then(function(data, status, headers, config) {
                console.log(data);
                callback(data);
            }, 
            function(response) { // optional
                // bad request
            });
    };

    return service;
});

angular.module('ModalWindow', ['ionic'])

.service('ModalService', function($ionicModal, $rootScope) {


  var init = function(tpl, $scope) {

    var promise;
    $scope = $scope || $rootScope.$new();

    promise = $ionicModal.fromTemplateUrl(tpl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      return modal;
    });
/*
    $scope.openModal = function() {
       $scope.modal.show();
     };
     $scope.closeModal = function() {
       $scope.modal.hide();
     };*/
     $scope.$on('$destroy', function() {
       $scope.modal.remove();
     });

    return promise;
  }

  return {
    init: init
  }

});

angular.module('Invoices')

.factory('GetInvoices', function($http) {
    var service = {};
    var session_id = localStorage['session_id'];

    service.InvoicesList = function(params, callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: "http://client.uni-laman.com/android/ver_2/index.php/invoices/"+session_id+params
            })
            .then(function(data, status, headers, config) {
                console.log(data);
                callback(data);
            }, 
            function(response) { // optional
                // bad request
            });
    };

    return service;
});

angular.module('Reviews')

.factory('GetReviews',
    ['$http', function($http) {
    var service = {};
    var session_id = localStorage['session_id'];

    service.ReviewsList = function(callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: "http://client.uni-laman.com/android/ver_2/index.php/reviews/"+session_id
            })
            .then(function(data, status, headers, config) {
                console.log(data);
                callback(data);
            }, 
            function(response) { // optional
                // bad request
            });
    };

    service.AddReview = function(comment, callback) {
    	$http({
                method: "POST",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: "http://client.uni-laman.com/android/ver_2/index.php/review",
                data: { 'session_id': session_id, 'comment': comment }
            })
            .then(function(data) {
                console.log(data);
                callback(data);
            }, 
            function(response) { // optional
                // bad request
            });
    };

    return service;
}]);