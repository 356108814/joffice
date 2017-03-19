package com.htsoft.oa.service.realty;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.realty.Realty;
import java.util.List;

public interface RealtyService extends BaseService<Realty> {
    void reportExcel(List<Realty> var1, String var2);

    Realty getLastBusiness();

    void reportMyExcel(List<Realty> var1, String var2);
}