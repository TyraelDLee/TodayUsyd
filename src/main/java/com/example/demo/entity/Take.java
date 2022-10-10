package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "take")
public class Take {
    @Id
    @Column(name="id")
    private String id;

    @Column(name="userid")
    private String userid;

    @Column(name="takeuserid")
    private String takeuserid;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getTakeuserid() {
        return takeuserid;
    }

    public void setTakeuserid(String takeuserid) {
        this.takeuserid = takeuserid;
    }
}
