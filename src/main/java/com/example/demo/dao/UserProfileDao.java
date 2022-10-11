package com.example.demo.dao;

import com.example.demo.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileDao extends JpaRepository<UserProfile,String> {
    /**
     * 通过用户id获取用户详细信息
     * @param userId
     * @return
     */
    UserProfile findUserProfileByUserid(String userId);
}
