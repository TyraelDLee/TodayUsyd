package com.example.demo.dao;

import com.example.demo.entity.Favorite;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FavDao extends CrudRepository<Favorite, String> {
    List<Favorite> findByUserid(String userid);
}
