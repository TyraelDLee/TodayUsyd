package com.example.demo.service.impl;

import com.example.demo.dao.UserDao;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.UUID;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;
    @Override
    public User queryUserCode(String userCode, String userPwd) {

        User user = userDao.getUserByUsercode(userCode);
//         使用 MD5加密
        userPwd = DigestUtils.md5DigestAsHex(userPwd.getBytes());
        System.out.println(userPwd);

        if (null != user && userPwd.equals(user.getUserpwd())) {
            return user;
        }
        return null;
    }

    @Override
    public int addUser(User user) {

        user.setUserpwd(DigestUtils.md5DigestAsHex(user.getUserpwd().getBytes()));
//         UUID
        //user.setUserid(UUID.randomUUID().toString().replace("-", ""));
        User us = userDao.save(user);
        if (null != us) {
            return 1;
        }else{
            return 0;
        }
    }
}
