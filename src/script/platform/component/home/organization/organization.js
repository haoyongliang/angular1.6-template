/**
 * [description]
 * @param  {[type]} $scope   [description]
 * @param  {[type]} $timeout [description]
 * @param  {[type]} $myHttp  [description]
 * @param  {[type]} cache    [description]
 * @param  {[type]} $log     [description]
 * @return {[type]}          [description]
 */
APP.controller('organizationCtrl', ['$scope', '$timeout', '$myHttp', 'cache', '$log', function($scope, $timeout, $myHttp, cache, $log) {
  $scope.callback = function(){
    alert(12334534);
  }
}])
