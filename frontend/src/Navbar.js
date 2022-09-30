import './navbar.css';
import testAvatar from './avatar.svg';
import './colour.css';
import React from "react";
import ReactDOM from "react-dom/client";
import Portal from "./Portal";

class Navbar extends React.Component {

    componentDidMount() {
        let userIcon = document.getElementsByClassName('nav-bar-right')[0].getElementsByClassName('nav-user-icon')[0];
        let navPopup = document.getElementsByClassName('nav-bar-right')[0].getElementsByClassName('nav-user-portal')[0];
        let userAvatar = document.getElementsByClassName('nav-bar-right')[0].getElementsByClassName('nav-user-icon')[0].getElementsByTagName('img')[0];
        let userName = document.getElementsByClassName('nav-bar-right')[0].getElementsByClassName('nav-user-portal')[0].getElementsByClassName('user-name')[0];
        let searchBar = document.getElementById('nav-search');
        let navPopupIn = false, iconIn = false;
        let searchField = document.getElementsByClassName('nav-bar-search');

        let courseInfo;

        const logoffA = document.createElement("a");

        let info = async function () {
            let info = await getCourseList(1, 1);
            courseInfo = await getCourseList(1, info['resultsSummary']['fullyMatching']);
        };
        info();

        for (let node of searchField) {
            node.getElementsByTagName('input')[0].addEventListener("keyup", () => {
                putResult(node.getElementsByTagName('input')[0].value, node.getElementsByClassName('search-panel')[0]);
            });
        }

// searchBar.addEventListener("keyup", ()=>{
//     console.log(searchBar.value);
//     putResult(searchBar.value);
// });
        function putResult(inputString, node) {
            node.innerHTML = '';

            if (inputString !== '') {
                let result = [];
                for (let i = 0; i < courseInfo['results'].length; i++) {
                    let obj = courseInfo['results'][i + ""];
                    if (obj['title'].toUpperCase().includes(inputString.toUpperCase()) || obj['uosCode'].toUpperCase().includes(inputString.toUpperCase()))
                        result.push(obj);
                    if (result.length === 10)
                        break;
                }
                for (let obj of result) {
                    let template = `<a class="course-item" href="./indxe.html">
                    <div>${obj['uosCode']}</div>
                    <div>${obj['title']}</div>
                </a>`;
                    node.innerHTML += template;
                }
            }
        }

        function getCourseList(start, size) {
            return fetch(`./requestClassList?startRank=${start}&rankSize=${size}`, {
                method: 'GET',
                credentials: 'omit',
                body: null
            }).then(r => r.json())
                .then(json => {
                    if (json['code'] === 0) {
                        return JSON.parse(json['data']);
                    }
                });
        }

        userIcon.addEventListener("mouseenter", () => {
            userIcon.classList.replace("icon-small", "icon-large");
            navPopup.style.display = "flex";
            setTimeout(() => {
                navPopup.style.opacity = "1";
            }, 100);
            iconIn = true;
        });
        userIcon.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!navPopupIn) {
                    iconIn = false;
                    userIcon.classList.replace("icon-large", "icon-small");
                    navPopup.style.opacity = "0";
                    setTimeout(() => {
                        navPopup.style.display = "none";
                    }, 200);
                }
            }, 100);
        });
        navPopup.addEventListener("mouseenter", () => {
            navPopupIn = true;
        });
        navPopup.addEventListener("mouseleave", () => {
            navPopupIn = false;
            //if(!iconIn){
            userIcon.classList.replace("icon-large", "icon-small");
            navPopup.style.opacity = "0";
            setTimeout(() => {
                navPopup.style.display = "none";
            }, 200);


        });

        let userPortal = document.getElementsByClassName('nav-user-portal')[0];
        console.log(typeof getCookie("UID")!=='undefined')
        if (typeof getCookie("UID")==='undefined'){
            userPortal.innerHTML = `<a>Login</a>`;
            userPortal.getElementsByTagName('a')[0].addEventListener('click', ()=>{
                const loginWindow = document.createElement('div');
                loginWindow.setAttribute('id', 'login-frame');
                const loginFrame = `<iframe src="./login.html"></iframe>`;
                loginWindow.innerHTML = loginFrame;
                const loginBg = document.createElement('div');
                loginBg.classList.add('login-bg');
                document.body.appendChild(loginBg);
                document.body.appendChild(loginWindow);
                loginBg.addEventListener('click', ()=>{
                    loginWindow.remove();
                    loginBg.remove();
                })
            });
        }else{
            fetch('./getUserInfo', {
                method:'GET',
                credentials:'include',
                body:null
            }).then(r=>r.json())
                .then(json=>{
                    if (json['code']===200){
                        userPortal.innerHTML = `<a className="user-name popup-item" style="margin-top: 25px; font-weight: bold">${json['object']['username']}</a>
                            <a className="user-home popup-item" style="margin-top: 5px">Home</a>
                            <a className="user-friends popup-item">Friends</a>
                            <a className="user-history popup-item">History</a>
                            <a className="user-setting popup-item">Setting</a>
                            <a className="user-setting popup-item" id="log-out">Log out</a>`;
                        const logout = document.getElementById('log-out');
                        logout.addEventListener('click', ()=>{
                            fetch('./logout', {
                                method:'POST',
                                credentials:"include",
                                body:null
                            }).then(r=>r.json())
                                .then(json=>{
                                    window.location.reload();
                                });
                        });
                    }
                });

        }

        function getUserInfo() {
            fetch(``, {
                method: "GET",
                credentials: "include",
                body: null
            }).then(r => r.json())
                .then(json => {
                    //name and icon and uid here.
                });
        }

        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
    }

    render() {
        return (
            <div className="nav-bar">
                <div className="nav-bar-left">
                    <a className="logo" href='./index.html'>
                        TodayUsyd
                    </a>
                </div>
                <div className="nav-bar-search">
                    <div className="nav-search-container">
                        <form className="search-form">
                            <div className="search-form-input">
                                <input type="text" maxLength="60" placeholder="Search" id="nav-search"/>
                            </div>
                            <div className="search-form-btn">
                                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="8" cy="8" r="5"
                                            style={{stroke: "#aaa", strokeWidth: "2", fill: "none"}}></circle>
                                    <line x1="11.5" y1="11.5" x2="15" y2="15"
                                          style={{stroke: "#aaa", strokeWidth: "2"}}></line>
                                </svg>
                            </div>
                        </form>
                        <div className="search-panel" id="search-panel">
                        </div>
                    </div>
                </div>
                <div className="nav-bar-right">
                    <div className="nav-user">
                        <div className="nav-user-icon icon-small">
                            <a href="./userprofile" target="_blank">
                                <img src={testAvatar}/>
                            </a>
                        </div>
                        <div className="nav-user-portal">
                            <a href="./userprofile" className="user-name popup-item" style={{marginTop: "25px", fontWeight: "bold"}}>test UN</a>
                            <a href="./" className="user-home popup-item" style={{marginTop: "5px"}}>Home</a>
                            <a href="./friends" className="user-friends popup-item">Friends</a>
                            <a href="./history" className="user-history popup-item">History</a>
                            <a href="./setting" className="user-setting popup-item">Setting</a>
                            <a href="./logout" className="user-setting popup-item">Log out</a>
                        </div>
                    </div>
                    <div className="nav-notification">Message</div>
                    <div></div>
                </div>
            </div>
        );
    }
}

export default Navbar;