import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import './Post.css'
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            details: "",
            selectedFile: null,
            categoryWarning: null,
            titleWarning: null,
            detailsWarning: null,
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        }); 
    }

    handleClickSave = () => {
        const { title, details, selectedFile } = this.state;
        const { type, categories, login } = this.props;
        if (!login){
            window.alert("You have not loggin in");
        } else { 
            if (categories !== null && title.length !== 0 && details.length !== 0){
                var formData = new FormData();
                formData.append("userID", Cookies.get('UID'));
                formData.append("type", type);
                formData.append("category", categories);
                formData.append("title", title);
                formData.append("details", details);

                if (selectedFile === null){
                    axios.post('./Post/createPostWithoutFile', formData, {
                        headers: {
                        "Content-Type": "multipart/form-data",
                        },
                    }).then ((response) => {
                        if (response.data.code === 200){
                            window.alert("success");
                            if (type === "course"){
                                window.location.href = "./course.html"
                            } else {
                                window.location.href = "./market.html"
                            }
                        } else {
                            console.log("failed");
                        }
                    })
                } else {
                    formData.append("file", selectedFile);
                    axios.post('./Post/createPost', formData, {
                        headers: {
                        "Content-Type": "multipart/form-data",
                        },
                    }).then ((response) => {
                        if (response.data.code === 200){
                            window.alert("success");
                            if (type === "course"){
                                window.location.href = "./course.html"
                            } else {
                                window.location.href = "./market.html"
                            }
                        } else {
                            console.log("failed");
                        }
                    })
                }
            } else {
                if (categories === null){
                    this.setState({
                        categoryWarning: "Please select a category"
                    }); 
                } else {
                    this.setState({
                        categoryWarning: null
                    });     
                }
        
                if (title.length === 0){
                    this.setState({
                        titleWarning: "Title is required"
                    }); 
                } else {
                    this.setState({
                        titleWarning: null
                    });     
                }
        
                if (details.length === 0){
                    this.setState({
                        detailsWarning: "Details is required"
                    }); 
                } else {
                    this.setState({
                        detailsWarning: null
                    }); 
                }
            }
        }
    }

    handleClickCategory = (categoryValue) => {
        this.setState({
            category: categoryValue,
        }); 
    }
    
    handleClickSubject = (subjectValue) => {
        this.setState({
            subject: subjectValue,
        }); 
    }

    onFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    render() {
        const { categoryWarning, titleWarning, detailsWarning} = this.state;
        const { categories } = this.props;
        return(
            <div className="postEditor">
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                        Category
                    </InputGroup.Text>
                    <Form.Control placeholder={categories} disabled readOnly />
                </InputGroup>
                <div className="space"></div>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2" >
                        Title
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control placeholder="Title" name="title" onChange={this.handleChange}/>
                    </Col>
                </Form.Group>
                <div className="space"></div>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Details
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control as="textarea" rows={3} name="details" onChange={this.handleChange}/>
                    </Col>
                </Form.Group>
                <div className="space"></div>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Upload Files (Optional)
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control name="file" type="file" accept="image/*" onChange={this.onFileChange}/>
                    </Col>
                </Form.Group>
                <div className="spacePost"></div>
                <div className="d-grid">
                    <Button size="lg" onClick={this.handleClickSave} variant="outline-dark">Post</Button>
                </div>
                
                <div className="spacePost"></div>
                { categoryWarning && <Alert variant='danger'>{categoryWarning}</Alert> }
                { titleWarning && <Alert variant='danger'>{titleWarning}</Alert> }
                { detailsWarning && <Alert variant='danger'>{detailsWarning}</Alert> }
            </div>
        );
    }
}

export default Post;