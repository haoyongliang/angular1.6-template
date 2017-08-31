/**
<app-section height='200px' visible="true">
  <header>
    <div class="w-100 h-100" style="background-color:pink">
      <i class="icon ColorChangeFont icon-you"></i>日志
    </div>
  </header>
  <section >
    <div class="w-100 h-100" style="border:1px solid black">
      我今天好开心
    </div>
  </section>
</app-section>
visible:初始化时是显示还是隐藏，true隐藏，false显示
height:'高度'


 */
APP.directive('appSection', ['$timeout', 'uuid', '$log',($timeout, uuid, $log) => {
  return {
    templateUrl: 'script/common/directive/section/section.html?t=' + uuid.getUUID(),
    scope: {
      header :'@',
      height :'@',
      visible:'@',
    },
    transclude: {
			header:"?header",
			section:"?section"
		},
    restrict: 'E',
    replace : false,
    controller($scope) {

    },
    link($scope, $element, $attrs, ngModelCtrl) {
      $scope.id = 'section' + uuid.getUUID();
      if($scope.visible=="true"){
        $scope.visible = true;
        $element.find('section').css('height','0');
      }else{
        $scope.visible = false;
        $element.find('div[name="containerkl234jnsd"]').height((parseFloat($scope.height)-28) + 'px');
      }

      $scope.showSectionHandler = function(){
        let section = $element.find('div[name="containerkl234jnsd"]');

        //加timeout是为了让动画更顺畅
        if($scope.visible=='false' || $scope.visible==false){
          $timeout(function(){
            $element.find('section').animate({
                height:0
            });
          },10);

          $timeout(function(){
            section.animate({
              height:0
            },function(){
              $scope.visible = true;
            });
          },10)


        }else{
          $timeout(function(){
            $element.find('section').animate({
                height:(parseFloat($scope.height)-28) + 'px'
            });
          },10)

          $timeout(function(){
            section.animate({
              height:(parseFloat($scope.height)-28) + 'px'
            },function(){
              $scope.visible = false;
            });
          })

        }
      }
    }
  }
}]);
