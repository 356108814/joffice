//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.htsoft.oa.action.right;

import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.right.RightService;
import javax.annotation.Resource;

public class RightAction extends BaseAction {
    @Resource
    private RightService rightService;
    private Long userId;

    public RightAction() {
    }

    public String getRight() {
        AppUser currentUser = ContextUtil.getCurrentUser();
        Boolean isHasRight = Boolean.valueOf(false);
        if(currentUser.getRoleNames().equals("超级管理员")) {
            isHasRight = Boolean.valueOf(true);
        }

        this.jsonString = "{success:true,data:" + isHasRight + "}";
        return "success";
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
