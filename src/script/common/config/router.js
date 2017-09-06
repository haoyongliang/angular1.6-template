APP.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  /**
   * [组建演示]
   * @type {String}
   */
  $stateProvider.state('componentDemo', { //登陆页面
    url: '/componentDemo',
    templateUrl: 'script/common/componentDemo/componentDemo.html',
  })
}])
