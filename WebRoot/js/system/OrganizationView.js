/**
 * @author:
 * @class OrganizationView
 * @extends Ext.Panel
 * @description [Organization]管理
 * @company 广州宏天软件有限公司
 * @createtime:
 */
OrganizationView = Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				OrganizationView.superclass.constructor.call(this, {
							id : 'OrganizationView',
							title : '[Organization]管理',
							region : 'center',
							layout : 'border',
							items : [this.searchPanel, this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
				// 初始化搜索条件Panel
				this.searchPanel = new HT.SearchPanel({
							layout : 'form',
							region : 'north',
							colNums : 3,
							items : [{
										fieldLabel : 'demId',
										name : 'Q_demId_L_EQ',
										flex : 1,
										xtype : 'numberfield'
									}, {
										fieldLabel : 'orgName',
										name : 'Q_orgName_S_EQ',
										flex : 1,
										xtype : 'textfield'
									}, {
										fieldLabel : 'orgSupId',
										name : 'Q_orgSupId_L_EQ',
										flex : 1,
										xtype : 'numberfield'
									}, {
										fieldLabel : 'path',
										name : 'Q_path_S_EQ',
										flex : 1,
										xtype : 'textfield'
									}, {
										fieldLabel : 'depth',
										name : 'Q_depth_L_EQ',
										flex : 1,
										xtype : 'numberfield'
									}, {
										fieldLabel : 'orgType',
										name : 'Q_orgType_L_EQ',
										flex : 1,
										xtype : 'numberfield'
									}, {
										fieldLabel : 'creatorId',
										name : 'Q_creatorId_L_EQ',
										flex : 1,
										xtype : 'numberfield'
									}, {
										fieldLabel : 'createtime',
										name : 'Q_createtime_D_EQ',
										flex : 1,
										xtype : 'datefield',
										format : 'Y-m-d'
									}, {
										fieldLabel : 'updateId',
										name : 'Q_updateId_L_EQ',
										flex : 1,
										xtype : 'numberfield'
									}, {
										fieldLabel : 'updatetime',
										name : 'Q_updatetime_D_EQ',
										flex : 1,
										xtype : 'datefield',
										format : 'Y-m-d'
									}],
							buttons : [{
										text : '查询',
										scope : this,
										iconCls : 'btn-search',
										handler : this.search
									}, {
										text : '重置',
										scope : this,
										iconCls : 'btn-reset',
										handler : this.reset
									}]
						});// end of searchPanel

				this.topbar = new Ext.Toolbar({
							items : [{
										iconCls : 'btn-add',
										text : '添加[Organization]',
										xtype : 'button',
										scope : this,
										handler : this.createRs
									}, {
										iconCls : 'btn-del',
										text : '删除[Organization]',
										xtype : 'button',
										scope : this,
										handler : this.removeSelRs
									}]
						});

				this.gridPanel = new HT.GridPanel({
					region : 'center',
					tbar : this.topbar,
					//使用RowActions
					rowActions : true,
					id : 'OrganizationGrid',
					url : __ctxPath + "/system/listOrganization.do",
					fields : [{
								name : 'orgId',
								type : 'int'
							}, 'demId', 'orgName', 'orgSupId', 'path', 'depth', 'orgType', 'creatorId', 'createtime', 'updateId', 'updatetime'],
					columns : [{
								header : 'orgId',
								dataIndex : 'orgId',
								hidden : true
							}, {
								header : 'demId',
								dataIndex : 'demId'
							}, {
								header : 'orgName',
								dataIndex : 'orgName'
							}, {
								header : 'orgSupId',
								dataIndex : 'orgSupId'
							}, {
								header : 'path',
								dataIndex : 'path'
							}, {
								header : 'depth',
								dataIndex : 'depth'
							}, {
								header : 'orgType',
								dataIndex : 'orgType'
							}, {
								header : 'creatorId',
								dataIndex : 'creatorId'
							}, {
								header : 'createtime',
								dataIndex : 'createtime'
							}, {
								header : 'updateId',
								dataIndex : 'updateId'
							}, {
								header : 'updatetime',
								dataIndex : 'updatetime'
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
												}],
										listeners : {
											scope : this,
											'action' : this.onRowAction
										}
									})]
						//end of columns
					});

				this.gridPanel.addListener('rowdblclick', this.rowClick);

			},// end of the initComponents()
			//重置查询表单
			reset : function() {
				this.searchPanel.getForm().reset();
			},
			//按条件搜索
			search : function() {
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
			//GridPanel行点击处理事件
			rowClick : function(grid, rowindex, e) {
				grid.getSelectionModel().each(function(rec) {
							new OrganizationForm({
										orgId : rec.data.orgId
									}).show();
						});
			},
			//创建记录
			createRs : function() {
				new OrganizationForm().show();
			},
			//按ID删除记录
			removeRs : function(id) {
				$postDel({
							url : __ctxPath + '/system/multiDelOrganization.do',
							ids : id,
							grid : this.gridPanel
						});
			},
			//把选中ID删除
			removeSelRs : function() {
				$delGridRs({
							url : __ctxPath + '/system/multiDelOrganization.do',
							grid : this.gridPanel,
							idName : 'orgId'
						});
			},
			//编辑Rs
			editRs : function(record) {
				new OrganizationForm({
							orgId : record.data.orgId
						}).show();
			},
			//行的Action
			onRowAction : function(grid, record, action, row, col) {
				switch (action) {
					case 'btn-del' :
						this.removeRs.call(this, record.data.orgId);
						break;
					case 'btn-edit' :
						this.editRs.call(this, record);
						break;
					default :
						break;
				}
			}
		});
