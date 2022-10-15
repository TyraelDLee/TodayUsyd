package com.example.demo.service.impl;

import com.example.demo.dao.UserDao;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;



@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;
    @Override
    public User queryUserCode(String userCode, String userPwd) {

        User user = userDao.getUserByUsercode(userCode);
//         Use MD5 encryption
        userPwd = DigestUtils.md5DigestAsHex(userPwd.getBytes());

        if (null != user && userPwd.equals(user.getUserpwd())) {
            return user;
        }
        return null;
    }

    @Override
    public User getUserInfo(String userID) {
        User user = userDao.getUserByUserid(userID);

        if (user != null){
            user.setUserpwd("");
            return user;
        }
        return null;
    }

    @Override
    public User getUserByID(String userID) {
        return userDao.getUserByUserid(userID);
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

    @Override
    public int updateLabelUser(String userId, int labelDesc) {

        User user = userDao.findById(userId).get();
        if (null != user) {
            user.setLabeldesc(labelDesc);
            userDao.save(user);
        } else {
            return 0;
        }
        return 1;

    }

    @Override
    public User queryUserByUserid(String userid) {
        return userDao.getUserByUserid(userid);
    }

    @Override
    public int updateUser(User user) {
        User us = userDao.save(user);
        if(us != null){
            return 1;
        }else{
            return 0;
        }
    }
}
