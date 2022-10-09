import React, { Component } from "react";
import './Setting.css'

class Setting extends Component {
    constructor(props){
        super(props);
        this.state = {
            personalProfile: true,
            changePassword: false,
            verification: false,
        }
    }

    handleClickPersonalProfile = () => {
        this.setState({
            personalProfile: true,
            changePassword: false,
            verification: false,
        });
    }

    handleClickChangePassword = () => {
        this.setState({
            personalProfile: false,
            changePassword: true,
            verification: false,
        });
    }

    handleClickVerification = () => {
        this.setState({
            personalProfile: false,
            changePassword: false,
            verification: true,
        });
    }

    render() {
        const {personalProfile, changePassword, verification} = this.state;
        let settingContent;
        if (personalProfile && !changePassword && !verification){
            settingContent = <div>1</div>
        } else if (!personalProfile && changePassword && !verification){
            settingContent = <div>2</div>
        } else {
            settingContent = <div>3</div>
        }
        return(
            <div>
                <div className="settingBar">
                    <div onClick={this.handleClickPersonalProfile} className="singleSetting">
                        <div className="settingName">Update Personal Profile</div>
                    </div>
                    <div onClick={this.handleClickChangePassword} className="singleSetting">
                        <div  className="settingName">Change Password</div>
                    </div>
                    <div onClick={this.handleClickVerification} className="singleSetting">
                        <div className="settingName">Verification</div>
                    </div>
                </div>
                <div className="settingContent">{settingContent}</div>
            </div>
        );
    }
}

export default Setting;