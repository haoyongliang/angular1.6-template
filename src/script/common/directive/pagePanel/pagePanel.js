/**
 * 模拟移动端页面布局，上面是返回 标题 更多，下面是内容
 * head-style="1" 设置头部样式，包括返回，标题 更多
 * head-style="2" 设置头部样式，包括返回，标题 更多，但是返回只占用位置
 * head-style="3" 包含标题、操作
 * header:头部文字
 * width 宽度
 * height 高度
 * text-align : 头部文字对其方式
 * left-btn-icon :右侧图标样式
 * callback ="bbb()": 点击右侧按钮回调
 * left-btn-handler="aaaa()" 左侧图标回调函数
 * has-header-color="false" 没有背景色，默认有
 * has-border="false" 没有边框，默认有
 * border-weight="2px" 头部底边粗细，默认1px
 *
 */
APP.directive('appPagePanel', ['$timeout', 'uuid','$state', ($timeout, uuid) => {
  return {
    templateUrl: 'script/common/directive/pagePanel/pagePanel.html?t=' + uuid.getUUID(),
    scope: {
      header: "@",
      width: "@",
      height: "@",
      headStyle: "@",
      textAlign: "@",
      leftBtnIcon: "@",//右侧按钮，我左右不分
      clazz: "@class",
      callback: "&",
      leftBtnHandler:'&',

    },
    transclude: true,
    restrict: 'E',
    controller($scope) {

    },
    link($scope, $element, $attrs, ngModelCtrl) {
			$scope.id = "lrc-containerd-" + uuid.getUUID();
      if(!$attrs.hasHeaderColor){
        $scope.hasHeaderColor = true;
      }else{
        if($attrs.hasHeaderColor == 'true'){
          $scope.hasHeaderColor = true;
        }else{
          $scope.hasHeaderColor = false;
        }
      }

      if(!$attrs.hasBorder){
        $scope.hasBorder = true;
      }else{
        if($attrs.hasBorder == 'true'){
          $scope.hasBorder = true;
        }else{
          $scope.hasBorder =  false;
        }
      }

      //头部底线粗细，默认1px
      if(!$attrs.borderWeight){
        $scope.borderWeight = '1px';
      }else{
        $scope.borderWeight = $attrs.borderWeight;
      }

      //给属性设置默认值
      if (!(!!$scope.textAlign && ($scope.textAlign == 'left' || $scope.textAlign == 'center' || $scope.textAlign == 'right'))) {
        $scope.textAlign = 'center';
      }
      if (!$scope.header) {
        $scope.header = '';
      }
      if (!$scope.height) {
        $scope.height = '100%';
      }
      if (!$scope.width) {
        $scope.width = '100%';
      }
      if (!$scope.headStyle) {
        $scope.headStyle = '1';
      }

      if (!$scope.leftBtnIcon) {
        $scope.leftBtnIcon = "icon ColorChangeFont  icon-jian";
      }

      $scope.leftBtnClick = $event=>{
          $scope.leftBtnHandler();
      }

      if (!$scope.clazz) {
        $scope.clazz = '';
      }
      $scope.showPanel = function() {
        var panel = $element.find('#visiblePanel');
        panel.removeClass('d-n').addClass('d-b')
      }
      $scope.hidePanel = function() {
        var panel = $element.find('#visiblePanel').removeClass('d-b').addClass('d-n')
      }

			$element.on('click', ' .leftBtnIcon', ()=>{
				if(angular.isFunction($scope.callback)){
					$scope.callback();
				}
			});



      $scope.change = function() {
        $timeout(() => {
          console.log(1111);
          $scope.$apply(() => {
            $scope.panel2 = '';
          });
        }, 2000);
      }
    }

  }
}]);
