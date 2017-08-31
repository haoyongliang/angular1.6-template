/**
 * [description]
 * @param  {[type]} $scope   [description]
 * @param  {[type]} $timeout [description]
 * @param  {[type]} $appHttp [description]
 * @param  {[type]} cache    [description]
 * @param  {[type]} $log     [description]
 * @param  {[type]} appHttp  [description]
 * @return {[type]}          [description]
 */
APP.controller('organizationCtrl', ['$scope', '$timeout', '$appHttp', 'cache', '$log', '$loading', '$rootScope', 'userInfo', 'localStorageService', '$state', 'uuid', function($scope, $timeout, $appHttp, cache, $log, $loading, $rootScope, userInfo, localStorageService, $state, uuid) {


  //请求我的组织数据
  $scope.init = function() {
    $scope.message = "正在加载中";
    $timeout(() => {
      let error = false;
      $appHttp.getData({
          url: '/CommonPlatform/customBaseInfo!getEnterpriseListByUserID.action',
          params: {
            userID: localStorageService.get(userInfo.userID)
          },
          before: function() {
            $loading.start('myOrganization');
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
              $loading.finish('myOrganization');
            }, 2000)
          } else {
            $loading.finish('myOrganization');
          }
        });
    }, 0);
  }

  /**
   * [+号按钮业务逻辑]
   * @return {[type]} [description]
   */
  $scope.clickAddBtn = function() {
    alert(12334534);
  }

  $scope.workset = function() {
    $scope.message = "abcdd";
    $log.info($scope.message);
    $appHttp.getData({
        url: 'CommonPlatform/customBaseInfo!getEnterpriseInfo.action',
        params: {
          createUserId: '102'
        },
        enableCache: true
      })
      .then(data => {
        $log.info(data);
      })
      .finally(function() {});
  }

}])
