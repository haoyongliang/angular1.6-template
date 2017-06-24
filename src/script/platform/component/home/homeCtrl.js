APP.controller('homeCtrl',['$rootScope','$scope','$log','localStorageService','loginMode','$state','$timeout','$ngConfirm',($rootScope,$scope,$log,localStorageService,loginMode,$state,$timeout,$ngConfirm)=>{
	/**
	 * 退出登陆
	 */
	$scope.loginOut = function(){
        $ngConfirm({
        	theme:'supervan',
            title: '提示!',
            content: '<strong>您确定要退出吗?</strong>',
            scope: $scope,
            buttons: {
                sayBoo: {
                    text: '确定',
                    btnClass: 'btn-blue',
                    action: function(scope, button){
                       localStorageService.remove(loginMode.NAME);
                       $state.go('login',{},{location:'replace'});
                        return true; // prevent close;
                    }
                },
                close: {
                    text: '取消',
                    btnClass : 'btn-default'
                }
            }
        });
	}
	$scope.showUserInfo = function(){
		if(!!$scope.userInfoMode){
			$scope.userInfoMode =  false;
		}else{
			$scope.userInfoMode = true;	
		}
		
		
	}
}]) 