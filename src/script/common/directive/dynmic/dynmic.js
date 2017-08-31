
/**
 * [ 动态编译html],使用方式<div app-dynamic="{{html}}"></div>
 * 或者<div app-dynamic handler="myfunction()"> myfunction()返回要编译的字符串
 * @param  {[type]} $compile [description]
 * @return {[type]}          [description]
 */
APP.directive('appDynamic', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            scope:{
              handler:'&'
            },
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return attrs.appDynamic;
                }, function (value) {
                    if(attrs.handler){
                      value = scope.handler();
                    }
                    element.html(value && value.toString());
                    var compileScope = scope;
                    if (attrs.bindHtmlScope) {
                        compileScope = scope.$eval(attrs.bindHtmlScope);
                    }
                    $compile(element.contents())(compileScope);
                });
            }
        };
    }]);
