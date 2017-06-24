APP.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	
	
	$stateProvider.state('login',{//登陆页面
		url : '/login',
		templateUrl : 'script/platform/component/login/login.html',
		controller : 'loginCtrl'
	}).state('home',{//登陆后的页面
		url : '/home',
		templateUrl : 'script/platform/component/home/home.html',
		controller : 'homeCtrl'
	}).state('home.main',{
		url:'/main',
		templateUrl : 'script/platform/component/home/main/main.html',
		controller : 'mainCtrl'
	}).state('home.organization',{
		url:'/organization',
		templateUrl : 'script/platform/component/home/organization/organization.html',
		controller : 'organizationCtrl'
	});
	
	
	$urlRouterProvider.otherwise('login')
}])
