APP.directive('appYearSelector',(uuid)=>{
	return {
		templateUrl:'script/directive/yearselector/yearselector.html?t='+ uuid.getUUID(),
		scope:{
			model:"=ngModel"
		},
		replace:true,
		restrict: 'E',
		controller:function($scope){
			
		},
		link: function($scope, $element, $attrs, ngModelCtrl){
			console.log(2);
			$scope.change = function(){
				$scope.model = "aaa";
			}
		}
	}
})