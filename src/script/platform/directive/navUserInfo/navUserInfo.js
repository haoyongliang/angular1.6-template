APP.directive('dropseaNavUserInfo',['uuid',(uuid)=>{
	return {
		templateUrl:'script/platform/directive/navUserInfo/navUserInfo.html?t='+ uuid.getUUID(),
		scope:{
		},
		replace:true,
		restrict: 'E',
		controller:function($scope){
			
		},
		link: function($scope, $element, $attrs, ngModelCtrl){
			
		}
		
	}
}])