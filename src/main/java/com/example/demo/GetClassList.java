package com.example.demo;

import org.springframework.web.client.RestTemplate;

public class GetClassList implements ApiRequest{
    private int startRank = 1;
    private int rankSize = 1;
    private final int code;

    RestTemplate restTemplate;

    public GetClassList(int startRank, int rankSize) {
        this.startRank = startRank;
        this.rankSize = rankSize;
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
        String result = restTemplate.getForObject("https://www.sydney.edu.au/s/search.html?collection=aem_courses_uos-PROD&query=!padrenull&meta_year="+2022+"&form=custom-jsonp&start_rank="+this.startRank+"&num_ranks="+this.rankSize,String.class);
        if (result==null)
            result = "";
        return result.replaceAll("\n","");
    }
}
