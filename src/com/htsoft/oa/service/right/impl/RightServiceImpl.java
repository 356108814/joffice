package com.htsoft.oa.service.right.impl;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.right.BaitaiUserRoleDao;
import com.htsoft.oa.model.right.BaitaiUserRole;
import com.htsoft.oa.service.right.RightService;

public class RightServiceImpl extends BaseServiceImpl<BaitaiUserRole> implements RightService {
    private BaitaiUserRoleDao userRoleDao;

    public RightServiceImpl(BaitaiUserRoleDao dao) {
        super(dao);
        this.userRoleDao = dao;
    }
}