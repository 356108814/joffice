//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.htsoft.oa.model.right;

import com.htsoft.oa.model.right.BaitaiRole;
import com.htsoft.oa.model.system.AppUser;
import java.io.Serializable;

public class BaitaiUserRoleId implements Serializable {
    private AppUser appUser;
    private BaitaiRole baitaiRole;

    public BaitaiUserRoleId() {
    }

    public BaitaiUserRoleId(AppUser appUser, BaitaiRole baitaiRole) {
        this.appUser = appUser;
        this.baitaiRole = baitaiRole;
    }

    public AppUser getAppUser() {
        return this.appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public BaitaiRole getBaitaiRole() {
        return this.baitaiRole;
    }

    public void setBaitaiRole(BaitaiRole baitaiRole) {
        this.baitaiRole = baitaiRole;
    }

    public boolean equals(Object other) {
        if(this == other) {
            return true;
        } else if(other == null) {
            return false;
        } else if(!(other instanceof BaitaiUserRoleId)) {
            return false;
        } else {
            BaitaiUserRoleId castOther = (BaitaiUserRoleId)other;
            return (this.getAppUser() == castOther.getAppUser() || this.getAppUser() != null && castOther.getAppUser() != null && this.getAppUser().equals(castOther.getAppUser())) && (this.getBaitaiRole() == castOther.getBaitaiRole() || this.getBaitaiRole() != null && castOther.getBaitaiRole() != null && this.getBaitaiRole().equals(castOther.getBaitaiRole()));
        }
    }

    public int hashCode() {
        byte result = 17;
        int result1 = 37 * result + (this.getAppUser() == null?0:this.getAppUser().hashCode());
        result1 = 37 * result1 + (this.getBaitaiRole() == null?0:this.getBaitaiRole().hashCode());
        return result1;
    }
}
