/**
 * [ 文本构件 ]
 * textrows=1 单行文本 =2多行文本，默认1
 * placeholder = "" 输入提示，默认空串
 * validator = ""校验规则，默认空串
 * desc="" 底部描述文字
 * show-desc="true"是否显示底部描述文字，默认不显示
 * @type {String}
 */
APP.directive('dropseaTextContent', ['$timeout', 'uuid','$log', ($timeout, uuid,$log) => {
  return {
    restrict: "AE",
    transclude: true,
    reuqire:'ngModel',
    templateUrl: 'script/common/directive/textContent/textContent.html?t=' + uuid.getUUID(),
    scope: {
      title:'@',//字段名
      ngBindModel:'=ngModel',
      textrows:'@'
    },
    template:'',
    controller: ["$scope", function($scope) {

    }],
    link($scope, $element, $attrs, ngModelCtrl) {


      if(!!$attrs.placeholder){
        $scope.placeholder = $attrs.placeholder;
      }else{
        $scope.placeholder = '';
      }

      if(!!$attrs.validator){
        $scope.validator = $attrs.validator;
      }else{
        $scope.validator = 'none';
      }

      if(!!$attrs.showDesc && $attrs.showDesc == 'true'){
        $scope.showDesc = true;
      }else{
        $scope.showDesc = false;
      }

      if(!!$attrs.desc){
        $scope.desc = $attrs.desc;
      }else{
        $scope.desc = '';
      }
    }
  }
}]);
