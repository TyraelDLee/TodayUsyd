package com.example.demo.service.impl;

import com.example.demo.dao.CommentDao;
import com.example.demo.dao.NoticeDao;
import com.example.demo.dao.PostDao;
import com.example.demo.dao.TakeDao;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Notice;
import com.example.demo.entity.Post;
import com.example.demo.entity.Take;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@SuppressWarnings("all")
public class PostServiceImpl implements PostService {
    @Autowired
    private PostDao postDao;
    @Autowired
    private CommentDao commentDao;
    @Autowired
    private TakeDao takeDao;
    @Autowired
    private NoticeDao noticeDao;


    @Override
    public Iterable<Post> getPostsByType(String type) {
        return postDao.findByType(type);
    }

    @Override
    public Iterable<Post> getPostsByCategory(String category) {
        return postDao.findByCategory(category);
    }

    @Override
    public Optional<Post> findPostByPostId(String postID) {
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
    public Post setUrl(String postID, String url) {
        Post post = postDao.findById(postID).orElseThrow(() -> new EntityNotFoundException(postID));
        post.setFileUrl(url);
        return postDao.save(post);
    }

    @Override
    public Post updatePostInvisible(String postID) {
        Post post = postDao.findById(postID).orElseThrow(() -> new EntityNotFoundException(postID));
        post.setIsVisible(2);//change to be invisible
        return postDao.save(post);
    }
    @Override
    public Post updatePostVisible(String postID) {
        Post post = postDao.findById(postID).orElseThrow(() -> new EntityNotFoundException(postID));
        post.setIsVisible(1);//change to be visible
        return postDao.save(post);
    }

    @Override
    public Post updatePostTop(String postID) {
        Post post = postDao.findById(postID).orElseThrow(() -> new EntityNotFoundException(postID));
        post.setIstop(2);//change to be top
        return postDao.save(post);
    }

    @Override
    public Post updatePostNotTop(String postID) {
        Post post = postDao.findById(postID).orElseThrow(() -> new EntityNotFoundException(postID));
        post.setIstop(1);//change to be not top
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

    @Override
    public List<Post> findLatestPost() {
        return postDao.findLatestPost();
    }

    @Override
    public List<Post> findLikestPost() {
        return postDao.findLikestPost();
    }

    @Override
    public List<Post> findPostByTitle(String title) {
        return postDao.findPostByTitle(title);
    }

    @Override
    public List<Post> findPostByUserId(String uid) {
        return postDao.findByUserid(uid);
    }

    @Override
    public int saveComment(Comment comment) {
        Comment entity = commentDao.save(comment);
        if(entity != null){
            return 1;
        }
        return 0;
    }

    public List<Comment> findLatestPostComment() {
        return commentDao.findLatestPostComment();
    }
    @Override
    public List<Notice> findNoticeByUserid(String userid){
        return noticeDao.findNoticeByUserid(userid);
    }

    @Override
    public int takeuser(Take take){
        Take entity = takeDao.save(take);
        if(entity != null){
            return 1;
        }
        return 0;
    }

    @Override
    public int cancelTakeuser(String userid, String takeuserid) {
        return takeDao.deleteTakeByUseridAndTakeuserid(userid,takeuserid);
    }

    @Override
    public int saveNotice(Notice notice){
        Notice entity = noticeDao.save(notice);
        if(entity != null){
            return 1;
        }
        return 0;
    }

    @Override
    public int updateNotice(String noticeId) {
        Notice notice = noticeDao.findById(noticeId).get();
        if(notice == null || notice.getId() == null){
            return 0;
        }
        notice.setIsread(1);
        Notice entity = noticeDao.save(notice);
        if(entity != null){
            return 1;
        }
        return 0;
    }

    @Override
    public List<Comment> findCommentByPostID(String postID) {
        return commentDao.findCommentByPostID(postID);
    }
}
