package com.example.demo.dao;

import com.example.demo.entity.MarketPost;
import org.springframework.data.repository.CrudRepository;

public interface MarketPostDao extends CrudRepository<MarketPost,String> {
}
