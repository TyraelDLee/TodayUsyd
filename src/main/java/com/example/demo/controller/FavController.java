package com.example.demo.controller;


import com.example.demo.entity.Favorite;
import com.example.demo.service.FavService;
import com.example.demo.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Fav")
@SuppressWarnings("all")
public class FavController {
    @Autowired
    private FavService favService;

    @PostMapping("/addFav")
    public Result addFav(@RequestParam("postID") String postID, @RequestParam("userid") String userid, @RequestParam("userName") String userName) {
        return new Result(favService.storeFav(new Favorite(postID, userid, userName)));
    }

    @GetMapping("/getFav")
    public Result getFav(@RequestParam("userid") String userid) {
        return new Result(favService.getFavByUserid(userid));
    }

    @DeleteMapping("/deleteFav")
    public Result deleteFav(@RequestParam("favID") String favID) {
        return new Result(favService.removeFav(favID));
    }

}
