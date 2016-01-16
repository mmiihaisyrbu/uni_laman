angular.module('app.contact')
	.controller('ContactController', ContactController);

function ContactController($scope, GetClientInfo, ModalService, EmailService) {
	$scope.contact = [];

	GetClientInfo.Info(function(response) {
		$scope.contact = response.data.data;
        console.log($scope.contact);
    });

    $scope.formatPhone = function(str) {
		if ( str != null ) {
			str = str.replace(/[^\d\;\+]/gi, '');
			str = str.split(';');
		}
		return str;
	}

	$scope.openModal = function(to, to_name) {
		$scope.send_to_email = to;
		$scope.send_to_name_email = to_name;
		ModalService
		.init('components/contact/mail.html', $scope)
		.then(function(modal) {
			modal.show();
		});
	};

	$scope.sendEmail = function(to, subject, message) {
		EmailService.SendEmail(to, subject, message, function(response) {
			console.log(response);
			modal.hide();
		});
	};
}