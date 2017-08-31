/**
 * [列表]
 * right-icon-style="" 多余字段
 *  right-btn-handler="click()" 点击右侧图标回调时间
 *  right-icon-auto-visible="true"
 *  right-icon = ""右侧图标样式
<app-list-item name="asdfda" ng-repeat="" right-icon-style="icon xxxx" right-btn-handler="click()">

</app-list-item>




 * @type {String}
 */
APP.directive('appListItem', ['$timeout', 'uuid', '$log', ($timeout, uuid, $log) => {
  return {
    templateUrl: 'script/common/directive/listItem/listItem.html?t=' + uuid.getUUID(),
    scope: {//@ = &
      name:"@",//鼠标点击变色，如果不加该值不会有效果
      rightIconStyle:"@",//add top left delete
      rightBtnHandler:"&",//点击右侧按钮处理函数
      rightIconAutoVisible:"@",//右侧图标是否自动隐藏
      rightIcon:"@",//右侧图标
      clazz:"@class"
    },
    transclude: true,
    restrict: 'E',
    replace : false,
    controller($scope) {

    },
    link($scope, $element, $attrs, ngModelCtrl) {

      if(!angular.isDefined($scope.rightIconAutoVisible)){
        $scope.rightIconAutoVisible = false;
      }
      if(!angular.isDefined($scope.rightIcon)){
        $scope.rightIcon = 'icon ColorChangeFont icon-you';
      }
			$scope.id = "listItem-" + uuid.getUUID();


      // 点击时添加选中样式,如果没有name属性，则不会生效
      $element.on('click',function(e){
        // e.stopPropagation();
        if(angular.isDefined($scope.name)){
          let names = $('app-list-item[name="'+$scope.name+'"]');
          angular.forEach(names,(ele)=>{
            $(ele).find('div:eq(0)').removeClass("app-list-item-selected");
          })
          var that = $(this);
          that.find('div:eq(0)').addClass("app-list-item-selected");
        }
      });

      //点击右侧图标
      $scope.clickRightBtn = function(){
        $scope.rightBtnHandler();
      }

      //自动隐藏右侧图标
      if($scope.rightIconAutoVisible == 'true'){
        $element.find('.rightIcon').css('visibility','hidden');

        $element.on('mouseenter',function(){
          $element.find('.rightIcon').css('visibility','visible');
        });
        $element.on('mouseleave',function(){
          $element.find('.rightIcon').css('visibility','hidden');
        });
      }

    }
  }
}]);
