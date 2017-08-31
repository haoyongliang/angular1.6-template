/**
 * [带滚动条的表格]
 * data属性：表格配置:表头，列的单元格样式
 * height:整个表格的高度

 //表格配置
 $scope.data = [
   {
     label:'name', //表头
     style:'width:20%; border-right:1px solid black'//表头样式，列宽，左右边框，背景色等等
   },{
     label:'age',
     style:'width:20%'
   },{
     label:'gender',
     style:'width:60%; border-left:1px solid black'
   }
 ];

//使用
 <app-table height='150px' data='{{data}}'>
   <app-tr ng-repeat="rowData in tableData">
     <app-td>{{rowData.name}}</app-td>
     <app-td>{{rowData.age}}</app-td>
     <app-td>{{rowData.gender}}</app-td>
   </app-tr>
 </app-table>

 * @type {String}
 */
APP.directive('appTable', ['$timeout', 'uuid', '$log', ($timeout, uuid, $log) => {
  return {
    templateUrl: 'script/common/directive/table/table.html?t=' + uuid.getUUID(),
    scope: {
      height: '@',
      data: '@',
    },
    transclude: true,
    replace: true,
    restrict: 'E',
    controller($scope) {
      var trs = $scope.trs = [];
      //添加选项卡，供子标签app-panel 或者app-panel-lazy 使用
      this.addTr = function(tr) {
        tr.titleData = $scope.titleData;
        trs.push(tr);
      }

      // this.titleData = function() {
      //   $scope.titleData = angular.fromJson($scope.data);
      // }

    },
    link($scope, $element, $attrs, ngModelCtrl) {
      $scope.id = "table-" + uuid.getUUID();
      if (!angular.isDefined($scope.height)) {
        $scope.height = '100%';
      }
      //计算内容的高度:实际高度-表头高度
      if ($scope.height.indexOf('%') != -1) {
        $scope.contentHeight = 'calc(100% - 28px)'
      } else {
        $scope.contentHeight = parseFloat($scope.height) - 28 + 'px';
      }
      //解析表头
      if (!angular.isDefined($scope.data)) {
        $log.error('请配置表头数据');
      }
      $scope.titleData = angular.fromJson($scope.data);
    }
  }
}]);

APP.directive('appTr', ['$rootScope', 'uuid', ($rootScope, uuid) => {
  return {
    restrict: 'EA',
    scope: {
      titleData:'@'
    },
    replace: true,
    transclude: true,
    require: '^appTable',
    templateUrl: 'script/common/directive/table/tr.html?t=' + uuid.getUUID(),
    controller($scope) {
      let tds = $scope.tds = [];

      //添加选项卡，供子标签app-panel 或者app-panel-lazy 使用
      this.addTd = function(td) {
        if(!!$scope.titleData){
          if(!!$scope.titleData[tds.length].style){
            td.publicStyle = $scope.titleData[tds.length].style;
          }

          tds.push(td);
        }

      }
    },
    link($scope, $elemenet, $attrs, appTableController) {
      $scope.$watch('titleData',(newVal, oldVal)=>{
        appTableController.addTr($scope)
      });
    }
  }
}]);
APP.directive('appTd', ['$rootScope', 'uuid', ($rootScope, uuid) => {
  return {
    restrict: 'EA',
    scope: {
      style:'@privateStyle',
      titleData:'@'
    },
    replace: true,
    transclude: true,
    require: '^appTr',
    templateUrl: 'script/common/directive/table/td.html?t=' + uuid.getUUID(),
    link($scope, $elemenet, $attrs, appTrController) {
      //鼠标移动到td提示td中的内容
      $scope.$watch(function(){
        return $elemenet.html();
      },function(newVal){
        $scope.title= newVal;
      });
      $scope.$watch('titleData',(newVal, oldVal)=>{
        appTrController.addTd($scope)
      });

    }
  }
}]);
