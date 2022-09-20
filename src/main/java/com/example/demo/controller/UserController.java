package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import com.example.demo.utils.MailUtil;
import com.example.demo.utils.Result;
import com.example.demo.utils.SecurityCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import javax.servlet.http.HttpSession;


@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private MailUtil mailUtil;

    @PostMapping("queryUserLogin")
    public Result queryUserLogin(@RequestParam("userCode") String userCode,
                                 @RequestParam("userPwd") String userPwd) {

        User user = userService.queryUserCode(userCode, userPwd);
        return new Result(user);
    }

    @PostMapping("addUser")
    public Result addUser(@ModelAttribute User user,@RequestParam("uname") String uname,@RequestParam("uemail") String uemail,@RequestParam("passw") String passw,@RequestParam("securityCode") String securityCode,HttpSession session) {
        // 获取验证码

        String sc = session.getAttribute("SecurityCode").toString();
        if(sc.equals(securityCode)){
            // 添加用户到数据库
            user.setUsername(uname);
            user.setUserpwd(passw);
            user.setUsercode(uemail);
            int row = userService.addUser(user);
            if(row ==1){
                return new Result(200,"添加成功");

            } else{
                return new Result(500,"添加失败,系统错误");
            }
        }else{
            return new Result(201,"验证码错误，添加失败");
        }
    }

    @RequestMapping("getSecurityCode/{to}")
    public Result getSecurityCode(@PathVariable("to") String to, HttpSession session) {
        //验证码有效期为 10s
        session.setMaxInactiveInterval(60 * 10);

        String sc = SecurityCode.getCharAndNumr(6);
        // 验证码保存在了session中
        session.setAttribute("SecurityCode", sc);
        StringBuffer html = new StringBuffer();
        html.append("<html>");
        html.append("<body>");
        html.append("<h2 style='color:red;'>您的验证码是: " + sc + "</h2>");
        html.append("<p> 该验证码10分钟内有效</p>");
        html.append("</body>");
        html.append("</html>");
        try {
            mailUtil.sendHtmlMail(to, "注册验证码", html.toString());
        } catch (MessagingException e) {
//            e.printStackTrace();
            return new Result("发送失败");
        }
        return new Result("发送成功");

    }


}
