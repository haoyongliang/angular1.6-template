/**
 * 使用方式：html页面<script type="text/javascript-lazy"> </script>标签中写入代码，代码会随着.html加载被执行。
 */
APP.directive('script', [()=> {
	return {
	  restrict: 'E',
	  scope: false,
	  link: function(scope, elem, attr) 
	  {
	    if (attr.type==='text/javascript-lazy') 
	    {
	      var s = document.createElement("script");
	      s.type = "text/javascript";                
	      var src = elem.attr('src');
	      if(src!==undefined)
	      {
	          s.src = src;
	      }
	      else
	      {
	          var code = elem.text();
	          s.text = code;
	      }
	      document.head.appendChild(s);
	      elem.remove();
	    }
	  }
	};
}]);