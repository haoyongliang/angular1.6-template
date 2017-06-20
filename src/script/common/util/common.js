$.extend({
	getRandom: function() { //获取随机数
		var random = Math.random() + "";
		random = random.split(".")[1];
		return random;
	}
});