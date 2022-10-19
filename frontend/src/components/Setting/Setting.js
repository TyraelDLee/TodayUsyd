import React, { Component, useCallback, useState } from "react";
import './Setting.css'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Cookies from 'js-cookie';
import axios from 'axios';
import ReactDOM from "react-dom/client";
import Navbar from '../../Navbar'
import Row from 'react-bootstrap/Row';

class Setting extends Component {
    constructor(props){
        super(props);
        this.state = {
            updateDesciption: null,
            updateadress: null,
            username: null,
            image: null,
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
        const {image} = this.state;

        if (image === null){
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
                    window.alert("Update Successfully");
                } else {
                    console.log("failed");
                }
            })
        } else {
            var formData = new FormData();
            formData.append("file", image);
    
            axios.post('./userProfile/setting/upload', formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
            }).then((response) => {
                console.log(response);
                if (response.data.code === 200){
                    console.log(response.data.object);
                    const {username, updateadress, updateDesciption} = this.state;
    
                    var formData2 = new FormData();
                    formData2.append("userid", Cookies.get('UID'));
                    formData2.append("username", username);
                    formData2.append("description", updateDesciption);
                    formData2.append("address", updateadress);
                    formData2.append("imgurl", response.data.object);
    
                    axios.post('./userProfile/setting/updateInfo', formData2, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }).then((response) => {
                        console.log(response);
                        if (response.data.code === 200){
                            window.alert("Update Successfully");
                            window.location.reload(false);
                        } else {
                            console.log("failed");
                        }
                    })
                } else {
                    console.log("failed");
                }
            })
        }
    }

    onFileUpload = (event) => {
        this.setState({ image: event.target.files[0] });
    }

    render() {
        return(
            <div>
                <Navbar />
                <div className="settingTopSpace"></div>
                <div className="update">
                    <div>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label className="photoDescription" column sm="3">
                                Update Your Profile Photo
                            </Form.Label>
                            <Col sm="3">
                                <Form.Control name="file" accept="image/png, image/jpeg, image/jpg" type="file" onChange={this.onFileUpload}/>
                            </Col>
                        </Form.Group>
                        <div className="settingTopSpace"></div>
                        <div className="updateImageSize">Update Your Address</div>
                        <div className="uploadImage">
                            <Col sm="100">
                                <Form.Control onChange={this.handleChangeAddress}/>
                            </Col>
                        </div>
                    </div>
                </div>
                <div className="settingTopSpace"></div>
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