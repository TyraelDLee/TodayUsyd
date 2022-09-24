package com.example.demo.dao;

import com.example.demo.entity.Post;
import org.springframework.data.repository.CrudRepository;

public interface PostDao extends CrudRepository<Post,String> {
}
