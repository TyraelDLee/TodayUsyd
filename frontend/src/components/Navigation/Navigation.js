import React, { Component } from "react";
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Navigation.css'

class Navigation extends Component {
    render() {
      const {search_contents} = this.props;
      return (
        <div className='header'>
                <div className='appName'><Link style={{textDecoration:'none', color: 'black'}} to="/">LOGO</Link></div>
                <FormGroup className="search">
                    <i className="fa fa-search fa-1g"></i>
                    <FormControl type="text" value={search_contents} onChange={this.handleChange} placeholder="Search"/>
                </FormGroup>
          </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
      userName: state.firebase.profile.userName,
      search_contents: state.posts.search_contents,
  }
};

export default Navigation;