package com.example.demo.dao;

import com.example.demo.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FileDao extends JpaRepository<File, String> {
    File findByPostID(String postID);
}
