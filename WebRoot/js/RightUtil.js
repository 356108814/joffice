Ext.ns("RightUtil");

/**
 *   角色定义：
 *    负责人——所有权限
 *    行政——登记、查询所有基本信息
 *    业务主办——登记、查询所有列表、查看业务主办为自己的业务的基本信息
 *    登记人员——登记、查询所有列表、查看自己登记的业务的基本信息
 *
 *
 *    操作定义
 *    所有权限：all
 *    资产基本信息：zc_BasePanel
 *    资产收费信息：zc_costPanel
 *    资产登记按钮：zc_add_btn
 *    资产删除按钮：zc_del_btn
 *    资产编辑链接：zc_edit_link
 *    资产删除链接：zc_del_link
 *    资产保存按钮：zc_save_btn
 *    资产导出所选按钮：zc_report_btn
 *    资产导出所有按钮：zc_reportAll_btn
 *    资产导出我的按钮：zc_reportMy_btn


 特殊权限
 所有菜单操作权限：all
 查看所有业务：view_all
 管理列：manage_column
 *
 */

//权限缓存，键为userId，值有权限的操作对象id数组
var rightsArray = ['zc_BasePanel', 'zc_costPanel', 'zc_add_btn', 'zc_del_btn', 'zc_save_btn', 'zc_report_btn', 'zc_reportAll_btn', 'zc_reportMy_btn'];

//===============角色权限定义====================
//负责人
var manager = 'all,view_all';
//行政
var xingzheng = 'view_all,zc_BasePanel,zc_add_btn,zc_del_btn,zc_edit_link,zc_del_link,zc_save_btn,zc_report_btn,zc_reportAll_btn,manage_column';

//业务主办
var zhuban = 'zc_BasePanel,zc_add_btn,zc_save_btn,zc_reportMy_btn,zc_report_btn';

//登记人员
var dengji = 'zc_BasePanel,zc_add_btn,zc_save_btn,zc_reportMy_btn';


//===============用户权限定义====================
var rightMap = new Object();
//管理员baitai
rightMap[1] = manager;
//邹晶晶
rightMap[2] = zhuban;
//杨林武
rightMap[3] = manager;
//姚慧
rightMap[4] = zhuban;
//方维贤
rightMap[5] = manager;
//张挺
rightMap[6] = zhuban;
//李莎
rightMap[7] = zhuban;
//吴克
rightMap[8] = zhuban;
//黄思铭
rightMap[9] = zhuban;
//蔡安贝
rightMap[10] = zhuban;
//谢麒麟
rightMap[11] = zhuban;
//陈惠婷
rightMap[12] = dengji;


//检查当前用户有权访问funKey对应的功能,funKey对应操作定义
function isHasRight(funKey) {
    if(funKey == 'zc_del_btn' || funKey == 'zc_del_link') {
        return false;
    }
    var right = rightMap[curUserInfo.userId];
    if (right.indexOf('all') != -1) {
        return true;
    }
    if (right.indexOf(funKey) != -1) {
        return true;
    }
    return false;
}

//验证隐藏功能，funArray功能id数组
function validateHide(funArray) {
    var id;
    var obj;
    for (var i = 0; i < funArray.length; i++) {
        id = funArray[i];
        if (!isHasRight(id)) {
            obj = Ext.getCmp(id);
            if (obj != null && obj != undefined) {
                obj.hide();
            }
            //Ext.getCmp(id).hide();
        }
    }
}

//验证隐藏所有功能
function validateAll() {
    validateHide(rightsArray);
}

//是否有查看详细信息的权限
function isHasViewDetailRight(data) {
    //有view_all权限、业务主办为自己、业务登记人为自己的可查看
    if (isHasRight('view_all') || curUserInfo.userId == 12 || data.username == curUserInfo.fullname || data.ywzb.indexOf(curUserInfo.fullname) != -1 || data.ywzl.indexOf(curUserInfo.fullname) != -1) {
        return true;
    }
    return false;
}