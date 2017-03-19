package com.htsoft.oa.dao;

import org.hibernate.HibernateException;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;

import java.sql.SQLException;

/**
 * @author Yuriseus
 * @date 2017-3-19 20:33
 */
public class BaseDaoImpl<T> extends com.htsoft.core.dao.impl.BaseDaoImpl {
    public BaseDaoImpl(Class aClass) {
        super(aClass);
    }

    /**
     * 查询
     * @param hql 查询语句
     * @param params 参数
     * @return Object
     */
    public Object getUniqueResult(final String hql, final Object[] params) {
        return this.getHibernateTemplate().execute(new HibernateCallback() {
            public Object doInHibernate(Session var1) throws HibernateException, SQLException {
                SQLQuery sqlQuery = var1.createSQLQuery(hql);
                if(params != null) {
                    for(int i = 0; i < params.length; i++) {
                        sqlQuery.setParameter(i, params[i]);
                    }
                }

                return sqlQuery.uniqueResult();
            }
        });
    }
}
