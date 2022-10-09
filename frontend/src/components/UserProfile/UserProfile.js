import React, { Component } from "react";
import './UserProfile.css'
import Navbar from '../../Navbar'
import ReactDOM from "react-dom/client";
import Friends from "../Friends/Friends";
import Setting from "../Setting/Setting";

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userHome: true,
            friends: false,
            history: false,
            setting: false,
        }
    }
    
    handleClickUserHome = () => {
        this.setState({
            userHome: true,
            friends: false,
            history: false,
            setting: false,
        });
    }

    handleClickFriends = () => {
        this.setState({
            userHome: false,
            friends: true,
            history: false,
            setting: false,
        });
    }

    handleClickHistory = () => {
        this.setState({
            userHome: false,
            friends: false,
            history: true,
            setting: false,
        });
    }

    handleClickSetting = () => {
        this.setState({
            userHome: false,
            friends: false,
            history: false,
            setting: true,
        });
    }

    render() {
        const {userHome, friends, history, setting} = this.state;
        let contents;
        if (userHome && !friends && !history && !setting){
            contents = 
            <div>
                <div className="Person">
                    <div className="image"></div>
                    <div className="username">UserName</div>
                    <div className="description">This is a sample description</div>
                </div>
                <div className="postArea">
                </div>
            </div>
        } else if (!userHome && friends && !history && !setting){
            contents = <Friends/>
        } else if (!userHome && !friends && history && !setting){
            contents = <div>history</div>
        } else {
            contents = <Setting/>
        }
        return(
            <div>
                <Navbar />
                <div>
                    <div className="verticalBar">
                        <div onClick={this.handleClickUserHome} className="userHome">User Profile</div>
                        <div onClick={this.handleClickFriends} className="friends">Friends</div>
                        <div onClick={this.handleClickHistory} className="history">Visited History</div>
                        <div onClick={this.handleClickSetting} className="setting">Setting</div>
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