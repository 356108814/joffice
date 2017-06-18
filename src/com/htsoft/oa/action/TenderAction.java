package com.htsoft.oa.action;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.GlobalConfig;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.tender.Tender;
import com.htsoft.oa.service.tender.TenderService;
import flexjson.JSONSerializer;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 *标书
 */
public class TenderAction extends BaseAction {
    @Resource
    private TenderService tenderService;

    private Tender tender;
    private Long id;

    public TenderAction() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Tender getTender() {
        return tender;
    }

    public void setTender(Tender tender) {
        this.tender = tender;
    }

    public String list() {
        QueryFilter filter = new QueryFilter(this.getRequest());
        filter.addSorted("id", "DESC");
        List<Tender> showList;

        showList = this.tenderService.getAll(filter);

        StringBuffer buffer = (new StringBuffer("{success:true,\'totalCounts\':"))
                .append(filter.getPagingBean().getTotalItems()).append(",result:");
        JSONSerializer json = JsonUtil.getJSONSerializer("regdate", "createDate", "updateDate");
        buffer.append(json.serialize(showList));
        buffer.append("}");
        this.jsonString = buffer.toString();
        return "success";
    }

    public String get() {
        Tender tender = this.tenderService.get(this.id);
        JSONSerializer json = JsonUtil.getJSONSerializer("regdate", "createDate", "updateDate");
        StringBuffer sb = new StringBuffer("{success:true,data:");
        sb.append(json.serialize(tender));
        sb.append("}");
        this.setJsonString(sb.toString());
        return "success";
    }

    public String save() {
        AppUser currentUser = ContextUtil.getCurrentUser();
        Tender saveTender;
        if(this.tender.getId() == 0) {
            saveTender = this.tender;
        } else {
            saveTender = this.tenderService.get(this.tender.getId());
            try {
                BeanUtil.copyNotNullProperties(saveTender, this.tender);
            } catch (Exception e) {
                this.logger.error(e.getMessage());
            }
        }
        this.tenderService.save(saveTender);

        this.setJsonString("{success:true}");
        return "success";
    }

    public String multiDel() {
        String[] ids = this.getRequest().getParameterValues("ids");
        if (ids != null) {
            for (String id : ids) {
                Tender tender = this.tenderService.get(new Long(id));
                this.tenderService.remove(tender);
            }
        }
        this.jsonString = "{success:true}";
        return "success";
    }

    public String multiReport() {
        ArrayList<Tender> reportList = new ArrayList<>();
        String[] ids = this.getRequest().getParameterValues("ids");
        if (ids != null) {
            for (int i = 0; i < ids.length; i++) {
                Tender tender = this.tenderService.get(new Long(ids[i]));
                reportList.add(tender);
            }
        }
        String absExcelPath = GlobalConfig.getSaveExcelPath(this.getRequest());
        String relExcelPath = GlobalConfig.getExcelRelativePath();
        this.tenderService.reportExcel(reportList, absExcelPath);
        this.jsonString = "{success:true,data:\'" + relExcelPath + "\'}";
        return "success";
    }

    public String reportAll() {
        List<Tender> reportList = this.tenderService.getAll();
        String absExcelPath = GlobalConfig.getSaveExcelPath(this.getRequest());
        String relExcelPath = GlobalConfig.getExcelRelativePath();
        this.tenderService.reportExcel(reportList, absExcelPath);
        this.jsonString = "{success:true,data:\'" + relExcelPath + "\'}";
        return "success";
    }
}
