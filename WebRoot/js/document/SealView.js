/**
 * @author:
 * @class SealView
 * @extends Ext.Panel
 * @description [Seal]管理
 * @company 广州宏天软件有限公司
 * @createtime:
 */
SealView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				SealView.superclass.constructor.call(this, {
							id : 'SealView',
							title : '印章管理',
							iconCls:'menu-seal',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				// 初始化搜索条件Panel
				this.searchPanel=new Ext.FormPanel({
					    height : 35,
						region : 'north',
						frame : false,
						border : false,
						layout : 'hbox',
						layoutConfig : {
							padding : '5',
							align : 'middle'
						},
						defaults : {
							style : 'padding:0px 5px 0px 5px;',
							border : false,
							anchor : '98%,98%',
							labelWidth : 75,
							xtype : 'label'
						},
					   items:[
					   {
					   	 text:'印章名称：'
					   },{
					   	xtype:'textfield',name:'Q_sealName_S_LK'
					   },{
						   xtype:'button',
						   text:'查询',
						   scope:this,
						   iconCls:'btn-search',
						   handler:this.search
					   },{
						   xtype:'button',
						   text:'重置',
						   scope:this,
						   iconCls:'btn-reset',
						   handler:this.reset
					   }]
			   });

				this.topbar = new Ext.Toolbar({
							items : [
//								{
//										iconCls : 'btn-add',
//										text : '添加印章',
//										xtype : 'button',
//										scope : this,
//										handler : this.createRs
//									},
										{
									    iconCls:'btn-add',
									    text:'制作印章',
									    xtype:'button',
									    scope:this,
									    handler:this.makeSeal
									
									}, {
										iconCls : 'btn-del',
										text : '删除印章',
										xtype : 'button',
										scope : this,
										handler : this.removeSelRs
									}]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					// 使用RowActions
					rowActions : true,
					id : 'SealGrid',
					url : __ctxPath + "/document/listSeal.do",
					fields : [{
								name : 'sealId',
								type : 'int'
							}, 'fileId', 'sealName', 'sealPath', 'belongId',
							'belongName','fileAttach'],
					columns : [{
								header : 'sealId',
								dataIndex : 'sealId',
								hidden : true
							}, {
								header : '',
								hidden:true,
								dataIndex : 'fileId'
							}, {
								header : '印章名称',
								dataIndex : 'sealName'
							}
//							, {
//								header : '印章路途',
//								dataIndex : 'sealPath'
//							}
							, {
								header : '使用人',
								dataIndex : 'belongName'
							}, new Ext.ux.grid.RowActions({
										header : '管理',
										width : 100,
										actions : [{
													iconCls : 'btn-del',
													qtip : '删除',
													style : 'margin:0 3px 0 3px'
												}, {
													iconCls : 'btn-edit',
													qtip : '编辑',
													style : 'margin:0 3px 0 3px'
												}, {
													iconCls : 'btn-check',
													qtip : '预览',
													style : 'margin:0 3px 0 3px'
												}],
										listeners : {
											scope : this,
											'action' : this.onRowAction
										}
									})]
						// end of columns
				});

				this.gridPanel.addListener('rowdblclick', this.rowClick);

			},// end of the initComponents()
			// 重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			// 按条件搜索
			search : function() {
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
			// GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
//							new SealForm({
//										sealId : rec.data.sealId
//									}).show();
							new MakeSealForm({
									sealId : rec.data.sealId,
									fileId:rec.data.fileAttach.fileId
						    }).show();
						});
			},
			// 创建记录
			createRs : function() {
				new SealForm().show();
			},
			// 按ID删除记录
			removeRs : function(id) {
				$postDel({
							url : __ctxPath + '/document/multiDelSeal.do',
							ids : id,
							grid : this.gridPanel
						});
			},
			// 把选中ID删除
			removeSelRs : function() {
				$delGridRs({
							url : __ctxPath + '/document/multiDelSeal.do',
							grid : this.gridPanel,
							idName : 'sealId'
						});
			},
			// 编辑Rs
			editRs : function(record) {
				new MakeSealForm({
							sealId : record.data.sealId,
							fileId:record.data.fileAttach.fileId
						}).show();
//				new SealForm({
//							sealId : record.data.sealId
//						}).show();
			},
			makeSeal:function(){
			    new MakeSealForm().show();
			},
			reviewRs:function(record){
			    new SealShowPanel({
							fileId:record.data.fileAttach.fileId
						}).show();
			},
			// 行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.sealId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					case 'btn-check' :
						this.reviewRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
