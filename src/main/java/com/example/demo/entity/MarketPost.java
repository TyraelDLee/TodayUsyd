package com.example.demo.entity;


import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "marketPost")
@SuppressWarnings("all")
public class MarketPost {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "marketPostID")
    private String marketPostID;
    @Column(name = "userid")
    private String userid;
    @Column(name = "category")
    private String category;
    @Column(name = "subject")
    private String subject;
    @Column(name = "details")
    private String details;
    @Column(name = "numOfLikes")
    private Integer numOfLikes;

    public MarketPost(String userid, String category, String subject, String details) {
        this.userid = userid;
        this.category = category;
        this.subject = subject;
        this.details = details;
        this.numOfLikes = 0;
    }

    public MarketPost(String category, String subject, String details) {
        this.category = category;
        this.subject = subject;
        this.details = details;
    }

    public MarketPost() {

    }

    public String getMarketPostID() {
        return marketPostID;
    }

    public void setMarketPostID(String marketPostID) {
        this.marketPostID = marketPostID;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MarketPost that = (MarketPost) o;
        return marketPostID.equals(that.marketPostID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(marketPostID);
    }
}
