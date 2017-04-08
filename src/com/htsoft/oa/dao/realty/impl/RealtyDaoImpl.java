package com.htsoft.oa.dao.realty.impl;

import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.BaseDaoImpl;
import com.htsoft.oa.dao.realty.RealtyDao;
import com.htsoft.oa.model.realty.Realty;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RealtyDaoImpl extends BaseDaoImpl<Realty> implements RealtyDao {
    public RealtyDaoImpl() {
        super(Realty.class);
    }

    public List<Realty> findBySearch(String searchContent, PagingBean pb) {
        return new ArrayList();
    }

    public Long getLastBusinessId() {
        String hql = "select max(r.businessId) from Realty r";
        Long maxRow = (Long)this.getHibernateTemplate().execute(new HibernateCallback() {
            public Object doInHibernate(Session session) throws HibernateException, SQLException {
                Query query = session.createQuery("select max(r.businessId) from Realty r");
                return query.uniqueResult();
            }
        });
        if(maxRow == null) {
            maxRow = Long.valueOf(1L);
        }

        return maxRow;
    }
}