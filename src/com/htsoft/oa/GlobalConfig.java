package com.htsoft.oa;

import com.dream.util.FileUtil;
import com.dream.util.PropertiesUtil;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Properties;

/**
 * 全局配置
 * @author Yuriseus
 * @date 2017-4-9 13:11
 */
public class GlobalConfig {
    private static Properties properties;

    public static String getValue(String name) {
        if(properties == null) {
            init();
        }
        return properties.getProperty(name);
    }

    // excel相对路径
    public static String getExcelRelativePath() {
        Path path = Paths.get("backup", "tmp", FileUtil.getTimeExcelName());
        return path.toString().replaceAll("\\\\", "/");
    }

    // excel绝对路径
    public static String getSaveExcelPath(HttpServletRequest request) {
        String webRootPath = request.getSession().getServletContext().getRealPath("");
        String excelPath = getExcelRelativePath();
        Path path = Paths.get(webRootPath, excelPath);
        return path.toString().replaceAll("\\\\", "/");
    }

    private static void init() {
        properties = PropertiesUtil.getProperties("oa.properties");
    }
}
