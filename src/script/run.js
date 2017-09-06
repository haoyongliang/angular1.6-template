APP.run(['$rootScope', '$log', '$timeout', 'loginMode', '$state', '$stateParams', '$transitions', 'localStorageService', '$trace', ($rootScope, $log, $timeout, loginMode, $state, $stateParams, $transitions, localStorageService, $trace) => {

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  // $trace.enable('TRANSITION'); //打印路由信息
  // $state.defaultErrorHandler(() => {}); //不打印错误信息
  $transitions.onStart({}, ()=> {
    //没有登陆成功则跳转到登陆界面
//  if (localStorageService.get(loginMode.NAME) != loginMode.RESULT) {
//    $state.go('login');
//  }
  });


  $rootScope.$on('LocalStorageModule.notification.setitem', (event, data) => {
    if (!!data) {
      //登陆
      if (data.key == loginMode.NAME) {
        $log.info('用户正在尝试登陆');
      }
    }
  });

  $rootScope.$on('LocalStorageModule.notification.removeitem', (event, data) => {
    if (!!data) {
      //退出登陆登陆
      if (data.key == loginMode.NAME) {
        $log.info('用户正在退出登陆');
      }
    }
  });

}])
