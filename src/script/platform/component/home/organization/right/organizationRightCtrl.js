APP.controller('organizationRightCtrl', ['$rootScope', '$scope', '$appHttp', '$log', 'localStorageService', 'userInfo', '$loading', '$timeout', ($rootScope, $scope, $appHttp, $log, localStorageService, userInfo, $loading, $timeout) => {
  //{entId:data.entId,createUserId:data.createUserId,enterpriseName:data.enterpriseName}
  $.extend($scope, $rootScope.$stateParams);

  //-----------------------------S--组织管理相关代码-------------------------
  const groupsList = [];
  const usersList = [];
  //表格的配置文件
  $scope.tbConfig = [{
    label: '序号',
    style: 'width:50px; border-right: 1px solid black'
  }, {
    label: '姓名',
    // style:'width:50px;'
  }, {
    label: '用户名',
    // style:'width:50px'
  }, {
    label: '职务',
    // style:'width:50px'
  }, {
    label: '角色',
    // style:''
  }, {
    label: '移动电话',
    // style:'width:50px'
  }, {
    label: '电子邮件',
    // style:'width:100px'
  }, {
    label: '账户状态',
    // style:'width:50px'
  }, {
    label: '备注',
    // style:'width:80px'
  }, {
    label: '操作',
    style: 'width:100px;border-left:1px solid black'
  }];

  /**
   * [首次进入页面，初始化页面数据]
   * @return {[type]} [description]
   */
  $scope.init = function() {
    let error = false;
    $appHttp.getData({
      url: "/CommonPlatform/enterpriseGroupConfig!getGroupByentId.action",
      params: {
        entId: $scope.entId
      },
      before() {
        $scope.message = "加载中";
        $loading.start('organizationDetail');
      }
    }).then(resp => {
      if ($rootScope.$stateParams.createUserId == localStorageService.get(userInfo.userID)) {
        $scope.isAdmin = true;
      } else {
        $scope.isAdmin = false;
      }
      $scope.groups = resp.data.groups; //部门
      $scope.users = resp.data.users; //人
    }).catch(err => {
      error = true;
      $scope.message = "获取数据失败";
      $log.error(err);
    }).finally(() => {
      if (!!error) {
        $timeout(() => {
          $loading.finish('organizationDetail');
        }, 2000);
      } else {
        $loading.finish('organizationDetail');
      }
    });
  }
  /**
   * [点击组织管理]
   * @return {[type]} [description]
   */
  $scope.clickOrgManager = function() {

  }
  /**
   * [查询子部门]
   * @param  {[Object]} $event [事件]
   * @param  {[String]} fid    [接口查询所需要的fid，实际上是当前部门的id]
   * @return {[type]}        [description]
   */
  $scope.clickDepartment = function($event, fid) {
    let error = false;
    $appHttp.getData({
      url: "/CommonPlatform/enterpriseGroupConfig!getGroupAndUser.action",
      params: {
        entId: $scope.entId,
        fid: fid
      },
      before() {
        //将上一次数据缓存起来
        groupsList.push($.clone($scope.groups));
        usersList.push($.clone($scope.users));
        $scope.message = "加载中";
        $loading.start('organizationDetail');
      }
    }).then(resp => {
      $scope.groups = resp.data.groups; //部门
      $scope.users = resp.data.users; //人
    }).catch(err => {
      error = true;
      $scope.message = "获取数据失败";
      groupsList.pop();
      usersList.pop();
      $log.error(err);
    }).finally(() => {
      if (!!error) {
        $timeout(() => {
          $loading.finish('organizationDetail');
        }, 2000);
      } else {
        $loading.finish('organizationDetail');
      }
    });
  }

  /**
   * [获取上一次的部门和人员信息]
   * @return {[type]} [description]
   */
  $scope.getPreviousData = function() {
    if (groupsList.length > 0) {
      $scope.groups = groupsList.pop();
    }
    if (usersList.length > 0) {
      $scope.users = usersList.pop();
    }
  }
  //-----------------------------E--组织管理相关代码-------------------------









  //-----------------------------S--工作设置相关代码-------------------------
  const worksetDetailList = [];
  $scope.tbConfig_workset = [{
    label: '序号',
    style: 'width:50px; border-right: 1px solid black'
  }, {
    label: '提醒事项',
  }, {
    label: '基准时间',
  }, {
    label: '提醒时间',
  }, {
    label: '提醒内容配置',
  }, {
    label: '发送到',
  }, {
    label: '操作',
    style: 'width:50px; border-left:1px solid black'
  }];
  /**
   * [点击工作设置tab选项卡]
   * @return {[type]} [description]
   */
  $scope.clickWorkset = function() {
    if (!$scope.clickWorksetCnt) { //判断是不是第一次点击，如果是第一次点击请求数据，否则不请求数据，直接切换选项卡
      let error = false;
      $appHttp.getData({
        url: "/CommonPlatform/enterprisemenuConfig!select.action",
        params: {
          entId: $scope.entId
        },
        before() {
          $scope.message = "加载中";
          $loading.start('organizationDetail');
        }
      }).then(resp => {
        $scope.jobClassification = resp.data;
        $scope.clickWorksetCnt = 1;
        worksetDetailList.push({
          menuName: '工作分类(' + $scope.jobClassification.total + ')'
        });
        $scope.worksetDetailList = worksetDetailList;
      }).catch(err => {
        error = true;
        $scope.message = "获取数据失败";
        $log.error(err);
      }).finally(() => {
        if (!!error) {
          $timeout(() => {
            $loading.finish('organizationDetail');
          }, 2000);
        } else {
          $loading.finish('organizationDetail');
        }
      });
    }
  }
  /**
   * [点击工作设置中的某个工作设置]
   * @return {[type]} [description]
   */
  $scope.clickWorksetDetail = function() {
    if (!$scope.firstClickWorksetDetail) { //第一次点击工作分类
      $scope.worksetDetailList = $scope.jobClassification.rows;
    }
  }

  $scope.workset_previous = function() {
    $scope.worksetDetailList = worksetDetailList;
  }


  //-----------------------------E--工作设置相关代码-------------------------

  /**
   * [点击基础数据]
   * @return {[type]} [description]
   */
  $scope.clickBaseData = function() {}



}]);
