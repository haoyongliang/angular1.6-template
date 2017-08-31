/**
 * [ 主模板预览 ]
 */
APP.controller('buildTextCtrl', [
  '$rootScope',
  '$scope',
  '$timeout',
  '$loading',
  '$log',
  '$appHttp',
  'localStorageService',
  'userInfo',
  'templateMainType',
  'buildTextConstant',
  'positionConstant',
  'cardElementAttributeConstant',
  ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType,buildTextConstant,positionConstant,cardElementAttributeConstant) => {
    $.extend($scope, $rootScope.$stateParams);
    $scope.form = {};
    $scope.buildTextConstant = buildTextConstant;//文本构件需要的数据
    $scope.positionConstant = positionConstant;//位置
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
            cardElementType:'1',//元素卡类型<重要，对应下面的7种类型，并且要追加参数> 下拉菜单公共字典fid=40
            cardElementName:$scope.form.cardElementName,//元素中文字段名称
            createUserId:localStorageService.get(userInfo.userID),
            viewOrder:parseInt($rootScope.maxViewOrder) + 100,//排序字段不传递默认0，跨度100，例如100,200这样

            // 以下是文本构件特有属性
            textType:$scope.form.textType.type,//特殊文字
            textRows:$scope.form.textRows.type,//文本行数
            position:$rootScope.hasCardElementAttribute($scope.form.cardElementAttribute,3)? $scope.form.position.type:'',//列表位置 01表示第一行末尾 11,12,13分别表示第二行的三个位置，可扩展21 22 23…
            cardElementAttribute:attributes,//1必填2推送3列表显示4审批可改5通栏6主页显示7子文件夹名称8是否汇总9是否生成序号10明细是否显示表头。用逗号隔开，例如 1,2,3,5
            cardElementDesc:$scope.form.cardElementDesc,//提示
            cardElementExplainShowFlag:$scope.form.cardElementExplainShowFlag.type,//显示审批是否可改
            cardElementExplain:$scope.form.cardElementExplain//字段填写说明
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

            $timeout(() => {
              $loading.finish('buildText');
            }, 1000)
          }
        });
    }
  }
]);
