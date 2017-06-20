/**
 * 使用方式
 * app-color 必须写
 * default-color='red' 默认颜色，可通过大括号传入表达式
 * positive-color='blue' 正数时的颜色，可通过大括号传入表达式
 * negative-color='black' 负数时的颜色，可通过大括号传入表达式
 * zero-color='#FFF' 为0时颜色，可通过大括号传入表达式
 * target='{{number}}'，如果不需要判断容器content中的数据，则用target指定需要判断的数据
 * <div app-color default-color='red' positive-color='{{blue}}' negative-color='{{black}}' zero-color='white' target='{{number}}'>-1</div>
 */
APP.directive('appColor',function(){
	return {
		scope:{},
		restrict: 'A',
		link: function($scope, $element, $attrs, ngModelCtrl){
			
		    //如果有target，则监听target的值，不监听元素内容中的值，否则监听元素内容中的值
		    if($attrs['target'] != undefined){
		    	$scope.$watch(
		    		function(){
						return $attrs.target;
					},
			    	function(newVal, oldVal) { 
			    		exec(newVal,oldVal);
			    	}
			    );
		    }else{
				$scope.$watch(
					function(){
						return $element[0].innerHTML;
					},
			    	function(newVal, oldVal) { 
			    		exec(newVal,oldVal);
			    	}
			    );
		    }
		    
		    //根据数据设置color色
			function exec(newVAL, oldVal){
				var val;
				var defaultcolor =  !!$attrs['defaultColor']  ? $attrs['defaultColor']  + ' !important' : $attrs['defaultColor'];//默认颜色
				var positivecolor = !!$attrs['positiveColor'] ? $attrs['positiveColor'] + ' !important' : $attrs['positiveColor'];//正数
				var negativecolor = !!$attrs['negativeColor'] ? $attrs['negativeColor'] + ' !important' : $attrs['negativeColor'];//负数
				var zerocolor =     !!$attrs['zeroColor']     ? $attrs['zeroColor']     + ' !important' : $attrs['zeroColor'];//零
				var target = $attrs['target'];//要判断的数据
				
				if(target != undefined){
					val = target;
				}else{
					val = $($element)[0].innerHTML.replace(/,/g,"");
				}
				
				//非数字
				if(isNaN(parseFloat(val))){
					$element.css("cssText",'color:'+defaultcolor);
				}else{
					//等于0
					if(val == 0){
						if(!!zerocolor){
							$element.css("cssText",'color:'+zerocolor)
						}else{
							if(!!positivecolor){
								$element.css("cssText",'color:'+positivecolor)
							}else{
								$element.css("cssText",'color:'+defaultcolor);
							}
						}
					}
					//正数
					if(val > 0){
						if(!!positivecolor){
							$element.css("cssText",'color:'+positivecolor);
						}else{
							$element.css("cssText",'color:'+defaultcolor);
						}
					}
					
					//负数
					if(val < 0){
						if(!!negativecolor){
							$element.css("cssText",'color:'+negativecolor);
						}else{
							$element.css("cssText",'color:'+defaultcolor);
						}
					}
				}
			}
		}
	}
});