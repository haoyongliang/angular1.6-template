
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
    },
    templateUrl: 'script/common/directive/tabs/tab.html?t=' + uuid.getUUID(),
    controller: ["$scope", function($scope) {
      var panes = $scope.scopes = [];
      //点击选项卡标题操作
      $scope.clickTtile = function(pane){
        if(angular.isFunction(pane.callback)){
          console.log(123);
          pane.callback();
        }
      }
      //切换选项卡
      $scope.select = function(pane) {
        angular.forEach(panes, scope=> {
          scope.selected = false;
        });
        pane.selected = true;
        // pane.callback();

      };

      //添加选项卡，供子标签app-panel 或者app-panel-lazy 使用
      this.addScope = function(scope) {
        if (panes.length === 0) {
          $scope.select(scope);
        }
        panes.push(scope);
        $scope.width = 100/panes.length + '%';
      }
    }],
    link($scope, $element, $attrs, ngModelCtrl) {

    }
  }
}]);
//子标签,不进行懒加载
APP.directive('appPanel', ['$timeout', 'uuid', ($timeout,uuid) => {
  return {
    restrict: 'EA',
    scope: {
      tittle: '@',
      callback : '&appClick'
    },
    replace:true,
    transclude: true,
    require: '^appTabs', //继承外层指令
    templateUrl: 'script/common/directive/tabs/panel.html?t=' + uuid.getUUID(),
    link($scope, elemenet, attrs, appTabsController) {
      appTabsController.addScope($scope);
    }
  }
}]);
//子标签,懒加载，可以缓存上一次数据
APP.directive('appPanelLazy', ['$timeout', 'uuid', ($timeout,uuid) => {
  return {
    restrict: 'EA',
    scope: {
      tittle: '@',
      callback : '&appClick'
    },
    replace:true,
    transclude: true,
    require: '^appTabs', //继承外层指令
    templateUrl: 'script/common/directive/tabs/panelLazy.html?t=' + uuid.getUUID(),
    link(scope, elemenet, attrs, appTabsController) {
      appTabsController.addScope(scope);
    }
  }
}]);
