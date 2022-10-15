import React, { Component } from "react";
import './Comment.css'
import Navbar from '../../Navbar'
import ReactDOM from "react-dom/client";
import { AiFillEye, AiFillEyeInvisible, AiOutlineVerticalAlignTop, AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { GoListOrdered, GoThumbsup } from 'react-icons/go'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

const params = new URLSearchParams(window.location.search);

class Comment extends Component {
    constructor(props){
        super(props);
        this.state = {
            postid: params.get('postID'),
            top: null,
            visible: null,
            favoriate: 1,
            username: null,
            title: null,
            detail: null,
            likes: null,
            createdTime: null,
            userid: null,
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
                userid: response.data.object.userid,
                username: response.data.object.userName,
            });
        })
        //TODO: get auth code

        //TODO: parallel
        /*
        const userid = Cookies.get('UID');
        axios.get(`./Fav/getFav?userid=${userid}`)
        .then ((response) => {
            if (response.data.code === 200){
                if (response.data.object.length === 0){
                    this.setState({
                        favoriate: 1,
                    });
                } else {
                    this.setState({
                        favoriate: 2,
                    });
                }
            }
        })
        */

        var formData2 = new FormData();
        formData2.append("postid", this.state.postid);

        //TODO
        /*
        axios.get('./', formData2, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then ((response) => {
            if (response.ok){
                let allcomments = response.data.object.sort((a, b) => b.createdTime.localeCompare(a.createdTime));
                this.setState({
                    comments: allcomments,
                });
            }
        })
        */
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

    onClickFavorite = () => {
        var formData = new FormData();
        formData.append("postID", this.state.postid);
        formData.append("userid", this.state.userid);
        formData.append("userName", this.state.username);

        axios.post('./Fav/addFav', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then ((response) => {
            if (response.data.code === 200){
                this.setState({
                    favoriate: 2,
                });
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
        formData.append("userid", this.state.userid);
        formData.append("username", this.state.username);
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
    // TODO: update star location
    render() {
        const { top, visible, favoriate, username, title, detail, likes, createdTime, userAuth } = this.state;
        return(
            <div>
                <Navbar />
                {
                    top !== null && visible !== null && favoriate !== null && username !== null && title !== null && detail !== null && likes !== null && createdTime !== null &&
                    <div className="poster">
                        <div className="userCommentPhoto"></div>
                        <div className="userCommentName">{username}</div>
                        <div className="userCommentTime">posted at {createdTime.substr(11)} on {createdTime.substr(0, 10)}</div>
                        <GoThumbsup className="userCommentThumb" size={25}/>
                        <div className="userCommentLikes">{likes}</div>
                        {
                            userAuth !== 2 ? <div/> : visible === 1 ? <AiFillEye className="Button" onClick={this.onClickVisivle} size={25}/> : <AiFillEyeInvisible className="Button" size={25}/>
                        }
                        {
                            userAuth !== 2 ? <div/> : top === 1 ? <GoListOrdered className="Button" onClick={this.onClickTop} size={25}/> : <AiOutlineVerticalAlignTop className="Button" size={25}/>
                        }
                        {
                            favoriate === 1 ? <AiOutlineStar className="Button" onClick={this.onClickFavorite} size={25}/> : <AiFillStar className="Button" size={25}/>
                        }
                        <div className="postTitle">{title}</div>
                        <div className="postDescription">{detail}</div>
                    </div>
                }
                {
                    /*
                    <div className="commentList">
                        <div className="singlecomment">
                            <div className="commentUserName">

                            </div>
                            <div className="commentTime">

                            </div>
                            <div className="commentContent">

                            </div>
                        </div>
                    </div>
                    */
                }
                {
                    top !== null && visible !== null && favoriate !== null && username !== null && title !== null && detail !== null && likes !== null && createdTime !== null &&
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