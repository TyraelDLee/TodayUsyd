package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.entity.UserProfile;
import com.example.demo.service.UserProfileService;
import com.example.demo.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import java.security.Principal;

@Controller
public class UserProfileController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserProfileService userProfileService;


    //-----------------home-----------------
    @GetMapping("/userProfile/home/index")
    public String home(Principal principal, Model model) {
       /* if(principal == null){
            return "error";
        }
        User user = userService.queryUsername(principal.getName());
        if (user != null) {
            UserProfile profile = userProfileService.findUserProfleByUserid(user.getUserid());
            if(profile != null){
                model.addAttribute("profile", profile);
            }
        } else {
            return "error";
        }*/
        return "userProfile/home/index";
    }

    //-----------------home结束----------------------

    //-----------------friend---------------------------------

    //-----------------friend结束---------------------------------

    //-----------------visited history---------------------------------

    //-----------------visited history 结束---------------------------------

    //-----------------setting---------------------------------

    //-----------------setting结束---------------------------------

}
