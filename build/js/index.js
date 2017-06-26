'use strict';

var APP = angular.module('app', ['ui.router', 'ngScrollbars', 'ngCookies', 'validation', 'moment-picker', 'LocalStorageModule', 'cp.ngConfirm']);
'use strict';

APP.constant('loginMode', {
	NAME: 'LOGINMODE',
	RESULT: 'success' //登陆成功
}); //用户登陆状态名字
'use strict';

APP.run(['$rootScope', '$log', '$timeout', 'loginMode', '$state', '$stateParams', function ($rootScope, $log, $timeout, loginMode, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $rootScope.$on('LocalStorageModule.notification.setitem', function (event, data) {
    if (!!data) {
      //登陆
      if (data.key == loginMode.NAME) {
        $log.info('用户正在尝试登陆');
      }
    }
  });

  $rootScope.$on('LocalStorageModule.notification.removeitem', function (event, data) {
    if (!!data) {
      //退出登陆登陆
      if (data.key == loginMode.NAME) {
        $log.info('用户正在退出登陆');
      }
    }
  });
}]);
'use strict';

APP.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('XIZHUOKEJI').setStorageType('sessionStorage').setNotify(true, true);
}]);
'use strict';

//详情参考http://indrimuska.github.io/angular-moment-picker/
APP.config(['momentPickerProvider', function (momentPickerProvider) {
    momentPickerProvider.options({
        /* Picker properties */
        locale: 'en',
        format: 'L LTS',
        minView: 'decade',
        maxView: 'minute',
        startView: 'year',
        autoclose: true,
        today: false,
        keyboard: false,

        /* Extra: Views properties */
        leftArrow: '&larr;',
        rightArrow: '&rarr;',
        yearsFormat: 'YYYY',
        monthsFormat: 'MMM',
        daysFormat: 'D',
        hoursFormat: 'HH:[00]',
        minutesFormat: moment.localeData().longDateFormat('LT').replace(/[aA]/, ''),
        secondsFormat: 'ss',
        minutesStep: 5,
        secondsStep: 1
    });
}]);
'use strict';

APP.config(['$qProvider', function ($qProvider) {
    //  $qProvider.errorOnUnhandledRejections(false);
}]);
APP.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['*://localhost:8080/**', 'self']);
}]);
'use strict';

APP.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	$stateProvider.state('login', { //登陆页面
		url: '/login',
		templateUrl: 'script/platform/component/login/login.html',
		controller: 'loginCtrl'
	}).state('home', { //登陆后的页面
		url: '/home',
		templateUrl: 'script/platform/component/home/home.html',
		controller: 'homeCtrl'
	}).state('home.main', {
		url: '/main',
		templateUrl: 'script/platform/component/home/main/main.html',
		controller: 'mainCtrl'
	}).state('home.organization', {
		url: '/organization',
		templateUrl: 'script/platform/component/home/organization/organization.html',
		controller: 'organizationCtrl'
	});

	$urlRouterProvider.otherwise('login');
}]);
'use strict';

APP.config(['ScrollBarsProvider', function (ScrollBarsProvider) {
	// scrollbar defaults
	ScrollBarsProvider.defaults = {
		autoHideScrollbar: false,
		setHeight: '100%',
		scrollInertia: 500,
		axis: 'yx',
		theme: 'minimal-dark',
		advanced: {
			updateOnContentResize: true
		},
		scrollButtons: {
			scrollAmount: 'auto', // scroll amount when button pressed
			enable: false // enable scrolling buttons by default
		}
	};
}]);
'use strict';

