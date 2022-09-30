package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import com.example.demo.utils.MailUtil;
import com.example.demo.utils.Result;
import com.example.demo.utils.SecurityCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private MailUtil mailUtil;

    @PostMapping("queryUserLogin")
    public Result queryUserLogin(@RequestParam("userCode") String userCode,
                                 @RequestParam("userPwd") String userPwd, HttpServletResponse response) {

        User user = userService.queryUserCode(userCode, userPwd);
        if (user!=null){
            setCookie(user, response);
        }
        return new Result(user);
    }

    @GetMapping("getUserInfo")
    public Result getUserInfo(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();

        if (cookies !=null){
            for (Cookie cookie : cookies){
                if (cookie.getName().equals("UID")) {
                    System.out.println(cookie.getValue());
                    return new Result(200, "", userService.getUserInfo(cookie.getValue()));
                }
            }
            return new Result(401,"No user fount");
        }
        return new Result(400,"No user given");
    }

    @PostMapping("addUser")
    public Result addUser(@ModelAttribute User user, @RequestParam("securityCode") String securityCode, HttpSession session, HttpServletResponse response) {
        // 获取验证码
        String sc = session.getAttribute("SecurityCode").toString();
        if(sc.equals(securityCode)){
            // 添加用户到数据库
            int row = userService.addUser(user);
            if(row ==1){
                setCookie(user, response);
                return new Result(200,"添加成功");
            } else{
                return new Result(500,"添加失败,系统错误");

            }
        }else{
            return new Result(201,"验证码错误，添加失败");
        }
    }

    @RequestMapping("authSecurityCode/{code}")
    public Result authSecurityCode(@PathVariable("code") String code, HttpServletRequest request, HttpSession session) {
        String myCode = session.getAttribute("SecurityCode").toString();
        if (myCode.equals(code)) {
            // 被验证的邮箱
            String mail = session.getAttribute("SecurityMail").toString();
            String exPath1 = "uni.sydney.edu.au";// USYD学生
            String exPath2 = "sydney.edu.au";// USYD员工
            //  获取用户的ID
            String userId = getCookieUserId(request);
            int row = 0;
            if (mail.lastIndexOf(exPath1) != -1) {
                // 修改  为USYD学生
                row = userService.updateLabelUser(userId,1);

            } else if (mail.lastIndexOf(exPath2) != -1) {
                // 修改  为USYD员工
                row = userService.updateLabelUser(userId,2);
            }else{
                // 不是USYD学生  也不是不是USYD员工
                row = userService.updateLabelUser(userId,3);
            }
            return new Result(row, "验证码正确");

        } else {
            return new Result(201, "验证码错误");
        }
    }

    public String getCookieUserId(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (null != cookies && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("UID")) {
                    return cookie.getValue();
                }
            }
        }
        return "";
    }

    private void setCookie(@ModelAttribute User user, HttpServletResponse response) {
        Cookie sessdata = new Cookie("SESSDATA", DigestUtils.md5DigestAsHex(user.getUserpwd().getBytes()));
        sessdata.setHttpOnly(true);
        sessdata.setMaxAge(30*24*3600);
        response.addCookie(sessdata);
        Cookie uid = new Cookie("UID", user.getUserid());
        uid.setMaxAge(30*24*3600);
        response.addCookie(uid);
    }

    @PostMapping("logout")
    public Result logout(HttpServletResponse response){
        Cookie sessdata = new Cookie("SESSDATA",null);
        sessdata.setHttpOnly(true);
        sessdata.setMaxAge(0);
        response.addCookie(sessdata);
        Cookie uid = new Cookie("UID", null);
        uid.setMaxAge(0);
        response.addCookie(uid);
        return new Result(200, "Success");
    }

    @RequestMapping("getSecurityCode/{to}")
    public Result getSecurityCode(@PathVariable("to") String to, HttpSession session) {
        //验证码有效期为 10s
        session.setMaxInactiveInterval(60 * 10);

        String sc = SecurityCode.getCharAndNumr(6);
        // 验证码保存在了session中
        session.setAttribute("SecurityCode", sc);
        //to 被验证的邮箱
        session.setAttribute("SecurityMail", to);
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