//千分位格式化过滤器
//使用方式 {{123 | thousands :34}}
//说明 : ":34"表示保留小数点后34位 ,可以不写默认保留2位
APP.filter('thousands', [()=> {//数字千分位

	return function(value, bit) {
		bit = bit || 2;
		//四舍五入方法
		function keepTwoDecimalFull(num) {
		  num = String(num).replace(',','');
		  var result = parseFloat(num);
		  if (isNaN(result)) {
		    result = '0';
		  }
		  var str = '1';
		  for(var i=0; i<bit; i++){
		  	str += '0';
		  }
		  result = Math.round(num * str) / str;
		  var s_x = result.toString();
		  var pos_decimal = s_x.indexOf('.');
		  if (pos_decimal < 0) {
		    pos_decimal = s_x.length;
		    s_x += '.';
		  }
		  while (s_x.length <= pos_decimal + parseInt(bit) ) {
		    s_x += '0';
		  }
		  return s_x;
		}


		var result = keepTwoDecimalFull(value).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,') ;
		//去掉小数点后的千分位
		result = result.split('.')[0] +'.'+ result.split('.')[1].replace(',','');
		return result;
	}
}])
