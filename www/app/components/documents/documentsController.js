angular.module('app.documents')
	.controller('DocumentsController', DocumentsController)
	.factory('GetDocuments', GetDocuments);

function DocumentsController($scope, GetDocuments) {
	$scope.documents = [];
	$scope.offset = 0;
    $scope.offset_p = '';
    $scope.is_last = false;
    $scope.order_by = 1;
    var params = "/q=0";
    if ( window.localStorage['cont_id'] !== undefined ) { params = "/cont_id="+window.localStorage['cont_id']; }

	$scope.loadDocuments = function(more) {
    	more = typeof more !== 'undefined' ? more : false;

    	if ( more === true ) {
            $scope.offset++; $scope.offset_p = '&offset='+$scope.offset; 
        } else {
        	$scope.offset_p = '';
        	$scope.is_last = false;
            $scope.documents = [];
        }

        GetDocuments.DocumentsList(params+$scope.offset_p+'&order_by='+$scope.order_by, function(response) {
            if ( response.data.data.length > 0 ) {
            	$scope.documents = $scope.documents.concat(response.data.data);
            } else {
            	$scope.is_last = true;
            }

			$scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    $scope.loadDocuments();
}

function GetDocuments($http) {
    var service = {};

    service.DocumentsList = function(params, callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: "http://client.uni-laman.com/android/ver_2/index.php/documents/"+localStorage['session_id']+params
            })
            .then(function(data, status, headers, config) {
                console.log(JSON.stringify(data));
                callback(data);
            }, 
            function(response) { // optional
                // bad request
            });
    };
    return service;
}