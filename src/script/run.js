APP.run(['$rootScope', '$log', '$timeout','loginMode','$state','$stateParams', ($rootScope, $log,$timeout,loginMode,$state,$stateParams)=>{
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	
	$rootScope.$on('LocalStorageModule.notification.setitem',(event,data)=>{
		if(!!data){
			//登陆
			if(data.key == loginMode.NAME){
				$log.info('用户正在尝试登陆');
			}
		}
	});
	
	$rootScope.$on('LocalStorageModule.notification.removeitem',(event,data)=>{
		if(!!data){
			//退出登陆登陆
			if(data.key == loginMode.NAME){
				$log.info('用户正在退出登陆');
			}
		}
	});
	
}])