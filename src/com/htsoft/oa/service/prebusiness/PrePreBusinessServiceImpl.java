package com.htsoft.oa.service.prebusiness;

import com.dream.util.ExportUtil;
import com.dream.util.StringUtil;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.GlobalConfig;
import com.htsoft.oa.dao.prebusiness.PreBusinessDao;
import com.htsoft.oa.model.prebusiness.PreBusiness;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.http.HttpServletRequest;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.util.Calendar;
import java.util.List;

public class PrePreBusinessServiceImpl extends BaseServiceImpl<PreBusiness> implements PreBusinessService {
    private static final Log logger = LogFactory.getLog(PrePreBusinessServiceImpl.class);
    private PreBusinessDao businessDao;

    public PrePreBusinessServiceImpl(PreBusinessDao dao) {
        super(dao);
        this.businessDao = dao;
    }

    public void reportToExcel(List<PreBusiness> businessList, String savePath) {
        try {
            String reportTitles = "序号,拿号日期,报告编号,委托单位,评估对象,评估总值,业务主办,盖章日期,签字评估师,注备,录入人";
            String reportFields = "id,nhrq,code,weituo,pgdx,pgzz,ywzb,gzrq,qzpgs,beizhu,realName";
            FileOutputStream out = new FileOutputStream(savePath);
            ExportUtil.ExportXls(businessList, out, reportFields, reportTitles);
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 生成规则固定格式+报告数量
     * 穗和顺预字(Y)第0MI号 Y:2017 M:03 I:001
     * @param year 拿号年
     * @param month 拿号月份
     * @return 新报告号
     */
    @Override
    public String getNewBaogaoId(int year, int month) {
        String baogaoId;

        int baseCount = 0;
        String tpl = "穗和顺预字(Y)第0MI号";
        if(year == 0) {
            // 默认使用当前时间
            Calendar now = Calendar.getInstance();
            year = now.get(Calendar.YEAR);
            month = now.get(Calendar.MONTH) + 1;
        }
        // 解决拿号顺序不连续问题，避免号重复。如：序号到38了，但是实际只拿了24个
        // 只有2017才需要加
        if(year == 2017) {
            baseCount = Integer.parseInt(GlobalConfig.getValue("pre_business_base_count"));
        }
        // 拿号日期内的报告总数
        String hql = "select count(*) from pre_business as b where b.nhrq LIKE ?";
        Object object = this.businessDao.getUniqueResult(hql, new Object[]{"%" + year+"%"});
        int count = ((BigInteger)object).intValue();
        baogaoId = tpl.replaceAll("Y", String.valueOf(year));
        baogaoId = baogaoId.replaceAll("M", StringUtil.lfill(month, 2));
        baogaoId = baogaoId.replaceAll("I", StringUtil.lfill(baseCount + count + 1, 3));
        return baogaoId;
    }

    public PreBusiness getByCode(HttpServletRequest request, String code) {
        QueryFilter filter = new QueryFilter(request);
        filter.addFilter("Q_code_S_EQ", code);
        PreBusiness business = null;
        List<PreBusiness> list = this.getAll(filter);
        if(!list.isEmpty()) {
            business = list.get(0);
        }
        return business;
    }

    @Override
    public boolean setIsReport(HttpServletRequest request, String code, boolean isReport) {
        PreBusiness preBusiness = getByCode(request, code);
        if(preBusiness != null) {
            String is = isReport?"是":"否";
            preBusiness.setIsReport(is);
        }
        return false;
    }
}
