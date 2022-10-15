package com.example.demo.dao;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User,String> {
    /**
     * Query the user by email account
     * @param userCode
     * @return
     */
    User getUserByUsercode(String userCode);

    User getUserByUserid(String userID);


}