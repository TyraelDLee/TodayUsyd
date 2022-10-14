package com.example.demo.service;

import com.example.demo.entity.File;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Stream;


public interface FileService {
    File storeFile(MultipartFile file, String postID) throws IOException;

    File getFileByPostID(String postID);

    File getFile(String fileID);

    Stream<File> getAllFiles();
}
