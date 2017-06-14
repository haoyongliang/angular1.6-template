APP.factory('Reddit', function($http,$sce) {
  
  
  var Reddit = function() {
    this.items = [];
    this.busy = false;
    this.after = 'a';
  };

  Reddit.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;

    var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";
    url = $sce.trustAsResourceUrl(url);
    $http.jsonp(
    	url,
    	{
    		params: {
          wd: this.after
        },
        jsonpCallbackParam:'cb'
      }).then(function(data) {
	    	console.log(data);
	      this.items.push(data.data.s);
	      this.after = this.after+'a';
	      this.busy = false;
    }.bind(this))
    .catch(function(e){
    	console.log(e);
    });
  };
	
  return Reddit;
});
APP.controller('mainCtrl',['$scope','$timeout','$myHttp','cache','$log','Reddit',function($scope,$timeout,$myHttp,cache,$log,Reddit){
	$timeout(()=>{
		$log.info('info');
		
	},0);
	$scope.name =  'jsdf';
	$scope.scrollbarConfig = {
		setHeight:200,
	}
	$scope.items = ['张三'];
	$scope.showBgPanel = false;
	$scope.mydate = '2017'
	
	
	$scope.reddit = new Reddit();
//	$scope.add = function(){
//		alert(1)
//	}
	$scope.add = function(){
		$scope.aaa = '2342423'
		$myHttp.getDataByGet('data/data.json')
		.then(data=>{
			cache.put('a','aa');
			
			$timeout(()=>{
				$scope.$digest();
				$scope.$apply(function(){
					$scope.data += data;
				});
			},0);
			return $myHttp.getDataByGet('data/test.json')
		}).then(resp=>{
			console.log(resp);
			$scope.items.push(resp);
		}).catch(err=>{
			console.log(err);
		}).finally(()=>{
			console.log('请求结束');
		})
	}
}])