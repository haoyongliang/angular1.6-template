const APP = angular.module('app',['ui.router','ngScrollbars','ngCookies','validation','moment-picker']);
APP.config(function (ScrollBarsProvider) {
	// scrollbar defaults
	ScrollBarsProvider.defaults = {
		autoHideScrollbar: false,
		setHeight: 100,
		scrollInertia: 500,
		axis: 'yx',
		theme:'minimal-dark',
		advanced: {
			updateOnContentResize: true
		},
		scrollButtons: {
			scrollAmount: 'auto', // scroll amount when button pressed
			enable: false // enable scrolling buttons by default
		}
	};
});




