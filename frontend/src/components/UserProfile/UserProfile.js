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
        }
    }

    render() {
        return(
            <div>
                <Navbar />
                <div>
                    <div className="Person">
                        <div className="image"></div>
                        <div className="username">UserName</div>
                    </div>
                    <div className="postArea">This is a sample description</div>
                    <div className="address">Address: </div>
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