import React, { Component, useCallback, useState } from "react";
import './Setting.css'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

class Setting extends Component {
    constructor(props){
        super(props);
        this.state = {
            updateDesciption: null,
            updatePhoto: null,
        }
    }

    onFileChangePhoto = (event) => {
        this.setState({ updatePhoto: event.target.files[0] });
    };

    handleFileUpload = () => {
        //TODO
    }

    handleChangeDescription = (event) => {
        this.setState({ updateDesciption: event.target.value, });
    }
    
    handleClickChangeDescription = () => {
        //TODO
    }

    render() {
        return(
            <div className="">
                <div className="settingTopSpace"></div>
                <div className="update">
                    <div>
                        <div className="updateImageSize">Update Your Photo</div>
                        <div className="uploadImage">
                            <Col sm="12">
                                <Form.Control accept="image/jpg, image/png, image/jpeg" type="file" onChange={this.onFileChangePhoto}/>
                            </Col>
                        </div>
                        <div className="uploadImageButton">
                            <Button onClick={this.handleFileUpload} variant="outline-dark">Update</Button>
                        </div>
                    </div>
                </div>
                <div className="updateDescription">
                    <div className="updateDescriptionSize">Update Your Description</div>
                    <Col sm="15">
                        <Form.Control className="descriptionInput" as="textarea" rows={8} onChange={this.handleChangeDescription}/>
                    </Col>
                    <div className="uploadDescription">
                        <Button onClick={this.handleClickChangeDescription} variant="outline-dark">Update Description</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Setting;