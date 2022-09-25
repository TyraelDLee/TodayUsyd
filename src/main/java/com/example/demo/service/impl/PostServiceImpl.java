package com.example.demo.service.impl;

import com.example.demo.dao.PostDao;
import com.example.demo.entity.Post;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@SuppressWarnings("all")
public class PostServiceImpl implements PostService {
    @Autowired
    private PostDao postDao;

    @Override
    public Iterable<Post> getAllPosts() {
        return postDao.findAll();
    }

    @Override
    public Optional<Post> findPostById(String postID) {
        return postDao.findById(postID);
    }

    public Post savePost(Post post){
        return postDao.save(post);
    }

    @Override
    public void deletePostById(String postID) {
        postDao.deleteById(postID);
    }

    @Override
    public Post likeThePost(String postID) {
        Post post  = postDao.findById(postID).orElseThrow(() -> new EntityNotFoundException(postID));
        //post.setNumOfLikes(post.getNumOfLikes()+1);
        return postDao.save(post);
    }
}