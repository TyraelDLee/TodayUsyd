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
            title: null,
            detail: null,
            likes: null,
            createdTime: null,
            postuserid: null,
            submitcomment: null,
            comments: null,
            userAuth: null,
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
            });
        })

        axios.get(`./getUserInfo`, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
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
        var formData = new FormData();
        formData.append("postID", this.state.postid);

        axios.put('./Post/updatePostInvisible', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then ((response) => {
            if (response.data.code === 200){
                this.setState({
                    visible: 2,
                });
            }
        })
    }


    onClickInVisivle = () => {
        var formData = new FormData();
        formData.append("postID", this.state.postid);

        axios.put('./Post/updatePostVisible', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then ((response) => {
            if (response.data.code === 200){
                this.setState({
                    visible: 1,
                });
            }
        })
    }

    onClickTop = () => {
        var formData = new FormData();
        formData.append("postID", this.state.postid);

        axios.put('./Post/updatePostIsTop', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then ((response) => {
            if (response.data.code === 200){
                this.setState({
                    top: 2,
                });
            }
        })
    }

    onClickCancelTop = () => {
        var formData = new FormData();
        formData.append("postID", this.state.postid);

        axios.put('./Post/updatePostIsNotTop', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then ((response) => {
            if (response.data.code === 200){
                this.setState({
                    top: 1,
                });
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
        var formData = new FormData();
        formData.append("userid", Cookies.get('UID'));
        formData.append("username", this.state.postusername);
        formData.append("postID", this.state.postid);
        formData.append("content", this.state.submitcomment);

        axios.post('./Post/saveComment', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then ((response) => {
            if (response.data.code === 200){
                window.alert("success");
                window.location.reload(false)
            } else {
                console.log("failed");
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

    render() {
        const { top, visible, favoriate, postusername, title, detail, likes, createdTime, userAuth, comments, postuserid } = this.state;
        console.log(comments);
        return(
            <div>
                <Navbar />
                {
                    top !== null && visible !== null && favoriate !== null && postusername !== null && title !== null && detail !== null && likes !== null && createdTime !== null &&
                    <div className="poster">
                        <img className="userCommentPhoto" src={avatar}/>
                        <div className="userCommentName">{postusername}</div>
                        <div className="userCommentTime">posted at {createdTime.substr(11)} on {createdTime.substr(0, 10)}</div>
                        <GiShadowFollower onClick={() => this.onClickFollow(postuserid)} className="userCommentFollow" size={25}/>
                        {
                            userAuth !== 2 ? <div className="Button"/> : visible === 2 ? <AiFillEyeInvisible className="Button" onClick={this.onClickInVisivle} size={25}/> : <AiFillEye className="Button" onClick={this.onClickVisivle} size={25}/>
                        }
                        {
                            userAuth !== 2 ? <div className="Button"/> : top === 2 ? <AiOutlineVerticalAlignTop className="Button" onClick={this.onClickCancelTop} size={25}/> : <GoListOrdered className="Button" onClick={this.onClickTop} size={25}/>
                        }
                        <AiOutlineStar className="Button" onClick={this.onClickFavorite} size={25}/>
                        <div className="postTitle">{title}</div>
                        <div className="postDescription">{detail}</div>
                        <div className="attachedFile">{/* TODO*/}</div>
                    </div>
                }
                <div className="commentList">
                {
                    comments && comments.map((comment) => {
                        return <div className="singlecomment">
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