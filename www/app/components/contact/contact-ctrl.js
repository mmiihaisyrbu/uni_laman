angular.module('app.contact')
	.controller('ContactController', ContactController)
	.controller('SendMailController', SendMailController)
	.service('MailInfoStorage', MailInfoStorage);

function MailInfoStorage() {
    var _data = [];
    return {
        setData: function (key, data) {
            _data[key] = data;
        },
        getData: function (key) {
            return _data[key];
        }
    }
}

function ContactController($scope, $state, GetCustomerInfo, MailInfoStorage) {
	$scope.contact = [];

	GetCustomerInfo.Info(function(response) {
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

	$scope.openMailWindow = function(to, to_name) {
		MailInfoStorage.setData('send_to_email', to);
		MailInfoStorage.setData('send_to_name_email', to_name);
		$state.go("app.contact-mail");
	};
}

function SendMailController($scope, EmailService, MailInfoStorage, $cordovaToast, $translate, $state) {
	this.send_to_email = MailInfoStorage.getData('send_to_email');
	this.send_to_name_email = MailInfoStorage.getData('send_to_name_email');

	$translate('MSG_SEND').then(function (msg_send) {
		this.msg_send = msg_send;
	});

	this.sendEmail = function(to, subject, message) {
		EmailService.SendEmail(to, subject, message, function(response) {
			$cordovaToast
		    .show(this.msg_send, 'short', 'bottom')
		    .then(function(success) {
		      // success
		    }, function (error) {
		      // error
		    });
			$state.go("app.contact");
		});
	};
}
