package com.example.demo.utils;

public enum FilterType {
    anno(0,"without restriction"),
    normalUser(1,"normal user"),
    adminUSer(2,"Admin user");


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
