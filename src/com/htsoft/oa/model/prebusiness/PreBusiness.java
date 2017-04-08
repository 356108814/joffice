package com.htsoft.oa.model.prebusiness;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 初评
 * @author Yuriseus
 * @date 2017-4-5 22:30
 */
public class PreBusiness implements Serializable {
    private Long id;
    private Date nhrq;
    private String code;
    private String weituo;
    private String pgdx;
    private Double pgzz;
    private String qzpgs;
    private Date gzrq;
    private String ywzb;
    private String isReport;
    private String realName;
    private String beizhu;
    private Date createDate;
    private Date updateDate;

    public PreBusiness() {
    }

    public PreBusiness(Long id, String realName) {
        this.id = id;
        this.realName = realName;
    }

    public PreBusiness(Long id, Date nhrq, String code, String weituo, String pgdx, Double pgzz, String qzpgs, Date gzrq, String ywzb, String isReport, String realName, String beizhu, Date createDate, Date updateDate) {
        this.id = id;
        this.nhrq = nhrq;
        this.code = code;
        this.weituo = weituo;
        this.pgdx = pgdx;
        this.pgzz = pgzz;
        this.qzpgs = qzpgs;
        this.gzrq = gzrq;
        this.ywzb = ywzb;
        this.isReport = isReport;
        this.realName = realName;
        this.beizhu = beizhu;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getNhrq() {
        return nhrq;
    }

    public void setNhrq(Date nhrq) {
        this.nhrq = nhrq;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getWeituo() {
        return weituo;
    }

    public void setWeituo(String weituo) {
        this.weituo = weituo;
    }

    public String getPgdx() {
        return pgdx;
    }

    public void setPgdx(String pgdx) {
        this.pgdx = pgdx;
    }

    public Double getPgzz() {
        return pgzz;
    }

    public void setPgzz(Double pgzz) {
        this.pgzz = pgzz;
    }

    public String getQzpgs() {
        return qzpgs;
    }

    public void setQzpgs(String qzpgs) {
        this.qzpgs = qzpgs;
    }

    public Date getGzrq() {
        return gzrq;
    }

    public void setGzrq(Date gzrq) {
        this.gzrq = gzrq;
    }

    public String getYwzb() {
        return ywzb;
    }

    public void setYwzb(String ywzb) {
        this.ywzb = ywzb;
    }

    public String getIsReport() {
        return isReport;
    }

    public void setIsReport(String isReport) {
        this.isReport = isReport;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getBeizhu() {
        return beizhu;
    }

    public void setBeizhu(String beizhu) {
        this.beizhu = beizhu;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }
}
