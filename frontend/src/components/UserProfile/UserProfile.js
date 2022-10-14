import React, { Component } from "react";
import './UserProfile.css'
import Navbar from '../../Navbar'
import ReactDOM from "react-dom/client";
import Favorite from "../Favorite/Favorite";
import Setting from "../Setting/Setting";

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userHome: true,
            favorite: false,
            setting: false,
        }
    }
    
    handleClickUserHome = () => {
        this.setState({
            userHome: true,
            favorite: false,
            setting: false,
        });
    }

    handleClickFavorite = () => {
        this.setState({
            userHome: false,
            favorite: true,
            setting: false,
        });
    }

    handleClickSetting = () => {
        this.setState({
            userHome: false,
            favorite: false,
            setting: true,
        });
    }

    render() {
        const {userHome, favorite, setting} = this.state;
        let contents;
        if (userHome && !favorite && !setting){
            contents = 
            <div>
                <div className="Person">
                    <div className="image"></div>
                    <div className="username">UserName</div>
                </div>
                <div className="postArea">This is a sample description</div>
            </div>
        } else if (!userHome && favorite && !setting){
            contents = <Favorite/>
        }  else {
            contents = <Setting/>
        }
        return(
            <div>
                <Navbar />
                <div>
                    <div className="verticalBar">
                        <div onClick={this.handleClickUserHome} className="userHome">My Profile</div>
                        <div onClick={this.handleClickFavorite} className="friends">Favouites</div>
                        <div onClick={this.handleClickSetting} className="setting">Update Profile</div>
                    </div>
                    <div className="contents">{contents}
                    </div>
                </div>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
root.render(
    <React.StrictMode>
        <UserProfile/>
    </React.StrictMode>
);

export default UserProfile;