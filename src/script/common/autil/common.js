$.extend({
	getRandom: function() { //获取随机数
		var random = Math.random() + "";
		random = random.split(".")[1];
		return random;
	},
	/**
   * Extends the destination object `dst` by copying all of the properties from the `src` object(s)
   * to `dst`. You can specify multiple `src` objects.
   *
   * @param   {Boolean} deep If true, the merge becomes recursive (optional)
   * @param   {Object}  dst  Destination object.
   * @param   {Object}  src  Source object(s).
   * @returns {Object}       Reference to `dst`.
   */
   clone : function(dst) {
    var deep = false,
      i = 1;

    if (typeof dst === 'boolean') {
      deep = dst;
      dst = arguments[1] || {};
      i++;
    }

    $.each([].slice.call(arguments, i), function (obj) {
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
        }
        else if (copy !== undefined) {
          dst[key] = copy;
        }
      }
    });

    return dst;
  }
});
