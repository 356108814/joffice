package com.htsoft.oa.service.tender;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.tender.Tender;

import java.util.List;

public interface TenderService extends BaseService<Tender> {
    void reportExcel(List<Tender> dataList, String savePath);
}