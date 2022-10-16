package com.example.demo.utils;

import com.example.demo.entity.Post;

import java.util.Objects;

public class ResponseFav {
    private String favID;
    private Post post;

    public ResponseFav(String favID, Post post) {
        this.favID = favID;
        this.post = post;
    }

    public ResponseFav() {
    }

    public String getFavID() {
        return favID;
    }

    public void setFavID(String favID) {
        this.favID = favID;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ResponseFav that = (ResponseFav) o;
        return favID.equals(that.favID) && post.equals(that.post);
    }

    @Override
    public int hashCode() {
        return Objects.hash(favID, post);
    }

    @Override
    public String toString() {
        return "ResponseFav{" +
                "favID='" + favID + '\'' +
                ", post=" + post +
                '}';
    }
}
