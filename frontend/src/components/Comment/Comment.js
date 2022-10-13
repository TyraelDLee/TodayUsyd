import React, { Component } from "react";
import './Comment.css'
import Navbar from '../../Navbar'
import ReactDOM from "react-dom/client";

class Comment extends Component {
    constructor(props){
        super(props);
        this.state = {
            postid: null,
        }
    }

    render() {
        const { text } = this.props;
        console.log(this.props);
        return(
            <div>
                <Navbar />
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
root.render(
    <React.StrictMode>
        <Comment/>
    </React.StrictMode>
);

export default Comment;