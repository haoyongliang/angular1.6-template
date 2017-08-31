(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(['angular', 'less'], factory);
    } else {
        factory(root.angular, root.less);
    }

}(this, function (angular, less) {

    var ngLess = angular.module('ngLess', []);

    ngLess.factory('styles', [
        function () {

            return [];

        }
    ]);

    ngLess.directive('head', [
        'styles',
        '$compile',
        '$interpolate',
        function (styles, $compile, $interpolate) {

            return {
                restrict: 'E',
                link: function link(scope, element) {

                    scope.styles = styles;

                    var html = '<style ng-repeat="style in styles">{{style.css}}</style>';

                    html = html.replace('{{', $interpolate.startSymbol());
                    html = html.replace('}}', $interpolate.endSymbol());
                
                    element.append($compile(html)(scope));

                }
            };

        }
    ]);

    ngLess.directive('link', [
        'styles',
        '$http',
        function (styles, $http) {

            return {
                restrict: 'E',
                link: function link(scope, element) {

                    // Check the attributes
                    if (element.attr('rel') !== 'stylesheet/less' || !element.attr('href')) {
                        return;
                    }

                    var style;

                    // Make sure we remove the <style> if the <link> is removed
                    element.on('$destroy', function () {

                        // Did we have a style?
                        if (!style) {
                            console.log('no style');
                            return;
                        }

                        // Remove the style
                        styles.splice(styles.indexOf(style), 1);

                        // Make sure the <head> directive detects the removal
                        scope.$apply();

                    });

                    // Load the less file
                    $http.get(element.attr('href'))
                        .then(function (response) {

                            // Stop if the element was removed
                            if (!element.parent().length) {
                                throw new Error('Element was removed.');
                            }

                            return less.render(response.data);

                        }).then(function (renderResult) {

                            // Stop if the element was removed
                            if (!element.parent().length) {
                                throw new Error('Element was removed.');
                            }

                            style = {
                                css: renderResult.css
                            };

                            styles.push(style);

                        }).catch(function (error) {

                            // Silence "Element was removed." error
                            if (error.message === 'Element was removed.') {
                                return;
                            }

                            throw error;

                        });

                }
            };

        }
    ]);

}));