APP.config(['$validationProvider', function ($validationProvider) {
	var expression = {
		phone: /^1[\d]{10}/,
		password: function password(value) {
			return value > 5;
		}
	};

	var defaultMsg = {
		phone: {
			success: '',
			error: '必须是11位手机号'
		},
		password: {
			success: '',
			error: ' 长度至少6位'
		}
	};

	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);
'use strict';

/**
 * 操作cookie的服务
 */
APP.service('cache', ['$cookies', function ($cookies) {
	this.put = function (key, value) {
		$cookies.put(key, value);
	};
	this.get = function (key) {
		return $cookies.get(key);
	};
	this.remove = function (key) {
		$cookies.remove(key);
	};
}]);
'use strict';

/**
 * 操作http服务
 */
APP.service('$myHttp', ['$rootScope', '$filter', '$http', '$timeout', '$q', function ($rootScope, $filter, $http, $timeout, $q) {

	//默认post
	this.getData = function (url, params, before) {
		if ($.isFunction(before)) {
			before();
		}

		var def = $q.defer();

		$http({
			mehtod: 'POST',
			url: url,
			data: params,
			headers: { 'Content-Type': undefined }
		}).then(function (resp) {
			def.resolve(resp);
		}).catch(function (err) {
			def.reject(err);
		});

		return def.promise;
	};
	//get请求
	this.getDataByGet = function (url, params, before) {
		if ($.isFunction(before)) {
			before();
		}

		var def = $q.defer();

		$http.get(url, { 'params': params }).then(function (resp) {
			def.resolve(resp);
		}).catch(function (err) {
			def.reject(err);
		});

		return def.promise;
	};
	//jsonp请求
	this.getDataByJsonp = function (url, params, jsonpCallbackParam, before) {
		if ($.isFunction(before)) {
			before();
		}
		var deff = $q.defer();

		$http.jsonp(url, {
			params: params,
			'jsonpCallbackParam': jsonpCallbackParam || 'callback'
		}).then(function (data) {
			def.resolve(data);
		}).catch(function (err) {
			def.reject(err);
		});
	};
}]);
'use strict';

/**
 * 获取UUID
 */
APP.service('uuid', ['$rootScope', '$filter', '$http', '$timeout', '$q', function ($rootScope, $filter, $http, $timeout, $q) {
	return {
		getUUID: function getUUID() {
			var d = new Date().getTime();
			var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
			});
			return uuid;
		}
	};
}]);
"use strict";

$.extend({
	getRandom: function getRandom() {
		//获取随机数
		var random = Math.random() + "";
		random = random.split(".")[1];
		return random;
	}
});
'use strict';

/**
 * 首页控制器
 */
APP.controller('indexCtrl', ['$timeout', '$log', '$scope', 'localStorageService', '$rootScope', '$state', 'loginMode', '$ngConfirm', function ($timeout, $log, $scope, localStorageService, $rootScope, $state, loginMode, $ngConfirm) {
	console.log($state);
	//没有登陆成功则跳转到登陆界面
	if (localStorageService.get(loginMode.NAME) != loginMode.RESULT) {
		$state.go('login', {}, { location: 'replace' });
	}
}]);
'use strict';

/**
 * 使用方式
 * app-color 必须写
 * default-color='red' 默认颜色，可通过大括号传入表达式
 * positive-color='blue' 正数时的颜色，可通过大括号传入表达式
 * negative-color='black' 负数时的颜色，可通过大括号传入表达式
 * zero-color='#FFF' 为0时颜色，可通过大括号传入表达式
 * target='{{number}}'，如果不需要判断容器content中的数据，则用target指定需要判断的数据
 * <div app-color default-color='red' positive-color='{{blue}}' negative-color='{{black}}' zero-color='white' target='{{number}}'>-1</div>
 */
