package com.example.demo.service;

import com.example.demo.entity.Favorite;
import com.example.demo.entity.Post;

import java.util.Optional;

public interface FavService {
    Optional<Favorite> storeFav(Favorite favorite);

    Iterable<Post> getFavByUserid(String userid);

    Boolean removeFav(String favID);
}
