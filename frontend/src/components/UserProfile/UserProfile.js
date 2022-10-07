import React, { Component } from "react";
import './UserProfile.css'
import Navbar from '../../Navbar'
import ReactDOM from "react-dom/client";

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
        let test;
        if (userHome && !friends && !history && !setting){
            test = 
            <div>
                <div className="Person">
                    <div className="image"></div>
                    <div className="username"></div>
                    <div className="description"></div>
                </div>
                <div className="PostArea">
                    
                </div>
            </div>
        } else if (!userHome && friends && !history && !setting){
            test = <div>friends</div>
        } else if (!userHome && !friends && history && !setting){
            test = <div>history</div>
        } else {
            test = <div>setting</div>
        }
        return(
            <div>
                <Navbar />
                <div>
                    <div className="verticalBar">
                        <div onClick={this.handleClickUserHome} className="userHome">User Home</div>
                        <div onClick={this.handleClickFriends} className="friends">Friends</div>
                        <div onClick={this.handleClickHistory} className="history">Visited History</div>
                        <div onClick={this.handleClickSetting} className="setting">Setting</div>
                    </div>
                    <div className="contents">{test}
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