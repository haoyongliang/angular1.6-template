/**
 * 首页控制器
 */
APP.controller('indexCtrl', ['$timeout', '$log', '$scope', 'localStorageService', '$rootScope', '$state', 'loginMode', '$ngConfirm', function($timeout, $log, $scope, localStorageService, $rootScope, $state, loginMode, $ngConfirm) {
	//广播事件：home.html监听该事件，如果点击则隐藏已经显示的导航
	$scope.bodyClick = function(){
		$scope.$broadcast('onBodyClick',{});
	}
	
}])
