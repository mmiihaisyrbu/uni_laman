angular.module('app.today-plan')
	.controller('TodayPlanCtrl', TodayPlanCtrl)
	.factory('GetTodayPlan', GetTodayPlan)
	.service('ContainerDetailsStorage', ContainerDetailsStorage);

function ContainerDetailsStorage() {
    var _container = [];
    return {
        setData: function (container) {
            _container = container;
        },
        getData: function () {
            return _container;
        }
    }
}

function TodayPlanCtrl($scope, GetTodayPlan, ContainerDetailsStorage, $location) {
  $scope.plans = [];

  $scope.loadTodayPlan = function() {
    var params = "/q=0";
    params += "&limit=100&today_plan=true";
    GetTodayPlan.List(params, function(response) {
			$scope.plans = response.data.data;
		});
  }

	$scope.openContainerDetails = function(container) {
		localStorage['cont_id'] = container.cont_id;
		console.log(localStorage['cont_id']);
		ContainerDetailsStorage.setData(container);
		$location.path('/app/container-info');
	}
}

function GetTodayPlan($http) {
  var service = {};

  service.List = function(params, callback) {
      $http({
              method: "GET",
              headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
              url: server_url+"/containers/"+localStorage['session_id']+params
          })
          .then(function(data, status, headers, config) {
              console.log(JSON.stringify(data));
              callback(data);
          });
  };

  return service;
}
