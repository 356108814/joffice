package com.dream.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class FileUtil {
    public FileUtil() {
    }

    public static String getTimeExcelName() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        return sdf.format(new Date()) + ".xls";
    }
}
