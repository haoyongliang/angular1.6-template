/**
 * [ 显示部门人员列表 ]
 */
APP.controller('depUserListCtrl', [
  '$rootScope',
  '$scope',
  '$timeout',
  '$loading',
  '$log',
  '$appHttp',
  'localStorageService',
  'userInfo',
  'templateMainType',
  'buildSelectConstant',
  'positionConstant',
  'ngDialog',
  'selectInstance',
  ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType,buildSelectConstant,positionConstant,ngDialog,selectInstance) => {
    
    $.extend($scope,selectInstance)
    $scope.cache = [];
    
    /**
     * 给数组中的所有对象添加属性，值是val
     * @param {Object} targetArr
     * @param {Object} name
     * @param {Object} val
     */
    function _addCheck(targetArr){
    	for(let i=0; i<targetArr.length; i++){
			let item = targetArr[i];
			item.check = false;
		}
    }
    
    /**
     * [ 返回上一层 ]
     */
    $scope.back = function(){
    	if($scope.cache.length != 0){
    		let curObj = $scope.cache.pop();
    		_addCheck(curObj.groupList);
    		_addCheck(curObj.userList);
    		
    		$scope.groupList = curObj.groupList;
    		$scope.userList = curObj.userList;
    	}
    }
    
    /**
     * 获取子列表
     */
    $scope.getSubList = function(dicinfo, entId, fid, id, userCount){
    	let error = false;
    	$scope.message = "正在请求数据";
    	$appHttp.getData({
    		params:{
    			entId:localStorageService.get('home.myTemplateIndex.entId'),
    			fid:id
    		},
    		url:'/CommonPlatform/enterpriseGroupConfig!getGroupAndUser.action',
    		before(){
    			$loading.start("buildSelectDevUserList");
    		}
    	}).then(function(resp){
    		let data = resp.data;
    		let bak = {};
    		bak.groupList = $.clone($scope.groupList);
    		bak.userList = $.clone($scope.userList);
    		$scope.cache.push(bak);
    		$scope.message = "获取数据成功";
    		_addCheck(data.groups);
			
    		if($scope.type == 'user'){
    			_addCheck(data.users);
    		}
    		
    		$scope.groupList = data.groups;
    		$scope.userList = data.users;
    		
    	}).catch(function(err){
    		console.log(err);
    		error = true;
    		$scope.message = err
    	}).finally(function(){
    		if(error){
    			$timeout(function(){
    				$loading.finish("buildSelectDevUserList");
    			},2000);
    		}else{
    			$timeout(function(){
    				$loading.finish("buildSelectDevUserList");
    			},1000);
    		}
    		
    	});
    }
    $scope.init = function(){
    	let error = false;
    	$scope.message = "正在请求数据";
    	$appHttp.getData({
    		params:{
    			entId:localStorageService.get('home.myTemplateIndex.entId')
    		},
    		url:'/CommonPlatform/enterpriseGroupConfig!getGroupByentId.action',
    		before(){
    			$loading.start("buildSelectDevUserList");
    		}
    	}).then(function(resp){
    		let data = resp.data;
    		$scope.message = "获取数据成功"
    		_addCheck(data.groups);
    		if($scope.type == 'user'){
    			_addCheck(data.users);
    		}
    		$scope.groupList = data.groups;
    		$scope.userList = data.users;
    		
    	}).catch(function(err){
    		console.log(err);
    		error = true;
    		$scope.message = err
    	}).finally(function(){
    		if(error){
    			$timeout(function(){
    				$loading.finish("buildSelectDevUserList");
    			},2000);
    		}else{
    			$timeout(function(){
    				$loading.finish("buildSelectDevUserList");
    			},1000);
    		}
    	});
    }
    
    //取消
    $scope.cancel = function(){
      $scope.closeThisDialog('取消');
    }
    $scope.save = function(){
    	selectInstance.data = [];
    	if(selectInstance.type == 'user'){
    		angular.forEach($scope.userList,function(item, index){
				if(item.check == true){
					selectInstance.data.push(item);		
				}
    		});
    	}else if(selectInstance.type == 'group'){
    		angular.forEach($scope.groupList,function(item, index){
				if(item.check == true){
					selectInstance.data.push(item);		
				}
    		});
    	}
    	
    	$scope.closeThisDialog('取消');
    }
    
}]);
