
APP.directive('appPopSelect', ['$timeout', 'uuid','$log', ($timeout, uuid,$log) => {
  return {
    restrict: "EA",
    transclude: true,
    scope: {
      style:'@',
      target:'@',

    },
    templateUrl: 'script/common/directive/popSelect/popSelect.html?t=' + uuid.getUUID(),
    // template:''
    controller: ["$scope", function($scope) {

    }],
    link($scope, $element, $attrs, ngModelCtrl) {
      $scope.display = 'none';
      $scope.width = '100%';

      let tg = $($scope.target);
      if(!tg){
      	tg = $element;
      }
      $scope.targetText = tg.html();
      $scope.toggle = true;
      $(window.document).on('click',function(){
        $timeout(function(){
          $scope.$apply(function(){
            $scope.display = 'none';
            tg.html($scope.targetText);
            $scope.toggle = true;
          });
        });
      });

      tg.on('click',function(e){
        e.stopPropagation();
        if($scope.toggle){
          $timeout(function(){
            $scope.$apply(function(){
              $scope.display = 'block';
//            tg.html('取消');
              $scope.toggle = false;
            });
          });
        }else{

          $timeout(function(){
            $scope.$apply(function(){
              tg.html($scope.targetText);
              $scope.toggle = true;
              $scope.display = 'none';
            });
          });
        }
      });

    }
  }
}]);
