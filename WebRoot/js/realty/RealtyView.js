/**
 * @author:
 * @class RealtyView
 * @extends Ext.Panel
 * @description 房地产业务管理
 * @company 广州宏天软件有限公司
 * @createtime:2010-01-16
 */
Ext.ns('RealtyView');
RealtyView = Ext.extend(Ext.Panel, {
    // 构造函数
    constructor: function (_cfg) {
        if (_cfg == null) {
            _cfg = {};
        }
        Ext.apply(this, _cfg);
        // 初始化组件
        this.initComponents();
        // 调用父类构造
        RealtyView.superclass.constructor.call(this, {
            id: 'RealtyView',
            title: '房地产业务管理',
            iconCls: 'menu-profile',
            region: 'center',
            layout: 'border',
            items: [this.searchPanel, this.gridPanel]
        });
    },// end of constructor

    // 业务分类ID
    typeId: null,

    // 条件搜索Panel
    searchPanel: null,

    // 数据展示Panel
    gridPanel: null,

    // GridPanel的数据Store
    store: null,

    // 头部工具栏
    topbar: null,

    // 初始化组件
    initComponents: function () {
        // 初始化搜索条件Panel
        this.searchPanel = new Ext.FormPanel({
            layout: 'form',
            region: 'north',
            width: '100%',
            height: 90,
            keys: [{
                key: Ext.EventObject.ENTER,
                fn: this.search,
                scope: this
            }, {
                key: Ext.EventObject.ESC,
                fn: this.reset,
                scope: this
            }],
            items: [{
                border: false,
                width: '100%',
                layout: 'column',
                autoScroll: true,
                style: 'padding-top:5px;padding-left:5px;padding-right:5px;',
                layoutConfig: {
                    align: 'middle',
                    padding: '5'
                },
                items: [{
                    columnWidth: .3,
                    xtype: 'container',
                    layout: 'form',
                    items: [{
                        width: '90%',
                        fieldLabel: '报告编号',
                        name: 'Q_baogaoId_S_LK',
                        xtype: 'textfield',
                        maxLength: 125
                    }, {
                        width: '90%',
                        fieldLabel: '委托单位',
                        name: 'Q_weituo_S_LK',
                        xtype: 'textfield',
                        maxLength: 125
                    }, {
                        width: '90%',
                        fieldLabel: '项目地址',
                        name: 'Q_xmdz_S_LK',
                        xtype: 'textfield',
                        maxLength: 125
                    }]
                }, {
                    columnWidth: .3,
                    xtype: 'container',
                    layout: 'form',
                    items: [{
                        border: false,
                        xtype: 'container',
                        layout: 'column',
                        fieldLabel: '盖章日期',
                        items: [{
                            columnWidth: .49,
                            name: 'Q_gzrq_D_GE',
                            xtype: 'datefield',
                            format: 'Y-m-d'
                        }, {
                            xtype: 'label',
                            text: '至',
                            style: 'margin-top:3px;'
                        }, {
                            columnWidth: .49,
                            name: 'Q_gzrq_D_LE',
                            xtype: 'datefield',
                            format: 'Y-m-d'
                        }]
                    }, {
                        width: '90%',
                        fieldLabel: '估价对象',
                        name: 'Q_pgdx_S_LK',
                        xtype: 'textfield',
                        maxLength: 125
                    }, {
                        width: '90%',
                        fieldLabel: '估价对象类型',
                        name: 'Q_gjdxlx_S_LK',
                        maxLength: 125,
                        xtype: 'combo',
                        mode: 'local',
                        editable: true,
                        triggerAction: 'all',
                        store: Data.pgdxArray
                    }]
                }, {
                    columnWidth: .3,
                    xtype: 'container',
                    layout: 'form',
                    items: [{
                        width: '90%',
                        fieldLabel: '业务主办',
                        name: 'Q_ywzb_S_LK',
                        xtype: 'textfield',
                        maxLength: 125
                    }, {
                        width: '90%',
                        fieldLabel: '合作方',
                        name: 'Q_jjmc_S_LK',
                        xtype: 'textfield',
                        maxLength: 125
                    }, {
                        width: '90%',
                        fieldLabel: '初评编号',
                        name: 'Q_preCode_S_LK',
                        xtype: 'textfield',
                        maxLength: 125
                    }]
                }, {
                    columnWidth: .1,
                    xtype: 'container',
                    layout: 'form',
                    defaults: {
                        xtype: 'button'
                    },
                    items: [{
                        text: '查询',
                        iconCls: 'search',
                        handler: this.search.createCallback(this),
                        scope: this
                    }, {
                        text: '清空',
                        iconCls: 'reset',
                        handler: this.reset,
                        scope: this
                    }]
                }]
            }]
        });// end of the searchPanel

        // 加载数据至store
        this.store = new Ext.data.JsonStore({
            url: __ctxPath + "/realty/listRealty.do",
            baseParams: {
                //"Q_delFlag_SN_EQ" : 0
            },// 只查询未被删除的业务
            root: 'result',
            totalProperty: 'totalCounts',
            remoteSort: true,
            fields: [{
                name: 'businessId',
                type: 'int'
            }, {
                name: 'myid',
                type: 'int'
            }, 'nhrq', 'baogaoId', 'weituo',
                'pgdx', 'gjmd', 'pgzz', 'ywzb',
                'gzrq', 'sfrq', 'ywzl', 'username']
        });
        this.store.setDefaultSort('businessId', 'desc');
        // 加载数据
        this.store.load({
            params: {
                start: 0,
                limit: 25
            }
        });

        // 初始化ColumnModel
        var sm = new Ext.grid.CheckboxSelectionModel();
        var cm = new Ext.grid.ColumnModel({
            columns: [sm, new Ext.grid.RowNumberer(), {
                header: 'businessId',
                dataIndex: 'businessId',
                hideable: false,
                hidden: true
            }, {
                header: '数字编号',
                dataIndex: 'myid',
                width: 50
            }, {
                header: '拿号日期',
                dataIndex: 'nhrq',
                renderer: function (value) {
                    if (value != null) {
                        return value.substring(0, 10);
                    }
                    return "";
                },
                width: 80
            }, {
                header: '报告编号',
                dataIndex: 'baogaoId',
                width: 220
            }, {
                header: '委托单位',
                dataIndex: 'weituo',
                width: 230
            }, {
                header: '评估对象',
                dataIndex: 'pgdx'
            }, {
                header: '估价目的',
                dataIndex: 'gjmd'
            }, {
                header: '估价总值',
                dataIndex: 'pgzz'
            }, {
                header: '业务主办',
                dataIndex: 'ywzb',
                align: 'center',
                width: 80
            }, {
                header: '业务助理',
                dataIndex: 'ywzl',
                hidden: true,
                align: 'center'
            }, {
                header: '盖章日期',
                dataIndex: 'gzrq',
                renderer: function (value) {
                    if (value != null) {
                        return value.substring(0, 10);
                    }
                    return "";
                },
                width: 80
            }, {
                header: '收费日期',
                dataIndex: 'sfrq',
                renderer: function (value) {
                    if (value != null) {
                        return value.substring(0, 10);
                    }
                    return "";
                },
                width: 80
            }, {

                header: '管理',
                dataIndex: 'manage',
                align: 'center',
                width: 80,
                sortable: false,
                renderer: function (value, metadata, record, rowIndex,
                                    colIndex) {
                    var editId = record.data.businessId;
                    var str = '';
                    if (isHasRight('zc_del_link')) {
                        str += '<button title="删除" value=" " id="zc_del_link" class="btn-del" onclick="RealtyView.remove('
                            + editId + ')">&nbsp;&nbsp;</button>';
                    }
                    if (isHasRight('zc_edit_link')) {
                        str += '&nbsp;<button title="编辑" id="zc_edit_link" value=" " class="btn-edit" onclick="RealtyView.edit('
                            + editId + ')">&nbsp;&nbsp;</button>';
                    }
                    return str;
                }
            }],
            defaults: {
                sortable: true,
                menuDisabled: false,
                width: 100
            }
        });
        // 初始化工具栏
        this.topbar = new Ext.Toolbar({
            height: 30,
            bodyStyle: 'text-align:left',
            items: []
        });

        this.topbar.add(new Ext.Button({
            id: 'zc_add_btn',
            iconCls: 'btn-add',
            text: '登记业务',
            handler: this.createRecord
        }));

        this.topbar.add(new Ext.Button({
            id: 'zc_del_btn',
            iconCls: 'btn-del',
            text: '删除业务',
            handler: this.delRecords,
            scope: this
        }));
        this.topbar.add(new Ext.Button({
            id: 'zc_report_btn',
            text: '导出所选至Excel',
            iconCls: 'btn-xls',
            handler: this.reportRecords,
            scope: this
        }));

        this.topbar.add(new Ext.Button({
            id: 'zc_reportAll_btn',
            text: '导出所有至Excel',
            iconCls: 'btn-xls',
            handler: RealtyView.reportAll,
            scope: this
        }));

        this.topbar.add(new Ext.Button({
            id: 'zc_reportMy_btn',
            text: '导出我的业务',
            iconCls: 'btn-xls',
            handler: RealtyView.reportMy,
            scope: this
        }));

        this.gridPanel = new Ext.grid.GridPanel({
            id: 'RealtyGrid',
            region: 'center',
            stripeRows: true,
            tbar: this.topbar,
            store: this.store,
            trackMouseOver: true,
            disableSelection: false,
            loadMask: true,
            cm: cm,
            sm: sm,
            plugins: this.rowActions,
            viewConfig: {
                forceFit: true,
                autoFill: true, // 自动填充
                // showPreview : false
            },
            bbar: new HT.PagingBar({store: this.store})
        });

        this.gridPanel.addListener('rowdblclick', function (grid, rowindex, e) {
            grid.getSelectionModel().each(function (rec) {
                var id = rec.data.businessId;
                if (isHasViewDetailRight(rec.data)) {
                    RealtyView.edit(id);
                }
                else {
                    Ext.ux.Toast.msg('操作信息', '您没有查看其他人业务的权限！');
                }
            });
        });
        //权限控制
        validateAll();
        //判断管理权限,14列为管理
        this.gridPanel.getColumnModel().setHidden(14, !isHasRight('manage_column'));
        this.gridPanel.getColumnModel().setHidden(3, true);
    },// end of the initComponents()

    /**
     *
     * @param {}
     * self 当前窗体对象
     */
    search: function (self) {
        if (self.searchPanel.getForm().isValid()) {// 如果合法
            $search({
                searchPanel: self.searchPanel,
                gridPanel: self.gridPanel
            });
        }
    },

    // 重置查询表单
    reset: function () {
        this.searchPanel.getForm().reset();
    },
    // 行的Action
    onRowAction: function (grid, record, action, row, col) {
        /**switch (action) {
			case 'btn-del' :
				RealtyView.edit(record.data.businessId);
				break;
			case 'btn-edit' :
				RealtyView.remove(record.data.businessId);
				break;
			default :
				break;
		}**/
        Ext.Msg.alert('111');
    },
    /**
     * 登记业务
     */
    createRecord: function () {
        var tabs = Ext.getCmp('centerTabPanel');
        var realtyForm = Ext.getCmp('RealtyForm');
        if (realtyForm != null) {
            tabs.remove('RealtyForm');
        }
        realtyForm = new RealtyForm();
        tabs.add(realtyForm);
        tabs.activate(realtyForm);
    },
    /**
     * 删除记录
     *
     * @param {}
     * record
     */
    delRecords: function (record) {
        var gridPanel = Ext.getCmp('RealtyGrid');
        var selectRecords = gridPanel.getSelectionModel().getSelections();
        if (selectRecords.length == 0) {
            Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
            return;
        }
        var ids = Array();
        for (var i = 0; i < selectRecords.length; i++) {
            ids.push(selectRecords[i].data.businessId);
        }
        RealtyView.remove(ids);
    },

    /**
     * 导出记录
     *
     * @param {}
     * record
     */
    reportRecords: function (record) {
        var gridPanel = Ext.getCmp('RealtyGrid');
        var selectRecords = gridPanel.getSelectionModel().getSelections();
        if (selectRecords.length == 0) {
            Ext.ux.Toast.msg("信息", "请选择要导出的记录！");
            return;
        }
        var ids = Array();
        for (var i = 0; i < selectRecords.length; i++) {
            ids.push(selectRecords[i].data.businessId);
        }
        RealtyView.report(ids);
    }
});

