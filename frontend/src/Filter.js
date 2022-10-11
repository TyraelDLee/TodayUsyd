import './filter.css'
import './colour.css'
import React from "react";

class Filter extends React.Component{
    componentDidMount() {
        let selectedCourse = '', selectedCode='';

        new MutationObserver(()=>{
            selectedCourse = new URLSearchParams(window.location["search"]).get("category");
            selectedCode = new URLSearchParams(window.location["search"]).get("course");
            if (typeof selectedCourse === 'undefined' || selectedCourse === null)
                selectedCourse = '';
            if (typeof selectedCode === 'undefined' || selectedCode === null)
                selectedCode = '';
        }).observe(document, {subtree: true, childList: true});

        async function loadClassList(){
            let size = await getCourseList(1,12);
            console.log( size['resultsSummary']['fullyMatching']);
            let courseList = await getCourseList(1, size['resultsSummary']['fullyMatching']);
            getCourseCode(courseList);
        }

        loadClassList();

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

        function getCourseCode(courseList){
            let course = {}
            for (let i = 0; i < courseList['results'].length; i++) {
                if (!course.hasOwnProperty(courseList['results'][i+""]['uosCode'].substring(0,4))){
                    course[courseList['results'][i+""]['uosCode'].substring(0,4)] = [];
                }
                if (!course[courseList['results'][i+""]['uosCode'].substring(0,4)].includes(courseList['results'][i+""]['uosCode']))
                    course[courseList['results'][i+""]['uosCode'].substring(0,4)].push(courseList['results'][i+""]['uosCode']);
            }
            document.getElementsByClassName('filter-loading')[0].setAttribute('style', 'display: none;');
            renderArea(course);
        }

        function renderArea(courses){
            document.getElementsByClassName('area')[0].removeAttribute('style');
            for(let area in courses){
                let areaNode = document.createElement('div');
                areaNode.classList.add('area-item');
                areaNode.innerText = area;
                areaNode.addEventListener('click', (e)=>{
                    for (let node of document.getElementsByClassName('area-item')){
                        node.classList.remove('area-item-select');
                    }
                    areaNode.classList.add('area-item-select');
                    window.history.pushState(null,null,window.location['pathname']+`?category=${area}`);
                    renderCode(courses[area]);
                });
                if (areaNode.innerText === selectedCourse)
                    areaNode.classList.add('area-item-select');

                document.getElementsByClassName('area')[0].appendChild(areaNode);
            }
            //document.getElementsByClassName('area-item')[0].classList.add('area-item-select');
            renderCode(selectedCourse===''?courses[document.getElementsByClassName('area-item')[0].innerText]:courses[selectedCourse]);
        }

        function renderCode(area){
            document.getElementsByClassName('code')[0].removeAttribute('style');
            document.getElementsByClassName('code')[0].innerHTML="";
            for(let code of area){
                let codeNode = document.createElement('div');
                codeNode.classList.add('code-item');
                codeNode.innerText = code;
                codeNode.addEventListener('click', (e)=>{
                    for (let node of document.getElementsByClassName('code-item')){
                        node.classList.remove('code-item-select');
                        window.history.pushState(null,null,window.location.href.replace(`&course=${node.innerText}`,''));
                    }
                    if (codeNode.classList.contains('code-item-select')) {
                        codeNode.classList.remove('code-item-select');
                    }
                    else {
                        codeNode.classList.add('code-item-select');
                        //update here.
                        window.history.pushState(null,null,window.location.href+`&course=${code}`);
                    }
                });
                if (codeNode.innerText===selectedCode)
                    codeNode.classList.add('code-item-select');
                document.getElementsByClassName('code')[0].appendChild(codeNode);
            }
        }
    }

    render() {
        return(
            <div className="filter-host">
                <div className="filter">
                    <div className="filter-loading">Loading...</div>
                    <div className="area" style={{display:'none'}}>

                    </div>
                    <div className="code" style={{display:'none'}}>

                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;