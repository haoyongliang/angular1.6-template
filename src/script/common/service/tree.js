/**
 * 获取UUID
 */
APP.service('tree',['$rootScope','$filter','$http','$timeout','$q',function($rootScope,$filter,$http,$timeout,$q){
	return {
		/**
		 * [ 初始化，包含鼠标单击后的效果 ]
		 * @return {[type]} [description]
		 */
		init:function(treeId){
			let tree = $('#'+treeId);
			tree.on('click','li div',function(e){
				let this_ = $(this);
				tree.find('li div').css({
					'background-color':'white',
					'color':'black'
				});
				this_.css({
					'background-color':'#373d41',
					'color':'white'
				});
			})

		},
    /**
     * [让菜单有层级感。显示树结构的时候添加层级结构前的padding-left,使用可以值参考myTemplateCtrl中的使用]
     * @param  {[type]} arrays          [原数组]
     * @param  {[type]} childNodesName  [子属性名字，该属性对应的值是数组]
     * @param  {[type]} level           [层级，可以不写，默认1]
     * @param  {[type]} basePaddingLeft [如果值是20px,第一级目录paddingleft=20,第二级是40]
     * @return {[type]}                 [description]
     */
     addLevel: function(arrays,childNodesName,basePaddingLeft,level){
      if(!level){
        level = 1;
      }
      if(!basePaddingLeft){
        basePaddingLeft = 20;
      }
      for(let i=0; i<arrays.length; i++){
        arrays[i].paddingLeft = level * basePaddingLeft + 'px'
        if(!!arrays[i][childNodesName] && arrays[i][childNodesName].length > 0){
          let childLevel = level + 1;
          this.addLevel(arrays[i][childNodesName],childNodesName,basePaddingLeft,childLevel)
        }
      }
    }
	};
}]);
