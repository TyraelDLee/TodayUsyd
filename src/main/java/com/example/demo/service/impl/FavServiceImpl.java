package com.example.demo.service.impl;

import com.example.demo.dao.FavDao;
import com.example.demo.dao.PostDao;
import com.example.demo.entity.Favorite;
import com.example.demo.entity.Post;
import com.example.demo.service.FavService;
import com.example.demo.utils.ResponseFav;
import org.assertj.core.util.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@SuppressWarnings("all")
public class FavServiceImpl implements FavService {
    @Autowired
    private FavDao favDao;

    @Autowired
    private PostDao postDao;

    @Override
    public Optional<Favorite> storeFav(Favorite favorite) {
        favDao.save(favorite);
        return favDao.findById(favorite.getFavID());
    }

    @Override
    public List<ResponseFav> getFavPostByUserid(String userid) {
        List<Favorite> favorites = favDao.findByUserid(userid);
        List<String> postIDs = new ArrayList<>();
        for (int i = 0; i < favorites.size(); i++) {
            postIDs.add(favorites.get(i).getPostID());
        }

        Iterable<Post> posts = postDao.findAllById(postIDs);
        List<Post> postList = Lists.newArrayList(posts);
        List<ResponseFav> responseFavs = new ArrayList<>();
        for (int i = 0; i < favorites.size(); i++) {
            responseFavs.add(new ResponseFav(favorites.get(i).getFavID(), postList.get(i)));
        }
        return responseFavs;
    }

    @Override
    public Boolean removeFav(String favID) {

        Optional<Favorite> fav = favDao.findById(favID);
        if (fav != null) {favDao.deleteById(favID);}
        fav = favDao.findById(favID);
        if (null == fav) {
            return true;
        }
        return false;
    }

    @Override
    public List<Favorite> getFavByUserid(String userid) {
        return favDao.findByUserid(userid);
    }
}
