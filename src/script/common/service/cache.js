/**
 * 操作cookie的服务
 */
APP.service('cache',['$cookies',function($cookies){
	/**
	 * [存数据]
	 * @param  {[type]} key   [description]
	 * @param  {[type]} value [description]
	 * @return {[type]}       [description]
	 */
	this.put = function(key, value){
		$cookies.put(key,value);
	}
	/**
	 * [获取数据]
	 * @param  {[type]} key [description]
	 * @return {[type]}     [description]
	 */
	this.get = function(key){
		return $cookies.get(key);
	}
	/**
	 * [删除]
	 * @param  {[type]} key [description]
	 * @return {[type]}     [description]
	 */
	this.remove = function(key){
		$cookies.remove(key);
	}
}])
