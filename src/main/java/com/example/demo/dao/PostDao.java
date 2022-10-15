package com.example.demo.dao;

import com.example.demo.entity.Post;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PostDao extends CrudRepository<Post, String> {
    List<Post> findByType(String type);
    List<Post> findByCategory(String category);

    List<Post> findByUserid(String userid);
    @Query(value = "select postid,category,created_time,details,istop,isvisible,num_of_likes,title,type,userid,data,file_url,user_name from post order by created_time desc",nativeQuery = true)
    List<Post> findLatestPost();

    @Query(value = "select postid,category,created_time,details,istop,isvisible,num_of_likes,title,type,userid,data,file_url,user_name from post order by num_of_likes desc,created_time desc",nativeQuery = true)
    List<Post> findLikestPost();

    @Query(value = "select postid,category,created_time,details,istop,isvisible,num_of_likes,title,type,userid,data,file_url,user_name from post where title like ?1 order by created_time desc",nativeQuery = true)
    List<Post> findPostByTitle(String title);
}
