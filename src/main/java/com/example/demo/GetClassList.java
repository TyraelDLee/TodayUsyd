package com.example.demo;

import org.springframework.web.client.RestTemplate;

import java.util.Calendar;
import java.util.Date;

public class GetClassList implements ApiRequest{
    private int startRank = 1;
    private int rankSize = 1;
    private final int code;

    RestTemplate restTemplate;

    public GetClassList(int startRank, int rankSize) {
        this.startRank = startRank;
        this.rankSize = rankSize;
        this.restTemplate = new RestTemplate();
        Object result = getData();
        this.code = !result.equals("")?0:-1;
    }

    @Override
    public int getCode() {
        return this.code;
    }

    @Override
    public Object getData() {
        Object result = restTemplate.getForObject("https://www.sydney.edu.au/s/search.html?collection=aem_courses_uos-PROD&query=!padrenull&meta_year="+ Calendar.getInstance().get(Calendar.YEAR) +"&form=custom-jsonp&start_rank="+this.startRank+"&num_ranks="+this.rankSize,String.class);
        if (result==null)
            result = "";
        return result;
    }
}
