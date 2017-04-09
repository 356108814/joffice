package com.dream.util;

import com.htsoft.core.util.AppUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class RightUtil {
    public static Map<String, ArrayList<Long>> rightMap;
    public static boolean isInitedRight;

    public RightUtil() {
    }

    public static boolean isCanListAll(Long userId) {
        if(!isInitedRight) {
            initRight();
            isInitedRight = true;
        }

        ArrayList listAll = (ArrayList)rightMap.get("right_listAll");
        return listAll.contains(userId);
    }

    private static void initRight() {
        rightMap = new HashMap<>();
        ArrayList<Long> rightListAll = rightStrToArrayList("right_listAll");
        rightMap.put("right_listAll", rightListAll);
    }

    public static ArrayList<Long> rightStrToArrayList(String rightKey) {
        String rightStr = (String)AppUtil.getSysConfig().get(rightKey);
        String[] tmp = rightStr.split("\\|");
        ArrayList<Long> rightList = new ArrayList<>();

        for(int i = 0; i < tmp.length; ++i) {
            rightList.add(Long.parseLong(tmp[i]));
        }

        return rightList;
    }
}
