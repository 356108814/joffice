package com.htsoft.oa.service.prebusiness;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.business.Business;
import com.htsoft.oa.model.prebusiness.PreBusiness;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface PreBusinessService extends BaseService<PreBusiness> {
    void reportToExcel(List<PreBusiness> businessList, String savePath);

    String getNewBaogaoId(int year, int month);

    PreBusiness getByCode(HttpServletRequest request, String code);

    boolean setIsReport(HttpServletRequest request, String code, boolean isReport);
}
