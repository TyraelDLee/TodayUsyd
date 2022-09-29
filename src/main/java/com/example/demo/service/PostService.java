package com.example.demo.service;

import com.example.demo.entity.Post;

import java.util.Optional;

public interface PostService {
    Iterable<Post> getPostsByType(String type);

    Iterable<Post> getPostsByCategory(String category);

    Optional<Post> findPostById(String postID);

    Post savePost(Post post);

    Post updatePost(String postID, Post newPost);

    Post likeThePost(String postID);

    Boolean deletePostById(String postID);

}
