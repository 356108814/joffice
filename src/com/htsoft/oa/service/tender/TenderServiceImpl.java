package com.htsoft.oa.service.tender;

import com.dream.util.ExportUtil;
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.tender.TenderDao;
import com.htsoft.oa.model.tender.Tender;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

public class TenderServiceImpl extends BaseServiceImpl<Tender> implements TenderService{
    private TenderDao tenderDao;

    public TenderServiceImpl(TenderDao dao) {
        super(dao);
        this.tenderDao = dao;
    }

    public void reportExcel(List<Tender> dataList, String savePath) {
        try {
            FileOutputStream out = new FileOutputStream(savePath);
            String titles = "序号,登记日期,发标单位,项目名称,登记号码,标书报价,业务主办,核准人,备注";
            String fields = "id,regdate,company,project,code,offer,sponsor,verifier,remark";
            ExportUtil.ExportXls(dataList, out, fields, titles);
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
