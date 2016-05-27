angular.module('app.invoices')
	.controller('InvoicesController', InvoicesController)
	.controller('invoiceDetailsController', invoiceDetailsController)
	.factory('GetInvoices', GetInvoices)
	.service('InvoiceDetailsStorage', InvoiceDetailsStorage);

function InvoiceDetailsStorage() {
    var _invoice = [];
    return {
        setData: function (invoice) {
            _invoice = invoice;
        },
        getData: function () {
            return _invoice;
        }
    }
}

function InvoicesController($scope, GetInvoices, $location, InvoiceDetailsStorage, $stateParams) {
    $scope.invoices = [];
		$scope.offset = 0;
    $scope.is_last = false;
		$scope.extended_search = '';

    $scope.loadInvoices = function(more) {
			var params = "/q=0";

    	more = typeof more !== 'undefined' ? more : false;

			if ( $stateParams.client_id != undefined ) {
	      params += "&orderer=" + $stateParams.client_id;
	    }
			if ( $stateParams.params != undefined ) {
				params += decodeURIComponent($stateParams.params);
			}
			if ( $scope.extended_search != '' ) {
				params += '&extended_search=' + $scope.extended_search;
			}

			if ( more === true && $scope.invoices !== [] ) {
        $scope.offset++;
				params += '&offset='+$scope.offset;
	    } else {
        $scope.is_last = false;
        $scope.invoices = [];
      }

      GetInvoices.InvoicesList(params, function(response) {
				if ( response.data.data.length > 0 ) {
        	$scope.invoices = $scope.invoices.concat(response.data.data);
					if ( $scope.invoices[0].count_rows <= 20 ) {
						$scope.is_last = true;
					}
        } else {
        	$scope.is_last = true;
        }

				$scope.$broadcast('scroll.infiniteScrollComplete');
	      $scope.activeLoad = true;
			});
    }

    $scope.loadInvoices();

    $scope.addHr = function(str) {
        if ( str == undefined )
            return str;
        else
            return str.replace(/,/g, "<hr>");
    };

    $scope.openInvoiceDetails = function(invoice) {
	    invoice.containers = $scope.addHr(invoice.containers);
			InvoiceDetailsStorage.setData(invoice);
			$location.path('/app/invoice-info');
		};

		$scope.showSerchBar = function() {
			$scope.show_search_bar = !$scope.show_search_bar;
			if ( !$scope.show_search_bar ) {
				$scope.loadInvoices();
				$scope.offset = 0;
			}
		};
}

function invoiceDetailsController($scope, InvoiceDetailsStorage) {
	$scope.invoice = InvoiceDetailsStorage.getData();
}

function GetInvoices($http) {
	var service = {};

    service.InvoicesList = function(params, callback) {
        $http({
                method: "GET",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
                url: server_url+"/invoices/"+localStorage['session_id']+params
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
