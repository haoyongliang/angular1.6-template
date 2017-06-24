APP.controller('loginCtrl',['$rootScope','$scope','$log','localStorageService','loginMode','$state','$timeout','$location',($rootScope,$scope,$log,localStorageService,loginMode,$state,$timeout,$location)=>{
	//检测到如果登陆了则直接跳转到登陆后的页面
	if(localStorageService.get(loginMode.NAME) == loginMode.RESULT){
		$state.go('home.main',{},{location:'replace'});
	}
	
	
	//变量
	
	//timeout
	
	
	//函数
	$scope.login = function(){
		localStorageService.set(loginMode.NAME,loginMode.RESULT);
		$state.go('home.main',{},{absolute:true,location:'replace'});
	}
}]) 