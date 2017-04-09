package com.dream.util;

import org.apache.poi.hssf.usermodel.*;

import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 * 导出工具类
 */
public class ExportUtil {
    public ExportUtil() {
    }

    public static void ExportXls(List dataList, OutputStream outputStream, String fields, String titles) {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet localHSSFSheet = workbook.createSheet("sheet1");
        HSSFRow row = localHSSFSheet.createRow(0);
        HSSFCell cell = null;
        HSSFCellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setAlignment((short) 1);
        cellStyle.setAlignment((short) 2);
        HSSFFont font = workbook.createFont();
        font.setBoldweight((short) 700);
        cellStyle.setFont(font);
        String[] titleArray = titles.split(",");

        for (int title = 0; title < titleArray.length; ++title) {
            cell = row.createCell(title);
            cell.setCellStyle(cellStyle);
            cell.setCellValue(titleArray[title]);
        }

        if (dataList != null && dataList.size() > 0) {
            cellStyle = workbook.createCellStyle();
            cellStyle.setAlignment((short) 1);
            cellStyle.setAlignment((short) 2);
            font = workbook.createFont();
            font.setBoldweight((short) 400);
            cellStyle.setFont(font);
            String[] fieldArray = fields.split(",");
            String str = "";

            for (int j = 0; j < dataList.size(); ++j) {
                row = localHSSFSheet.createRow((short) j + 1);
                Object data = dataList.get(j);

                for (int k = 0; k < fieldArray.length; ++k) {
                    str = getValue(fieldArray[k], data);
                    cell = row.createCell(k);
                    cell.setCellStyle(cellStyle);
                    cell.setCellValue(str);
                    localHSSFSheet.autoSizeColumn((short) k);
                }
            }
        }

        try {
            workbook.write(outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static String getValue(String paramString, Object paramObject) {
        String value = "";
        String getMethodName = "";
        Object invokeObj = null;
        Method localMethod = null;

        try {
            if (!paramString.contains("javaRenderer")) {
                getMethodName = "get" + paramString.substring(0, 1).toUpperCase() + paramString.substring(1, paramString.length());
                localMethod = paramObject.getClass().getMethod(getMethodName, (Class[]) null);
                if (localMethod != null) {
                    String localIllegalAccessException = localMethod.getReturnType().getName();
                    invokeObj = localMethod.invoke(paramObject, (Object[]) null);
                    if (localIllegalAccessException.contains("Date")) {
                        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                        if (invokeObj != null) {
                            value = df.format(invokeObj);
                        }
                    } else if (!localIllegalAccessException.contains("Interger") && !localIllegalAccessException.contains("Float") && !localIllegalAccessException.contains("Double") && !localIllegalAccessException.contains("Long")) {
                        if (localIllegalAccessException.contains("String")) {
                            if (invokeObj == null) {
                                value = "";
                            } else {
                                value = String.valueOf(invokeObj);
                            }
                        } else {
                            value = String.valueOf(invokeObj);
                        }
                    } else if (invokeObj != null) {
                        DecimalFormat df1 = (DecimalFormat) DecimalFormat.getInstance();
                        df1.setGroupingSize(3);
                        value = df1.format(invokeObj);
                    } else {
                        value = String.valueOf(0);
                    }
                }
            } else {
                getMethodName = paramString.split("javaRenderer")[1];
                localMethod = paramObject.getClass().getMethod(getMethodName, (Class<?>) null);
                value = String.valueOf(localMethod.invoke(paramObject, (Object[]) null));
            }
        } catch (SecurityException | NoSuchMethodException | InvocationTargetException | IllegalAccessException e) {
            e.printStackTrace();
        }

        return value;
    }
}
