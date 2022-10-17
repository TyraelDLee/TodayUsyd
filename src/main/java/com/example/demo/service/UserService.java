package com.example.demo.service;

import com.example.demo.entity.User;

public interface UserService {
  /**
   *  Login
   * @param userCode
   * @param userPwd
   * @return User
   */
  User queryUserCode(String userCode, String userPwd);

  User getUserInfo(String userID);

  /**
   * Add user - Register
   * @param user
   * @return
   */
  int addUser(User user);

  int updateLabelUser(String userId,int type);

  int updateUserName(String userId,String username);
  
  User queryUserByUserid(String userid);
  
  int updateUser(User user);

  User getUserByID(String userID);
}
