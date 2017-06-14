/**
 * 操作get,post请求
 */
APP.service('$myHttp',['$rootScope','$filter','$http','$timeout','$q',function($rootScope,$filter,$http,$timeout,$q){
	
	//默认post
	this.getData = function(url,params,before){
		if($.isFunction(before)){
			before();
		}
		
		var def = $q.defer();
		
		$http.post(url,{'params':params})
		.then(resp=>{
			def.resolve(resp)
		}).catch(err=>{
			def.reject(err)
		})
		
		return def.promise;
	}
	//get请求
	this.getDataByGet = function(url,params,before){
		if($.isFunction(before)){
			before();
		}
		
		var def = $q.defer();
		
		$http.get(url,{'params':params})
		.then(resp=>{
			def.resolve(resp)
		}).catch(err=>{
			def.reject(err)
		})
		
		return def.promise;
	}
}]);