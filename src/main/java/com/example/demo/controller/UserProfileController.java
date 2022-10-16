package com.example.demo.controller;

import com.example.demo.entity.ChatRecord;
import com.example.demo.entity.PostsHistory;
import com.example.demo.entity.User;
import com.example.demo.entity.UserProfile;
import com.example.demo.service.ChatRecordService;
import com.example.demo.service.PostsHistoryService;
import com.example.demo.service.UserProfileService;
import com.example.demo.service.UserService;
import com.example.demo.utils.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@Controller
public class UserProfileController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private PostsHistoryService postsHistoryService;
    @Autowired
    private ChatRecordService chatRecordService;

    @Value("${upload.path}")
    private String uploadPath;//This is the file upload path, can be modified according to the actual implement

    //-----------------home module start---------------------------------

    /**
     * Return the profile details based on user id
     * details includes username, photo address, description, location/address
     * @param userid
     * @return
     */
    @RequestMapping("/userProfile/home/index")
    @ResponseBody
    public Result home(String userid) {
        Result result = new Result();
        UserProfile userProfile = userProfileService.findUserProfileByUserid(userid);
        if(userProfile == null){
            userProfile = new UserProfile();
        }
        result.setObject(userProfile);
        return result;
    }

    //-----------------home module end---------------------------------

    //-----------------friend module start---------------------------------

    /**
     * Return the record/chat history list
     * The list is in descending ordered based on created time
     * @param fromuser the userid of the sender
     * @param touser the userid of the receiver
     * @return
     */
    @RequestMapping("/userProfile/friend/recordList")
    @ResponseBody
    public Result recordList(String fromuser,String touser) {
        Result result = new Result();

        List<ChatRecord> recordList = chatRecordService.findRecordListById(fromuser,touser);
        if(recordList == null){
            recordList = new ArrayList<>();
        }
        result.setObject(recordList);
        return result;
    }

    /**
     * Save the record/chat/message
     * @param fromuser the userid of the sender
     * @param touser the userid of the receiver
     * @param content the content of the message
     * @return
     */
    @RequestMapping("/userProfile/friend/saveRecord")
    @ResponseBody
    public Result saveRecord(String fromuser,String touser,String content) {
        Result result = new Result();
        ChatRecord record = new ChatRecord();
        record.setId(UUID.randomUUID().toString());
        record.setFromuser(fromuser);
        record.setTouser(touser);
        record.setContent(content);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        record.setCreatetime(sdf.format(new Date()));

        int rows = chatRecordService.saveInfo(record);
        if(rows != 1){
            result.setCode(500);
            result.setMsg("Failed to save chat history");
        }

        return result;
    }

    //-----------------friend module end---------------------------------

    //-----------------History module start---------------------------------

    /**
     * Return the post viewing history
     * @param userid
     * @return
     */
    @RequestMapping("/userProfile/history/historyList")
    @ResponseBody
    public Result historyList(String userid) {
        Result result = new Result();
        List<PostsHistory> postsList = postsHistoryService.queryListByUserid(userid);
        if(postsList == null){
            postsList = new ArrayList<>();
        }
        result.setObject(postsList);
        return result;
    }

    /**
     * Save the post viewing history
     * @param userid
     * @param postsname the title of the post
     * @param createtime the datetime of viewing a particular post
     * @return
     */
    @RequestMapping("/userProfile/history/saveHistory")
    @ResponseBody
    public Result saveHistory(String userid,String postsname,String createtime) {
        Result result = new Result();
        PostsHistory postsHistory = new PostsHistory();
        postsHistory.setId(UUID.randomUUID().toString());
        postsHistory.setUserid(userid);
        postsHistory.setPostsname(postsname);
        postsHistory.setCreatetime(createtime);
        int rows = postsHistoryService.saveInfo(postsHistory);
        if(rows != 1){
            result.setCode(500);
            result.setMsg("Fail to save the post viewing history");
        }
        return result;
    }

    //-----------------History module end---------------------------------

    //-----------------Setting module start---------------------------------

    /**
     * Update user profile
     * @param userid
     * @param username
     * @param userpwd  password
     * @param description  self-describtion from the user
     * @param address location of the user
     * @param imgurl the url of user's photo
     * @return
     */
    @RequestMapping("/userProfile/setting/updateInfo")
    @ResponseBody
    public Result updateInfo(String userid,String username,String userpwd,String description,String address,String imgurl) {
        Result result = new Result();
        User user = userService.queryUserByUserid(userid);
        if(user == null){
            result.setCode(500);
            result.setObject("Failed to get user information");
            return result;
        }

        UserProfile userProfile = userProfileService.findUserProfileByUserid(userid);
        if(userProfile == null){
            userProfile = new UserProfile();
            userProfile.setId(UUID.randomUUID().toString());
            userProfile.setUserid(userid);
        }

        user.setUsername(username);
        user.setUserpwd(userpwd);
        int r1 = userService.updateUser(user);

        if(r1 != 1){
            result.setCode(500);
            result.setObject("Failed to update user information");
            return result;
        }
        userProfile.setName(username);
        userProfile.setDescription(description);
        userProfile.setAddress(address);
        userProfile.setImgurl(imgurl);
        int r2 = userProfileService.updateInfo(userProfile);

        if(r2 != 1){
            result.setCode(500);
            result.setObject("Failed to update user profile");
            return result;
        }
        return result;
    }

    /**
     * Upload photo (supported for JPG and PNG document)
     * Once the update is success, the absolute path of the photo shall be returned
     * @param file file for photo
     * @return
     */
    @RequestMapping("/userProfile/setting/upload")
    @ResponseBody
    public Result upload(@RequestParam("file") MultipartFile file) {
        Result result = new Result();
        try {
            String fileName = System.currentTimeMillis() + file.getOriginalFilename();
            String destFileName = uploadPath + File.separator + fileName;
            File destFile = new File(destFileName);
            file.transferTo(destFile);
            result.setObject(destFileName);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            result.setCode(500);
            result.setMsg("Failed to upload，"+e.getMessage());
        } catch (IOException e) {
            e.printStackTrace();
            result.setCode(500);
            result.setMsg("Failed to upload，"+e.getMessage());
        }

        return result;
    }

    /**
     * Return photo (supported for JPG and PNG document)
     * @param userid
     * @return
     * @throws Exception
     */
    @RequestMapping(value ="/userProfile/setting/showImg",produces = {MediaType.IMAGE_PNG_VALUE,MediaType.IMAGE_JPEG_VALUE})
    @ResponseBody
    public byte[] showImg(String userid) throws Exception {
        byte[] bytes = null;
        UserProfile userProfile = userProfileService.findUserProfileByUserid(userid);
        if(userProfile != null && userProfile.getImgurl() != null){
            File file = new File(userProfile.getImgurl());
            if(file!=null && file.exists()){
                FileInputStream inputStream = new FileInputStream(file);
                bytes = new byte[inputStream.available()];
                inputStream.read(bytes, 0, inputStream.available());
            }
        }
        return bytes;
    }

    //-----------------Setting module end---------------------------------
}
