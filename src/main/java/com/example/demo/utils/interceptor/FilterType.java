package com.example.demo.utils.interceptor;

public enum FilterType {
    anno(0,"开放权限"),
    normalUser(1,"普通用户"),
    adminUSer(2,"Admin用户");



    private final int type;
    private final String desc;

    FilterType(int type, String desc) {
        this.type = type;
        this.desc = desc;
    }

    public int getType() {
        return type;
    }

    public String getDesc() {
        return desc;
    }
}
