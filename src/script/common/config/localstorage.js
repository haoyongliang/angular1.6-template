APP.config(['localStorageServiceProvider',(localStorageServiceProvider)=> {
  localStorageServiceProvider
  .setPrefix('XIZHUOKEJI')
  .setStorageType('sessionStorage')
  .setNotify(true, true)
}]);