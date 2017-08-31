'use strict';

var APP = angular.module('app', ['ui.router', 'ngScrollbars', 'ngCookies', 'validation', 'moment-picker', 'LocalStorageModule', 'cp.ngConfirm', 'ngDialog', 'ngFileUpload', 'treeControl', 'ui.tree', 'oi.select']);
'use strict';

/**
 * [用户登陆状态名字]
 */
APP.constant('loginMode', {
  NAME: 'LOGINMODE',
  RESULT: 'success' //登陆成功
});

//用户登陆后的信息
APP.constant('userInfo', {
  createDate: 'createDate',
  logName: 'logName', //18735885176
  loginCount: 'loginCount',
  remark: 'remark',
  sysToken: 'sysToken',
  userID: 'userID',
  password: 'lkasjdfllksadjf'
});

//我的模板中主模板的模板类型
APP.constant('templateMainType', [{
  name: '管理',
  type: '1'
}, {
  name: '审批',
  type: '2'
}]);
//我的模板中构建纵向选项卡的表单数据
APP.constant('buildVerticalCardConstant', {
  descPosition: [//显示位置0居中1左2右
  {
    name: '居中',
    type: '0',
    style: 'text-align:center !important;'
  }, {
    name: '居左',
    type: '1',
    style: 'text-align:left !important;'
  }, {
    name: '居右',
    type: '2',
    style: 'text-align:right !important;'
  }], isBold: [//是否加粗1加粗0正常
  {
    name: '正常',
    type: '0',
    style: 'font-weight: normal !important;'
  }, {
    name: '加粗',
    type: '1',
    style: 'font-weight: bold !important;'
  }], isPortrait: [//是否纵向 1纵0横
  {
    name: '纵',
    type: '1'
  }, {
    name: '横',
    type: '0'
  }]
});
/**
 * [颜色]
 * @type {[type]}
 */
APP.constant('colorConstant', [{
  name: '深蓝',
  type: '#1B264F'
}, {
  name: '深青',
  type: '#00BB9C'
}, {
  name: '蓝色',
  type: '#56ABE4'
}, {
  name: '紫色',
  type: '#9D55B8'
}, {
  name: '红色',
  type: '#EB4F38'
}, {
  name: '橙色',
  type: '#EA8010'
}, {
  name: '金色',
  type: '#F4C600'
}, {
  name: '鲜绿',
  type: '#11CD6E'
}, {
  name: '沙棕',
  type: '#F4A460'
}]);

/**
 * [ 文本构件 ]
 * @type {String}
 */
APP.constant('buildTextConstant', {
  'textType': [//特殊文字特殊文字 1无2身份证3手机号，公共字典fid=110
  {
    name: '无',
    type: '1'
  }, {
    name: '身份证',
    type: '2'
  }, {
    name: '手机号',
    type: '3'
  }],
  'textRows': [//单行/多行
  {
    name: '单行',
    type: '1'
  }, {
    name: '多行',
    type: '2'
  }],
  'cardElementAttributeConstant': [{
    name: '必填',
    type: '1'
  }, {
    name: '消息内容',
    type: '2'
  }, {
    name: '列表显示',
    type: '3'
  }, {
    name: '审批可改',
    type: '4'
  }, {
    name: '通栏',
    type: '5'
  }],
  'cardElementExplainShowFlagConstant': [{ name: '不显示', type: '0' }, { name: '显示', type: '1' }]
});

/**
 * [ 数字构件 ]
 * @type {String}
 */
APP.constant('buildNumberConstant', {
  'decimalDigits': [{ name: '1', type: '1' }, { name: '2', type: '2' }, { name: '3', type: '3' }, { name: '4', type: '4' }, { name: '5', type: '5' }, { name: '6', type: '6' }, { name: '7', type: '7' }, { name: '8', type: '8' }, { name: '9', type: '9' }, { name: '10', type: '10' }, { name: '11', type: '11' }, { name: '12', type: '12' }, { name: '13', type: '13' }, { name: '14', type: '14' }, { name: '15', type: '15' }, { name: '16', type: '16' }, { name: '17', type: '17' }, { name: '18', type: '18' }, { name: '19', type: '19' }, { name: '20', type: '20' }],
  'thousands': [//千分位
  { name: '关', type: 0 }, { name: '开', type: 1 }],
  'percentage': [//百分号
  { name: '关', type: 0 }, { name: '开', type: 1 }],
  'cardElementAttributeConstant': [{
    name: '必填',
    type: '1'
  }, {
    name: '消息内容',
    type: '2'
  }, {
    name: '审批可改',
    type: '4'
  }, {
    name: '通栏',
    type: '5'
  }],
  'cardElementExplainShowFlagConstant': [{ name: '不显示', type: '0' }, { name: '显示', type: '1' }]
});

/**
 * [ 构件 位置 列表内容 ]
 * @type {String}
 */
APP.constant('positionConstant', [{
  name: '显示在第一行',
  type: '01'
}, {
  name: '显示在第二行(第1个)',
  type: '11'
}, {
  name: '显示在第二行(第2个)',
  type: '12'
}, {
  name: '显示在第二行(第3个)',
  type: '13'
}]);

APP.constant('cardElementAttributeConstant', [{
  name: '必填',
  type: '1'
}, {
  name: '推送',
  type: '2'
}, {
  name: '列表显示',
  type: '3'
}, {
  name: '审批可改',
  type: '4'
}, {
  name: '通栏',
  type: '5'
}, {
  name: '主页显示',
  type: '6'
}, {
  name: '子文件夹名称',
  type: '7'
}, {
  name: '是否汇总',
  type: '8'
}, {
  name: '是否生成序号',
  type: '9'
}, {
  name: '明细是否显示表头',
  type: '10'
}]);

APP.constant('buildDateIntervalConstant', {
  'dateType': [{ name: '年-月-日 时:分', type: '1' }, { name: '年-月-日', type: '2' }, { name: '时:分', type: '3' }],
  'isAlert': [{ name: '提醒', type: '1' }, { name: '不提醒', type: '0' }],
  'cardElementAttribute': [{
    name: '必填',
    type: '1'
  }, {
    name: '消息内容',
    type: '2'
  }, {
    name: '列表显示',
    type: '3'
  }, {
    name: '审批可改',
    type: '4'
  }, {
    name: '通栏',
    type: '5'
  }]
});
/**
 * [ 文件上传构件需要常量 ]
 */
APP.constant('buildUploadConstant', {
  'cardElementAttribute': [{ name: '审批可改', type: '4' }]
});

/**
 * [ 选项构件需要常量 ]
 */
APP.constant('buildSelectConstant', {
  'selectType': [{ name: '单选', type: '1' }, { name: '多选', type: '2' }],
  'cardElementAttribute': [{ name: '必填', type: '1' }, { name: '消息内容', type: '2' }, { name: '列表显示', type: '3' }, { name: '审批可改', type: '4' }, { name: '通栏', type: '5' }],
  'selectData': [{ name: '从基础数据中选择', type: '1' }, { name: '选择部门或人员', type: '2' }, { name: '选择客户', type: '3' }]
});

APP.constant('buildDateConstant', {
  'dateType': [{ name: '年-月-日 时:分', type: '1' }, { name: '年-月-日', type: '2' }, { name: '时:分', type: '3' }],
  'isAlert': [{ name: '提醒', type: '1' }, { name: '不提醒 ', type: '0' }],
  'cardElementAttribute': [{ name: "必填", type: '1' }, { name: "消息内容", type: '2' }, { name: "列表显示", type: '3' }, { name: "审批可改", type: '4' }, { name: "通栏", type: '5' }]
});
'use strict';

APP.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  /**
   * [登陆  http://localhost:1234/#!/login]
   * @type {String}
   */
  $stateProvider.state('login', { //登陆页面
    url: '/login',
    templateUrl: 'script/platform/component/login/login.html',
    controller: 'loginCtrl'
  }).state('home', { //登陆后的框架页面
    url: '/home',
    templateUrl: 'script/platform/component/home/home.html',
    controller: 'homeCtrl'
  });

  $stateProvider.state('public', {
    url: '/public',
    templateUrl: 'script/platform/nc/indexPage.html'
  });

  //登陆后的主页面
  $stateProvider.state('home.main', {
    url: '/main',
    templateUrl: 'script/platform/component/home/main/main.html'
    // controller : 'mainCtrl'
  });

  /**
   * [我的组织  http://localhost:1234/#!/home/organization ]
   * @type {String}
   */
  $stateProvider.state('home.organization', { //首页
    url: '/organization',
    templateUrl: 'script/platform/component/home/organization/organization.html'
    // controller : 'organizationCtrl',
  }).state('home.organization.right', { //右侧内容
    params: {
      entId: null,
      createUserId: null,
      enterpriseName: null
    },
    url: '/right',
    views: {
      'right@home.organization': {
        templateUrl: 'script/platform/component/home/organization/right/organizationRight.html'
      }
    }
  });

  /**
   * [个人资料  http://localhost:1234/#!/home/userInfo ]
   * @type {String}
   */
  $stateProvider.state('home.userInfo', {
    url: '/userInfo',
    templateUrl: 'script/platform/component/home/user/userInfo/userInfo.html'
  });

  /**
   * [个人设置  http://localhost:1234/#!/home/userSet]
   * @type {String}
   */
  $stateProvider.state('home.userSet', {
    url: '/userSet',
    templateUrl: 'script/platform/component/home/user/userSet/userSet.html'
  });

  /**
   * [ 我的模板 ]
   * @type {String}
   */

  $stateProvider.state('home.myTemplateIndex', {
    url: '/myTemplateIndex',
    templateUrl: 'script/platform/component/home/myTemplate/index.html'
  }).state('home.myTemplate', {
    params: {
      entId: null,
      createUserId: null,
      enterpriseName: null
    },
    url: '/myTemplate',
    templateUrl: 'script/platform/component/home/myTemplate/left/myTemplate.html'
  }).state('home.myTemplate.addMainTemplate', { //创建主模板
    params: {
      entId: null,
      createUserId: null,
      enterpriseName: null
    },
    url: '/addMainTemplate',
    views: {
      'right@home.myTemplate': {
        templateUrl: 'script/platform/component/home/myTemplate/right/mainTemplate/addMainTemplate/addMainTemplate.html'
      }
    }
  }).state('home.myTemplate.previewMainTemplate', {
    params: {
      templateId: null,
      templateName: null
    },
    url: '/previewMainTemplate',
    views: {
      'right@home.myTemplate': {
        templateUrl: 'script/platform/component/home/myTemplate/right/mainTemplate/previewMainTemplate/previewMainTemplate.html'
      }
    }
  }).state('home.myTemplate.detailInfo', {
    params: {
      templateName: null
    },
    url: '/detailInfo',
    views: {
      'right@home.myTemplate': {
        templateUrl: 'script/platform/component/home/myTemplate/right/mainTemplate/previewMainTemplate/detailInfo/detailInfo.html'
      }
    }
  }).state('home.myTemplate.buildVerticalCard', { //构建纵向分类卡，这个路由是在开发的时候用，正式上线是通过ngdialog
    url: '/buildVerticalCard',
    views: {
      'right@home.myTemplate': {
        templateUrl: 'script/platform/component/home/myTemplate/right/mainTemplate/previewMainTemplate/buildVerticalCard/buildVerticalCard.html'
      }
    }
  }).state('home.myTemplate.buildText', { //构建纵向分类卡，这个路由是在开发的时候用，正式上线是通过ngdialog
    url: '/buildText',
    views: {
      'right@home.myTemplate': {
        templateUrl: 'script/platform/component/home/myTemplate/right/mainTemplate/previewMainTemplate/buildText/buildText.html'
      }
    }
  }).state('home.myTemplate.buildSelect', { //构建纵向分类卡，这个路由是在开发的时候用，正式上线是通过ngdialog
    url: '/buildSelect',
    views: {
      'right@home.myTemplate': {
        templateUrl: 'script/platform/component/home/myTemplate/right/mainTemplate/previewMainTemplate/buildSelect/buildSelect.html'
      }
    }
  }).state('home.myTemplate.subTemplate', { //右侧内容
    params: {
      entId: null,
      createUserId: null,
      enterpriseName: null
    },
    url: '/subTemplate',
    views: {
      'right@home.myTemplate': {
        templateUrl: 'script/platform/component/home/myTemplate/right/subTemplate/subTemplate.html'
      }
    }
  });

  $urlRouterProvider.otherwise('login');
}]);
'use strict';

APP.run(['$rootScope', '$log', '$timeout', 'loginMode', '$state', '$stateParams', '$transitions', 'localStorageService', '$trace', function ($rootScope, $log, $timeout, loginMode, $state, $stateParams, $transitions, localStorageService, $trace) {

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  // $trace.enable('TRANSITION'); //打印路由信息
  // $state.defaultErrorHandler(() => {}); //不打印错误信息
  $transitions.onStart({}, function () {
    //没有登陆成功则跳转到登陆界面
    if (localStorageService.get(loginMode.NAME) != loginMode.RESULT) {
      $state.go('login');
    }
  });

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

/**
 * 首页控制器
 */
APP.controller('indexCtrl', ['$timeout', '$log', '$scope', 'localStorageService', '$rootScope', '$state', 'loginMode', '$ngConfirm', function ($timeout, $log, $scope, localStorageService, $rootScope, $state, loginMode, $ngConfirm) {
	//广播事件：home.html监听该事件，如果点击则隐藏已经显示的导航
	$scope.bodyClick = function () {
		$scope.$broadcast('onBodyClick', {});
	};
}]);
"use strict";

$.extend({
  getRandom: function getRandom() {
    //获取随机数
    var random = Math.random() + "";
    random = random.split(".")[1];
    return random;
  },
  /**
    * Extends the destination object `dst` by copying all of the properties from the `src` object(s)
    * to `dst`. You can specify multiple `src` objects.
    *
    * @param   {Boolean} deep If true, the merge becomes recursive (optional)
    * @param   {Object}  dst  Destination object.
    * @param   {Object}  src  Source object(s).
    * @returns {Object}       Reference to `dst`.
    */
  clone: function clone(dst) {
    var deep = false,
        i = 1;

    if (typeof dst === 'boolean') {
      deep = dst;
      dst = arguments[1] || {};
      i++;
    }

    $.each([].slice.call(arguments, i), function (obj) {
      var array, clone, copy, key, src;

      for (key in obj) {
        src = dst[key];
        copy = obj[key];

        if (dst === copy) {
          continue;
        }

        if (deep && copy && (angular.isObject(copy) || (array = angular.isArray(copy)))) {

          if (array) {
            clone = src && angular.isArray(src) ? src : [];
          } else {
            clone = src && angular.isObject(src) ? src : {};
          }

          dst[key] = extend(deep, clone, copy);
        } else if (copy !== undefined) {
          dst[key] = copy;
        }
      }
    });

    return dst;
  }
});
'use strict';

/**
 * 过时不用
 */
APP.run(['$rootScope', function ($rootScope) {
  $rootScope.colors = {
    white: '#FFF',
    main: '#366092', //主色
    tableBg: '#f0f4fa', //表格背景色辅色
    tableBorder: '#bfbfbf', //表格边框及线条的颜色
    tableInsideBorder1: '#d9d9d9', //表格内部仙桃及其他辅助的颜色
    tableInsideBorder2: '#e8e8e8', //表格内部仙桃及其他辅助的颜色
    menuSecond: '#373d41', //二级菜单背景色
    menuSelected: '#95b3d7', //菜单选中背景色
    font1: '#366092', //深蓝
    font2: '#5385c1', //浅蓝
    font3: '#ff0000', //红色
    font4: '#000000', //黑色
    font5: '#333333', //浅黑
    font6: '#808080' //灰色
  };
  $rootScope.fontZize = {
    big: '16px',
    middleBig: '14px',
    middleSmall: '13px',
    small: '12px'
  };
}]);
'use strict';

//配置跨域访问的服务地址
APP.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['*://localhost:8080/**', 'self']);
    $sceDelegateProvider.resourceUrlWhitelist(['*://app.zhuoxitech.com:8443/**', 'self']);
    $sceDelegateProvider.resourceUrlWhitelist(['*://192.168.2.107:8080/**', 'self']);
    $sceDelegateProvider.resourceUrlWhitelist(['*://*.*.*.*:*/**', 'self']);
    $sceDelegateProvider.resourceUrlWhitelist(['*://*:*/**', 'self']);
}]);
'use strict';

