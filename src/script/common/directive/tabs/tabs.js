
/**
 * tab切换,使用方式
 <app-tabs>
   <app-panel tittle='one'>
     abc
   </app-panel>
   <app-panel tittle='two'>
     def
   </app-panel>
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

      $scope.select = function(pane) {
        angular.forEach(panes, scope=> {
          scope.selected = false;
        });
        pane.selected = true;
      };

      this.addScope = function(scope) {
        if (panes.length === 0) {
          $scope.select(scope);
        }
        panes.push(scope);
        $scope.width = 100/panes.length + '%';
        $log.info($scope.width);
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
      tittle: '@'
    },
    replace:true,
    transclude: true,
    require: '^appTabs', //继承外层指令
    templateUrl: 'script/common/directive/tabs/panel.html?t=' + uuid.getUUID(),
    link(scope, elemenet, attrs, appTabsController) {
      appTabsController.addScope(scope);
    }
  }
}]);
//子标签,懒加载，可以缓存上一次数据
APP.directive('appPanelLazy', ['$timeout', 'uuid', ($timeout,uuid) => {
  return {
    restrict: 'EA',
    scope: {
      tittle: '@'
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
