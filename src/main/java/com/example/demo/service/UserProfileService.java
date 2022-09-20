package com.example.demo.service;


import com.example.demo.entity.UserProfile;

/**
 * UserProfile服务接口
 */
public interface UserProfileService {
    /**
     * 通过用户id获取用户详细信息
     * @param userId
     * @return
     */
    UserProfile findUserProfileByUserid(String userId);

}
