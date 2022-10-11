package com.example.demo.service;


import com.example.demo.entity.ChatRecord;

import java.util.List;

public interface ChatRecordService {
    List<ChatRecord> findRecordListById(String fromuser, String touser);

    int saveInfo(ChatRecord info);
}
