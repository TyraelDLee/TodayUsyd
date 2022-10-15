package com.example.demo.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "likeRecord")
@SuppressWarnings("all")
public class LikeRecord {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "likeID")
    private String likeID;
    @Column(name = "postID")
    private String postID;
    @Column(name = "userid")
    private String userid;

    public LikeRecord(String postID, String userid) {
        this.postID = postID;
        this.userid = userid;
    }

    public LikeRecord() {
    }

    public String getLikeID() {
        return likeID;
    }

    public void setLikeID(String likeID) {
        this.likeID = likeID;
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
}