APP.directive('appColor', [function () {
	return {
		scope: {},
		restrict: 'A',
		link: function link($scope, $element, $attrs, ngModelCtrl) {

			//如果有target，则监听target的值，不监听元素内容中的值，否则监听元素内容中的值
			if ($attrs['target'] != undefined) {
				$scope.$watch(function () {
					return $attrs.target;
				}, function (newVal, oldVal) {
					exec(newVal, oldVal);
				});
			} else {
				$scope.$watch(function () {
					return $element[0].innerHTML;
				}, function (newVal, oldVal) {
					exec(newVal, oldVal);
				});
			}

			//根据数据设置color色
			function exec(newVAL, oldVal) {
				var val;
				var defaultcolor = !!$attrs['defaultColor'] ? $attrs['defaultColor'] + ' !important' : $attrs['defaultColor']; //默认颜色
				var positivecolor = !!$attrs['positiveColor'] ? $attrs['positiveColor'] + ' !important' : $attrs['positiveColor']; //正数
				var negativecolor = !!$attrs['negativeColor'] ? $attrs['negativeColor'] + ' !important' : $attrs['negativeColor']; //负数
				var zerocolor = !!$attrs['zeroColor'] ? $attrs['zeroColor'] + ' !important' : $attrs['zeroColor']; //零
				var target = $attrs['target']; //要判断的数据

				if (target != undefined) {
					val = target;
				} else {
					val = $($element)[0].innerHTML.replace(/,/g, "");
				}

				//非数字
				if (isNaN(parseFloat(val))) {
					$element.css("cssText", 'color:' + defaultcolor);
				} else {
					//等于0
					if (val == 0) {
						if (!!zerocolor) {
							$element.css("cssText", 'color:' + zerocolor);
						} else {
							if (!!positivecolor) {
								$element.css("cssText", 'color:' + positivecolor);
							} else {
								$element.css("cssText", 'color:' + defaultcolor);
							}
						}
					}
					//正数
					if (val > 0) {
						if (!!positivecolor) {
							$element.css("cssText", 'color:' + positivecolor);
						} else {
							$element.css("cssText", 'color:' + defaultcolor);
						}
					}

					//负数
					if (val < 0) {
						if (!!negativecolor) {
							$element.css("cssText", 'color:' + negativecolor);
						} else {
							$element.css("cssText", 'color:' + defaultcolor);
						}
					}
				}
			}
		}
	};
}]);
'use strict';

/**
 * [templateUrl description]
 * @type {String}
 */
APP.directive('appCountHead', ['$timeout', 'uuid', function ($timeout, uuid) {
  return {
    templateUrl: 'script/common/directive/countHead/countHead.html?t=' + uuid.getUUID(),
    scope: {
      height: "@"
    },
    transclude: true,
    restrict: 'E',
    controller: function controller($scope) {},
    link: function link($scope, $element, $attrs, ngModelCtrl) {
      if (!$scope.height) {
        $scope.height = '28px';
      }
    }
  };
}]);
'use strict';

/**
 * 输入框中的千分位
 * 使用方式 <input type="text" ng-model = "" app-currency bit="3"/> 这些是必须
 * type必须是text类型
 * ng-model 必须有
 * currency 必须有
 * bit 小数点保留位数，可以不写，默认保留2位
 */
APP.directive('appCurrency', ['$filter', '$browser', function ($filter, $browser) {
	return {
		require: 'ngModel',
		link: function link($scope, $element, $attrs, ngModelCtrl) {

			var separators = {
				'thousands': $filter('number')(1000).substr(1, 1),
				'decimal': $filter('number')(1.1).substr(1, 1)
			};
			var decimalEntered = false;
			var bit = $attrs.bit || 2;
			ngModelCtrl.$parsers.push(function (viewValue) {
				if (!!$attrs.isF) {
					if (viewValue > 0) {
						viewValue = -viewValue;
					}
				}
				return viewValue + ''.split(separators.thousands).join('').split(separators.decimal).join('.');
			});

			ngModelCtrl.$render = function () {
				$element.val($filter('number')((ngModelCtrl.$viewValue + '').replace(/,/g, ''), bit, false));
			};
			var listener = function listener() {
				var value = $element.val().split(separators.thousands).join('').split(separators.decimal).join('.');
				if (decimalEntered) {
					decimalEntered = false;
					return;
				}

				if (!!$attrs.isF) {
					if (value > 0) {
						value = -value;
					}
				}
				$element.val($filter('number')(value, bit));
			};

			$element.bind('focus', function () {
				if (!!$attrs.readonly || $attrs.readonly == 'true') {
					return;
				}
				var value = ngModelCtrl.$modelValue;
				if (!angular.isUndefined(value)) {
					var v = value.toString().replace(/,/g, '');
					if (parseFloat(v) == 0.0) {
						v = "";
					}

					$element.val(v);
				}
			});

			$element.bind('blur', function () {
				listener();
			});

			$element.bind('keypress', function (event) {
				var key = event.which;
				if (key == 0 || key == 8 || 15 < key && key < 19 || 37 <= key && key <= 40) {
					return;
				}
				if (String.fromCharCode(key) != separators.thousands && String.fromCharCode(key) != separators.decimal && !(48 <= key && key <= 57) && String.fromCharCode(key) != '-') {
					event.preventDefault();
					return;
				}
				if (String.fromCharCode(key) == separators.decimal) decimalEntered = true;
			});

			$element.bind('paste cut', function () {
				$browser.defer(listener);
			});
		}
	};
}]);
'use strict';

