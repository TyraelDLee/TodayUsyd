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
    public Iterable<Post> getPostsByType(String type) {
        return postDao.findByType(type);
    }

    @Override
    public Iterable<Post> getPostsByCategory(String category) {
        return postDao.findByCategory(category);
    }

    @Override
    public Optional<Post> findPostById(String postID) {
        return postDao.findById(postID);
    }

    @Override
    public Post savePost(Post post) {
        return postDao.save(post);
    }

    @Override
    public Post updatePost(String postID, Post newPost) {
        Post post = postDao.findById(postID).orElseThrow(() -> new EntityNotFoundException(postID));
        post.setCategory(newPost.getCategory());
        post.setTitle(newPost.getTitle());
        post.setDetails(newPost.getDetails());
        return postDao.save(post);
    }

    @Override
    public Post updatePostInvisible(String postID) {
        Post post = postDao.findById(postID).orElseThrow(() -> new EntityNotFoundException(postID));
        post.setIsVisible(2);//设置为不可见
        return postDao.save(post);
    }

    @Override
    public Post updatePostTop(String postID) {
        Post post = postDao.findById(postID).orElseThrow(() -> new EntityNotFoundException(postID));
        post.setIstop(2);//设置为置顶
        return postDao.save(post);
    }

    @Override
    public Post likeThePost(String postID) {
        Post post = postDao.findById(postID).orElseThrow(() -> new EntityNotFoundException(postID));
        post.setNumOfLikes(post.getNumOfLikes() + 1);
        return postDao.save(post);
    }

    @Override
    public Boolean deletePostById(String postID) {
        postDao.deleteById(postID);
        Optional<Post> marketPost = postDao.findById(postID);
        if (null == marketPost) {
            return true;
        }
        return false;
    }
}
