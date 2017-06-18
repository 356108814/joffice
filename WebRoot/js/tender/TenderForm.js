/**
 * 标书表单
 */
TenderForm = Ext.extend(Ext.Panel, {
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
        TenderForm.superclass.constructor.call(this, {
            id: 'TenderForm',
            iconCls: 'menu-profile-create',
            layout: 'fit',
            items: this.formPanel,
            modal: true,
            tbar: this.topbar,
            maximizable: true,
            title: '标书登记信息',
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
            url: __ctxPath + '/tender/saveTender.do',
            id: 'TenderFormPanel',
            defaults: {
                anchor: '98%,98%'
            },
            defaultType: 'textfield',
            items: [{
                name: 'tender.id',
                id: 'tenderForm.id',
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
                    text: '登记号码:'
                }, {
                    name: 'tender.code',
                    width: 300,
                    xtype: 'textfield',
                    id: 'tenderForm.code',
                    allowBlank: false,
                    blankText: '登记号码不能为空!'
                }]
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
                        fieldLabel: '登记日期',
                        name: 'tender.regdate',
                        id: 'tenderForm.regdate',
                        xtype: 'datefield',
                        allowBlank: false,
                        value: new Date(),
                        format: 'Y-m-d'
                    }, {
                        fieldLabel: '发标单位',
                        name: 'tender.company',
                        id: 'tenderForm.company',
                        allowBlank: false
                    },
                        {
                            fieldLabel: '项目名称',
                            name: 'tender.project',
                            id: 'tenderForm.project',
                            allowBlank: false
                        },
                        {
                            fieldLabel: '标书报价',
                            name: 'tender.offer',
                            id: 'tenderForm.offer',
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
                            name: 'tender.sponsor',
                            id: 'tenderForm.sponsor',
                            allowBlank: false,
                            xtype: 'lovcombo',
                            mode: 'local',
                            editable: false,
                            valueField: 'tender.sponsor',
                            displayField: 'tender.sponsor',
                            triggerAction: 'all',
                            store: Data.employeeArray
                        },
                        {
                            fieldLabel: '核准人',
                            name: 'tender.verifier',
                            id: 'tenderForm.verifier',
                            allowBlank: false
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
                            name: 'tender.remark',
                            xtype: 'textarea',
                            id: 'tenderForm.remark'
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
                url: __ctxPath + '/tender/getTender.do?id=' + this.id,
                root: 'data',
                preName: 'tender',
                waitMsg: '正在载入数据...',
                success: function (response, options) {
                    var res = Ext.util.JSON.decode(response.responseText).data;
                    if (res.regdate != '' && res.regdate != null) {
                        var regdate = getDateFromFormat(res.regdate, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('tenderForm.regdate').setValue(new Date(regdate));
                    }
                    Ext.getCmp('tenderForm.sponsor').setValue(res.sponsor);
                },
                failure: function (response, options) {
                    Ext.Msg.alert('Error', response.failureType + "==" + response.responseText);
                }
            });
        }

    },// end of the initcomponents

    reset: function (formPanel) {
        formPanel.getForm().reset();
    },

    cancel: function (formPanel) {
        var tabs = Ext.getCmp('centerTabPanel');
        if (formPanel != null) {
            tabs.remove('TenderForm');
        }
    },

    save: function (formPanel, window) {
        if (formPanel.getForm().isValid()) {
            formPanel.getForm().submit({
                method: 'POST',
                waitMsg: '正在提交数据...',
                success: function (fp, action) {
                    Ext.ux.Toast.msg('操作信息', '成功保存信息！');
                    var gridPanel = Ext.getCmp('TenderGrid');
                    if (gridPanel != null) {
                        gridPanel.getStore().reload();
                        AppUtil.removeTab('TenderForm');
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
    }
});