package com.htsoft.oa.dao.realty;

import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.BaseDao;
import com.htsoft.oa.model.realty.Realty;

import java.util.List;

public interface RealtyDao extends BaseDao<Realty> {
    List<Realty> findBySearch(String var1, PagingBean var2);

    Long getLastBusinessId();
}