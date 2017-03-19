package com.htsoft.oa.dao;

/**
 * @author Yuriseus
 * @date 2017-3-19 20:33
 */
public interface BaseDao<T> extends com.htsoft.core.dao.BaseDao {
    Object getUniqueResult(final String hql, final Object[] params);
}
