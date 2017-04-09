package com.dream.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

/**
 * Properties文件加载工具类
 * @author Yuriseus
 * @date 2017-3-8 14:37
 */
public class PropertiesUtil {

    private static final Log LOG = LogFactory.getLog(PropertiesUtil.class);
    /**
     * 获取配置文件
     * @return Properties
     */
    public static Properties getProperties(String filename) {
        Properties properties = null;
        try {
            properties = new Properties();
            InputStream inputStream = PropertiesUtil.class.getClassLoader().getResourceAsStream(filename);
            properties.load(inputStream);
        } catch (IOException e) {
            LOG.error("load properties exception: " + e.getMessage());
        }
        return properties;
    }

    public static File getPropertyFile(String propertyName) {
        File file = null;
        final URL resource = PropertiesUtil.class.getClassLoader().getResource(propertyName);
        if (resource != null) {
            file = new File(resource.getFile());
        } else {
            LOG.error("Resource not found: " + propertyName);
        }
        return file;
    }
}
