package com.example.demo.dao;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Take;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TakeDao extends JpaRepository<Take,String> {
    @Query(value = "select id,userid,takeuserid from take where takeuserid=?1",nativeQuery = true)
    List<Take> findTakeByTakeuserid(String takeuserid);

    @Query(value = "select id,userid,takeuserid from take where userid=?1",nativeQuery = true)
    List<Take> findTakeByUserid(String userid);
}
