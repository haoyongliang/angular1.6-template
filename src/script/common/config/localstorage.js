APP.config((localStorageServiceProvider)=> {
  localStorageServiceProvider
  .setPrefix('XIZHUOKEJI')
  .setStorageType('sessionStorage')
  .setNotify(true, true)
});