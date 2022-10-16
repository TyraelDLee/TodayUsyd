package com.example.demo.service;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Notice;
import com.example.demo.entity.Post;
import com.example.demo.entity.Take;

import java.util.List;
import java.util.Optional;

public interface PostService {
    Iterable<Post> getPostsByType(String type);

    Iterable<Post> getPostsByCategory(String category);

    Optional<Post> findPostByPostId(String postID);

    Post savePost(Post post);

    Post updatePost(String postID, Post newPost);

    Post updatePostInvisible(String postID);

    Post updatePostTop(String postID);

    Post updatePostVisible(String postID);

    Post updatePostNotTop(String postID);

    Post likeThePost(String postID);

    Boolean deletePostById(String postID);

    List<Post> findLatestPost();

    List<Post> findLikestPost();

    List<Post> findPostByTitle(String title);

    List<Post> findPostByUserId(String uid);

    int saveComment(Comment comment);

    List<Comment> findLatestPostComment();

    int takeuser(Take take);

    int cancelTakeuser(String userid, String takeuserid);

    int saveNotice(Notice notice);

    int updateNotice(String noticeId);

    List<Notice> findNoticeByUserid(String userid);

    List<Comment> findCommentByPostID(String postID);
}
