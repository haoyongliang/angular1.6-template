/**
 * 操作cookie的服务
 */
APP.service('cache',['$cookies',function($cookies){
	this.put = function(key, value){
		$cookies.put(key,value);
	}
	this.get = function(key){
		return $cookies.get(key);
	}
	this.remove = function(key){
		$cookies.remove(key);	
	}
}])