APP.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  /**
   * [登陆  http://localhost:1234/#!/login]
   * @type {String}
   */
  $stateProvider.state('login', { //登陆页面
    url: '/login',
    templateUrl: 'script/platform/component/login/login.html',
    controller: 'loginCtrl'
  }).state('home', { //登陆后的框架页面
    url: '/home',
    templateUrl: 'script/platform/component/home/home.html',
    controller: 'homeCtrl'
  });

  $stateProvider.state('public',{
    url:'/public',
    templateUrl:'script/platform/nc/indexPage.html'
  });



  //登陆后的主页面
  $stateProvider.state('home.main', {
    url: '/main',
    templateUrl: 'script/platform/component/home/main/main.html',
    // controller : 'mainCtrl'
  })



  /**
   * [我的组织  http://localhost:1234/#!/home/organization ]
   * @type {String}
   */
  $stateProvider.state('home.organization', { //首页
    url: '/organization',
    templateUrl: 'script/platform/component/home/organization/organization.html',
    // controller : 'organizationCtrl',
  }).state('home.organization.right', { //右侧内容
    params: {
      entId: null,
      createUserId: null,
      enterpriseName: null,
    },
    url: '/right',
    views: {
      'right@home.organization': {
        templateUrl: 'script/platform/component/home/organization/right/organizationRight.html',
      }
    }
  });

  /**
   * [个人资料  http://localhost:1234/#!/home/userInfo ]
   * @type {String}
   */
  $stateProvider.state('home.userInfo', {
    url: '/userInfo',
    templateUrl: 'script/platform/component/home/user/userInfo/userInfo.html'
  })



  /**
   * [个人设置  http://localhost:1234/#!/home/userSet]
   * @type {String}
   */
  $stateProvider.state('home.userSet', {
    url: '/userSet',
    templateUrl: 'script/platform/component/home/user/userSet/userSet.html'
  })


  /**
   * [ 我的模板 ]
   * @type {String}
   */

  $stateProvider.state('home.myTemplateIndex',{
    url:'/myTemplateIndex',
    templateUrl:'script/platform/component/home/myTemplate/index.html'
  }).state('home.myTemplate', {
    params: {
      entId: null,
      createUserId: null,
      enterpriseName: null,
    },
    url: '/myTemplate',
    templateUrl: 'script/platform/component/home/myTemplate/left/myTemplate.html'
  }).state('home.myTemplate.addMainTemplate', { //创建主模板
    params: {
      entId: null,
      createUserId: null,
      enterpriseName: null,
    },
    url: '/addMainTemplate',
    views: {
      'right@home.myTemplate': {
        templateUrl: 'script/platform/component/home/myTemplate/right/mainTemplate/addMainTemplate/addMainTemplate.html',
      }
    }
  }).state('home.myTemplate.previewMainTemplate',{
    params: {
      templateId:null,
      templateName:null
    },
    url: '/previewMainTemplate',
    views: {
      'right@home.myTemplate': {
        templateUrl: 'script/platform/component/home/myTemplate/right/mainTemplate/previewMainTemplate/previewMainTemplate.html',
      }
    }
  }).state('home.myTemplate.detailInfo',{
    params: {
      templateName:null,
    },
    url: '/detailInfo', 
    views: {
      'right@home.myTemplate': {
        templateUrl: 'script/platform/component/home/myTemplate/right/mainTemplate/previewMainTemplate/detailInfo/detailInfo.html'
      }
    }
  }).state('home.myTemplate.buildVerticalCard',{//构建纵向分类卡，这个路由是在开发的时候用，正式上线是通过ngdialog
    url:'/buildVerticalCard',
    views:{
      'right@home.myTemplate':{
        templateUrl:'script/platform/component/home/myTemplate/right/mainTemplate/previewMainTemplate/buildVerticalCard/buildVerticalCard.html'
      }
    }
  }).state('home.myTemplate.buildText',{//构建纵向分类卡，这个路由是在开发的时候用，正式上线是通过ngdialog
    url:'/buildText',
    views:{
      'right@home.myTemplate':{
        templateUrl:'script/platform/component/home/myTemplate/right/mainTemplate/previewMainTemplate/buildText/buildText.html'
      }
    }
  }).state('home.myTemplate.buildSelect',{//构建纵向分类卡，这个路由是在开发的时候用，正式上线是通过ngdialog
    url:'/buildSelect',
    views:{
      'right@home.myTemplate':{
        templateUrl:'script/platform/component/home/myTemplate/right/mainTemplate/previewMainTemplate/buildSelect/buildSelect.html'
      }
    }
  }).state('home.myTemplate.subTemplate', { //右侧内容
    params: {
      entId: null,
      createUserId: null,
      enterpriseName: null,
    },
    url: '/subTemplate',
    views: {
      'right@home.myTemplate': {
        templateUrl: 'script/platform/component/home/myTemplate/right/subTemplate/subTemplate.html',
      }
    }
  });
  
  /**
   * [云盘  http://localhost:1234/#!/home/cloud ]
   * @type {String}
   */
  $stateProvider.state('home.cloud', {
    url: '/cloud',
    templateUrl: 'script/platform/component/home/cloud/cloud.html'
  })

  $urlRouterProvider.otherwise('login')
}])
