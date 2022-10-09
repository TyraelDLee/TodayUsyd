import React, { Component } from "react";
import './Friends.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';

class Friends extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: "",
        }
    }

    handleClickSendMessage = () => {
        
    }

    render() {
        return(
            <div>
                <div className="friendsBar">
                    <div className="friend">
                        <div className="friendImage"></div>
                        <div className="friendName">Friend 1</div>
                    </div>
                    <div className="friend">
                        <div className="friendImage"></div>
                        <div className="friendName">Friend 2</div>
                    </div>
                    <div className="friend">
                        <div className="friendImage"></div>
                        <div className="friendName">Friend 3</div>
                    </div>
                    <div className="friend">
                        <div className="friendImage"></div>
                        <div className="friendName">Friend 4</div>
                    </div>
                </div>
                <div className="dialogueBar">
                    
                </div>
                <div className="messageBar">
                    <Form.Control as="textarea" cols={120} rows={4} className="FriendText" size="lg" onChange={this.handleChange}/>
                    <Button variant="outline-dark" className="sendButton" onClick={this.handleClickSendMessage}>Send</Button>
                </div>
            </div>
        );
    }
}

export default Friends;