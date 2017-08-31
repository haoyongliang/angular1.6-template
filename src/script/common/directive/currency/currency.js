/**
 * 输入框中的千分位
 * 使用方式 <input type="text" ng-model = "" app-currency bit="3"/> 这些是必须
 * type必须是text类型
 * ng-model 必须有
 * currency 必须有
 * bit 小数点保留位数，可以不写，默认保留2位
 * isF 是否是负数
 */
APP.directive('appCurrency', ['$filter','$browser',($filter, $browser)=> {
	return {
		require: 'ngModel',
		link: function($scope, $element, $attrs, ngModelCtrl) {
			var separators = {
				'thousands': $filter('number')(1000).substr(1, 1),
				'decimal': $filter('number')(1.1).substr(1, 1)
			}
			var decimalEntered = false;
			var bit = $attrs.bit || 2
			ngModelCtrl.$parsers.push(function(viewValue) {
				if(!!$attrs.isF) {
					if(viewValue > 0) {
						viewValue = -viewValue;
					}
				}
				return viewValue + ''.split(separators.thousands).join('').split(separators.decimal).join('.');
			})

			ngModelCtrl.$render = function() {
				$element.val($filter('number')((ngModelCtrl.$viewValue + '').replace(/,/g, ''), bit, false))
			}
			var listener = function() {
				var value = $element.val().split(separators.thousands).join('').split(separators.decimal).join('.');
				if(decimalEntered) {
					decimalEntered = false;
					return;
				}

				if(!!$attrs.isF) {
					if(value > 0) {
						value = -value;
					}
				}
				$element.val($filter('number')(value, bit));
			}

			$element.bind('focus', function() {
				if(!!$attrs.readonly || $attrs.readonly == 'true') {
					return;
				}
				var value = ngModelCtrl.$modelValue;
				if(!angular.isUndefined(value)) {
					var v = value.toString().replace(/,/g, '');
					if(parseFloat(v) == 0.0) {
						v = "";
					}

					$element.val(v);
				}
			})

			$element.bind('blur', function() {
				listener();
			});

			$element.bind('keypress', function(event) {
				var key = event.which;
				if(key == 0 || key == 8 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
					return;
				}
				if(
					String.fromCharCode(key) != separators.thousands &&
					String.fromCharCode(key) != separators.decimal &&
					!(48 <= key && key <= 57) &&
					String.fromCharCode(key) != '-'
				) {
					event.preventDefault();
					return;
				}
				if(String.fromCharCode(key) == separators.decimal) decimalEntered = true;
			})

			$element.bind('paste cut', function() {
				$browser.defer(listener)
			})
		}
	}
}])


APP.directive('appendText',[function(){
    return {
        scope:{
        	
        },
        restrict: 'A',
        link: function($scope, $element, $attrs, ngModelCtrl){            
            $element.on('blur', function() {
            	if(!!$attrs.appendText){
            		$element.val($element.val()+$attrs.appendText);
            	}	
			})
            $element.on('focus',function(){
            	if(!!$attrs.appendText){
            		let val = $element.val();
            		val = val.substring(0,val.indexOf($attrs.appendText));
            		$element.val(val);
            	}
            })
            
        }
    }
}])
