package com.example.demo.dao;

import com.example.demo.entity.Post;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PostDao extends CrudRepository<Post, String> {
    List<Post> findByType(String type);
    List<Post> findByCategory(String category);


}