/**
 * 使用方式：html页面<script type="text/javascript-lazy"> </script>标签中写入代码，代码会随着.html加载被执行。
 */
APP.directive('script', [function () {
	return {
		restrict: 'E',
		scope: false,
		link: function link(scope, elem, attr) {
			if (attr.type === 'text/javascript-lazy') {
				var s = document.createElement("script");
				s.type = "text/javascript";
				var src = elem.attr('src');
				if (src !== undefined) {
					s.src = src;
				} else {
					var code = elem.text();
					s.text = code;
				}
				document.head.appendChild(s);
				elem.remove();
			}
		}
	};
}]);
'use strict';

/**
 * 注意：因为自带滚动条，所以在使用<left>或者<right>标签的时候高度无法100%，只能自适应
 * 左固定，右百分比自适应布局
 * width,height,默认100%
 * class:布局的样式
 * left-width="20px" 左边宽度
 * left-style="bg-gray"左边布局的样式
 * right-styl="bg-gray"右边布局样式
 */
APP.directive('appLeftRightLayout', ['$timeout', 'uuid', function ($timeout, uuid) {
	return {
		templateUrl: 'script/common/directive/leftRightLayout/leftRightLayout.html?t=' + uuid.getUUID(),
		scope: {
			width: "@",
			height: "@",
			clazz: "@class",
			leftWidth: "@",
			leftStyle: "@",
			rightStyle: "@",
			centerStyle: "@",
			centerWidth: "@",
			centerIconStyle: "@"
		},
		replace: true,
		transclude: {
			left: "?left",
			right: "?right"
		},
		restrict: 'E',
		controller: function controller($scope) {},
		link: function link($scope, $element, $attrs, ngModelCtrl) {
			$scope.id = "lrc-containerd-" + uuid.getUUID();
			$scope.curIsShowLeft = true; //当前是否显示左边布局
			$scope.leftWidthBak = $scope.leftWidth; //备份左边布局宽度，滑动时使用

			var leftIcon = "glyphicon glyphicon-triangle-left";
			var rightIcon = "glyphicon glyphicon-triangle-right";
			$scope.centerIcon = leftIcon;

			//给属性设置默认值
			if (!$scope.height) {
				$scope.height = '100%';
			}
			if (!$scope.width) {
				$scope.width = '100%';
			}
			if (!$scope.class) {
				$scope.class = '';
			}

			if (!$scope.leftWidth) {
				$scope.leftWidth = '50%';
			} else {
				console.log(parseFloat($scope.leftWidth) + 10 + 'px');
				$scope.leftWidth = parseFloat($scope.leftWidth) + 10 + 'px';
			}

			if (!angular.isDefined($scope.leftStyle)) {
				$scope.leftStyle = "";
			}
			if (!angular.isDefined($scope.rightStyle)) {
				$scope.rightStyle = "";
			}
			if (!angular.isDefined($scope.centerStyle)) {
				$scope.centerStyle = "";
			}
			if (!angular.isDefined($scope.centerWidth)) {
				$scope.centerWidth = "13.6px";
			}

			if (!angular.isDefined($scope.centerIconStyle)) {
				$scope.centerIconStyle = "";
			}
			//初始化left,right标签样式
			$element.find('left,right').addClass('h-100 w-100 d-ib');

			//给中间栏添加点击事件,切换左右滑动特效
			$(".lrl-centerBtn").on('click', function () {
				if (!!$scope.curIsShowLeft) {
					$scope.curIsShowLeft = false;
					$('#a' + $scope.id).animate({ width: 0 });
					$('#b' + $scope.id).animate({ 'margin-left': 0 });
					$scope.leftWidth = 0;
					$timeout(function () {
						$scope.$apply(function () {
							$scope.centerIcon = rightIcon;
						});
					}, 0);
				} else {
					$scope.curIsShowLeft = true;

					$('#b' + $scope.id).animate({ 'margin-left': $scope.leftWidthBak });
					$('#a' + $scope.id).animate({ width: $scope.leftWidthBak });
					$scope.leftWidth = $scope.leftWidthBak;
					$timeout(function () {
						$scope.$apply(function () {
							$scope.centerIcon = leftIcon;
						});
					}, 0);
				}
			});
		}
	};
}]);
'use strict';

