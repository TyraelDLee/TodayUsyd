package com.example.demo.entity;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class User {
    @Id
    //@Column(name="userid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String userid;
    @Column(name="username",updatable = true)
    private String username;
    @Column(name="usercode",updatable = false)
    private String usercode;
    @Column(name="userpwd",updatable = false)
    private String userpwd;

    @Column(name="labeldesc")
    private int labeldesc;

    @Column(name="userauth")//normal user or admin
    private int userauth;

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

    public int getLabeldesc() {
        return labeldesc;
    }

    public void setLabeldesc(int labeldesc) {
        this.labeldesc = labeldesc;
    }

    public int getUserAuth() {
        return userauth;
    }

    public void setUserauth(int userauth) {
        this.userauth = userauth;
    }

    @Override
    public String toString() {
        return "User{" +
                "userid='" + userid + '\'' +
                ", username='" + username + '\'' +
                ", usercode='" + usercode + '\'' +
                ", userpwd='" + userpwd + '\'' +
                ", labeldesc=" + labeldesc +
                ", userauth=" + userauth +
                '}';
    }
}