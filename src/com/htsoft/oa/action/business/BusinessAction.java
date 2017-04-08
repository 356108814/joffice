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
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

    /**
     * 获取新报告号
     */
    public String getNewBaogaoId() {
        int year = 0;
        int month = 0;
        String date = this.getRequest().getParameter("date");
        if(date != null) {
            DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Date d = null;
            try {
                d = format.parse(date);
                year = d.getYear() + 1900;
                month = d.getMonth() + 1;
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        String newBaogaoId = this.businessService.getNewBaogaoId(year, month);
        JSONSerializer json = JsonUtil.getJSONSerializer();
        this.jsonString = "{success:true, data:" + json.serialize(newBaogaoId) + "}";
        return "success";
    }

    public String getRight() {
        AppUser currentUser = ContextUtil.getCurrentUser();
        Boolean isHasRight = false;
        if (currentUser.getRoleNames().equals("超级管理员")) {
            isHasRight = true;
        }

        this.jsonString = "{success:true,data:" + isHasRight + "}";
        return "success";
    }

    public String multiReport() {
        List<Business> reportList = new ArrayList<>();
        String[] ids = this.getRequest().getParameterValues("ids");
        if (ids != null) {
            for (int i = 0; i < ids.length; i++) {
                Business localBusiness = this.businessService.get(new Long(ids[i]));
                reportList.add(localBusiness);
            }
        }

        String downloadPath = this.getDownloadPath();
        String savePath = this.getAppPath() + "/" + downloadPath;
        this.businessService.reportExcel(reportList, savePath);
        this.jsonString = "{success:true, data:\'" + downloadPath + "\'}";
        return "success";
    }

    public String reportAll() {
        List<Business> reportList = this.businessService.getAll();
        String downloadPath = this.getDownloadPath();
        String excelPath = this.getAppPath() + "/" + downloadPath;
        this.businessService.reportExcel(reportList, excelPath);
        this.jsonString = "{success:true, data:\'" + downloadPath + "\'}";
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

        String downloadPath = this.getDownloadPath();
        String excelPath = this.getAppPath() + "/" + downloadPath;
        this.businessService.reportMyExcel(reportList, excelPath);
        this.jsonString = "{success:true,data:\'" + downloadPath + "\'}";
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
