import './friends.css'
import './colour.css'
import React from "react";
import Navbar from "./Navbar";
import ReactDOM from "react-dom/client";
import avatar from './avatar.svg'


class Friends extends React.Component{
    componentDidMount() {
        const host = document.getElementById('friend-host');
        fetch('',{
            method:"GET",
            credentials:"include",
            body:null
        }).then(r=>r.json())
            .then(json=>{
                if (json['code']===200){
                    //render item here.
                }
            })
        for (let i = 0; i < 10; i++) {
            host.innerHTML+=this.renderListItem(i,'s');
        }
    }

    renderListItem(name, verify){
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