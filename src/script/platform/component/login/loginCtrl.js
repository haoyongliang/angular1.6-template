APP.controller('loginCtrl', ['$rootScope', '$scope', '$log', 'localStorageService', 'loginMode', '$state', '$timeout', '$appHttp', '$loading', 'userInfo', ($rootScope, $scope, $log, localStorageService, loginMode, $state, $timeout, $appHttp, $loading, userInfo) => {
  //检测到如果登陆了则直接跳转到登陆后的页面
  if (localStorageService.get(loginMode.NAME) == loginMode.RESULT) {
    $state.go('home.main', {}, {
      location: 'replace'
    });
  }


  //变量

  //timeout


  //函数
  $scope.login = function() {
    $scope.logName = '18735885176'; //13922251988(余总，123)18735885176（张鹏，1）18925281551（孙总，123456）,15210820048(晓东，123)
    $scope.password = '1';
    $scope.message = "正在登陆";
    let error = false;

    $appHttp.getData({
      url: '/CommonPlatform/customUserConfig!login.action',
      params: {
        logName: $scope.logName,
        password: $scope.password
      },
      before() {
        $loading.start("login");
      }
    }).then(resp => {
      //校验成功
      if (!!resp && !!resp.data && !!resp.data.sysToken) {
        
        localStorageService.set(userInfo.createDate, resp.data.creatDate);
        localStorageService.set(userInfo.logName, resp.data.logName);
        localStorageService.set(userInfo.loginCount, resp.data.loginCount);
        localStorageService.set(userInfo.remark, resp.data.remark);
        localStorageService.set(userInfo.sysToken, resp.data.sysToken);
        localStorageService.set(userInfo.userID, resp.data.userID);
				localStorageService.set(loginMode.NAME,loginMode.RESULT);
        localStorageService.set(userInfo.password, $scope.password);
        $state.go('home.myTemplate', {}, {
          absolute: true,
          location: 'replace'
        });
      }else{
        $scope.message = "登陆失败，错误原因:"+resp.data.remark;
      }
    }).catch(err => {
      $log.error(err);
      error = true;
      $scope.message = "登陆失败，错误原因:"+err;
    }).finally(() => {
      if(error){
          $timeout(()=>{
            $loading.finish('login');
          },2000);
      }else{
          $loading.finish('login');
      }

    })
  }
}])
