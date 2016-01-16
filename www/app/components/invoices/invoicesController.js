angular.module('app.invoices')
	.controller('InvoicesController', InvoicesController)
	.factory('GetInvoices', GetInvoices);

function InvoicesController($scope, GetInvoices, ModalService) {
    $scope.invoices = [];
    var params = "";

    $scope.loadInvoices = function() {
        GetInvoices.InvoicesList(params, function(response) {
            console.log(response.data.data);
            $scope.invoices = response.data.data;
		});
    }

    $scope.loadInvoices();

    $scope.openModal = function(invoice) {
    	$scope.invoice = invoice;
		ModalService
		.init('app/components/invoices/invoice-info.html', $scope)
		.then(function(modal) {
			modal.show();
		});
	};

	$scope.addHr = function(str) {
		if ( str == undefined )
			return str;
		else
			return str.replace(/,/g, '<hr>');
	};
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