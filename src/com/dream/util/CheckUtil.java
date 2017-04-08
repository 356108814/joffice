package com.dream.util;

import com.htsoft.core.util.ContextUtil;
import com.htsoft.oa.model.business.Business;
import com.htsoft.oa.model.prebusiness.PreBusiness;
import com.htsoft.oa.model.realty.Realty;
import com.htsoft.oa.model.system.AppUser;

/**
 * @author Yuriseus
 * @date 2017-3-18 11:24
 */
public class CheckUtil {
    public CheckUtil() {
    }

    public static boolean isMyBusiness(Business business) {
        AppUser currentUser = ContextUtil.getCurrentUser();
        String fullname = currentUser.getFullname();
        return business != null && (business.getUsername().equals(fullname) || business.getYwzb().indexOf(fullname) != -1 || business.getYwzl() != null && business.getYwzl().indexOf(fullname) != -1);
    }

    public static boolean isMyRealty(Realty realty) {
        AppUser currentUser = ContextUtil.getCurrentUser();
        String fullname = currentUser.getFullname();
        return realty != null && (realty.getUsername().equals(fullname) || realty.getYwzb().indexOf(fullname) != -1 || realty.getYwzl() != null && realty.getYwzl().indexOf(fullname) != -1);
    }

    public static boolean isMyPreBusiness(PreBusiness business) {
        AppUser currentUser = ContextUtil.getCurrentUser();
        String fullname = currentUser.getFullname();
        return business != null && (business.getRealName().equals(fullname) || business.getYwzb().contains(fullname));
    }
}