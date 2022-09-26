import React, { Component } from "react";
import './UserProfile.css'
import Navigation from '../Navigation/Navigation';
import {Nav, Image} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

class UserProfile extends Component {
    render() {
      return (
        <div>
          <Navigation/>
          <Nav defaultActiveKey="/" className="flex-column">
          <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link href="/">Friends</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link href="/">Visited History</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link href="/">Setting</Nav.Link>
          </Nav.Item>
          </Nav>
          <div className="profile-block">
            <div className="image-name-discrition-block">
              <Image roundedCircle="true" className="photo-block"/>
              <div className="name-description-block">
                <div className="name">123</div>
                <div className="discrition">456</div>
              </div>
            </div>
            <div className="posts-block">

            </div>
          </div>
        </div>
      );
    }
}

export default UserProfile;