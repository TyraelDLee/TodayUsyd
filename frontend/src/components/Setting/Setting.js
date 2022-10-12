import React, { Component, useCallback, useState } from "react";
import './Setting.css'
import Form from 'react-bootstrap/Form';

class Setting extends Component {
/*    onCropChange = (crop) => {
        this.setState({ crop })
    }

    onCropComplete = (croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
        this.setState({
            personalProfile: croppedArea,
            verification: croppedAreaPixels,
        });
    }

    onZoomChange = (zoom) => {
        this.setState({ zoom })
    }
                        <Cropper
                        image='https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'
                        crop={this.state.crop}
                        zoom={this.state.zoom}
                        aspect={this.state.aspect}
                        onCropChange={this.onCropChange}
                        onCropComplete={this.onCropComplete}
                        onZoomChange={this.onZoomChange}
                        cropShape='round'
                    />
                    <ImgDialog img={croppedImage} onClose={onClose} />
*/
    constructor(props){
        super(props);
        this.state = {
            personalProfile: true,
            verification: false,
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 1,
        }
    }

    handleClickPersonalProfile = () => {
        this.setState({
            personalProfile: true,
            verification: false,
        });
    }

    handleClickVerification = () => {
        this.setState({
            personalProfile: false,
            verification: true,
        });
    }

    onFileUpload = () => {

    }

    render() {
        const {personalProfile, verification} = this.state;
        let settingContent;
        if (personalProfile && !verification){
            settingContent = 
                <div className="settingPerson">
                    <div className="settingImage"></div>
                </div>
                
        } else {
            settingContent = <div>2</div>
        }
        return(
            <div>
                <div className="settingBar">
                    <div onClick={this.handleClickPersonalProfile} className="singleSetting">
                        <div className="settingName">Update Personal Profile</div>
                    </div>
                    <div onClick={this.handleClickVerification} className="singleSetting">
                        <div className="settingName">Verification</div>
                    </div>
                </div>
                <div className="settingContent">
                    <div className="settingTopSpace"></div>
                    {settingContent}
                </div>
            </div>
        );
    }
}

export default Setting;