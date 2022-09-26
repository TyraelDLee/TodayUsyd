package com.example.demo.service;

import com.example.demo.entity.MarketPost;

import java.util.Optional;

public interface MarketPostService {
    Iterable<MarketPost> getAllMarketPosts();

    Optional<MarketPost> findMarketPostById(String MarketPostID);

    MarketPost saveMarketPost(MarketPost marketPost);

    Boolean deleteMarketPostById(String MarketPostID);

    MarketPost likeTheMarketPost(String MarketPostID);

    MarketPost updateTheMarketPost(String marketPostID, MarketPost newMarketPost);

    Iterable<MarketPost> getMarketPostsByCategory(String category);
}
