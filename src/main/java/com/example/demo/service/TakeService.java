package com.example.demo.service;


import com.example.demo.entity.ChatRecord;
import com.example.demo.entity.Take;

import java.util.List;

public interface TakeService {
    List<Take> findTakeByTakeuserid(String takeuserid);

    List<Take> findTakeByUserid(String userid);
}
