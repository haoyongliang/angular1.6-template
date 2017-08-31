APP.controller('userInfoCtrl', ['$rootScope', '$scope', '$timeout', 'localStorageService', '$loading', '$appHttp', 'userInfo', '$log', ($rootScope, $scope, $timeout, localStorageService, $loading, $appHttp, userInfo, $log) => {

  $scope.close = function() {
    alert(1);
  }
  /**
   * [提交表单]
   * @return {[type]} [description]
   */
  $scope.submit = function() {
    $scope.message = "正在加载中";
    let error = false;
    $appHttp.getData({
      url: 'CommonPlatform/customUserInfo!modify.action',
      params: {
        userID: localStorageService.get(userInfo.userID),
        userName: $scope.data.userName,
        nickName: $scope.data.nickName,
        autograph: $scope.data.autograph,
        mobilePhone: $scope.data.mobilePhone,
        eMail: $scope.data.eMail,
        addressLocation: $scope.data.addressLocation,
        headImage: $scope.data.headImage,
        twoDimensionCode: $scope.data.twoDimensionCode,
        remark: $scope.data.remark,
        hisheadImage: $scope.data.hisheadImage
      },
      before: function() {
        $loading.start('userInfo');
      }
    }).then(resp => {
      if (!!resp && resp.data == 'success') {
        $scope.message = "保存成功";
      } else {
        $scope.message = resp.data;
      }
    }).catch(err => {
      $scope.message = "保存失败"
    }).finally(() => {
      $timeout(() => {
        $loading.finish('userInfo');
      }, 2000)
    });
  }
  /**
   * [页面第一次进入初始化数据]
   * @return {[type]} [description]
   */
  $scope.init = function() {
    $timeout(() => {
      $scope.message = "正在加载中";
      let error = false;
      $appHttp.getData({
          url: 'CommonPlatform/customUserInfo!select.action',
          params: {
            userID: localStorageService.get(userInfo.userID)
          },
          before: function() {
            $loading.start('userInfo');
          }
        })
        .then(data => {
          $scope.data = data.data;
        }).catch(err => {
          error = true;
          $scope.message = "加载失败";
          $log.error(err);
        }).finally(() => {
          if (!!error) {
            //错误信息停留2S后消失
            $timeout(() => {
              $loading.finish('userInfo');
            }, 2000)
          } else {
            $loading.finish('userInfo');
          }
        });
    }, 0);
  }
}]);
