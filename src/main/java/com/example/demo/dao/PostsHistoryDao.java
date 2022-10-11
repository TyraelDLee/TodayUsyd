package com.example.demo.dao;

import com.example.demo.entity.PostsHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostsHistoryDao extends JpaRepository<PostsHistory,String> {
    List<PostsHistory> findAllByUserid(String userid);
}
