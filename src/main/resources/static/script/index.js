!function(){
    console.log(document.body.scrollTop)
    if(document.body.scrollTop===0){
        document.getElementsByClassName('nav-bar-search')[0].style.opacity = '0';
        document.getElementById('nav-search').setAttribute("disabled", 'true');
    }
}();