package com.htsoft.oa.action.realty;

import com.dream.util.CheckUtil;
import com.dream.util.RightUtil;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.GlobalConfig;
import com.htsoft.oa.model.realty.Realty;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.prebusiness.PreBusinessService;
import com.htsoft.oa.service.realty.RealtyService;
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
 *房地产
 */
public class RealtyAction extends BaseAction {
    @Resource
    private RealtyService realtyService;
    @Resource
    private PreBusinessService preBusinessService;
    private Realty realty;
    private Long businessId;

    public RealtyAction() {
    }

    public Realty getRealty() {
        return this.realty;
    }

    public void setRealty(Realty realty) {
        this.realty = realty;
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
        List showList;
        if(RightUtil.isCanListAll(currentUser.getUserId())) {
            showList = this.realtyService.getAll(filter);
        } else {
            filter.addFilter("Q_ywzb_S_LK", currentUser.getFullname());
            filter.addFilter("Q_ywzl_S_LK", currentUser.getFullname());
            showList = this.realtyService.getAll(filter);
        }

        StringBuffer buffer = (new StringBuffer("{success:true,\'totalCounts\':"))
                .append(filter.getPagingBean().getTotalItems()).append(",result:");
        JSONSerializer json = JsonUtil.getJSONSerializer("nhrq", "cprq", "gzrq", "sfrq", "cbgrq", "gjsd");
        buffer.append(json.serialize(showList));
        buffer.append("}");
        this.jsonString = buffer.toString();
        return "success";
    }

    public String get() {
        Realty realty = this.realtyService.get(this.businessId);
        JSONSerializer json = JsonUtil.getJSONSerializer("nhrq", "cprq", "gzrq", "sfrq", "cbgrq", "gjsd");
        StringBuffer sb = new StringBuffer("{success:true,data:");
        sb.append(json.serialize(realty));
        sb.append("}");
        this.setJsonString(sb.toString());
        return "success";
    }

    public String save() {
        AppUser currentUser = ContextUtil.getCurrentUser();
        Realty saveRealty;
        this.realty.setUsername(currentUser.getFullname());
        if(this.realty.getBusinessId() == null) {
            saveRealty = this.realty;
        } else {
            saveRealty = this.realtyService.get(this.realty.getBusinessId());

            try {
                BeanUtil.copyNotNullProperties(saveRealty, this.realty);
                if(this.realty.getNhrq() == null) {
                    saveRealty.setNhrq(null);
                }

                if(this.realty.getCprq() == null) {
                    saveRealty.setCprq(null);
                }

                if(this.realty.getGzrq() == null) {
                    saveRealty.setGzrq(null);
                }

                if(this.realty.getSfrq() == null) {
                    saveRealty.setSfrq(null);
                }

                if(this.realty.getCbgrq() == null) {
                    saveRealty.setCbgrq(null);
                }

                if(this.realty.getGjsd() == null) {
                    saveRealty.setGjsd(null);
                }

            } catch (Exception e) {
                this.logger.error(e.getMessage());
            }
        }
        this.realtyService.save(saveRealty);

        // 更新初评已出报告
        String preCode = saveRealty.getPreCode();
        if(preCode != null && !Objects.equals(preCode, "")) {
            preBusinessService.setIsReport(this.getRequest(), preCode, true);
        }

        this.setJsonString("{success:true}");
        return "success";
    }

    public String multiDel() {
        String[] ids = this.getRequest().getParameterValues("ids");
        if (ids != null) {
            for (String id : ids) {
                Realty localBusiness = this.realtyService.get(new Long(id));
                this.realtyService.remove(localBusiness);
            }
        }
        this.jsonString = "{success:true}";
        return "success";
    }

    public String getLastBaogaoId() {
        String baogaoId = "";
        JSONSerializer json = JsonUtil.getJSONSerializer();
        Realty realty = this.realtyService.getLastBusiness();
        if(realty != null) {
            baogaoId = realty.getBaogaoId();
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

        String newBaogaoId = this.realtyService.getNewBaogaoId(year, month);
        JSONSerializer json = JsonUtil.getJSONSerializer();
        this.jsonString = "{success:true, data:" + json.serialize(newBaogaoId) + "}";
        return "success";
    }

    public String multiReport() {
        ArrayList<Realty> reportList = new ArrayList<>();
        String[] ids = this.getRequest().getParameterValues("ids");
        if (ids != null) {
            for (int i = 0; i < ids.length; i++) {
                Realty realty = this.realtyService.get(new Long(ids[i]));
                reportList.add(realty);
            }
        }
        String absExcelPath = GlobalConfig.getSaveExcelPath(this.getRequest());
        String relExcelPath = GlobalConfig.getExcelRelativePath();
        this.realtyService.reportExcel(reportList, absExcelPath);
        this.jsonString = "{success:true,data:\'" + relExcelPath + "\'}";
        return "success";
    }

    public String reportAll() {
        List<Realty> reportList = this.realtyService.getAll();
        String absExcelPath = GlobalConfig.getSaveExcelPath(this.getRequest());
        String relExcelPath = GlobalConfig.getExcelRelativePath();
        this.realtyService.reportExcel(reportList, absExcelPath);
        this.jsonString = "{success:true,data:\'" + relExcelPath + "\'}";
        return "success";
    }

    public String reportMy() {
        ArrayList<Realty> reportList = new ArrayList<>();
        for (Realty realty: this.realtyService.getAll()) {
            if (CheckUtil.isMyRealty(realty)) {
                reportList.add(realty);
            }
        }

        String absExcelPath = GlobalConfig.getSaveExcelPath(this.getRequest());
        String relExcelPath = GlobalConfig.getExcelRelativePath();
        this.realtyService.reportMyExcel(reportList, absExcelPath);
        this.jsonString = "{success:true,data:\'" + relExcelPath + "\'}";
        return "success";
    }
}
