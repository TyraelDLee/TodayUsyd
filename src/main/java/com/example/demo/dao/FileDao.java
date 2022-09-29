package com.example.demo.dao;

import com.example.demo.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileDao extends JpaRepository<File, String> {
    List<File> findByPostID(String postID);
}
