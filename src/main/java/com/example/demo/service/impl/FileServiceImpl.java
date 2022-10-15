package com.example.demo.service.impl;


import com.example.demo.dao.FileDao;
import com.example.demo.entity.File;
import com.example.demo.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.stream.Stream;

@Service
@Transactional
@SuppressWarnings("all")
public class FileServiceImpl implements FileService {
    @Autowired
    private FileDao fileDao;

    @Override
    public File storeFile(MultipartFile file, String postID) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        File newFile = new File(fileName, file.getContentType(), postID, file.getBytes());
        return fileDao.save(newFile);
    }

    @Override
    public File getFileByPostID(String postID) {
        return fileDao.findByPostID(postID);
    }

    @Override
    public File getFile(String fileID) {
        return fileDao.findById(fileID).get();
    }

    @Override
    public Stream<File> getAllFiles() {
        return fileDao.findAll().stream();
    }
}
