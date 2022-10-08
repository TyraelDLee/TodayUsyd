import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import './Post.css'
import Cookies from 'js-cookie';

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: "",
            title: "",
            details: "",
            selectedFile: null
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        }); 
    }

    handleClickSave = () => {
        const { category, title, details } = this.state;
        const { type } = this.props;
        var formData = new FormData();
        formData.append("userID", Cookies.get('UID'));
        formData.append("type", type);
        formData.append("category", category);
        formData.append("title", title);
        formData.append("details", details);

        fetch('http://localhost:8085/Post/createPost', {
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

    onFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    render() {
        const { category, title, details} = this.state;
        return(
            <div className="postEditor">
                <input
                    name="category"
                    type="text"
                    value={category}
                    placeholder="category"
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
                <input type="file" onChange={this.onFileChange} />
                <Button className="Post" onClick={this.handleClickSave}>Post</Button>
            </div>
        );
    }
}

export default Post;