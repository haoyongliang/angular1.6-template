

/**
 * [加载框Loading...]，注意，该指令依赖spin.js,使用前先引入spin.js,ng-loading
 * 使用方式
 *  在指定的div上添加指令app-loading="loadingid"
 *  在controller中通过$loading.start('loadingid');和$loading.finish('loadingid')来开始显示和结束显示
 *  可通过app-loading-options="{text: '{{message}}'}" 配置显示的内容，速度，等等
 *  举例
 *  <div class="h-100 "  app-loading="myOrganization"  app-loading-options="{text: '正在加载'}"></div>
 *    $loading.start('myOrganization');//显示加载
 *    $loading.finish('myOrganization')//隐藏加载
 */


(function(APP) {

  function extend(dst) {
    var deep = false,
      i = 1;

    if (typeof dst === 'boolean') {
      deep = dst;
      dst = arguments[1] || {};
      i++;
    }

    angular.forEach([].slice.call(arguments, i), function(obj) {
      var array, clone, copy, key, src;

      for (key in obj) {
        src = dst[key];
        copy = obj[key];

        if (dst === copy) {
          continue;
        }

        if (deep && copy && (angular.isObject(copy) ||
            (array = angular.isArray(copy)))) {

          if (array) {
            clone = (src && angular.isArray(src)) ? src : [];
          } else {
            clone = (src && angular.isObject(src)) ? src : {};
          }

          dst[key] = extend(deep, clone, copy);
        } else if (copy !== undefined) {
          dst[key] = copy;
        }
      }
    });

    return dst;
  }

  APP.value('appLoadingOptions', {
    active: false, // Defines current loading state
    text: 'Loading...', // Display text
    className: '', // Custom class, added to directive
    overlay: true, // Display overlay
    spinner: true, // Display spinner
    spinnerOptions: {
      lines: 12, // The number of lines to draw
      length: 7, // The length of each line
      width: 4, // The line thickness
      radius: 10, // The radius of the inner circle
      rotate: 0, // Rotation offset
      corners: 1, // Roundness (0..1)
      color: '#000', // #rgb or #rrggbb
      direction: 1, // 1: clockwise, -1: counterclockwise
      speed: 2, // Rounds per second
      trail: 100, // Afterglow percentage
      opacity: 1 / 4, // Opacity of the lines
      fps: 20, // Frames per second when using setTimeout()
      zIndex: 2e9, // Use a high z-index by default
      className: 'dw-spinner', // CSS class to assign to the element
      top: 'auto', // Center vertically
      left: 'auto', // Center horizontally
      position: 'relative' // Element position
    }
  })

  .service('appLoading', ['$timeout', '$rootScope', 'appLoadingOptions', function ($timeout, $rootScope, appLoadingOptions) {
    var self = this;

    /**
     * Overrides default options
     * @param {object} options
     */
    self.setDefaultOptions = function (options) {
      extend(true, appLoadingOptions, options);
    };

    /**
     * Activates loading state by key
     * @param {string} key
     */
    self.start = function (key) {
      $timeout(function() {
        $rootScope.$broadcast('$appLoadingStart', key);
      });
    };

    /**
     * Deactivates loading state by key
     * @param {string} key
     */
    self.finish = function (key) {
      $timeout(function() {
        $rootScope.$broadcast('$appLoadingFinish', key);
      });
    };
  }])

  // Shortcut
  .factory('$loading', ['appLoading', function (appLoading) {
    return appLoading;
  }])

  .directive('appLoading', ['$rootScope', 'appLoadingOptions','uuid', function ($rootScope, appLoadingOptions,uuid) {
    return {
      // templateUrl: 'script/common/directive/loading/loading.html?t=' + uuid.getUUID(),
      link: function (scope, element, attrs) {
        attrs.$observe('appLoadingOptions', function(options) {
          options = eval('(' + options + ')');
          $('#' + id_).text(options.text);
        });
        var id_ = 'apploading-' + uuid.getUUID();
        var spinner = null,
          key = attrs.appLoading || false,
          options,
          container,
          body,
          spinnerContainer,
          text;

        /**
         * Starts spinner
         */
        var start = function () {
          if (container) {
            container.addClass('dw-loading-active');
          }
          if (spinner) {
            spinner.spin(spinnerContainer[0]);
          }
        };

        /**
         * Stops spinner
         */
        var finish = function () {
          if (container) {
            container.removeClass('dw-loading-active');
          }
          if (spinner) {
            spinner.stop();
          }
        };

        scope.$watch(attrs.appLoadingOptions, function (newOptions) {
          finish();

          options = extend(true, {}, appLoadingOptions, newOptions);

          // Build template
          body = angular.element('<div></div>')
            .addClass('dw-loading-body');
          container = angular.element('<div></div>')
            .addClass('dw-loading')
            .append(body);

          if (options.overlay) {
            container.addClass('dw-loading-overlay');
          }
          if (options.className) {
            container.addClass(options.className);
          }
          if (options.spinner) {
            spinnerContainer = angular.element('<div></div>')
              .addClass('dw-loading-spinner');
            body.append(spinnerContainer);
            spinner = new Spinner(options.spinnerOptions);
          }
          if (options.text) {
            text = angular.element('<div style="position:absolute; top:24px;width:100px;left:-50px" id="' + id_ + '"></div>')
              .addClass('app-loading-text')
              .text(options.text);
            body.append(text);
          }

          element.append(container);
  //            $compile(container)(scope);

          if (options.active || !key) {
            start();
          }
        }, true);

        $rootScope.$on('$appLoadingStart', function (event, loadKey) {
          if (loadKey === key) {
            start();
          }
        });

        $rootScope.$on('$appLoadingFinish', function (event, loadKey) {
          if (loadKey === key) {
            finish();
          }
        });

        scope.$on('$destroy', function () {
          finish();
          spinner = null;
        });
      }
    };
  }]);
}(APP))
