/**
 * [ 主模板预览 ]
 */
APP.controller('buildSelectCtrl', [
  '$rootScope',
  '$scope',
  '$timeout',
  '$loading',
  '$log',
  '$appHttp',
  'localStorageService',
  'userInfo',
  'templateMainType',
  'buildSelectConstant',
  'positionConstant',
  'ngDialog',
  'selectInstance',
  ($rootScope, $scope, $timeout, $loading, $log, $appHttp, localStorageService, userInfo, templateMainType,buildSelectConstant,positionConstant,ngDialog,selectInstance) => {
    $.extend($scope, $rootScope.$stateParams);
    $scope.form = {};
    
    $scope.positionConstant = positionConstant;
    $scope.buildSelectConstant = buildSelectConstant;
    //取消
    $scope.cancel = function(){
      $scope.closeThisDialog('取消');
    }

    
    $scope.$watch('form.textType',function(newVal, oldVal){
    	$scope.showType1 = false;
    	if(!!newVal){
    		if(newVal.type== "1"){
	    		$scope.showType1 = true;
	    		$scope.showType2 = false;
	    		
	    		let arr = [];
	    		let error = false;
		    	$appHttp.getData({
		    		params:{
		    			entid:localStorageService.get('home.myTemplateIndex.entId'),
		    			fid:0
		    		},
		    		url:"/CommonPlatform/customBaseInfo!getEntSelectListbyFid.action",
		    		before(){
		    			$scope.message = "正在获取基础数据";
		    			$loading.start("buildText");
		    		}
		    	}).then(resp=>{
		    		$scope.message = "获取基础数据成功";
		    		let data = resp.data;
		    		if(data.length>0){
		    			for(let i=0; i<data.length; i++){
		    				arr.push({
			    				name:data[i].dicinfo,
			    				type:data[i].id
			    			});
		    			}
		    			
		    		}
		    		
		    	}).catch(error=>{
		    		$scope.message = "获取失败";
		    		$log.error(error);
		    		error = true;
		    	}).finally(()=>{
		    		$scope.baseData = arr;
		    		if(error){
		    			$timeout(()=>{
		    				$loading.finish("buildText");
		    			},2000);
		    		}else{
		    			$timeout(()=>{
		    				$loading.finish("buildText");
		    			},500);
		    		}
		    	})
	    	}else if(newVal.type == "2"){
	    		$scope.showType1 = false;
	    		$scope.showType2 = true; 
	    	}else if(newVal.type == "3"){
	    		$scope.showType2 = false; 
	    		$scope.showType1 = false;
	    	}	
    	}
    });
    
    $scope.$watch('form.baseData',function(newVal, oldVal){
    	if(!!newVal){
    		selectInstance.type= 'url';
	    	var entid = localStorageService.get('home.myTemplateIndex.entId');
	    	selectInstance.data = 'customBaseInfo!getEntSelectListbyFid.action?fid=' + newVal.type + '&entid=' +entid;
    	}
    	
		
    })
    
    
    
    /**
     * 监听用户选择的是部门还是人员
     */
    $scope.$watch('form.depUserType',function(newVal,oldVal){
    	if(!!newVal){
    		if(newVal.type == "101"){
    			selectInstance.header = "选择部门";
    			selectInstance.type = "group";
    			
    		}else if(newVal.type == "102"){
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
		        width:'600'
			});
    	}
    })
    
    
    /**
     * 部门或人员
     */
    $scope.getDepUser = function(){
    	return [
    		{name:'部门',type:'101'},
    		{name:'人员',type:'102'}
    	]
    }
    
    //保存
    $scope.save = function(){
      let error = false;
      let attributes = [];
      for(let i=0; i<$scope.form.cardElementAttribute.length; i++){
        let attr = $scope.form.cardElementAttribute[i];
        attributes.push(attr.type);
      }
      
//    {"type":"group","data":[{"id":193,"fid":0,"dicinfo":"开发部","entId":256}],"name":"部门"}
      
      let selectURL = {
      	type:selectInstance.type,
      	data:selectInstance.data,
      	name:$scope.form.cardElementName
      }

      $appHttp.getData({
          url: '/CommonPlatform/cardElementConfig!add.action',
          params: {
            typeCardId:$rootScope.currentTypeCard.typeCardId,//隶属分类卡ID
            cardElementType:'3',//元素卡类型<重要，对应下面的7种类型，并且要追加参数> 下拉菜单公共字典fid=40
            cardElementName:$scope.form.cardElementName,//元素中文字段名称
            createUserId:localStorageService.get(userInfo.userID),
            viewOrder:parseInt($rootScope.maxViewOrder) + 100,//排序字段不传递默认0，跨度100，例如100,200这样
            
            
            position:$rootScope.hasCardElementAttribute($scope.form.cardElementAttribute,3)? $scope.form.position.type:'',//列表位置 01表示第一行末尾 11,12,13分别表示第二行的三个位置，可扩展21 22 23…
            cardElementAttribute:attributes,//1必填2推送3列表显示4审批可改5通栏6主页显示7子文件夹名称8是否汇总9是否生成序号10明细是否显示表头。用逗号隔开，例如 1,2,3,5
            cardElementDesc:!!$scope.form.cardElementDesc?$scope.form.cardElementDesc:'',//提示
            cardElementExplainShowFlag:'',//显示审批是否可改
            cardElementExplain:'',//字段填写说明
            selectURL:JSON.stringify(selectURL),
            selectType:$scope.form.selectType.type
            
          },
          before: function() {
            $scope.message = "正在保存";
            $loading.start("buildSelect");
          }
        })
        .then(resp => {
          if(resp.data.result){
            $scope.message = "保存成功";
            $scope.cancel();
//          $rootScope.refreshTemplateData();
          }else{
            $scope.message = resp.data.data;
          }

        }).catch(err => {
          error = true;
          $scope.message = "加载失败";
          $log.error(err);
        }).finally(() => {
          if (!!error) {
            //错误信息停留2S后消失
            $timeout(() => {
              $loading.finish('buildSelect');
            }, 2000)
          } else {

            $timeout(() => {
              $loading.finish('buildSelect');
            }, 1000)
          }
        });
    }
  }
]);
