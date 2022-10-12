import React, { Component } from "react";
import './Market.css'
import './../../colour.css'
import Navbar from '../../Navbar'
import Filter from "../../Filter";
import ReactDOM from "react-dom/client";
import Button from 'react-bootstrap/Button';
import Post from './../Post/Post';
import Item from './../SearchItem/Item';
import avatar from './../../avatar.svg';
import axios from 'axios';
import { GoThumbsup, GoThumbsdown } from 'react-icons/go'
import Cookies from 'js-cookie';
import Comment from './../Comment/Comment';
import Sort from './../Sort/Sort';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class Market extends Component {
    constructor(props){
        super(props);
        this.state = {
            showPost: false,
            posts: null,
            sort: "Time",
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8085/Post/getAllPostsByType?type=market')
        .then((response) => {
            let post = response.data.object.sort((a, b) => b.createdTime.localeCompare(a.createdTime));
            this.setState({
                posts: post,
            });
            /*response.data.object.map((post) => {
                axios.get('http://localhost:8085/Post/getAllPostsByType?type=course')
            })*/
        })

        /*fetch('http://localhost:8085/Post/getAllPostsByType?type=course', {
        }).then(
            response => response.json()
        ).then(data => data.object 
        ).then(object => object.map(
            (post) => post.userId)
        );*/
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

    onClickDirectPost = () => {
        //window.location.href = `./comment.html?postID=${postID}`;
        console.log("1");
    }

    onClickThumbUp(postID) {
        var formData = new FormData();
        formData.append("postID", postID);
        formData.append("userID", Cookies.get('UID'));

        fetch('./Post/likeThePost', {
            method: 'PUT',
            body: formData
        }).then(response => {
            if (response.ok){
                window.location.reload(false)
            } else {
                console.log("failed");
            }
        })
    }

    onClickThumbDown = () => {
        console.log("3");
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
                <Filter type={'market'}/>
                <div className="MarketPost">
                    {this.state.showPost ?
                        <div>
                            <Button variant="outline-dark" onClick={this.onClickCancelPost} className="buttonCancel">Cancel Post</Button>
                            <Post catrgories={["Rental", "Services", "Book Market", "Cars", "Careers"]} type="market"/>
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
                                        <div onClick={this.onClickDirectPost} className="profileOverview">
                                            <div className="profileImage"></div>
                                            <div className="profileUserName">Test</div>
                                            <div className="profileTitle">{post.title}</div>
                                            <div className="profileTime">posted at {(post.createdTime).substr(11)} on {(post.createdTime).substr(0, 10)}</div>
                                        </div>
                                        <div className="profileThumb">
                                            <div>
                                                <div className="thumbDownNumber">0</div>
                                                <GoThumbsdown onClick={this.onClickThumbDown} className="thumbDown" size={25}/>
                                            </div>
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
        <Market/>
    </React.StrictMode>
);

export default Market