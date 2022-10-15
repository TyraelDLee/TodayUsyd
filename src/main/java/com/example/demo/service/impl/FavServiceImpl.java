package com.example.demo.service.impl;

import com.example.demo.dao.FavDao;
import com.example.demo.dao.PostDao;
import com.example.demo.entity.Favorite;
import com.example.demo.entity.Post;
import com.example.demo.service.FavService;
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
    public Favorite storeFav(Favorite favorite) {
        return favDao.save(favorite);
    }

    @Override
    public Iterable<Post> getFavByUserid(String userid) {
        List<Favorite> favorites = favDao.findByUserid(userid);
        List<String> postIDs = new ArrayList<>();
        for (int i = 0; i < favorites.size(); i++) {
            postIDs.add(favorites.get(i).getPostID());
        }
        return postDao.findAllById(postIDs);
    }

    @Override
    public Boolean removeFav(String favID) {
        favDao.deleteById(favID);
        Optional<Favorite> fav = favDao.findById(favID);
        if (null == fav) {
            return true;
        }
        return false;
    }
}
