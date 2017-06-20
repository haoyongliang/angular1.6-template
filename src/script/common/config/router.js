APP.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url : '/main',
		templateUrl : 'view/main/main.html',
		controller : 'mainCtrl'
	}).state('main.page1',{
		url : '/page1',
		templateUrl : 'view/new_file.html',
	}).state('main.page2',{
		url : '/page1',
		templateUrl : 'view/new_file2.html',
	});
	
	
	$urlRouterProvider.otherwise('main')
}])
