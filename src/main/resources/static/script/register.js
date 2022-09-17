!function (){
    // function Test(){
    //     return <h1>Test</h1>
    // }
    //
    // ReactDom.render(<h1>test</h1>, document.getElementsByTagName('body')[0]);

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

    getVerify.addEventListener('click', (e)=>{
        requestVerify(userEmail.value);
    })

    userPassword.addEventListener('input', (e)=>{
        inputEvent(e);
    });
    userPassword.addEventListener('blur', (e)=>{
        blurEvent(e, e.target.value.length > 7 && e.target.value.length < 16);
    });

    userCPassword.addEventListener('input', (e)=>{
        inputEvent(e);
    });
    userCPassword.addEventListener('blur', (e)=>{
        blurEvent(e, e.target.value === '' || userPassword.value !== userCPassword.value);
    });

    create.addEventListener('click', (e)=>{
        postUserInfo(userEmail.value, userName.value, userPassword.value);
    });

    function inputEvent(e){
        if (e.target.value !== ''){
            e.target.parentElement.getElementsByTagName('span')[0].classList.replace('cul-item-placeholder','cul-item-placeholder-fixed');
        }else{
            e.target.parentElement.getElementsByTagName('span')[0].classList.replace('cul-item-placeholder-fixed','cul-item-placeholder');
        }
    }

    // function checkPassword(pass){
    //     let char = 'qwertyuioplkjhgfdsazxcvbnm';
    //     let num = '0123456789';
    //     for (let i = 0; i < pass.length; i++) {
    //         if (num.in)
    //     }
    // }

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

    function postUserInfo(email, uname, upass){
        return  fetch(`http://localhost:8085/addUser?username=${uname}&usercode=${email}&userpwd=${upass}`, {
            method:"POST",
            credentials:"include",
            body:null
        }).then(r=>r.json())
            .then(json=>{
                console.log(json)
            });
    }
}();

