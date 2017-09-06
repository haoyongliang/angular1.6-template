APP.controller('cloudCtrl',[
	'$rootScope','$scope','$appHttp','$timeout','$log','ngDialog','Upload','$location','$window','$loading','localStorageService','userInfo',function
	($rootScope,$scope,$appHttp,$timeout,$log,ngDialog,Upload,$location,$window,$loading,localStorageService,userInfo){
	$scope.isRoot = true;//是否是跟目录
	$scope.currentFolderId = '0',
	$scope.currentFolderIdContainer = [];
	$scope.currentFolderName = "我的云盘";
	$scope.fileListContainer = [];
	$scope.currentFolderNameContainer = [];
	
	//移动文件和文件夹时候涉及到的变量
	$scope.subIsRoot = true;
	$scope.subCurrentFolderId = '0';
	$scope.subCurrentFolderIdContainer = [];//存放文件夹ID历史纪录
	$scope.subCurrentFolderName = "根目录";
	$scope.subCurrentFolderNameContainer = [];//存放文件夹名历史纪录
	$scope.subFileListContainer = [];//存放文件列表历史纪录
	$scope.subFileList = [];//每次显示的文件列表
	$scope.headStyle = 2;//标题样式，2表示没有返回按钮1表示有
	
	
	//---------------------------------------------------------------------------主页面----------------------------------
	/**
	 * [ 合并数组，返回一个新的数组 ]
	 * @param {Object} files
	 * @param {Object} folders
	 */
	function mergeArr(files, folders){
		var arr = [];
		angular.forEach(folders, function(element, index, array){
			element.isFolder = true;
			arr.push(element);
		})
		
		angular.forEach(files, function(element, index, array){
			element.isFolder = false;
			var lastIndex = element.fileName.lastIndexOf('.');
			lastIndex = lastIndex > -1 ? lastIndex : element.fileName.length-1;
			element.newUrl=$location.protocol()+'://'+$location.host()+':'+$location.port() + '/CommonPlatform/'+element.fileUrl;
			//文件后缀
			element.suffix = element.fileName.substring(lastIndex+1);
			element.isPicture = false;
			element.isExcel = false;
			element.isWord = false;
			element.isVideo = false;
			element.isText = false;
			element.isZip = false;
			element.isPdf = false;
			element.isPpt = false;
			element.isDefault = false;
			
			switch(element.suffix.toLowerCase()){
				//图片
				case 'png':
				case 'bmp':
				case 'gif':
				case 'jpg':
				case 'pic':
				case 'tif':
				case 'jpeg':
					element.isPicture = true;
					break;
				//Excel
				case 'xls':
				case 'xlsx':
				case 'xlsm':
				case 'xltx':
				case 'xlsb':
				case 'xltm':
				case 'xlam':
					element.isExcel = true;
					break;
				//word
				case 'docx':
				case 'docm':
				case 'dotx':
				case 'dotm':
				case 'doc':
					element.isWord = true;
					break;
				//PPT
				case 'pptx':
				case 'pptm':
				case 'ppsx':
				case 'ppsm':
				case 'potx':
				case 'potm':
				case 'ppam':
					element.isPpt = true;
					break;
				//video
				case 'avi':
				case 'aiff':
				case 'mov':
				case 'mpeg':
				case 'mpg':
				case 'wmv':
				case 'mpeg1':
				case 'mpeg2':
				case 'mpeg4':
				case 'mp4':
				case 'rmvb':
				case 'mkv':
				case 'mp3':
				case 'swf':
					element.isVideo = true;
					break;
				//txt 普通文本
				case 'txt':
				case 'inf':
				case 'ini':
				case 'html':
				case 'htm':
				case 'js':
				case 'java':
				case 'c':
				case 'json':
				case 'data':
					element.isText = true;
					break;
				//zip 压缩文件
				case 'zip':
				case 'rar':
				case 'tar':
				case 'gzip':
				case 'iso':
				case '7-zip':
				case 'jar':
				case '7z':
					element.isZip = true;
					break;
				//pdf 
				case 'pdf':
				case 'pdt':
					element.isPdf = true;
					break;
				
				default:
					element.isDefault = true;
					break;
				
			}
			
			arr.push(element);
		})
		
		return arr;
	}
	
	/**
	 * 监控是否是根目录，根目录则不显示
	 */
	$scope.$watch('isRoot',function(newVal){
		if(!!newVal){
			$scope.headStyle = 2;
		}else{
			$scope.headStyle = 1;
		}
	})
	$scope.$watch('subIsRoot',function(newVal){
		if(!!newVal){
			$scope.subHeadStyle = 2;
		}else{
			$scope.subHeadStyle = 1;
		}
	})
	
	/**
	 * [ 首次加载页面请求根目录文件和文件夹 ]
	 */
	$scope.init = function(){
		let error = false;
		$appHttp.getData({
			params:{
				creatUserId:localStorageService.get(userInfo.userID),
				folderId : 0
			},
			url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderAndFileByFolderId.action',
			before(){
				$scope.message = "加载中";
				$loading.start('cloud');
			}
		}).then(function(resp){
			let data = resp.data;
			if(!!data && !!data.result){
				$scope.fileListContainer.push(mergeArr(data.data.Files,data.data.Folders));
				$scope.fileList = $scope.fileListContainer.pop();
				$scope.message = "加载成功";
			}else{
				$scope.message = "加载失败";
				error = true;
			}
		}).catch(function(e){
			$scope.message = e;
			error = true;
		}).finally(()=>{
			if(error){
				$timeout(function(){
					$loading.finish('cloud');
				},2000);
			}else{
				$loading.finish('cloud');
			}
		})
	}

	/**
	 * [ 点击文件时的操作 ]
	 */
	$scope.clickFile = function($event){
		$event.stopPropagation();
	}
	
	/**
	 * [ 返回 ]
	 */
	$scope.back = function(){
//		$scope.fileList = $scope.fileListContainer.pop();
		
		$scope.currentFolderName = $scope.currentFolderNameContainer.pop();
		$scope.currentFolderId = $scope.currentFolderIdContainer.pop();
		if($scope.currentFolderIdContainer.length == 0){
			$scope.isRoot = true;
		}
		
		
		let error = false;
		console.log("10");
		$appHttp.getData({
			params:{
				creatUserId:localStorageService.get(userInfo.userID),
				folderId : $scope.currentFolderId
			},
			url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderAndFileByFolderId.action',
			before(){
				$scope.message = "加载中";
				$loading.start('cloud');
			}
		}).then(function(resp){
			let data = resp.data;
			if(!!data && (!!data.result || data.result=='true')){
				$scope.fileList = mergeArr(data.data.Files,data.data.Folders);
				
			}else{
				$scope.message = "获取数据失败";
				error = true;
			}
		}).catch(function(e){
			$scope.message = e;
			error = true;
			$scope.currentFolderIdContainer.push($scope.currentFolderId);
			$scope.currentFolderNameContainer.push($scope.currentFolderName);
			$scope.isRoot = false;
		}).finally(()=>{
			if(error){
				$timeout(function(){
					$loading.finish('cloud');
				},2000);
			}else{
				$loading.finish('cloud');
			}
		})
	}
	/**
	 * [ 新建文件夹 ]
	 */
	$scope.createFloder = function(){
		$scope.form = {};
		$scope.form.newFolderName = "";
		let error = false;
		ngDialog.openConfirm({
            template:`
            	<div style="height:150px">
            		<app-page-panel has-border="false" has-header-color="false"  callback="close()" border-weight="2px"  left-btn-icon="icon ColorChangeFont  icon-float-close" header="新建文件夹" head-style="2" class="w-100 h-100" app-loading="createFolder" app-loading-options="{text: '{{createFolderMessage}}'}">
            			<form name="addFloder">
	            			<app-vertical-card></app-vertical-card>
	            			<div class="tr-height color_line_right_outside color_line_left_outside">
	            				<app-input title="文件夹名" is-bottom="true">
	            					<input type="text" placeholder="请输入文件夹名" ng-model="form.newFolderName" validator="required"/>
	            				</app-input>
	            			</div>
	            			<div style="width: 100%;bottom:0 ;height:28px;left:0;" class="p-a">
								<div style="width:calc(100% / 2); " class="cutting-line f-l app-submitBtn f-small" validation-submit="addFloder" ng-click="confirm()">保 存</div>
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
			return $appHttp.getData({
				params:{
					folderName:$scope.form.newFolderName,
					fid:$scope.currentFolderId,
					creatUserId:localStorageService.get(userInfo.userID)
				},
				url:'/CommonPlatform/cloudDisk!addCloudDiskMyFolder.action',
				before(){
					$scope.message = "加载中";
					$loading.start('cloud');
				}
			})
		})
		.then(function(resp){
				let data = resp.data;
				if(!!data && !!data.result ){
					$scope.message = "创建文件夹成功";
					console.log("9");
					return $appHttp.getData({
						params:{
							creatUserId:localStorageService.get(userInfo.userID),
							folderId : $scope.currentFolderId
						},
						url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderAndFileByFolderId.action'
					})
				}else{
					error = true;
					$scope.message = "创建文件夹失败";
				}
			}).then(function(resp){
				let data = resp.data;
				if(!!data && (!!data.result || data.result=='true')){
					$scope.fileList = mergeArr(data.data.Files,data.data.Folders);
					
				}else{
					$scope.message = "获取数据失败";
					error = true;
				}
			}).catch(function(e){
				$scope.message = e;
				error = true;
				
			}).finally(()=>{
				if(error){
					$timeout(function(){
						$loading.finish('cloud');
					},2000);
				}else{
					$loading.finish('cloud');
				}
			})



	};

	/**
	 * [ 删除文件 ]
	 * @param {String} fileId
	 * @param {String} $event
	 */
	$scope.deleteFile = function(fileId, $event,fileName){
		$event.stopPropagation();
		$event.stopPropagation();
		$scope.message = "删除中";
		let result = false;
		let error = false;
		ngDialog.openConfirm({
            template:`
            	<div style="height:150px">
            		<app-page-panel has-border="false" has-header-color="false"  callback="close()" border-weight="2px"  left-btn-icon="icon ColorChangeFont  icon-float-close" header="删除" head-style="2" class="w-100 h-100" app-loading="createFolder" app-loading-options="{text: '{{createFolderMessage}}'}">
            			<form>
            				<div class="tr-height"></div>
            				<div class="tr-height center">您确定要删除${fileName}吗?删除后不可恢复</div>
            				<div class="tr-height"></div>
	            			
	            			<div style="width: 100%;bottom:0 ;height:28px;left:0;" class="p-a">
								<div style="width:calc(100% / 2); " class="cutting-line f-l app-submitBtn f-small" ng-click="confirm()">删 除</div>
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
		}).then(function(){
			$appHttp.getData({
				params:{
					fileId:fileId
				},
				before(){
					$loading.start('cloud');
				},
				url:'/CommonPlatform/cloudDisk!delCloudDiskFile.action'
			}).then(resp=>{
				let data = resp.data;
				if(!!data && !!data.result){
					console.log("8");
					return  $appHttp.getData({
						params:{
							creatUserId:localStorageService.get(userInfo.userID),
							folderId : $scope.currentFolderId
						},
						url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderAndFileByFolderId.action'
					})
				}else{
					error = true;
					$scope.message = "删除失败"
				}
			}).then(function(resp){
				let data = resp.data;
				if(!!data && (!!data.result || data.result=='true')){
					$scope.fileList = mergeArr(data.data.Files,data.data.Folders);
					
				}else{
					$scope.message = "获取数据失败";
					error = true;
				}
			}).catch(function(e){
				$scope.message = e;
				error = true;
				
			}).finally(()=>{
				if(error){
					$timeout(function(){
						$loading.finish('cloud');
					},2000);
				}else{
					$scope.message = "删除成功";
					$loading.finish('cloud');
				}
			})
		});
	}
	
	/**
	 * [ 删除文件夹 ]
	 * @param {String} folderId 文件夹ID
	 */
	$scope.deleteFloder = function(folderId,$event,folderName){
		$event.stopPropagation();
		$scope.message = "删除中";
		let result = false;
		let error = false;
		ngDialog.openConfirm({
            template:`
            	<div style="height:150px">
            		<app-page-panel has-border="false" has-header-color="false"  callback="close()" border-weight="2px"  left-btn-icon="icon ColorChangeFont  icon-float-close" header="删除" head-style="2" class="w-100 h-100" app-loading="createFolder" app-loading-options="{text: '{{createFolderMessage}}'}">
            			<form>
            				<div class="tr-height"></div>
            				<div class="tr-height center">您确定要删除${folderName}吗?删除后不可恢复</div>
            				<div class="tr-height"></div>
	            			
	            			<div style="width: 100%;bottom:0 ;height:28px;left:0;" class="p-a">
								<div style="width:calc(100% / 2); " class="cutting-line f-l app-submitBtn f-small"  ng-click="confirm()">删 除</div>
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
		}).then(function(){
			$appHttp.getData({
				params:{
					folderId:folderId
				},
				before(){
					$loading.start('cloud');
				},
				url:'/CommonPlatform/cloudDisk!delCloudDiskMyFolder.action'
			}).then(resp=>{
				let data = resp.data;
				if(!!data && !!data.result){
					console.log("7");
					return  $appHttp.getData({
						params:{
							creatUserId:localStorageService.get(userInfo.userID),
							folderId : $scope.currentFolderId
						},
						url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderAndFileByFolderId.action'
					})
				}else{
					error = true;
					$scope.message = "删除失败"
				}
			}).then(function(resp){
				let data = resp.data;
				if(!!data && (!!data.result || data.result=='true')){
					$scope.fileList = mergeArr(data.data.Files,data.data.Folders);
					
				}else{
					$scope.message = "获取数据失败";
					error = true;
				}
			}).catch(function(e){
				$scope.message = e;
				error = true;
				
			}).finally(()=>{
				if(error){
					$timeout(function(){
						$loading.finish('cloud');
					},2000);
				}else{
					$scope.message = "删除成功";
					$loading.finish('cloud');
				}
			})
		});
		
		
	}
	
	
	/**
	 * [ 获取子文件和文件夹 ]
	 * @param {String} folderId
	 * @param {String} folderName
	 */
	$scope.getSubFileAndFolder = function(folderId,folderName){
		let error = false;
		console.log("6");
		$appHttp.getData({
			params:{
				creatUserId:localStorageService.get(userInfo.userID),
				folderId : folderId
			},
			url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderAndFileByFolderId.action',
			before(){
				$scope.message = "加载中";
				$loading.start('cloud');
			}
		}).then(function(resp){
			let data = resp.data;
			if(!!data && !!data.result){
				
				$scope.fileListContainer.push($.clone($scope.fileList));
				$scope.currentFolderNameContainer.push($.clone($scope.currentFolderName));
				$scope.currentFolderIdContainer.push($.clone($scope.currentFolderId));
				
				$scope.fileList = mergeArr(data.data.Files,data.data.Folders)
				$scope.isRoot = false;
				$scope.currentFolderName = folderName;
				$scope.currentFolderId = folderId;
				$scope.message = "加载成功";
			}else{
				$scope.message = "加载失败";
				error = true;
			}
		}).catch(function(e){
			$scope.message = e;
			error = true;
		}).finally(()=>{
			if(error){
				$timeout(function(){
					$loading.finish('cloud');
				},2000);
			}else{
				$loading.finish('cloud');
			}
		})
	}
	
	
	/**
	 * [ 上传文件 ]
	 * @param {Object} files
	 * @param {Object} errFiles
	 */
	$scope.uploadFiles = function(files, errFiles) {
        $scope.files = files;
        $scope.errorMsg = "";
        $scope.progress = 0;
        $scope.message = "上传中";
        $loading.start("cloud");
        let error = false;
        if (files && files.length>0) {
        	//上传到资源服务器
            Upload.upload({
                url: '/CommonPlatform/fileUtil!uploadFile.action',
                data: {
                    files: files
                }
            }).then(function (response) {
                $timeout(function () {
                	if(!!response.data.result){
                		$scope.result = response.data;
                		console.log("5");
                		//将资源文件关联到该文件夹
                		$appHttp.getData({
							params:{
								fileName: files[0].name,
								fileUrl:response.data.data.fileUrl,
								folderId:$scope.currentFolderId,
								fileSize:response.data.data.fileSize,
								creatUserId:localStorageService.get(userInfo.userID)
							},
							url:'/CommonPlatform/cloudDisk!addCloudDiskFile.action'
                		}).then(function(resp){
				        	if(!!resp && !!resp.data.result){
				        		return $appHttp.getData({
									params:{
										creatUserId:localStorageService.get(userInfo.userID),
										folderId : $scope.currentFolderId
									},
									url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderAndFileByFolderId.action'
								})
				        	}
				        })
				        .then(function(resp){
							let data = resp.data;
							if(!!data && (!!data.result || data.result=='true')){
								$scope.fileList = mergeArr(data.data.Files,data.data.Folders);
								
							}else{
								$scope.message = "获取数据失败";
								error = true;
							}
						}).catch(function(e){
							$scope.message = e;
							error = true;
							
						}).finally(()=>{
							if(error){
								$timeout(function(){
									$loading.finish('cloud');
								},2000);
							}else{
								$loading.finish('cloud');
							}
						})
                	}else{
                		$timeout(()=>{
							$scope.message = "上传失败,不允许上传该类型的文件";
							$scope.progress = 0;
							error = true;
			        	},0);
			        	$timeout(function(){
							$loading.finish('cloud');
						},2000);
                	}
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.message  = "上传失败,错误原因:"+response.status + ': ' + response.data;
                    error = true;
                }
            }, function (evt) {
                $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                $scope.message = "上传中,进度:"+$scope.progress+"%";
            })
            
        }else{
        	$timeout(()=>{
				$scope.message = "注意：文件大小不能超过20M";   
				error = true;
        	},0);
        	$timeout(function(){
				$loading.finish('cloud');
			},2000);
        	
        }
    }
	
	/**
	 * [ 重命名文件 ]
	 * @param {String} fileId
	 * @param {String} fileName
	 * @param {Object} $event
	 */
	$scope.renameFile = function(fileId, fileName, fileUrl,fileSize,$event){
		$event.stopPropagation();
		var dot = fileName.lastIndexOf('.');
		var suffix = fileName.substring(dot+1);
		var prefix = fileName.substring(0,dot);
		$scope.form = {};
		$scope.form.newFileName = "";
		$scope.message = "重命名中";
		let error = false;
		$loading.start("cloud");
		ngDialog.openConfirm({
            template:`
            	<div style="height:150px">
            		<app-page-panel has-border="false" has-header-color="false"  callback="close()" border-weight="2px"  left-btn-icon="icon ColorChangeFont  icon-float-close" header="重命名文件,旧文件名${fileName}" head-style="2" class="w-100 h-100" app-loading="createFolder" app-loading-options="{text: '{{createFolderMessage}}'}">
            			<form name="renameFile">
	            			<app-vertical-card></app-vertical-card>
	            			<div class="tr-height color_line_right_outside color_line_left_outside">
	            				<app-input title="文件名" is-bottom="true">
	            					<input type="text" placeholder="请输入文件名" ng-model="form.newFileName" validator="required"/>
	            				</app-input>
	            			</div>
	            			<div style="width: 100%;bottom:0 ;height:28px;left:0;" class="p-a">
								<div style="width:calc(100% / 2); " class="cutting-line f-l app-submitBtn f-small" validation-submit="renameFile" ng-click="confirm()">保 存</div>
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
		}).then(function(){//重命名
			return $appHttp.getData({
				params:{
					fileId:fileId,
					fileName:$scope.form.newFileName+"."+suffix,
					fileUrl:fileUrl,
					folderId:$scope.currentFolderId,
					fileSize,fileSize,
					creatUserId:localStorageService.get(userInfo.userID),
				},
				url:'/CommonPlatform/cloudDisk!updateCloudDiskFile.action'
			})
		}).then(resp=>{//刷新列表
			if(!!resp && !!resp.data.result){
				console.log("4");
        		return $appHttp.getData({
					params:{
						creatUserId:localStorageService.get(userInfo.userID),
						folderId : $scope.currentFolderId
					},
					url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderAndFileByFolderId.action'
				})
        	}else{
				$scope.message = "重命名失败";
				error = true;
			}
		}).then(function(resp){
			let data = resp.data;
			if(!!data && (!!data.result || data.result=='true')){
				$scope.fileList = mergeArr(data.data.Files,data.data.Folders);
				
			}else{
				$scope.message = "获取数据失败";
				error = true;
			}
		}).catch(function(e){
			$scope.message = e;
			error = true;
			$log.error(e);
		}).finally(()=>{
			if(error){
				$timeout(function(){
					$loading.finish('cloud');
				},2000);
			}else{
				$scope.message = "删除成功";
				$loading.finish('cloud');
			}
		})
	}
	
	/**
	 * [ 重命名文件夹 ]
	 * @param {String} folderId
	 * @param {String} folderName
	 * @param {Object} $event
	 */
	$scope.renameFolder = function(folderId, folderName, $event){
		$event.stopPropagation();
		$scope.form = {};
		$scope.form.newFileName = "";
		$scope.message = "重命名中";
		let error = false;
		$loading.start("cloud");
		ngDialog.openConfirm({
            template:`
            	<div style="height:150px">
            		<app-page-panel has-border="false" has-header-color="false"  callback="close()" border-weight="2px"  left-btn-icon="icon ColorChangeFont  icon-float-close" header="重命名文件,旧文件名${folderName}" head-style="2" class="w-100 h-100" app-loading="createFolder" app-loading-options="{text: '{{createFolderMessage}}'}">
            			<form name="renameFile">
	            			<app-vertical-card></app-vertical-card>
	            			<div class="tr-height color_line_right_outside color_line_left_outside">
	            				<app-input title="文件名" is-bottom="true">
	            					<input type="text" placeholder="请输入文件夹名" ng-model="form.newFileName" validator="required"/>
	            				</app-input>
	            			</div>
	            			<div style="width: 100%;bottom:0 ;height:28px;left:0;" class="p-a">
								<div style="width:calc(100% / 2); " class="cutting-line f-l app-submitBtn f-small" validation-submit="renameFile" ng-click="confirm()">保 存</div>
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
		}).then(function(){//重命名
			return $appHttp.getData({
				params:{
					folderId:folderId,
					folderName:$scope.form.newFileName,
					fid:$scope.currentFolderId,
					creatUserId:localStorageService.get(userInfo.userID),
				},
				url:'/CommonPlatform/cloudDisk!updateCloudDiskMyFolder.action'
			})
		}).then(resp=>{//刷新列表
			if(!!resp && !!resp.data.result){
				console.log("3");
        		return $appHttp.getData({
					params:{
						creatUserId:localStorageService.get(userInfo.userID),
						folderId : $scope.currentFolderId
					},
					url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderAndFileByFolderId.action'
				})
        	}else{
				$scope.message = "重命名失败";
				error = true;
			}
		}).then(function(resp){
			let data = resp.data;
			if(!!data && (!!data.result || data.result=='true')){
				$scope.fileList = mergeArr(data.data.Files,data.data.Folders);
				
			}else{
				$scope.message = "获取数据失败";
				error = true;
			}
		}).catch(function(e){
			$scope.message = e;
			error = true;
			$log.error(e);
		}).finally(()=>{
			if(error){
				$timeout(function(){
					$loading.finish('cloud');
				},2000);
			}else{
				$scope.message = "删除成功";
				$loading.finish('cloud');
			}
		})

	}
	$scope.preview = function(fileUrl, $event){
		$event.stopPropagation();
		console.log($location.host()+':'+$location.port() + '/CommonPlatform/'+fileUrl);
		console.log(fileUrl);
		console.log($location.host() + '/../../'+fileUrl);
		var dotIndex = fileUrl.lastIndexOf(".");
		var suffix = fileUrl.substring(dotIndex+1);
		console.log(suffix);
		switch(suffix){
			//Excel
			case 'xls':
			case 'xlsx':
			case 'xlsm':
			case 'xltx':
			case 'xlsb':
			case 'xltm':
			case 'xlam':
			//word
			case 'docx':
			case 'docm':
			case 'dotx':
			case 'dotm':
			case 'doc':
			//PPT
			case 'pptx':
			case 'pptm':
			case 'ppsx':
			case 'ppsm':
			case 'potx':
			case 'potm':
			case 'ppam':
			//video
			case 'avi':
			case 'aiff':
			case 'mov':
			case 'mpeg':
			case 'mpg':
			case 'wmv':
			case 'mpeg1':
			case 'mpeg2':
			case 'mpeg4':
			case 'mp4':
			case 'rmvb':
			case 'mkv':
			case 'mp3':
			case 'swf':
			//zip 压缩文件
			case 'zip':
			case 'rar':
			case 'tar':
			case 'gzip':
			case 'iso':
			case '7-zip':
			case 'jar':
			case '7z':
				ngDialog.open({
				    template: '<p>无法打开该文件</p>',
				    plain: true
				});
				break;
			default:
				$window.open($location.protocol()+'://'+$location.host()+':'+$location.port() + '/CommonPlatform/'+fileUrl,"_blank");
				break;
			
		}
		
	}
	
	//------------------------------------------------------移动文件和文件夹涉及到的方法--------------------------------
	/**
	 * [ 移动目录 ]
	 * @param {Object} folderId
	 * @param {Object} folderName
	 * @param {Object} $event
	 */
	$scope.movefolder = function(folderId, folderName,$event){
//		$event.stopPropagation();
		let error = false;
		$appHttp.getData({
			params:{
				creatUserId:localStorageService.get(userInfo.userID)
			},
			url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderRoot.action',
			before(){
				$scope.message = "加载中";
				$loading.start('cloud');
			}
		}).then(function(resp){
			let data = resp.data;
			$loading.finish('cloud');
			if(!!data && !!data.result){
				$scope.subFileList = data.data;
				return ngDialog.openConfirm({
		            template:`
		            <div style="height:300px">
	            		<app-page-panel left-btn-handler="subBack()" head-style="{{subHeadStyle}}" has-border="false" has-header-color="false" left-btn-handler="back()"  callback="close()" border-bottom="1px solid black" left-btn-icon="" header="移动到: {{subCurrentFolderName}}" head-style="{{headStyle}}" class="w-100 h-100" app-loading="previewMainTemplate" app-loading-options="{text: '{{message}}..'}">
							<div class="w-100 color_line_right_outside color_line_left_outside" style="background-color:#F9F9F9; height:calc(100% - 28px);">
								<div ng-scrollbars>
									<app-list-item  right-icon = "" name="a" class="" ng-repeat="file in subFileList" ><!---->
										<!--
											显示文件夹
										-->
										<div  title="{{file.folderName}}" ng-dblclick="getSubFolder(file.folderId,file.folderName)">
											
											<!--文件夹图标-->
											<span class="icon ColorChangeFont icon-wenjianjia" style="color:#FFD659"></span>
											<span>{{file.folderName}}</span>
											<span style="position:absolute; right:0;width:130px;">{{file.creatDate}}</span>
										</div>
									</app-list-item>
								</div>
							</div>
							<div style="width: 100%;bottom:0 ;height:28px;left:0;" class="p-a">
								<div style="width:calc(100% / 3); " class="cutting-line f-l app-submitBtn f-small" ng-click="subCreateFloder()">新建文件夹</div>
			                    <div style="width:calc(100% / 3); " class="cutting-line f-l app-submitBtn f-small" ng-click="confirm()">移 动</div>
			                    <div style="width:calc(100% / 3); " class="f-l app-submitBtn f-small" ng-click="closeThisDialog('Cancel')"">取 消</div>
							</div>
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
			}
		})
		.then(function(){//移动
			return $appHttp.getData({
				params:{
					folderId:folderId,
					folderName:folderName,
					fid:$scope.subCurrentFolderId,
					creatUserId:localStorageService.get(userInfo.userID)
				},
				url:'/CommonPlatform/cloudDisk!updateCloudDiskMyFolder.action',
				before(){
					$scope.message = "正在移动";
					$loading.start('cloud');
				}
			});
		})
		.then(function(resp){//刷新主页面数据
			if(!!resp.data && !!resp.data.result){
				$scope.subFileList = resp.data.data;
				console.log("2");
				return $appHttp.getData({
					params:{
						creatUserId:localStorageService.get(userInfo.userID),
						folderId : $scope.currentFolderId
					},
					url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderAndFileByFolderId.action',
				})
			}else{
				$scope.message = "加载失败";
				error = true;
			}
		})
		.then(function(resp){
			let data = resp.data;
			$scope.fileList = mergeArr(data.data.Files,data.data.Folders);
		})
		.catch(function(err){
			$scope.message = err;
			error = false;
			$log.info(err);
		}).finally(function(){
			if(error){
				$timeout(function(){
					$loading.finish("cloud");
				},2000);
			}else{
				$timeout(function(){
					$scope.message = "移动成功"
					$loading.finish("cloud");
				},1000);
				
			}
			
		})

	}
	
	/**
	 * [ 移动文件 ]
	 * @param {String} fileId
	 * @param {String} fileName
	 * @param {String} fileUrl
	 * @param {String} fileSize
	 * @param {Object} $event
	 */
	$scope.moveFile = function(fileId, fileName, fileUrl,fileSize,$event){
		$event.stopPropagation();
		let error = false;
		$appHttp.getData({
			params:{
				creatUserId:localStorageService.get(userInfo.userID)
			},
			url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderRoot.action',
			before(){
				$scope.message = "加载中";
				$loading.start('cloud');
			}
		}).then(function(resp){
			let data = resp.data;
			$loading.finish('cloud');
			if(!!data && !!data.result){
				$scope.subFileList = data.data;
				return ngDialog.openConfirm({
		            template:`
		            <div style="height:300px">
	            		<app-page-panel left-btn-handler="subBack()" head-style="{{subHeadStyle}}" has-border="false" has-header-color="false" left-btn-handler="back()"  callback="close()" border-bottom="1px solid black" left-btn-icon="" header="移动到: {{subCurrentFolderName}}" head-style="{{headStyle}}" class="w-100 h-100" app-loading="previewMainTemplate" app-loading-options="{text: '{{message}}..'}">
							<div class="w-100 color_line_right_outside color_line_left_outside" style="background-color:#F9F9F9; height:calc(100% - 28px);">
								<div ng-scrollbars>
									<app-list-item  right-icon = "" name="a" class="" ng-repeat="file in subFileList" ><!---->
										<!--
											显示文件夹
										-->
										<div  title="{{file.folderName}}" ng-dblclick="getSubFolder(file.folderId,file.folderName)">
											
											<!--文件夹图标-->
											<span class="icon ColorChangeFont icon-wenjianjia" style="color:#FFD659"></span>
											<span>{{file.folderName}}</span>
											<span style="position:absolute; right:0;width:130px;">{{file.creatDate}}</span>
										</div>
									</app-list-item>
								</div>
							</div>
							<div style="width: 100%;bottom:0 ;height:28px;left:0;" class="p-a">
								<div style="width:calc(100% / 3); " class="cutting-line f-l app-submitBtn f-small" ng-click="subCreateFloder()">新建文件夹</div>
			                    <div style="width:calc(100% / 3); " class="cutting-line f-l app-submitBtn f-small" ng-click="confirm()">移 动</div>
			                    <div style="width:calc(100% / 3); " class="f-l app-submitBtn f-small" ng-click="closeThisDialog('Cancel')"">取 消</div>
							</div>
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
			}
		})
		.then(function(){//移动
			return $appHttp.getData({
				params:{
					fileId:fileId,
					fileName:fileName,
					fileUrl:fileUrl,
					folderId:$scope.subCurrentFolderId,
					fileSize,fileSize,
					creatUserId:localStorageService.get(userInfo.userID)
				},
				url:'/CommonPlatform/cloudDisk!updateCloudDiskFile.action',
				before(){
					$scope.message = "正在移动";
					$loading.start('cloud');
				}
			});
		})
		.then(function(resp){//刷新主页面数据
			if(!!resp.data && !!resp.data.result){
				$scope.subFileList = resp.data.data;
				console.log("1");
				return $appHttp.getData({
					params:{
						creatUserId:localStorageService.get(userInfo.userID),
						folderId : $scope.currentFolderId
					},
					url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderAndFileByFolderId.action',
				})
			}else{
				$scope.message = "加载失败";
				error = true;
			}
		})
		.then(function(resp){
			let data = resp.data;
			$scope.fileList = mergeArr(data.data.Files,data.data.Folders);
		})
		.catch(function(err){
			$scope.message = err;
			error = false;
			$log.info(err);
		}).finally(function(){
			if(error){
				$timeout(function(){
					$loading.finish("cloud");
				},2000);
			}else{
				$scope.message = "移动成功"
				$loading.finish("cloud");
			}
			
		})
	}
	
	/**
	 * [ 获取子目录 ]
	 * @param {Object} folderId
	 * @param {Object} folderName
	 */
	$scope.getSubFolder = function(folderId, folderName){
		let error = false;
		$scope.subMessage = "加载中";
		$appHttp.getData({
			params:{
				fid:folderId,
				creatUserId:localStorageService.get(userInfo.userID)
			},
			url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderByFid.action',
			before(){
				$loading.start("subCloud");
			}
		}).then(function(resp){
			if(!!resp.data && !!resp.data.result){
				$scope.subCurrentFolderNameContainer.push($.clone($scope.subCurrentFolderName));
				$scope.subCurrentFolderIdContainer.push($.clone($scope.subCurrentFolderId));
				$scope.subFileListContainer.push($.clone($scope.subFileList));
				$scope.subIsRoot = false;
				
				$scope.subCurrentFolderName = folderName;
				$scope.subCurrentFolderId = folderId;
				$scope.subFileList = resp.data.data;
				
			}else{
				$scope.subMessage = "加载失败";
				error = true;
			}
		}).catch(function(err){
			$scope.subMessage = err;
			error = true;
			$log.error(err);
		}).finally(function(){
			if(error){
				$timeout(function(){
					$loading.finish("subCloud");
				},2000);
			}else{
				$scope.subMessage = "加载成功";
				$loading.finish("subCloud");
			}
		});
	}
	
	/**
	 * [ 返回 ]
	 */
	$scope.subBack = function(){
		$scope.subFileList = $scope.subFileListContainer.pop();
		$scope.subCurrentFolderName = $scope.subCurrentFolderNameContainer.pop();
		$scope.subCurrentFolderId = $scope.subCurrentFolderIdContainer.pop();
		if($scope.subCurrentFolderIdContainer.length == 0){
			$scope.subIsRoot = true;
		}
	}
	
	
	
	
	/**
	 * [ 新建文件夹 ]
	 */
	$scope.subCreateFloder = function(){
		$scope.form = {};
		$scope.form.newFolderName = "";
		let error = false;
		ngDialog.openConfirm({
            template:`
            	<div style="height:150px">
            		<app-page-panel has-border="false" has-header-color="false"  callback="close()" border-weight="2px"  left-btn-icon="icon ColorChangeFont  icon-float-close" header="新建文件夹" head-style="2" class="w-100 h-100" app-loading="subCreateFolder" app-loading-options="{text: '{{subCreateFolderMessage}}'}">
            			<form name="addFloder">
	            			<app-vertical-card></app-vertical-card>
	            			<div class="tr-height color_line_right_outside color_line_left_outside">
	            				<app-input title="文件夹名" is-bottom="true">
	            					<input type="text" placeholder="请输入文件夹名" ng-model="form.newFolderName" validator="required"/>
	            				</app-input>
	            			</div>
	            			<div style="width: 100%;bottom:0 ;height:28px;left:0;" class="p-a">
								<div style="width:calc(100% / 2); " class="cutting-line f-l app-submitBtn f-small" validation-submit="addFloder" ng-click="confirm()">保 存</div>
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
		.then(function(){//新建文件夹
			return $appHttp.getData({
				params:{
					folderName:$scope.form.newFolderName,
					fid:$scope.subCurrentFolderId,
					creatUserId:localStorageService.get(userInfo.userID)
				},
				url:'/CommonPlatform/cloudDisk!addCloudDiskMyFolder.action',
				before(){
					$scope.message = "加载中";
					$loading.start('cloud');
				}
			})
		}).then(function(resp){//刷新弹出层列表
			let data = resp.data;
			if(!!data && !!data.result){
				if($scope.subIsRoot){
					return $appHttp.getData({
						params:{
							creatUserId:localStorageService.get(userInfo.userID)
						},
						url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderRoot.action',
					})
				}else{
					return $appHttp.getData({
						params:{
							fid:$scope.subCurrentFolderId,
							creatUserId:localStorageService.get(userInfo.userID)
						},
						url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderByFid.action'
					})
				}
			}else{
				$scope.message = "创建文件夹失败";
				error = true;
			}
		}).then(function(resp){//刷新主页面数据
			if(!!resp.data && !!resp.data.result){
				$scope.subFileList = resp.data.data;
				return $appHttp.getData({
					params:{
						creatUserId:localStorageService.get(userInfo.userID),
						folderId : folderId
					},
					url:'/CommonPlatform/cloudDisk!getCloudDiskMyFolderAndFileByFolderId.action',
				})
			}else{
				$scope.message = "加载失败";
				error = true;
			}
		}).
		then(function(resp){
			let data = resp.data;
			$scope.fileList = mergeArr(data.data.Files,data.data.Folders);
		})
		.catch(function(err){
			$scope.subMessage = err;
			error = false;
			$log.info(err);
		}).finally(function(){
			if(error){
				$timeout(function(){
					$loading.finish("cloud");
				},2000);
			}else{
				$scope.message = "创建成功"
				$loading.finish("cloud");
			}
			
		})
	};
}])