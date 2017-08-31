/**
 * [ 主模板预览 ]
 */
APP.controller('buildNumberCtrl', [
  '$rootScope',
  '$scope',
  '$timeout',
  '$loading',
  '$log',
  '$appHttp',
  'localStorageService',
  'userInfo',
  'templateMainType',
  'buildNumberConstant',
  'positionConstant',
  ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType,buildNumberConstant,positionConstant) => {
    $.extend($scope, $rootScope.$stateParams);
    $scope.form = {};
    $scope.buildNumberConstant = buildNumberConstant;
    $scope.positionConstant = positionConstant;
    //取消
    $scope.cancel = function(){
      $scope.closeThisDialog('取消');
    }

    //保存
    $scope.save = function(){
      let error = false;
      let attributes = [];
      for(let i=0; i<$scope.form.cardElementAttribute.length; i++){
        let attr = $scope.form.cardElementAttribute[i];
        attributes.push(attr.type);
      }

      $appHttp.getData({
          url: '/CommonPlatform/cardElementConfig!add.action',
          params: {
            typeCardId:$rootScope.currentTypeCard.typeCardId,//隶属分类卡ID
            cardElementType:'2',//元素卡类型<重要，对应下面的7种类型，并且要追加参数> 下拉菜单公共字典fid=40
            cardElementName:$scope.form.cardElementName,//元素中文字段名称
            createUserId:localStorageService.get(userInfo.userID),
            viewOrder:parseInt($rootScope.maxViewOrder) + 100,//排序字段不传递默认0，跨度100，例如100,200这样
            cardElementAttribute:attributes,//1必填2推送3列表显示4审批可改5通栏6主页显示7子文件夹名称8是否汇总9是否生成序号10明细是否显示表头。用逗号隔开，例如 1,2,3,5
            cardElementDesc:$scope.form.cardElementDesc,//提示

            // 以下是数字构件特有属性
            decimalDigits:$scope.form.decimalDigits.type,//小数位数
            thousands:$scope.form.thousands.type,//千分位
            percentage:$scope.form.percentage.type, //百分位
            position:$scope.form.position.type,//列表位置 01表示第一行末尾 11,12,13分别表示第二行的三个位置，可扩展21 22 23…           
            cardElementExplainShowFlag:$scope.form.cardElementExplainShowFlag.type,//显示审批是否可改
            cardElementExplain:$scope.form.cardElementExplain,//字段填写说明
            units:$scope.form.units
          },
          before: function() {
            $scope.message = "正在保存";
            $loading.start("buildText");
          }
        })
        .then(resp => {
          if(resp.data.result){
            $scope.message = "保存成功";
            $scope.cancel();
			console.log("数字请求");
			console.log(resp);
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
              $loading.finish('buildText');
            }, 2000)
          } else {
            $scope.message = "保存成功";
            $timeout(() => {
              $loading.finish('buildText');
            }, 1000)
          }
        });
    }
  }
]);
