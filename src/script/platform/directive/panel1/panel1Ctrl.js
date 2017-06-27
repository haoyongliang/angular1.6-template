APP.controller('panel1Ctrl',['$timeout',$timeout=>{
  let data = new Set();
  data.add(1);
  $timeout(()=>{
    console.log('aaa');
  },0);
}]);
