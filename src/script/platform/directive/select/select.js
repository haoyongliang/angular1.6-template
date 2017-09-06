APP.directive('dropseaSelect', ['$timeout', 'uuid', '$log', '$appHttp', '$loading',function($timeout, uuid, $log, $appHttp,$loading) {
	return {
		templateUrl: 'script/platform/directive/select/select.html?t=' + uuid.getUUID(),
		scope: {
			selectUrl: '@',
			ngBindModel: '=ngModel',
			placeholder:'@'
		},
		transclude: true,
		restrict: 'EA',
		replace: false,
		controller($scope) {

		},
		link($scope, $element, $attrs, $ngModelCtrl) {
			$scope.id = "select"+uuid.getUUID();
			if(!!$attrs.multiple){
				$scope.multiple = 'multiple';
			}else{
				$scope.multiple = '';
			}
			$scope.items = [];
			console.log($scope.selectUrl)
			if(!!$scope.selectUrl) {
				let selectURLObj = JSON.parse($scope.selectUrl);
				$scope.name = selectURLObj.name;

				if(selectURLObj.type == "url") {
					//"{"type":"url","data":"customBaseInfo!getEntSelectListbyFid.action?fid=100&entid=283","name":"基础数据"}"
					$appHttp.getData({
						params: {},
						url: "/CommonPlatform/" + selectURLObj.data,
						before(){
							$loading.start($scope.id);
						}
					}).then(resp => {
						
						let data = resp.data;
						if(data.length > 0) {
							for(let i = 0; i < data.length; i++) {
								$scope.items.push({
									name:data[i]["dicinfo"],
									type:data[i]
								});
							}
							$loading.finish($scope.id);
						}

					}).catch(error => {
						$loading.finish($scope.id);
					}).finally(() => {
						
					})
				} else if(selectURLObj.type == "user") {
					let users = selectURLObj.data;
					angular.forEach(users,function(item, index){
						$scope.items.push({
							name:item.userName,
							type:item
						});
					});
				} else if(selectURLObj.type == "group") {
					let groups = selectURLObj.data;
					angular.forEach(groups,function(item, index){
						$scope.items.push({
							name:item.dicinfo,
							type:item
						});
					});
				}
			}
		}
	}
}]);