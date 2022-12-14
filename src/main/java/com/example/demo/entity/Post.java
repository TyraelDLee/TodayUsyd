package com.example.demo.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;
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
    @Column(name = "userName")
    private String userName;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "createdTime")
    private LocalDateTime createdTime;
    @Column(name = "fileUrl")
    private String fileUrl;
    @Column(name = "istop")//1 means not top by default; 2 means top
    private int istop;
    @Column(name = "isvisible")//1 means visible by default; 2 means invisible
    private int isvisible;

    public Post(String userid, String userName, String type, String category, String title, String details) {
        this.userid = userid;
        this.userName = userName;
        this.type = type;
        this.category = category;
        this.title = title;
        this.details = details;
        this.numOfLikes = 0;
        this.createdTime = LocalDateTime.now();
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
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

    @Override
    public String toString() {
        return "Post{" +
                "postID='" + postID + '\'' +
                ", userid='" + userid + '\'' +
                ", userName='" + userName + '\'' +
                ", type='" + type + '\'' +
                ", category='" + category + '\'' +
                ", title='" + title + '\'' +
                ", details='" + details + '\'' +
                ", numOfLikes=" + numOfLikes +
                ", createdTime=" + createdTime +
                ", fileUrl='" + fileUrl + '\'' +
                ", istop=" + istop +
                ", isvisible=" + isvisible +
                '}';
    }
}
