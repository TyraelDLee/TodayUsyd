package com.example.demo.entity;

import lombok.Data;

import javax.persistence.*;

@Data
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
}
