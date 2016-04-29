angular.module('app.reviews')
	.controller('ReviewsController', ReviewsController)
	.factory('GetReviews', GetReviews);

function ReviewsController($scope, GetReviews, ModalService, $location) {
	$scope.reviews = [];

	$scope.loadReviews = function() {
		GetReviews.ReviewsList(function(response) {
			$scope.reviews = response.data.data;
		});
	}
	$scope.loadReviews();

	$scope.openModal = function() {
		/*ModalService
		.init('templates/review-add.html', $scope)
		.then(function(modal) {
			modal.show();
		});*/

		$location.path('/app/review-add');
	};

	$scope.addReview = function (comment) {
		console.log(comment);
		GetReviews.AddReview(comment, function (response) {
			//$scope.modal.hide();
			$location.path('/app/reviews');
			$scope.loadReviews();
		});
	};
}

function GetReviews($http) {
    var service = {};

    service.ReviewsList = function(callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: server_url+"/reviews/"+localStorage['session_id']
            })
            .then(function(data, status, headers, config) {
                console.log(JSON.stringify(data));
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
                url: server_url+"/review",
                data: { 'session_id': localStorage['session_id'], 'comment': comment }
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