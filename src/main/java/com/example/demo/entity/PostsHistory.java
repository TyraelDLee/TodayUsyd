package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "posts_history")
public class PostsHistory {
    @Id
    @Column(name="id")
    private String id;

    @Column(name="userid")
    private String userid;

    @Column(name="postsname")
    private String postsname;

    @Column(name="createtime")
    private String createtime;

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

    public String getPostsname() {
        return postsname;
    }

    public void setPostsname(String postsname) {
        this.postsname = postsname;
    }

    public String getCreatetime() {
        return createtime;
    }

    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }
}
