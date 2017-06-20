APP.controller('indexCtrl',['$timeout','$log','$scope','localStorageService',function(timeout,log,$scope,localStorageService){
	$scope.mainMode = true;
	localStorageService.set('username','haoyongliang');
	timeout(function(){
		log.info(localStorageService.get('username'));
	},5000);
}])