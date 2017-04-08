package com.htsoft.oa.dao.prebusiness;

import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.BaseDaoImpl;
import com.htsoft.oa.model.business.Business;
import com.htsoft.oa.model.prebusiness.PreBusiness;

import java.util.List;

/**
 * @author Yuriseus
 * @date 2017-4-5 22:59
 */
public class PreBusinessDaoImpl extends BaseDaoImpl<PreBusiness> implements PreBusinessDao {
    public PreBusinessDaoImpl() {
        super(PreBusiness.class);
    }

    @Override
    public List<Business> findBySearch(String searchContent, PagingBean var2) {
        return null;
    }
}
