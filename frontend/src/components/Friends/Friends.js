import React, { Component } from "react";
import './Friends.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Item from './../SearchItem/Item';
import avatar from './../../avatar.svg';

class Friends extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: "",
        }
    }

    componentDidMount(){
        var element = document.getElementById("dialogueBar");
        element.scrollTop = element.scrollHeight;
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
                <div id="dialogueBar" className="dialogueBar">
                    <div className="topspace"></div>
                    <div className="block">
                        <div className="dialogueReceiveImage">
                        </div>
                        <Alert className="dialogueReceiveMessage" variant="secondary">
                            Sample Receive Message Sample
                        </Alert>
                    </div>
                    <div className="block">
                        <div className="dialogueSendImage">
                        </div>
                        <Alert className="dialogueSendMessage" variant="success">
                            Sample Send Message
                        </Alert>
                    </div>
                    <div className="block">
                        <div className="dialogueReceiveImage">
                        </div>
                        <Alert className="dialogueReceiveMessage" variant="secondary">
                            Sample Receive Message 2
                        </Alert>
                    </div>
                    <div className="block">
                        <div className="dialogueSendImage">
                        </div>
                        <Alert className="dialogueSendMessage" variant="success">
                            Sample Send Message 2
                        </Alert>
                    </div>
                    <div className="block">
                        <div className="dialogueReceiveImage">
                        </div>
                        <Alert className="dialogueReceiveMessage" variant="secondary">
                            Sample Receive Message 3
                        </Alert>
                    </div>
                    <div className="block">
                        <div className="dialogueSendImage">
                        </div>
                        <Alert className="dialogueSendMessage" variant="success">
                            Sample Send Message 3
                        </Alert>
                    </div>
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