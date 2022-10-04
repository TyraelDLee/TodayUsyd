import React from "react";
import './colour.css'
import './login.css'
import ReactDOM from "react-dom/client";

class Login extends React.Component{
    componentDidMount() {
        let login = document.getElementById('login');
        let reg = document.getElementById('register');

        login.addEventListener('click', (e)=>{
            let email = document.getElementById('email-input').value;
            let pass = document.getElementById('pass-input').value;
            if (email!==''&&pass!==''){
                post(email, pass);
            }
        });

        reg.addEventListener('click', (e)=>{
            window.top.location.href= "./register.html";
        });

        function post(email, passw){
            return fetch(`./queryUserLogin?userCode=${email}&userPwd=${passw}`,{
                method:"POST",
                credentials:"include",
                body:null
            }).then(r=>r.json())
                .then(json=>{
                    if (json['code']===200)
                        window.top.location.reload();
                })
        }
    }

    render() {
        return(
            <main>
                <div className="header">Log in</div>
                <div className="input-area">
                    <div className="login-info">
                        <span>E-mail</span>
                        <input placeholder="example@example.com" id="email-input"/>
                    </div>
                    <div className="login-info">
                        <span>Password</span>
                        <input type="password" placeholder="Password" id="pass-input"/>
                    </div>
                </div>
                <div className="button-area">
                    <button id="register">Register</button>
                    <button id="login">Login</button>
                </div>
            </main>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
root.render(
    <React.StrictMode>
        <Login/>
    </React.StrictMode>
);