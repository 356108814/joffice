/**
 * 初评管理
 */
Ext.ns('PreBusinessView');
PreBusinessView = Ext.extend(Ext.Panel, {
    // 构造函数
    constructor: function (_cfg) {
        if (_cfg == null) {
            _cfg = {};
        }
        Ext.apply(this, _cfg);
        // 初始化组件
        this.initComponents();
        // 调用父类构造
        PreBusinessView.superclass.constructor.call(this, {
            id: 'PreBusinessView',
            title: '初评管理',
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
                        name: 'Q_code_S_LK',
                        xtype: 'textfield',
                        maxLength: 125
                    }, {
                        width: '90%',
                        fieldLabel: '委托单位',
                        name: 'Q_weituo_S_LK',
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
                        fieldLabel: '拿号日期',
                        items: [{
                            columnWidth: .49,
                            name: 'Q_nhrq_D_GE',
                            xtype: 'datefield',
                            format: 'Y-m-d'
                        }, {
                            xtype: 'label',
                            text: '至',
                            style: 'margin-top:3px;'
                        }, {
                            columnWidth: .49,
                            name: 'Q_nhrq_D_LE',
                            xtype: 'datefield',
                            format: 'Y-m-d'
                        }]
                    }, {
                        width: '90%',
                        fieldLabel: '评估对象',
                        name: 'Q_pgdx_S_LK',
                        maxLength: 125,
                        xtype: 'combo',
                        mode: 'local',
                        editable: false,
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
                        fieldLabel: '是否已出报告',
                        name: 'Q_isReport_S_LK',
                        xtype: 'combo',
                        mode: 'local',
                        editable: false,
                        triggerAction: 'all',
                        store: ["是", "否"]
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
            url: __ctxPath + "/preBusiness/listPreBusiness.do",
            baseParams: {
                //"Q_delFlag_SN_EQ" : 0
            },// 只查询未被删除的业务
            root: 'result',
            totalProperty: 'totalCounts',
            remoteSort: true,
            fields: [{
                name: 'id',
                type: 'int'
            }, 'nhrq', 'code', 'weituo',
                'pgdx', 'pgzz', 'ywzb',
                'gzrq', 'isReport', 'real_name']
        });
        this.store.setDefaultSort('id', 'desc');
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
                header: 'id',
                dataIndex: 'id',
                hideable: false,
                hidden: true
            },{
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
                dataIndex: 'code',
                width: 220
            }, {
                header: '委托单位',
                dataIndex: 'weituo',
                width: 230
            }, {
                header: '评估对象',
                dataIndex: 'pgdx'
            },{
                header: '估价总值',
                dataIndex: 'pgzz'
            }, {
                header: '业务主办',
                dataIndex: 'ywzb',
                align: 'center',
                width: 80
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
            },  {
                header: '是否已出报告',
                dataIndex: 'isReport'
            }, {

                header: '管理',
                dataIndex: 'manage',
                align: 'center',
                width: 80,
                sortable: false,
                renderer: function (value, metadata, record, rowIndex, colIndex) {
                    var editId = record.data.id;
                    var str = '';
                    if (isHasRight('zc_del_link')) {
                        str += '<button title="删除" value=" " id="zc_del_link" class="btn-del" onclick="PreBusinessView.remove('
                            + editId + ')">&nbsp;&nbsp;</button>';
                    }
                    if (isHasRight('zc_edit_link')) {
                        str += '&nbsp;<button title="编辑" id="zc_edit_link" value=" " class="btn-edit" onclick="PreBusinessView.edit('
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
            text: '新增初评',
            handler: this.createRecord
        }));

        this.topbar.add(new Ext.Button({
            id: 'zc_del_btn',
            iconCls: 'btn-del',
            text: '删除初评',
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
            handler: PreBusinessView.reportAll,
            scope: this
        }));

        this.topbar.add(new Ext.Button({
            id: 'zc_reportMy_btn',
            text: '导出我的初评',
            iconCls: 'btn-xls',
            handler: PreBusinessView.reportMy,
            scope: this
        }));

        this.gridPanel = new Ext.grid.GridPanel({
            id: 'PreBusinessGrid',
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
                var id = rec.data.id;
                if (isHasViewDetailRight(rec.data)) {
                    PreBusinessView.edit(id);
                }
                else {
                    Ext.ux.Toast.msg('操作信息', '您没有查看其他人业务的权限！');
                }
            });
        });

        //权限控制
        validateAll();
        //判断管理权限,10列为管理
        this.gridPanel.getColumnModel().setHidden(10, !isHasRight('manage_column'));

    },// end of the initComponents()

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

    createRecord: function () {
        var tabs = Ext.getCmp('centerTabPanel');
        var preBusinessForm = Ext.getCmp('PreBusinessForm');
        if (preBusinessForm != null) {
            tabs.remove('PreBusinessForm');
        }
        preBusinessForm = new PreBusinessForm();
        tabs.add(preBusinessForm);
        tabs.activate(preBusinessForm);
    },

    delRecords: function (record) {
        var gridPanel = Ext.getCmp('PreBusinessGrid');
        var selectRecords = gridPanel.getSelectionModel().getSelections();
        if (selectRecords.length == 0) {
            Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
            return;
        }
        var ids = [];
        for (var i = 0; i < selectRecords.length; i++) {
            ids.push(selectRecords[i].data.id);
        }
        PreBusinessView.remove(ids);
    },

    reportRecords: function (record) {
        var gridPanel = Ext.getCmp('PreBusinessGrid');
        var selectRecords = gridPanel.getSelectionModel().getSelections();
        if (selectRecords.length == 0) {
            Ext.ux.Toast.msg("信息", "请选择要导出的记录！");
            return;
        }
        var ids = [];
        for (var i = 0; i < selectRecords.length; i++) {
            ids.push(selectRecords[i].data.id);
        }
        PreBusinessView.report(ids);
    }
});

