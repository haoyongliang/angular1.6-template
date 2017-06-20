
/**
 * 模拟移动端页面布局，上面是返回 标题 更多，下面是内容
 * head-style="1" 设置头部样式，包括返回，标题 更多
 * head-style="2" 设置头部样式，包括返回，标题 更多，但是返回只占用位置
 */
APP.directive('appPagePanel',function($timeout,uuid){
	return {
		templateUrl:'script/directive/pagePanel/pagePanel.html?t='+uuid.getUUID(),
		scope:{
			width :"@",
			height : "@",
			headStyle : "@",
			textAlign : "@",
			borderBottom : "@border",
			leftBtnIcon : "@",
			clazz:"@class",
			
		},
		transclude: true,
		restrict: 'E',
		controller:function($scope){
			
		},
		link: function($scope, $element, $attrs, ngModelCtrl){
			//给属性设置默认值
			if(!(!!$scope.textAlign && ($scope.textAlign=='left' || $scope.textAlign=='center' || $scope.textAlign=='right'))){
				$scope.textAlign = 'center';
			}
			if(!$scope.height){
				$scope.height = '100%';
			}
			if(!$scope.width){
				$scope.width = '100%';
			}
			if(!$scope.headStyle){
				$scope.headStyle = '1';
			}
			if(!$scope.borderBottom){
				$scope.borderBottom = "1px solid #D9D9D9";
			}
			if(!$scope.leftBtnIcon){
				$scope.leftBtnIcon = "glyphicon glyphicon-menu-hamburger";
			}
			if(!$scope.clazz){
				$scope.clazz='';
			}
			$scope.showPanel = function(){
				var panel = $element.find('#visiblePanel');
				panel.removeClass('d-n').addClass('d-b')
			}
			$scope.hidePanel = function(){
				var panel = $element.find('#visiblePanel').removeClass('d-b').addClass('d-n')
			}
			
			
			$scope.change = function(){
			$timeout(()=>{
				console.log(1111);
				$scope.$apply(()=>{
					$scope.panel2 = '';
				});
			},2000);

				
			}
			console.log($scope.borderBottom);
//			$scope.updateScrollbar('scrollTo', 10);
		}
		
	}
});