APP.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('dropsea').setStorageType('sessionStorage').setNotify(true, true);
}]);
'use strict';

//详情参考http://indrimuska.github.io/angular-moment-picker/
APP.config(['momentPickerProvider', function (momentPickerProvider) {
    momentPickerProvider.options({
        /* Picker properties */
        locale: 'zh-cn',
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
// APP.config(['ngDialogProvider', function (ngDialogProvider) {
//     ngDialogProvider.setDefaults({
//         className: 'ngdialog-theme-plain',
//         plain: true,
//         showClose: false,
//         closeByDocument: false,
//         closeByEscape: true,
//         width:'600'
//     });
// }]);
"use strict";
'use strict';

APP.config(['$qProvider', function ($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);
'use strict';

APP.config(['ScrollBarsProvider', function (ScrollBarsProvider) {
	// scrollbar defaults
	ScrollBarsProvider.defaults = {
		autoHideScrollbar: false,
		scrollAmount: 'auto',
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

APP.config(['treeConfig', function (treeConfig) {
  treeConfig.defaultCollapsed = true; // collapse nodes by default
  treeConfig.appendChildOnHover = true; // append dragged nodes as children by default
  treeConfig.collapsed = true;
}]);
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

APP.config(['$validationProvider', 'localStorageServiceProvider', 'userInfo', function ($validationProvider, localStorageServiceProvider, userInfo) {
	var _expression, _defaultMsg;

	var expression = (_expression = {

		required: function required(value) {
			return !!value;
		},
		phone: /^1[34578]\d{9}$/,
		password: function password(value) {
			return value > 5;
		},
		email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
	}, _defineProperty(_expression, 'password', /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/), _defineProperty(_expression, 'comparePassword', function comparePassword(value, scope, element, attrs, param) {
		return value == $('#' + param).val();
	}), _defineProperty(_expression, 'compareOldPassword', function compareOldPassword(value, scope, element, attrs, param) {
		return value == param;
	}), _defineProperty(_expression, 'none', function none(value) {
		return true;
	}), _expression);

	var defaultMsg = (_defaultMsg = {

		required: {
			error: '该内容为必填选项，请耐心填写',
			success: ''
		},
		phone: {
			success: '',
			error: '手机号码有误，请重新输入'
		},
		password: {
			success: '',
			error: ' 长度至少6位'
		},
		email: {
			success: '',
			error: '邮箱格式有误，请重新输入'
		}
	}, _defineProperty(_defaultMsg, 'password', {
		success: '',
		error: '密码必须有数字英文字母和特殊字符组成'
	}), _defineProperty(_defaultMsg, 'comparePassword', {
		success: '',
		error: '两次输入密码不一致'
	}), _defineProperty(_defaultMsg, 'compareOldPassword', {
		success: '',
		error: '旧密码输入有误'
	}), _defineProperty(_defaultMsg, 'none', {
		success: '',
		error: ''
	}), _defaultMsg);

	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);
'use strict';

/**
 * 操作http服务
 */
APP.service('$appHttp', ['$rootScope', '$filter', '$http', '$timeout', '$q', 'localStorageService', '$log', function ($rootScope, $filter, $http, $timeout, $q, localStorageService, $log) {
	//{a:'a',b:'b'} == > a=a&b=b
	function serializeData(data) {
		// If this is not an object, defer to native stringification.
		if (!angular.isObject(data)) {
			return data == null ? "" : data.toString();
		}
		var buffer = [];
		// Serialize each key in the object.
		for (var name in data) {
			if (!data.hasOwnProperty(name)) {
				continue;
			}
			var value = data[name];
			buffer.push(encodeURIComponent(name) + "=" + encodeURIComponent(value == null ? "" : value));
		}
		// Serialize the buffer and clean it up for transportation.
		var source = buffer.join("&").replace(/%20/g, "+");
		return source;
	};
	/**
  * [post 请求]
  * @param  {[string]} param.url         [请求路径]
  * @param  {[object]} param.params      [请求参数]
  * @param  {[function]} param.before      [请求响应前回调函数]
  * @param  {[boolean]} param.enableCache [是否启用缓存，默认不启用]
  */
	this.getData = function (param) {
		if ($.isFunction(param.before)) {
			param.before();
		}
		if (param.enableCache == undefined) {
			param.enableCache = false;
		}

		var def = $q.defer();
		var compileParams = serializeData(param.params);
		var compileUrl = void 0;
		var cache = localStorageService.get(compileUrl);

		if (compileParams.length == 0) {
			compileUrl = param.url;
		} else {
			compileUrl = param.url + "?" + compileParams;
		}

		if (!!param.enableCache && !!cache) {
			cache.isCacheData = true;
			def.resolve(cache);
		} else {
			$http({
				mehtod: 'POST',
				url: compileUrl,
				data: param.params,
				headers: { 'Content-Type': undefined }
			}).then(function (resp) {
				if (!!param.enableCache) {
					localStorageService.set(compileUrl, resp);
				}
				resp.isCacheData = false;
				$log.info('请求url---------------------------------');
				$log.info(compileUrl);
				$log.info('请求结果---------------------------------');
				$log.info(resp);
				def.resolve(resp);
			}).catch(function (err) {
				def.reject(err);
			});
		}

		return def.promise;
	};

	/**
  * [get 请求]
  * @param  {[type]} url         [请求路径]
  * @param  {[type]} params      [请求参数]
  * @param  {[type]} before      [请求响应前回调函数]
  * @param  {[type]} enableCache [是否启用缓存，默认不启用]
  */
	this.getDataByGet = function (param) {
		if ($.isFunction(param.before)) {
			param.before();
		}
		if (param.enableCache == undefined) {
			param.enableCache = false;
		}

		var def = $q.defer();
		var compileParams = serializeData(param.params);
		var compileUrl = param.url + "?" + compileParams;
		var cache = localStorageService.get(compileUrl);

		if (!!param.enableCache && !!cache) {
			cache.isCache = true;
			def.resolve(cache);
		} else {
			$http.get(param.url, { 'params': param.params }).then(function (resp) {
				if (!!param.enableCache) {
					localStorageService.set(compileUrl, resp);
				}
				resp.isCache = false;
				def.resolve(resp);
			}).catch(function (err) {
				def.reject(err);
			});
		}

		return def.promise;
	};
	/**
  * [ JSONP 请求 ]
  * @param  {[type]} url                [地址]
  * @param  {[type]} params             [参数]
  * @param  {[type]} jsonpCallbackParam [回调函数名]
  * @param  {[type]} before             [请求前做的事情]
  * @return {[type]}                    [description]
  */
	this.getDataByJsonp = function (url, params, jsonpCallbackParam, before) {
		if ($.isFunction(before)) {
			before();
		}
		var def = $q.defer();

		$http.jsonp(url, {
			params: params,
			'jsonpCallbackParam': jsonpCallbackParam || 'callback'
		}).then(function (resp) {
			def.resolve(resp);
		}).catch(function (err) {
			def.reject(err);
		});

		return def.promise;
	};
}]);
'use strict';

/**
 * 操作cookie的服务
 */
APP.service('cache', ['$cookies', function ($cookies) {
	/**
  * [存数据]
  * @param  {[type]} key   [description]
  * @param  {[type]} value [description]
  * @return {[type]}       [description]
  */
	this.put = function (key, value) {
		$cookies.put(key, value);
	};
	/**
  * [获取数据]
  * @param  {[type]} key [description]
  * @return {[type]}     [description]
  */
	this.get = function (key) {
		return $cookies.get(key);
	};
	/**
  * [删除]
  * @param  {[type]} key [description]
  * @return {[type]}     [description]
  */
	this.remove = function (key) {
		$cookies.remove(key);
	};
}]);
'use strict';

/**
 * 获取UUID
 */
APP.service('tree', ['$rootScope', '$filter', '$http', '$timeout', '$q', function ($rootScope, $filter, $http, $timeout, $q) {
  return {
    /**
     * [ 初始化，包含鼠标单击后的效果 ]
     * @return {[type]} [description]
     */
    init: function init(treeId) {
      var tree = $('#' + treeId);
      tree.on('click', 'li div', function (e) {
        var this_ = $(this);
        tree.find('li div').css({
          'background-color': 'white',
          'color': 'black'
        });
        this_.css({
          'background-color': '#373d41',
          'color': 'white'
        });
      });
    },
    /**
     * [让菜单有层级感。显示树结构的时候添加层级结构前的padding-left,使用可以值参考myTemplateCtrl中的使用]
     * @param  {[type]} arrays          [原数组]
     * @param  {[type]} childNodesName  [子属性名字，该属性对应的值是数组]
     * @param  {[type]} level           [层级，可以不写，默认1]
     * @param  {[type]} basePaddingLeft [如果值是20px,第一级目录paddingleft=20,第二级是40]
     * @return {[type]}                 [description]
     */
    addLevel: function addLevel(arrays, childNodesName, basePaddingLeft, level) {
      if (!level) {
        level = 1;
      }
      if (!basePaddingLeft) {
        basePaddingLeft = 20;
      }
      for (var i = 0; i < arrays.length; i++) {
        arrays[i].paddingLeft = level * basePaddingLeft + 'px';
        if (!!arrays[i][childNodesName] && arrays[i][childNodesName].length > 0) {
          var childLevel = level + 1;
          this.addLevel(arrays[i][childNodesName], childNodesName, basePaddingLeft, childLevel);
        }
      }
    }
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
'use strict';

APP.controller('homeCtrl', ['$rootScope', '$scope', '$log', 'localStorageService', 'loginMode', '$state', '$timeout', '$ngConfirm', 'userInfo', function ($rootScope, $scope, $log, localStorageService, loginMode, $state, $timeout, $ngConfirm, userInfo) {
  $scope.userInfoMode = false;

  $scope.$on('onBodyClick', function (event, data) {
    $scope.userInfoMode = false;
  });

  $scope.init = function () {
    $scope.loginName = localStorageService.get(userInfo.logName);
  };
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
  $scope.showUserInfo = function ($event) {
    $event.stopPropagation();
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

APP.controller('loginCtrl', ['$rootScope', '$scope', '$log', 'localStorageService', 'loginMode', '$state', '$timeout', '$appHttp', '$loading', 'userInfo', function ($rootScope, $scope, $log, localStorageService, loginMode, $state, $timeout, $appHttp, $loading, userInfo) {
  //检测到如果登陆了则直接跳转到登陆后的页面
  if (localStorageService.get(loginMode.NAME) == loginMode.RESULT) {
    $state.go('home.main', {}, {
      location: 'replace'
    });
  }

  //变量

  //timeout


  //函数
  $scope.login = function () {
    $scope.logName = '18735885176'; //13922251988(余总，123)18735885176（张鹏，1）18925281551（孙总，123456）,15210820048(晓东，123)
    $scope.password = '1';
    $scope.message = "正在登陆";
    var error = false;

    $appHttp.getData({
      url: '/CommonPlatform/customUserConfig!login.action',
      params: {
        logName: $scope.logName,
        password: $scope.password
      },
      before: function before() {
        $loading.start("login");
      }
    }).then(function (resp) {
      //校验成功
      if (!!resp && !!resp.data && !!resp.data.sysToken) {

        localStorageService.set(userInfo.createDate, resp.data.creatDate);
        localStorageService.set(userInfo.logName, resp.data.logName);
        localStorageService.set(userInfo.loginCount, resp.data.loginCount);
        localStorageService.set(userInfo.remark, resp.data.remark);
        localStorageService.set(userInfo.sysToken, resp.data.sysToken);
        localStorageService.set(userInfo.userID, resp.data.userID);
        localStorageService.set(loginMode.NAME, loginMode.RESULT);
        localStorageService.set(userInfo.password, $scope.password);
        $state.go('home.myTemplate', {}, {
          absolute: true,
          location: 'replace'
        });
      } else {
        $scope.message = "登陆失败，错误原因:" + resp.data.remark;
      }
    }).catch(function (err) {
      $log.error(err);
      error = true;
      $scope.message = "登陆失败，错误原因:" + err;
    }).finally(function () {
      if (error) {
        $timeout(function () {
          $loading.finish('login');
        }, 2000);
      } else {
        $loading.finish('login');
      }
    });
  };
}]);
'use strict';

APP.directive('dropseaFileUpload', ['$timeout', 'uuid', '$log', 'Upload', function ($timeout, uuid, $log, Upload) {
  return {
    templateUrl: 'script/common/directive/fileUpload/fileUpload.html?t=' + uuid.getUUID(),
    scope: {
      eventName: '@',
      title: '@',
      placeholder: '@'
    },
    transclude: true,
    restrict: 'EA',
    replace: false,
    controller: function controller($scope) {},
    link: function link($scope, $element, $attrs, $ngModelCtrl) {
      $scope.files = [];
      $scope.resultData = [];
      $ngModelCtrl.fileResult = {};
      $scope.uploadFiles = function (file, errFiles) {

        $scope.errFile = errFiles && errFiles[0];
        if (file) {
          var obj = {
            file: file,
            errFile: $scope.errFile,
            progress: '0%',
            errorMsg: ''
          };
          $scope.files.push(obj);
          file.upload = Upload.upload({
            url: '/CommonPlatform/fileUtil!uploadFile.action',
            data: { files: file }
          });

          file.upload.then(function (response) {
            $timeout(function () {
              if (response.data.result) {
                file.result = response.data;
                $scope.resultData.push(response.data);
                $scope.$emit($scope.eventName, response.data);
                $ngModelCtrl.fileResult[$scope.propName] = $scope.resultData;
              } else {
                obj.errorMsg = response.data.msg;
              }
            });
          }, function (response) {
            if (response.status > 0) $obj.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            obj.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          });
        }
      };
    }
  };
}]);
'use strict';

APP.directive('dropseaNavUserInfo', ['uuid', '$state', function (uuid, $state) {
	return {
		templateUrl: 'script/platform/directive/navUserInfo/navUserInfo.html?t=' + uuid.getUUID(),
		scope: {},
		replace: true,
		restrict: 'E',
		controller: function controller($scope) {},
		link: function link($scope, $element, $attrs, ngModelCtrl) {
			$scope.gotoOrganization = function ($event) {
				$state.go('home.organization');
			};

			$scope.gotoUserInfo = function ($event) {
				$state.go('home.userInfo');
			};
			$scope.gotoUserSet = function ($event) {
				$state.go('home.userSet');
			};
			$scope.gotoMyTemplate = function ($event) {
				$state.go('home.myTemplateIndex');
			};
		}
	};
}]);
'use strict';

APP.directive('dropseaSelect', ['$timeout', 'uuid', '$log', '$appHttp', '$loading', function ($timeout, uuid, $log, $appHttp, $loading) {
	return {
		templateUrl: 'script/platform/directive/select/select.html?t=' + uuid.getUUID(),
		scope: {
			selectUrl: '@',
			ngBindModel: '=ngModel'
		},
		transclude: true,
		restrict: 'EA',
		replace: false,
		controller: function controller($scope) {},
		link: function link($scope, $element, $attrs, $ngModelCtrl) {
			$scope.id = "select" + uuid.getUUID();
			if (!!$attrs.multiple) {
				$scope.multiple = 'multiple';
			} else {
				$scope.multiple = '';
			}
			$scope.items = [];
			console.log($scope.selectUrl);
			if (!!$scope.selectUrl) {
				var selectURLObj = JSON.parse($scope.selectUrl);
				$scope.name = selectURLObj.name;

				if (selectURLObj.type == "url") {
					//"{"type":"url","data":"customBaseInfo!getEntSelectListbyFid.action?fid=100&entid=283","name":"基础数据"}"
					$appHttp.getData({
						params: {},
						url: "/CommonPlatform/" + selectURLObj.data,
						before: function before() {
							$loading.start($scope.id);
						}
					}).then(function (resp) {

						var data = resp.data;
						if (data.length > 0) {
							for (var i = 0; i < data.length; i++) {
								$scope.items.push({
									name: data[i]["dicinfo"],
									type: data[i]
								});
							}
							$loading.finish($scope.id);
						}
					}).catch(function (error) {
						$loading.finish($scope.id);
					}).finally(function () {});
				} else if (selectURLObj.type == "user") {
					var users = selectURLObj.data;
					angular.forEach(users, function (item, index) {
						$scope.items.push({
							name: item.userName,
							type: item
						});
					});
				} else if (selectURLObj.type == "group") {
					var groups = selectURLObj.data;
					angular.forEach(groups, function (item, index) {
						$scope.items.push({
							name: item.dicinfo,
							type: item
						});
					});
				}
			}
		}
	};
}]);
'use strict';

APP.directive('panel1a', ['uuid', function (uuid) {
	return {
		templateUrl: 'script/platform/directive/panel1/panel1.html?t=' + uuid.getUUID(),
		scope: {},
		replace: false,
		restrict: 'E',
		controller: function controller($scope) {},
		link: function link($scope, $element, $attrs, ngModelCtrl) {}
	};
}]);
'use strict';

APP.controller('panel1Ctrl', ['$timeout', function ($timeout) {
  var data = new Set();
  data.add(1);
  $timeout(function () {
    console.log('aaa');
  }, 0);
}]);
'use strict';

/**
 * [ 文本构件 ]
 * textrows=1 单行文本 =2多行文本，默认1
 * placeholder = "" 输入提示，默认空串
 * validator = ""校验规则，默认空串
 * desc="" 底部描述文字
 * show-desc="true"是否显示底部描述文字，默认不显示
 * @type {String}
 */
APP.directive('dropseaTextContent', ['$timeout', 'uuid', '$log', function ($timeout, uuid, $log) {
  return {
    restrict: "AE",
    transclude: true,
    reuqire: 'ngModel',
    templateUrl: 'script/common/directive/textContent/textContent.html?t=' + uuid.getUUID(),
    scope: {
      title: '@', //字段名
      ngBindModel: '=ngModel',
      textrows: '@'
    },
    template: '',
    controller: ["$scope", function ($scope) {}],
    link: function link($scope, $element, $attrs, ngModelCtrl) {

      if (!!$attrs.placeholder) {
        $scope.placeholder = $attrs.placeholder;
      } else {
        $scope.placeholder = '';
      }

      if (!!$attrs.validator) {
        $scope.validator = $attrs.validator;
      } else {
        $scope.validator = 'none';
      }

      if (!!$attrs.showDesc && $attrs.showDesc == 'true') {
        $scope.showDesc = true;
      } else {
        $scope.showDesc = false;
      }

      if (!!$attrs.desc) {
        $scope.desc = $attrs.desc;
      } else {
        $scope.desc = '';
      }
    }
  };
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

APP.directive('appClassifiedCard', ['$timeout', 'uuid', '$compile', function ($timeout, uuid, $compile) {
  return {
    templateUrl: 'script/common/directive/classifiedCard/classifiedCard.html?t=' + uuid.getUUID(),
    reuqire: 'ngModel',
    scope: {
      ngBindModel: '=ngModel',
      placeholder: '@'
    },
    restrict: 'E',

    controller: function controller($scope) {},
    link: function link($scope, $element, $attrs, ngModelCtrl) {}
  };
}]);
'use strict';

/**
 * [ 动态编译html],使用方式<div app-dynamic="{{html}}"></div>
 * 或者<div app-dynamic handler="myfunction()"> myfunction()返回要编译的字符串
 * @param  {[type]} $compile [description]
 * @return {[type]}          [description]
 */
APP.directive('appDynamic', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            handler: '&'
        },
        link: function link(scope, element, attrs) {
            scope.$watch(function () {
                return attrs.appDynamic;
            }, function (value) {
                if (attrs.handler) {
                    value = scope.handler();
                }
                element.html(value && value.toString());
                var compileScope = scope;
                if (attrs.bindHtmlScope) {
                    compileScope = scope.$eval(attrs.bindHtmlScope);
                }
                $compile(element.contents())(compileScope);
            });
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
 * isF 是否是负数
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

APP.directive('appendText', [function () {
	return {
		scope: {},
		restrict: 'A',
		link: function link($scope, $element, $attrs, ngModelCtrl) {
			$element.on('blur', function () {
				if (!!$attrs.appendText) {
					$element.val($element.val() + $attrs.appendText);
				}
			});
			$element.on('focus', function () {
				if (!!$attrs.appendText) {
					var val = $element.val();
					val = val.substring(0, val.indexOf($attrs.appendText));
					$element.val(val);
				}
			});
		}
	};
}]);
'use strict';

/**
 * [ 表单 ]
 * <app-input title="">
 *  <input type="text" ng-model="aaa"/>
 * </app-input>
 * @type {String}
 */
APP.directive('appInput', ['$timeout', 'uuid', '$log', function ($timeout, uuid, $log) {
  return {
    templateUrl: 'script/common/directive/input/input.html?t=' + uuid.getUUID(),
    scope: {
      clazz: '@class',
      title: '@'
    },
    transclude: true,
    restrict: 'EA',
    replace: true,
    controller: function controller($scope) {},
    link: function link($scope, $element, $attrs, ngModelCtrl) {
      $scope.id = "input-" + uuid.getUUID();
      $scope.isBottom = $attrs.isBottom ? true : false;
      $scope.isRight = $attrs.isRight ? true : false;
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

			//自动隐藏中间蓝
			$element.find('.lrl-centerBtn').css('visibility', 'hidden');
			$element.on('mouseenter', function () {
				$element.find('.lrl-centerBtn').css('visibility', 'visible');
			});
			$element.on('mouseleave', function () {
				$element.find('.lrl-centerBtn').css('visibility', 'hidden');
			});

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
 * [加载框Loading...]，注意，该指令依赖spin.js,使用前先引入spin.js,ng-loading
 * 使用方式
 *  在指定的div上添加指令app-loading="loadingid"
 *  在controller中通过$loading.start('loadingid');和$loading.finish('loadingid')来开始显示和结束显示
 *  可通过app-loading-options="{text: '{{message}}'}" 配置显示的内容，速度，等等
 *  举例
 *  <div class="h-100 "  app-loading="myOrganization"  app-loading-options="{text: '正在加载'}"></div>
 *    $loading.start('myOrganization');//显示加载
 *    $loading.finish('myOrganization')//隐藏加载
 */

(function (APP) {

  function extend(dst) {
    var deep = false,
        i = 1;

    if (typeof dst === 'boolean') {
      deep = dst;
      dst = arguments[1] || {};
      i++;
    }

    angular.forEach([].slice.call(arguments, i), function (obj) {
      var array, clone, copy, key, src;

      for (key in obj) {
        src = dst[key];
        copy = obj[key];

        if (dst === copy) {
          continue;
        }

        if (deep && copy && (angular.isObject(copy) || (array = angular.isArray(copy)))) {

          if (array) {
            clone = src && angular.isArray(src) ? src : [];
          } else {
            clone = src && angular.isObject(src) ? src : {};
          }

          dst[key] = extend(deep, clone, copy);
        } else if (copy !== undefined) {
          dst[key] = copy;
        }
      }
    });

    return dst;
  }

  APP.value('appLoadingOptions', {
    active: false, // Defines current loading state
    text: 'Loading...', // Display text
    className: '', // Custom class, added to directive
    overlay: true, // Display overlay
    spinner: true, // Display spinner
    spinnerOptions: {
      lines: 12, // The number of lines to draw
      length: 7, // The length of each line
      width: 4, // The line thickness
      radius: 10, // The radius of the inner circle
      rotate: 0, // Rotation offset
      corners: 1, // Roundness (0..1)
      color: '#000', // #rgb or #rrggbb
      direction: 1, // 1: clockwise, -1: counterclockwise
      speed: 2, // Rounds per second
      trail: 100, // Afterglow percentage
      opacity: 1 / 4, // Opacity of the lines
      fps: 20, // Frames per second when using setTimeout()
      zIndex: 2e9, // Use a high z-index by default
      className: 'dw-spinner', // CSS class to assign to the element
      top: 'auto', // Center vertically
      left: 'auto', // Center horizontally
      position: 'relative' // Element position
    }
  }).service('appLoading', ['$timeout', '$rootScope', 'appLoadingOptions', function ($timeout, $rootScope, appLoadingOptions) {
    var self = this;

    /**
     * Overrides default options
     * @param {object} options
     */
    self.setDefaultOptions = function (options) {
      extend(true, appLoadingOptions, options);
    };

    /**
     * Activates loading state by key
     * @param {string} key
     */
    self.start = function (key) {
      $timeout(function () {
        $rootScope.$broadcast('$appLoadingStart', key);
      });
    };

    /**
     * Deactivates loading state by key
     * @param {string} key
     */
    self.finish = function (key) {
      $timeout(function () {
        $rootScope.$broadcast('$appLoadingFinish', key);
      });
    };
  }])

  // Shortcut
  .factory('$loading', ['appLoading', function (appLoading) {
    return appLoading;
  }]).directive('appLoading', ['$rootScope', 'appLoadingOptions', 'uuid', function ($rootScope, appLoadingOptions, uuid) {
    return {
      // templateUrl: 'script/common/directive/loading/loading.html?t=' + uuid.getUUID(),
      link: function link(scope, element, attrs) {
        attrs.$observe('appLoadingOptions', function (options) {
          options = eval('(' + options + ')');
          $('#' + id_).text(options.text);
        });
        var id_ = 'apploading-' + uuid.getUUID();
        var spinner = null,
            key = attrs.appLoading || false,
            options,
            container,
            body,
            spinnerContainer,
            text;

        /**
         * Starts spinner
         */
        var start = function start() {
          if (container) {
            container.addClass('dw-loading-active');
          }
          if (spinner) {
            spinner.spin(spinnerContainer[0]);
          }
        };

        /**
         * Stops spinner
         */
        var finish = function finish() {
          if (container) {
            container.removeClass('dw-loading-active');
          }
          if (spinner) {
            spinner.stop();
          }
        };

        scope.$watch(attrs.appLoadingOptions, function (newOptions) {
          finish();

          options = extend(true, {}, appLoadingOptions, newOptions);

          // Build template
          body = angular.element('<div></div>').addClass('dw-loading-body');
          container = angular.element('<div></div>').addClass('dw-loading').append(body);

          if (options.overlay) {
            container.addClass('dw-loading-overlay');
          }
          if (options.className) {
            container.addClass(options.className);
          }
          if (options.spinner) {
            spinnerContainer = angular.element('<div></div>').addClass('dw-loading-spinner');
            body.append(spinnerContainer);
            spinner = new Spinner(options.spinnerOptions);
          }
          if (options.text) {
            text = angular.element('<div style="position:absolute; top:24px;width:100px;left:-50px" id="' + id_ + '"></div>').addClass('app-loading-text').text(options.text);
            body.append(text);
          }

          element.append(container);
          //            $compile(container)(scope);

          if (options.active || !key) {
            start();
          }
        }, true);

        $rootScope.$on('$appLoadingStart', function (event, loadKey) {
          if (loadKey === key) {
            start();
          }
        });

        $rootScope.$on('$appLoadingFinish', function (event, loadKey) {
          if (loadKey === key) {
            finish();
          }
        });

        scope.$on('$destroy', function () {
          finish();
          spinner = null;
        });
      }
    };
  }]);
})(APP);
'use strict';

/**
 * [列表]
 * right-icon-style="" 多余字段
 *  right-btn-handler="click()" 点击右侧图标回调时间
 *  right-icon-auto-visible="true"
 *  right-icon = ""右侧图标样式
<app-list-item name="asdfda" ng-repeat="" right-icon-style="icon xxxx" right-btn-handler="click()">

</app-list-item>




 * @type {String}
 */
APP.directive('appListItem', ['$timeout', 'uuid', '$log', function ($timeout, uuid, $log) {
  return {
    templateUrl: 'script/common/directive/listItem/listItem.html?t=' + uuid.getUUID(),
    scope: { //@ = &
      name: "@", //鼠标点击变色，如果不加该值不会有效果
      rightIconStyle: "@", //add top left delete
      rightBtnHandler: "&", //点击右侧按钮处理函数
      rightIconAutoVisible: "@", //右侧图标是否自动隐藏
      rightIcon: "@", //右侧图标
      clazz: "@class"
    },
    transclude: true,
    restrict: 'E',
    replace: false,
    controller: function controller($scope) {},
    link: function link($scope, $element, $attrs, ngModelCtrl) {

      if (!angular.isDefined($scope.rightIconAutoVisible)) {
        $scope.rightIconAutoVisible = false;
      }
      if (!angular.isDefined($scope.rightIcon)) {
        $scope.rightIcon = 'icon ColorChangeFont icon-you';
      }
      $scope.id = "listItem-" + uuid.getUUID();

      // 点击时添加选中样式,如果没有name属性，则不会生效
      $element.on('click', function (e) {
        // e.stopPropagation();
        if (angular.isDefined($scope.name)) {
          var names = $('app-list-item[name="' + $scope.name + '"]');
          angular.forEach(names, function (ele) {
            $(ele).find('div:eq(0)').removeClass("app-list-item-selected");
          });
          var that = $(this);
          that.find('div:eq(0)').addClass("app-list-item-selected");
        }
      });

      //点击右侧图标
      $scope.clickRightBtn = function () {
        $scope.rightBtnHandler();
      };

      //自动隐藏右侧图标
      if ($scope.rightIconAutoVisible == 'true') {
        $element.find('.rightIcon').css('visibility', 'hidden');

        $element.on('mouseenter', function () {
          $element.find('.rightIcon').css('visibility', 'visible');
        });
        $element.on('mouseleave', function () {
          $element.find('.rightIcon').css('visibility', 'hidden');
        });
      }
    }
  };
}]);
'use strict';

/**
 * 模拟移动端页面布局，上面是返回 标题 更多，下面是内容
 * head-style="1" 设置头部样式，包括返回，标题 更多
 * head-style="2" 设置头部样式，包括返回，标题 更多，但是返回只占用位置
 * head-style="3" 包含标题、操作
 * header:头部文字
 * width 宽度
 * height 高度
 * text-align : 头部文字对其方式
 * left-btn-icon :右侧图标样式
 * callback ="bbb()": 点击右侧按钮回调
 * left-btn-handler="aaaa()" 左侧图标回调函数
 * has-header-color="false" 没有背景色，默认有
 * has-border="false" 没有边框，默认有
 * border-weight="2px" 头部底边粗细，默认1px
 *
 */
APP.directive('appPagePanel', ['$timeout', 'uuid', '$state', function ($timeout, uuid) {
  return {
    templateUrl: 'script/common/directive/pagePanel/pagePanel.html?t=' + uuid.getUUID(),
    scope: {
      header: "@",
      width: "@",
      height: "@",
      headStyle: "@",
      textAlign: "@",
      leftBtnIcon: "@", //右侧按钮，我左右不分
      clazz: "@class",
      callback: "&",
      leftBtnHandler: '&'

    },
    transclude: true,
    restrict: 'E',
    controller: function controller($scope) {},
    link: function link($scope, $element, $attrs, ngModelCtrl) {
      $scope.id = "lrc-containerd-" + uuid.getUUID();
      if (!$attrs.hasHeaderColor) {
        $scope.hasHeaderColor = true;
      } else {
        if ($attrs.hasHeaderColor == 'true') {
          $scope.hasHeaderColor = true;
        } else {
          $scope.hasHeaderColor = false;
        }
      }

      if (!$attrs.hasBorder) {
        $scope.hasBorder = true;
      } else {
        if ($attrs.hasBorder == 'true') {
          $scope.hasBorder = true;
        } else {
          $scope.hasBorder = false;
        }
      }

      //头部底线粗细，默认1px
      if (!$attrs.borderWeight) {
        $scope.borderWeight = '1px';
      } else {
        $scope.borderWeight = $attrs.borderWeight;
      }

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

      if (!$scope.leftBtnIcon) {
        $scope.leftBtnIcon = "icon ColorChangeFont  icon-jian";
      }

      $scope.leftBtnClick = function ($event) {
        $scope.leftBtnHandler();
      };

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

APP.directive('appPopSelect', ['$timeout', 'uuid', '$log', function ($timeout, uuid, $log) {
  return {
    restrict: "EA",
    transclude: true,
    scope: {
      style: '@',
      target: '@'

    },
    templateUrl: 'script/common/directive/popSelect/popSelect.html?t=' + uuid.getUUID(),
    // template:''
    controller: ["$scope", function ($scope) {}],
    link: function link($scope, $element, $attrs, ngModelCtrl) {
      $scope.display = 'none';
      $scope.width = '100%';

      var tg = $($scope.target);
      if (!tg) {
        tg = $element;
      }
      $scope.targetText = tg.html();
      $scope.toggle = true;
      $(window.document).on('click', function () {
        $timeout(function () {
          $scope.$apply(function () {
            $scope.display = 'none';
            tg.html($scope.targetText);
            $scope.toggle = true;
          });
        });
      });

      tg.on('click', function (e) {
        e.stopPropagation();
        if ($scope.toggle) {
          $timeout(function () {
            $scope.$apply(function () {
              $scope.display = 'block';
              //            tg.html('取消');
              $scope.toggle = false;
            });
          });
        } else {

          $timeout(function () {
            $scope.$apply(function () {
              tg.html($scope.targetText);
              $scope.toggle = true;
              $scope.display = 'none';
            });
          });
        }
      });
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

			$element.find('.lrl-centerBtn').css('visibility', 'hidden');
			$element.on('mouseenter', function () {
				$element.find('.lrl-centerBtn').css('visibility', 'visible');
			});
			$element.on('mouseleave', function () {
				$element.find('.lrl-centerBtn').css('visibility', 'hidden');
			});
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
<app-section height='200px' visible="true">
  <header>
    <div class="w-100 h-100" style="background-color:pink">
      <i class="icon ColorChangeFont icon-you"></i>日志
    </div>
  </header>
  <section >
    <div class="w-100 h-100" style="border:1px solid black">
      我今天好开心
    </div>
  </section>
</app-section>
visible:初始化时是显示还是隐藏，true隐藏，false显示
height:'高度'


 */
APP.directive('appSection', ['$timeout', 'uuid', '$log', function ($timeout, uuid, $log) {
  return {
    templateUrl: 'script/common/directive/section/section.html?t=' + uuid.getUUID(),
    scope: {
      header: '@',
      height: '@',
      visible: '@'
    },
    transclude: {
      header: "?header",
      section: "?section"
    },
    restrict: 'E',
    replace: false,
    controller: function controller($scope) {},
    link: function link($scope, $element, $attrs, ngModelCtrl) {
      $scope.id = 'section' + uuid.getUUID();
      if ($scope.visible == "true") {
        $scope.visible = true;
        $element.find('section').css('height', '0');
      } else {
        $scope.visible = false;
        $element.find('div[name="containerkl234jnsd"]').height(parseFloat($scope.height) - 28 + 'px');
      }

      $scope.showSectionHandler = function () {
        var section = $element.find('div[name="containerkl234jnsd"]');

        //加timeout是为了让动画更顺畅
        if ($scope.visible == 'false' || $scope.visible == false) {
          $timeout(function () {
            $element.find('section').animate({
              height: 0
            });
          }, 10);

          $timeout(function () {
            section.animate({
              height: 0
            }, function () {
              $scope.visible = true;
            });
          }, 10);
        } else {
          $timeout(function () {
            $element.find('section').animate({
              height: parseFloat($scope.height) - 28 + 'px'
            });
          }, 10);

          $timeout(function () {
            section.animate({
              height: parseFloat($scope.height) - 28 + 'px'
            }, function () {
              $scope.visible = false;
            });
          });
        }
      };
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

APP.directive('appScrollLoad', ['$appHttp', '$log', 'uuid', function ($appHttp, $log, uuid) {
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
						$appHttp.getData($scope.url, params).then(function (data) {
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
						$appHttp.getDataByGet($scope.url, params).then(function (data) {
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

/**
 * [带滚动条的表格]
 * data属性：表格配置:表头，列的单元格样式
 * height:整个表格的高度

 //表格配置
 $scope.data = [
   {
     label:'name', //表头
     style:'width:20%; border-right:1px solid black'//表头样式，列宽，左右边框，背景色等等
   },{
     label:'age',
     style:'width:20%'
   },{
     label:'gender',
     style:'width:60%; border-left:1px solid black'
   }
 ];

//使用
 <app-table height='150px' data='{{data}}'>
   <app-tr ng-repeat="rowData in tableData">
     <app-td>{{rowData.name}}</app-td>
     <app-td>{{rowData.age}}</app-td>
     <app-td>{{rowData.gender}}</app-td>
   </app-tr>
 </app-table>

 * @type {String}
 */
APP.directive('appTable', ['$timeout', 'uuid', '$log', function ($timeout, uuid, $log) {
  return {
    templateUrl: 'script/common/directive/table/table.html?t=' + uuid.getUUID(),
    scope: {
      height: '@',
      data: '@'
    },
    transclude: true,
    replace: true,
    restrict: 'E',
    controller: function controller($scope) {
      var trs = $scope.trs = [];
      //添加选项卡，供子标签app-panel 或者app-panel-lazy 使用
      this.addTr = function (tr) {
        tr.titleData = $scope.titleData;
        trs.push(tr);
      };

      // this.titleData = function() {
      //   $scope.titleData = angular.fromJson($scope.data);
      // }
    },
    link: function link($scope, $element, $attrs, ngModelCtrl) {
      $scope.id = "table-" + uuid.getUUID();
      if (!angular.isDefined($scope.height)) {
        $scope.height = '100%';
      }
      //计算内容的高度:实际高度-表头高度
      if ($scope.height.indexOf('%') != -1) {
        $scope.contentHeight = 'calc(100% - 28px)';
      } else {
        $scope.contentHeight = parseFloat($scope.height) - 28 + 'px';
      }
      //解析表头
      if (!angular.isDefined($scope.data)) {
        $log.error('请配置表头数据');
      }
      $scope.titleData = angular.fromJson($scope.data);
    }
  };
}]);

APP.directive('appTr', ['$rootScope', 'uuid', function ($rootScope, uuid) {
  return {
    restrict: 'EA',
    scope: {
      titleData: '@'
    },
    replace: true,
    transclude: true,
    require: '^appTable',
    templateUrl: 'script/common/directive/table/tr.html?t=' + uuid.getUUID(),
    controller: function controller($scope) {
      var tds = $scope.tds = [];

      //添加选项卡，供子标签app-panel 或者app-panel-lazy 使用
      this.addTd = function (td) {
        if (!!$scope.titleData) {
          if (!!$scope.titleData[tds.length].style) {
            td.publicStyle = $scope.titleData[tds.length].style;
          }

          tds.push(td);
        }
      };
    },
    link: function link($scope, $elemenet, $attrs, appTableController) {
      $scope.$watch('titleData', function (newVal, oldVal) {
        appTableController.addTr($scope);
      });
    }
  };
}]);
APP.directive('appTd', ['$rootScope', 'uuid', function ($rootScope, uuid) {
  return {
    restrict: 'EA',
    scope: {
      style: '@privateStyle',
      titleData: '@'
    },
    replace: true,
    transclude: true,
    require: '^appTr',
    templateUrl: 'script/common/directive/table/td.html?t=' + uuid.getUUID(),
    link: function link($scope, $elemenet, $attrs, appTrController) {
      //鼠标移动到td提示td中的内容
      $scope.$watch(function () {
        return $elemenet.html();
      }, function (newVal) {
        $scope.title = newVal;
      });
      $scope.$watch('titleData', function (newVal, oldVal) {
        appTrController.addTd($scope);
      });
    }
  };
}]);
'use strict';

/**
 * tab切换,使用方式
 * app-panel:添加选项卡,每次点击会重新刷新数据
 * app-panel-lazy:添加选项卡，懒加载，保留上次的数据，不刷新
 * title:选项卡名称
 * app-click:点击选项卡标题时的操作
 *
 <app-tabs>
   <app-panel tittle='组织管理' app-click='organizationManger()'>
     <panel1a></panel1a>
   </app-panel>
   <app-panel tittle='工作设置' app-click='workset()'>
   </app-panel>
   <app-panel-lazy tittle='基础数据' app-click='workset()'>

   </app-panel-lazy>
 </app-tabs>
 * @type {String}
 */

//父标签
APP.directive('appTabs', ['$timeout', 'uuid', '$log', function ($timeout, uuid, $log) {
  return {
    restrict: "EA",
    transclude: true,
    scope: {
      clazz: '@class',
      style: '@',
      defaultPanel: '@'
    },
    templateUrl: 'script/common/directive/tabs/tab.html?t=' + uuid.getUUID(),
    controller: ["$scope", function ($scope) {
      var panes = $scope.scopes = [];
      //点击选项卡标题操作
      $scope.clickTtile = function (pane) {
        if (angular.isFunction(pane.callback)) {
          pane.callback();
        }
      };

      //切换选项卡
      $scope.select = function (pane) {
        if (!!pane) {
          angular.forEach(panes, function (scope) {
            scope.selected = false;
          });

          pane.selected = true;
        }
      };

      this.removeScope = function (scope) {
        for (var i = panes.length - 1; i >= 0; i--) {
          panes[i].selected = false;
          if (panes[i].uuid == scope.uuid) {
            panes.splice(i, 1);
          }
        }
        if (panes.length != 0) {
          $scope.select(panes[0]);
        }
      };

      //添加选项卡，供子标签app-panel 或者app-panel-lazy 使用
      this.addScope = function (scope) {
        var has = false;
        for (var i = 0; i < panes.length; i++) {
          if (panes[i].uuid == scope.uuid) {
            has = true;
          }
        }

        if (!has) {
          if (!!$scope.defaultPanel && panes.length == $scope.defaultPanel) {
            $scope.select(scope);
          } else if (panes.length === 0) {
            $scope.select(scope);
          }
          panes.push(scope);
          $scope.width = 100 / panes.length + '%';
        }
      };
    }],
    link: function link($scope, $element, $attrs, ngModelCtrl) {}
  };
}]);
//子标签,不进行懒加载
APP.directive('appPanel', ['$timeout', 'uuid', '$compile', function ($timeout, uuid, $compile) {
  return {
    restrict: 'EA',
    scope: {
      tittle: '@',
      callback: '&appClick',
      showed: '@'
    },
    replace: false,
    transclude: true,
    require: '^appTabs', //继承外层指令
    templateUrl: 'script/common/directive/tabs/panel.html?t=' + uuid.getUUID(),
    link: function link($scope, elemenet, attrs, appTabsController) {

      // $scope.$watch(function(scope){
      //   return scope.$eval(attrs.compile);
      // },function(v){
      //   console.log(1111111111);
      //   elemenet.html(v);
      //   $compile(elemenet.contents())($scope);
      // });
      if (!angular.isDefined($scope.uuid)) {
        $scope.uuid = uuid.getUUID();
      }
      if (!angular.isDefined($scope.showed)) {
        $scope.showed = true;
      }
      $scope.$watch('showed', function (newVal, oldVal) {
        if (!!newVal & newVal != 'false') {
          appTabsController.addScope($scope);
        } else {
          appTabsController.removeScope($scope);
        }
      });
    }
  };
}]);
//子标签,懒加载，可以缓存上一次数据
APP.directive('appPanelLazy', ['$timeout', 'uuid', function ($timeout, uuid) {
  return {
    restrict: 'EA',
    scope: {
      tittle: '@',
      callback: '&appClick',
      showed: "@"
    },
    replace: false,
    transclude: true,
    require: '^appTabs', //继承外层指令
    templateUrl: 'script/common/directive/tabs/panelLazy.html?t=' + uuid.getUUID(),
    link: function link($scope, elemenet, attrs, appTabsController) {

      if (!angular.isDefined($scope.uuid)) {
        $scope.uuid = uuid.getUUID();
      }
      if (!angular.isDefined($scope.showed)) {
        $scope.showed = true;
      }
      $scope.$watch('showed', function (newVal, oldVal) {
        if (!!newVal && newVal != 'false') {
          appTabsController.addScope($scope);
        } else {
          appTabsController.removeScope($scope);
        }
      });
    }
  };
}]);
'use strict';

/**
 * 纵向分类卡
 * 属性:
    height:设置height和line-height，也可以通过下面的style属性设置，默认28px
    style:设置样式
 * <app-vertical-card style="text-align:left; color:gray">你好</app-vertical-card>
 *
 * @type {String}
 */
APP.directive('appVerticalCard', ['$timeout', 'uuid', function ($timeout, uuid) {
  return {
    templateUrl: 'script/common/directive/verticalCard/verticalCard.html?t=' + uuid.getUUID(),
    scope: {
      height: "@", //高度，会同时设置height和line-height
      style: '@', //样式
      clazz: '@class'
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

APP.controller('selectOrgsCtrl', ['$rootScope', '$scope', '$compile', '$timeout', '$loading', '$log', '$appHttp', 'localStorageService', 'userInfo', '$state', function ($rootScope, $scope, $compile, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, $state) {

  $scope.initTemplateList = function () {
    $scope.message = "正在请求我的模板列表";
    var error = false;
    $appHttp.getData({
      url: '/CommonPlatform/customBaseInfo!getEnterpriseListByUserID.action',
      params: {
        userID: localStorageService.get(userInfo.userID)
      },
      before: function before() {
        $loading.start('orgList');
      }
    }).then(function (data) {
      var result = data.data;
      $scope.organizations = result;
    }).catch(function (err) {
      error = true;
      $scope.message = "加载失败";
      $log.error(err);
    }).finally(function () {
      if (!!error) {
        //错误信息停留2S后消失
        $timeout(function () {
          $loading.finish('orgList');
        }, 2000);
      } else {
        $loading.finish('orgList');
      }
    });
  };
}]);
'use strict';

APP.controller('mainCtrl', ['$scope', '$timeout', '$appHttp', 'cache', '$log', '$loading', function ($scope, $timeout, $appHttp, cache, $log, $loading) {

	function filterData(data) {
		var arr = [];
		for (var e in data) {
			if (e != 'swift_number' && e != "code" && e != 'flag_specialList_c') {
				arr.push(e);
			}
		}
		console.log(arr);
	}
	$scope.req4 = function () {
		$appHttp.getDataByGet({
			url: '/data/aa.json'
		}).then(function (resp) {
			var data = resp.data;
			var arr = [];
			for (var e in data) {
				if (e != 'swift_number' && e != "code" && e != 'flag_specialList_c') {
					arr.push(e);
				}
			}
			console.log(arr);
		});
	};

	$scope.req3 = function () {
		$appHttp.getDataByGet({
			url: '/data/def.json'
		}).then(function (resp) {
			console.log(resp);
			var data = resp.data;
			var formObj = {}; //表单数据
			var formReg = /^td_id_[a-zA-Z|\-|_]+/;
			var arrReg;
			var arr = []; //列表数据
			for (var e in data) {
				if (!!formReg.test(e)) {
					formObj[e] = data[e];
				}
			}
			if (!!formObj["td_id_total_allnum"]) {
				var num = parseInt(formObj["td_id_total_allnum"]);
				for (var i = 0; i < num; i++) {
					if (i < 10) {
						arrReg = new RegExp("^td_id_0" + (i + 1) + "_*");
					} else {
						arrReg = new RegExp("^td_id_" + (i + 1) + "_*");
					}
					var obj = {};
					for (var e in data) {
						if (arrReg.test(e)) {
							obj[e] = data[e];
						}
					}
					arr.push(obj);
				}
				console.log(arr);
			}
		});
	};
	$scope.req2 = function () {
		$appHttp.getDataByGet({
			url: 'http://120.24.175.12:8189/dataplatform/brdata/getdata?intCode=Execution&intUserproperty={%22id%22:%2244080419711006165X%22,%22cell%22:%2213922446678%22,%22name%22:%22%E9%99%88%E8%BF%85%22}&droseakey=8fa4d9fac0844625b155d088899ad07b'
		}).then(function (resp) {
			if (resp.data.result == '200') {
				var jsonObj = JSON.parse(resp.data.data);
				var executeObj = {};
				var badObj = {};
				var executeReg = /^ex_execut1_*/gi;
				var badReg = /^ex_bad1_*/gi;
				for (var e in jsonObj) {
					if (executeReg.test(e)) {
						executeObj[e] = jsonObj[e];
					}
					if (badReg.test(e)) {
						badObj[e] = jsonObj[e];
					}
				}
				console.log(executeObj);
				console.log(badObj);
			}
		}).catch(function (error) {
			console.log(error);
		});
	};

	$scope.req = function () {
		$appHttp.getDataByGet({
			params: {},
			url: '/data/abc.json'
		}).then(function (resp) {
			if (resp.data.result == "200") {
				var arr = [];
				var jsonObj = JSON.parse(resp.data.data);
				if (!!jsonObj["product"] && !!jsonObj["product"]["priskChecks"] && !!jsonObj["product"]["priskChecks"].length > 0) {
					var priskChecks = jsonObj["product"]["priskChecks"];
					for (var i = 0; i < priskChecks.length; i++) {
						if (!!priskChecks[i]["caseDetail"]) {
							if (Array.isArray(priskChecks[i]["caseDetail"])) {
								for (var j = 0; j < priskChecks[i]["caseDetail"].length; j++) {
									var element = priskChecks[i]["caseDetail"][j];
									arr.push({
										caseSource: element["caseSource"]["#text"],
										caseTime: element["caseTime"]["#text"],
										caseType: element["caseType"]["#text"]
									});
								}
							} else {
								arr.push({
									caseSource: priskChecks[0]["caseDetail"]["caseSource"]["#text"],
									caseTime: priskChecks[0]["caseDetail"]["caseTime"]["#text"],
									caseType: priskChecks[0]["caseDetail"]["caseType"]["#text"]
								});
							}
						}
					}
				}
				console.log(arr);
			}
		}).catch(function (error) {
			console.log(error);
		});
	};

	$loading.start("loadname");
	$timeout(function () {
		$loading.finish('loadname');
	}, 2000);
	$scope.html = '<div app-color default-color="blue" negative-color=\'red\' target=\'{{person.age}}\'>{{person.name}}</div>';
	$scope.person = {
		name: "张三",
		age: -1
	};
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
		$appHttp.getDataByGet('data/data.json').then(function (data) {
			cache.put('a', 'aa');

			$timeout(function () {
				$scope.$digest();
				$scope.$apply(function () {
					$scope.data += data;
				});
			}, 0);
			return $appHttp.getDataByGet('data/test.json');
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
 * [description]
 * @param  {[type]} $scope   [description]
 * @param  {[type]} $timeout [description]
 * @param  {[type]} $appHttp [description]
 * @param  {[type]} cache    [description]
 * @param  {[type]} $log     [description]
 * @param  {[type]} appHttp  [description]
 * @return {[type]}          [description]
 */
APP.controller('organizationCtrl', ['$scope', '$timeout', '$appHttp', 'cache', '$log', '$loading', '$rootScope', 'userInfo', 'localStorageService', '$state', 'uuid', function ($scope, $timeout, $appHttp, cache, $log, $loading, $rootScope, userInfo, localStorageService, $state, uuid) {

  //请求我的组织数据
  $scope.init = function () {
    $scope.message = "正在加载中";
    $timeout(function () {
      var error = false;
      $appHttp.getData({
        url: '/CommonPlatform/customBaseInfo!getEnterpriseListByUserID.action',
        params: {
          userID: localStorageService.get(userInfo.userID)
        },
        before: function before() {
          $loading.start('myOrganization');
        }
      }).then(function (data) {
        var result = data.data;
        $scope.organizations = result;
      }).catch(function (err) {
        error = true;
        $scope.message = "加载失败";
        $log.error(err);
      }).finally(function () {
        if (!!error) {
          //错误信息停留2S后消失
          $timeout(function () {
            $loading.finish('myOrganization');
          }, 2000);
        } else {
          $loading.finish('myOrganization');
        }
      });
    }, 0);
  };

  /**
   * [+号按钮业务逻辑]
   * @return {[type]} [description]
   */
  $scope.clickAddBtn = function () {
    alert(12334534);
  };

  $scope.workset = function () {
    $scope.message = "abcdd";
    $log.info($scope.message);
    $appHttp.getData({
      url: 'CommonPlatform/customBaseInfo!getEnterpriseInfo.action',
      params: {
        createUserId: '102'
      },
      enableCache: true
    }).then(function (data) {
      $log.info(data);
    }).finally(function () {});
  };
}]);
'use strict';

APP.controller('myTemplateCtrl', ['$rootScope', '$scope', '$compile', '$timeout', '$loading', '$log', '$appHttp', 'localStorageService', 'userInfo', '$state', 'tree', function ($rootScope, $scope, $compile, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, $state, tree) {
  //将路由参数存储到session,方便在测试子路由的时候取数据
  if (!!$rootScope.$stateParams.entId) {
    localStorageService.set('home.myTemplateIndex.entId', $rootScope.$stateParams.entId);
  }
  // if(!!$rootScope.$stateParams.createUserId){
  //   localStorageService.set('home.myTemplateIndex.createUserId',$rootScope.$stateParams.createUserId);
  // }
  if (!!$rootScope.$stateParams.enterpriseName) {
    localStorageService.set('home.myTemplateIndex.enterpriseName', $rootScope.$stateParams.enterpriseName);
  }

  $scope.$on('addMainTemplateFinish', function (e) {
    $scope.initTemplateList();
  });

  //返回按钮
  $scope.gotoIndex = function ($event) {
    $state.go('home.myTemplateIndex');
  };
  //显示添加主模板页面
  $scope.gotoAddMainTemplate = function () {
    $state.go('home.myTemplate.addMainTemplate');
  };

  $scope.initTemplateList = function () {
    $scope.message = "正在请求我的模板列表";
    var error = false;
    $appHttp.getData({
      url: '/CommonPlatform/templateConfig!getTemplateTree.action',
      params: {
        createUserId: localStorageService.get(userInfo.userID),
        entId: localStorageService.get('home.myTemplateIndex.entId')
      },
      before: function before() {
        $loading.start('templateList');
      }
    }).then(function (data) {
      var result = data.data;
      tree.init('tree-root');
      tree.addLevel(result.rows, 'subTemps');
      $scope.menuData = result.rows;
    }).catch(function (err) {
      error = true;
      $scope.message = "加载失败";
      $log.error(err);
    }).finally(function () {
      if (!!error) {
        //错误信息停留2S后消失
        $timeout(function () {
          $loading.finish('templateList');
        }, 2000);
      } else {
        $loading.finish('templateList');
      }
    });
  };

  //------------------------------------------------
}]);
'use strict';

APP.controller('userInfoCtrl', ['$rootScope', '$scope', '$timeout', 'localStorageService', '$loading', '$appHttp', 'userInfo', '$log', function ($rootScope, $scope, $timeout, localStorageService, $loading, $appHttp, userInfo, $log) {

  $scope.close = function () {
    alert(1);
  };
  /**
   * [提交表单]
   * @return {[type]} [description]
   */
  $scope.submit = function () {
    $scope.message = "正在加载中";
    var error = false;
    $appHttp.getData({
      url: 'CommonPlatform/customUserInfo!modify.action',
      params: {
        userID: localStorageService.get(userInfo.userID),
        userName: $scope.data.userName,
        nickName: $scope.data.nickName,
        autograph: $scope.data.autograph,
        mobilePhone: $scope.data.mobilePhone,
        eMail: $scope.data.eMail,
        addressLocation: $scope.data.addressLocation,
        headImage: $scope.data.headImage,
        twoDimensionCode: $scope.data.twoDimensionCode,
        remark: $scope.data.remark,
        hisheadImage: $scope.data.hisheadImage
      },
      before: function before() {
        $loading.start('userInfo');
      }
    }).then(function (resp) {
      if (!!resp && resp.data == 'success') {
        $scope.message = "保存成功";
      } else {
        $scope.message = resp.data;
      }
    }).catch(function (err) {
      $scope.message = "保存失败";
    }).finally(function () {
      $timeout(function () {
        $loading.finish('userInfo');
      }, 2000);
    });
  };
  /**
   * [页面第一次进入初始化数据]
   * @return {[type]} [description]
   */
  $scope.init = function () {
    $timeout(function () {
      $scope.message = "正在加载中";
      var error = false;
      $appHttp.getData({
        url: 'CommonPlatform/customUserInfo!select.action',
        params: {
          userID: localStorageService.get(userInfo.userID)
        },
        before: function before() {
          $loading.start('userInfo');
        }
      }).then(function (data) {
        $scope.data = data.data;
      }).catch(function (err) {
        error = true;
        $scope.message = "加载失败";
        $log.error(err);
      }).finally(function () {
        if (!!error) {
          //错误信息停留2S后消失
          $timeout(function () {
            $loading.finish('userInfo');
          }, 2000);
        } else {
          $loading.finish('userInfo');
        }
      });
    }, 0);
  };
}]);
'use strict';

APP.controller('userSetCtrl', ['$rootScope', '$scope', '$timeout', 'localStorageService', '$loading', '$appHttp', 'userInfo', '$log', function ($rootScope, $scope, $timeout, localStorageService, $loading, $appHttp, userInfo, $log) {

  $scope.items = [];
  for (var i = 0; i < 100; i++) {
    $scope.items.push({
      name: 'jack' + i
    });
  }
  /**
   * [加载完毕获修改密码模块后获取取用户密码,创建form对象]
   * @return {[type]} [description]
   */
  $scope.passwordPanelInit = function () {
    $scope.oldPassword = localStorageService.get(userInfo.password);
    $scope.userSetForm = {};
  };
  /**
   * [修改密码]
   * @return {[type]} [description]
   */
  $scope.changePassword = function () {
    $scope.message = '正在修改密码，请稍候';
    $appHttp.getData({
      url: 'CommonPlatform/customUserConfig!changePassword.action',
      params: {
        userID: localStorageService.get(userInfo.userID),
        password: localStorageService.get(userInfo.password),
        newPassword: $scope.userSetForm.newPassword
      },
      before: function before() {
        $loading.start('userSet');
      }
    }).then(function (resp) {
      if (!!resp && resp.data == 'success') {
        $scope.message = "修改成功";
        localStorageService.set(userInfo.password, $scope.userSetForm.newPassword);
      } else {
        $scope.message = "修改失败,失败原因:" + resp.data;
      }
    }).catch(function (error) {
      $scope.message = "修改失败,错误原因:" + error;
    }).finally(function () {
      $timeout(function () {
        $loading.finish('userSet');
      }, 2000);
    });
  };

  $scope.close = function () {
    alert(1);
  };

  //表格的配置文件
  $scope.tbConfig = [{
    label: '序号',
    style: 'width:50px; border-right: 1px solid black'
  }, {
    label: '姓名',
    style: ''
    // style:'width:50px;'
  }, {
    label: '用户名',
    style: ''
    // style:'width:50px'
  }, {
    label: '职务',
    style: ''
    // style:'width:50px'
  }, {
    label: '角色',
    style: ''
    // style:''
  }, {
    label: '移动电话',
    style: ''
    // style:'width:50px'
  }, {
    label: '电子邮件',
    style: ''
    // style:'width:100px'
  }, {
    label: '账户状态',
    style: ''
    // style:'width:50px'
  }, {
    label: '备注',
    style: ''
    // style:'width:80px'
  }, {
    label: '操作',
    style: 'width:100px;border-left:1px solid black'
  }];
}]);
'use strict';

APP.controller('organizationRightCtrl', ['$rootScope', '$scope', '$appHttp', '$log', 'localStorageService', 'userInfo', '$loading', '$timeout', function ($rootScope, $scope, $appHttp, $log, localStorageService, userInfo, $loading, $timeout) {
  //{entId:data.entId,createUserId:data.createUserId,enterpriseName:data.enterpriseName}
  $.extend($scope, $rootScope.$stateParams);

  //-----------------------------S--组织管理相关代码-------------------------
  var groupsList = [];
  var usersList = [];
  //表格的配置文件
  $scope.tbConfig = [{
    label: '序号',
    style: 'width:50px; border-right: 1px solid black'
  }, {
    label: '姓名'
    // style:'width:50px;'
  }, {
    label: '用户名'
    // style:'width:50px'
  }, {
    label: '职务'
    // style:'width:50px'
  }, {
    label: '角色'
    // style:''
  }, {
    label: '移动电话'
    // style:'width:50px'
  }, {
    label: '电子邮件'
    // style:'width:100px'
  }, {
    label: '账户状态'
    // style:'width:50px'
  }, {
    label: '备注'
    // style:'width:80px'
  }, {
    label: '操作',
    style: 'width:100px;border-left:1px solid black'
  }];

  /**
   * [首次进入页面，初始化页面数据]
   * @return {[type]} [description]
   */
  $scope.init = function () {
    var error = false;
    $appHttp.getData({
      url: "/CommonPlatform/enterpriseGroupConfig!getGroupByentId.action",
      params: {
        entId: $scope.entId
      },
      before: function before() {
        $scope.message = "加载中";
        $loading.start('organizationDetail');
      }
    }).then(function (resp) {
      if ($rootScope.$stateParams.createUserId == localStorageService.get(userInfo.userID)) {
        $scope.isAdmin = true;
      } else {
        $scope.isAdmin = false;
      }
      $scope.groups = resp.data.groups; //部门
      $scope.users = resp.data.users; //人
    }).catch(function (err) {
      error = true;
      $scope.message = "获取数据失败";
      $log.error(err);
    }).finally(function () {
      if (!!error) {
        $timeout(function () {
          $loading.finish('organizationDetail');
        }, 2000);
      } else {
        $loading.finish('organizationDetail');
      }
    });
  };
  /**
   * [点击组织管理]
   * @return {[type]} [description]
   */
  $scope.clickOrgManager = function () {};
  /**
   * [查询子部门]
   * @param  {[Object]} $event [事件]
   * @param  {[String]} fid    [接口查询所需要的fid，实际上是当前部门的id]
   * @return {[type]}        [description]
   */
  $scope.clickDepartment = function ($event, fid) {
    var error = false;
    $appHttp.getData({
      url: "/CommonPlatform/enterpriseGroupConfig!getGroupAndUser.action",
      params: {
        entId: $scope.entId,
        fid: fid
      },
      before: function before() {
        //将上一次数据缓存起来
        groupsList.push($.clone($scope.groups));
        usersList.push($.clone($scope.users));
        $scope.message = "加载中";
        $loading.start('organizationDetail');
      }
    }).then(function (resp) {
      $scope.groups = resp.data.groups; //部门
      $scope.users = resp.data.users; //人
    }).catch(function (err) {
      error = true;
      $scope.message = "获取数据失败";
      groupsList.pop();
      usersList.pop();
      $log.error(err);
    }).finally(function () {
      if (!!error) {
        $timeout(function () {
          $loading.finish('organizationDetail');
        }, 2000);
      } else {
        $loading.finish('organizationDetail');
      }
    });
  };

  /**
   * [获取上一次的部门和人员信息]
   * @return {[type]} [description]
   */
  $scope.getPreviousData = function () {
    if (groupsList.length > 0) {
      $scope.groups = groupsList.pop();
    }
    if (usersList.length > 0) {
      $scope.users = usersList.pop();
    }
  };
  //-----------------------------E--组织管理相关代码-------------------------


  //-----------------------------S--工作设置相关代码-------------------------
  var worksetDetailList = [];
  $scope.tbConfig_workset = [{
    label: '序号',
    style: 'width:50px; border-right: 1px solid black'
  }, {
    label: '提醒事项'
  }, {
    label: '基准时间'
  }, {
    label: '提醒时间'
  }, {
    label: '提醒内容配置'
  }, {
    label: '发送到'
  }, {
    label: '操作',
    style: 'width:50px; border-left:1px solid black'
  }];
  /**
   * [点击工作设置tab选项卡]
   * @return {[type]} [description]
   */
  $scope.clickWorkset = function () {
    if (!$scope.clickWorksetCnt) {
      //判断是不是第一次点击，如果是第一次点击请求数据，否则不请求数据，直接切换选项卡
      var error = false;
      $appHttp.getData({
        url: "/CommonPlatform/enterprisemenuConfig!select.action",
        params: {
          entId: $scope.entId
        },
        before: function before() {
          $scope.message = "加载中";
          $loading.start('organizationDetail');
        }
      }).then(function (resp) {
        $scope.jobClassification = resp.data;
        $scope.clickWorksetCnt = 1;
        worksetDetailList.push({
          menuName: '工作分类(' + $scope.jobClassification.total + ')'
        });
        $scope.worksetDetailList = worksetDetailList;
      }).catch(function (err) {
        error = true;
        $scope.message = "获取数据失败";
        $log.error(err);
      }).finally(function () {
        if (!!error) {
          $timeout(function () {
            $loading.finish('organizationDetail');
          }, 2000);
        } else {
          $loading.finish('organizationDetail');
        }
      });
    }
  };
  /**
   * [点击工作设置中的某个工作设置]
   * @return {[type]} [description]
   */
  $scope.clickWorksetDetail = function () {
    if (!$scope.firstClickWorksetDetail) {
      //第一次点击工作分类
      $scope.worksetDetailList = $scope.jobClassification.rows;
    }
  };

  $scope.workset_previous = function () {
    $scope.worksetDetailList = worksetDetailList;
  };

  //-----------------------------E--工作设置相关代码-------------------------

  /**
   * [点击基础数据]
   * @return {[type]} [description]
   */
  $scope.clickBaseData = function () {};
}]);
'use strict';

/**
 * [ 主模板 ]
 */
APP.controller('addMainTemplateCtrl', ['$rootScope', '$scope', '$timeout', '$loading', '$log', '$appHttp', 'localStorageService', 'userInfo', 'templateMainType', '$state', function ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType, $state) {
  //模板类型
  $scope.templateMainTypes = templateMainType;
  $scope.form = {};
  $log.info($scope.entId);
  $scope.submit = function () {
    $scope.message = "正在创建主模板";
    var error = false;
    var cards = [];
    if (angular.isDefined($scope.form.card1)) {
      cards.unshift({
        createUserId: $scope.createUserId,
        templateId: '',
        typeCardName: $scope.form.card1,
        typeCardType: '1',
        viewOrder: '0'
      });
    }
    if (angular.isDefined($scope.form.card2)) {
      cards.unshift({
        createUserId: $scope.createUserId,
        templateId: '',
        typeCardName: $scope.form.card2,
        typeCardType: '1',
        viewOrder: '0'
      });
    }
    if (angular.isDefined($scope.form.card3)) {
      cards.unshift({
        createUserId: $scope.createUserId,
        templateId: '',
        typeCardName: $scope.form.card3,
        typeCardType: '1',
        viewOrder: '0'
      });
    }
    if (angular.isDefined($scope.form.card4)) {
      cards.unshift({
        createUserId: $scope.createUserId,
        templateId: '',
        typeCardName: $scope.form.card4,
        typeCardType: '1',
        viewOrder: '0'
      });
    }
    $appHttp.getData({
      params: {
        templateId: '',
        templateMainType: $scope.form.mainType,
        templateName: $scope.form.templateName,
        templateDesc: $scope.form.templateDesc,
        entId: localStorageService.get('home.myTemplateIndex.entId'),
        createUserId: localStorageService.get(userInfo.userID),
        viewOrder: '0',
        isindia: '0',
        initIsindiaTypeCard: '0',
        typeCardsJson: JSON.stringify(cards)
      },
      url: '/CommonPlatform/templateConfig!addTempAndTypeCard.action',
      before: function before() {
        $loading.start('addMainTemplate');
      }
    }).then(function (resp) {
      var data = resp.data;
      $scope.message = "添加成功";
      if (!data.result) {
        error = true;
        $scope.message = "添加失败";
      }
      $scope.$emit('addMainTemplateFinish');

      $state.go('home.myTemplate.previewMainTemplate', {
        templateId: data.data,
        templateName: $scope.form.templateName
      });
    }).catch(function (e) {
      error = true;
      $log.error(e);
    }).finally(function () {

      $timeout(function () {
        $loading.finish('addMainTemplate');
      }, 1000);
    });
  };
}]);
'use strict';

/**
 * [ 主模板预览 ]
 */
APP.controller('previewMainTemplateCtrl', ['$rootScope', '$scope', '$timeout', '$loading', '$log', '$appHttp', 'localStorageService', 'userInfo', 'templateMainType', 'buildVerticalCardConstant', function ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType, buildVerticalCardConstant) {
  $.extend($scope, $rootScope.$stateParams);
  $rootScope.currentTemplateId = $scope.templateId;
  $rootScope.currentTypeCard = {}; //记录当前选中的分类卡
  $rootScope.currentTypeCardIndex = -1;
  $rootScope.maxViewOrder = 0;
  $scope.defaultPanel = 0;

  $scope.$on('files', function (e, d) {
    $log.info(e);
    $log.info(d);
  });
  /**
   * [ 初始化分类卡 ]
   * @return {[type]} [description]
   */
  $scope.init = function () {

    $scope.message = "正在加载模板";
    var flag = true;
    $appHttp.getData({
      params: {
        templateId: $rootScope.currentTemplateId
      },
      before: function before() {
        $loading.start('previewMainTemplate');
      },
      url: '/CommonPlatform/templateConfig!showTemp.action'
    }).then(function (resp) {
      var data = resp.data;
      flag = data.result; //请求数据成功
      if (flag) {
        $timeout(function () {
          $scope.$apply(function () {
            if (!!$rootScope.preViewData) {
              for (var i = 0; i < $rootScope.preViewData.typeCards.length; i++) {
                $rootScope.preViewData.typeCards[i].showed = false;
              }
            }

            $timeout(function () {
              var preViewData = data.data;
              for (var _i = 0; _i < preViewData.typeCards.length; _i++) {
                preViewData.typeCards[_i].showed = true;
              }
              $rootScope.preViewData = preViewData;
              $rootScope.currentTypeCard = $rootScope.preViewData.typeCards[0]; //记录第一个选项卡
              $rootScope.currentTypeCardIndex = 0;
              _setMaxViewOrder();
            }, 0);
          });
        }, 0);
      }
    }).catch(function (error) {
      $log.error(error);
      $message = "加载失败";
      flag = false;
    }).finally(function () {
      if (flag) {
        $loading.finish('previewMainTemplate');
      } else {
        $timeout(function () {
          $loading.finish('previewMainTemplate');
        }, 2000);
      }
    });
  };

  /**
   * [用户点击分类卡，更新$scope.currentTypeCard,currentTypeCardIndex值，该变量存储该当前选中分类卡对象]
   * @param  {[type]} ele [ 当前分类卡对象 ]
   * @return {[type]}     [description]
   */
  $scope.selectTypeCard = function (ele, index) {
    $rootScope.currentTypeCard = ele;
    $rootScope.currentTypeCardIndex = index;
    $scope.defaultPanel = index;
    _setMaxViewOrder();
    $log.info($rootScope.currentTypeCard);
  };

  /**
   * [ 解析数据成html显示到页面 ]
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  $scope.handler = function (obj) {
    var _buildVerticalCardConstant = buildVerticalCardConstant;
    var arr = obj.cardElements;
    var html = "";
    if (!!arr) {
      for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        switch (element.cardElementType) {
          case 0:
            //纵向分类卡
            html += '\n                <app-vertical-card\n                  style="\n                    color:' + element.fontColor + ';\n                    ' + _buildVerticalCardConstant.isBold[element.isBold].style + ';\n                    ' + _buildVerticalCardConstant.descPosition[element.descPosition].style + '">\n                  ' + element.cardElementName + '\n                </app-vertical-card>';
            break;
          case 1:
            //文本
            //              html += `
            //              <app-text-content
            //                title='${element.cardElementName}'
            //                textrows="${element.textRows}"
            //                placeholder = "${element.cardElementDesc}"
            //                desc="${element.cardElementExplain}"
            //                show-desc="${element.cardElementExplainShowFlag==1?true:false}">
            //              </app-text-content>
            //            `;
            break;
          case 2:
            //数字
            var percentage = void 0;
            switch (element.percentage) {
              case 0:
                percentage = '';
                break;
              case 1:
                percentage = '%';
                break;
            };
            switch (element.thousands) {
              case 0:
                html += '\n\t\t\t\t\t            <app-input title="' + element.cardElementName + '">\n\t\t\t                  <input type="text" placeholder="' + element.cardElementDesc + '" />\n\t\t\t                  <div class="w-50 f-r">' + percentage + ' ' + element.units + '</div>\n\t\t\t                </app-input>\n\t\t\t\t\t          ';
                break;
              case 1:
                html += '\n\t\t\t\t\t            <app-input title="' + element.cardElementName + '">\n\t\t\t                  <input  class="w-40" type="text" placeholder="' + element.cardElementDesc + '" ng-model="Number" app-currency bit="' + element.decimalDigits + '"/>\t \n\t\t\t                  <div class="w-50 f-r">' + percentage + ' ' + element.units + '</div>\n\t\t\t                </app-input>\n\t\t\t\t\t          ';
                break;
            }

            break;
          case 3:
            var selectType = element.selectType;
            var multiple = selectType == 1 ? '' : 'multiple';
            html += '\n              \t\t<dropsea-select multiple=\'' + multiple + '\' select-url=' + element.selectURL + '></dropsea-select>\n              \t';
            break;
          case 4:
            //日期
            var dateType2 = void 0;
            switch (element.dateType) {
              case 1:
                dateType = 'YYYY-MM-DD HH:mm';
                break;
              case 2:
                dateType = "YYYY-MM-DD";
                break;
              case 3:
                dateType = "HH:mm";
                break;
            }
            html += '\n\t                <app-input title="' + element.cardElementName + '">\n\t                  <input type="text" placeholder="' + element.cardElementDesc + '" readonly ng-model="buildData"  moment-picker="buildData" format="' + dateType2 + '">\n\t                </app-input>\n                ';
          case 5:
            var dateType = void 0;
            switch (element.dateType) {
              case 1:
                dateType = 'YYYY-MM-DD HH:mm';
                break;
              case 2:
                dateType = "YYYY-MM-DD";
                break;
              case 3:
                dateType = "HH:mm";
                break;
            }
            html += '\n                <app-input title="' + element.beginDateName + '">\n                  <input type="text" placeholder="' + element.cardElementDesc + '" readonly ng-model="beginDate"  moment-picker="beginDate" format="' + dateType + '">\n                </app-input>\n                <app-input title="' + element.endDateName + '">\n                  <input type="text" placeholder="' + element.cardElementDesc + '" readonly ng-model="endDate"  moment-picker="endDate" format="' + dateType + '">\n                </app-input>\n              ';
            break;
          case 6:
            //								html += 
            //								`
            //									<app-file-upload title="${element.cardElementName}" placeholder="${element.cardElementDesc}" event-name="files"></app-file-upload>
            //								`;
            break;
          case 7:
            html += '\n\t\t                <app-detail name="' + element.cardElementName + '"></app-detail>             \n\t\t\t            ';
            break;
        }
      }
    }

    return html;
  };

  /**
   * [ 设置最大overOrder ]
   */
  function _setMaxViewOrder() {
    var max = 0;
    if (!!$rootScope.currentTypeCard && !!$rootScope.currentTypeCard.cardElements) {
      for (var i = 0; i < $rootScope.currentTypeCard.cardElements.length; i++) {
        var ele = $rootScope.currentTypeCard.cardElements[i];
        if (ele.viewOrder > max) {
          max = ele.viewOrder;
        }
      }
      $rootScope.maxViewOrder = max;
    }
  }

  /**
   * 判断构件属性中是否包含某个type=?的对象
   */
  $rootScope.hasCardElementAttribute = function (cardElementAttributes, type) {
    if (!!cardElementAttributes) {
      for (var i = 0; i < cardElementAttributes.length; i++) {
        var attr = cardElementAttributes[i];
        if (attr.type == type) {
          return true;
        }
      }
    }

    return false;
  };
  /**
   * [ 刷新页面 ]
   * @return {[type]} [description]
   */
  $rootScope.refreshTemplateData = function () {
    $scope.message = "正在加载模板";
    var flag = true;
    $appHttp.getData({
      params: {
        templateId: $rootScope.currentTemplateId
      },
      before: function before() {
        $loading.start('previewMainTemplate');
      },
      url: '/CommonPlatform/templateConfig!showTemp.action'
    }).then(function (resp) {
      var data = resp.data;
      flag = data.result; //请求数据成功
      if (flag) {
        $timeout(function () {

          $scope.$apply(function () {
            for (var i = 0; i < $rootScope.preViewData.typeCards.length; i++) {
              $rootScope.preViewData.typeCards[i].showed = false;
            }
            $timeout(function () {
              $rootScope.preViewData = data.data;
              for (var _i2 = 0; _i2 < $rootScope.preViewData.typeCards.length; _i2++) {
                $rootScope.preViewData.typeCards[_i2].showed = true;
              }
              $rootScope.currentTypeCard = $rootScope.preViewData.typeCards[$rootScope.currentTypeCardIndex];
              _setMaxViewOrder();
            }, 0);
          });
        }, 0);
      }
    }).catch(function (error) {
      $log.error(error);
      $message = "加载失败";
      flag = false;
    }).finally(function () {
      if (flag) {
        $loading.finish('previewMainTemplate');
      } else {
        $timeout(function () {
          $loading.finish('previewMainTemplate');
        }, 2000);
      }
    });
  };
}]);
'use strict';

APP.factory('selectInstance', function () {
    return {
        header: null,
        type: null, //值是user或者group
        data: null //用户选中的数据,数组
    };
});
'use strict';

/**
 * [ 日期区间 ]
 */
APP.controller('buildDateIntervalCtrl', ['$rootScope', '$scope', '$timeout', '$loading', '$log', '$appHttp', 'localStorageService', 'userInfo', 'templateMainType', 'buildDateIntervalConstant', 'positionConstant', function ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType, buildDateIntervalConstant, positionConstant) {
  $.extend($scope, $rootScope.$stateParams);
  $scope.form = {};
  $scope.buildDateIntervalConstant = buildDateIntervalConstant; //日期区间所需要的常量
  $scope.positionConstant = positionConstant; //列表内容

  //取消
  $scope.cancel = function () {
    $scope.closeThisDialog('取消');
  };

  //保存
  $scope.save = function () {
    var error = false;
    var attributes = [];
    for (var i = 0; i < $scope.form.cardElementAttribute.length; i++) {
      var attr = $scope.form.cardElementAttribute[i];
      attributes.push(attr.type);
    }
    $appHttp.getData({
      params: {
        typeCardId: $rootScope.currentTypeCard.typeCardId, //隶属分类卡ID
        cardElementType: '5', //元素卡类型<重要，对应下面的7种类型，并且要追加参数> 下拉菜单公共字典fid=40

        cardElementAttribute: attributes, //1必填2推送3列表显示4审批可改5通栏6主页显示7子文件夹名称8是否汇总9是否生成序号10明细是否显示表头。用逗号隔开，例如 1,2,3,
        cardElementExplain: '', //元素说明
        cardElementExplainShowFlag: '', //说明审批是否显示 0不显示1显示
        createUserId: localStorageService.get(userInfo.userID),
        viewOrder: parseInt($rootScope.maxViewOrder) + 100, //排序字段不传递默认0，跨度100，例如100,200这样
        cardElementName: '', //元素中文字段名称
        // 以下是总想分类卡特有属性

        cardElementDesc: $scope.form.cardElementDesc, //元素描述,placeholder
        position: $rootScope.hasCardElementAttribute($scope.form.cardElementAttribute, 3) ? $scope.form.position.type : '', //列表位置 01表示第一行末尾 11,12,13分别表示第二行的三个位置，可扩展21 22 23…
        beginDateName: $scope.form.beginDateName,
        endDateName: $scope.form.endDateName,
        dateType: $scope.form.dateType.type,
        isAlert: $scope.form.isAlert.type

      },
      url: '/CommonPlatform/cardElementConfig!add.action',
      before: function before() {
        $scope.message = "正在保存";
        $loading.start("buildDateInterval");
      }
    }).then(function (resp) {
      var data = resp.data;
      if (data.result) {
        $scope.message = "请求成功";
        $scope.cancel();
        $rootScope.refreshTemplateData();
      } else {
        $scope.message = "请求失败";
        error = true;
      }
    }).catch(function (err) {
      error = true;
      $scope.message = err;
      $log.error(err);
    }).finally(function () {
      if (error) {
        $timeout(function () {
          $loading.finish("buildDateInterval");
        }, 2000);
      } else {
        $timeout(function () {
          $loading.finish("buildDateInterval");
        }, 1000);
      }
    });
  };
}]);
'use strict';

APP.controller('buildDateCtrl', ['$rootScope', '$scope', '$timeout', '$loading', '$log', '$appHttp', 'localStorageService', 'userInfo', 'templateMainType', 'buildDateIntervalConstant', 'positionConstant', function ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType, buildDateIntervalConstant, positionConstant) {
	$.extend($scope, $rootScope.$stateParams);
	$scope.form = {}; //表单对象
	$scope.buildDateIntervalConstant = buildDateIntervalConstant; //所需常量
	$scope.positionConstant = positionConstant; //列表内容

	//取消
	$scope.cancel = function () {
		$scope.closeThisDialog('取消');
	};

	//保存
	$scope.save = function () {
		var error = false;
		var attributes = [];
		for (var i = 0; i < $scope.form.cardElementAttribute.length; i++) {
			var attr = $scope.form.cardElementAttribute[i];
			attributes.push(attr.type);
		}
		$appHttp.getData({
			params: {
				typeCardId: $rootScope.currentTypeCard.typeCardId, //隶属分类卡ID
				cardElementType: '4', //元素卡类型<重要，对应下面的7种类型，并且要追加参数> 下拉菜单公共字典fid=40

				cardElementAttribute: attributes, //1必填2推送3列表显示4审批可改5通栏6主页显示7子文件夹名称8是否汇总9是否生成序号10明细是否显示表头。用逗号隔开，例如 1,2,3,
				cardElementExplain: '', //元素说明
				cardElementExplainShowFlag: '', //说明审批是否显示 0不显示1显示
				createUserId: localStorageService.get(userInfo.userID),
				viewOrder: parseInt($rootScope.maxViewOrder) + 100, //排序字段不传递默认0，跨度100，例如100,200这样
				cardElementName: $scope.form.cardElementName, //元素中文字段名称
				// 以下是总想分类卡特有属性

				cardElementDesc: $scope.form.cardElementDesc, //元素描述,placeholder
				position: $rootScope.hasCardElementAttribute($scope.form.cardElementAttribute, 3) ? $scope.form.position.type : '', //列表位置 01表示第一行末尾 11,12,13分别表示第二行的三个位置，可扩展21 22 23…
				dateType: $scope.form.dateType.type,
				isAlert: $scope.form.isAlert.type

			},
			url: '/CommonPlatform/cardElementConfig!add.action',
			before: function before() {
				$scope.message = "正在保存";
				$loading.start("buildDate");
			}
		}).then(function (resp) {
			var data = resp.data;
			if (data.result) {
				$scope.message = "请求成功";
				$scope.cancel();
				$rootScope.refreshTemplateData();
			} else {
				$scope.message = "请求失败";
				error = true;
			}
		}).catch(function (err) {
			error = true;
			$scope.message = err;
		}).finally(function () {
			if (error) {
				$timeout(function () {
					$loading.finish("buildDate");
				}, 2000);
			} else {
				$timeout(function () {
					$loading.finish("buildDate");
				}, 1000);
			}
		});
	};
}]);
'use strict';

/**
 * [ 明细构建 ]
 */
APP.controller('buildDetailCtrl', ['$rootScope', '$scope', '$timeout', '$loading', '$log', '$appHttp', 'localStorageService', 'userInfo', 'templateMainType', 'buildDetailConstant', 'positionConstant', function ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType, buildDetailConstant, positionConstant) {
  $.extend($scope, $rootScope.$stateParams);
  $scope.form = {};
  $scope.buildDetailConstant = buildDetailConstant; //明细构建所需要的常量
  $scope.positionConstant = positionConstant; //列表内容

  console.log($scope.name);

  //取消
  $scope.cancel = function () {
    $scope.closeThisDialog('取消');
  };

  //保存
  $scope.save = function () {
    var error = false;
    var attributes = [];
    for (var i = 0; i < $scope.form.cardElementAttribute.length; i++) {
      var attr = $scope.form.cardElementAttribute[i];
      attributes.push(attr.type);
    }

    $appHttp.getData({
      params: {
        typeCardId: $rootScope.currentTypeCard.typeCardId, //隶属分类卡ID
        cardElementType: '7', //元素卡类型<重要，对应下面的7种类型，并且要追加参数> 下拉菜单公共字典fid=40

        cardElementAttribute: attributes, //1必填2推送3列表显示4审批可改5通栏6主页显示7子文件夹名称8是否汇总9是否生成序号10明细是否显示表头。用逗号隔开，例如 1,2,3,
        cardElementExplain: '', //元素说明
        cardElementExplainShowFlag: '', //说明审批是否显示 0不显示1显示
        createUserId: localStorageService.get(userInfo.userID),
        viewOrder: parseInt($rootScope.maxViewOrder) + 100, //排序字段不传递默认0，跨度100，例如100,200这样
        cardElementName: $scope.form.cardElementName, //元素中文字段名称
        // 以下是总想分类卡特有属性

        cardElementDesc: $scope.form.cardElementDesc, //元素描述,placeholder
        //        position:$rootScope.hasCardElementAttribute($scope.form.cardElementAttribute,3)? $scope.form.position.type:'',//列表位置 01表示第一行末尾 11,12,13分别表示第二行的三个位置，可扩展21 22 23…
        busTypeCardElementId: '',
        isBusType: $scope.form.isBusType.type
      },
      url: '/CommonPlatform/cardElementConfig!add.action',
      before: function before() {
        $scope.message = "正在保存";
        $loading.start("buildDetail");
      }
    }).then(function (resp) {
      var data = resp.data;
      if (data.result) {
        $scope.message = "请求成功";
        $scope.cancel();
        $rootScope.refreshTemplateData();
      } else {
        $scope.message = "请求失败";
        error = true;
      }
    }).catch(function (err) {
      error = true;
      $scope.message = err;
      $log.error(err);
    }).finally(function () {
      if (error) {
        $timeout(function () {
          $loading.finish("buildDetail");
        }, 2000);
      } else {
        $timeout(function () {
          $loading.finish("buildDetail");
        }, 1000);
      }
    });
  };
}]);
'use strict';

/**
 * [ 主模板预览 ]
 */
APP.controller('buildSelectCtrl', ['$rootScope', '$scope', '$timeout', '$loading', '$log', '$appHttp', 'localStorageService', 'userInfo', 'templateMainType', 'buildSelectConstant', 'positionConstant', 'ngDialog', 'selectInstance', function ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType, buildSelectConstant, positionConstant, ngDialog, selectInstance) {
  $.extend($scope, $rootScope.$stateParams);
  $scope.form = {};

  $scope.positionConstant = positionConstant;
  $scope.buildSelectConstant = buildSelectConstant;
  //取消
  $scope.cancel = function () {
    $scope.closeThisDialog('取消');
  };

  $scope.$watch('form.textType', function (newVal, oldVal) {
    $scope.showType1 = false;
    if (!!newVal) {
      if (newVal.type == "1") {
        $scope.showType1 = true;
        $scope.showType2 = false;

        var arr = [];
        var error = false;
        $appHttp.getData({
          params: {
            entid: localStorageService.get('home.myTemplateIndex.entId'),
            fid: 0
          },
          url: "/CommonPlatform/customBaseInfo!getEntSelectListbyFid.action",
          before: function before() {
            $scope.message = "正在获取基础数据";
            $loading.start("buildText");
          }
        }).then(function (resp) {
          $scope.message = "获取基础数据成功";
          var data = resp.data;
          if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              arr.push({
                name: data[i].dicinfo,
                type: data[i].id
              });
            }
          }
        }).catch(function (error) {
          $scope.message = "获取失败";
          $log.error(error);
          error = true;
        }).finally(function () {
          $scope.baseData = arr;
          if (error) {
            $timeout(function () {
              $loading.finish("buildText");
            }, 2000);
          } else {
            $timeout(function () {
              $loading.finish("buildText");
            }, 500);
          }
        });
      } else if (newVal.type == "2") {
        $scope.showType1 = false;
        $scope.showType2 = true;
      } else if (newVal.type == "3") {
        $scope.showType2 = false;
        $scope.showType1 = false;
      }
    }
  });

  $scope.$watch('form.baseData', function (newVal, oldVal) {
    if (!!newVal) {
      selectInstance.type = 'url';
      var entid = localStorageService.get('home.myTemplateIndex.entId');
      selectInstance.data = 'customBaseInfo!getEntSelectListbyFid.action?fid=' + newVal.type + '&entid=' + entid;
    }
  });

  /**
   * 监听用户选择的是部门还是人员
   */
  $scope.$watch('form.depUserType', function (newVal, oldVal) {
    if (!!newVal) {
      if (newVal.type == "101") {
        selectInstance.header = "选择部门";
        selectInstance.type = "group";
      } else if (newVal.type == "102") {
        selectInstance.header = "选择人员";
        selectInstance.type = "user";
      }
      ngDialog.open({
        template: 'script/platform/component/home/myTemplate/right/mainTemplate/previewMainTemplate/buildSelect/userAndGroupList/list.html',
        controller: 'depUserListCtrl',
        className: 'ngdialog-theme-plain',
        showClose: false,
        closeByDocument: false,
        closeByEscape: true,
        width: '600'
      });
    }
  });

  /**
   * 部门或人员
   */
  $scope.getDepUser = function () {
    return [{ name: '部门', type: '101' }, { name: '人员', type: '102' }];
  };

  //保存
  $scope.save = function () {
    var error = false;
    var attributes = [];
    for (var i = 0; i < $scope.form.cardElementAttribute.length; i++) {
      var attr = $scope.form.cardElementAttribute[i];
      attributes.push(attr.type);
    }

    //    {"type":"group","data":[{"id":193,"fid":0,"dicinfo":"开发部","entId":256}],"name":"部门"}

    var selectURL = {
      type: selectInstance.type,
      data: selectInstance.data,
      name: $scope.form.cardElementName
    };

    $appHttp.getData({
      url: '/CommonPlatform/cardElementConfig!add.action',
      params: {
        typeCardId: $rootScope.currentTypeCard.typeCardId, //隶属分类卡ID
        cardElementType: '3', //元素卡类型<重要，对应下面的7种类型，并且要追加参数> 下拉菜单公共字典fid=40
        cardElementName: $scope.form.cardElementName, //元素中文字段名称
        createUserId: localStorageService.get(userInfo.userID),
        viewOrder: parseInt($rootScope.maxViewOrder) + 100, //排序字段不传递默认0，跨度100，例如100,200这样


        position: $rootScope.hasCardElementAttribute($scope.form.cardElementAttribute, 3) ? $scope.form.position.type : '', //列表位置 01表示第一行末尾 11,12,13分别表示第二行的三个位置，可扩展21 22 23…
        cardElementAttribute: attributes, //1必填2推送3列表显示4审批可改5通栏6主页显示7子文件夹名称8是否汇总9是否生成序号10明细是否显示表头。用逗号隔开，例如 1,2,3,5
        cardElementDesc: !!$scope.form.cardElementDesc ? $scope.form.cardElementDesc : '', //提示
        cardElementExplainShowFlag: '', //显示审批是否可改
        cardElementExplain: '', //字段填写说明
        selectURL: JSON.stringify(selectURL),
        selectType: $scope.form.selectType.type

      },
      before: function before() {
        $scope.message = "正在保存";
        $loading.start("buildSelect");
      }
    }).then(function (resp) {
      if (resp.data.result) {
        $scope.message = "保存成功";
        $scope.cancel();
        //          $rootScope.refreshTemplateData();
      } else {
        $scope.message = resp.data.data;
      }
    }).catch(function (err) {
      error = true;
      $scope.message = "加载失败";
      $log.error(err);
    }).finally(function () {
      if (!!error) {
        //错误信息停留2S后消失
        $timeout(function () {
          $loading.finish('buildSelect');
        }, 2000);
      } else {

        $timeout(function () {
          $loading.finish('buildSelect');
        }, 1000);
      }
    });
  };
}]);
'use strict';

/**
 * [ 主模板预览 ]
 */
APP.controller('buildNumberCtrl', ['$rootScope', '$scope', '$timeout', '$loading', '$log', '$appHttp', 'localStorageService', 'userInfo', 'templateMainType', 'buildNumberConstant', 'positionConstant', function ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType, buildNumberConstant, positionConstant) {
  $.extend($scope, $rootScope.$stateParams);
  $scope.form = {};
  $scope.buildNumberConstant = buildNumberConstant;
  $scope.positionConstant = positionConstant;
  //取消
  $scope.cancel = function () {
    $scope.closeThisDialog('取消');
  };

  //保存
  $scope.save = function () {
    var error = false;
    var attributes = [];
    for (var i = 0; i < $scope.form.cardElementAttribute.length; i++) {
      var attr = $scope.form.cardElementAttribute[i];
      attributes.push(attr.type);
    }

    $appHttp.getData({
      url: '/CommonPlatform/cardElementConfig!add.action',
      params: {
        typeCardId: $rootScope.currentTypeCard.typeCardId, //隶属分类卡ID
        cardElementType: '2', //元素卡类型<重要，对应下面的7种类型，并且要追加参数> 下拉菜单公共字典fid=40
        cardElementName: $scope.form.cardElementName, //元素中文字段名称
        createUserId: localStorageService.get(userInfo.userID),
        viewOrder: parseInt($rootScope.maxViewOrder) + 100, //排序字段不传递默认0，跨度100，例如100,200这样
        cardElementAttribute: attributes, //1必填2推送3列表显示4审批可改5通栏6主页显示7子文件夹名称8是否汇总9是否生成序号10明细是否显示表头。用逗号隔开，例如 1,2,3,5
        cardElementDesc: $scope.form.cardElementDesc, //提示

        // 以下是数字构件特有属性
        decimalDigits: $scope.form.decimalDigits.type, //小数位数
        thousands: $scope.form.thousands.type, //千分位
        percentage: $scope.form.percentage.type, //百分位
        position: $scope.form.position.type, //列表位置 01表示第一行末尾 11,12,13分别表示第二行的三个位置，可扩展21 22 23…           
        cardElementExplainShowFlag: $scope.form.cardElementExplainShowFlag.type, //显示审批是否可改
        cardElementExplain: $scope.form.cardElementExplain, //字段填写说明
        units: $scope.form.units
      },
      before: function before() {
        $scope.message = "正在保存";
        $loading.start("buildText");
      }
    }).then(function (resp) {
      if (resp.data.result) {
        $scope.message = "保存成功";
        $scope.cancel();
        console.log("数字请求");
        console.log(resp);
        $rootScope.refreshTemplateData();
      } else {
        $scope.message = resp.data.data;
      }
    }).catch(function (err) {
      error = true;
      $scope.message = "加载失败";
      $log.error(err);
    }).finally(function () {
      if (!!error) {
        //错误信息停留2S后消失
        $timeout(function () {
          $loading.finish('buildText');
        }, 2000);
      } else {
        $scope.message = "保存成功";
        $timeout(function () {
          $loading.finish('buildText');
        }, 1000);
      }
    });
  };
}]);
'use strict';

/**
 * [ 主模板预览 ]
 */
APP.controller('buildTextCtrl', ['$rootScope', '$scope', '$timeout', '$loading', '$log', '$appHttp', 'localStorageService', 'userInfo', 'templateMainType', 'buildTextConstant', 'positionConstant', 'cardElementAttributeConstant', function ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType, buildTextConstant, positionConstant, cardElementAttributeConstant) {
  $.extend($scope, $rootScope.$stateParams);
  $scope.form = {};
  $scope.buildTextConstant = buildTextConstant; //文本构件需要的数据
  $scope.positionConstant = positionConstant; //位置
  //取消
  $scope.cancel = function () {
    $scope.closeThisDialog('取消');
  };

  //保存
  $scope.save = function () {
    var error = false;
    var attributes = [];
    for (var i = 0; i < $scope.form.cardElementAttribute.length; i++) {
      var attr = $scope.form.cardElementAttribute[i];
      attributes.push(attr.type);
    }

    $appHttp.getData({
      url: '/CommonPlatform/cardElementConfig!add.action',
      params: {
        typeCardId: $rootScope.currentTypeCard.typeCardId, //隶属分类卡ID
        cardElementType: '1', //元素卡类型<重要，对应下面的7种类型，并且要追加参数> 下拉菜单公共字典fid=40
        cardElementName: $scope.form.cardElementName, //元素中文字段名称
        createUserId: localStorageService.get(userInfo.userID),
        viewOrder: parseInt($rootScope.maxViewOrder) + 100, //排序字段不传递默认0，跨度100，例如100,200这样

        // 以下是文本构件特有属性
        textType: $scope.form.textType.type, //特殊文字
        textRows: $scope.form.textRows.type, //文本行数
        position: $rootScope.hasCardElementAttribute($scope.form.cardElementAttribute, 3) ? $scope.form.position.type : '', //列表位置 01表示第一行末尾 11,12,13分别表示第二行的三个位置，可扩展21 22 23…
        cardElementAttribute: attributes, //1必填2推送3列表显示4审批可改5通栏6主页显示7子文件夹名称8是否汇总9是否生成序号10明细是否显示表头。用逗号隔开，例如 1,2,3,5
        cardElementDesc: $scope.form.cardElementDesc, //提示
        cardElementExplainShowFlag: $scope.form.cardElementExplainShowFlag.type, //显示审批是否可改
        cardElementExplain: $scope.form.cardElementExplain //字段填写说明
      },
      before: function before() {
        $scope.message = "正在保存";
        $loading.start("buildText");
      }
    }).then(function (resp) {
      if (resp.data.result) {
        $scope.message = "保存成功";
        $scope.cancel();
        $rootScope.refreshTemplateData();
      } else {
        $scope.message = resp.data.data;
      }
    }).catch(function (err) {
      error = true;
      $scope.message = "加载失败";
      $log.error(err);
    }).finally(function () {
      if (!!error) {
        //错误信息停留2S后消失
        $timeout(function () {
          $loading.finish('buildText');
        }, 2000);
      } else {

        $timeout(function () {
          $loading.finish('buildText');
        }, 1000);
      }
    });
  };
}]);
'use strict';

APP.controller('buildUploadCtrl', ['$rootScope', '$scope', '$timeout', '$loading', '$log', '$appHttp', 'localStorageService', 'userInfo', 'templateMainType', 'buildUploadConstant', function ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType, buildUploadConstant) {
  $scope.form = {};
  $scope.buildUploadConstant = buildUploadConstant;
  console.log($scope.buildUploadConstant);
  $scope.cancel = function () {
    $scope.closeThisDialog();
  };

  $scope.save = function () {
    var error = false;
    $appHttp.getData({
      params: {
        typeCardId: $rootScope.currentTypeCard.typeCardId, //隶属分类卡ID
        cardElementType: '6', //元素卡类型<重要，对应下面的7种类型，并且要追加参数> 下拉菜单公共字典fid=40
        cardElementName: $scope.form.cardElementName, //元素中文字段名称
        createUserId: localStorageService.get(userInfo.userID),
        viewOrder: parseInt($rootScope.maxViewOrder) + 100, //排序字段不传递默认0，跨度100，例如100,200这样
        position: '', //列表位置 01表示第一行末尾 11,12,13分别表示第二行的三个位置，可扩展21 22 23…
        cardElementAttribute: !!$scope.form.cardElementAttribute ? $scope.form.cardElementAttribute.type : '', //1必填2推送3列表显示4审批可改5通栏6主页显示7子文件夹名称8是否汇总9是否生成序号10明细是否显示表头。用逗号隔开，例如 1,2,3,5
        cardElementDesc: $scope.form.cardElementDesc, //提示
        cardElementExplainShowFlag: '', //显示审批是否可改
        cardElementExplain: '' //字段填写说明
      },
      url: '/CommonPlatform/cardElementConfig!add.action',
      before: function before() {
        $scope.message = "正在加载";
        $loading.start("buildUpload");
      }
    }).then(function (resp) {
      var data = resp.data;
      if (data.result) {
        $scope.message = "加载成功";
        $scope.cancel();
        $rootScope.refreshTemplateData();
      } else {
        $scope.message = "加载失败,错误原因:" + data.data;
        error = true;
      }
    }).catch(function (err) {
      error = true;
      $scope.message = "加载失败,错误原因：" + err;
    }).finally(function () {
      if (error) {
        $timeout(function () {
          $loading.finish("buildUpload");
        }, 2000);
      } else {
        $timeout(function () {
          $loading.finish("buildUpload");
        }, 1000);
      }
    });
  };
}]);
'use strict';

APP.controller('buildVerticalCardCtrl', ['$rootScope', '$scope', '$timeout', '$loading', '$log', '$appHttp', 'localStorageService', 'userInfo', 'templateMainType', 'buildVerticalCardConstant', 'colorConstant', function ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType, buildVerticalCardConstant, colorConstant) {

  $scope.form = {}; //表单对象
  $scope.buildVerticalCardConstant = buildVerticalCardConstant; //存储文字位置，文字加粗的常量
  $scope.colorConstant = colorConstant; //存储颜色的常量
  $log.info($scope.colorConstant);
  $scope.init = function () {};
  //取消
  $scope.cancel = function () {
    $scope.closeThisDialog('取消');
  };

  //保存
  $scope.save = function () {
    var error = false;
    $log.info($rootScope.maxViewOrder);

    $appHttp.getData({
      url: '/CommonPlatform/cardElementConfig!add.action',
      params: {
        typeCardId: $rootScope.currentTypeCard.typeCardId, //隶属分类卡ID
        cardElementType: '0', //元素卡类型<重要，对应下面的7种类型，并且要追加参数> 下拉菜单公共字典fid=40
        cardElementName: $scope.form.cardElementName, //元素中文字段名称
        cardElementAttribute: '', //1必填2推送3列表显示4审批可改5通栏6主页显示7子文件夹名称8是否汇总9是否生成序号10明细是否显示表头。用逗号隔开，例如 1,2,3,5
        cardElementDesc: '', //元素描述
        cardElementExplain: '', //元素说明
        cardElementExplainShowFlag: '', //说明审批是否显示 0不显示1显示
        createUserId: localStorageService.get(userInfo.userID),
        viewOrder: parseInt($rootScope.maxViewOrder) + 100, //排序字段不传递默认0，跨度100，例如100,200这样
        position: '', //列表位置 01表示第一行末尾 11,12,13分别表示第二行的三个位置，可扩展21 22 23…

        // 以下是总想分类卡特有属性
        descPosition: $scope.form.descPosition.type, //文字位置
        isBold: $scope.form.isBold.type, //是否加粗
        fontColor: $scope.form.fontColor.type, //文字颜色
        isPortrait: '1' //是否纵向 1纵0横
      },
      before: function before() {
        $scope.message = "正在保存";
        $loading.start("buildVerticalCard");
      }
    }).then(function (resp) {
      if (resp.data.result) {
        $scope.message = "保存成功";
        $scope.cancel();
        $rootScope.refreshTemplateData();
      } else {
        $scope.message = resp.data.data;
      }
    }).catch(function (err) {
      error = true;
      $scope.message = "加载失败";
      $log.error(err);
    }).finally(function () {
      if (!!error) {
        //错误信息停留2S后消失
        $timeout(function () {
          $loading.finish('buildVerticalCard');
        }, 2000);
      } else {

        $timeout(function () {
          $loading.finish('buildVerticalCard');
        }, 1000);
      }
    });
  };
}]);
'use strict';

/**
 * [ 明细详情，在该页面可以查看明细中的构建，并且可以添加构建 ]
 */
APP.controller('detailInfoCtrl', ['$rootScope', '$scope', '$timeout', '$loading', '$log', '$appHttp', 'localStorageService', 'userInfo', 'templateMainType', 'buildDetailConstant', 'positionConstant', function ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType, buildDetailConstant, positionConstant) {
  $.extend($scope, $rootScope.$stateParams);
  $scope.form = {};
  $scope.buildDetailConstant = buildDetailConstant; //明细构建所需要的常量
  $scope.positionConstant = positionConstant; //列表内容

  console.log($scope.templateName);

  //取消
  $scope.cancel = function () {
    $scope.closeThisDialog('取消');
  };

  //保存
  $scope.save = function () {
    var error = false;
    var attributes = [];
    for (var i = 0; i < $scope.form.cardElementAttribute.length; i++) {
      var attr = $scope.form.cardElementAttribute[i];
      attributes.push(attr.type);
    }

    $appHttp.getData({
      params: {
        typeCardId: $rootScope.currentTypeCard.typeCardId, //隶属分类卡ID
        cardElementType: '7', //元素卡类型<重要，对应下面的7种类型，并且要追加参数> 下拉菜单公共字典fid=40

        cardElementAttribute: attributes, //1必填2推送3列表显示4审批可改5通栏6主页显示7子文件夹名称8是否汇总9是否生成序号10明细是否显示表头。用逗号隔开，例如 1,2,3,
        cardElementExplain: '', //元素说明
        cardElementExplainShowFlag: '', //说明审批是否显示 0不显示1显示
        createUserId: localStorageService.get(userInfo.userID),
        viewOrder: parseInt($rootScope.maxViewOrder) + 100, //排序字段不传递默认0，跨度100，例如100,200这样
        cardElementName: $scope.form.cardElementName, //元素中文字段名称
        // 以下是总想分类卡特有属性

        cardElementDesc: $scope.form.cardElementDesc, //元素描述,placeholder
        //        position:$rootScope.hasCardElementAttribute($scope.form.cardElementAttribute,3)? $scope.form.position.type:'',//列表位置 01表示第一行末尾 11,12,13分别表示第二行的三个位置，可扩展21 22 23…
        busTypeCardElementId: '',
        isBusType: $scope.form.isBusType.type
      },
      url: '/CommonPlatform/cardElementConfig!add.action',
      before: function before() {
        $scope.message = "正在保存";
        $loading.start("buildDetail");
      }
    }).then(function (resp) {
      var data = resp.data;
      if (data.result) {
        $scope.message = "请求成功";
        $scope.cancel();
        $rootScope.refreshTemplateData();
      } else {
        $scope.message = "请求失败";
        error = true;
      }
    }).catch(function (err) {
      error = true;
      $scope.message = err;
      $log.error(err);
    }).finally(function () {
      if (error) {
        $timeout(function () {
          $loading.finish("buildDetail");
        }, 2000);
      } else {
        $timeout(function () {
          $loading.finish("buildDetail");
        }, 1000);
      }
    });
  };
}]);
'use strict';

/**
 * [ 显示部门人员列表 ]
 */
APP.controller('depUserListCtrl', ['$rootScope', '$scope', '$timeout', '$loading', '$log', '$appHttp', 'localStorageService', 'userInfo', 'templateMainType', 'buildSelectConstant', 'positionConstant', 'ngDialog', 'selectInstance', function ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType, buildSelectConstant, positionConstant, ngDialog, selectInstance) {

  $.extend($scope, selectInstance);
  $scope.cache = [];

  /**
   * 给数组中的所有对象添加属性，值是val
   * @param {Object} targetArr
   * @param {Object} name
   * @param {Object} val
   */
  function _addCheck(targetArr) {
    for (var i = 0; i < targetArr.length; i++) {
      var item = targetArr[i];
      item.check = false;
    }
  }

  /**
   * [ 返回上一层 ]
   */
  $scope.back = function () {
    if ($scope.cache.length != 0) {
      var curObj = $scope.cache.pop();
      _addCheck(curObj.groupList);
      _addCheck(curObj.userList);

      $scope.groupList = curObj.groupList;
      $scope.userList = curObj.userList;
    }
  };

  /**
   * 获取子列表
   */
  $scope.getSubList = function (dicinfo, entId, fid, id, userCount) {
    var error = false;
    $scope.message = "正在请求数据";
    $appHttp.getData({
      params: {
        entId: localStorageService.get('home.myTemplateIndex.entId'),
        fid: id
      },
      url: '/CommonPlatform/enterpriseGroupConfig!getGroupAndUser.action',
      before: function before() {
        $loading.start("buildSelectDevUserList");
      }
    }).then(function (resp) {
      var data = resp.data;
      var bak = {};
      bak.groupList = $.clone($scope.groupList);
      bak.userList = $.clone($scope.userList);
      $scope.cache.push(bak);
      $scope.message = "获取数据成功";
      _addCheck(data.groups);

      if ($scope.type == 'user') {
        _addCheck(data.users);
      }

      $scope.groupList = data.groups;
      $scope.userList = data.users;
    }).catch(function (err) {
      console.log(err);
      error = true;
      $scope.message = err;
    }).finally(function () {
      if (error) {
        $timeout(function () {
          $loading.finish("buildSelectDevUserList");
        }, 2000);
      } else {
        $timeout(function () {
          $loading.finish("buildSelectDevUserList");
        }, 1000);
      }
    });
  };
  $scope.init = function () {
    var error = false;
    $scope.message = "正在请求数据";
    $appHttp.getData({
      params: {
        entId: localStorageService.get('home.myTemplateIndex.entId')
      },
      url: '/CommonPlatform/enterpriseGroupConfig!getGroupByentId.action',
      before: function before() {
        $loading.start("buildSelectDevUserList");
      }
    }).then(function (resp) {
      var data = resp.data;
      $scope.message = "获取数据成功";
      _addCheck(data.groups);
      if ($scope.type == 'user') {
        _addCheck(data.users);
      }
      $scope.groupList = data.groups;
      $scope.userList = data.users;
    }).catch(function (err) {
      console.log(err);
      error = true;
      $scope.message = err;
    }).finally(function () {
      if (error) {
        $timeout(function () {
          $loading.finish("buildSelectDevUserList");
        }, 2000);
      } else {
        $timeout(function () {
          $loading.finish("buildSelectDevUserList");
        }, 1000);
      }
    });
  };

  //取消
  $scope.cancel = function () {
    $scope.closeThisDialog('取消');
  };
  $scope.save = function () {
    selectInstance.data = [];
    if (selectInstance.type == 'user') {
      angular.forEach($scope.userList, function (item, index) {
        if (item.check == true) {
          selectInstance.data.push(item);
        }
      });
    } else if (selectInstance.type == 'group') {
      angular.forEach($scope.groupList, function (item, index) {
        if (item.check == true) {
          selectInstance.data.push(item);
        }
      });
    }

    $scope.closeThisDialog('取消');
  };
}]);