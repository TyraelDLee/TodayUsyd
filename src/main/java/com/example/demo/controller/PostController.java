package com.example.demo.controller;

import com.example.demo.entity.*;
import com.example.demo.service.*;
import com.example.demo.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/Post")
@SuppressWarnings("all")
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private FileService fileService;
    @Autowired
    private TakeService takeService;
    @Autowired
    private UserService userService;
    @Autowired
    private LikeRecordService likeRecordService;

    /**
     * Find the latest post
     * Return the post with descending order on the post creation time
     * @return
     */
    @GetMapping("/findLatestPost")
    public Result findLatestPost() {
        Result result = new Result();
        List<Post> postList = postService.findLatestPost();
        if (postList == null) {
            postList = new ArrayList<>();
        }
        result.setObject(postList);
        return result;
    }

    /**
     * Find the likest post
     * Return the post with descending order on the number of like received
     * @return
     */
    @GetMapping("/findLikestPost")
    public Result findLikestPost() {
        Result result = new Result();
        List<Post> postList = postService.findLikestPost();
        if (postList == null) {
            postList = new ArrayList<>();
        }
        result.setObject(postList);
        return result;
    }

    /**
     * Find the post by title (support fuzzy query)
     * @param title
     * @return
     */
    @GetMapping("/findPostByTitle")
    public Result findPostByTitle(String title) {
        Result result = new Result();
        title = "%" + title + "%";
        List<Post> postList = postService.findPostByTitle(title);
        if (postList == null) {
            postList = new ArrayList<>();
        }
        result.setObject(postList);
        return result;
    }

    /**
     * Get the all posts send by the given userID.
     *
     * @param userid the given UID.
     * @return the REST result with the list of posts from database
     */
    @GetMapping("/findPostById")
    public Result findPostById(String userid) {
        Result result = new Result();
        List<Post> posts = postService.findPostByUserId(userid);
        if (posts == null) {
            posts = new ArrayList<>();
        }
        result.setObject(posts);
        return result;
    }


    /**
     * Save the comment from a particular user for a particular post
     *
     * @param userid
     * @param username
     * @param postID   the ID of the post
     * @param content  the content of the comment/review
     * @return
     */
    @RequestMapping("/saveComment")
    public Result saveComment(String userid, String username, String postID, String content) {
        Result result = new Result();

        Comment comment = new Comment();
        comment.setId(UUID.randomUUID().toString());
        comment.setUserid(userid);
        comment.setUsername(username);
        comment.setPostID(postID);
        comment.setContent(content);
        comment.setCreatedTime(LocalDateTime.now());
        int flag = postService.saveComment(comment);
        if (flag == 0) {
            result.setCode(500);
            result.setMsg("Abnormal operation");
        }
        return result;
    }

    /**
     * Find the latest comment
     *
     * @return
     */
    @GetMapping("/findLatestPostComment")
    public Result findLatestPostComment() {
        Result result = new Result();
        List<Comment> postCommentList = postService.findLatestPostComment();
        if (postCommentList == null) {
            postCommentList = new ArrayList<>();
        }
        result.setObject(postCommentList);
        return result;
    }

    /**
     * Follower
     *
     * @param userid     Current user
     * @param takeuserid Subscribed user
     * @return
     */
    @RequestMapping("/takeuser")
    public Result takeuser(String userid, String takeuserid) {
        Result result = new Result();
        Take take = new Take();
        take.setId(UUID.randomUUID().toString());
        take.setUserid(userid);
        take.setTakeuserid(takeuserid);
        int flag = postService.takeuser(take);
        if (flag == 0) {
            result.setCode(500);
            result.setMsg("Abnormal operation");
        }
        return result;
    }

    /**
     * Unfollow
     *
     * @param userid     the userid of the current user
     * @param takeuserid the userid that current user would like to follow/unfollow
     * @return
     */
    @RequestMapping("/cancelTakeuser")
    public Result cancelTakeuser(String userid, String takeuserid) {
        Result result = new Result();

        int flag = postService.cancelTakeuser(userid,takeuserid);
        if (flag == 0) {
            result.setCode(500);
            result.setMsg("Abnormal operation");
        }
        return result;
    }


    /**
     * Find the users that have been subscribed by the current user
     *
     * @param userid the userid of the current user
     * @return
     */
    @RequestMapping("/findTakeuser")
    public Result findTakeuser(String userid) {
        Result result = new Result();
        List<Take> takeList = takeService.findTakeByUserid(userid);
        if (takeList == null) {
            takeList = new ArrayList<>();
        }
        result.setObject(takeList);
        return result;
    }

    /**
     * Find the users that has subscribed to the current user
     *
     * @param userid the userid of the current user
     * @return
     */
    @RequestMapping("/findUserByTake")
    public Result findUserByTake(String userid) {
        Result result = new Result();
        List<Take> takeList = takeService.findTakeByTakeuserid(userid);
        if (takeList == null) {
            takeList = new ArrayList<>();
        }
        result.setObject(takeList);
        return result;
    }

    /**
     * Save the notifications posted by the following users
     *
     * @param pubuserid   The poster's userid
     * @param pubusername The username of the poster
     * @param postID
     * @param content     Post content
     * @return
     */
    @RequestMapping("/saveNotice")
    public Result saveNotice(String pubuserid, String pubusername, String postID, String content) {
        Result result = new Result();

        List<Take> takeList = takeService.findTakeByTakeuserid(pubuserid);
        if (takeList != null && takeList.size() > 0) {
            for (Take take : takeList) {
                Notice notice = new Notice();
                notice.setId(UUID.randomUUID().toString());
                notice.setPubuserid(pubuserid);
                notice.setPubusername(pubusername);
                notice.setPostID(postID);
                notice.setAcpuserid(take.getUserid());
                notice.setCreatedTime(LocalDateTime.now());
                notice.setIsread(0);
                notice.setContent(content);
                int flag = postService.saveNotice(notice);
                if (flag == 0) {
                    result.setCode(500);
                    result.setMsg("Abnormal operation");
                }
            }
        }
        return result;
    }

    /**
     * Update post notification that the post has been read
     *
     * @param id the primary key
     * @return
     */
    @RequestMapping("/updateNotice")
    public Result updateNotice(String id) {
        Result result = new Result();
        int flag = postService.updateNotice(id);
        if (flag == 0) {
            result.setCode(500);
            result.setMsg("Abnormal operation");
        }
        return result;
    }


    /**
     * Find notifications for posts made by followed
     *
     * @return
     */
    @GetMapping("/findNoticeByUserid")
    public Result findNoticeByUserid(String userid) {
        Result result = new Result();
        List<Notice> noticeList = postService.findNoticeByUserid(userid);
        if (noticeList == null) {
            noticeList = new ArrayList<>();
        }
        result.setObject(noticeList);
        return result;
    }


    /**
     * Find comment by postID
     * @return
     */
    @GetMapping("/findCommentByPostID")
    public Result findCommentByPostID(String postID) {
        Result result = new Result();
        List<Comment> commentList = postService.findCommentByPostID(postID);
        if(commentList == null) {
            commentList = new ArrayList<>();
        }
        result.setObject(commentList);
        return result;
    }

    @GetMapping("/getAllPostsByType")
    public Result findAllPost(@RequestParam("type") String type) {
        return new Result((List<Post>) postService.getPostsByType(type));
    }

    @GetMapping("/filterByCategory")
    public Result getMarketPostsByCategory(@RequestParam("category") String category) {
        return new Result(postService.getPostsByCategory(category));
    }

    @PostMapping("/createPost")
    public Result createPost(@RequestParam("userID") String userID,
                             @RequestParam("type") String type, @RequestParam("category") String category,
                             @RequestParam("title") String title, @RequestParam("details") String details,
                             @RequestParam("file") MultipartFile file) throws IOException {
        User user = userService.getUserByID(userID);
        String userName = "undefined";
        if (user != null) {
            userName = user.getUsername();
        }
        Post post = new Post(userID, userName, type, category, title, details);
        postService.savePost(post);
        String message = "";
        String url = null;
        if (!file.isEmpty()) {
            url = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/Post/file/")
                    .path(post.getPostID())
                    .toUriString();
            try {
                fileService.storeFile(file, post.getPostID());
            } catch (Exception e) {
                message = "Fail to store file";

            }
        }
        postService.setUrl(post.getPostID(),url);
        return new Result(200, message, post);
    }
    @PostMapping("/createPostWithoutFile")
    public Result createPost(@RequestParam("userID") String userID,
                             @RequestParam("type") String type, @RequestParam("category") String category,
                             @RequestParam("title") String title, @RequestParam("details") String details
                            ) throws IOException {
        User user = userService.getUserByID(userID);
        String userName = "undefined";
        if (user != null) {
            userName = user.getUsername();
        }
        Post post = new Post(userID, userName, type, category, title, details);
        postService.savePost(post);
        String message = "";
        String url = null;
        postService.setUrl(post.getPostID(),url);
        return new Result(200, message, post);
    }

    @GetMapping("/file/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        File file = fileService.getFileByPostID(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                .body(file.getData());
    }

    /**
     * find post by post id
     *
     * @param id postID
     * @return
     */
    @GetMapping("/getPostByID")
    public Result getPost(@RequestParam("postID") String postID) {
        return new Result(postService.findPostByPostId(postID));
    }

    @PutMapping("/updatePost")
    public Result updateThePost(@RequestParam("postID") String postID, @RequestParam("category") String category, @RequestParam("title") String title, @RequestParam("details") String details) {
        return new Result(postService.updatePost(postID, new Post(category, title, details)));
    }

    @PutMapping("/updatePostInvisible")
    public Result updatePostInvisible(@RequestParam("postID") String postID,@ModelAttribute User user) {
        if (user!=null) {
            if (user.getUserAuth() == 2) {
                return new Result(postService.updatePostInvisible(postID));
            } else return new Result("The user is not admin and does not have right to set the post invisible");
        }
        return new Result("The user has not login");
    }

    @PutMapping("/updatePostVisible")
    public Result updatePostVisible(@RequestParam("postID") String postID,@ModelAttribute User user) {
        if (user!=null) {
            if (user.getUserAuth() == 2) {
                return new Result(postService.updatePostVisible(postID));
            } else return new Result("The user is not admin and does not have right to set the post visible");
        }
        return new Result("The user has not login");
    }
    @PutMapping("/updatePostIsTop")
    public Result updateThePostTop(@RequestParam("postID") String postID,@ModelAttribute User user) {
        if (user!=null) {
            if (user.getUserAuth() == 2) {
                return new Result(postService.updatePostTop(postID));
            } else return new Result("The user is not admin and does not have right to set the post top");
        }
        return new Result("The user has not login");
    }
    @PutMapping("/updatePostIsNotTop")
    public Result updateThePostNotTop(@RequestParam("postID") String postID,@ModelAttribute User user) {
        if (user!=null) {
            if (user.getUserAuth() == 2) {
                return new Result(postService.updatePostNotTop(postID));
            } else return new Result("The user is not admin and does not have right to set the post not top");
        }
        return new Result("The user has not login");
    }

    @PutMapping("/likeThePost")
    public Result likeThePost(@RequestParam("postID") String postID, @RequestParam("userID") String userID) {
        String message = "";

        List<LikeRecord> likeRecord = likeRecordService.findByPostID(postID);
        Boolean tag = false;
        if (likeRecord != null) {
            for (int i = 0; i < likeRecord.size(); i++) {
                if (likeRecord.get(i).getUserid().equals(userID)){
                    tag = true;
                    break;
                }
            }
        }
        if (likeRecord == null || !tag) {
            likeRecordService.saveLikeRecord(new LikeRecord(postID, userID));
            postService.likeThePost(postID);
            message = "Like has been saved!";
        }else{
            message = "You only can like this post once";
        }
        return new Result(message);
    }

    @DeleteMapping("/deleteThePost")
    public Result deleteThePost(@RequestParam("postID") String postID) {
        return new Result(postService.deletePostById(postID));
    }


}
