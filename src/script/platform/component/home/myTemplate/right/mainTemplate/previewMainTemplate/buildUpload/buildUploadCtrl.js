APP.controller('buildUploadCtrl',[
  '$rootScope',
  '$scope',
  '$timeout',
  '$loading',
  '$log',
  '$appHttp',
  'localStorageService',
  'userInfo',
  'templateMainType',
  'buildUploadConstant',
  function($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType,buildUploadConstant){
    $scope.form = {};
    $scope.buildUploadConstant = buildUploadConstant;
    console.log($scope.buildUploadConstant);
    $scope.cancel = function(){
      $scope.closeThisDialog();
    }

    $scope.save = function(){
      let error = false;
      $appHttp.getData({
        params:{
          typeCardId:$rootScope.currentTypeCard.typeCardId,//隶属分类卡ID
          cardElementType:'6',//元素卡类型<重要，对应下面的7种类型，并且要追加参数> 下拉菜单公共字典fid=40
          cardElementName:$scope.form.cardElementName,//元素中文字段名称
          createUserId:localStorageService.get(userInfo.userID),
          viewOrder:parseInt($rootScope.maxViewOrder) + 100,//排序字段不传递默认0，跨度100，例如100,200这样
          position:'',//列表位置 01表示第一行末尾 11,12,13分别表示第二行的三个位置，可扩展21 22 23…
          cardElementAttribute:!!$scope.form.cardElementAttribute?$scope.form.cardElementAttribute.type:'',//1必填2推送3列表显示4审批可改5通栏6主页显示7子文件夹名称8是否汇总9是否生成序号10明细是否显示表头。用逗号隔开，例如 1,2,3,5
          cardElementDesc:$scope.form.cardElementDesc,//提示
          cardElementExplainShowFlag:'',//显示审批是否可改
          cardElementExplain:''//字段填写说明
        },
        url:'/CommonPlatform/cardElementConfig!add.action',
        before(){
            $scope.message = "正在加载";
            $loading.start("buildUpload");
        }
      }).then(function(resp){
        let data = resp.data;
        if(data.result){
          $scope.message = "加载成功";
          $scope.cancel();
          $rootScope.refreshTemplateData();
        }else{
          $scope.message = "加载失败,错误原因:"+data.data;
          error = true;
        }
      }).catch(function(err){
        error = true;
        $scope.message = "加载失败,错误原因：" + err;
      }).finally(function(){
          if(error){
            $timeout(function(){
              $loading.finish("buildUpload");
            },2000)
          }else{
            $timeout(function(){
              $loading.finish("buildUpload");
            },1000)
          }
      });
    }
  }
]);
