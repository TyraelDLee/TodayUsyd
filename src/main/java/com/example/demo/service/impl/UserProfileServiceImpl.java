package com.example.demo.service.impl;

import com.example.demo.dao.UserProfileDao;
import com.example.demo.entity.UserProfile;
import com.example.demo.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileServiceImpl implements UserProfileService {
    
    @Autowired
    private UserProfileDao userProfileDao;
    
    
    @Override
    public UserProfile findUserProfileByUserid(String userId) {
        return userProfileDao.findUserProfileByUserid(userId);
    }
    
    @Override
    public int updateInfo(UserProfile info) {
        UserProfile entity = userProfileDao.save(info);
        if(entity != null){
            return 1;
        }else{
            return 0;
        }
    }
}
