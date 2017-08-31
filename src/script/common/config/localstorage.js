APP.config(['localStorageServiceProvider',(localStorageServiceProvider)=> {
  localStorageServiceProvider
  .setPrefix('dropsea')
  .setStorageType('sessionStorage')
  .setNotify(true, true)
}]);