/**
 * 模拟移动端页面布局，上面是返回 标题 更多，下面是内容
 * head-style="1" 设置头部样式，包括返回，标题 更多
 * head-style="2" 设置头部样式，包括返回，标题 更多，但是返回只占用位置
 */
APP.directive('appPagePanel', ['$timeout', 'uuid', function ($timeout, uuid) {
  return {
    templateUrl: 'script/common/directive/pagePanel/pagePanel.html?t=' + uuid.getUUID(),
    scope: {
      header: "@",
      width: "@",
      height: "@",
      headStyle: "@",
      textAlign: "@",
      borderBottom: "@border",
      leftBtnIcon: "@",
      clazz: "@class",
      callback: "&"

    },
    transclude: true,
    restrict: 'E',
    controller: function controller($scope) {},
    link: function link($scope, $element, $attrs, ngModelCtrl) {
      $scope.id = "lrc-containerd-" + uuid.getUUID();
      //给属性设置默认值
      if (!(!!$scope.textAlign && ($scope.textAlign == 'left' || $scope.textAlign == 'center' || $scope.textAlign == 'right'))) {
        $scope.textAlign = 'center';
      }
      if (!$scope.header) {
        $scope.header = '';
      }
      if (!$scope.height) {
        $scope.height = '100%';
      }
      if (!$scope.width) {
        $scope.width = '100%';
      }
      if (!$scope.headStyle) {
        $scope.headStyle = '1';
      }
      if (!$scope.borderBottom) {
        $scope.borderBottom = "2px solid #A6A6A6";
      }
      if (!$scope.leftBtnIcon) {
        $scope.leftBtnIcon = "glyphicon glyphicon-menu-hamburger";
      }

      if (!$scope.clazz) {
        $scope.clazz = '';
      }
      $scope.showPanel = function () {
        var panel = $element.find('#visiblePanel');
        panel.removeClass('d-n').addClass('d-b');
      };
      $scope.hidePanel = function () {
        var panel = $element.find('#visiblePanel').removeClass('d-b').addClass('d-n');
      };

      $element.on('click', ' .leftBtnIcon', function () {
        if (angular.isFunction($scope.callback)) {
          $scope.callback();
        }
      });

      $scope.change = function () {
        $timeout(function () {
          console.log(1111);
          $scope.$apply(function () {
            $scope.panel2 = '';
          });
        }, 2000);
      };
    }
  };
}]);
'use strict';

/**
 * 注意：因为自带滚动条，所以在使用<left>或者<right>标签的时候高度无法100%，只能自适应
 * 左固定，右百分比自适应布局
 * width,height,默认100%
 * class:布局的样式
 * left-width="20px" 左边宽度
 * left-style="bg-gray"左边布局的样式
 * right-styl="bg-gray"右边布局样式
 */
