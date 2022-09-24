package com.example.demo.service;


import com.example.demo.entity.Post;

import java.util.Optional;

public interface PostService {
     Iterable<Post> getAllPosts();

     Optional<Post> findPostById(String postID);

     Post savePost(Post post);

     void deletePostById(String postID);

     Post likeThePost(String postID);
}
