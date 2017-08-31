APP.config(['ScrollBarsProvider',(ScrollBarsProvider)=>{
	// scrollbar defaults
	ScrollBarsProvider.defaults = {
		autoHideScrollbar: false,
		scrollAmount:'auto',
		setHeight: '100%',
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
}]);
