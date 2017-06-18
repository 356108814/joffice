package com.htsoft.oa.dao.tender;

import com.htsoft.oa.dao.BaseDaoImpl;
import com.htsoft.oa.model.tender.Tender;

public class TenderDaoImpl extends BaseDaoImpl<Tender> implements TenderDao{
    public TenderDaoImpl() {
        super(Tender.class);
    }
}