/**
 * 删除记录
 */
RealtyView.remove = function (id) {
    var grid = Ext.getCmp("RealtyGrid");
    Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function (btn) {
        if (btn == 'yes') {
            Ext.Ajax.request({
                url: __ctxPath + '/realty/multiDelRealty.do',
                params: {
                    ids: id
                },
                method: 'POST',
                success: function (response, options) {
                    Ext.ux.Toast.msg('操作信息', '成功删除该记录！');
                    grid.getStore().reload();
                },
                failure: function (response, options) {
                    Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
                }
            });
        }
    });// end of comfirm
};


//加载中
var loadMask = new Ext.LoadMask(Ext.getBody(), {
    msg: '正在导出中...，请稍后！',
    removeMask: true
});


/**
 * 导出记录
 */
RealtyView.report = function (id) {
    var grid = Ext.getCmp("RealtyGrid");
    Ext.Msg.confirm('信息确认', '您确认要导出记录吗？', function (btn) {
        if (btn == 'yes') {
            RealtyView.showLoading();
            Ext.Ajax.request({
                url: __ctxPath + '/realty/multiReportRealty.do',
                params: {
                    ids: id
                },
                method: 'POST',
                success: function (response, options) {
                    var filepath = Ext.util.JSON.decode(response.responseText).data;
                    RealtyView.showDownload(filepath);
                },
                failure: function (response, options) {
                    Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
                }
            });
        }
    });// end of comfirm
};

