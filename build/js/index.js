'use strict';

var APP = angular.module('app', ['ui.router', 'ngScrollbars', 'ngCookies', 'validation', 'moment-picker']);
APP.config(function (ScrollBarsProvider) {
	// scrollbar defaults
	ScrollBarsProvider.defaults = {
		autoHideScrollbar: false,
		setHeight: 100,
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
});
'use strict';

APP.factory('Reddit', function ($http, $sce) {

	var Reddit = function Reddit() {
		this.items = [];
		this.busy = false;
		this.after = 'a';
	};

	Reddit.prototype.nextPage = function () {
		if (this.busy) return;
		this.busy = true;

		var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";
		url = $sce.trustAsResourceUrl(url);
		$http.jsonp(url, {
			params: {
				wd: this.after
			},
			jsonpCallbackParam: 'cb'
		}).then(function (data) {
			console.log(data);
			this.items.push(data.data.s);
			this.after = this.after + 'a';
			this.busy = false;
		}.bind(this)).catch(function (e) {
			console.log(e);
		});
	};

	return Reddit;
});
APP.controller('mainCtrl', ['$scope', '$timeout', '$myHttp', 'cache', '$log', 'Reddit', function ($scope, $timeout, $myHttp, cache, $log, Reddit) {
	$timeout(function () {
		$log.info('info');
	}, 0);
	$scope.name = 'jsdf';
	$scope.scrollbarConfig = {
		setHeight: 200
	};
	$scope.items = ['张三'];
	$scope.showBgPanel = false;
	$scope.mydate = '2017';

	$scope.reddit = new Reddit();
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
 * 操作get,post请求
 */
APP.service('$myHttp', ['$rootScope', '$filter', '$http', '$timeout', '$q', function ($rootScope, $filter, $http, $timeout, $q) {

	//默认post
	this.getData = function (url, params, before) {
		if ($.isFunction(before)) {
			before();
		}

		var def = $q.defer();

		$http.post(url, { 'params': params }).then(function (resp) {
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
    $qProvider.errorOnUnhandledRejections(false);
}]);
//APP.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
//  $sceDelegateProvider.resourceUrlWhitelist(['*://api.reddit.com/**', 'self']);
//}]);
'use strict';

APP.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('main', {
		url: '/main',
		templateUrl: 'view/main/main.html',
		controller: 'mainCtrl'
	}).state('main.page1', {
		url: '/page1',
		templateUrl: 'view/new_file.html'
	}).state('main.page2', {
		url: '/page1',
		templateUrl: 'view/new_file2.html'
	});

	$urlRouterProvider.otherwise('main');
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
 * 使用方式
 * app-color 必须写
 * default-color='red' 默认颜色，可通过大括号传入表达式
 * positive-color='blue' 正数时的颜色，可通过大括号传入表达式
 * negative-color='black' 负数时的颜色，可通过大括号传入表达式
 * zero-color='#FFF' 为0时颜色，可通过大括号传入表达式
 * target='{{number}}'，如果不需要判断容器content中的数据，则用target指定需要判断的数据
 * <div app-color default-color='red' positive-color='{{blue}}' negative-color='{{black}}' zero-color='white' target='{{number}}'>-1</div>
 */
APP.directive('appColor', function () {
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
});
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
APP.directive('appLeftRightLayout', function ($timeout, uuid) {
	return {
		templateUrl: 'script/directive/leftRightLayout/leftRightLayout.html?t=' + uuid.getUUID(),
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
});
'use strict';

/**
 * 模拟移动端页面布局，上面是返回 标题 更多，下面是内容
 * head-style="1" 设置头部样式，包括返回，标题 更多
 * head-style="2" 设置头部样式，包括返回，标题 更多，但是返回只占用位置
 */
APP.directive('appPagePanel', function ($timeout, uuid) {
	return {
		templateUrl: 'script/directive/pagePanel/pagePanel.html?t=' + uuid.getUUID(),
		scope: {
			width: "@",
			height: "@",
			headStyle: "@",
			textAlign: "@",
			borderBottom: "@border",
			leftBtnIcon: "@",
			clazz: "@class"

		},
		transclude: true,
		restrict: 'E',
		controller: function controller($scope) {},
		link: function link($scope, $element, $attrs, ngModelCtrl) {
			//给属性设置默认值
			if (!(!!$scope.textAlign && ($scope.textAlign == 'left' || $scope.textAlign == 'center' || $scope.textAlign == 'right'))) {
				$scope.textAlign = 'center';
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
				$scope.borderBottom = "1px solid #D9D9D9";
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

			$scope.change = function () {
				$timeout(function () {
					console.log(1111);
					$scope.$apply(function () {
						$scope.panel2 = '';
					});
				}, 2000);
			};
			console.log($scope.borderBottom);
			//			$scope.updateScrollbar('scrollTo', 10);
		}

	};
});
'use strict';

/* ng-infinite-scroll - v1.0.0 - 2013-02-23 */
var mod;

mod = angular.module('infinite-scroll', []);

mod.directive('infiniteScroll', ['$rootScope', '$window', '$timeout', function ($rootScope, $window, $timeout) {
  return {
    link: function link(scope, elem, attrs) {
      var checkWhenEnabled, handler, scrollDistance, scrollEnabled;
      $window = angular.element($window);
      scrollDistance = 0;
      if (attrs.infiniteScrollDistance != null) {
        scope.$watch(attrs.infiniteScrollDistance, function (value) {
          return scrollDistance = parseInt(value, 10);
        });
      }
      scrollEnabled = true;
      checkWhenEnabled = false;
      if (attrs.infiniteScrollDisabled != null) {
        scope.$watch(attrs.infiniteScrollDisabled, function (value) {
          scrollEnabled = !value;
          if (scrollEnabled && checkWhenEnabled) {
            checkWhenEnabled = false;
            return handler();
          }
        });
      }
      handler = function handler() {
        var elementBottom, remaining, shouldScroll, windowBottom;
        windowBottom = $window.height() + $window.scrollTop();
        elementBottom = elem.offset().top + elem.height();
        remaining = elementBottom - windowBottom;
        shouldScroll = remaining <= $window.height() * scrollDistance;
        if (shouldScroll && scrollEnabled) {
          if ($rootScope.$$phase) {
            return scope.$eval(attrs.infiniteScroll);
          } else {
            return scope.$apply(attrs.infiniteScroll);
          }
        } else if (shouldScroll) {
          return checkWhenEnabled = true;
        }
      };
      $window.on('scroll', handler);
      scope.$on('$destroy', function () {
        return $window.off('scroll', handler);
      });
      return $timeout(function () {
        if (attrs.infiniteScrollImmediateCheck) {
          if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
            return handler();
          }
        } else {
          return handler();
        }
      }, 0);
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
APP.directive('appRightLeftLayout', function ($timeout, uuid) {
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
});
'use strict';

APP.directive('appYearSelector', function (uuid) {
	return {
		templateUrl: 'script/directive/yearselector/yearselector.html?t=' + uuid.getUUID(),
		scope: {
			model: "=ngModel"
		},
		replace: true,
		restrict: 'E',
		controller: function controller($scope) {},
		link: function link($scope, $element, $attrs, ngModelCtrl) {
			console.log(2);
			$scope.change = function () {
				$scope.model = "aaa";
			};
		}
	};
});