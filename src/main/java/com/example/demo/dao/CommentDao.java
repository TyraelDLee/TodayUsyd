package com.example.demo.dao;

import com.example.demo.entity.ChatRecord;
import com.example.demo.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentDao extends JpaRepository<Comment,String> {
    @Query(value = "select id,content,created_time,postid,userid,username from comments order by created_time desc",nativeQuery = true)
    List<Comment> findLatestPostComment();
}
