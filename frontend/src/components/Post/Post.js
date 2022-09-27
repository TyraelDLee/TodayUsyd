import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import './Post.css'

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            userID: "",
            courseID: "",
            title: "",
            details: "",
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        }); 
    }

    handleClickSave = () => {
        const { userID, courseID, title, details } = this.state;
        var formData = new FormData();
        formData.append("userID", userID);
        formData.append("courseID", courseID);
        formData.append("title", title);
        formData.append("details", details);

        fetch('http://localhost:8085/Course/createPost', {
            method: 'POST',
            body: formData
        }).then(response => {
            console.log(response);
            if (response.ok){
                console.log("success");
            } else {
                console.log("failed");
            }
        }
        )
    }

    render() {
        const { userID, courseID, title, details} = this.state;
        return(
            <div className="postEditor">
                <input
                    name="userID"
                    type="text"
                    value={userID}
                    placeholder="userID"
                    onChange={this.handleChange}
                />
                <input
                    name="courseID"
                    type="text"
                    value={courseID}
                    placeholder="courseID"
                    onChange={this.handleChange}
                />
                <textarea className="title"
                    name="title"
                    value={title}
                    placeholder="title"
                    onChange={this.handleChange}
                />
                <textarea className="details"
                    name="details"
                    value={details}
                    placeholder="details"
                    onChange={this.handleChange}
                />
                <Button className="Post" onClick={this.handleClickSave}>Post</Button>
            </div>
        );
    }
}

export default Post;