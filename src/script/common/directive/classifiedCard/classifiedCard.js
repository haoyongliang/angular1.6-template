
APP.directive('appClassifiedCard', ['$timeout', 'uuid', '$compile', ($timeout, uuid, $compile) => {
  return {
    templateUrl: 'script/common/directive/classifiedCard/classifiedCard.html?t=' + uuid.getUUID(),
    reuqire:'ngModel',
    scope: {
      ngBindModel:'=ngModel',
      placeholder:'@'
    },
    restrict: 'E',

    controller($scope) {

    },
    link($scope, $element, $attrs, ngModelCtrl) {

    }

  }
}]);
