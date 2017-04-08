/**
 * @author
 * @createtime
 * @class RealtyForm
 * @extends Ext.Window
 * @description Realty表单
 * @company 宏天软件
 */
RealtyForm = Ext.extend(Ext.Panel, {
    // 内嵌FormPanel
    formPanel: null,
    // 构造函数
    constructor: function (_cfg) {
        if (_cfg == null) {
            _cfg = {};
        }
        Ext.applyIf(this, _cfg);
        // 必须先初始化组件
        this.initComponents();
        RealtyForm.superclass.constructor.call(this, {
            id: 'RealtyForm',
            iconCls: 'menu-profile-create',
            layout: 'fit',
            items: this.formPanel,
            modal: true,
            tbar: this.topbar,
            maximizable: true,
            title: '房地产登记信息',
            buttonAlign: 'center',
            buttons: this.buttons
        });
    },// end of the constructor

    // 头部工具栏
    topbar: null,
    // 初始化组件
    initComponents: function () {
        var me = this;
        this.formPanel = new Ext.FormPanel({
            layout: 'form',
            autoScroll: true,
            tbar: this.topbar,
            bodyStyle: 'padding:10px 20px 10px 10px',
            border: false,
            url: __ctxPath + '/realty/saveRealty.do',
            id: 'RealtyFormPanel',
            defaults: {
                anchor: '98%,98%'
            },
            defaultType: 'textfield',
            items: [{
                name: 'realty.businessId',
                id: 'realtyForm.businessId',
                xtype: 'hidden',
                value: this.businessId
            }, {
                xtype: 'container',
                layout: 'column',
                height: 26,
                anchor: '100%',
                items: [{
                    xtype: 'label',
                    style: 'padding:3px 5px 0px 17px;',
                    text: '报告编号:'
                }, {
                    name: 'realty.baogaoId',
                    width: 300,
                    xtype: 'textfield',
                    id: 'realtyForm.baogaoId',
                    allowBlank: false,
                    blankText: '报告编号不能为空!'
                },
                {
                    xtype: 'label',
                    style: 'padding:3px 5px 0px 17px;',
                    text: '拿号年月:'
                },
                {
                    name: 'realty.ym',
                    id: 'realtyForm.ym',
                    xtype: 'datefield',
                    allowBlank: false,
                    format: 'Y-m',
                    value: new Date(),
                    listeners: {
                        "select": function (field, value) {
                            me.getNewBaogaoId(value);
                        }
                    }}
                ]
            },
                {
                    xtype: 'fieldset',
                    id: 'zc_BasePanel',
                    title: '基本信息',
                    defaultType: 'textfield',
                    layout: 'column',
                    items: [{
                        xtype: 'container',
                        columnWidth: .5,
                        defaultType: 'textfield',
                        layout: 'form',
                        defaults: {
                            anchor: '96%,96%'
                        },
                        items: [{
                            fieldLabel: '数字编号',
                            name: 'realty.myid',
                            id: 'realtyForm.myid',
                            allowBlank: false,
                            blankText: '数字编号不能为空!',
                            xtype: 'numberfield'
                        }, {
                            fieldLabel: '拿号日期',
                            name: 'realty.nhrq',
                            id: 'realtyForm.nhrq',
                            xtype: 'datefield',
                            value: new Date(),
                            allowBlank: false,
                            format: 'Y-m-d'
                        },
                            {
                                fieldLabel: '项目名称',
                                name: 'realty.xmmc',
                                id: 'realtyForm.xmmc',
                                allowBlank: false
                            },
                            {
                                fieldLabel: '项目地址',
                                name: 'realty.xmdz',
                                id: 'realtyForm.xmdz',
                                allowBlank: false
                            }, {
                                fieldLabel: '估价时点',
                                name: 'realty.gjsd',
                                id: 'realtyForm.gjsd',
                                xtype: 'datefield',
                                format: 'Y-m-d'
                            },
                            {
                                fieldLabel: '委托单位',
                                name: 'realty.weituo',
                                id: 'realtyForm.weituo',
                                allowBlank: false
                            },
                            /**
                             {
                                 fieldLabel : '估计对象',
                                 name : 'realty.pgdx',
                                 id : 'realtyForm.pgdx',
                                 allowBlank : false,
                                 xtype : 'combo',
                                 mode : 'local',
                                 editable : true,
                                 valueField : 'realty.pgdx',
                                 displayField : 'realty.pgdx',
                                 triggerAction : 'all',
                                 store : Data.pgdxArray
                             },
                             */
                            {
                                fieldLabel: '估价对象类型',
                                name: 'realty.gjdxlx',
                                id: 'realtyForm.gjdxlx',
                                allowBlank: false,
                                xtype: 'combo',
                                mode: 'local',
                                editable: false,
                                valueField: 'realty.gjdxlx',
                                displayField: 'realty.gjdxlx',
                                triggerAction: 'all',
                                store: Data.gjdxlxArray
                            },
                            {
                                fieldLabel: '价值类型',
                                name: 'realty.jzlx',
                                id: 'realtyForm.jzlx',
                                allowBlank: false,
                                xtype: 'combo',
                                mode: 'local',
                                editable: false,
                                valueField: 'realty.jzlx',
                                displayField: 'realty.jzlx',
                                triggerAction: 'all',
                                store: Data.jzlxArray
                            },
                            {
                                fieldLabel: '评估目的',
                                name: 'realty.gjmd',
                                id: 'realtyForm.gjmd',
                                allowBlank: false,
                                xtype: 'combo',
                                mode: 'local',
                                editable: false,
                                valueField: 'realty.gjmd',
                                displayField: 'realty.gjmd',
                                triggerAction: 'all',
                                store: Data.fdcgjmdArray
                            },
                            {
                                fieldLabel: '估价方法',
                                name: 'realty.gjff',
                                id: 'realtyForm.gjff',
                                allowBlank: false,
                                xtype: 'combo',
                                mode: 'local',
                                editable: false,
                                valueField: 'realty.gjff',
                                displayField: 'realty.gjff',
                                triggerAction: 'all',
                                store: Data.fdcgjffArray
                            },
                            {
                                fieldLabel: '建筑面积(平方米)',
                                name: 'realty.jzmj',
                                id: 'realtyForm.jzmj',
                                allowBlank: false,
                                xtype: 'numberfield'
                            },
                            {
                                fieldLabel: '土地面积(平方米)',
                                name: 'realty.tdmj',
                                id: 'realtyForm.tdmj',
                                allowBlank: false,
                                xtype: 'numberfield'
                            },
                            {
                                fieldLabel: '评估单价（元）',
                                name: 'realty.pgdj',
                                id: 'realtyForm.pgdj',
                                allowBlank: false,
                                xtype: 'numberfield'
                            },
                            {
                                fieldLabel: '评估总值（元）',
                                name: 'realty.pgzz',
                                id: 'realtyForm.pgzz',
                                allowBlank: false,
                                xtype: 'numberfield'
                            }]
                    },
                        {
                            xtype: 'container',
                            columnWidth: .35,
                            defaultType: 'textfield',
                            layout: 'form',
                            defaults: {
                                anchor: '96%,96%'
                            },
                            items: [{
                                fieldLabel: '业务主办',
                                name: 'realty.ywzb',
                                id: 'realtyForm.ywzb',
                                allowBlank: false,
                                xtype: 'lovcombo',
                                mode: 'local',
                                editable: false,
                                valueField: 'realty.ywzb',
                                displayField: 'realty.ywzb',
                                triggerAction: 'all',
                                store: Data.employeeArray
                            }, {
                                fieldLabel: '业务助理',
                                name: 'realty.ywzl',
                                id: 'realtyForm.ywzl',
                                xtype: 'lovcombo',
                                mode: 'local',
                                editable: false,
                                valueField: 'realty.ywzb',
                                displayField: 'realty.ywzb',
                                triggerAction: 'all',
                                store: Data.employeeArray
                            },
                                {
                                    fieldLabel: '现场勘查',
                                    name: 'realty.xckc',
                                    id: 'realtyForm.xckc',
                                    xtype: 'lovcombo',
                                    mode: 'local',
                                    editable: false,
                                    valueField: 'realty.xckc',
                                    displayField: 'realty.xckc',
                                    triggerAction: 'all',
                                    store: Data.employeeArray
                                },
                                {
                                    fieldLabel: '初评日期',
                                    name: 'realty.cprq',
                                    id: 'realtyForm.cprq',
                                    xtype: 'datefield',
                                    format: 'Y-m-d'
                                },
                                {
                                    fieldLabel: '报告拟写人',
                                    name: 'realty.bgr',
                                    id: 'realtyForm.bgr',
                                    xtype: 'combo',
                                    mode: 'local',
                                    editable: false,
                                    valueField: 'realty.bgr',
                                    displayField: 'realty.bgr',
                                    triggerAction: 'all',
                                    store: Data.employeeArray
                                },
                                {
                                    fieldLabel: '出报告日期',
                                    name: 'realty.cbgrq',
                                    id: 'realtyForm.cbgrq',
                                    xtype: 'datefield',
                                    format: 'Y-m-d'
                                },
                                {
                                    fieldLabel: '盖章日期',
                                    name: 'realty.gzrq',
                                    id: 'realtyForm.gzrq',
                                    xtype: 'datefield',
                                    format: 'Y-m-d'
                                },
                                {
                                    fieldLabel: '签字评估师',
                                    name: 'realty.qzpgs',
                                    id: 'realtyForm.qzpgs',
                                    xtype: 'lovcombo',
                                    mode: 'local',
                                    editable: false,
                                    valueField: 'realty.qzpgs',
                                    displayField: 'realty.qzpgs',
                                    triggerAction: 'all',
                                    store: Data.pgsArray
                                },
                                {
                                    fieldLabel: '合同编号',
                                    name: 'realty.ywht',
                                    id: 'realtyForm.ywht'
                                },
                                {
                                    fieldLabel: '报告份数',
                                    name: 'realty.bgfs',
                                    id: 'realtyForm.bgfs',
                                    xtype: 'combo',
                                    mode: 'local',
                                    valueField: 'realty.bgfs',
                                    displayField: 'realty.bgfs',
                                    triggerAction: 'all',
                                    store: Data.bgfsArray
                                },
                                {
                                    fieldLabel: '收款日期',
                                    name: 'realty.sfrq',
                                    id: 'realtyForm.sfrq',
                                    xtype: 'datefield',
                                    format: 'Y-m-d'
                                },
                                {
                                    fieldLabel: '合作方',
                                    name: 'realty.jjmc',
                                    id: 'realtyForm.jjmc',
                                    xtype: 'combo',
                                    mode: 'local',
                                    editable: true,
                                    valueField: 'realty.jjmc',
                                    displayField: 'realty.jjmc',
                                    triggerAction: 'all',
                                    store: Data.hezuoArray
                                },
                                {
                                    fieldLabel: '约定金额（元）',
                                    name: 'realty.ydje',
                                    id: 'realtyForm.ydje',
                                    xtype: 'numberfield'
                                },
                                {
                                    fieldLabel: '录入人',
                                    name: 'realty.username',
                                    readOnly: true,
                                    id: 'realtyForm.username'
                                }]
                        }, {
                            xtype: 'container',
                            columnWidth: .15,
                            defaultType: 'textfield',
                            layout: 'form',
                            labelWidth: 80,
                            defaults: {
                                anchor: '96%,96%'
                            },
                            items: [{
                                fieldLabel: '工作量（天）',
                                name: 'realty.zbgzl',
                                id: 'realtyForm.zbgzl',
                                xtype: 'numberfield'

                            }, {
                                fieldLabel: '工作量（天）',
                                name: 'realty.zlgzl',
                                id: 'realtyForm.zlgzl',
                                xtype: 'numberfield'
                            }, {
                                fieldLabel: '工作量（天）',
                                name: 'realty.kcgzl',
                                id: 'realtyForm.kcgzl',
                                xtype: 'numberfield'
                            }]
                        },
                        {
                            xtype: 'container',
                            columnWidth: 1,
                            defaultType: 'textfield',
                            layout: 'form',
                            defaults: {
                                anchor: '96%,96%'
                            },
                            items: [{
                                fieldLabel: '底稿说明',
                                name: 'realty.dgwcsm',
                                xtype: 'textarea',
                                id: 'realtyForm.dgwcsm'
                            }, {
                                fieldLabel: '备注',
                                name: 'realty.beizhu1',
                                xtype: 'textarea',
                                id: 'realtyForm.beizhu1'
                            }]

                        }]
                }, {
                    xtype: 'fieldset',
                    id: 'zc_costPanel',
                    title: '收费情况',
                    defaultType: 'textfield',
                    layout: 'column',
                    items: [{
                        xtype: 'container',
                        columnWidth: .5,
                        defaultType: 'textfield',
                        layout: 'form',
                        defaults: {
                            anchor: '96%,96%'
                        },
                        items: [{
                            fieldLabel: '报备号',
                            name: 'realty.baobeiId',
                            id: 'realtyForm.baobeiId'
                        }, {
                            fieldLabel: '开票金额（元）',
                            name: 'realty.kpje',
                            id: 'realtyForm.kpje',
                            xtype: 'numberfield'
                        }, {
                            fieldLabel: '到账金额（元）',
                            name: 'realty.dzje',
                            id: 'realtyForm.dzje',
                            xtype: 'numberfield'
                        }, {
                            fieldLabel: '实收金额（元）',
                            name: 'realty.ssje',
                            id: 'realtyForm.ssje',
                            xtype: 'numberfield'
                        }]
                    }, {
                        xtype: 'container',
                        columnWidth: .5,
                        defaultType: 'textfield',
                        layout: 'form',
                        defaults: {
                            anchor: '96%,96%'
                        },
                        items: [{
                            fieldLabel: '中介方比例（%）',
                            name: 'realty.zjbl',
                            id: 'realtyForm.zjbl',
                            xtype: 'numberfield'
                        }, {
                            fieldLabel: '是否已付中介费',
                            name: 'realty.sfyfzjf',
                            id: 'realtyForm.sfyfzjf',
                            xtype: 'combo',
                            mode: 'local',
                            value: '否',
                            editable: false,
                            allowBlank: false,
                            valueField: 'standardName',
                            displayField: 'standardName',
                            triggerAction: 'all',
                            store: ['是', '否']
                        }, {
                            fieldLabel: '收款方式',
                            name: 'realty.skfs',
                            id: 'realtyForm.skfs'
                        }]

                    }, {
                        xtype: 'container',
                        columnWidth: 1,
                        defaultType: 'textfield',
                        layout: 'form',
                        defaults: {
                            anchor: '96%,96%'
                        },
                        items: [{
                            fieldLabel: '备注',
                            name: 'realty.beizhu2',
                            xtype: 'textarea',
                            id: 'realtyForm.beizhu2'
                        }]
                    }]
                }
            ]
        });
        this.topbar = new Ext.Toolbar({
            height: 30,
            bodyStyle: 'text-align:left',
            defaultType: 'button',
            items: [
                {
                    id: 'zc_save_btn',
                    text: '保存',
                    iconCls: 'btn-save',
                    handler: this.save.createCallback(
                        this.formPanel, this)
                },
                {
                    text: '重置',
                    iconCls: 'btn-reset',
                    handler: this.reset.createCallback(this.formPanel)
                }, {
                    text: '取消',
                    iconCls: 'btn-cancel',
                    handler: this.cancel.createCallback(this)
                }]
        })
        // 加载表单对应的数据
        if (this.businessId != null && this.businessId != 'undefined') {
            this.formPanel.loadData({
                deferredRender: false,

                url: __ctxPath
                + '/realty/getRealty.do?businessId='
                + this.businessId,
                root: 'data',
                preName: 'realty',
                waitMsg: '正在载入数据...',
                success: function (response, options) {
                    var res = Ext.util.JSON.decode(response.responseText).data;
                    if (res.nhrq != '' && res.nhrq != null) {
                        var nhrq = getDateFromFormat(res.nhrq, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('realtyForm.nhrq').setValue(new Date(nhrq));
                    }
                    if (res.cprq != '' && res.cprq != null) {
                        var cprq = getDateFromFormat(res.cprq, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('realtyForm.cprq').setValue(new Date(cprq));
                    }
                    if (res.gzrq != '' && res.gzrq != null) {
                        var gzrq = getDateFromFormat(res.gzrq, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('realtyForm.gzrq').setValue(new Date(gzrq));
                    }
                    if (res.sfrq != '' && res.sfrq != null) {
                        var sfrq = getDateFromFormat(res.sfrq, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('realtyForm.sfrq').setValue(new Date(sfrq));
                    }
                    if (res.cbgrq != '' && res.cbgrq != null) {
                        var cbgrq = getDateFromFormat(res.cbgrq, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('realtyForm.cbgrq').setValue(new Date(cbgrq));
                    }
                    if (res.gjsd != '' && res.gjsd != null) {
                        var gjsd = getDateFromFormat(res.gjsd, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('realtyForm.gjsd').setValue(new Date(gjsd));
                    }

                    //多选下拉框赋值
                    var fields = ['ywzb', 'ywzl', 'xckc', 'qzpgs'];
                    for (var i=0; i < fields.length; i++) {
                        var field = fields[i];
                        Ext.getCmp('realtyForm.' + field).setValue(res[field]);
                    }
                },
                failure: function (response, options) {
                    Ext.Msg.alert('Error', response.failureType + "==" + response.responseText);
                }
            });
        }

        //生成新的报告编号
        if (this.businessId == null || this.businessId == 'undefined') {
            var date = Ext.getCmp('realtyForm.ym').getValue();
            me.getNewBaogaoId(date);
        }

        //权限控制
        validateAll();

    },// end of the initcomponents

    reset: function (formPanel) {
        formPanel.getForm().reset();
    },

    cancel: function (formPanel) {
        var tabs = Ext.getCmp('centerTabPanel');
        if (formPanel != null) {
            tabs.remove('RealtyForm');
        }
    },
    /**
     * 保存记录
     */
    save: function (formPanel, window) {
        if (formPanel.getForm().isValid()) {
            formPanel.getForm().submit({
                method: 'POST',
                waitMsg: '正在提交数据...',
                success: function (fp, action) {
                    Ext.ux.Toast.msg('操作信息', '成功保存信息！');
                    var gridPanel = Ext.getCmp('RealtyGrid');
                    if (gridPanel != null) {
                        gridPanel.getStore().reload();
                        AppUtil.removeTab('RealtyForm');
                    }
                },
                failure: function (fp, action) {
                    Ext.MessageBox.show({
                        title: '操作信息',
                        msg: action.result.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });
        }
    },// end of save

    /**
     * 获取新报告号
     * @param value 日期
     */
    getNewBaogaoId: function (value) {
        this.formPanel.loadData({
            deferredRender: false,
            url: __ctxPath + '/realty/getNewBaogaoIdRealty.do?date=' + value.format('Y-m-d'),
            root: 'data',
            success: function (response, options) {
                var baogaoId = Ext.util.JSON.decode(response.responseText).data;
                Ext.getCmp('realtyForm.baogaoId').setValue(baogaoId);
            }
        })
    }
});