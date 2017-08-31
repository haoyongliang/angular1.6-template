/**
 * 纵向分类卡
 * 属性:
    height:设置height和line-height，也可以通过下面的style属性设置，默认28px
    style:设置样式
 * <app-vertical-card style="text-align:left; color:gray">你好</app-vertical-card>
 *
 * @type {String}
 */
APP.directive('appVerticalCard', ['$timeout', 'uuid', ($timeout, uuid) => {
  return {
    templateUrl: 'script/common/directive/verticalCard/verticalCard.html?t=' + uuid.getUUID(),
    scope: {
      height: "@",//高度，会同时设置height和line-height
      style:'@',//样式
      clazz:'@class'
    },
    transclude: true,
    restrict: 'E',
    controller($scope) {

    },
    link($scope, $element, $attrs, ngModelCtrl) {
      if (!$scope.height) {
        $scope.height = '28px';
      }

    }

  }
}]);
