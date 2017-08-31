### 开发环境搭建
	github 客户端
	node , npm install -g cnpm  
	npm install -g gulp
	npm install -g bower


	cnpm install
	bower install

### 注意
	bower安装完毕会缺少span.js,重新手动下载bower install spin.js --save

	在angular1.6-template 目录执行 gulp 命令

###项目介绍
## 环境配置
	Node git bower gulp

	gulp：自动化工具构建
		package.json 配置的是gulp相关的依赖
		bower.json 配置的是项目的相关依赖

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

##angular-ui-tree 的使用
1.获取数据menuData，这个数据必须是数组
2.对数据进行加工，通过tree服务中的tree.addLevel(menuData,'subTemps'); 方法
3.显示
	1）在页面定义模板，模板中显示真正的数据
	<script type="text/ng-template" id="nodes_renderer">
		 <div ui-tree-handle class="tree-node tree-node-content"  style="padding-left:{{node.paddingLeft}}; ">
		    {{node.templateName}}
		    <span ng-click="toggle(this)" class="icon p-a"
		    	ng-class="{' ColorChangeFont icon-you': collapsed,' ColorChangeFont icon-xia': !collapsed}"
		    	ng-if="node.subTemps && node.subTemps.length > 0"
					style="right:10px; font-size:12px"
		    	></span>
		  </div>
		  <ol ui-tree-nodes="" ng-model="node.subTemps" ng-class="{hidden: collapsed}">
		    <li ng-repeat="node in node.subTemps" ui-tree-node ng-include="'nodes_renderer'">
		    </li>
		  </ol>
	</script>
	2）填充模板
	<div ui-tree id="tree-root" class="ng-scope angular-ui-tree" data-drag-enabled="false">
		<ol ui-tree-nodes ng-model="menuData" class="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes">
			<li ng-repeat="node in menuData" ui-tree-node ng-include="'nodes_renderer'" class="ng-scope angular-ui-tree-node" collapsed="false">
			</li>
		</ol>
	</div>
