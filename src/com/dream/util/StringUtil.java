package com.dream.util;

import java.text.NumberFormat;

/**
 * 字符串工具类
 * @author Yuriseus
 * @date 2017-3-19 18:33
 */
public class StringUtil {

    /**
     * 左边0填充
     * @param number 数字
     * @param width 宽度
     * @return String
     */
    public static String lfill(int number, int width) {
        // 得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        // 设置是否使用分组
        nf.setGroupingUsed(false);
        // 设置最大整数位数
        nf.setMaximumIntegerDigits(width);
        // 设置最小整数位数
        nf.setMinimumIntegerDigits(width);
        return nf.format(number);
    }

    public static void main(String[] args) {
        System.out.println(StringUtil.lfill(123, 4));
    }
}
