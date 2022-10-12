package com.example.demo.service;

import com.example.demo.entity.Favorite;
import com.example.demo.entity.Post;

public interface FavService {
    Favorite storeFav(Favorite favorite);

    Iterable<Post> getFavByUserid(String postID);
}
