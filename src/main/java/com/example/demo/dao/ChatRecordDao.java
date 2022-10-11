package com.example.demo.dao;

import com.example.demo.entity.ChatRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRecordDao extends JpaRepository<ChatRecord,String> {
    @Query(value = "select id,fromuser,touser,content,createtime from chat_record where (fromuser =?1 or fromuser=?2) and (touser=?1 or touser=?2) order by createtime desc",nativeQuery = true)
    List<ChatRecord> findRecordListById(String fromuser, String touser);

}
