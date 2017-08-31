
APP.controller('mainCtrl',['$scope','$timeout','$appHttp','cache','$log','$loading',function($scope,$timeout,$appHttp,cache,$log,$loading){

	function filterData(data){
		var arr = [];
		for(var e in data){
			if(e!='swift_number' && e!="code" && e!='flag_specialList_c'){
				arr.push(e);
			}
		}
		console.log(arr);
	}
	$scope.req4 = function(){
		$appHttp.getDataByGet({
			url:'/data/aa.json'
		}).then(resp=>{
			var data = resp.data;
			var arr = [];
			for(var e in data){
				if(e!='swift_number' && e!="code" && e!='flag_specialList_c'){
					arr.push(e);
				}
			}
			console.log(arr);
		});
	}

	$scope.req3 = function(){
		$appHttp.getDataByGet({
			url:'/data/def.json'
		}).then(resp=>{
			console.log(resp);
			var data = resp.data;
			var formObj = {};//表单数据
			var formReg = /^td_id_[a-zA-Z|\-|_]+/;
			var arrReg ;
			var arr = [];//列表数据
			for(var e in data){
				if(!!formReg.test(e)){
					formObj[e] = data[e];
				}
			}
			if(!!formObj["td_id_total_allnum"]){
				var num = parseInt(formObj["td_id_total_allnum"]);
				for(var i=0; i<num; i++){
					if(i<10){
						arrReg = new RegExp( "^td_id_0"+(i+1)+"_*");
					}else{
						arrReg = new RegExp( "^td_id_"+(i+1)+"_*");
					}
					var obj = {};
					for(var e in data){
						if(arrReg.test(e)){
							obj[e] = data[e];
						}
					}
					arr.push(obj);

				}
				console.log(arr);
			}
		})
	}
	$scope.req2 = function(){
		$appHttp.getDataByGet({
			url:'http://120.24.175.12:8189/dataplatform/brdata/getdata?intCode=Execution&intUserproperty={%22id%22:%2244080419711006165X%22,%22cell%22:%2213922446678%22,%22name%22:%22%E9%99%88%E8%BF%85%22}&droseakey=8fa4d9fac0844625b155d088899ad07b'
		}).then(resp=>{
			if(resp.data.result == '200'){
				var jsonObj = JSON.parse(resp.data.data);
				var executeObj = {};
				var badObj = {};
				var executeReg = /^ex_execut1_*/gi;
				var badReg = /^ex_bad1_*/gi;
				for(var e in jsonObj){
					if(executeReg.test(e)){
						executeObj[e] = jsonObj[e];
					}
					if(badReg.test(e)){
						badObj[e] = jsonObj[e];
					}
				}
				console.log(executeObj);
				console.log(badObj);
			}
		}).catch(error=>{
			console.log(error);
		})
	}

	$scope.req = function(){
		$appHttp.getDataByGet({
			params:{

			},
			url:'/data/abc.json',
		}).then((resp)=>{
			if(resp.data.result=="200"){
				var arr = [];
				var jsonObj = JSON.parse(resp.data.data);
				if(!!jsonObj["product"] && !!jsonObj["product"]["priskChecks"] && !!jsonObj["product"]["priskChecks"].length > 0){
					var priskChecks = jsonObj["product"]["priskChecks"];
					for(var i=0; i<priskChecks.length; i++){
						if(!!priskChecks[i]["caseDetail"]){
							if(Array.isArray(priskChecks[i]["caseDetail"])){
								for(var j=0; j<priskChecks[i]["caseDetail"].length; j++){
									var element = priskChecks[i]["caseDetail"][j];
									arr.push({
										caseSource:element["caseSource"]["#text"],
										caseTime:element["caseTime"]["#text"],
										caseType:element["caseType"]["#text"]
									});
								}
							}else{
								arr.push({
									caseSource:priskChecks[0]["caseDetail"]["caseSource"]["#text"],
									caseTime:priskChecks[0]["caseDetail"]["caseTime"]["#text"],
									caseType:priskChecks[0]["caseDetail"]["caseType"]["#text"]
								});
							}
						}
					}
				}
				console.log(arr);
			}
		}).catch(error=>{
			console.log(error);
		})
	}


	$loading.start("loadname");
	$timeout(()=>{
		$loading.finish('loadname');
	},2000);
	$scope.html = `<div app-color default-color="blue" negative-color='red' target='{{person.age}}'>{{person.name}}</div>`;
	$scope.person = {
		name : "张三",
		age :-1
	};
	$timeout(()=>{
		$log.info('info');

	},0);
	$scope.params = {
		page:4
	}
	$scope.money = 4544444444444444;
	$scope.handler = function(){
		return function(data,hasMoreData){
			hasMoreData.flag = data.data["object"].hasMoreData;
			$scope.items.push(data.data["object"].data);
		}
	}
	$scope.name =  'jsdf';
	$scope.scrollbarConfig = {
		setHeight:200,
	}
	$scope.items = ['张三'];
	for(var i=0; i<30; i++){
		$scope.items.push('lisi'+i);
	}
	$scope.showBgPanel = false;
	$scope.mydate = '2017'


//	$scope.add = function(){
//		alert(1)
//	}
	$scope.add = function(){
		$scope.aaa = '2342423'
		$appHttp.getDataByGet('data/data.json')
		.then(data=>{
			cache.put('a','aa');

			$timeout(()=>{
				$scope.$digest();
				$scope.$apply(function(){
					$scope.data += data;
				});
			},0);
			return $appHttp.getDataByGet('data/test.json')
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
