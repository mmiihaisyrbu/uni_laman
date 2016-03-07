angular.module('app.menu')
	.controller('MenuController', MenuController);

function MenuController($scope, $ionicModal, $ionicPopover, GetClientInfo, AuthenticationService, $location, $ionicHistory) {
	$scope.data = [];

	GetClientInfo.Info(function(response) {
		$scope.data.company_name = response.data.data['client_name'];
	});

	$scope.logOut = function() {
    	AuthenticationService.LogOut(function(response) {
            if( response.status == 200 ) {
                $ionicHistory.nextViewOptions({
					disableBack: true
				});
				$location.path('/login');
            } else {
                $scope.error = response.message;
            }
        });
	}

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

    /*var fab = document.getElementById('fab');
    fab.addEventListener('click', function () {
        //location.href = 'https://twitter.com/satish_vr2011';
        window.open('https://twitter.com/satish_vr2011', '_blank');
    });*/

    // .fromTemplate() method
    var template = '<ion-popover-view>' +
                    '   <ion-header-bar>' +
                    '       <h1 class="title">My Popover Title</h1>' +
                    '   </ion-header-bar>' +
                    '   <ion-content class="padding">' +
                    '       My Popover Contents' +
                    '   </ion-content>' +
                    '</ion-popover-view>';

    /*$scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });*/
}