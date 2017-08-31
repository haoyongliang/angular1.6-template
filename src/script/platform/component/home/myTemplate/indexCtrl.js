APP.controller('selectOrgsCtrl', [
  '$rootScope',
  '$scope',
  '$compile',
  '$timeout',
  '$loading',
  '$log',
  '$appHttp',
  'localStorageService',
  'userInfo',
  '$state',
  ($rootScope, $scope, $compile, $timeout, $loading,$log,$appHttp,localStorageService,userInfo,$state) => {
    
    $scope.initTemplateList = ()=>{
      $scope.message = "正在请求我的模板列表";
      let error = false;
      $appHttp.getData({
          url: '/CommonPlatform/customBaseInfo!getEnterpriseListByUserID.action',
          params: {
            userID: localStorageService.get(userInfo.userID)
          },
          before: function() {
            $loading.start('orgList');
          }
        })
        .then(data => {
          let result = data.data;
          $scope.organizations = result;
        }).catch(err => {
          error = true;
          $scope.message = "加载失败";
          $log.error(err);
        }).finally(() => {
          if (!!error) {
            //错误信息停留2S后消失
            $timeout(() => {
              $loading.finish('orgList');
            }, 2000)
          } else {
            $loading.finish('orgList');
          }
        });
    }
  }
]);
