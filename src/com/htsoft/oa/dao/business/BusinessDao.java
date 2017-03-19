//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.htsoft.oa.dao.business;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.business.Business;
import java.util.List;

public interface BusinessDao extends BaseDao<Business> {
	List<Business> findBySearch(String var1, PagingBean var2);

	Long getLastBusinessId();
}
