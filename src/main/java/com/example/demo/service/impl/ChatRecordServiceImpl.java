package com.example.demo.service.impl;

import com.example.demo.dao.ChatRecordDao;
import com.example.demo.entity.ChatRecord;
import com.example.demo.service.ChatRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatRecordServiceImpl implements ChatRecordService {
    @Autowired
    private ChatRecordDao chatRecordDao;

    @Override
    public List<ChatRecord> findRecordListById(String fromuser, String touser) {
        return chatRecordDao.findRecordListById(fromuser,touser);
    }

    @Override
    public int saveInfo(ChatRecord info) {
        ChatRecord rs = chatRecordDao.save(info);
        if(rs != null){
            return 1;
        }else{
            return 0;
        }
    }
}
