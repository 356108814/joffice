package com.htsoft.oa.dao.prebusiness;

import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.BaseDao;
import com.htsoft.oa.model.business.Business;
import com.htsoft.oa.model.prebusiness.PreBusiness;

import java.util.List;

/**
 * @author Yuriseus
 * @date 2017-4-5 22:56
 */
public interface PreBusinessDao extends BaseDao<PreBusiness> {
    List<Business> findBySearch(String searchContent, PagingBean var2);
}
