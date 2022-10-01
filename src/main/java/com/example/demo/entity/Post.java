package com.example.demo.entity;


import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "post")
@SuppressWarnings("all")
public class Post {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "postID")
    private String postID;
    @Column(name = "userid")
    private String userid;
    @Column(name = "type")
    private String type;
    @Column(name = "category")
    private String category;
    @Column(name = "title")
    private String title;
    @Column(name = "details")
    private String details;
    @Column(name = "numOfLikes")
    private Integer numOfLikes;
    @Column(name = "istop")//是否置顶，默认为1没置顶，2置顶
    private int istop;
    @Column(name = "isvisible")//是否可见，默认为1可见，不可见为2
    private int isvisible;

    public Post(String userid, String type, String category, String title, String details) {
        this.userid = userid;
        this.type = type;
        this.category = category;
        this.title = title;
        this.details = details;
        this.numOfLikes = 0;
    }

    public Post(String category, String title, String details) {
        this.category = category;
        this.title = title;
        this.details = details;
    }

    public Post() {

    }

    public String getPostID() {
        return postID;
    }

    public void setPostID(String postID) {
        this.postID = postID;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Integer getNumOfLikes() {
        return numOfLikes;
    }

    public void setNumOfLikes(Integer numOfLikes) {
        this.numOfLikes = numOfLikes;
    }

    public int getIstop() {
        return istop;
    }

    public void setIstop(int istop) {
        this.istop = istop;
    }

    public int getIsVisible() {
        return isvisible;
    }

    public void setIsVisible(int isvisible) {
        this.isvisible = isvisible;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post that = (Post) o;
        return postID.equals(that.postID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(postID);
    }
}