APP.directive('appRightLeftLayout', ['$timeout', 'uuid', function ($timeout, uuid) {
	return {
		templateUrl: 'script/directive/leftRightLayout/rightLeftLayout.html ?t=' + uuid.getUUID(),
		scope: {
			width: "@",
			height: "@",
			clazz: "@class",
			leftWidth: "@",
			leftStyle: "@",
			rightStyle: "@",
			centerStyle: "@",
			centerWidth: "@",
			centerIconStyle: "@"
		},
		replace: true,
		transclude: {
			left: "?left",
			right: "?right"
		},
		restrict: 'E',
		controller: function controller($scope) {},
		link: function link($scope, $element, $attrs, ngModelCtrl) {
			$scope.id = "lrc-containerd-" + uuid.getUUID();
			$scope.curIsShowLeft = true; //当前是否显示左边布局
			$scope.leftWidthBak = $scope.leftWidth; //备份左边布局宽度，滑动时使用

			var leftIcon = "glyphicon glyphicon-triangle-left";
			var rightIcon = "glyphicon glyphicon-triangle-right";
			$scope.centerIcon = leftIcon;

			//给属性设置默认值
			if (!$scope.height) {
				$scope.height = '100%';
			}
			if (!$scope.width) {
				$scope.width = '100%';
			}
			if (!$scope.class) {
				$scope.class = '';
			}

			if (!$scope.leftWidth) {
				$scope.leftWidth = '50%';
			} else {
				console.log(parseFloat($scope.leftWidth) + 10 + 'px');
				$scope.leftWidth = parseFloat($scope.leftWidth) + 10 + 'px';
			}

			if (!angular.isDefined($scope.leftStyle)) {
				$scope.leftStyle = "";
			}
			if (!angular.isDefined($scope.rightStyle)) {
				$scope.rightStyle = "";
			}
			if (!angular.isDefined($scope.centerStyle)) {
				$scope.centerStyle = "";
			}
			if (!angular.isDefined($scope.centerWidth)) {
				$scope.centerWidth = "13.6px";
			}

			if (!angular.isDefined($scope.centerIconStyle)) {
				$scope.centerIconStyle = "";
			}
			//初始化left,right标签样式			
			$element.find('left,right').addClass('h-100 w-100 d-ib');

			//给中间栏添加点击事件,切换左右滑动特效
			$(".lrl-centerBtn").on('click', function () {
				if (!!$scope.curIsShowLeft) {
					$scope.curIsShowLeft = false;
					$('#a' + $scope.id).animate({ width: 0 });
					$('#b' + $scope.id).animate({ 'margin-left': 0 });
					$scope.leftWidth = 0;
					$timeout(function () {
						$scope.$apply(function () {
							$scope.centerIcon = rightIcon;
						});
					}, 0);
				} else {
					$scope.curIsShowLeft = true;
					$('#a' + $scope.id).animate({ width: $scope.leftWidthBak });
					$('#b' + $scope.id).animate({ 'margin-left': $scope.leftWidthBak });
					$scope.leftWidth = $scope.leftWidthBak;
					$timeout(function () {
						$scope.$apply(function () {
							$scope.centerIcon = leftIcon;
						});
					}, 0);
				}
			});
		}
	};
}]);
'use strict';

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

