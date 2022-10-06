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
    private String uploadPath;//此路径为文件上传路径，可根据实际部署路径进行更换
    
    //-----------------home模块start---------------------------------
    
    /**
     * 根据用户id返回用户的详细信息（用户名，照片地址，个人描述，地址）
     * @param userid 用户id
     * @return
     */
    @RequestMapping("/userProfile/home/index")
    @ResponseBody
    public Result home(String userid) {
        Result result = new Result();
        UserProfile userProfile = userProfileService.findUserProfleByUserid(userid);
        if(userProfile == null){
            userProfile = new UserProfile();
        }
        result.setObject(userProfile);
        return result;
    }
    
    //-----------------home模块end---------------------------------
    
    //-----------------friend模块start---------------------------------
    
    /**
     * 获取聊天记录列表（根据创建时间倒叙）
     * @param fromuser 发送者用户id
     * @param touser 接收者用户id
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
     * 保存聊天记录
     * @param fromuser 发送者用户id
     * @param touser 接收者用户id
     * @param content 内容
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
            result.setMsg("操作失败，保存聊天记录失败");
        }
        
        return result;
    }
    
    //-----------------friend模块start---------------------------------
    
    //-----------------History模块start---------------------------------
    
    /**
     * 查看帖子观看记录
     * @param userid 用户id
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
     * 保存帖子观看记录
     * @param userid 用户id
     * @param postsname 帖子名称
     * @param createtime 观看时间
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
            result.setMsg("操作失败，保存历史记录失败");
        }
        return result;
    }
    
    //-----------------History模块start---------------------------------
    
    //-----------------Setting模块start---------------------------------
    
    /**
     * 更新用户信息
     * @param userid 用户id
     * @param username 用户名
     * @param userpwd  密码
     * @param description  个人描述
     * @param address  地址
     * @param imgurl 照片地址
     * @return
     */
    @RequestMapping("/userProfile/setting/updateInfo")
    @ResponseBody
    public Result updateInfo(String userid,String username,String userpwd,String description,String address,String imgurl) {
        Result result = new Result();
        User user = userService.queryUserByUserid(userid);
        if(user == null){
            result.setCode(500);
            result.setObject("操作失败，获取用户信息失败");
            return result;
        }
        
        UserProfile userProfile = userProfileService.findUserProfleByUserid(userid);
        if(userProfile == null){
            result.setCode(500);
            result.setObject("操作失败，获取用户详细信息失败");
            return result;
        }
        
        user.setUsername(username);
        user.setUserpwd(userpwd);
        int r1 = userService.updateUser(user);
        
        if(r1 != 1){
            result.setCode(500);
            result.setObject("操作失败，更新用户信息失败");
            return result;
        }
        userProfile.setName(username);
        userProfile.setDescription(description);
        userProfile.setAddress(address);
        userProfile.setImgurl(imgurl);
        int r2 = userProfileService.updateInfo(userProfile);
        
        if(r2 != 1){
            result.setCode(500);
            result.setObject("操作失败，更新用户详细信息失败");
            return result;
        }
        return result;
    }
    
    /**
     * 上传个人照片（目前支持JPG,PNG格式）
     * 上传成功会返回照片文件所在的绝对路径
     * @param file 照片文件流
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
            result.setMsg("上传失败，"+e.getMessage());
        } catch (IOException e) {
            e.printStackTrace();
            result.setCode(500);
            result.setMsg("上传失败，"+e.getMessage());
        }
        
        return result;
    }
    
    /**
     * 查看个人照片（目前支持JPG,PNG格式）
     * @param userid 用户id
     * @return
     * @throws Exception
     */
    @RequestMapping(value ="/userProfile/setting/showImg",produces = {MediaType.IMAGE_PNG_VALUE,MediaType.IMAGE_JPEG_VALUE})
    @ResponseBody
    public byte[] showImg(String userid) throws Exception {
        byte[] bytes = null;
        UserProfile userProfile = userProfileService.findUserProfleByUserid(userid);
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
    
    //-----------------Setting模块start---------------------------------
}
