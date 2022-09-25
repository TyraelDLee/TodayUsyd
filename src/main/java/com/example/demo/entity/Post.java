package com.example.demo.entity;



import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "post")
@SuppressWarnings("all")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="postID")
    private String postID;
    @Column(name="userid")
    private String userid;
    @Column(name="title")
    private String title;
    @Column(name="details")
    private String details;
    @Column(name="numOfLikes")
    private Integer numOfLikes;

    public Post(String postID, String userid, String title, String details) {
        this.postID = postID;
        this.userid = userid;
        this.title = title;
        this.details = details;
        this.numOfLikes = 0;
    }

    public Integer getNumOfLikes() {
        return numOfLikes;
    }

    public void setNumOfLikes(Integer numOfLikes) {
        this.numOfLikes = numOfLikes;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return Objects.equals(postID, post.postID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(postID, userid, title, details, numOfLikes);
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getPostID() {
        return postID;
    }

    public void setPostID(String postID) {
        this.postID = postID;
    }
}
