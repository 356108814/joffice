//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.htsoft.oa.action.realty;

import com.dream.util.CheckUtil;
import com.dream.util.FileUtil;
import com.dream.util.RightUtil;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.realty.Realty;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.realty.RealtyService;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import javax.annotation.Resource;

public class RealtyAction extends BaseAction {
    @Resource
    private RealtyService realtyService;
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
        new ArrayList();
        AppUser currentUser = ContextUtil.getCurrentUser();
        QueryFilter filter = new QueryFilter(this.getRequest());
        filter.addSorted("businessId", "DESC");
        List showList;
        if(RightUtil.isCanListAll(currentUser.getUserId())) {
            showList = this.realtyService.getAll(filter);
        } else {
            filter.addFilter("Q_ywzb_S_LK", currentUser.getFullname());
            showList = this.realtyService.getAll(filter);
            QueryFilter buff = new QueryFilter(this.getRequest());
            buff.addFilter("Q_ywzl_S_LK", currentUser.getFullname());
            List json = this.realtyService.getAll(buff);
            int addSize = 0;
            Iterator var8 = json.iterator();

            while(var8.hasNext()) {
                Realty realty = (Realty)var8.next();
                if(!showList.contains(realty)) {
                    showList.add(realty);
                    ++addSize;
                }
            }

            filter.getPagingBean().setTotalItems(filter.getPagingBean().getTotalItems() + addSize);
        }

        StringBuffer var9 = (new StringBuffer("{success:true,\'totalCounts\':")).append(filter.getPagingBean().getTotalItems()).append(",result:");
        JSONSerializer var10 = JsonUtil.getJSONSerializer(new String[]{"nhrq", "cprq", "gzrq", "sfrq", "cbgrq", "gjsd"});
        var9.append(var10.serialize(showList));
        var9.append("}");
        this.jsonString = var9.toString();
        return "success";
    }

    public String get() {
        Realty realty = (Realty)this.realtyService.get(this.businessId);
        JSONSerializer json = JsonUtil.getJSONSerializer(new String[]{"nhrq", "cprq", "gzrq", "sfrq", "cbgrq", "gjsd"});
        StringBuffer sb = new StringBuffer("{success:true,data:");
        sb.append(json.serialize(realty));
        sb.append("}");
        this.setJsonString(sb.toString());
        return "success";
    }

    public String save() {
        AppUser currentUser = ContextUtil.getCurrentUser();
        this.realty.setUsername(currentUser.getFullname());
        if(this.realty.getBusinessId() == null) {
            this.realtyService.save(this.realty);
        } else {
            Realty orgBusiness = (Realty)this.realtyService.get(this.realty.getBusinessId());

            try {
                BeanUtil.copyNotNullProperties(orgBusiness, this.realty);
                if(this.realty.getNhrq() == null) {
                    orgBusiness.setNhrq((Date)null);
                }

                if(this.realty.getCprq() == null) {
                    orgBusiness.setCprq((Date)null);
                }

                if(this.realty.getGzrq() == null) {
                    orgBusiness.setGzrq((Date)null);
                }

                if(this.realty.getSfrq() == null) {
                    orgBusiness.setSfrq((Date)null);
                }

                if(this.realty.getCbgrq() == null) {
                    orgBusiness.setCbgrq((Date)null);
                }

                if(this.realty.getGjsd() == null) {
                    orgBusiness.setGjsd((Date)null);
                }

                this.realtyService.save(orgBusiness);
            } catch (Exception var4) {
                this.logger.error(var4.getMessage());
            }
        }

        this.setJsonString("{success:true}");
        return "success";
    }

    public String multiDel() {
        String[] arrayOfString1 = this.getRequest().getParameterValues("ids");
        if(arrayOfString1 != null) {
            String[] arrayOfString2 = arrayOfString1;
            int i = arrayOfString1.length;

            for(int j = 0; j < i; ++j) {
                String str = arrayOfString2[j];
                Realty localBusiness = (Realty)this.realtyService.get(new Long(str));
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

    public String getNewBaogaoId() {
        String newBaogaoId = "";
        String baogaoId = "";
        String template = "穗佰泰房评字(Y)第0M0XT号";
        boolean index = false;
        JSONSerializer json = JsonUtil.getJSONSerializer();
        Realty realty = this.realtyService.getLastBusiness();
        if(realty != null) {
            baogaoId = realty.getBaogaoId();
        }

        if(baogaoId != "") {
            int index1 = Integer.parseInt(baogaoId.substring(17, 20)) + 1;
            Calendar cal = Calendar.getInstance();
            int year = cal.get(1);
            int month = cal.get(2) + 1;
            String ms = "";
            String indexs = "";
            if(month < 10) {
                ms = "0" + month;
            } else {
                ms = "" + month;
            }

            if(index1 < 10) {
                indexs = indexs + "0" + index1;
            } else {
                indexs = String.valueOf(index1);
            }

            if(index1 < 100) {
                indexs = "0" + indexs;
            } else {
                indexs = String.valueOf(index1);
            }

            if(baogaoId.indexOf("NX1") != -1) {
                newBaogaoId = template.replaceAll("Y", String.valueOf(year)).replace("M", ms).replaceAll("X", indexs).replaceAll("T", "NX1");
            } else {
                newBaogaoId = template.replaceAll("Y", String.valueOf(year)).replace("M", ms).replaceAll("X", indexs).replaceAll("T", "");
            }
        }

        this.jsonString = "{success:true,data:" + json.serialize(newBaogaoId) + "}";
        return "success";
    }

    public String multiReport() {
        ArrayList reportList = new ArrayList();
        String[] arrayOfString1 = this.getRequest().getParameterValues("ids");
        if(arrayOfString1 != null) {
            String[] downloadPath = arrayOfString1;
            int excelpath = arrayOfString1.length;

            for(int j = 0; j < excelpath; ++j) {
                String str = downloadPath[j];
                Realty localBusiness = (Realty)this.realtyService.get(new Long(str));
                reportList.add(localBusiness);
            }
        }

        String var8 = this.getDownloadPath();
        String var9 = this.getAppPath() + "/" + var8;
        this.realtyService.reportExcel(reportList, var9);
        this.jsonString = "{success:true,data:\'" + var8 + "\'}";
        return "success";
    }

    public String reportAll() {
        List reportList = this.realtyService.getAll();
        String downloadPath = this.getDownloadPath();
        String excelpath = this.getAppPath() + "/" + downloadPath;
        this.realtyService.reportExcel(reportList, excelpath);
        this.jsonString = "{success:true,data:\'" + downloadPath + "\'}";
        return "success";
    }

    public String reportMy() {
        ArrayList reportList = new ArrayList();
        List tmpList = this.realtyService.getAll();
        Iterator excelpath = tmpList.iterator();

        while(excelpath.hasNext()) {
            Realty downloadPath = (Realty)excelpath.next();
            if(CheckUtil.isMyRealty(downloadPath)) {
                reportList.add(downloadPath);
            }
        }

        String downloadPath1 = this.getDownloadPath();
        String excelpath1 = this.getAppPath() + "/" + downloadPath1;
        this.realtyService.reportMyExcel(reportList, excelpath1);
        this.jsonString = "{success:true,data:\'" + downloadPath1 + "\'}";
        return "success";
    }

    public String getAppPath() {
        return this.getRequest().getSession().getServletContext().getRealPath("");
    }

    public String getDownloadPath() {
        return "backup/tmp/" + FileUtil.getTimeExcelName();
    }
}