APP.directive('appScrollLoad', ['$myHttp', '$log', 'uuid', function ($myHttp, $log, uuid) {
	return {
		//		templateUrl:'script/directive/scrollLoad/scrollLoad.html?t='+ uuid.getUUID(),
		template: '',
		scope: {
			url: "@",
			targetPush: '=', //请求回的数据添加到数据集中，该值表示的对象必须是数组或者集合
			callback: '&',
			method: "@",
			params: "@",
			numName: "@",
			histroyCountName: "@",
			histroyCount: "@"
		},
		replace: true,
		restrict: 'A',
		controller: function controller($scope) {},
		link: function link($scope, $element, $attrs, ngModelCtrl) {

			var busy = false; //防止重复滚动多次
			var hasMoreData = { flag: true }; //标记是否继续请求数据
			var draggerBottom = void 0; //滚动条距离底部的距离
			var params = angular.fromJson($scope.params || '{}');
			var method = angular.lowercase($scope.method || 'post');
			var numName = $scope.numName || 'page'; //服务端需要参数用于显示第几页的数据，这是该参数的名字
			var historyCount = $scope.histroyCount || 20; //每页显示多少条数据
			var histroyCountName = $scope.histroyCountName || 'historyCountName';
			var handlerMethod = function handlerMethod(data) {
				//将请求回的数据push到指定数据集中
				if (angular.isDefined($scope.targetPush)) {
					$scope.targetPush.push(data);
				}
				//执行自定义回调函数处理数据
				if (!!$scope.callback()) {
					$scope.callback()(data, hasMoreData);
				}
			};
			var catchMethod = function catchMethod(e) {
				params[numName] = params[numName] - 1;
				$log.error('请求数据失败，请求路径' + $scope.url + '请求参数:' + $scope.params);
			};
			var finallyMethod = function finallyMethod() {
				busy = false;
			};
			var reqHandler = function reqHandler(callback) {
				switch (method) {
					case "post":
						$myHttp.getData($scope.url, params).then(function (data) {
							handlerMethod(data);
							if ($.isFunction(callback)) {
								callback();
							}
						}).catch(function () {
							catchMethod();
						}).finally(function () {
							finallyMethod();
						});
						break;
					case "get":
						$myHttp.getDataByGet($scope.url, params).then(function (data) {
							handlerMethod(data);
							if ($.isFunction(callback)) {
								callback();
							}
						}).catch(function () {
							catchMethod();
						}).finally(function () {
							finallyMethod();
						});
						break;
				}
			};

			params[numName] = 1;
			params[histroyCountName] = historyCount;

			reqHandler(function () {
				params[numName] = 2;
			});

			$element.on('mousewheel', function () {
				draggerBottom = $element.closest('.mCustomScrollBox').next().find('.mCSB_dragger').css('bottom'); //mCustomScrollBox，mCSB_dragger是ng-scrollbars指令中的类
				//如果滚动条滚动到底部
				if (parseInt(draggerBottom) < 1 && !busy && !!hasMoreData.flag) {
					busy = true;
					params[numName] = params[numName] + 1;
					reqHandler();
				} else {
					var val = $element.children(":last-child").val();
					console.log(val);
				}
			});
		}
	};
}]);
'use strict';

//千分位格式化过滤器
//使用方式 {{123 | thousands :34}}
//说明 : ":34"表示保留小数点后34位 ,可以不写默认保留2位
APP.filter('thousands', [function () {
	//数字千分位

	return function (value, bit) {
		bit = bit || 2;
		//四舍五入方法
		function keepTwoDecimalFull(num) {
			num = String(num).replace(',', '');
			var result = parseFloat(num);
			if (isNaN(result)) {
				result = '0';
			}
			var str = '1';
			for (var i = 0; i < bit; i++) {
				str += '0';
			}
			result = Math.round(num * str) / str;
			var s_x = result.toString();
			var pos_decimal = s_x.indexOf('.');
			if (pos_decimal < 0) {
				pos_decimal = s_x.length;
				s_x += '.';
			}
			while (s_x.length <= pos_decimal + parseInt(bit)) {
				s_x += '0';
			}
			return s_x;
		}

		var result = keepTwoDecimalFull(value).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
		//去掉小数点后的千分位
		result = result.split('.')[0] + '.' + result.split('.')[1].replace(',', '');
		return result;
	};
}]);
'use strict';

APP.controller('homeCtrl', ['$rootScope', '$scope', '$log', 'localStorageService', 'loginMode', '$state', '$timeout', '$ngConfirm', function ($rootScope, $scope, $log, localStorageService, loginMode, $state, $timeout, $ngConfirm) {
  // $scope.navuserinfo = false;
  /**
    * 退出登陆
    */
  $scope.loginOut = function () {
    $ngConfirm({
      theme: 'supervan',
      title: '提示!',
      content: '<strong>您确定要退出吗?</strong>',
      scope: $scope,
      buttons: {
        sayBoo: {
          text: '确定',
          btnClass: 'btn-blue',
          action: function action(scope, button) {
            localStorageService.remove(loginMode.NAME);
            $state.go('login', {}, {
              location: 'replace'
            });
            return true; // prevent close;
          }
        },
        close: {
          text: '取消',
          btnClass: 'btn-default'
        }
      }
    });
  };
  $scope.showUserInfo = function () {
    if (!!$scope.userInfoMode) {
      $scope.userInfoMode = false;
    } else {
      $scope.userInfoMode = true;
    }
  };

  $scope.showOrHideNav = function (element) {
    if (!!$scope[element]) {
      $scope[element] = false;
    } else {
      $scope[element] = true;
    }
    var array = Array.from($scope);
    for (var _element in array) {
      $log.info(_element);
    }
  };
}]);
'use strict';

