
APP.config(['$validationProvider',function($validationProvider){
	let expression = {
		phone : /^1[\d]{10}/,
		password : function(value){
			return value > 5
		}
	}
	
	let defaultMsg = {
		phone : {
			success : '',
			error : '必须是11位手机号'
		},
		password : {
			success : '',
			error : ' 长度至少6位'
		}
	}
	
	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);
