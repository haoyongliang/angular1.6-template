APP.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
//APP.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
//  $sceDelegateProvider.resourceUrlWhitelist(['*://api.reddit.com/**', 'self']);
//}]);