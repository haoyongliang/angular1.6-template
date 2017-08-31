APP.controller('myTemplateCtrl', [
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
  'tree',
  ($rootScope, $scope, $compile, $timeout, $loading,$log,$appHttp,localStorageService,userInfo,$state,tree) => {
    //将路由参数存储到session,方便在测试子路由的时候取数据
    if(!!$rootScope.$stateParams.entId){
      localStorageService.set('home.myTemplateIndex.entId',$rootScope.$stateParams.entId);
    }
    // if(!!$rootScope.$stateParams.createUserId){
    //   localStorageService.set('home.myTemplateIndex.createUserId',$rootScope.$stateParams.createUserId);
    // }
    if(!!$rootScope.$stateParams.enterpriseName){
      localStorageService.set('home.myTemplateIndex.enterpriseName',$rootScope.$stateParams.enterpriseName);
    }

    $scope.$on('addMainTemplateFinish',function(e){
      $scope.initTemplateList();
    });

    //返回按钮
    $scope.gotoIndex = $event=>{
      $state.go('home.myTemplateIndex');
    }
    //显示添加主模板页面
    $scope.gotoAddMainTemplate = ()=>{
      $state.go('home.myTemplate.addMainTemplate');
    }


    $scope.initTemplateList = ()=>{
      $scope.message = "正在请求我的模板列表";
      let error = false;
      $appHttp.getData({
          url: '/CommonPlatform/templateConfig!getTemplateTree.action',
          params: {
            createUserId: localStorageService.get(userInfo.userID),
            entId:localStorageService.get('home.myTemplateIndex.entId')
          },
          before: function() {
            $loading.start('templateList');
          }
        })
        .then(data => {
          let result = data.data;
          tree.init('tree-root');
          tree.addLevel(result.rows,'subTemps');
          $scope.menuData = result.rows;
        }).catch(err => {
          error = true;
          $scope.message = "加载失败";
          $log.error(err);
        }).finally(() => {
          if (!!error) {
            //错误信息停留2S后消失
            $timeout(() => {
              $loading.finish('templateList');
            }, 2000)
          } else {
            $loading.finish('templateList');
          }
        });
    }


    //------------------------------------------------

  }
]);
