import React, { Component } from "react";
import './Comment.css'
import Navbar from '../../Navbar'
import ReactDOM from "react-dom/client";
import { AiFillEye, AiFillEyeInvisible, AiOutlineVerticalAlignTop, AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { GoListOrdered } from 'react-icons/go';
import { GiShadowFollower } from 'react-icons/gi';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import avatar from "./../../avatar.svg";

const params = new URLSearchParams(window.location.search);

class Comment extends Component {
    constructor(props){
        super(props);
        this.state = {
            postid: params.get('postID'),
            top: null,
            visible: null,
            favoriate: 1,
            postusername: null,
            verifylabel:null,
            title: null,
            detail: null,
            likes: null,
            createdTime: null,
            postuserid: null,
            submitcomment: null,
            comments: null,
            userAuth: null,
            postImage: null,
            postCategory: null,
            userid: Cookies.get('UID'),
            edit: false,
            editTitle: "",
            editDetail: "",
            postimageurl: null,
        }
    }

    componentDidMount(){
        const { postid } = this.state;
        axios.get(`./Post/getPostByID?postID=${postid}`)
        .then((response) => {
            this.setState({
                top: response.data.object.istop,
                visible: response.data.object.isVisible,
                title: response.data.object.title,
                detail: response.data.object.details,
                likes: response.data.object.numOfLikes,
                createdTime: response.data.object.createdTime,
                postuserid: response.data.object.userid,
                postusername: response.data.object.userName,
                postImage: response.data.object.fileUrl,
                postCategory: response.data.object.category,
            });
            getVerifyStatus(response.data.object.userid);

            var formData3 = new FormData();
            formData3.append("userid", Cookies.get('UID'));
            formData3.append("postsname", response.data.object.title);
            formData3.append("createtime", response.data.object.createdTime);

            axios.post('./userProfile/history/saveHistory', formData3, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            axios.get(`/userProfile/home/index?userid=${response.data.object.userid}`)
            .then((response) => {
                if (response.data.code === 200){
                    this.setState({
                        postimageurl: response.data.object.imgurl,
                    });
                }
            })
        })

        function getVerifyStatus(uid){
            fetch(`./getUserInfoByID?uid=${uid}`, {
                method:'GET',
                credentials:'include',
                body:null
            }).then(r=>r.json())
                .then(json=>{
                    const verLabel = document.getElementsByClassName('userCommentLabel')[0];
                    if (json['code']===200){
                        console.log(json['object']['labeldesc']);
                        if (json['object']['labeldesc'] === 1){
                            verLabel.innerHTML='Verified Usyd Student';
                        }
                        if (json['object']['labeldesc'] === 2){
                            verLabel.innerHTML='Verified Usyd Staff';
                        }
                    }
                });
        }

        axios.get(`./getUserInfo`, { withCredentials: true })
        .then((response) => {
            if (response.data.code === 200){
                this.setState({
                    userAuth: response.data.object.userAuth,
                });
            }
        })

        var formData2 = new FormData();
        formData2.append("postID", postid);
        axios.get(`./Post/findCommentByPostID?postID=${postid}`)
        .then ((response) => {
            if (response.data.code === 200){
                let allcomments = response.data.object.sort((a, b) => b.createdTime.localeCompare(a.createdTime));
                this.setState({
                    comments: allcomments,
                });
            }
        })
    }

    onClickVisivle = () => {
        axios.get(`./getUserInfo`, { withCredentials: true })
        .then ((response) => {
            if (response.data.code === 200){
                let labeldesc = response.data.object.labeldesc;
                let userAuth = response.data.object.userAuth;
                let usercode = response.data.object.usercode;
                let userid = response.data.object.userid;
                let username = response.data.object.username;
                let userpwd = response.data.object.userpwd;
                axios.put(`./Post/updatePostInvisible?postID=${this.state.postid}&&labeldesc=${labeldesc}&&userAuth=${userAuth}&&usercode=${usercode}&&userid=${userid}&&username=${username}&&userpwd=${userpwd}`)
                .then ((response) => {
                    if (response.data.code === 200){
                        this.setState({
                            visible: 2,
                        });
                    }
                })
            }
        })
    }


    onClickInVisivle = () => {
        axios.get(`./getUserInfo`, { withCredentials: true })
        .then ((response) => {
            if (response.data.code === 200){
                let labeldesc = response.data.object.labeldesc;
                let userAuth = response.data.object.userAuth;
                let usercode = response.data.object.usercode;
                let userid = response.data.object.userid;
                let username = response.data.object.username;
                let userpwd = response.data.object.userpwd;
                axios.put(`./Post/updatePostVisible?postID=${this.state.postid}&&labeldesc=${labeldesc}&&userAuth=${userAuth}&&usercode=${usercode}&&userid=${userid}&&username=${username}&&userpwd=${userpwd}`)
                .then ((response) => {
                    if (response.data.code === 200){
                        this.setState({
                            visible: 1,
                        });
                    }
                })
            }
        })
    }

    onClickTop = () => {
        axios.get(`./getUserInfo`, { withCredentials: true })
        .then ((response) => {
            if (response.data.code === 200){
                let labeldesc = response.data.object.labeldesc;
                let userAuth = response.data.object.userAuth;
                let usercode = response.data.object.usercode;
                let userid = response.data.object.userid;
                let username = response.data.object.username;
                let userpwd = response.data.object.userpwd;
                axios.put(`./Post/updatePostIsTop?postID=${this.state.postid}&&labeldesc=${labeldesc}&&userAuth=${userAuth}&&usercode=${usercode}&&userid=${userid}&&username=${username}&&userpwd=${userpwd}`)
                .then ((response) => {
                    if (response.data.code === 200){
                        this.setState({
                            top: 2,
                        });
                    }
                })
            }
        })
    }

    onClickCancelTop = () => {
        axios.get(`./getUserInfo`, { withCredentials: true })
        .then ((response) => {
            if (response.data.code === 200){
                let labeldesc = response.data.object.labeldesc;
                let userAuth = response.data.object.userAuth;
                let usercode = response.data.object.usercode;
                let userid = response.data.object.userid;
                let username = response.data.object.username;
                let userpwd = response.data.object.userpwd;
                axios.put(`./Post/updatePostIsNotTop?postID=${this.state.postid}&&labeldesc=${labeldesc}&&userAuth=${userAuth}&&usercode=${usercode}&&userid=${userid}&&username=${username}&&userpwd=${userpwd}`)
                .then ((response) => {
                    if (response.data.code === 200){
                        this.setState({
                            top: 1,
                        });
                    }
                })
            }
        })
    }

    onClickFavorite = () => {
        var formData = new FormData();
        formData.append("postID", this.state.postid);
        formData.append("userid", Cookies.get('UID'));
        formData.append("userName", this.state.postusername);

        axios.post('./Fav/addFav', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then ((response) => {
            if (response.data.code === 200){
                window.alert("added to your Favorite");
            }
        })
    }

    handleComment = (event) => {
        this.setState({
            submitcomment: event.target.value,
        }); 
    }

    handleCommentButton = () => {
        fetch(`./getUserInfo`, {
            method:'GET',
            credentials:'include',
            body:null
        }).then(r=>r.json())
            .then(json=>{
                if (json['code']===200){
                    var formData = new FormData();
                    formData.append("userid", Cookies.get('UID'));
                    formData.append("username", json['object']['username']);
                    formData.append("postID", this.state.postid);
                    formData.append("content", this.state.submitcomment);

                    axios.post('./Post/saveComment', formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }).then ((response) => {
                        if (response.data.code === 200){
                            window.alert("success");
                            window.location.reload(false);
                        } else {
                            console.log("failed");
                        }
                    })
                }
            })

    }

    onClickFollow(postuserid){
        var formData = new FormData();
        formData.append("userid", Cookies.get('UID'));
        formData.append("takeuserid", postuserid);

        axios.post('./Post/takeuser', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then ((response) => {
            if (response.data.code === 200){
                window.alert("followed successfully");
            } else {

            }
        })
    }

    handleEditPostButton = (edit) => {
        this.setState({
            edit: !edit,
        });
    }

    handleDeletePostButton = (postid) => {
        axios.delete(`./Post/deleteThePost?postID=${postid}`)
        .then ((response) => {
            if (response.data.code === 200){
                window.alert("delete successfully");
                const {postCategory} = this.state;
                if (postCategory === "Book Market" || postCategory === "Cars" || postCategory === "Careers" || postCategory === "Rental" || postCategory === "Services"){
                    window.location.href = "./market.html"
                } else {
                    window.location.href = "./course.html"
                }
            }
        })
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value,
        }); 
    }

    onClickUpdatePost = () => {
        const { postid, postCategory, editTitle, editDetail} = this.state;
        var formData = new FormData();
        formData.append("postID", postid);
        formData.append("category", postCategory);
        formData.append("title", editTitle);
        formData.append("details", editDetail);

        axios.put('./Post/updatePost', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then ((response) => {
            if (response.data.code === 200){
                window.alert("update successfully");
                window.location.reload(false)
            } else {

            }
        })
    }

    render() {
        const { top, visible, favoriate, postusername, title, detail, likes, createdTime, userAuth, comments, postuserid, postImage, userid, edit, postid, postimageurl} = this.state;
        return(
            <div>
                <Navbar />
                {
                    top !== null && visible !== null && favoriate !== null && postusername !== null && title !== null && detail !== null && likes !== null && createdTime !== null &&
                    <div className="poster">
                        {postimageurl === null? <img className="userCommentPhoto" src={avatar}/> : <img className="userCommentPhoto" src={`./userProfile/setting/showImg?userid=${postuserid}`}/>}
                        <div className="userCommentName"><span>{postusername}</span><span className={'userCommentLabel'}></span></div>
                        <div className="userCommentTime">posted at {createdTime.substr(11)} on {createdTime.substr(0, 10)}</div>
                        <GiShadowFollower onClick={() => this.onClickFollow(postuserid)} className="userCommentFollow" size={30}/>
                        {
                            userAuth !== 2 ? <div className="Button"/> : visible === 2 ? <AiFillEyeInvisible className="Button" onClick={this.onClickInVisivle} size={30}/> : <AiFillEye className="Button" onClick={this.onClickVisivle} size={30}/>
                        }
                        {
                            userAuth !== 2 ? <div className="Button"/> : top === 2 ? <AiOutlineVerticalAlignTop className="Button" onClick={this.onClickCancelTop} size={30}/> : <GoListOrdered className="Button" onClick={this.onClickTop} size={30}/>
                        }
                        <AiOutlineStar className="Button" onClick={this.onClickFavorite} size={30}/>
                        <div className="postTitle">{title}</div>
                        <div className="postDescription">{detail}</div>
                        {postImage && <img className="imageSize" src={postImage} alt="Post Image"/> }
                        {
                            postuserid === userid ? 
                            <div className="editdelete">
                                <Button className="editbutton" onClick={() =>this.handleEditPostButton(edit)} variant="outline-dark">Update</Button>
                                <Button className="deletebutton" onClick={() =>this.handleDeletePostButton(postid)} variant="outline-dark">Delete</Button>
                            </div> :
                            <div></div>
                        }
                        {
                            edit === true ?
                            <div className="edit">
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2" >
                                        Title
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control placeholder="Title" name="editTitle" onChange={this.handleChange}/>
                                    </Col>
                                </Form.Group>
                                <div className="space"></div>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Details
                                    </Form.Label>
                                    <Col sm="10">
                                    <   Form.Control as="textarea" rows={3} name="editDetail" onChange={this.handleChange}/>
                                    </Col>
                                </Form.Group>
                                <Button variant="outline-dark" onClick={this.onClickUpdatePost} className="buttonUpdate">Update Post</Button>
                            </div> : <div></div>
                        }
                    </div>
                }
                <div className="commentList">
                {
                    comments && comments.map((comment) => {
                        return  <div className="singlecomment">
                                    <div className="commentUserName">
                                        {comment.username}
                                    </div>
                                    <div className="commentTime">
                                        posted at {(comment.createdTime).substr(11)} on {(comment.createdTime).substr(0, 10)}
                                    </div>
                                    <div className="commentContent">
                                        {comment.content}
                                    </div>
                                </div>
                    })
                }
                </div>
                {
                    top !== null && visible !== null && favoriate !== null && postusername !== null && title !== null && detail !== null && likes !== null && createdTime !== null &&
                    <div className="commentEditor">
                        <Form.Group as={Row} className="mb-3">
                            <Col sm="15">
                                <Form.Control as="textarea" rows={8} name="details" onChange={this.handleComment}/>
                            </Col>
                        </Form.Group>
                        <div className="d-grid">
                            <Button size="lg" onClick={this.handleCommentButton} variant="outline-dark">Comment</Button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
root.render(
    <React.StrictMode>
        <Comment/>
    </React.StrictMode>
);

export default Comment;