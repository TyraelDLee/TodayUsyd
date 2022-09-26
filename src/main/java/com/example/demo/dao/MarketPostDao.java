package com.example.demo.dao;

import com.example.demo.entity.MarketPost;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MarketPostDao extends CrudRepository<MarketPost, String> {
    List<MarketPost> findByCategory(String category);
}
