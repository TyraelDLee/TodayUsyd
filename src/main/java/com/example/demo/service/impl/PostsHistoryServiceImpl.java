package com.example.demo.service.impl;

import com.example.demo.dao.PostsHistoryDao;
import com.example.demo.entity.PostsHistory;
import com.example.demo.service.PostsHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostsHistoryServiceImpl implements PostsHistoryService {

    @Autowired
    private PostsHistoryDao postsHistoryDao;


    @Override
    public List<PostsHistory> queryListByUserid(String userid) {
        return postsHistoryDao.findAllByUserid(userid);
    }

    @Override
    public int saveInfo(PostsHistory entity) {
        PostsHistory rs = postsHistoryDao.save(entity);
        if(rs != null){
            return 1;
        }else{
            return 0;
        }
    }
}
