package com.htsoft.oa.service.realty;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.realty.Realty;
import java.util.List;

public interface RealtyService extends BaseService<Realty> {
    void reportExcel(List<Realty> realtyList, String savePath);

    Realty getLastBusiness();

    void reportMyExcel(List<Realty> realtyList, String savePath);

    String getNewBaogaoId(int year, int month);
}