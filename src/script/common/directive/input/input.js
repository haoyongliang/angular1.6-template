
/**
 * [ 表单 ]
 * <app-input title="">
 *  <input type="text" ng-model="aaa"/>
 * </app-input>
 * @type {String}
 */
APP.directive('appInput', ['$timeout', 'uuid', '$log', ($timeout, uuid, $log) => {
  return {
    templateUrl: 'script/common/directive/input/input.html?t=' + uuid.getUUID(),
    scope: {
      clazz:'@class',
      title:'@'
    },
    transclude: true,
    restrict: 'EA',
    replace : true,
    controller($scope) {

    },
    link($scope, $element, $attrs, ngModelCtrl) {
      $scope.id = "input-" + uuid.getUUID();
      $scope.isBottom = $attrs.isBottom?true:false;
      $scope.isRight = $attrs.isRight?true:false;
    }
  }
}]);
