/**
 * 首页控制器
 */
APP.controller('indexCtrl', ['$timeout', '$log', '$scope', 'localStorageService', '$rootScope', '$state', 'loginMode', '$ngConfirm', function($timeout, $log, $scope, localStorageService, $rootScope, $state, loginMode, $ngConfirm) {
	
	//没有登陆成功则跳转到登陆界面
  if (localStorageService.get(loginMode.NAME) != loginMode.RESULT) {
    $state.go('login', {}, {
      location: 'replace'
    });
  }
}])
