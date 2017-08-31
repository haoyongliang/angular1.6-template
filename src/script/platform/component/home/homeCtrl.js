APP.controller('homeCtrl', ['$rootScope', '$scope', '$log', 'localStorageService', 'loginMode', '$state', '$timeout', '$ngConfirm','userInfo', ($rootScope, $scope, $log, localStorageService, loginMode, $state, $timeout, $ngConfirm,userInfo) => {
	$scope.userInfoMode = false;

	$scope.$on('onBodyClick',(event,data)=>{
		$scope.userInfoMode = false;
	});

	$scope.init = ()=>{
		$scope.loginName = localStorageService.get(userInfo.logName);
	}
	/**
   * 退出登陆
   */
  $scope.loginOut = function() {
    $ngConfirm({
      theme: 'supervan',
      title: '提示!',
      content: '<strong>您确定要退出吗?</strong>',
      scope: $scope,
      buttons: {
        sayBoo: {
          text: '确定',
          btnClass: 'btn-blue',
          action: function(scope, button) {
            localStorageService.remove(loginMode.NAME);
            $state.go('login', {}, {
              location: 'replace'
            });
            return true; // prevent close;
          }
        },
        close: {
          text: '取消',
          btnClass: 'btn-default'
        }
      }
    });
  }
  $scope.showUserInfo = function($event) {
		$event.stopPropagation();
    if (!!$scope.userInfoMode) {
      $scope.userInfoMode = false;
    } else {
      $scope.userInfoMode = true;
    }
  }


  $scope.showOrHideNav = function(element) {
		if(!!$scope[element]){
			$scope[element] = false;
		}else{
			$scope[element] = true;
		}
		let array = Array.from($scope);
		for(let element in array){
			$log.info(element);
		}

  }
}])
