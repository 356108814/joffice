/**
 * 资产
 */
BusinessForm = Ext.extend(Ext.Panel, {
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
        BusinessForm.superclass.constructor.call(this, {
            id: 'BusinessForm',
            iconCls: 'menu-profile-create',
            layout: 'fit',
            items: this.formPanel,
            modal: true,
            tbar: this.topbar,
            maximizable: true,
            title: '资产业务登记信息',
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
            url: __ctxPath + '/business/saveBusiness.do',
            id: 'BusinessFormPanel',
            defaults: {
                anchor: '98%,98%'
            },
            defaultType: 'textfield',
            items: [{
                name: 'business.businessId',
                id: 'businessForm.businessId',
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
                    name: 'business.baogaoId',
                    width: 300,
                    xtype: 'textfield',
                    id: 'businessForm.baogaoId',
                    allowBlank: false,
                    blankText: '报告编号不能为空!'
                },
                //     {
                //     xtype: 'label',
                //     style: 'padding:3px 5px 0px 17px;',
                //     text: '上次报告编号:'
                // }, {
                //     name: 'business.preBaogaoId',
                //     width: 300,
                //     readOnly: true,
                //     xtype: 'textfield',
                //     id: 'businessForm.preBaogaoId'
                // },{
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
                }}
            ]},
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
                            fieldLabel: '初评号',
                            name: 'business.preCode',
                            id: 'businessForm.preCode',
                            allowBlank: true,
                            xtype: 'textfield',
                            listeners: {
                                blur: function (field) {
                                    me.loadPreBusiness(field.getValue())
                                }
                            }
                        }, {
                            fieldLabel: '拿号日期',
                            name: 'business.nhrq',
                            id: 'businessForm.nhrq',
                            xtype: 'datefield',
                            allowBlank: false,
                            format: 'Y-m-d'
                        },
                            {
                                fieldLabel: '项目名称',
                                name: 'business.xmmc',
                                id: 'businessForm.xmmc',
                                allowBlank: false
                            },
                            {
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
                                editable: true,
                                valueField: 'business.pgdx',
                                displayField: 'business.pgdx',
                                triggerAction: 'all',
                                store: Data.pgdxArray
                            },
                            {
                                fieldLabel: '评估目的',
                                name: 'business.gjmd',
                                id: 'businessForm.gjmd',
                                allowBlank: false,
                                xtype: 'combo',
                                mode: 'local',
                                editable: true,
                                valueField: 'business.gjmd',
                                displayField: 'business.gjmd',
                                triggerAction: 'all',
                                store: Data.gjmdArray
                            },
                            {
                                fieldLabel: '估价方法',
                                name: 'business.gjff',
                                id: 'businessForm.gjff',
                                allowBlank: false,
                                xtype: 'combo',
                                mode: 'local',
                                editable: true,
                                valueField: 'business.gjff',
                                displayField: 'business.gjff',
                                triggerAction: 'all',
                                store: Data.gjffArray
                            },
                            {
                                fieldLabel: '评估总值（元）',
                                name: 'business.pgzz',
                                id: 'businessForm.pgzz',
                                allowBlank: false,
                                xtype: 'numberfield'
                            },
                            //{
                            //	fieldLabel : '标准收费（元）',
                            //	name : 'business.bzsf',
                            //	id : 'businessForm.bzsf'
                            //},
                            {
                                fieldLabel: '合作方',
                                name: 'business.jjmc',
                                id: 'businessForm.jjmc',
                                xtype: 'combo',
                                mode: 'local',
                                editable: true,
                                valueField: 'business.jjmc',
                                displayField: 'business.jjmc',
                                triggerAction: 'all',
                                store: Data.hezuoArray
                            },
                            {
                                fieldLabel: '约定金额（元）',
                                name: 'business.ydje',
                                id: 'businessForm.ydje',
                                xtype: 'numberfield'
                            },
                            {
                                fieldLabel: '合同编号',
                                name: 'business.ywht',
                                id: 'businessForm.ywht'
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
                            }, {
                                fieldLabel: '业务助理',
                                name: 'business.ywzl',
                                id: 'businessForm.ywzl',
                                xtype: 'lovcombo',
                                mode: 'local',
                                editable: false,
                                valueField: 'business.ywzb',
                                displayField: 'business.ywzb',
                                triggerAction: 'all',
                                store: Data.employeeArray
                            },
                                {
                                    fieldLabel: '现场勘查',
                                    name: 'business.xckc',
                                    id: 'businessForm.xckc',
                                    xtype: 'lovcombo',
                                    mode: 'local',
                                    editable: false,
                                    valueField: 'business.xckc',
                                    displayField: 'business.xckc',
                                    triggerAction: 'all',
                                    store: Data.employeeArray
                                },
                                {
                                    fieldLabel: '初评日期',
                                    name: 'business.cprq',
                                    id: 'businessForm.cprq',
                                    xtype: 'datefield',
                                    format: 'Y-m-d'
                                },
                                {
                                    fieldLabel: '报告拟写人',
                                    name: 'business.bgr',
                                    id: 'businessForm.bgr',
                                    xtype: 'combo',
                                    mode: 'local',
                                    editable: false,
                                    valueField: 'business.bgr',
                                    displayField: 'business.bgr',
                                    triggerAction: 'all',
                                    store: Data.employeeArray
                                },
                                {
                                    fieldLabel: '出报告日期',
                                    name: 'business.cbgrq',
                                    id: 'businessForm.cbgrq',
                                    xtype: 'datefield',
                                    format: 'Y-m-d'
                                },
                                {
                                    fieldLabel: '盖章日期',
                                    name: 'business.gzrq',
                                    id: 'businessForm.gzrq',
                                    xtype: 'datefield',
                                    format: 'Y-m-d'
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
                                    fieldLabel: '报告份数',
                                    name: 'business.bgfs',
                                    id: 'businessForm.bgfs',
                                    xtype: 'combo',
                                    mode: 'local',
                                    valueField: 'business.bgfs',
                                    displayField: 'business.bgfs',
                                    triggerAction: 'all',
                                    store: Data.bgfsArray
                                },
                                {
                                    fieldLabel: '收款日期',
                                    name: 'business.sfrq',
                                    id: 'businessForm.sfrq',
                                    xtype: 'datefield',
                                    format: 'Y-m-d'
                                },
                                {
                                    fieldLabel: '录入人',
                                    name: 'business.username',
                                    readOnly: true,
                                    id: 'businessForm.username'
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
                                name: 'business.zbgzl',
                                id: 'businessForm.zbgzl',
                                xtype: 'numberfield'

                            }, {
                                fieldLabel: '工作量（天）',
                                name: 'business.zlgzl',
                                id: 'businessForm.zlgzl',
                                xtype: 'numberfield'
                            }, {
                                fieldLabel: '工作量（天）',
                                name: 'business.kcgzl',
                                id: 'businessForm.kcgzl',
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
                                name: 'business.dgwcsm',
                                xtype: 'textarea',
                                id: 'businessForm.dgwcsm'
                            }, {
                                fieldLabel: '备注',
                                name: 'business.beizhu1',
                                xtype: 'textarea',
                                id: 'businessForm.beizhu1'
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
                            name: 'business.baobeiId',
                            id: 'businessForm.baobeiId'
                        }, {
                            fieldLabel: '开票金额（元）',
                            name: 'business.kpje',
                            id: 'businessForm.kpje',
                            xtype: 'numberfield'
                        }, {
                            fieldLabel: '到账金额（元）',
                            name: 'business.dzje',
                            id: 'businessForm.dzje',
                            xtype: 'numberfield'
                        }, {
                            fieldLabel: '实收金额（元）',
                            name: 'business.ssje',
                            id: 'businessForm.ssje',
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
                            name: 'business.zjbl',
                            id: 'businessForm.zjbl',
                            xtype: 'numberfield'
                        }, {
                            fieldLabel: '是否已付中介费',
                            name: 'business.sfyfzjf',
                            id: 'businessForm.sfyfzjf',
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
                            name: 'business.skfs',
                            id: 'businessForm.skfs'
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
                            name: 'business.beizhu2',
                            xtype: 'textarea',
                            id: 'businessForm.beizhu2'
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
        if (this.businessId != null && this.businessId != 'undefined') {
            this.formPanel.loadData({
                deferredRender: false,

                url: __ctxPath
                + '/business/getBusiness.do?businessId='
                + this.businessId,
                root: 'data',
                preName: 'business',
                waitMsg: '正在载入数据...',
                success: function (response, options) {
                    var res = Ext.util.JSON.decode(response.responseText).data;
                    if (res.nhrq != '' && res.nhrq != null) {
                        var nhrq = getDateFromFormat(res.nhrq, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('businessForm.nhrq').setValue(new Date(nhrq));
                    }
                    if (res.cprq != '' && res.cprq != null) {
                        var cprq = getDateFromFormat(res.cprq, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('businessForm.cprq').setValue(new Date(cprq));
                    }
                    if (res.gzrq != '' && res.gzrq != null) {
                        var gzrq = getDateFromFormat(res.gzrq, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('businessForm.gzrq').setValue(new Date(gzrq));
                    }
                    if (res.sfrq != '' && res.sfrq != null) {
                        var sfrq = getDateFromFormat(res.sfrq, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('businessForm.sfrq').setValue(new Date(sfrq));
                    }
                    if (res.cbgrq != '' && res.cbgrq != null) {
                        var cbgrq = getDateFromFormat(res.cbgrq, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('businessForm.cbgrq').setValue(new Date(cbgrq));
                    }
                    //多选下拉框赋值
                    var fields = ['ywzb', 'ywzl', 'xckc', 'qzpgs'];
                    for (var i=0; i < fields.length; i++) {
                        var field = fields[i];
                        Ext.getCmp('businessForm.' + field).setValue(res[field]);
                    }
                },
                failure: function (response, options) {
                    Ext.Msg.alert('Error', response.failureType + "==" + response.responseText);
                }
            });
        }

        //加载最后报告编号
        // this.loadData({
        //     deferredRender: false,
        //     url: __ctxPath + '/business/getLastBaogaoIdBusiness.do',
        //     root: 'data',
        //     success: function (response, options) {
        //         var res = Ext.util.JSON.decode(response.responseText).data;
        //         // Ext.getCmp('businessForm.preBaogaoId').setValue(res);
        //     },
        //     failure: function (response, options) {
        //         Ext.Msg.alert('Error', response.failureType + "==" + response.responseText);
        //     }
        // });

        //生成新的报告编号
        if (this.businessId == null || this.businessId == 'undefined') {
            var date = Ext.getCmp('businessForm.ym').getValue();
            me.getNewBaogaoId(date);
            // this.loadData({
            //     deferredRender: false,
            //     url: __ctxPath + '/business/getNewBaogaoIdBusiness.do',
            //     root: 'data',
            //     success: function (response, options) {
            //         var res = Ext.util.JSON.decode(response.responseText).data;
            //         Ext.getCmp('businessForm.baogaoId').setValue(res);
            //
            //         //填充数字编号4001,4表示2014
            //         var date = new Date();
            //         var indexS = "";
            //         var year = (date.getFullYear() + "").substring(3);
            //         var index = parseInt(res.substr(17, 3));
            //         if (index < 10) {
            //             indexS += "0" + index;
            //         }
            //         else {
            //             indexS = index;
            //         }
            //         if (index < 100) {
            //             indexS = "0" + indexS;
            //         }
            //         else {
            //             indexS = index;
            //         }
            //         Ext.getCmp('businessForm.myid').setValue(year + indexS);
            //     },
            //     failure: function (response, options) {
            //         Ext.Msg.alert('Error', response.failureType + "==" + response.responseText);
            //     }
            // });
        }

        //权限控制
        validateAll();

    },// end of the initcomponents

    /**
     * 重置
     *
     * @param {}
     *            formPanel
     */
    reset: function (formPanel) {
        formPanel.getForm().reset();
    },
    /**
     * 取消
     *
     * @param {}
     *            window
     */
    cancel: function (formPanel) {
        var tabs = Ext.getCmp('centerTabPanel');
        if (formPanel != null) {
            tabs.remove('BusinessForm');
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
                    var gridPanel = Ext.getCmp('BusinessGrid');
                    if (gridPanel != null) {
                        gridPanel.getStore().reload();
                        AppUtil.removeTab('BusinessForm');
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
            url: __ctxPath + '/business/getNewBaogaoIdBusiness.do?date=' + value.format('Y-m-d'),
            root: 'data',
            success: function (response, options) {
                var baogaoId = Ext.util.JSON.decode(response.responseText).data;
                Ext.getCmp('businessForm.baogaoId').setValue(baogaoId);
            }
        })
    },

    /**
     * 加载初评信息
     * @param value 初评号
     */
    loadPreBusiness: function (value) {
        if(value == '' || value == undefined) {
            return;
        }
        this.formPanel.loadData({
            method: 'POST',
            deferredRender: false,
            url: __ctxPath + '/preBusiness/getByCodePreBusiness.do',
            root: 'data',
            params: {'code':value},
            success: function (response, options) {
                var res = Ext.util.JSON.decode(response.responseText).data;
                if(res) {
                    var fields = ['weituo', 'pgdx', 'pgzz', 'qzpgs', 'ywzb'];
                    for (var i=0; i < fields.length; i++) {
                        var field = fields[i];
                        Ext.getCmp('businessForm.' + field).setValue(res[field]);
                    }
                    Ext.getCmp('businessForm.beizhu1').setValue(res['beizhu']);
                    if (res.nhrq != '' && res.nhrq != null) {
                        var nhrq = getDateFromFormat(res.nhrq, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('businessForm.nhrq').setValue(new Date(nhrq));
                    }
                    if (res.gzrq != '' && res.gzrq != null) {
                        var gzrq = getDateFromFormat(res.gzrq, 'yyyy-MM-dd HH:mm:ss');
                        Ext.getCmp('businessForm.gzrq').setValue(new Date(gzrq));
                    }
                }
            }
        });
    }
});