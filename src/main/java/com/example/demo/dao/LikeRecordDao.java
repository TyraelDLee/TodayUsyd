package com.example.demo.dao;

import com.example.demo.entity.LikeRecord;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LikeRecordDao extends CrudRepository<LikeRecord, String> {
    List<LikeRecord> findByPostID(String postID);

}
