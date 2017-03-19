package com.htsoft.oa.action.business;

import com.dream.util.CheckUtil;
import com.dream.util.FileUtil;
import com.dream.util.RightUtil;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.business.Business;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.business.BusinessService;
import flexjson.JSONSerializer;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

/**
 * 资产控制器
 */
public class BusinessAction extends BaseAction {
    @Resource
    private BusinessService businessService;
    private Business business;
    private Long businessId;

    public BusinessAction() {
    }

    public Business getBusiness() {
        return this.business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public Long getBusinessId() {
        return this.businessId;
    }

    public void setBusinessId(Long businessId) {
        this.businessId = businessId;
    }

    public String list() {
        new ArrayList();
        AppUser currentUser = ContextUtil.getCurrentUser();
        QueryFilter filter = new QueryFilter(this.getRequest());
        filter.addSorted("businessId", "DESC");
        List<Business> showList;
        if (RightUtil.isCanListAll(currentUser.getUserId())) {
            showList = this.businessService.getAll(filter);
        } else {
            filter.addFilter("Q_ywzb_S_LK", currentUser.getFullname());
            showList = this.businessService.getAll(filter);
            QueryFilter buff = new QueryFilter(this.getRequest());
            buff.addFilter("Q_ywzl_S_LK", currentUser.getFullname());
            List json = this.businessService.getAll(buff);
            int addSize = 0;
            Iterator var8 = json.iterator();

            while (var8.hasNext()) {
                Business business = (Business) var8.next();
                if (!showList.contains(business)) {
                    showList.add(business);
                    ++addSize;
                }
            }

            filter.getPagingBean().setTotalItems(filter.getPagingBean().getTotalItems() + addSize);
        }

        StringBuffer var9 = (new StringBuffer("{success:true,\'totalCounts\':")).append(filter.getPagingBean().getTotalItems()).append(",result:");
        JSONSerializer var10 = JsonUtil.getJSONSerializer(new String[]{"nhrq", "cprq", "gzrq", "sfrq", "cbgrq"});
        var9.append(var10.serialize(showList));
        var9.append("}");
        this.jsonString = var9.toString();
        return "success";
    }

    public String get() {
        Business business = this.businessService.get(this.businessId);
        JSONSerializer json = JsonUtil.getJSONSerializer("nhrq", "cprq", "gzrq", "sfrq", "cbgrq");
        String jsonBusiness = "{success:true, data:" + json.serialize(business) + "}";
        this.setJsonString(jsonBusiness);
        return "success";
    }

    public String save() {
        AppUser currentUser = ContextUtil.getCurrentUser();
        this.business.setUsername(currentUser.getFullname());
        if (this.business.getBusinessId() == null) {
            this.businessService.save(this.business);
        } else {
            Business orgBusiness = this.businessService.get(this.business.getBusinessId());

            try {
                BeanUtil.copyNotNullProperties(orgBusiness, this.business);
                if (this.business.getNhrq() == null) {
                    orgBusiness.setNhrq(null);
                }

                if (this.business.getCprq() == null) {
                    orgBusiness.setCprq(null);
                }

                if (this.business.getGzrq() == null) {
                    orgBusiness.setGzrq(null);
                }

                if (this.business.getSfrq() == null) {
                    orgBusiness.setSfrq( null);
                }

                if (this.business.getCbgrq() == null) {
                    orgBusiness.setCbgrq(null);
                }

                this.businessService.save(orgBusiness);
            } catch (Exception var4) {
                this.logger.error(var4.getMessage());
            }
        }

        this.setJsonString("{success:true}");
        return "success";
    }

    public String multiDel() {
        String[] ids = this.getRequest().getParameterValues("ids");
        if (ids != null) {
            for (String id : ids) {
                Business localBusiness = this.businessService.get(new Long(id));
                this.businessService.remove(localBusiness);
            }
        }
        this.jsonString = "{success:true}";
        return "success";
    }

    public String getLastBaogaoId() {
        String baogaoId = "";
        JSONSerializer json = JsonUtil.getJSONSerializer();
        Business business = this.businessService.getLastBusiness();
        if (business != null) {
            baogaoId = business.getBaogaoId();
        }

        this.jsonString = "{success:true,data:" + json.serialize(baogaoId) + "}";
        return "success";
    }

    public String getNewBaogaoId() {
        String newBaogaoId = this.businessService.getNewBaogaoId(0, 0);
//        String newBaogaoId = "";
//        String baogaoId = "";
//        String template = "穗和顺资评字(Y)第0M0XT号";
//        boolean index = false;
        JSONSerializer json = JsonUtil.getJSONSerializer();
//        Business business = this.businessService.getLastBusiness();
////        this.businessService.getNewBaogaoId()
//        if (business != null) {
//            baogaoId = business.getBaogaoId();
//        }
//
//        if (baogaoId != "") {
//            int index1 = Integer.parseInt(baogaoId.substring(17, 20)) + 1;
//            Calendar cal = Calendar.getInstance();
//            int year = cal.get(1);
//            int month = cal.get(2) + 1;
//            String ms = "";
//            String indexs = "";
//            if (month < 10) {
//                ms = "0" + month;
//            } else {
//                ms = "" + month;
//            }
//
//            if (index1 < 10) {
//                indexs = indexs + "0" + index1;
//            } else {
//                indexs = String.valueOf(index1);
//            }
//
//            if (index1 < 100) {
//                indexs = "0" + indexs;
//            } else {
//                indexs = String.valueOf(index1);
//            }
//
//            if (baogaoId.indexOf("NX1") != -1) {
//                newBaogaoId = template.replaceAll("Y", String.valueOf(year)).replace("M", ms).replaceAll("X", indexs).replaceAll("T", "NX1");
//            } else {
//                newBaogaoId = template.replaceAll("Y", String.valueOf(year)).replace("M", ms).replaceAll("X", indexs).replaceAll("T", "");
//            }
//        }

        this.jsonString = "{success:true,data:" + json.serialize(newBaogaoId) + "}";
        return "success";
    }

    public String getRight() {
        AppUser currentUser = ContextUtil.getCurrentUser();
        Boolean isHasRight = Boolean.valueOf(false);
        if (currentUser.getRoleNames().equals("超级管理员")) {
            isHasRight = Boolean.valueOf(true);
        }

        this.jsonString = "{success:true,data:" + isHasRight + "}";
        return "success";
    }

    public String multiReport() {
        ArrayList reportList = new ArrayList();
        String[] arrayOfString1 = this.getRequest().getParameterValues("ids");
        if (arrayOfString1 != null) {
            String[] downloadPath = arrayOfString1;
            int excelpath = arrayOfString1.length;

            for (int j = 0; j < excelpath; ++j) {
                String str = downloadPath[j];
                Business localBusiness = (Business) this.businessService.get(new Long(str));
                reportList.add(localBusiness);
            }
        }

        String var8 = this.getDownloadPath();
        String var9 = this.getAppPath() + "/" + var8;
        this.businessService.reportExcel(reportList, var9);
        this.jsonString = "{success:true,data:\'" + var8 + "\'}";
        return "success";
    }

    public String reportAll() {
        List<Business> reportList = this.businessService.getAll();
        String downloadPath = this.getDownloadPath();
        String excelpath = this.getAppPath() + "/" + downloadPath;
        this.businessService.reportExcel(reportList, excelpath);
        this.jsonString = "{success:true,data:\'" + downloadPath + "\'}";
        return "success";
    }

    /**
     * 导出所有我的业务
     * @return String
     */
    public String reportMy() {
        List<Business> reportList = new ArrayList<>();
        for (Business business: this.businessService.getAll()) {
            if (CheckUtil.isMyBusiness(business)) {
                reportList.add(business);
            }
        }

        String downloadPath1 = this.getDownloadPath();
        String excelpath1 = this.getAppPath() + "/" + downloadPath1;
        this.businessService.reportMyExcel(reportList, excelpath1);
        this.jsonString = "{success:true,data:\'" + downloadPath1 + "\'}";
        return "success";
    }

    public String search() {
        return "success";
    }

    public String getAppPath() {
        return this.getRequest().getSession().getServletContext().getRealPath("");
    }

    public String getDownloadPath() {
        return "backup/tmp/" + FileUtil.getTimeExcelName();
    }
}
