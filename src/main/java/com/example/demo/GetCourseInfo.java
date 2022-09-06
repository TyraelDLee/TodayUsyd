package com.example.demo;

import org.springframework.web.client.RestTemplate;

public class GetCourseInfo implements ApiRequest{
    private String courseCode = "";
    private String coursePrefix = "";

    private final int code;
    RestTemplate restTemplate;

    public GetCourseInfo(String coursePrefix, String courseCode){
        this.courseCode = courseCode;
        this.coursePrefix = coursePrefix;
        this.restTemplate = new RestTemplate();
        String result = getData();
        this.code = !result.equals("")?0:-1;
    }

    @Override
    public int getCode() {
        return this.code;
    }

    @Override
    public String getData() {
        if (this.courseCode.equals("")||this.coursePrefix.equals("")){
            return "";
        }
        String result = restTemplate.getForObject("https://www.sydney.edu.au/courses/units-of-study/2022/"+coursePrefix+"/"+coursePrefix+courseCode+".coredata.json",String.class);
        if (result==null)
            result = "";
        return result.replaceAll("\n","");
    }
}
