!function(){

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
        window.location.href= "./register.html";
    });

    function post(email, passw){
        return fetch(`./queryUserLogin?userCode=${email}&userPwd=${passw}`,{
            method:"POST",
            credentials:"include",
            body:null
        }).then(r=>r.json())
            .then(json=>{

            })
    }
}();