package com.example.demo.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "favorite")
@SuppressWarnings("all")
public class Favorite {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "favID")
    private String favID;
    @Column(name = "postID")
    private String postID;
    @Column(name = "userid")
    private String userid;
    @Column(name = "userName")
    private String userName;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "createdTime")
    private LocalDateTime createdTime;


    public Favorite(String postID, String userid, String userName) {
        this.postID = postID;
        this.userid = userid;
        this.userName = userName;
        this.createdTime = LocalDateTime.now();
    }

    public Favorite() {

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


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Favorite favorite = (Favorite) o;
        return favID.equals(favorite.favID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(favID);
    }

    @Override
    public String toString() {
        return "Favorite{" +
                "favID='" + favID + '\'' +
                ", postID='" + postID + '\'' +
                ", userid='" + userid + '\'' +
                ", userName='" + userName + '\'' +
                ", createdTime=" + createdTime +
                '}';
    }
}
