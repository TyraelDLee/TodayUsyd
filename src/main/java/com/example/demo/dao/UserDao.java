package com.example.demo.dao;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User,String> {
    /**
     * 通过邮箱账号查询 用户
     * @param userCode
     * @return
     */
    User getUserByUsercode(String userCode);

    User getUserByUserid(String userID);


}