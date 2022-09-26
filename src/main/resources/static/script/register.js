!function (){
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
        postUserInfo(userEmail.value, userName.value, userPassword.value, verify.value);
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
        fetch(`http://localhost:8085/getSecurityCode/${email}`, {
            method:"POST",
            credentials:"include",
            body:null
        });
    }

    function postUserInfo(email, uname, upass, verify){
        let form = new FormData();
        form.append('username', uname);
        form.append('uemail', email);
        form.append('userpwd', upass);

        return  fetch(`http://localhost:8085/addUser?username=${uname}&usercode=${email}&userpwd=${upass}&securityCode=${verify}`, {
            method:"POST",
            credentials:"include",
            body:null
        }).then(r=>r.json())
            .then(json=>{
                console.log(json)
            });
    }
}();

