/**
 * 过时不用
 */
APP.run(['$rootScope', function ($rootScope) {
  $rootScope.colors = {
    white:'#FFF',
    main : '#366092',//主色
    tableBg : '#f0f4fa',//表格背景色辅色
    tableBorder : '#bfbfbf',//表格边框及线条的颜色
    tableInsideBorder1 : '#d9d9d9',//表格内部仙桃及其他辅助的颜色
    tableInsideBorder2 : '#e8e8e8',//表格内部仙桃及其他辅助的颜色
    menuSecond : '#373d41',//二级菜单背景色
    menuSelected : '#95b3d7',//菜单选中背景色
    font1 : '#366092', //深蓝
    font2 : '#5385c1', //浅蓝
    font3 : '#ff0000', //红色
    font4 : '#000000', //黑色
    font5 : '#333333', //浅黑
    font6 : '#808080', //灰色
  }
  $rootScope.fontZize = {
    big : '16px',
    middleBig : '14px',
    middleSmall : '13px',
    small : '12px'
  }
}]);
