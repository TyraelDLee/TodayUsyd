package com.example.demo.utils;

public class Result {
    private  String msg = "Do successfully";
    private int code=200;
    private Object object;

    public Result() {
    }

    public Result(int code,String msg) {
        this.msg = msg;
        this.code = code;
    }

    public Result(Object object) {
        this.object = object;
    }

    public Result(int code, String msg, Object o){
        this.code = code;
        this.msg = msg;
        this.object = o;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }
}
