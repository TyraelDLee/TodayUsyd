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

    userName.addEventListener('input', (e)=>{
        inputEvent(e);
    });
    userName.addEventListener('blur', (e)=>{
        blurEvent(e);
    }, true);

    userEmail.addEventListener('input', (e)=>{
        inputEvent(e);
    });
    userEmail.addEventListener('blur', (e)=>{
        blurEvent(e);
    });

    userPassword.addEventListener('input', (e)=>{
        inputEvent(e);
    });
    userPassword.addEventListener('blur', (e)=>{
        blurEvent(e);
    });

    userCPassword.addEventListener('input', (e)=>{
        inputEvent(e);
    });
    userCPassword.addEventListener('blur', (e)=>{
        blurEvent(e);
    });

    function inputEvent(e){
        if (e.target.value !== ''){
            e.target.parentElement.getElementsByTagName('span')[0].classList.replace('cul-item-placeholder','cul-item-placeholder-fixed');
        }else{
            e.target.parentElement.getElementsByTagName('span')[0].classList.replace('cul-item-placeholder-fixed','cul-item-placeholder');
        }
    }

    function blurEvent(e){
        if (e.target.value==='')
            e.target.setAttribute('style', 'border-color: var(--stress_red);');
        else
            e.target.setAttribute('style', '');
    }
}();

