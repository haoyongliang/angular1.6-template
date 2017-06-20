
/**
 * 注意：因为自带滚动条，所以在使用<left>或者<right>标签的时候高度无法100%，只能自适应
 * 左固定，右百分比自适应布局
 * width,height,默认100%
 * class:布局的样式
 * left-width="20px" 左边宽度
 * left-style="bg-gray"左边布局的样式
 * right-styl="bg-gray"右边布局样式
 */
APP.directive('appRightLeftLayout',function($timeout,uuid){
	return {
		templateUrl:'script/directive/leftRightLayout/rightLeftLayout.html ?t='+ uuid.getUUID(),
		scope:{
			width :"@",
			height : "@",
			clazz:"@class",
			leftWidth:"@",
			leftStyle :"@",
			rightStyle : "@",
			centerStyle :"@",
			centerWidth : "@",
			centerIconStyle : "@",
		},
		replace:true,
		transclude: {
			left:"?left",
			right:"?right"
		},
		restrict: 'E',
		controller:function($scope){
			
		},
		link: function($scope, $element, $attrs, ngModelCtrl){
			$scope.id = "lrc-containerd-" + uuid.getUUID();
			$scope.curIsShowLeft = true;//当前是否显示左边布局
			$scope.leftWidthBak = $scope.leftWidth;//备份左边布局宽度，滑动时使用
			
			const leftIcon = "glyphicon glyphicon-triangle-left";
			const rightIcon = "glyphicon glyphicon-triangle-right";
			$scope.centerIcon = leftIcon;
			
			//给属性设置默认值
			if(!$scope.height){
				$scope.height = '100%';
			}
			if(!$scope.width){
				$scope.width = '100%';
			}
			if(!$scope.class){
				$scope.class = '';
			}
			
			if(!$scope.leftWidth){
				$scope.leftWidth = '50%';
			}else{
				console.log(parseFloat($scope.leftWidth)+10+'px');
				$scope.leftWidth = parseFloat($scope.leftWidth)+10+'px';
			}
			
			if(!angular.isDefined($scope.leftStyle)){
				$scope.leftStyle = "";
			}
			if(!angular.isDefined($scope.rightStyle)){
				$scope.rightStyle = "";
			}
			if(!angular.isDefined($scope.centerStyle)){
				$scope.centerStyle = "";
			}
			if(!angular.isDefined($scope.centerWidth)){
				$scope.centerWidth = "13.6px";
			}
			
			if(!angular.isDefined($scope.centerIconStyle)){
				$scope.centerIconStyle = "";
			}
			//初始化left,right标签样式			
			$element.find('left,right').addClass('h-100 w-100 d-ib');
			
			
			//给中间栏添加点击事件,切换左右滑动特效
			$(".lrl-centerBtn").on('click',()=>{
				if(!!$scope.curIsShowLeft){
					$scope.curIsShowLeft = false;
					$('#a'+$scope.id).animate({width:0});
					$('#b'+$scope.id).animate({'margin-left':0});
					$scope.leftWidth = 0;
					$timeout(()=>{
						$scope.$apply(()=>{
							$scope.centerIcon = rightIcon;
						});
					},0);
				}else{
					$scope.curIsShowLeft = true;
					$('#a'+$scope.id).animate({width: $scope.leftWidthBak});
					$('#b'+$scope.id).animate({'margin-left': $scope.leftWidthBak});
					$scope.leftWidth = $scope.leftWidthBak;
					$timeout(()=>{
						$scope.$apply(()=>{
							$scope.centerIcon = leftIcon;
						});
					},0);
				}
			});
		}
	}
});