APP.controller('loginCtrl', ['$rootScope', '$scope', '$log', 'localStorageService', 'loginMode', '$state', '$timeout', '$location', function ($rootScope, $scope, $log, localStorageService, loginMode, $state, $timeout, $location) {
	//检测到如果登陆了则直接跳转到登陆后的页面
	if (localStorageService.get(loginMode.NAME) == loginMode.RESULT) {
		$state.go('home.main', {}, { location: 'replace' });
	}

	//变量

	//timeout


	//函数
	$scope.login = function () {
		localStorageService.set(loginMode.NAME, loginMode.RESULT);
		$state.go('home.main', {}, { absolute: true, location: 'replace' });
	};
}]);
'use strict';

APP.directive('dropseaNavUserInfo', ['uuid', function (uuid) {
	return {
		templateUrl: 'script/platform/directive/navUserInfo/navUserInfo.html?t=' + uuid.getUUID(),
		scope: {},
		replace: true,
		restrict: 'E',
		controller: function controller($scope) {},
		link: function link($scope, $element, $attrs, ngModelCtrl) {}
	};
}]);
'use strict';

/**
 * [description]
 * @param  {[type]} $scope   [description]
 * @param  {[type]} $timeout [description]
 * @param  {[type]} $myHttp  [description]
 * @param  {[type]} cache    [description]
 * @param  {[type]} $log     [description]
 * @return {[type]}          [description]
 */
APP.controller('organizationCtrl', ['$scope', '$timeout', '$myHttp', 'cache', '$log', function ($scope, $timeout, $myHttp, cache, $log) {
  $scope.callback = function () {
    alert(12334534);
  };
}]);
'use strict';

//APP.factory('Reddit', function($http,$sce) {
//
//
//var Reddit = function() {
//  this.items = [];
//  this.busy = false;
//  this.after = 'a';
//};
//
//Reddit.prototype.nextPage = function() {
//  if (this.busy) return;
//  this.busy = true;
//
//  var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";
//  url = $sce.trustAsResourceUrl(url);
//  $http.jsonp(
//  	url,
//  	{
//  		params: {
//        wd: this.after
//      },
//      jsonpCallbackParam:'cb'
//    }).then(function(data) {
//	    	console.log(data);
//	      this.items.push(data.data.s);
//	      this.after = this.after+'a';
//	      this.busy = false;
//  }.bind(this))
//  .catch(function(e){
//  	console.log(e);
//  });
//};
//	
//return Reddit;
//});
APP.controller('mainCtrl', ['$scope', '$timeout', '$myHttp', 'cache', '$log', function ($scope, $timeout, $myHttp, cache, $log) {
	$timeout(function () {
		$log.info('info');
	}, 0);
	$scope.params = {
		page: 4
	};
	$scope.money = 4544444444444444;
	$scope.handler = function () {
		return function (data, hasMoreData) {
			hasMoreData.flag = data.data["object"].hasMoreData;
			$scope.items.push(data.data["object"].data);
		};
	};
	$scope.name = 'jsdf';
	$scope.scrollbarConfig = {
		setHeight: 200
	};
	$scope.items = ['张三'];
	for (var i = 0; i < 30; i++) {
		$scope.items.push('lisi' + i);
	}
	$scope.showBgPanel = false;
	$scope.mydate = '2017';

	//	$scope.add = function(){
	//		alert(1)
	//	}
	$scope.add = function () {
		$scope.aaa = '2342423';
		$myHttp.getDataByGet('data/data.json').then(function (data) {
			cache.put('a', 'aa');

			$timeout(function () {
				$scope.$digest();
				$scope.$apply(function () {
					$scope.data += data;
				});
			}, 0);
			return $myHttp.getDataByGet('data/test.json');
		}).then(function (resp) {
			console.log(resp);
			$scope.items.push(resp);
		}).catch(function (err) {
			console.log(err);
		}).finally(function () {
			console.log('请求结束');
		});
	};
}]);