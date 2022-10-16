package com.example.demo.dao;

import com.example.demo.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileDao extends JpaRepository<UserProfile,String> {
    /**
     * Find user profile by userid
     *
     * @param userId
     * @return
     */
    UserProfile findUserProfileByUserid(String userId);
}
