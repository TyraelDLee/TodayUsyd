import React, { Component } from "react";
import './Course.css'
import './../../colour.css'
import Navbar from '../../Navbar'
import Filter from "../../Filter";
import ReactDOM from "react-dom/client";
import Button from 'react-bootstrap/Button';
import Post from './../Post/Post';
import axios from 'axios';
import { GoThumbsup } from 'react-icons/go'
import Cookies from 'js-cookie';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class Course extends Component {

    constructor(props){
        super(props);
        this.state = {
            showPost: false,
            posts: null,
            sort: "Time",
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8085/Post/getAllPostsByType?type=course')
        .then((response) => {
            let post = response.data.object.sort((a, b) => b.createdTime.localeCompare(a.createdTime));
            this.setState({
                posts: post,
            });
        })
    }

    onClickOpenPost = () => {
        this.setState({
            showPost: true,
        }); 
    }

    onClickCancelPost = () => {
        this.setState({
            showPost: false,
        }); 
    }

    onClickDirectPost = (postID) => {
        window.location.href = `./comment.html?postID=${postID}`;
    }

    onClickThumbUp(postID) {
        var formData = new FormData();
        formData.append("postID", postID);
        formData.append("userID", Cookies.get('UID'));

        axios.put('./Post/likeThePost', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response);
            if (response.data.code === 200){
                let updatePost = this.state.posts.map((post) => {
                    if (post.postID === postID){
                        let likes = post.numOfLikes + 1;
                        return {...post, numOfLikes: likes}
                    }
                    return post;
                })
                this.setState({
                    posts: updatePost,
                });
            } else {
                console.log("failed");
            }
        })
    }

    handleClickSortCategory(category) {
        let sortposts;
        if (category === "Time"){
            sortposts = this.state.posts.sort((a, b) => b.createdTime.localeCompare(a.createdTime));
        } else {
            sortposts = this.state.posts.sort((a, b) => (a.numOfLikes > b.numOfLikes) ? -1 : 1);
        }
        this.setState({
            sort: category,
            posts: sortposts,
        });
    }

    render() {
        const { posts,sort } = this.state;
        return(
            <div>
                <Navbar />
                <Filter type={'course'}/>
                <div className="CoursePost">
                    {this.state.showPost ?
                        <div>
                            <Button variant="outline-dark" onClick={this.onClickCancelPost} className="buttonCancel">Cancel Post</Button>
                            <Post catrgories={["ELEC5619"]} type="course"/>
                        </div> :
                        <Button variant="outline-dark" onClick={this.onClickOpenPost} className="buttonAdd">Add Post</Button>
                    }
                </div>
                <div className="sortDropDown">
                    <InputGroup className="mb-3">
                        <DropdownButton
                        variant="outline-secondary"
                        title="Sorted By"
                        >
                            <Dropdown.Item onClick={()=>this.handleClickSortCategory("Time")} as="button">Time</Dropdown.Item>
                            <Dropdown.Item onClick={()=>this.handleClickSortCategory("Likes")} as="button">Likes</Dropdown.Item>
                        </DropdownButton>
                        <Col sm="2">
                            <Form.Control placeholder={sort} disabled readOnly />
                        </Col>
                    </InputGroup>
                </div>
                <div className="postlist">
                    {
                        posts && posts.map((post) => {
                            return  <div className="singlePost">
                                        <div onClick={() => this.onClickDirectPost(post.postID)} className="profileOverview">
                                            <div className="profileUserName">{post.userName}</div>
                                            <div className="profileTitle">{post.title}</div>
                                            <div className="profileTime">posted at {(post.createdTime).substr(11)} on {(post.createdTime).substr(0, 10)}</div>
                                        </div>
                                        <div className="profileThumb">
                                            <div>
                                                <div className="thumbUpNumber">{post.numOfLikes}</div>
                                                <GoThumbsup onClick={() => this.onClickThumbUp(post.postID)} className="thumbUp" size={25}/>
                                            </div>
                                        </div>
                                    </div>
                        })
                    }
                </div>
                <br/><br/><br/><br/>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
root.render(
    <React.StrictMode>
        <Course/>
    </React.StrictMode>
);


export default Course;