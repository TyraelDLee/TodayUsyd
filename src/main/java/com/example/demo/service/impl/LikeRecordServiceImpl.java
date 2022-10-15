package com.example.demo.service.impl;

import com.example.demo.dao.LikeRecordDao;
import com.example.demo.entity.LikeRecord;
import com.example.demo.service.LikeRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@SuppressWarnings("all")
public class LikeRecordServiceImpl implements LikeRecordService {
    @Autowired
    private LikeRecordDao likeRecordDao;

    @Override
    public List<LikeRecord> findByPostID(String postID) {

        return likeRecordDao.findByPostID(postID);

    }

    @Override
    public void saveLikeRecord(LikeRecord likeRecord) {
        likeRecordDao.save(likeRecord);
    }


}