/**
 * 删除记录
 */
PreBusinessView.remove = function (id) {
    var grid = Ext.getCmp("PreBusinessGrid");
    Ext.Msg.confirm('信息确认', '您确认要删除该记录吗？', function (btn) {
        if (btn == 'yes') {
            Ext.Ajax.request({
                url: __ctxPath + '/preBusiness/multiDelPreBusiness.do',
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
PreBusinessView.report = function (id) {
    var grid = Ext.getCmp("PreBusinessGrid");
    Ext.Msg.confirm('信息确认', '您确认要导出记录吗？', function (btn) {
        if (btn == 'yes') {
            PreBusinessView.showLoading();
            Ext.Ajax.request({
                url: __ctxPath + '/preBusiness/multiReportPreBusiness.do',
                params: {
                    ids: id
                },
                method: 'POST',
                success: function (response, options) {
                    var filepath = Ext.util.JSON.decode(response.responseText).data;
                    PreBusinessView.showDownload(filepath);
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
PreBusinessView.reportAll = function () {
    var grid = Ext.getCmp("PreBusinessGrid");
    Ext.Msg.confirm('信息确认', '您确认要导出所有记录吗？', function (btn) {
        if (btn == 'yes') {
            PreBusinessView.showLoading();
            Ext.Ajax.request({
                url: __ctxPath + '/preBusiness/reportAllPreBusiness.do',
                params: {},
                method: 'POST',
                success: function (response, options) {
                    var filepath = Ext.util.JSON.decode(response.responseText).data;
                    PreBusinessView.showDownload(filepath);
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
PreBusinessView.reportMy = function () {
    var grid = Ext.getCmp("PreBusinessGrid");
    Ext.Msg.confirm('信息确认', '您确认要导出所有我的业务记录吗？', function (btn) {
        if (btn == 'yes') {
            PreBusinessView.showLoading();
            Ext.Ajax.request({
                url: __ctxPath + '/preBusiness/reportMyPreBusiness.do',
                params: {},
                method: 'POST',
                success: function (response, options) {
                    var filepath = Ext.util.JSON.decode(response.responseText).data;
                    PreBusinessView.showDownload(filepath);
                },
                failure: function (response, options) {
                    Ext.ux.Toast.msg('操作信息', '操作出错，请联系管理员！');
                }
            });
        }
    });// end of comfirm
};

//显示加载中
PreBusinessView.showLoading = function () {
    loadMask.show();
}

//显示下载
PreBusinessView.showDownload = function (filepath) {

    loadMask.hide();
    Ext.Msg.alert('操作信息', '记录导出成功，点击确定进行下载', download);
    function download() {
        window.open(filepath);
    }
};

PreBusinessView.edit = function (id) {
    // 只允许有一个编辑窗口
    var tabs = Ext.getCmp('centerTabPanel');
    var edit = Ext.getCmp('PreBusinessForm');
    if (edit != null) {
        tabs.remove('PreBusinessForm');
    }
    edit = new PreBusinessForm({
        id: id
    });
    tabs.add(edit);
    tabs.activate(edit);
};