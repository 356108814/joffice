package com.htsoft.oa.action.business;

import com.dream.util.CheckUtil;
import com.dream.util.RightUtil;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.GlobalConfig;
import com.htsoft.oa.model.business.Business;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.business.BusinessService;
import com.htsoft.oa.service.prebusiness.PreBusinessService;
import flexjson.JSONSerializer;

import javax.annotation.Resource;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * 资产控制器
 */
public class BusinessAction extends BaseAction {
    @Resource
    private BusinessService businessService;
    @Resource
    private PreBusinessService preBusinessService;
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
            filter.addFilter("Q_ywzl_S_LK", currentUser.getFullname());
            showList = this.businessService.getAll(filter);
        }
        StringBuffer buffer = (new StringBuffer("{success:true,\'totalCounts\':"))
                .append(filter.getPagingBean().getTotalItems()).append(",result:");
        JSONSerializer json = JsonUtil.getJSONSerializer("nhrq", "cprq", "gzrq", "sfrq", "cbgrq");
        buffer.append(json.serialize(showList));
        buffer.append("}");
        this.jsonString = buffer.toString();
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
        Business saveBusiness;
        AppUser currentUser = ContextUtil.getCurrentUser();
        this.business.setUsername(currentUser.getFullname());
        String newPreCode = this.business.getPreCode();
        String oldPreCode = null;
        if (this.business.getBusinessId() == null) {
            saveBusiness = this.business;
        } else {
            saveBusiness = this.businessService.get(this.business.getBusinessId());
            oldPreCode = saveBusiness.getPreCode();
            try {
                BeanUtil.copyNotNullProperties(saveBusiness, this.business);
                if (this.business.getNhrq() == null) {
                    saveBusiness.setNhrq(null);
                }

                if (this.business.getCprq() == null) {
                    saveBusiness.setCprq(null);
                }

                if (this.business.getGzrq() == null) {
                    saveBusiness.setGzrq(null);
                }

                if (this.business.getSfrq() == null) {
                    saveBusiness.setSfrq( null);
                }

                if (this.business.getCbgrq() == null) {
                    saveBusiness.setCbgrq(null);
                }

            } catch (Exception e) {
                this.logger.error(e.getMessage());
            }
        }
        this.businessService.save(saveBusiness);

        // 更新初评已出报告
        if(newPreCode != null && !Objects.equals(newPreCode, "")) {
            preBusinessService.setIsReport(this.getRequest(), newPreCode, true);
        } else {
            //删除初评号
            if(oldPreCode != null && !Objects.equals(oldPreCode, "")) {
                preBusinessService.setIsReport(this.getRequest(), oldPreCode, false);
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

        String absExcelPath = GlobalConfig.getSaveExcelPath(this.getRequest());
        String relExcelPath = GlobalConfig.getExcelRelativePath();
        this.businessService.reportExcel(reportList, absExcelPath);
        this.jsonString = "{success:true, data:\'" + relExcelPath + "\'}";
        return "success";
    }

    public String reportAll() {
        List<Business> reportList = this.businessService.getAll();
        String absExcelPath = GlobalConfig.getSaveExcelPath(this.getRequest());
        String relExcelPath = GlobalConfig.getExcelRelativePath();
        this.businessService.reportExcel(reportList, absExcelPath);
        this.jsonString = "{success:true, data:\'" + relExcelPath + "\'}";
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

        String absExcelPath = GlobalConfig.getSaveExcelPath(this.getRequest());
        String relExcelPath = GlobalConfig.getExcelRelativePath();
        this.businessService.reportMyExcel(reportList, absExcelPath);
        this.jsonString = "{success:true,data:\'" + relExcelPath + "\'}";
        return "success";
    }

    public String search() {
        return "success";
    }
}
