import React, { Component } from "react";
import './Course.css'
import Navbar from '../../Navbar'
import ReactDOM from "react-dom/client";
import Button from 'react-bootstrap/Button';
import Post from './../Post/Post';

class Course extends Component {

    constructor(props){
        super(props);
        this.state = {
            showPost: false,
        }
    }

    onClickOpenPost = () => {
        this.setState({
            showPost: true,
        }); 
    }

    onClickCancelPost = () => {
        this.setState({
            showPost: false,
        }); 
    }

    render() {
        return(
            <div>
                <Navbar />
                <div className="CoursePost">
                    {this.state.showPost ?
                        <div>
                            <Button onClick={this.onClickCancelPost} className="button">Cancel</Button>
                            <Post type="course"/>
                        </div> :
                        <Button onClick={this.onClickOpenPost} className="button">Add</Button>
                    }
                    <div className="post">

                    </div>
                </div>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
root.render(
    <React.StrictMode>
        <Course/>
    </React.StrictMode>
);


export default Course;