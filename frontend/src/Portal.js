import './navbar.css';
import React from "react";


class Portal extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        if (this.props.type !== 'login')
            window.location.href = this.props.href;
        else {

        }
    }

    render() {
        return (
            <div className="nav-user-portal">
                <a className="user-name popup-item" style={this.props.style === null ? {} : this.props.style}
                   onClick={this.handleClick}>h</a>
                <a className="user-home popup-item" style={{marginTop: "5px"}}>Home</a>
                <a className="user-friends popup-item">Friends</a>
                <a className="user-history popup-item">History</a>
                <a className="user-setting popup-item">Setting</a>
                <a className="user-setting popup-item">Log out</a>
            </div>
        );
    }
}

export default Portal;