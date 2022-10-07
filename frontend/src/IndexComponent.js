import './navbar.css';
import './index.css';
import './colour.css';
import React from "react";

class IndexComponent extends React.Component{

    constructor(p) {
        super(p);
        this.courseSize = React.createRef();
        this.marketSize = React.createRef();
        this.findSize();
    }

    onClickMarket = () => {
        window.location.href = "./market.html"
    }

    onClickCourse = () => {
        window.location.href = "./course.html"
    }

    componentDidMount() {
        if(document.body.scrollTop===0){
            document.getElementsByClassName('nav-bar-search')[0].style.opacity = '0';
            document.getElementById('nav-search').setAttribute("disabled", 'true');
        }
        window.addEventListener("resize", ()=>{
            this.findSize();
        });
    }

    findSize(){
        if (window.innerHeight > window.innerWidth){
            try{
                this.courseSize.current.style.width =  window.innerWidth / 3 + "px";
                this.courseSize.current.style.height =  window.innerWidth / 3 + "px";
                this.marketSize.current.style.width =  window.innerWidth / 3 + "px";
                this.marketSize.current.style.height =  window.innerWidth / 3 + "px";
            }catch (e){}

            this.size = window.innerWidth / 3 + "px";
        }
        else{
            try{
                this.courseSize.current.style.width = window.innerHeight / 3 + "px";
                this.courseSize.current.style.height = window.innerHeight / 3 + "px";
                this.marketSize.current.style.width =  window.innerHeight / 3 + "px";
                this.marketSize.current.style.height =  window.innerHeight / 3 + "px";
            }catch (e) {}

            this.size = window.innerHeight / 3 + "px";
        }
    }

    render() {
        return(
            <main>
                <section style={{marginTop: "200px"}}>
                    <div className="nav-bar-search">
                        <div className="nav-search-container">
                            <form className="search-form">
                                <div className="search-form-input">
                                    <input type="text" maxLength="60" placeholder="Search"/>
                                </div>
                                <div className="search-form-btn">
                                    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="5" style={{stroke:"#aaa", strokeWidth:"2", fill: "none"}}></circle>
                                        <line x1="11.5" y1="11.5" x2="15" y2="15" style={{stroke:"#aaa", strokeWidth:"2"}}></line>
                                    </svg>
                                </div>
                            </form>
                            <div className="search-panel">
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="main-entry">
                        <div onClick={this.onClickCourse} className="main-entry-item" style={{width: `${this.size}`, height: `${this.size}`}} ref={this.courseSize}>
                            Course
                        </div>
                        <div onClick={this.onClickMarket} className="main-entry-item" style={{width: `${this.size}`, height: `${this.size}`}} ref={this.marketSize}>
                            Market
                        </div>
                    </div>
                </section>
                <section>
                </section>
            </main>
        );
    }


}

export default IndexComponent;