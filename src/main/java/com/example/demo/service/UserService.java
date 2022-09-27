package com.example.demo.service;

import com.example.demo.entity.User;

public interface UserService {
  /**
   *  用户登录查询
   * @param userCode 账号
   * @param userPwd 密码
   * @return 用户对象
   */
  User queryUserCode(String userCode, String userPwd);

  User getUserInfo(String userID);

  /**
   * 添加用户 --注册
   * @param user
   * @return
   */
  int addUser(User user);
}
