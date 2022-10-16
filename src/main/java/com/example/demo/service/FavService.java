package com.example.demo.service;

import com.example.demo.entity.Favorite;
import com.example.demo.entity.Post;
import com.example.demo.utils.ResponseFav;

import java.util.List;
import java.util.Optional;

public interface FavService {
    Optional<Favorite> storeFav(Favorite favorite);

    List<ResponseFav> getFavPostByUserid(String userid);

    Boolean removeFav(String favID);

    List<Favorite> getFavByUserid(String userid);
}
