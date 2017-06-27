APP.directive('panel1a',['uuid',(uuid)=>{
	return {
		templateUrl:'script/platform/directive/panel1/panel1.html?t='+ uuid.getUUID(),
		scope:{
		},
		replace:false,
		restrict: 'E',
		controller:function($scope){

		},
		link: function($scope, $element, $attrs, ngModelCtrl){

		}
	}
}])
