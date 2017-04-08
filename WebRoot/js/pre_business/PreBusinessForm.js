/**
 * 初评表单
 */
PreBusinessForm = Ext.extend(Ext.Panel, {
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
        PreBusinessForm.superclass.constructor.call(this, {
            id: 'PreBusinessForm',
            iconCls: 'menu-profile-create',
            layout: 'fit',
            items: this.formPanel,
            modal: true,
            tbar: this.topbar,
            maximizable: true,
            title: '初评登记信息',
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
            url: __ctxPath + '/preBusiness/savePreBusiness.do',
            id: 'PreBusinessFormPanel',
            defaults: {
                anchor: '98%,98%'
            },
            defaultType: 'textfield',
            items: [{
                name: 'business.id',
                id: 'businessForm.id',
                xtype: 'hidden',
                value: this.id
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
                    name: 'business.code',
                    width: 300,
                    xtype: 'textfield',
                    id: 'businessForm.code',
                    allowBlank: false,
                    blankText: '报告编号不能为空!'
                },
                    {
                        xtype: 'label',
                        style: 'padding:3px 5px 0px 17px;',
                        text: '拿号年月:'
                    },
                    {
                        name: 'business.ym',
                        id: 'businessForm.ym',
                        xtype: 'datefield',
                        allowBlank: false,
                        format: 'Y-m',
                        value: new Date(),
                        listeners: {
                            "select": function (field, value) {
                                me.getNewBaogaoId(value);
                            }
                        }
                    }
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
                        fieldLabel: '拿号日期',
                        name: 'business.nhrq',
                        id: 'businessForm.nhrq',
                        xtype: 'datefield',
                        allowBlank: false,
                        value: new Date(),
                        format: 'Y-m-d'
                    }, {
                        fieldLabel: '委托单位',
                        name: 'business.weituo',
                        id: 'businessForm.weituo',
                        allowBlank: false
                    },
                        {
                            fieldLabel: '评估对象',
                            name: 'business.pgdx',
                            id: 'businessForm.pgdx',
                            allowBlank: false,
                            xtype: 'combo',
                            mode: 'local',
                            editable: false,
                            valueField: 'business.pgdx',
                            displayField: 'business.pgdx',
                            triggerAction: 'all',
                            store: Data.pgdxArray
                        },
                        {
                            fieldLabel: '评估总值（元）',
                            name: 'business.pgzz',
                            id: 'businessForm.pgzz',
                            allowBlank: false,
                            xtype: 'numberfield'
                        }]
                },
                    {
                        xtype: 'container',
                        columnWidth: .5,
                        defaultType: 'textfield',
                        layout: 'form',
                        defaults: {
                            anchor: '96%,96%'
                        },
                        items: [{
                            fieldLabel: '业务主办',
                            name: 'business.ywzb',
                            id: 'businessForm.ywzb',
                            allowBlank: false,
                            xtype: 'lovcombo',
                            mode: 'local',
                            editable: false,
                            valueField: 'business.ywzb',
                            displayField: 'business.ywzb',
                            triggerAction: 'all',
                            store: Data.employeeArray
                        },
                        {
                            fieldLabel: '签字评估师',
                            name: 'business.qzpgs',
                            id: 'businessForm.qzpgs',
                            xtype: 'lovcombo',
                            mode: 'local',
                            editable: false,
                            valueField: 'business.qzpgs',
                            displayField: 'business.qzpgs',
                            triggerAction: 'all',
                            store: Data.pgsArray
                        },
                        {
                            fieldLabel: '盖章日期',
                            name: 'business.gzrq',
                            id: 'businessForm.gzrq',
                            xtype: 'datefield',
                            format: 'Y-m-d'
                        },
                        {
                            fieldLabel: '录入人',
                            name: 'business.realName',
                            readOnly: true,
                            id: 'businessForm.realName'
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
                        items: []
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
                            fieldLabel: '备注',
                            name: 'business.beizhu',
                            xtype: 'textarea',
                            id: 'businessForm.beizhu'
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
        });

        // 加载表单对应的数据
        if (this.id != null && this.id != 'undefined') {
            this.formPanel.loadData({
                deferredRender: false,
                url: __ctxPath + '/preBusiness/getPreBusiness.do?id=' + this.id,
                root: 'data',
                preName: 'business',
                waitMsg: '正在载入数据...',
                success: function (response, options) {
                    var res = Ext.util.JSON.decode(response.responseText).data;
                    if (res.nhrq != '' && res.nhrq != null) {
                        var nhrq = getDateFromFormat(res.nhrq, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('businessForm.nhrq').setValue(new Date(nhrq));
                    }
                    if (res.gzrq != '' && res.gzrq != null) {
                        var gzrq = getDateFromFormat(res.gzrq, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('businessForm.gzrq').setValue(new Date(gzrq));
                    }
                    Ext.getCmp('businessForm.ywzb').setValue(res.ywzb);
                    Ext.getCmp('businessForm.qzpgs').setValue(res.qzpgs);
                },
                failure: function (response, options) {
                    Ext.Msg.alert('Error', response.failureType + "==" + response.responseText);
                }
            });
        }

        //生成新的报告编号
        if (this.id == null || this.id == 'undefined') {
            var date = Ext.getCmp('businessForm.ym').getValue();
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
            tabs.remove('PreBusinessForm');
        }
    },

    save: function (formPanel, window) {
        if (formPanel.getForm().isValid()) {
            formPanel.getForm().submit({
                method: 'POST',
                waitMsg: '正在提交数据...',
                success: function (fp, action) {
                    Ext.ux.Toast.msg('操作信息', '成功保存信息！');
                    var gridPanel = Ext.getCmp('PreBusinessGrid');
                    if (gridPanel != null) {
                        gridPanel.getStore().reload();
                        AppUtil.removeTab('PreBusinessForm');
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
            url: __ctxPath + '/preBusiness/getNewBaogaoIdPreBusiness.do?date=' + value.format('Y-m-d'),
            root: 'data',
            success: function (response, options) {
                var baogaoId = Ext.util.JSON.decode(response.responseText).data;
                Ext.getCmp('businessForm.code').setValue(baogaoId);
            }
        })
    }
});