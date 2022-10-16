import React, { Component, useCallback, useState } from "react";
import './Setting.css'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Cookies from 'js-cookie';
import axios from 'axios';
import ReactDOM from "react-dom/client";
import Navbar from '../../Navbar'

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
        var formData = new FormData();
        console.log(this.state.updatePhoto);
        formData.append("file", this.state.updatePhoto);

        axios.post('./userProfile/setting/upload', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response);
            if (response.data.code === 200){
                console.log("success");
            } else {
                console.log("failed");
            }
        })
    }

    handleChangeDescription = (event) => {
        this.setState({ updateDesciption: event.target.value, });
    }
    
    handleClickChangeDescription = () => {
        var formData = new FormData();
        formData.append("userid", Cookies.get('UID'));
        formData.append("username", "test");
        formData.append("description", this.state.updateDesciption);
        formData.append("imgurl", this.state.updatePhoto);

        axios.post('./userProfile/setting/updateInfo', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            if (response.data.code === 200){
                console.log("success");
            } else {
                console.log("failed");
            }
        })
    }

    render() {
        const { updatePhoto, updateDesciption} = this.state;
        return(
            <div className="">
                <Navbar />
                <div className="settingTopSpace"></div>
                <div className="update">
                    <div>
                        <div className="updateImageSize">Update Your Photo</div>
                        <div className="uploadImage">
                            <Col sm="12">
                                <Form.Control accept="image/jpg, image/png, image/jpeg" type="file" onChange={this.onFileChangePhoto}/>
                            </Col>
                        </div>
                        {/*<div className="uploadImageButton">
                            <Button onClick={this.handleFileUpload} variant="outline-dark">Update</Button>
                        </div>*/}
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
                {/*<div className="updateAddress">
                    <div className="updateAddressSize">Update Your Address</div>
                    <div className="uploadImage">
                        <Col sm="15">
                            <Form.Control onChange={this.handleChangeAddress}/>
                        </Col>
                    </div>
                    <div className="uploadDescription">
                        <Button onClick={this.handleClickChangeAddress} variant="outline-dark">Update Address</Button>
                    </div>
                </div>*/}
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
root.render(
    <React.StrictMode>
        <Setting/>
    </React.StrictMode>
);

export default Setting;