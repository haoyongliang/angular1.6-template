APP.controller('userSetCtrl', ['$rootScope', '$scope', '$timeout', 'localStorageService', '$loading', '$appHttp', 'userInfo', '$log', ($rootScope, $scope, $timeout, localStorageService, $loading, $appHttp, userInfo, $log) => {

  $scope.items = [];
  for(var i=0; i<100; i++){
    $scope.items.push({
      name:'jack'+i
    });
  }
  /**
   * [加载完毕获修改密码模块后获取取用户密码,创建form对象]
   * @return {[type]} [description]
   */
  $scope.passwordPanelInit = function() {
    $scope.oldPassword = localStorageService.get(userInfo.password);
    $scope.userSetForm = {};
  }
  /**
   * [修改密码]
   * @return {[type]} [description]
   */
  $scope.changePassword = function() {
    $scope.message = '正在修改密码，请稍候';
    $appHttp.getData({
      url: 'CommonPlatform/customUserConfig!changePassword.action',
      params: {
        userID: localStorageService.get(userInfo.userID),
        password: localStorageService.get(userInfo.password),
        newPassword: $scope.userSetForm.newPassword
      },
      before() {
        $loading.start('userSet');
      }
    }).then(resp => {
      if (!!resp && resp.data == 'success') {
        $scope.message = "修改成功"
        localStorageService.set(userInfo.password, $scope.userSetForm.newPassword);
      } else {
        $scope.message = "修改失败,失败原因:" + resp.data;
      }
    }).catch(error => {
      $scope.message = "修改失败,错误原因:" + error;
    }).finally(() => {
      $timeout(() => {
        $loading.finish('userSet');
      }, 2000)
    });
  }

  $scope.close = function() {
    alert(1);
  }

  //表格的配置文件
  $scope.tbConfig = [{
    label: '序号',
    style: 'width:50px; border-right: 1px solid black'
  }, {
    label: '姓名',
    style:''
    // style:'width:50px;'
  }, {
    label: '用户名',
    style:''
    // style:'width:50px'
  }, {
    label: '职务',
    style:''
    // style:'width:50px'
  }, {
    label: '角色',
    style:''
    // style:''
  }, {
    label: '移动电话',
    style:''
    // style:'width:50px'
  }, {
    label: '电子邮件',
    style:''
    // style:'width:100px'
  }, {
    label: '账户状态',
    style:''
    // style:'width:50px'
  }, {
    label: '备注',
    style:''
    // style:'width:80px'
  }, {
    label: '操作',
    style: 'width:100px;border-left:1px solid black'
  }];
}]);
