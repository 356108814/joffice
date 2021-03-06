package com.htsoft.oa.service.realty;

import com.dream.util.ExportUtil;
import com.dream.util.StringUtil;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.GlobalConfig;
import com.htsoft.oa.dao.realty.RealtyDao;
import com.htsoft.oa.model.realty.Realty;

import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.util.Calendar;
import java.util.List;

public class RealtyServiceImpl extends BaseServiceImpl<Realty> implements RealtyService {
    private RealtyDao realtyDao;

    public RealtyServiceImpl(RealtyDao dao) {
        super(dao);
        this.realtyDao = dao;
    }

    public void reportExcel(List<Realty> realtyList, String savePath) {
        try {
            FileOutputStream out = new FileOutputStream(savePath);
            String titles = "序号,数字编号,拿号日期,报备号,报告编号,项目名称,项目地址,委托单位,估价对象,估计对象类型,价值类型,建筑面积,土地面积,估计时点,价估目的,估计方法,评估单价,评估总值,约定金额,开票金额,到账金额,中介比例,实收金额,合作方,业务主办,主办工作量,业务助理,助理工作量,现场勘查,勘察工作量,初评日期,报告（拟写人）,盖章日期,出报告日期,签字评估师,收费日期（日期空表示未收费）,收款方式,有无合同,否是已付中介费,底稿完成说明,注备1(基本),注备2(收费),录入人";
            String fields = "businessId,myid,nhrq,baobeiId,baogaoId,xmmc,xmdz,weituo,pgdx,gjdxlx,jzlx,jzmj,tdmj,gjsd,gjmd,gjff,pgdj,pgzz,ydje,kpje,dzje,zjbl,ssje,jjmc,ywzb,zbgzl,ywzl,zlgzl,xckc,kcgzl,cprq,bgr,gzrq,cbgrq,qzpgs,sfrq,skfs,ywht,sfyfzjf,dgwcsm,beizhu1,beizhu2,username";
            ExportUtil.ExportXls(realtyList, out, fields, titles);
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public Realty getLastBusiness() {
        Long maxId = this.realtyDao.getLastBusinessId();
        return (Realty)this.realtyDao.get(maxId);
    }

    public void reportMyExcel(List<Realty> realtyList, String savePath) {
        try {
            FileOutputStream out = new FileOutputStream(savePath);
            String titles = "序号,数字编号,拿号日期,报告编号,项目名称,项目地址,委托单位,估价对象,,估计对象类型,价值类型,建筑面积,土地面积,估计时点,价估目的,估计方法,评估单价,评估总值,约定金额,合作方,业务主办,主办工作量,业务助理,助理工作量,现场勘查,勘察工作量,初评日期,报告（拟写人）,盖章日期,出报告日期,签字评估师,收费日期（日期空表示未收费）,有无合同,底稿完成说明,注备1(基本),录入人";
            String fields = "businessId,myid,nhrq,baogaoId,xmmc,xmdz,weituo,pgdx,gjdxlx,jzlx,jzmj,tdmj,gjsd,gjmd,gjff,pgdj,pgzz,dzje,jjmc,ywzb,zbgzl,ywzl,zlgzl,xckc,kcgzl,cprq,bgr,gzrq,cbgrq,qzpgs,sfrq,ywht,dgwcsm,beizhu1,username";
            ExportUtil.ExportXls(realtyList, out, fields, titles);
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    /**
     * 生成规则固定格式+报告数量
     * 穗和顺房字(Y)第0MI号 Y:2017 M:03 I:0001
     * @param year 拿号年
     * @param month 拿号月份
     * @return 新报告号
     */
    @Override
    public String getNewBaogaoId(int year, int month) {
        String baogaoId;

        int baseCount = 0;
        String tpl = "穗和顺房字(Y)第0MI号";
        if(year == 0) {
            // 默认使用当前时间
            Calendar now = Calendar.getInstance();
            year = now.get(Calendar.YEAR);
            month = now.get(Calendar.MONTH) + 1;
        }
        // 解决拿号顺序不连续问题，避免号重复。如：序号到38了，但是实际只拿了24个
        // 只有2017才需要加
        if(year == 2017) {
            baseCount = Integer.parseInt(GlobalConfig.getValue("realty_base_count"));
        }
        // 拿号日期内的报告总数
        String hql = "select count(*) from Realty as b where b.nhrq LIKE ?";
        Object object = this.realtyDao.getUniqueResult(hql, new Object[]{"%" + year+"%"});
        int count = ((BigInteger)object).intValue();
        baogaoId = tpl.replaceAll("Y", String.valueOf(year));
        baogaoId = baogaoId.replaceAll("M", StringUtil.lfill(month, 2));
        baogaoId = baogaoId.replaceAll("I", StringUtil.lfill(baseCount + count + 1, 4));
        return baogaoId;
    }
}
