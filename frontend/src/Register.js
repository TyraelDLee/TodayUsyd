import React from "react";
import './register.css';
import './colour.css';
import ReactDOM from "react-dom/client";
import Navbar from "./Navbar";

class Register extends React.Component{
    componentDidMount() {
        let userName = document.getElementById('set-name');
        let userEmail = document.getElementById('set-email');
        let userPassword = document.getElementById('set-password');
        let userCPassword = document.getElementById('set-confirm-password');
        let getVerify = document.getElementById('getVerify');
        let verify = document.getElementById('verify');
        let create = document.getElementById('post');

        userName.addEventListener('input', (e)=>{
            inputEvent(e);
        });
        userName.addEventListener('blur', (e)=>{
            blurEvent(e, e.target.value === '');
        }, true);

        userEmail.addEventListener('input', (e)=>{
            inputEvent(e);
        });
        userEmail.addEventListener('blur', (e)=>{
            blurEvent(e, e.target.value === '');
        });

        verify.addEventListener('input', (e)=>{
            inputEvent(e);
        });
        verify.addEventListener('blur', (e)=>{
            blurEvent(e, e.target.value === '');
        });

        getVerify.addEventListener('click', (e)=>{
            requestVerify(userEmail.value);
        });

        userPassword.addEventListener('input', (e)=>{
            inputEvent(e);
            let valid = e.target.value !== '' && userCPassword.value !== userPassword.value;
            valid?userCPassword.setAttribute('style', 'border-color: var(--stress_red);'):userCPassword.removeAttribute('style');
        });
        userPassword.addEventListener('blur', (e)=>{
            if (validPass(e.target.value)){
                e.target.parentElement.parentElement.getElementsByClassName('cul-item-head')[0].removeAttribute('style');
            }else{
                e.target.parentElement.parentElement.getElementsByClassName('cul-item-head')[0].setAttribute('style', 'color: var(--stress_red);');
            }
            blurEvent(e, !validPass(e.target.value));
        });

        userCPassword.addEventListener('input', (e)=>{
            inputEvent(e);
            let valid = e.target.value === '' || userPassword.value !== userCPassword.value;
            if (userPassword.getAttribute('style') === ''|| validPass(e.target.value)){
                valid?userPassword.setAttribute('style', 'border-color: var(--stress_red);'):userPassword.removeAttribute('style');
            }
        });
        userCPassword.addEventListener('blur', (e)=>{
            let valid = e.target.value === '' || userPassword.value !== userCPassword.value;
            blurEvent(e, valid);
        });

        create.addEventListener('click', (e)=>{
            if (userPassword.value.length > 0 && userName.value.length > 0 && userPassword.value.length > 0 && verify.value.length > 0)
                postUserInfo(userEmail.value, userName.value, userPassword.value, verify.value).then(code=>{
                    if (code===200){
                        fetch(`./authSecurityCode/${verify.value}`, {
                            method:'GET',
                            credentials:'include',
                            body:null
                        }).then(r=>r.json())
                            .then(json=>{
                                if (json['code']===1){
                                    window.location.href = './';
                                }
                            })
                    }
                });
        });

        function inputEvent(e){
            if (e.target.value !== ''){
                e.target.parentElement.getElementsByTagName('span')[0].classList.replace('cul-item-placeholder','cul-item-placeholder-fixed');
            }else{
                e.target.parentElement.getElementsByTagName('span')[0].classList.replace('cul-item-placeholder-fixed','cul-item-placeholder');
            }
        }

        function validPass(pass){
            return checkChar(pass) && checkNumber(pass) && pass.length>7 && pass.length<16;
        }
        function checkChar(pass){
            let char = 'qwertyuioplkjhgfdsazxcvbnm';
            for (let i = 0; i < pass.length; i++) {
                if (char.includes(pass.charAt(i)))
                    return true;
            }
        }

        function checkNumber(pass) {
            let num = '0123456789';
            for (let i = 0; i < pass.length; i++) {
                if (num.includes(pass.charAt(i)))
                    return true;
            }
            return false;
        }
        function blurEvent(e, condition){
            if (condition)
                e.target.setAttribute('style', 'border-color: var(--stress_red);');
            else
                e.target.setAttribute('style', '');
        }

        function requestVerify(email){
            fetch(`./getSecurityCode/${email}`, {
                method:"POST",
                credentials:"include",
                body:null
            }).then(r=>r.json())
                .then(json=>{
                    if (json['code']===200){
                        let timers = setInterval(timer, 1000);
                        let time = 60;
                        getVerify.classList.add('button-disabled');
                        getVerify.setAttribute('disabled','');
                        function timer(){
                            getVerify.innerText = `Retry in ${time}s`;
                            if (time === 0) {
                                getVerify.innerText = `Get Verification Code`;
                                getVerify.classList.remove('button-disabled');
                                getVerify.removeAttribute('disabled');
                                clearInterval(timers);
                            }
                            time--;
                        }
                    }
                });
        }



        function postUserInfo(email, uname, upass, verify){
            return  fetch(`./addUser?username=${uname}&usercode=${email}&userpwd=${upass}&securityCode=${verify}`, {
                method:"POST",
                credentials:"include",
                body:null
            }).then(r=>r.json())
                .then(json=>{
                    if(json['code'] === 200){
                        return 200;
                    }
                }).catch(e=>{
                    return 400;
                });
        }
    }

    render() {
        return(
            <main>
                <div className="user-info-cul">
                    <div className="cul-item">
                        <div className="cul-item-head-container">
                            <div className="cul-item-head"></div>
                        </div>
                        <div className="cul-item-input">
                            <input id="set-name"/>
                                <span className="cul-item-placeholder">User name</span>
                        </div>
                    </div>
                </div>
                <div className="user-info-cul">
                    <div className="cul-item">
                        <div className="cul-item-head-container">
                            <div className="cul-item-head">You will need your email address to login</div>
                        </div>

                        <div className="cul-item-input">
                            <input id="set-email"/>
                                <span className="cul-item-placeholder">E-mail address</span>
                        </div>
                    </div>
                </div>
                <div className="user-info-cul">
                    <div className="cul-item">
                        <div className="cul-item-input">
                            <input id="verify"/>
                                <span className="cul-item-placeholder">Verification Code</span>
                        </div>
                    </div>
                    <div className="cul-item">
                        <div className="cul-item-input">
                            <button type="button" id="getVerify">Get Verification Code</button>
                        </div>
                    </div>
                </div>
                <div className="item-space"></div>
                <div className="user-info-cul">
                    <div className="cul-item">
                        <div className="cul-item-head-container">
                            <div className="cul-item-head">You password must be 8 - 16 characters long and at least one
                                number.
                            </div>
                        </div>
                        <div className="cul-item-input">
                            <input type="password" id="set-password"/>
                                <span className="cul-item-placeholder">Password</span>
                        </div>
                    </div>
                </div>
                <div className="user-info-cul">
                    <div className="cul-item">
                        <div className="cul-item-input">
                            <input type="password" id="set-confirm-password"/>
                                <span className="cul-item-placeholder">Confirm Password</span>
                        </div>
                    </div>
                </div>
                <div className="user-info-cul">
                    <div className="cul-item">
                        <div className="cul-item-input">
                            <button type="button" id="post">Create Account</button>
                        </div>
                    </div>
                </div>

            </main>
        );
    }
}


const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
root.render(
    <React.StrictMode>
        <Navbar />
        <Register />
    </React.StrictMode>
);