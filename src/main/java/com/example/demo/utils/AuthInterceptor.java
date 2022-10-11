package com.example.demo.utils;
import com.example.demo.dao.UserDao;
import com.example.demo.entity.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.AsyncHandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
@Configuration
public class AuthInterceptor implements AsyncHandlerInterceptor {
    @Autowired
    private UserDao userDao;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Auth filterAnnotation = handlerMethod.getMethod().getAnnotation(Auth.class);
        if(filterAnnotation==null){
            return true;
        }
        if(filterAnnotation.type().equals(FilterType.anno)){
            return true;
        }
        if(filterAnnotation.type().equals(FilterType.normalUser)){
            request.setCharacterEncoding("UTF-8");
            response.setCharacterEncoding("UTF-8");
            String userid =  getCookieUserId(request);
            User user = userDao.findById(userid).get();

            if(user!=null){
                return true;
            }
            JSONObject res = new JSONObject();
            res.put("success", false);
            res.put("message", "The user has not login");
            PrintWriter out = response.getWriter();
            out.append(res.toString());
            return false;
        }
        if(filterAnnotation.type().equals(FilterType.adminUSer)){
            request.setCharacterEncoding("UTF-8");
            response.setCharacterEncoding("UTF-8");
            String userid =  getCookieUserId(request);
            User user = userDao.findById(userid).get();

            if(user!=null){
                //是admin放行
                if(user.getUserAuth()==2) {
                    JSONObject res = new JSONObject();
                    res.put("success", true);
                    res.put("message", "The user is admin");
                    PrintWriter out = response.getWriter();
                    out.append(res.toString());
                    return true;
                }
                else{
                    JSONObject res = new JSONObject();
                    res.put("success", false);
                    res.put("message", "The uder is normal user");
                    PrintWriter out = response.getWriter();
                    out.append(res.toString());
                    return false;
                }
            }
            JSONObject res = new JSONObject();
            res.put("success", false);
            res.put("message", "The user has not login");
            PrintWriter out = response.getWriter();
            out.append(res.toString());
            return false;
        }
        return true;
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

}
