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
import { AiFillTag } from 'react-icons/ai';

class Course extends Component {
    constructor(props){
        super(props);
        this.state = {
            showPost: false,
            posts: null,
            sort: "Time",
            topposts: null,
            selectedCategory: null,
        }
    }

    componentDidMount(){
        axios.get('./Post/getAllPostsByType?type=course')
        .then((response) => {
            let removeInvisiblePost = response.data.object.filter(post => {
                return post.isVisible !== 2;
            });
            let toppost = removeInvisiblePost.filter(post => {
                return post.istop === 2;
            });
            let otherpost = removeInvisiblePost.filter(post => {
                return post.istop !== 2;
            });
            let toppostsort = toppost.sort((a, b) => b.createdTime.localeCompare(a.createdTime));
            let otherpostsort = otherpost.sort((a, b) => b.createdTime.localeCompare(a.createdTime));
            this.setState({
                topposts: toppostsort,
                posts: otherpostsort,
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
            if (response.data.code === 200){
                console.log("Like has been saved!");
                if (response.data.object === "Like has been saved!"){
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
                    window.alert("You have already liked the post");
                }
            } else {
                console.log("failed");
            }
        })
    }

    handleClickSortCategory(category) {
        let sortposts, topsortposts;
        if (category === "Time"){
            sortposts = this.state.posts.sort((a, b) => b.createdTime.localeCompare(a.createdTime));
            topsortposts = this.state.topposts.sort((a, b) => b.createdTime.localeCompare(a.createdTime));
        } else {
            sortposts = this.state.posts.sort((a, b) => (a.numOfLikes > b.numOfLikes) ? -1 : 1);
            topsortposts = this.state.topposts.sort((a, b) => (a.numOfLikes > b.numOfLikes) ? -1 : 1);
        }
        this.setState({
            sort: category,
            posts: sortposts,
            topposts: topsortposts, 
        });
    }

    getFilterResult=(filter)=>{
        console.log(filter);
        if (filter===''){
            fetch(`./Post/getAllPostsByType?type=course`, {
                method:'GET',
                credentials:'include',
                body:null
            }).then(r=>r.json())
                .then(json=>{
                    if (json['code']===200){
                        let removeInvisiblePost = json.object.filter(post => {
                            return post.isVisible !== 2;
                        });
                        let toppost = removeInvisiblePost.filter(post => {
                            return post.istop === 2;
                        });
                        let otherpost = removeInvisiblePost.filter(post => {
                            return post.istop !== 2;
                        });
                        let toppostsort = toppost.sort((a, b) => b.createdTime.localeCompare(a.createdTime));
                        let otherpostsort = otherpost.sort((a, b) => b.createdTime.localeCompare(a.createdTime));
                        this.setState({
                            topposts: toppostsort,
                            posts: otherpostsort,
                        });
                    }
                });
        }
        else{
            fetch(`./Post/filterByCategory?category=${filter}`, {
                method:'GET',
                credentials:'include',
                body:null
            }).then(r=>r.json())
                .then(json=>{
                    if (json['code']===200){
                        let removeInvisiblePost = json.object.filter(post => {
                            return post.isVisible !== 2;
                        });
                        let toppost = removeInvisiblePost.filter(post => {
                            return post.istop === 2;
                        });
                        let otherpost = removeInvisiblePost.filter(post => {
                            return post.istop !== 2;
                        });
                        let toppostsort = toppost.sort((a, b) => b.createdTime.localeCompare(a.createdTime));
                        let otherpostsort = otherpost.sort((a, b) => b.createdTime.localeCompare(a.createdTime));
                        this.setState({
                            topposts: toppostsort,
                            posts: otherpostsort,
                        });
                    }
                });
        }
        this.setState({
            selectedCategory: filter,
        });
    }

    render() {
        const { posts,sort, topposts, selectedCategory } = this.state;
        return(
            <div>
                <Navbar />
                <Filter type={'course'} getFilterResult={this.getFilterResult}/>
                <div className="CoursePost">
                    {this.state.showPost ?
                        <div>
                            <Button variant="outline-dark" onClick={this.onClickCancelPost} className="buttonCancel">Cancel Post</Button>
                            <Post categories={selectedCategory} type="course"/>
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
                        topposts && topposts.map((toppost) => {
                            return  <div className="singlePost">
                                        <AiFillTag className="tag" size={30}/>
                                        <div onClick={() => this.onClickDirectPost(toppost.postID)} className="profileOverview">
                                            <div className="profileUserName">{toppost.userName}</div>
                                            <div className="profileTitle">{toppost.title}</div>
                                            <div className="profileTime">posted at {(toppost.createdTime).substr(11)} on {(toppost.createdTime).substr(0, 10)}</div>
                                        </div>
                                        <div className="profileThumb">
                                            <div>
                                                <div className="thumbUpNumber">{toppost.numOfLikes}</div>
                                                <GoThumbsup onClick={() => this.onClickThumbUp(toppost.postID)} className="thumbUp" size={25}/>
                                            </div>
                                        </div>
                                    </div>
                        })
                    }
                    <br/><br/>
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