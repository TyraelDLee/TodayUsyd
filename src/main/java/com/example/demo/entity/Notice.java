package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "notice")
public class Notice {
    @Id
    @Column(name="id")
    private String id;

    @Column(name="pubuserid")
    private String pubuserid;

    @Column(name="pubusername")
    private String pubusername;

    @Column(name = "postID")
    private String postID;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "createdTime")
    private LocalDateTime createdTime;

    @Column(name="acpuserid")
    private String acpuserid;

    @Column(name="acpusername")
    private String acpusername;

    @Column(name = "content")
    private String content;

    @Column(name = "isread")
    private int isread;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPubuserid() {
        return pubuserid;
    }

    public void setPubuserid(String pubuserid) {
        this.pubuserid = pubuserid;
    }

    public String getPubusername() {
        return pubusername;
    }

    public void setPubusername(String pubusername) {
        this.pubusername = pubusername;
    }

    public String getPostID() {
        return postID;
    }

    public void setPostID(String postID) {
        this.postID = postID;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public String getAcpuserid() {
        return acpuserid;
    }

    public void setAcpuserid(String acpuserid) {
        this.acpuserid = acpuserid;
    }

    public String getAcpusername() {
        return acpusername;
    }

    public void setAcpusername(String acpusername) {
        this.acpusername = acpusername;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getIsread() {
        return isread;
    }

    public void setIsread(int isread) {
        this.isread = isread;
    }
}
