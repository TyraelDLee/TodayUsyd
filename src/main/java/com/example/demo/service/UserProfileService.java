package com.example.demo.service;


import com.example.demo.entity.UserProfile;

public interface UserProfileService {
    /**
     * 通过用户id获取用户详细信息
     * @param userId
     * @return
     */
     UserProfile findUserProfileByUserid(String userId);

     int updateInfo(UserProfile info);
     
}
