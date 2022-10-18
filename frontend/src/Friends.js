import './friends.css'
import './colour.css'
import React from "react";
import Navbar from "./Navbar";
import ReactDOM from "react-dom/client";
import avatar from './avatar.svg'


class Friends extends React.Component{
    componentDidMount() {
        const host = document.getElementById('friend-host');
        fetch(`./Post/findTakeuser?userid=${getCookie('UID')}`,{
            method:"GET",
            credentials:"include",
            body:null
        }).then(r=>r.json())
            .then(json=>{
                if (json['code']===200){
                    for (const jsonElement of json['object']) {
                        if (jsonElement !== null && typeof jsonElement !== 'undefined')
                            getUserInfo(jsonElement['takeuserid']);
                    }
                }
            })

        function getUserInfo(uid){
            fetch(`./getUserInfoByID?uid=${uid}`,{
                method:"GET",
                credentials:"include",
                body:null
            }).then(r=>r.json())
                .then(json=>{
                    if (json['code']===200){
                        host.innerHTML += renderListItem(json['object']['username'],
                            json['object']['labeldesc']===1?'Verified Usyd Student':(json['object']['labeldesc']===2?'Verified Usyd Staff':''));
                        //console.log(json['data']);
                    }
                })
        }

        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        function renderListItem(name, verify){
            return `
        <div class="user-info-host">
                <div class="user-info">
                    <a target="_blank" class="avatar">
                        <img src=${avatar}/></a>
                    <div class="user-name">
                        <a target="_blank">${name}</a><span
                        class="verify-text">${verify}</span>
                    </div>
                </div>
            </div>`;
        }
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

// import './friends.css'
// import './colour.css'
// import React from "react";
// import Navbar from "./Navbar";
// import ReactDOM from "react-dom/client";
// import avatar from './avatar.svg'
// import Cookies from 'js-cookie';
// import axios from 'axios';
//
// class Friends extends React.Component{
//     componentDidMount() {
//         const host = document.getElementById('friend-host');
//
//         var formData = new FormData();
//         const userID = Cookies.get('UID');
//         formData.append("userid", userID);
//
//         axios.get('./Post/findTakeuser', formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//         }).then((response) => {
//             if (response.data.code === 200){
//                 let takelist = response.data.object.map((takeuser) => {
//                     var formData2 = new FormData();
//                     formData2.append("userid", takeuser.takeuserid);
//
//                     axios.get('./Post/findUserByTake', formData2, {
//                         headers: {
//                           "Content-Type": "multipart/form-data",
//                         },
//                     }).then((response) => {
//                         if (response.data.code === 200){
//                             response.data.object.map((user) => {
//                                 if (user.userid === userID){
//                                     host.innerHTML+=this.renderListItem(user.takeuserid);
//                                 }
//                             })
//                         }
//                     })
//                 })
//             } else {
//                 console.log("failed");
//             }
//         })
//     }
//
//     renderListItem(name){
//         return `
//         <div class="user-info-host">
//                 <div class="user-info">
//                     <a target="_blank" class="avatar">
//                         <img src=${avatar}/></a>
//                     <div class="user-name">
//                         <a target="_blank">${name}</a><span
//                     </div>
//                 </div>
//             </div>`;
//     }
//
//     render() {
//         return(
//             <div>
//                 <Navbar/>
//                 <main id={"friend-host"}>
//                     <div className={'title'}>Friends</div>
//                 </main>
//             </div>
//         );
//     }
// }
//
// const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
// root.render(
//     <React.StrictMode>
//         <Friends/>
//     </React.StrictMode>
// );