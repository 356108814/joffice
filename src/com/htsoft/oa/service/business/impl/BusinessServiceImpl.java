//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.htsoft.oa.service.business.impl;

import com.dream.util.ExportUtil;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.business.BusinessDao;
import com.htsoft.oa.model.business.Business;
import com.htsoft.oa.service.business.BusinessService;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

public class BusinessServiceImpl extends BaseServiceImpl<Business> implements BusinessService {
	private BusinessDao businessDao;

	public BusinessServiceImpl(BusinessDao dao) {
		super(dao);
		this.businessDao = dao;
	}

	public void reportExcel(List<Business> reportList, String savePath) {
		try {
			FileOutputStream out = new FileOutputStream(savePath);
			String e = "序号,数字编号,拿号日期,报备号,报告编号,项目名称,委托单位,评估对象,价估目的,估计方法,评估总值,约定金额,开票金额,到账金额,中介比例,实收金额,合作方,业务主办,主办工作量,业务助理,助理工作量,现场勘查,勘察工作量,初评日期,报告（拟写人）,盖章日期,出报告日期,报告份数,签字评估师,收费日期（日期空表示未收费）,收款方式,有无合同,否是已付中介费,底稿完成说明,注备1(基本),注备2(收费),录入人";
			String filedString = "businessId,myid,nhrq,baobeiId,baogaoId,xmmc,weituo,pgdx,gjmd,gjff,pgzz,ydje,kpje,dzje,zjbl,ssje,jjmc,ywzb,zbgzl,ywzl,zlgzl,xckc,kcgzl,cprq,bgr,gzrq,cbgrq,bgfs,qzpgs,sfrq,skfs,ywht,sfyfzjf,dgwcsm,beizhu1,beizhu2,username";
			ExportUtil.ExportXls(reportList, out, filedString, e);
			out.close();
		} catch (FileNotFoundException var6) {
			var6.printStackTrace();
		} catch (IOException var7) {
			var7.printStackTrace();
		}

	}

	public Business getLastBusiness() {
		Long maxId = this.businessDao.getLastBusinessId();
		return (Business)this.businessDao.get(maxId);
	}

	public void reportMyExcel(List<Business> reportList, String savePath) {
		try {
			FileOutputStream out = new FileOutputStream(savePath);
			String e = "序号,数字编号,拿号日期,报告编号,项目名称,委托单位,评估对象,价估目的,估计方法,评估总值,约定金额,合作方,业务主办,主办工作量,业务助理,助理工作量,现场勘查,勘察工作量,初评日期,报告（拟写人）,盖章日期,出报告日期,报告份数,签字评估师,收费日期（日期空表示未收费）,有无合同,底稿完成说明,注备1(基本),录入人";
			String filedString = "businessId,myid,nhrq,baogaoId,xmmc,weituo,pgdx,gjmd,gjff,pgzz,dzje,jjmc,ywzb,zbgzl,ywzl,zlgzl,xckc,kcgzl,cprq,bgr,gzrq,cbgrq,bgfs,qzpgs,sfrq,ywht,dgwcsm,beizhu1,username";
			ExportUtil.ExportXls(reportList, out, filedString, e);
			out.close();
		} catch (FileNotFoundException var6) {
			var6.printStackTrace();
		} catch (IOException var7) {
			var7.printStackTrace();
		}

	}
}
