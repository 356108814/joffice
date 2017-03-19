//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.dream.util;

import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.List;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

public class ExportUtil {
  public ExportUtil() {
  }

  public static void ExportXls(List paramList, OutputStream paramOutputStream, String fieldParamString, String titleParamString) {
    HSSFWorkbook localHSSFWorkbook = new HSSFWorkbook();
    HSSFSheet localHSSFSheet = localHSSFWorkbook.createSheet("sheet1");
    HSSFRow localHSSFRow = localHSSFSheet.createRow(0);
    HSSFCell localHSSFCell = null;
    HSSFCellStyle localCellStyle = localHSSFWorkbook.createCellStyle();
    localCellStyle.setAlignment((short)1);
    localCellStyle.setAlignment((short)2);
    HSSFFont localFont = localHSSFWorkbook.createFont();
    localFont.setBoldweight((short)700);
    localCellStyle.setFont(localFont);
    String[] arrayOfString1 = titleParamString.split(",");

    for(int localIOException = 0; localIOException < arrayOfString1.length; ++localIOException) {
      localHSSFCell = localHSSFRow.createCell(localIOException);
      localHSSFCell.setCellStyle(localCellStyle);
      localHSSFCell.setCellValue(arrayOfString1[localIOException]);
    }

    if(paramList != null && paramList.size() > 0) {
      localCellStyle = localHSSFWorkbook.createCellStyle();
      localCellStyle.setAlignment((short)1);
      localCellStyle.setAlignment((short)2);
      localFont = localHSSFWorkbook.createFont();
      localFont.setBoldweight((short)400);
      localCellStyle.setFont(localFont);
      String[] var17 = fieldParamString.split(",");
      String str = "";

      for(int j = 0; j < paramList.size(); ++j) {
        localHSSFRow = localHSSFSheet.createRow((short)j + 1);
        Object localObject2 = paramList.get(j);

        for(int k = 0; k < var17.length; ++k) {
          str = getValue(var17[k], localObject2);
          localHSSFCell = localHSSFRow.createCell(k);
          localHSSFCell.setCellStyle(localCellStyle);
          localHSSFCell.setCellValue(str);
          localHSSFSheet.autoSizeColumn((short)k);
          str = "";
        }
      }
    }

    try {
      localHSSFWorkbook.write(paramOutputStream);
    } catch (IOException var16) {
      var16.printStackTrace();
    }

  }

  public static String getValue(String paramString, Object paramObject) {
    String str1 = "";
    String str2 = "";
    Object invokeObj = null;
    Method localMethod = null;

    try {
      if(paramString.indexOf("javaRenderer") == -1) {
        str2 = "get" + paramString.substring(0, 1).toUpperCase() + paramString.substring(1, paramString.length());
        localMethod = paramObject.getClass().getMethod(str2, (Class[])null);
        if(localMethod != null) {
          String localIllegalAccessException = localMethod.getReturnType().getName();
          invokeObj = localMethod.invoke(paramObject, (Object[])null);
          if(localIllegalAccessException.indexOf("Date") != -1) {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            if(invokeObj != null) {
              str1 = df.format(invokeObj);
            }
          } else if(localIllegalAccessException.indexOf("Interger") == -1 && localIllegalAccessException.indexOf("Float") == -1 && localIllegalAccessException.indexOf("Double") == -1 && localIllegalAccessException.indexOf("Long") == -1) {
            if(localIllegalAccessException.indexOf("String") != -1) {
              if(invokeObj == null) {
                str1 = "";
              } else {
                str1 = String.valueOf(invokeObj);
              }
            } else {
              str1 = String.valueOf(invokeObj);
            }
          } else if(invokeObj != null) {
            DecimalFormat df1 = (DecimalFormat)DecimalFormat.getInstance();
            df1.setGroupingSize(3);
            str1 = df1.format(invokeObj);
          } else {
            str1 = String.valueOf(0);
          }
        }
      } else {
        str2 = paramString.split("javaRenderer")[1];
        localMethod = paramObject.getClass().getMethod(str2, (Class[])null);
        str1 = String.valueOf(localMethod.invoke(paramObject, (Object[])null));
      }
    } catch (SecurityException var8) {
      var8.printStackTrace();
    } catch (NoSuchMethodException var9) {
      var9.printStackTrace();
    } catch (InvocationTargetException var10) {
      var10.printStackTrace();
    } catch (IllegalAccessException var11) {
      var11.printStackTrace();
    }

    return str1;
  }
}
