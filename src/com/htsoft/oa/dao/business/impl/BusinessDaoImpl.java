//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.htsoft.oa.dao.business.impl;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.business.BusinessDao;
import com.htsoft.oa.model.business.Business;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

public class BusinessDaoImpl extends BaseDaoImpl<Business> implements BusinessDao {
	public BusinessDaoImpl() {
		super(Business.class);
	}

	public List<Business> findBySearch(String searchContent, PagingBean pb) {
		return new ArrayList();
	}

	public Long getLastBusinessId() {
		String hql = "select max(b.businessId) from Business b";
		Long maxRow = (Long)this.getHibernateTemplate().execute(new HibernateCallback() {
			public Object doInHibernate(Session session) throws HibernateException, SQLException {
				Query query = session.createQuery("select max(b.businessId) from Business b");
				return query.uniqueResult();
			}
		});
		if(maxRow == null) {
			maxRow = Long.valueOf(1L);
		}

		return maxRow;
	}
}
