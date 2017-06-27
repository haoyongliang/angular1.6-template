###项目介绍

##第三方插件安装
	bower install --save 插件名
	安装完毕在index.html引入<scrip src="lib/xxx/xx.js"/>

##自定义代码
	在script目录下新建JS，写完后无序引入，程序会自动打包，比如新建aa.js里面有变量name，直接可以在其他JS中使用该变量

##目录说明
	src
		-- data 本地JSON模拟数据
		-- image 存放图片的目录
		-- style 存放样式的目录
		-- script 存放JS的目录
			-- common 公共的代码，通用组件
			-- platform 当前项目涉及的代码
				-- component 由路由控制的组件放到这里
				-- directive 没有被路由控制的组件放到这里
				-- controllers 控制器，如果视图既没有放到component,也没有放入directive目录，则将控制器代码写入这里
			-- app.js 项目模块
			-- const 存放常量
			-- run.js 项目启动初始化操作
		-- index.html 首页面
