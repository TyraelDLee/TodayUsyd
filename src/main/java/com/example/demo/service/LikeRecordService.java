package com.example.demo.service;

import com.example.demo.entity.LikeRecord;

import java.util.List;

public interface LikeRecordService {
    List<LikeRecord> findByPostID(String postID);

    void saveLikeRecord(LikeRecord likeRecord);
}
