package com.htsoft.oa.service.prebusiness;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.business.Business;
import com.htsoft.oa.model.prebusiness.PreBusiness;

import java.util.List;

public interface PreBusinessService extends BaseService<PreBusiness> {
    void reportToExcel(List<PreBusiness> businessList, String savePath);

    String getNewBaogaoId(int year, int month);
}
