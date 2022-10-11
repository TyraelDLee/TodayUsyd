import './colour.css'
import './search.css'
import Navbar from "./Navbar";
import Item from "./components/SearchItem/Item";
import React from "react";
import ReactDOM from "react-dom/client";

class Search extends React.Component{

    constructor(props) {
        super(props);
        this.posts = [];
    }

    componentDidMount() {
        fetch(`./Post/findPostByTitle?title=${new URLSearchParams(window.location["search"]).get("keyword")}`, {
            method:"GET",
            credentials:"include",
            body:null
        }).then(r=>r.json())
            .then(json=>{
               if (json['code']===200){
               }
            })
    }

    render() {
        return(
            <main>
                <Navbar/>
                <div className={'search-host'}>

                </div>
            </main>
        );
    }
}


const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
root.render(
    <React.StrictMode>
        <Search/>
    </React.StrictMode>
);