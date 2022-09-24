package com.example.demo.service.impl;

import com.example.demo.dao.UserProfileDao;
import com.example.demo.entity.UserProfile;
import com.example.demo.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * UserProfile服务接口实现
 */
@Service
public class UserProfileServiceImpl implements UserProfileService {

    @Autowired
    private UserProfileDao userProfileDao;


    @Override
    public UserProfile findUserProfileByUserid(String userId) {
        return userProfileDao.findUserProfleByUserid(userId);
    }
}
