APP.controller('buildDateCtrl', [
	'$rootScope',
	'$scope',
	'$timeout',
	'$loading',
	'$log',
	'$appHttp',
	'localStorageService',
	'userInfo',
	'templateMainType',
	'buildDateIntervalConstant',
	'positionConstant',
	($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType, buildDateIntervalConstant, positionConstant) => {
		$.extend($scope, $rootScope.$stateParams)
		$scope.form = {}; //表单对象
		$scope.buildDateIntervalConstant = buildDateIntervalConstant; //所需常量
		$scope.positionConstant = positionConstant; //列表内容
		
		//取消
		$scope.cancel = function() {
			$scope.closeThisDialog('取消');
		}

		//保存
		$scope.save = function() {
			let error = false;
			let attributes = [];
			for(let i = 0; i < $scope.form.cardElementAttribute.length; i++) {
				let attr = $scope.form.cardElementAttribute[i];
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
					cardElementName: $scope.form.cardElementName,//元素中文字段名称
					// 以下是总想分类卡特有属性

					cardElementDesc:$scope.form.cardElementDesc,//元素描述,placeholder
			        position: $rootScope.hasCardElementAttribute($scope.form.cardElementAttribute,3)? $scope.form.position.type:'',//列表位置 01表示第一行末尾 11,12,13分别表示第二行的三个位置，可扩展21 22 23…
			        dateType:$scope.form.dateType.type,
			        isAlert:$scope.form.isAlert.type,

				},
				url: '/CommonPlatform/cardElementConfig!add.action',
				before() {
					$scope.message = "正在保存";
					$loading.start("buildDate");
				}
			}).then(function(resp) {
				let data = resp.data;
				if(data.result) {
					$scope.message = "请求成功";
					$scope.cancel();
					$rootScope.refreshTemplateData();
				} else {
					$scope.message = "请求失败";
					error = true;
				}
			}).catch(function(err) {
				error = true;
				$scope.message = err;
			}).finally(function() {
				if(error) {
					$timeout(function() {
						$loading.finish("buildDate");
					}, 2000);
				} else {
					$timeout(function() {
						$loading.finish("buildDate");
					}, 1000);
				}

			});
		}
	}
]);