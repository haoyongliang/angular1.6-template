/**
 * [ 主模板 ]
 */
APP.controller('addMainTemplateCtrl', [
  '$rootScope',
  '$scope',
  '$timeout',
  '$loading',
  '$log',
  '$appHttp',
  'localStorageService',
  'userInfo',
  'templateMainType',
  '$state',
  ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo,templateMainType,$state) => {
    //模板类型
    $scope.templateMainTypes = templateMainType;
    $scope.form = {};
    $log.info($scope.entId);
    $scope.submit = function(){
      $scope.message = "正在创建主模板";
      let error = false;
      let cards = []
      if(angular.isDefined($scope.form.card1)){
        cards.unshift({
          createUserId:$scope.createUserId,
          templateId:'',
          typeCardName:$scope.form.card1,
          typeCardType:'1',
          viewOrder:'0'
        });
      }
      if(angular.isDefined($scope.form.card2)){
        cards.unshift({
          createUserId:$scope.createUserId,
          templateId:'',
          typeCardName:$scope.form.card2,
          typeCardType:'1',
          viewOrder:'0'
        });
      }
      if(angular.isDefined($scope.form.card3)){
        cards.unshift({
          createUserId:$scope.createUserId,
          templateId:'',
          typeCardName:$scope.form.card3,
          typeCardType:'1',
          viewOrder:'0'
        });
      }
      if(angular.isDefined($scope.form.card4)){
        cards.unshift({
          createUserId:$scope.createUserId,
          templateId:'',
          typeCardName:$scope.form.card4,
          typeCardType:'1',
          viewOrder:'0'
        });
      }
      $appHttp.getData({
        params:{
          templateId:'',
          templateMainType:$scope.form.mainType,
          templateName:$scope.form.templateName,
          templateDesc:$scope.form.templateDesc,
          entId:localStorageService.get('home.myTemplateIndex.entId'),
          createUserId:localStorageService.get(userInfo.userID),
          viewOrder:'0',
          isindia:'0',
          initIsindiaTypeCard:'0',
          typeCardsJson:JSON.stringify(cards)
        },
        url:'/CommonPlatform/templateConfig!addTempAndTypeCard.action',
        before:function(){
          $loading.start('addMainTemplate');
        }
      }).then(function(resp){
        let data = resp.data;
        $scope.message = "添加成功";
        if(!data.result){
          error = true;
          $scope.message = "添加失败";
        }
        $scope.$emit('addMainTemplateFinish');

        $state.go('home.myTemplate.previewMainTemplate',{
          templateId:data.data,
          templateName:$scope.form.templateName
        });
      }).catch(function(e){
        error = true;
        $log.error(e);
      }).finally(function(){

        $timeout(()=>{
          $loading.finish('addMainTemplate');
        },1000);

      });
    }
  }
]);
