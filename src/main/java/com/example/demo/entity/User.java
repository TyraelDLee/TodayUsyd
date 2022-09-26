package com.example.demo.entity;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class User {
    @Id
    //@Column(name="userid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String userid;
    @Column(name="username")
    private String username;
    @Column(name="usercode")
    private String usercode;
    @Column(name="userpwd")
    private String userpwd;

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsercode() {
        return usercode;
    }

    public void setUsercode(String usercode) {
        this.usercode = usercode;
    }

    public String getUserpwd() {
        return userpwd;
    }

    public void setUserpwd(String userpwd) {
        this.userpwd = userpwd;
    }
}