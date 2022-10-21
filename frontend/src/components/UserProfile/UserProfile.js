import React, { Component } from "react";
import './UserProfile.css'
import Navbar from '../../Navbar'
import ReactDOM from "react-dom/client";
import avatar from "./../../avatar.svg";
import axios from 'axios';
import Cookies from 'js-cookie';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: null,
            username: null,
            userdescription: "",
            useraddress: "",
            userPhoto: null,
        }
    }

    componentDidMount(){
        axios.get(`./getUserInfo`, { withCredentials: true })
        .then((response) => {
            if (response.data.code === 200){
                this.setState({
                    username: response.data.object.username,
                    login: true,
                });
            } else {
                this.setState({
                    login: false,
                });
            }
        })

        axios.get(`/userProfile/home/index?userid=${Cookies.get('UID')}`)
        .then((response) => {
            if (response.data.code === 200){
                let description, address;
                if (response.data.object.description === "null"){
                    description = "";
                } else {
                    description = response.data.object.description;
                }
                if (response.data.object.address === "null"){
                    address = "";
                } else {
                    address = response.data.object.address;
                }
                this.setState({
                    userdescription: description,
                    useraddress: address,
                    userPhoto: response.data.object.imgurl,
                });
            }
        })
    }

    render() {
        const { username, userdescription, useraddress, userPhoto, login } = this.state;
        return(
            <div>
                <Navbar />
                {
                    login === null ? <div></div> : login ?
                    <div>
                        <div className="Person">
                            {userPhoto === null? <img className="image" src={avatar}/> :<img className="image" src={`./userProfile/setting/showImg?userid=${Cookies.get('UID')}`}/> }
                            <div className="username">{username}</div>
                        </div>
                        <div className="postArea">{userdescription}</div>
                        <div className="address">Address: {useraddress}</div>
                    </div> :
                    <div className="login">You have not logged in</div>
                }
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