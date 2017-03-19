//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.htsoft.oa.service.business;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.business.Business;
import java.util.List;

public interface BusinessService extends BaseService<Business> {
	void reportExcel(List<Business> var1, String var2);

	Business getLastBusiness();

	void reportMyExcel(List<Business> var1, String var2);
}
