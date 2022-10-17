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
            username: null,
            userdescription: "",
            useraddress: "",
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

        axios.get(`/userProfile/home/index?userid=${Cookies.get('UID')}`)
        .then((response) => {
            console.log(response.data);
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
                });
            }
        })
    }

    render() {
        const { username, userdescription, useraddress } = this.state;
        return(
            <div>
                <Navbar />
                <div>
                    <div className="Person">
                        <img className="image" src={avatar}/>
                        <div className="username">{username}</div>
                    </div>
                    <div className="postArea">{userdescription}</div>
                    <div className="address">Address: {useraddress}</div>
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