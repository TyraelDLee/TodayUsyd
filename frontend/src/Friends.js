import './friends.css'
import './colour.css'
import React from "react";
import Navbar from "./Navbar";
import ReactDOM from "react-dom/client";
import avatar from './avatar.svg'
import Cookies from 'js-cookie';
import axios from 'axios';

class Friends extends React.Component{
    componentDidMount() {
        const host = document.getElementById('friend-host');

        var formData = new FormData();
        const userID = Cookies.get('UID');
        formData.append("userid", userID);

        axios.get('./Post/findTakeuser', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            if (response.data.code === 200){
                let takelist = response.data.object.map((takeuser) => {
                    var formData2 = new FormData();
                    formData2.append("userid", takeuser.takeuserid);

                    axios.get('./Post/findUserByTake', formData2, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                    }).then((response) => {
                        if (response.data.code === 200){
                            response.data.object.map((user) => {
                                if (user.userid === userID){
                                    host.innerHTML+=this.renderListItem(user.takeuserid);
                                }
                            })
                        }
                    })
                }) 
            } else {
                console.log("failed");
            }
        })
    }

    renderListItem(name, verify){
        return `
        <div class="user-info-host">
                <div class="user-info">
                    <a target="_blank" class="avatar">
                        <img src=${avatar}/></a>
                    <div class="user-name">
                        <a target="_blank">${name}</a><span
                    </div>
                </div>
            </div>`;
    }

    render() {
        return(
            <div>
                <Navbar/>
                <main id={"friend-host"}>
                    <div className={'title'}>Friends</div>
                </main>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
root.render(
    <React.StrictMode>
        <Friends/>
    </React.StrictMode>
);