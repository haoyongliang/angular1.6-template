/**
 * 操作http服务
 */
APP.service('$myHttp',['$rootScope','$filter','$http','$timeout','$q',function($rootScope,$filter,$http,$timeout,$q){

	//默认post
	this.getData = function(url,params,before){
		if($.isFunction(before)){
			before();
		}
		
		var def = $q.defer();

		$http({
			mehtod:'POST',
			url:url,
			data:params,
			headers: {'Content-Type': undefined}
		}).then(resp=>{
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
	//jsonp请求
	this.getDataByJsonp = function(url,params,jsonpCallbackParam,before){
		if($.isFunction(before)){
			before();
		}
		var deff = $q.defer();

		$http.jsonp(url,{
	    	params: params,
	        'jsonpCallbackParam':jsonpCallbackParam||'callback'
	    }).then((data)=>{
	    	def.resolve(data);
	    }).catch(err=>{
			def.reject(err)
		})
	}
}]);