/**
 * 导出所有记录
 */
RealtyView.reportAll = function () {
    var grid = Ext.getCmp("RealtyGrid");
    Ext.Msg.confirm('信息确认', '您确认要导出所有记录吗？', function (btn) {
        if (btn == 'yes') {
            RealtyView.showLoading();
            Ext.Ajax.request({
                url: __ctxPath + '/realty/reportAllRealty.do',
                params: {},
                method: 'POST',
                success: function (response, options) {
                    var filepath = Ext.util.JSON.decode(response.responseText).data;
                    RealtyView.showDownload(filepath);
                },
                failure: function (response, options) {
                    Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
                }
            });
        }
    });// end of comfirm
};

/**
 * 导出我的业务
 */
RealtyView.reportMy = function () {
    var grid = Ext.getCmp("RealtyGrid");
    Ext.Msg.confirm('信息确认', '您确认要导出所有我的业务记录吗？', function (btn) {
        if (btn == 'yes') {
            RealtyView.showLoading();
            Ext.Ajax.request({
                url: __ctxPath + '/realty/reportMyRealty.do',
                params: {},
                method: 'POST',
                success: function (response, options) {
                    var filepath = Ext.util.JSON.decode(response.responseText).data;
                    RealtyView.showDownload(filepath);
                },
                failure: function (response, options) {
                    Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
                }
            });
        }
    });// end of comfirm
};

//显示加载中
RealtyView.showLoading = function () {
    loadMask.show();
}

//显示下载
RealtyView.showDownload = function (filepath) {

    loadMask.hide();
    Ext.Msg.alert('操作信息', '记录导出成功，点击确定进行下载', download);
    function download() {
        window.open(filepath);
    }
}

/**
 * 编辑记录
 *
 * @param {}
 * record
 */
RealtyView.edit = function (id) {

    // 只允许有一个编辑窗口
    var tabs = Ext.getCmp('centerTabPanel');
    var edit = Ext.getCmp('RealtyForm');
    if (edit == null) {
        edit = new RealtyForm({
            businessId: id
        });
        tabs.add(edit);
    } else {
        tabs.remove('RealtyForm');
        edit = new RealtyForm({
            businessId: id
        });
        tabs.add(edit);
    }
    tabs.activate(edit);
}