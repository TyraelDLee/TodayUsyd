package com.example.demo.controller;


import com.example.demo.entity.Favorite;
import com.example.demo.service.FavService;
import com.example.demo.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Fav")
@SuppressWarnings("all")
public class FavController {
    @Autowired
    private FavService favService;

    @PostMapping("/addFav")
    public Result addFav(@RequestParam("postID") String postID, @RequestParam("userid") String userid, @RequestParam("userName") String userName) {
        List<Favorite> favorites = favService.getFavByUserid(userid);
        String message = "Done";
        Boolean tag = false;
        for (int i = 0; i < favorites.size(); i++) {
            if (favorites.get(i).getPostID().equals(postID)) {
                tag = true;
                message = "You have favorite this post!";
                break;
            }
        }
        Optional<Favorite> favorite = null;
        if (!tag || favorites == null) {
           favorite = favService.storeFav(new Favorite(postID, userid, userName));
        }
        return new Result(200, message, favorite);
    }

    @GetMapping("/getFav")
    public Result getFav(@RequestParam("userid") String userid) {
        return new Result(favService.getFavPostByUserid(userid));
    }

    @DeleteMapping("/deleteFav")
    public Result deleteFav(@RequestParam("favID") String favID) {
        return new Result(favService.removeFav(favID));
    }

}
