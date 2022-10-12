package com.example.demo.service;


import com.example.demo.entity.PostsHistory;

import java.util.List;

public interface PostsHistoryService {

    List<PostsHistory> queryListByUserid(String userid);

    public int saveInfo(PostsHistory entity);
}
