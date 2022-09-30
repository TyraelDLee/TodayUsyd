import React, { Component } from "react";
import './index.css';
import Navbar from './Navbar';
import IndexComponent from "./IndexComponent";

class Home extends Component {
    render() {
      return (
        <div>
            <Navbar />
            <IndexComponent />
        </div>
      );
    }
}


export default Home;