/**
 * 操作http服务
 */
APP.service('$appHttp',['$rootScope','$filter','$http','$timeout','$q','localStorageService','$log',function($rootScope,$filter,$http,$timeout,$q,localStorageService,$log){
	//{a:'a',b:'b'} == > a=a&b=b
	function serializeData( data ) {
	    // If this is not an object, defer to native stringification.
	    if ( ! angular.isObject( data ) ) {
	        return( ( data == null ) ? "" : data.toString() );
	    }
	    var buffer = [];
	    // Serialize each key in the object.
	    for ( var name in data ) {
	        if ( ! data.hasOwnProperty( name ) ) {
	            continue;
	        }
	        var value = data[ name ];
	        buffer.push(
	            encodeURIComponent( name ) + "=" + encodeURIComponent( ( value == null ) ? "" : value )
	        );
	    }
	    // Serialize the buffer and clean it up for transportation.
	    var source = buffer.join( "&" ).replace( /%20/g, "+" );
	    return( source );
	};
	/**
	 * [post 请求]
	 * @param  {[string]} param.url         [请求路径]
	 * @param  {[object]} param.params      [请求参数]
	 * @param  {[function]} param.before      [请求响应前回调函数]
	 * @param  {[boolean]} param.enableCache [是否启用缓存，默认不启用]
	 */
	this.getData = function(param){
		if($.isFunction(param.before)){
			param.before();
		}
		if(param.enableCache==undefined){
			param.enableCache = false;
		}

		let def = $q.defer();
		let compileParams = serializeData(param.params);
		let compileUrl;
		let cache	= localStorageService.get(compileUrl);
		
		if(compileParams.length==0){
			compileUrl = param.url;	
		}else{
			compileUrl = param.url+"?"+compileParams;
		}
		
		if(!!param.enableCache && !!cache){
			cache.isCacheData = true;
			def.resolve(cache);
		}else{
			$http({
				mehtod:'POST',
				url:compileUrl,
				data:param.params,
				headers: {'Content-Type': undefined}
			}).then(resp=>{
				if(!!param.enableCache){
					localStorageService.set(compileUrl, resp);
				}
				resp.isCacheData = false;
				$log.info('请求url---------------------------------');
				$log.info(compileUrl);
				$log.info('请求结果---------------------------------');
				$log.info(resp);
				def.resolve(resp)
			}).catch(err=>{
				def.reject(err)
			})
		}

		return def.promise;
	}

	/**
	 * [get 请求]
	 * @param  {[type]} url         [请求路径]
	 * @param  {[type]} params      [请求参数]
	 * @param  {[type]} before      [请求响应前回调函数]
	 * @param  {[type]} enableCache [是否启用缓存，默认不启用]
	 */
	this.getDataByGet = function(param){
		if($.isFunction(param.before)){
			param.before();
		}
		if(param.enableCache==undefined){
			param.enableCache = false;
		}

		let def = $q.defer();
		let compileParams = serializeData(param.params);
		let compileUrl = param.url+"?"+compileParams;
		let cache	= localStorageService.get(compileUrl);

		if(!!param.enableCache && !!cache){
			cache.isCache = true;
			def.resolve(cache);
		}else{
			$http.get(param.url,{'params':param.params})
			.then(resp=>{
				if(!!param.enableCache){
					localStorageService.set(compileUrl, resp);
				}
				resp.isCache = false;
				def.resolve(resp)
			}).catch(err=>{
				def.reject(err)
			})
		}


		return def.promise;
	}
	/**
	 * [ JSONP 请求 ]
	 * @param  {[type]} url                [地址]
	 * @param  {[type]} params             [参数]
	 * @param  {[type]} jsonpCallbackParam [回调函数名]
	 * @param  {[type]} before             [请求前做的事情]
	 * @return {[type]}                    [description]
	 */
	this.getDataByJsonp = function(url,params,jsonpCallbackParam,before){
		if($.isFunction(before)){
			before();
		}
		let def = $q.defer();

		$http.jsonp(url,{
	    	params: params,
	        'jsonpCallbackParam':jsonpCallbackParam||'callback'
	    }).then((resp)=>{
	    	def.resolve(resp);
	    }).catch(err=>{
				def.reject(err)
		})

		return def.promise;
	}
}]);
