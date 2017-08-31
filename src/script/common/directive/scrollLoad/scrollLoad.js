/**
 *
<div style="height: 200px; width: 200px; background-color: pink;"> 通过最外层的div设置宽高
	<div ng-scrollbars> 在容器中添加滚动条
		<div app-scroll-load url='http://localhost:8080/springmvc_project/getAllStudent' params="{{params}}" method="get" num-name="page2"  callback="handler()" histroy-count="200" histroy-count-name="num"> 在滚动条中添加下拉加载
			<div ng-repeat="item in items"  >{{item}}</div>
		</div>
	</div>
</div>
 * 滚动加载，必须配合ng-scrollbars 指令内部使用
 * 需要传递给服务端的参数必须包含第N页，每页多少条记录
 * url:请求的地址
 * target-push:是一个数组或者集合，会将请求回的数据添加到数据集中,不要和callback同时使用,一般不用该属性
 * params:请求参数
 * method:请求方式
 * num-name:服务端需要通过该值(字段名)获取当前显示第几页的数据
 * history-count:每页显示记录数
 * history-count-name:服务端需要通过该值(字段名)获取每页显示记录数
 * callback:如果不是简单的将请求回的数据添加到数据集中用回调函数，callback='handler()' ,不要和target-push同时使用
 * handler在ctrl中的写法,data就是请求回的数据,hasMoreData用于标记是否继续滚动，如果设置该对象的flag=false则不继续滚动
 * 	$scope.handler = function(){
 * 		return function(data,hasMoreData){
 * 			hasMoreData.flag = false;//之后的滚动将不会请求加载新数据
 * 			//这里可以将data中数据绑定到controller中
 * 		}
 * 	}
 */

APP.directive('appScrollLoad',['$appHttp','$log','uuid', ($appHttp, $log,uuid) => {
	return {
//		templateUrl:'script/directive/scrollLoad/scrollLoad.html?t='+ uuid.getUUID(),
		template : '',
		scope: {
			url: "@",
			targetPush: '=', //请求回的数据添加到数据集中，该值表示的对象必须是数组或者集合
			callback: '&',
			method:"@",
			params:"@",
			numName:"@",
			histroyCountName:"@",
			histroyCount:"@"
		},
		replace: true,
		restrict: 'A',
		controller($scope) {

		},
		link($scope, $element, $attrs, ngModelCtrl) {

			let busy = false;//防止重复滚动多次
			let hasMoreData = {flag:true};//标记是否继续请求数据
			let draggerBottom ;//滚动条距离底部的距离
			let params = angular.fromJson($scope.params || '{}');
			let method = angular.lowercase($scope.method || 'post');
			let numName = $scope.numName || 'page';//服务端需要参数用于显示第几页的数据，这是该参数的名字
			let historyCount = $scope.histroyCount || 20;//每页显示多少条数据
			let histroyCountName = $scope.histroyCountName || 'historyCountName';
			let handlerMethod = function(data){
				//将请求回的数据push到指定数据集中
				if(angular.isDefined($scope.targetPush)) {
					$scope.targetPush.push(data);
				}
				//执行自定义回调函数处理数据
				if(!!$scope.callback()){
					$scope.callback()(data,hasMoreData);
				}
			}
			let catchMethod = function(e){
				params[numName] = params[numName] - 1;
				$log.error('请求数据失败，请求路径'+$scope.url+'请求参数:'+$scope.params);
			}
			let finallyMethod = function(){
				busy = false;
			}
			let reqHandler = function(callback){
				switch(method){
				case "post":
					$appHttp.getData($scope.url, params).then((data) => {
						handlerMethod(data);
						if($.isFunction(callback)){
							callback();
						}
					}).catch(() => {
						catchMethod();
					}).finally(() => {
						finallyMethod();
					});
				break;
				case "get":
					$appHttp.getDataByGet($scope.url, params).then((data) => {
						handlerMethod(data);
						if($.isFunction(callback)){
							callback();
						}
					}).catch(() => {
						catchMethod();
					}).finally(() => {
						finallyMethod();
					});
				break;
			}
			}

			params[numName] = 1;
			params[histroyCountName] = historyCount;

			reqHandler(function(){
				params[numName] = 2;
			});

			$element.on('mousewheel', () => {
				draggerBottom = $element.closest('.mCustomScrollBox').next().find('.mCSB_dragger').css('bottom');//mCustomScrollBox，mCSB_dragger是ng-scrollbars指令中的类
				//如果滚动条滚动到底部
				if(parseInt(draggerBottom) < 1 && !busy && !!hasMoreData.flag) {
					busy = true;
					params[numName] = params[numName] + 1;
					reqHandler();
				}else{
					let val = $element.children(":last-child").val();
					console.log(val);
				}
			});
		}
	}
}])
