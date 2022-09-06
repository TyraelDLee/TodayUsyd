!function (){
    let userIcon = document.getElementsByClassName('nav-bar-right')[0].getElementsByClassName('nav-user-icon')[0];
    let navPopup = document.getElementsByClassName('nav-bar-right')[0].getElementsByClassName('nav-user-portal')[0];
    let userAvatar = document.getElementsByClassName('nav-bar-right')[0].getElementsByClassName('nav-user-icon')[0].getElementsByTagName('img')[0];
    let userName = document.getElementsByClassName('nav-bar-right')[0].getElementsByClassName('nav-user-portal')[0].getElementsByClassName('user-name')[0];
    let searchBar = document.getElementById('nav-search');
    let navPopupIn = false, iconIn = false;
    let searchField = document.getElementsByClassName('nav-bar-search');

    let courseInfo;

    !async function (){
        let info = await getCourseList(1,1);
        courseInfo = await getCourseList(1, info['resultsSummary']['fullyMatching']);
    }();

    for (let node of searchField){
        node.getElementsByTagName('input')[0].addEventListener("keyup", ()=>{
            putResult(node.getElementsByTagName('input')[0].value, node.getElementsByClassName('search-panel')[0]);
        });
    }

    // searchBar.addEventListener("keyup", ()=>{
    //     console.log(searchBar.value);
    //     putResult(searchBar.value);
    // });
    function putResult(inputString, node){
        node.innerHTML='';

        if (inputString!==''){
            let result = [];
            for (let i = 0; i < courseInfo['results'].length; i++) {
                let obj = courseInfo['results'][i+""];
                if (obj['title'].toUpperCase().includes(inputString.toUpperCase())||obj['uosCode'].toUpperCase().includes(inputString.toUpperCase()))
                    result.push(obj);
                if (result.length===10)
                    break;
            }
            for (let obj of result){
                let template = `<a class="course-item" href="http://localhost:8080/">
                    <div>${obj['uosCode']}</div>
                    <div>${obj['title']}</div>
                </a>`;
                node.innerHTML+=template;
            }
        }
    }

    function getCourseList(start, size){
        return fetch(`http://localhost:8080/requestClassList?startRank=${start}&rankSize=${size}`, {
            method:'GET',
            credentials:'omit',
            body:null
        }).then(r=>r.json())
            .then(json=>{
                if (json['code']===0){
                    return JSON.parse(json['data']);
                }
            });
    }

    userIcon.addEventListener("mouseenter", ()=>{
        userIcon.classList.replace("icon-small", "icon-large");
        navPopup.style.display = "flex";
        setTimeout(()=>{
            navPopup.style.opacity="1";
        }, 100);
        iconIn = true;
    });
    userIcon.addEventListener("mouseleave", ()=>{
        setTimeout(()=>{
            if(!navPopupIn){
                iconIn = false;
                userIcon.classList.replace("icon-large", "icon-small");
                navPopup.style.opacity="0";
                setTimeout(()=>{
                    navPopup.style.display = "none";
                }, 200);
            }
        },100);
    });
    navPopup.addEventListener("mouseenter", ()=>{
        navPopupIn=true;
    });
    navPopup.addEventListener("mouseleave", ()=>{
        navPopupIn=false;
        //if(!iconIn){
            userIcon.classList.replace("icon-large", "icon-small");
            navPopup.style.opacity="0";
            setTimeout(()=>{
                navPopup.style.display = "none";
            }, 200);


    });

    function getUserInfo(){
        fetch(``,{
            method:"GET",
            credentials:"include",
            body:null
        }).then(r=>r.json())
            .then(json=>{
            //name and icon and uid here.
            });
    }
}();