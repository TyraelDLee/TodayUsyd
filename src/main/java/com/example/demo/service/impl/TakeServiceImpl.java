package com.example.demo.service.impl;


import com.example.demo.dao.TakeDao;
import com.example.demo.entity.Take;
import com.example.demo.service.TakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TakeServiceImpl implements TakeService {
    @Autowired
    private TakeDao takeDao;


    @Override
    public List<Take> findTakeByTakeuserid(String takeuserid) {
        return takeDao.findTakeByTakeuserid(takeuserid);
    }

    @Override
    public List<Take> findTakeByUserid(String userid) {
        return takeDao.findTakeByUserid(userid);
    }
}
