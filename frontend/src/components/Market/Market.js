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
            post: [],
        }
    }

    componentDidMount(){
        fetch('http://localhost:8085/Post/getAllPostsByType?type=course', {
        }).then(
            response => response.json()
        ).then(data => data.object 
        )/*.then(object => object.map((post) => post.userId)
        );*/
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
        const { post } = this.state;
        return(
            <div>
                <Navbar />
                <div className="MarketPost">
                    {this.state.showPost ?
                        <div>
                            <Button variant="outline-dark" onClick={this.onClickCancelPost} className="button">Cancel Post</Button>
                            <Post catrgories={["Rental", "Services", "Book Market", "Cars", "Careers"]} type="market"/>
                        </div> :
                        <Button variant="outline-dark" onClick={this.onClickOpenPost} className="button">Add Post</Button>
                    }
                    <div className="postlist">
                        <div className="singlePost">


                        </div>
                        {
                            //post.map((post) => <div className="singlePost"></div>)
                        }
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