//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.htsoft.oa.service.realty.impl;

import com.dream.util.ExportUtil;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.realty.RealtyDao;
import com.htsoft.oa.model.realty.Realty;
import com.htsoft.oa.service.realty.RealtyService;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

public class RealtyServiceImpl extends BaseServiceImpl<Realty> implements RealtyService {
    private RealtyDao realtyDao;

    public RealtyServiceImpl(RealtyDao dao) {
        super(dao);
        this.realtyDao = dao;
    }

    public void reportExcel(List<Realty> reportList, String savePath) {
        try {
            FileOutputStream out = new FileOutputStream(savePath);
            String e = "序号,数字编号,拿号日期,报备号,报告编号,项目名称,项目地址,委托单位,估价对象,估计对象类型,价值类型,建筑面积,土地面积,估计时点,价估目的,估计方法,评估单价,评估总值,约定金额,开票金额,到账金额,中介比例,实收金额,合作方,业务主办,主办工作量,业务助理,助理工作量,现场勘查,勘察工作量,初评日期,报告（拟写人）,盖章日期,出报告日期,签字评估师,收费日期（日期空表示未收费）,收款方式,有无合同,否是已付中介费,底稿完成说明,注备1(基本),注备2(收费),录入人";
            String filedString = "businessId,myid,nhrq,baobeiId,baogaoId,xmmc,xmdz,weituo,pgdx,gjdxlx,jzlx,jzmj,tdmj,gjsd,gjmd,gjff,pgdj,pgzz,ydje,kpje,dzje,zjbl,ssje,jjmc,ywzb,zbgzl,ywzl,zlgzl,xckc,kcgzl,cprq,bgr,gzrq,cbgrq,qzpgs,sfrq,skfs,ywht,sfyfzjf,dgwcsm,beizhu1,beizhu2,username";
            ExportUtil.ExportXls(reportList, out, filedString, e);
            out.close();
        } catch (FileNotFoundException var6) {
            var6.printStackTrace();
        } catch (IOException var7) {
            var7.printStackTrace();
        }

    }

    public Realty getLastBusiness() {
        Long maxId = this.realtyDao.getLastBusinessId();
        return (Realty)this.realtyDao.get(maxId);
    }

    public void reportMyExcel(List<Realty> reportList, String savePath) {
        try {
            FileOutputStream out = new FileOutputStream(savePath);
            String e = "序号,数字编号,拿号日期,报告编号,项目名称,项目地址,委托单位,估价对象,,估计对象类型,价值类型,建筑面积,土地面积,估计时点,价估目的,估计方法,评估单价,评估总值,约定金额,合作方,业务主办,主办工作量,业务助理,助理工作量,现场勘查,勘察工作量,初评日期,报告（拟写人）,盖章日期,出报告日期,签字评估师,收费日期（日期空表示未收费）,有无合同,底稿完成说明,注备1(基本),录入人";
            String filedString = "businessId,myid,nhrq,baogaoId,xmmc,xmdz,weituo,pgdx,gjdxlx,jzlx,jzmj,tdmj,gjsd,gjmd,gjff,pgdj,pgzz,dzje,jjmc,ywzb,zbgzl,ywzl,zlgzl,xckc,kcgzl,cprq,bgr,gzrq,cbgrq,qzpgs,sfrq,ywht,dgwcsm,beizhu1,username";
            ExportUtil.ExportXls(reportList, out, filedString, e);
            out.close();
        } catch (FileNotFoundException var6) {
            var6.printStackTrace();
        } catch (IOException var7) {
            var7.printStackTrace();
        }

    }
}
