import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import './Post.css'
import Cookies from 'js-cookie';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: "",
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
        const { category, title, details } = this.state;
        const { type } = this.props;
        if (category.length !== 0 && title.length !== 0 && details.length !== 0){
            var formData = new FormData();
            formData.append("userID", Cookies.get('UID'));
            formData.append("type", type);
            formData.append("category", category);
            formData.append("title", title);
            formData.append("details", details);

            fetch('./Post/createPost', {
                method: 'POST',
                body: formData
            }).then(response => {
                if (response.ok){
                    window.alert("success");
                    window.location.reload(false)
                } else {
                    console.log("failed");
                }
            })
        } else {
            if (category.length === 0){
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
        const { category, categoryWarning, titleWarning, detailsWarning} = this.state;
        const { catrgories, type } = this.props;
        const title = type.substring(0, 1).toUpperCase()  + type.substring(1) + " Category";
        return(
            <div className="postEditor">
                <InputGroup className="mb-3">
                    <DropdownButton
                    variant="outline-secondary"
                    title={title}
                    >
                        {
                            catrgories.map((name) => <Dropdown.Item onClick={()=>this.handleClickCategory(name)} as="button">{name}</Dropdown.Item>)
                        }
                    </DropdownButton>
                    <Form.Control placeholder={category} disabled readOnly />
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
                    <   Form.Control as="textarea" rows={3} name="details" onChange={this.handleChange}/>
                    </Col>
                </Form.Group>
                <div className="space"></div>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Upload Files (Optional)
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="file" onChange={this.onFileChange}/>
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