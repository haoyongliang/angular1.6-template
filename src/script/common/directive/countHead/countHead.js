/**
 * [templateUrl description]
 * @type {String}
 */
APP.directive('appCountHead', ['$timeout', 'uuid', ($timeout, uuid) => {
  return {
    templateUrl: 'script/common/directive/countHead/countHead.html?t=' + uuid.getUUID(),
    scope: {
      height: "@"
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
