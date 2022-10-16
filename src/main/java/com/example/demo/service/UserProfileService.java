package com.example.demo.service;


import com.example.demo.entity.UserProfile;

public interface UserProfileService {
    /**
     * Get user's profile details according to userid
     * @param userId
     * @return
     */
     UserProfile findUserProfileByUserid(String userId);

     int updateInfo(UserProfile info);
     
}
