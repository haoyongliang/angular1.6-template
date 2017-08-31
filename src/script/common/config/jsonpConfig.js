//配置跨域访问的服务地址
APP.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['*://localhost:8080/**', 'self']);
    $sceDelegateProvider.resourceUrlWhitelist(['*://app.zhuoxitech.com:8443/**', 'self']);
    $sceDelegateProvider.resourceUrlWhitelist(['*://192.168.2.107:8080/**', 'self']);
    $sceDelegateProvider.resourceUrlWhitelist(['*://*.*.*.*:*/**', 'self']);
    $sceDelegateProvider.resourceUrlWhitelist(['*://*:*/**', 'self']);
}]);
