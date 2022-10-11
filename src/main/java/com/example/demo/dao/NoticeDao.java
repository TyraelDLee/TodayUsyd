package com.example.demo.dao;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Notice;
import com.example.demo.entity.Take;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NoticeDao extends JpaRepository<Notice,String> {
    @Query(value = "select id,acpuserid,acpusername,content,created_time,isread,postid,pubuserid,pubusername from notice where acpuserid=?1 and isread=0 order by created_time desc",nativeQuery = true)
    List<Notice> findNoticeByUserid(String userid);

}
