APP.controller("componentDemoCtrl",[
	'$scope'
	,'$loading'
	,'$timeout'
	,'ngDialog' 
	,function($scope,$loading,$timeout,ngDialog){
		$scope.html = "";
		$scope.addHtml = function(){
			$scope.html = "<div app-color default-color='red' positive-color='{{blue}}' negative-color='{{black}}' zero-color='yellow' >-3</div>";
		}
		$scope.myfunction = function(){
			return "<div app-color default-color='red' positive-color='{{blue}}' negative-color='{{black}}' zero-color='yellow' >-3</div>"
		}
		
		$scope.clickDialog = function(){
			console.log(222);
			ngDialog.openConfirm({
	            template:`
	            	<div style="height:500px">
	            		<app-page-panel has-border="false" has-header-color="false"  callback="close()" border-weight="2px"  left-btn-icon="icon ColorChangeFont  icon-float-close" header="新建文件夹" head-style="2" class="w-100 h-100" app-loading="createFolder" app-loading-options="{text: '{{createFolderMessage}}'}">
	            			<form name="addFloder">
		            			<app-vertical-card></app-vertical-card>
		            			<div class="tr-height color_line_right_outside color_line_left_outside">
		            				<app-input title="文件夹名" is-bottom="true">
		            					<input type="text" placeholder="请输入文件夹名" ng-model="form.newFolderName" validator="required"/>
		            				</app-input>
		            			</div>
		            			<div style="width: 100%;bottom:0 ;height:28px;left:0;" class="p-a">
									<div style="width:calc(100% / 2); " class="cutting-line f-l app-submitBtn f-small"  ng-click="confirm()">保 存</div>
				                    <div style="width:calc(100% / 2); " class="f-l app-submitBtn f-small" ng-click="closeThisDialog('cancel')">取 消</div>
								</div>
	            			</form>
	            		</app-page-panel>
	            	</div>
	            `,
	            plain: true,
	            scope: $scope,
	            showClose: false,
	            closeByDocument: false,
	            closeByEscape: true,
	            width:'600',
	            className: 'ngdialog-theme-plain'
			})
			.then(function(){
				console.log(11111);
			})
		}
		
		$scope.clickListItem = function(){
			alert(1);
		}
		
		$scope.clickLoading = function(){
			$loading.start("sddfaf");
			$timeout(function(){
				$loading.finish("sddfaf");
			},2000);
		}
		
		$scope.items = [
			{name:'张三',type:'1'},
			{name:'lisi',type:'2'},
			{name:'张adf三',type:'1'},
			{name:'liasdfsi',type:'2'},
			{name:'张adf三',type:'1'},
			{name:'liadfsi',type:'2'},
			{name:'张s三',type:'1'},
			{name:'lissi',type:'2'},
			{name:'张s三',type:'1'},
			{name:'lissi',type:'2'},
			{name:'张ssfs三',type:'1'},
			{name:'lisssi',type:'2'},
		]
		$scope.form = {};
		$scope.aaa = function(){
			alert($scope.form.bundle);
		}
		
		//表格的配置文件
	  $scope.tbConfig = [{
	    label: '序号',
	    style: 'width:50px; border-right: 1px solid black'
	  }, {
	    label: '姓名',
	    style:''
	    // style:'width:50px;'
	  }, {
	    label: '用户名',
	    style:''
	    // style:'width:50px'
	  }, {
	    label: '职务',
	    style:''
	    // style:'width:50px'
	  }, {
	    label: '角色',
	    style:''
	    // style:''
	  }, {
	    label: '移动电话',
	    style:''
	    // style:'width:50px'
	  }, {
	    label: '电子邮件',
	    style:''
	    // style:'width:100px'
	  }, {
	    label: '账户状态',
	    style:''
	    // style:'width:50px'
	  }, {
	    label: '备注',
	    style:''
	    // style:'width:80px'
	  }, {
	    label: '操作',
	    style: 'width:100px;border-left:1px solid black'
	  }];
	}])
