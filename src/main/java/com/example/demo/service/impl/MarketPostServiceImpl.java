package com.example.demo.service.impl;

import com.example.demo.dao.MarketPostDao;
import com.example.demo.entity.MarketPost;
import com.example.demo.service.MarketPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@SuppressWarnings("all")
public class MarketPostServiceImpl implements MarketPostService {
    @Autowired
    private MarketPostDao marketPostDao;

    @Override
    public Iterable<MarketPost> getAllMarketPosts() {
        return marketPostDao.findAll();
    }

    @Override
    public Optional<MarketPost> findMarketPostById(String marketPostID) {
        return marketPostDao.findById(marketPostID);
    }

    @Override
    public MarketPost saveMarketPost(MarketPost marketPost) {
        return marketPostDao.save(marketPost);
    }

    @Override
    public Boolean deleteMarketPostById(String marketPostID) {
        marketPostDao.deleteById(marketPostID);
        Optional<MarketPost> marketPost = marketPostDao.findById(marketPostID);
        if (null == marketPost) {
            return true;
        }
        return false;
    }

    @Override
    public MarketPost likeTheMarketPost(String marketPostID) {
        MarketPost marketPost = marketPostDao.findById(marketPostID).orElseThrow(() -> new EntityNotFoundException(marketPostID));
        marketPost.setNumOfLikes(marketPost.getNumOfLikes() + 1);
        return marketPostDao.save(marketPost);
    }

    @Override
    public MarketPost updateTheMarketPost(String marketPostID, MarketPost newMarketPost) {
        MarketPost marketPost = marketPostDao.findById(marketPostID).orElseThrow(() -> new EntityNotFoundException(marketPostID));
        marketPost.setCategory(newMarketPost.getCategory());
        marketPost.setSubject(newMarketPost.getSubject());
        marketPost.setDetails(newMarketPost.getDetails());
        return marketPostDao.save(marketPost);
    }

    @Override
    public Iterable<MarketPost> getMarketPostsByCategory(String category) {
        return marketPostDao.findByCategory(category);
    }
}
