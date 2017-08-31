
APP.config(['$validationProvider','localStorageServiceProvider','userInfo',function($validationProvider,localStorageServiceProvider,userInfo){
	let expression = {
		
		required: function(value) {
          return !!value;
    },
		phone : /^1[34578]\d{9}$/,
		password : function(value){
			return value > 5
		},
		email:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
		password:/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/,
		comparePassword:function(value,scope,element,attrs,param){
			return value == $('#'+param).val();
		},
		compareOldPassword(value,scope,element,attrs,param){
			return value == param;
		},
		none:function(value){
			return true;
		}

	}

	let defaultMsg = {

		required: {
          error: '该内容为必填选项，请耐心填写',
          success: ''
    },
		phone : {
			success : '',
			error : '手机号码有误，请重新输入'
		},
		password : {
			success : '',
			error : ' 长度至少6位'
		},
		email:{
			success:'',
			error:'邮箱格式有误，请重新输入'
		},
		password:{
			success:'',
			error:'密码必须有数字英文字母和特殊字符组成'
		},
		comparePassword:{
			success:'',
			error:'两次输入密码不一致'
		},
		compareOldPassword:{
			success:'',
			error:'旧密码输入有误'
		},
		none:{
			success:'',
			error:''
		}
	}

	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);
