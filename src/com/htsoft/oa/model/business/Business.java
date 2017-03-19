package com.htsoft.oa.model.business;

import java.io.Serializable;
import java.util.Date;

public class Business implements Serializable {
	private Long businessId;
	private Long myid;
	private Date nhrq;
	private String baobeiId;
	private String baogaoId;
	private String xmmc;
	private String weituo;
	private String pgdx;
	private String gjmd;
	private String gjff;
	private Double pgzz;
	private Float bzsf;
	private Float ydje;
	private Float kpje;
	private Float dzje;
	private Float zjbl;
	private Float ssje;
	private String jjmc;
	private String ywzb;
	private String ywzl;
	private String xckc;
	private Float zbgzl;
	private Float zlgzl;
	private Float kcgzl;
	private Date cprq;
	private String bgr;
	private Date gzrq;
	private String qzpgs;
	private Date sfrq;
	private String skfs;
	private String ywht;
	private String sfyfzjf;
	private String dgwcsm;
	private String beizhu1;
	private String beizhu2;
	private Date cbgrq;
	private String bgfs;
	private String username;

	public Business() {
	}

	public Business(Long businessId, String username) {
		this.businessId = businessId;
		this.username = username;
	}

	public Business(Long businessId, Long myid, Date nhrq, String baobeiId, String baogaoId, String xmmc, String weituo, String pgdx, String gjmd, String gjff, Double pgzz, Float bzsf, Float ydje, Float kpje, Float dzje, Float zjbl, Float ssje, String jjmc, String ywzb, String ywzl, String xckc, Float zbgzl, Float zlgzl, Float kcgzl, Date cprq, String bgr, Date gzrq, String qzpgs, Date sfrq, String skfs, String ywht, String sfyfzjf, String dgwcsm, String beizhu1, String beizhu2, Date cbgrq, String bgfs, String username) {
		this.businessId = businessId;
		this.myid = myid;
		this.nhrq = nhrq;
		this.baobeiId = baobeiId;
		this.baogaoId = baogaoId;
		this.xmmc = xmmc;
		this.weituo = weituo;
		this.pgdx = pgdx;
		this.gjmd = gjmd;
		this.gjff = gjff;
		this.pgzz = pgzz;
		this.bzsf = bzsf;
		this.ydje = ydje;
		this.kpje = kpje;
		this.dzje = dzje;
		this.zjbl = zjbl;
		this.ssje = ssje;
		this.jjmc = jjmc;
		this.ywzb = ywzb;
		this.ywzl = ywzl;
		this.xckc = xckc;
		this.zbgzl = zbgzl;
		this.zlgzl = zlgzl;
		this.kcgzl = kcgzl;
		this.cprq = cprq;
		this.bgr = bgr;
		this.gzrq = gzrq;
		this.qzpgs = qzpgs;
		this.sfrq = sfrq;
		this.skfs = skfs;
		this.ywht = ywht;
		this.sfyfzjf = sfyfzjf;
		this.dgwcsm = dgwcsm;
		this.beizhu1 = beizhu1;
		this.beizhu2 = beizhu2;
		this.cbgrq = cbgrq;
		this.bgfs = bgfs;
		this.username = username;
	}

	public Long getBusinessId() {
		return this.businessId;
	}

	public void setBusinessId(Long businessId) {
		this.businessId = businessId;
	}

	public Long getMyid() {
		return this.myid;
	}

	public void setMyid(Long myid) {
		this.myid = myid;
	}

	public Date getNhrq() {
		return this.nhrq;
	}

	public void setNhrq(Date nhrq) {
		this.nhrq = nhrq;
	}

	public String getBaobeiId() {
		return this.baobeiId;
	}

	public void setBaobeiId(String baobeiId) {
		this.baobeiId = baobeiId;
	}

	public String getBaogaoId() {
		return this.baogaoId;
	}

	public void setBaogaoId(String baogaoId) {
		this.baogaoId = baogaoId;
	}

	public String getXmmc() {
		return this.xmmc;
	}

	public void setXmmc(String xmmc) {
		this.xmmc = xmmc;
	}

	public String getWeituo() {
		return this.weituo;
	}

	public void setWeituo(String weituo) {
		this.weituo = weituo;
	}

	public String getPgdx() {
		return this.pgdx;
	}

	public void setPgdx(String pgdx) {
		this.pgdx = pgdx;
	}

