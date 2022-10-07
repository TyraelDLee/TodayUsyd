import React, { Component } from "react";
import './Market.css'
import './../../colour.css'
import Navbar from '../../Navbar'
import ReactDOM from "react-dom/client";
import Button from 'react-bootstrap/Button';
import Post from './../Post/Post';

class Market extends Component {
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
                <div className="MarketPost">
                    {this.state.showPost ?
                        <div>
                            <Button onClick={this.onClickCancelPost} className="button">Cancel</Button>
                            <Post type="market"/>
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
        <Market/>
    </React.StrictMode>
);

export default Market