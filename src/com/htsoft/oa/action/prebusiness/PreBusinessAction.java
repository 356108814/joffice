package com.htsoft.oa.action.prebusiness;

import com.dream.util.CheckUtil;
import com.dream.util.FileUtil;
import com.dream.util.RightUtil;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.prebusiness.PreBusiness;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.prebusiness.PreBusinessService;
import flexjson.JSONSerializer;

import javax.annotation.Resource;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 初评控制器
 */
public class PreBusinessAction extends BaseAction {
    @Resource
    private PreBusinessService preBusinessService;
    private PreBusiness business;
    private Long id;

    public PreBusinessAction() {
    }

    public PreBusiness getBusiness() {
        return business;
    }

    public void setBusiness(PreBusiness business) {
        this.business = business;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String list() {
        AppUser currentUser = ContextUtil.getCurrentUser();
        QueryFilter filter = new QueryFilter(this.getRequest());
        filter.addSorted("id", "DESC");
        List<PreBusiness> showList;
        if (RightUtil.isCanListAll(currentUser.getUserId())) {
            showList = this.preBusinessService.getAll(filter);
        } else {
            filter.addFilter("Q_ywzb_S_LK", currentUser.getFullname());
            showList = this.preBusinessService.getAll(filter);
        }

        StringBuffer buffer = (new StringBuffer("{success:true,\'totalCounts\':"))
                .append(filter.getPagingBean().getTotalItems()).append(",result:");
        JSONSerializer json = JsonUtil.getJSONSerializer("nhrq", "gzrq");
        buffer.append(json.serialize(showList));
        buffer.append("}");
        this.jsonString = buffer.toString();
        return "success";
    }

    public String get() {
        PreBusiness business = this.preBusinessService.get(this.id);
        JSONSerializer json = JsonUtil.getJSONSerializer("nhrq", "gzrq");
        String jsonBusiness = "{success:true, data:" + json.serialize(business) + "}";
        this.setJsonString(jsonBusiness);
        return "success";
    }

    public String getByCode() {
        String code = this.getRequest().getParameter("code");
        QueryFilter filter = new QueryFilter(this.getRequest());
        filter.addFilter("Q_code_S_EQ", code);
        PreBusiness business = null;
        List<PreBusiness> list  = this.preBusinessService.getAll(filter);
        if(!list.isEmpty()) {
            business = list.get(0);
        }
        JSONSerializer json = JsonUtil.getJSONSerializer("nhrq", "gzrq");
        String jsonBusiness = "{success:true, data:" + json.serialize(business) + "}";
        this.setJsonString(jsonBusiness);
        return "success";
    }


    public String save() {
        AppUser currentUser = ContextUtil.getCurrentUser();
        this.business.setRealName(currentUser.getFullname());
        if (this.business.getId() == null) {
            this.preBusinessService.save(this.business);
        } else {
            PreBusiness orgBusiness = this.preBusinessService.get(this.business.getId());
            try {
                BeanUtil.copyNotNullProperties(orgBusiness, this.business);
                if (this.business.getNhrq() == null) {
                    orgBusiness.setNhrq(null);
                }
                if (this.business.getGzrq() == null) {
                    orgBusiness.setGzrq(null);
                }
                this.preBusinessService.save(orgBusiness);
            } catch (Exception e) {
                this.logger.error(e.getMessage());
            }
        }

        this.setJsonString("{success:true}");
        return "success";
    }

    public String multiDel() {
        String[] ids = this.getRequest().getParameterValues("ids");
        if (ids != null) {
            for (String id : ids) {
                PreBusiness localBusiness = this.preBusinessService.get(new Long(id));
                this.preBusinessService.remove(localBusiness);
            }
        }
        this.jsonString = "{success:true}";
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

        String newBaogaoId = this.preBusinessService.getNewBaogaoId(year, month);
        JSONSerializer json = JsonUtil.getJSONSerializer();
        this.jsonString = "{success:true, data:" + json.serialize(newBaogaoId) + "}";
        return "success";
    }

    public String multiReport() {
        List<PreBusiness> reportList = new ArrayList<>();
        String[] ids = this.getRequest().getParameterValues("ids");
        if (ids != null) {
            for (int i = 0; i < ids.length; i++) {
                PreBusiness localBusiness = this.preBusinessService.get(new Long(ids[i]));
                reportList.add(localBusiness);
            }
        }

        this.preBusinessService.reportToExcel(reportList, getSaveExcelPath());
        this.jsonString = "{success:true, data:\'" + getExcelRelativePath() + "\'}";
        return "success";
    }

    public String reportAll() {
        List<PreBusiness> reportList = this.preBusinessService.getAll();
        this.preBusinessService.reportToExcel(reportList, getSaveExcelPath());
        this.jsonString = "{success:true, data:\'" + getExcelRelativePath() + "\'}";
        return "success";
    }

    /**
     * 导出所有我的业务
     * @return String
     */
    public String reportMy() {
        List<PreBusiness> reportList = new ArrayList<>();
        for (PreBusiness business: this.preBusinessService.getAll()) {
            if (CheckUtil.isMyPreBusiness(business)) {
                reportList.add(business);
            }
        }

        this.preBusinessService.reportToExcel(reportList, getSaveExcelPath());
        this.jsonString = "{success:true, data:\'" + getExcelRelativePath() + "\'}";
        return "success";
    }

    public String search() {
        return "success";
    }

    // excel相对路径
    private String getExcelRelativePath() {
        Path path = Paths.get("backup", "tmp", FileUtil.getTimeExcelName());
        return path.toString();
    }

    // excel绝对路径
    private String getSaveExcelPath() {
        String webRootPath = this.getRequest().getSession().getServletContext().getRealPath("");
        String excelPath = getExcelRelativePath();
        Path path = Paths.get(webRootPath, excelPath);
        return path.toString();
    }
}