	public String getGjmd() {
		return this.gjmd;
	}

	public void setGjmd(String gjmd) {
		this.gjmd = gjmd;
	}

	public String getGjff() {
		return this.gjff;
	}

	public void setGjff(String gjff) {
		this.gjff = gjff;
	}

	public Double getPgzz() {
		return this.pgzz;
	}

	public void setPgzz(Double pgzz) {
		this.pgzz = pgzz;
	}

	public Float getBzsf() {
		return this.bzsf;
	}

	public void setBzsf(Float bzsf) {
		this.bzsf = bzsf;
	}

	public Float getYdje() {
		return this.ydje;
	}

	public void setYdje(Float ydje) {
		this.ydje = ydje;
	}

	public Float getKpje() {
		return this.kpje;
	}

	public void setKpje(Float kpje) {
		this.kpje = kpje;
	}

	public Float getDzje() {
		return this.dzje;
	}

	public void setDzje(Float dzje) {
		this.dzje = dzje;
	}

	public Float getZjbl() {
		return this.zjbl;
	}

	public void setZjbl(Float zjbl) {
		this.zjbl = zjbl;
	}

	public Float getSsje() {
		return this.ssje;
	}

	public void setSsje(Float ssje) {
		this.ssje = ssje;
	}

	public String getJjmc() {
		return this.jjmc;
	}

	public void setJjmc(String jjmc) {
		this.jjmc = jjmc;
	}

	public String getYwzb() {
		return this.ywzb;
	}

	public void setYwzb(String ywzb) {
		this.ywzb = ywzb;
	}

	public String getYwzl() {
		return this.ywzl;
	}

	public void setYwzl(String ywzl) {
		this.ywzl = ywzl;
	}

	public String getXckc() {
		return this.xckc;
	}

	public void setXckc(String xckc) {
		this.xckc = xckc;
	}

	public Float getZbgzl() {
		return this.zbgzl;
	}

	public void setZbgzl(Float zbgzl) {
		this.zbgzl = zbgzl;
	}

	public Float getZlgzl() {
		return this.zlgzl;
	}

	public void setZlgzl(Float zlgzl) {
		this.zlgzl = zlgzl;
	}

	public Float getKcgzl() {
		return this.kcgzl;
	}

	public void setKcgzl(Float kcgzl) {
		this.kcgzl = kcgzl;
	}

	public Date getCprq() {
		return this.cprq;
	}

	public void setCprq(Date cprq) {
		this.cprq = cprq;
	}

	public String getBgr() {
		return this.bgr;
	}

	public void setBgr(String bgr) {
		this.bgr = bgr;
	}

	public Date getGzrq() {
		return this.gzrq;
	}

	public void setGzrq(Date gzrq) {
		this.gzrq = gzrq;
	}

	public String getQzpgs() {
		return this.qzpgs;
	}

	public void setQzpgs(String qzpgs) {
		this.qzpgs = qzpgs;
	}

	public Date getSfrq() {
		return this.sfrq;
	}

	public void setSfrq(Date sfrq) {
		this.sfrq = sfrq;
	}

	public String getSkfs() {
		return this.skfs;
	}

	public void setSkfs(String skfs) {
		this.skfs = skfs;
	}

	public String getYwht() {
		return this.ywht;
	}

	public void setYwht(String ywht) {
		this.ywht = ywht;
	}

	public String getSfyfzjf() {
		return this.sfyfzjf;
	}

	public void setSfyfzjf(String sfyfzjf) {
		this.sfyfzjf = sfyfzjf;
	}

	public String getDgwcsm() {
		return this.dgwcsm;
	}

	public void setDgwcsm(String dgwcsm) {
		this.dgwcsm = dgwcsm;
	}

	public String getBeizhu1() {
		return this.beizhu1;
	}

	public void setBeizhu1(String beizhu1) {
		this.beizhu1 = beizhu1;
	}

	public String getBeizhu2() {
		return this.beizhu2;
	}

	public void setBeizhu2(String beizhu2) {
		this.beizhu2 = beizhu2;
	}

	public Date getCbgrq() {
		return this.cbgrq;
	}

	public void setCbgrq(Date cbgrq) {
		this.cbgrq = cbgrq;
	}

	public String getBgfs() {
		return this.bgfs;
	}

	public void setBgfs(String bgfs) {
		this.bgfs = bgfs;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}