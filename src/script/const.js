/**
 * [用户登陆状态名字]
 */
APP.constant('loginMode', {
  NAME: 'LOGINMODE',
  RESULT: 'success', //登陆成功
});

//用户登陆后的信息
APP.constant('userInfo',{
  createDate : 'createDate',
  logName : 'logName',//18735885176
  loginCount : 'loginCount',
  remark : 'remark',
  sysToken : 'sysToken',
  userID : 'userID',
  password : 'lkasjdfllksadjf',
});

//我的模板中主模板的模板类型
APP.constant('templateMainType',[
  {
    name:'管理',
    type:'1'
  },{
    name: '审批',
    type:'2'
  }
]);
//我的模板中构建纵向选项卡的表单数据
APP.constant('buildVerticalCardConstant',{
  descPosition:[//显示位置0居中1左2右
    {
      name:'居中',
      type:'0',
      style:'text-align:center !important;'
    },{
      name:'居左',
      type:'1',
      style:'text-align:left !important;'
    },{
      name:'居右',
      type:'2',
      style:'text-align:right !important;'
    }
  ],isBold:[//是否加粗1加粗0正常
    {
      name:'正常',
      type:'0',
      style:'font-weight: normal !important;'
    },{
      name:'加粗',
      type:'1',
      style:'font-weight: bold !important;'
    }
  ],isPortrait:[//是否纵向 1纵0横
    {
      name:'纵',
      type:'1'
    },{
      name:'横',
      type:'0'
    }
  ]
});
/**
 * [颜色]
 * @type {[type]}
 */
APP.constant('colorConstant',[
  {
    name:'深蓝',
    type:'#1B264F'
  },{
    name:'深青',
    type:'#00BB9C'
  },{
    name:'蓝色',
    type:'#56ABE4'
  },{
    name:'紫色',
    type:'#9D55B8'
  },{
    name:'红色',
    type:'#EB4F38'
  },{
    name:'橙色',
    type:'#EA8010'
  },{
    name:'金色',
    type:'#F4C600'
  },{
    name:'鲜绿',
    type:'#11CD6E'
  },{
    name:'沙棕',
    type:'#F4A460'
  }
])

/**
 * [ 文本构件 ]
 * @type {String}
 */
APP.constant('buildTextConstant',{
  'textType':[//特殊文字特殊文字 1无2身份证3手机号，公共字典fid=110
    {
      name:'无',
      type:'1'
    },{
      name:'身份证',
      type:'2'
    },{
      name:'手机号',
      type:'3'
    }
  ],
  'textRows':[//单行/多行
    {
      name:'单行',
      type:'1'
    },{
      name:'多行',
      type:'2'
    }
  ],
  'cardElementAttributeConstant':[
    {
      name:'必填',
      type:'1'
    },{
      name:'消息内容',
      type:'2'
    },{
      name:'列表显示',
      type:'3'
    },{
      name:'审批可改',
      type:'4'
    },{
      name:'通栏',
      type:'5'
    }
  ],
  'cardElementExplainShowFlagConstant':[
    {name:'不显示',type:'0'},
    {name:'显示',type:'1'}
  ]
});

/**
 * [ 数字构件 ]
 * @type {String}
 */
APP.constant('buildNumberConstant',{
  'decimalDigits':[
    {name:'1',type:'1'},
    {name:'2',type:'2'},
    {name:'3',type:'3'},
    {name:'4',type:'4'},
    {name:'5',type:'5'},
    {name:'6',type:'6'},
    {name:'7',type:'7'},
    {name:'8',type:'8'},
    {name:'9',type:'9'},
    {name:'10',type:'10'},
    {name:'11',type:'11'},
    {name:'12',type:'12'},
    {name:'13',type:'13'},
    {name:'14',type:'14'},
    {name:'15',type:'15'},
    {name:'16',type:'16'},
    {name:'17',type:'17'},
    {name:'18',type:'18'},
    {name:'19',type:'19'},
    {name:'20',type:'20'}
  ],
  'thousands':[//千分位
    {name:'关',type:0},
    {name:'开',type:1}
  ],
  'percentage':[//百分号
    {name:'关',type:0},
    {name:'开',type:1}
  ],
  'cardElementAttributeConstant':[
    {
      name:'必填',
      type:'1'
    },{
      name:'消息内容',
      type:'2'
    },{
      name:'审批可改',
      type:'4'
    },{
      name:'通栏',
      type:'5'
    }
  ],
  'cardElementExplainShowFlagConstant':[
    {name:'不显示',type:'0'},
    {name:'显示',type:'1'}
  ]
})

/**
 * [ 构件 位置 列表内容 ]
 * @type {String}
 */
APP.constant('positionConstant',[
  {
    name:'显示在第一行',
    type:'01'
  },{
    name:'显示在第二行(第1个)',
    type:'11'
  },{
    name:'显示在第二行(第2个)',
    type:'12'
  },{
    name:'显示在第二行(第3个)',
    type:'13'
  }
]);

APP.constant('cardElementAttributeConstant',[
  {
    name:'必填',
    type:'1'
  },{
    name:'推送',
    type:'2'
  },{
    name:'列表显示',
    type:'3'
  },{
    name:'审批可改',
    type:'4'
  },{
    name:'通栏',
    type:'5'
  },{
    name:'主页显示',
    type:'6'
  },{
    name:'子文件夹名称',
    type:'7'
  },{
    name:'是否汇总',
    type:'8'
  },{
    name:'是否生成序号',
    type:'9'
  },{
    name:'明细是否显示表头',
    type:'10'
  }
]);


APP.constant('buildDateIntervalConstant',{
  'dateType':[
    { name : '年-月-日 时:分' , type : '1' },
    { name : '年-月-日' , type : '2' },
    { name : '时:分' , type : '3' },
  ],
  'isAlert':[
    { name : '提醒' , type : '1'},
    { name : '不提醒' , type : '0'},
  ],
  'cardElementAttribute':[
    {
      name:'必填',
      type:'1'
    },{
      name:'消息内容',
      type:'2'
    },{
      name:'列表显示',
      type:'3'
    },{
      name:'审批可改',
      type:'4'
    },{
      name:'通栏',
      type:'5'
    }
  ]
});
/**
 * [ 文件上传构件需要常量 ]
 */
APP.constant('buildUploadConstant',{
  'cardElementAttribute':[
    { name:'审批可改', type:'4'}
  ]
});


/**
 * [ 选项构件需要常量 ]
 */
APP.constant('buildSelectConstant',{
	'selectType':[
		{name:'单选', type:'1'},
		{name:'多选', type:'2'}
	],
	'cardElementAttribute':[
	    { name:'必填',type:'1' },
	    { name:'消息内容', type:'2'},
	    { name:'列表显示', type:'3'},
	    { name:'审批可改', type:'4'},
	    { name:'通栏', type:'5' }
	 ],
	'selectData':[
		{ name:'从基础数据中选择',type:'1'},
		{ name:'选择部门或人员',type:'2'},
		{ name:'选择客户',type:'3'},
	]
})

APP.constant('buildDateConstant',{
  'dateType':[
	{ name : '年-月-日 时:分' , type : '1'},
	{ name : '年-月-日' , type : '2'},
	{ name : '时:分' , type : '3'}
  ],
  'isAlert':[
	{ name : '提醒' , type : '1'},
	{ name : '不提醒 ', type : '0'},
  ],
  'cardElementAttribute':[
    { name : "必填" , type : '1'},
    { name : "消息内容" , type : '2'},
    { name : "列表显示" , type : '3'},
    { name : "审批可改" , type : '4'},
    { name : "通栏" , type : '5'}
  ]
});
