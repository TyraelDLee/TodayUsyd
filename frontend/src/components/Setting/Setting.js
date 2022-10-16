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
            updateadress: null,
            username: null,
        }
    }

    componentDidMount(){
        axios.get(`./getUserInfo`, { withCredentials: true })
        .then((response) => {
            if (response.data.code === 200){
                this.setState({
                    username: response.data.object.username,
                });
            }
        })
    }

    handleChangeAddress = (event) => {
        this.setState({ updateadress: event.target.value });
    }

    handleChangeDescription = (event) => {
        this.setState({ updateDesciption: event.target.value });
    }
    
    handleClickChangeProfile = () => {
        const {username, updateadress, updateDesciption} = this.state;

        var formData = new FormData();
        formData.append("userid", Cookies.get('UID'));
        formData.append("username", username);
        formData.append("description", updateDesciption);
        formData.append("address", updateadress);

        axios.post('./userProfile/setting/updateInfo', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            if (response.data.code === 200){
                window.alert("profile update successfully");
            } else {
                console.log("failed");
            }
        })
    }

    render() {
        return(
            <div>
                <Navbar />
                <div className="settingTopSpace"></div>
                <div className="update">
                    <div>
                        <div className="updateImageSize">Update Your Address</div>
                        <div className="uploadImage">
                            <Col sm="100">
                                <Form.Control onChange={this.handleChangeAddress}/>
                            </Col>
                        </div>
                    </div>
                </div>
                <div className="updateDescription">
                    <div className="updateDescriptionSize">Update Your Description</div>
                    <Col sm="15">
                        <Form.Control className="descriptionInput" as="textarea" rows={8} onChange={this.handleChangeDescription}/>
                    </Col>
                    <div className="uploadDescription">
                        <Button onClick={this.handleClickChangeProfile} variant="outline-dark">Update User Profile</Button>
                    </div>
                </div>
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