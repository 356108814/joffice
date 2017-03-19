//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.htsoft.oa.model.right;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class BaitaiRole implements Serializable {
    private Long roleId;
    private String roleName;
    private String roleDesc;
    private String rights;
    private Set baitaiUserRoles = new HashSet(0);

    public BaitaiRole() {
    }

    public BaitaiRole(Long roleId, String roleName) {
        this.roleId = roleId;
        this.roleName = roleName;
    }

    public BaitaiRole(Long roleId, String roleName, String roleDesc, String rights, Set baitaiUserRoles) {
        this.roleId = roleId;
        this.roleName = roleName;
        this.roleDesc = roleDesc;
        this.rights = rights;
        this.baitaiUserRoles = baitaiUserRoles;
    }

    public Long getRoleId() {
        return this.roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return this.roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleDesc() {
        return this.roleDesc;
    }

    public void setRoleDesc(String roleDesc) {
        this.roleDesc = roleDesc;
    }

    public String getRights() {
        return this.rights;
    }

    public void setRights(String rights) {
        this.rights = rights;
    }

    public Set getBaitaiUserRoles() {
        return this.baitaiUserRoles;
    }

    public void setBaitaiUserRoles(Set baitaiUserRoles) {
        this.baitaiUserRoles = baitaiUserRoles;
    }
}
