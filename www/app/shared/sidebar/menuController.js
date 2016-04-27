angular.module('app.menu')
	.controller('MenuController', MenuController);

function MenuController($scope, $ionicModal, $ionicPopover, GetCustomerInfo, AuthenticationService, $location, $ionicHistory) {
	$scope.data = [];
    $scope.mode = localStorage['mode'];

	GetCustomerInfo.Info(function(response) {
		$scope.data.customer_name = response.data.data['customer_name'];
	});

    $scope.getIncludeList = function() {
        if ( $scope.mode == 'client' ) {
            return "app/shared/sidebar/menu-list-client.html";
        } else if ( $scope.mode == 'manager' ) {
            return "app/shared/sidebar/menu-list-manager.html";
        }
    }

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
        //location.href = 'https://twitter.com/';
        window.open('https://twitter.com/', '_blank');
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