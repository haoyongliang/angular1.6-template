
APP.directive('dropseaFileUpload', ['$timeout', 'uuid', '$log','Upload', function($timeout, uuid, $log,Upload){
  return {
    templateUrl: 'script/common/directive/fileUpload/fileUpload.html?t=' + uuid.getUUID(),
    scope: {
      eventName:'@',
      title:'@',
      placeholder:'@'
    },
    transclude: true,
    restrict: 'EA',
    replace : false,
    controller($scope) {

    },
    link($scope, $element, $attrs, $ngModelCtrl) {
      $scope.files = [];
      $scope.resultData = [];
      $ngModelCtrl.fileResult = {};
      $scope.uploadFiles = function(file, errFiles) {

        $scope.errFile = errFiles && errFiles[0];
        if (file) {
          let obj = {
            file:file,
            errFile:$scope.errFile,
            progress:'0%',
            errorMsg:''
          }
          $scope.files.push(obj);
          file.upload = Upload.upload({
              url: '/CommonPlatform/fileUtil!uploadFile.action',
              data: {files: file}
          });

          file.upload.then(function (response) {
              $timeout(function () {
                if(response.data.result){
                  file.result = response.data;
                  $scope.resultData.push(response.data);
                  $scope.$emit($scope.eventName, response.data);
                  $ngModelCtrl.fileResult[$scope.propName] = $scope.resultData;
                }else{
                  obj.errorMsg = response.data.msg;
                }
              });
          }, function (response) {
              if (response.status > 0)
                  $obj.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
              obj.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          });
        }
    }
    }
  }
}]);
