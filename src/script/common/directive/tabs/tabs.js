
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
APP.directive('appTabs', ['$timeout', 'uuid','$log', ($timeout, uuid,$log) => {
  return {
    restrict: "EA",
    transclude: true,
    scope: {
      clazz:'@class',
      style:'@',
      defaultPanel:'@'
    },
    templateUrl: 'script/common/directive/tabs/tab.html?t=' + uuid.getUUID(),
    controller: ["$scope", function($scope) {
      var panes = $scope.scopes = [];
      //点击选项卡标题操作
      $scope.clickTtile = function(pane){
        if(angular.isFunction(pane.callback)){
          pane.callback();
        }
      }


      //切换选项卡
      $scope.select = function(pane) {
        if(!!pane){
          angular.forEach(panes, scope=> {
            scope.selected = false;
          });

          pane.selected = true;
        }
      };

      this.removeScope = function(scope){
        for(let i=panes.length-1; i>=0; i--){
          panes[i].selected = false;
          if(panes[i].uuid == scope.uuid){
            panes.splice(i,1);
          }
        }
        if (panes.length != 0) {
          $scope.select(panes[0]);
        }
      }


      //添加选项卡，供子标签app-panel 或者app-panel-lazy 使用
      this.addScope = function(scope) {
        let has = false;
        for(let i=0; i<panes.length; i++){
          if(panes[i].uuid == scope.uuid){
            has = true;
          }
        }

        if(!has){
          if(!!$scope.defaultPanel && panes.length == $scope.defaultPanel){
            $scope.select(scope);
          }else if (panes.length === 0) {
            $scope.select(scope);
          }
          panes.push(scope);
          $scope.width = 100/panes.length + '%';
        }


      }
    }],
    link($scope, $element, $attrs, ngModelCtrl) {
    }
  }
}]);
//子标签,不进行懒加载
APP.directive('appPanel', ['$timeout', 'uuid', '$compile',($timeout,uuid,$compile) => {
  return {
    restrict: 'EA',
    scope: {
      tittle: '@',
      callback : '&appClick',
      showed:'@',
    },
    replace:false,
    transclude: true,
    require: '^appTabs', //继承外层指令
    templateUrl: 'script/common/directive/tabs/panel.html?t=' + uuid.getUUID(),
    link($scope, elemenet, attrs, appTabsController) {

      // $scope.$watch(function(scope){
      //   return scope.$eval(attrs.compile);
      // },function(v){
      //   console.log(1111111111);
      //   elemenet.html(v);
      //   $compile(elemenet.contents())($scope);
      // });
      if(!angular.isDefined($scope.uuid)){
        $scope.uuid = uuid.getUUID();
      }
      if(!angular.isDefined($scope.showed)){
        $scope.showed = true;
      }
      $scope.$watch('showed',(newVal,oldVal)=>{
        if(!!newVal & newVal != 'false'){
          appTabsController.addScope($scope);
        }else{
          appTabsController.removeScope($scope);
        }
      });
    }
  }
}]);
//子标签,懒加载，可以缓存上一次数据
APP.directive('appPanelLazy', ['$timeout', 'uuid', ($timeout,uuid) => {
  return {
    restrict: 'EA',
    scope: {
      tittle: '@',
      callback : '&appClick',
      showed:"@"
    },
    replace:false,
    transclude: true,
    require: '^appTabs', //继承外层指令
    templateUrl: 'script/common/directive/tabs/panelLazy.html?t=' + uuid.getUUID(),
    link($scope, elemenet, attrs, appTabsController) {

      if(!angular.isDefined($scope.uuid)){
        $scope.uuid = uuid.getUUID();
      }
      if(!angular.isDefined($scope.showed)){
        $scope.showed = true;
      }
      $scope.$watch('showed',(newVal,oldVal)=>{
        if(!!newVal && newVal!='false'){
          appTabsController.addScope($scope);
        }else{
          appTabsController.removeScope($scope);
        }
      });
    }
  }
}]);
