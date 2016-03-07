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

function InvoicesController($scope, GetInvoices, $location, InvoiceDetailsStorage) {
    $scope.invoices = [];
    var params = "";

    $scope.loadInvoices = function() {
        GetInvoices.InvoicesList(params, function(response) {
            console.log(response.data.data);
            $scope.invoices = response.data.data;
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
                url: "http://client.uni-laman.com/android/ver_2/index.php/invoices/"+localStorage['session_id']+params
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