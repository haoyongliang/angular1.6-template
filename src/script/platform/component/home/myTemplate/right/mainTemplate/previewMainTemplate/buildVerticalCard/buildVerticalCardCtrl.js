APP.controller('buildVerticalCardCtrl',[
  '$rootScope',
  '$scope',
  '$timeout',
  '$loading',
  '$log',
  '$appHttp',
  'localStorageService',
  'userInfo',
  'templateMainType',
  'buildVerticalCardConstant',
  'colorConstant',
  ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo,templateMainType,buildVerticalCardConstant,colorConstant) => {


  $scope.form = {};//表单对象
  $scope.buildVerticalCardConstant = buildVerticalCardConstant;//存储文字位置，文字加粗的常量
  $scope.colorConstant = colorConstant;//存储颜色的常量
  $log.info($scope.colorConstant);
  $scope.init = function(){
  }
  //取消
  $scope.cancel = function(){
    $scope.closeThisDialog('取消');
  }

  //保存
  $scope.save = function(){
    let error = false;
    $log.info($rootScope.maxViewOrder);

    $appHttp.getData({
        url: '/CommonPlatform/cardElementConfig!add.action',
        params: {
          typeCardId:$rootScope.currentTypeCard.typeCardId,//隶属分类卡ID
          cardElementType:'0',//元素卡类型<重要，对应下面的7种类型，并且要追加参数> 下拉菜单公共字典fid=40
          cardElementName:$scope.form.cardElementName,//元素中文字段名称
          cardElementAttribute:'',//1必填2推送3列表显示4审批可改5通栏6主页显示7子文件夹名称8是否汇总9是否生成序号10明细是否显示表头。用逗号隔开，例如 1,2,3,5
          cardElementDesc:'',//元素描述
          cardElementExplain:'',//元素说明
          cardElementExplainShowFlag:'',//说明审批是否显示 0不显示1显示
          createUserId:localStorageService.get(userInfo.userID),
          viewOrder:parseInt($rootScope.maxViewOrder) + 100,//排序字段不传递默认0，跨度100，例如100,200这样
          position:'',//列表位置 01表示第一行末尾 11,12,13分别表示第二行的三个位置，可扩展21 22 23…

          // 以下是总想分类卡特有属性
          descPosition:$scope.form.descPosition.type,//文字位置
          isBold:$scope.form.isBold.type,//是否加粗
          fontColor:$scope.form.fontColor.type,//文字颜色
          isPortrait:'1'//是否纵向 1纵0横
        },
        before: function() {
          $scope.message = "正在保存";
          $loading.start("buildVerticalCard");
        }
      })
      .then(resp => {
        if(resp.data.result){
          $scope.message = "保存成功";
          $scope.cancel();
          $rootScope.refreshTemplateData();
        }else{
          $scope.message = resp.data.data;
        }

      }).catch(err => {
        error = true;
        $scope.message = "加载失败";
        $log.error(err);
      }).finally(() => {
        if (!!error) {
          //错误信息停留2S后消失
          $timeout(() => {
            $loading.finish('buildVerticalCard');
          }, 2000)
        } else {

          $timeout(() => {
            $loading.finish('buildVerticalCard');
          }, 1000)
        }
      });
  }
}]);
