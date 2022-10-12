import './colour.css'
import './dynamic.css'
import React from "react";
import Navbar from "./Navbar";
import Item from "./components/SearchItem/Item";
import ReactDOM from "react-dom/client";

class Dynamic extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            dynamic:[]
        }
    }

    render() {
        return(
            <main>

            </main>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
root.render(
    <React.StrictMode>
        <Navbar/>
        <Dynamic/>
    </React.StrictMode>
);