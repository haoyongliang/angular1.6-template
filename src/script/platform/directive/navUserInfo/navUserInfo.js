
APP.directive('dropseaNavUserInfo',['uuid','$state',(uuid,$state)=>{
	return {
		templateUrl:'script/platform/directive/navUserInfo/navUserInfo.html?t='+ uuid.getUUID(),
		scope:{
		},
		replace:true,
		restrict: 'E',
		controller:function($scope){

		},
		link: function($scope, $element, $attrs, ngModelCtrl){
				$scope.gotoOrganization = function($event){
					$state.go('home.organization');
				}

				$scope.gotoUserInfo = function($event){
					$state.go('home.userInfo');
				}
				$scope.gotoUserSet = function($event){
					$state.go('home.userSet');
				}
				$scope.gotoMyTemplate = function($event){
					$state.go('home.myTemplateIndex');
				}
		}
	}
}])
