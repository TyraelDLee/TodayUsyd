import React, { Component } from "react";
import './Market.css'
import './../../colour.css'
import Navbar from '../../Navbar'
import Filter from "../../Filter";
import ReactDOM from "react-dom/client";
import Button from 'react-bootstrap/Button';
import Post from './../Post/Post';
import Item from './../SearchItem/Item';
import avatar from './../../avatar.svg';
import axios from 'axios';

class Market extends Component {
    constructor(props){
        super(props);
        this.state = {
            showPost: false,
            post: [],
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8085/Post/getAllPostsByType?type=course').then((response) => {
            console.log(response.data)
        })
        /*fetch('http://localhost:8085/Post/getAllPostsByType?type=course', {
        }).then(
            response => response.json()
        ).then(data => data.object 
        ).then(object => object.map(
            (post) => post.userId)
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
                <Filter/>
                <div className="MarketPost">
                    {this.state.showPost ?
                        <div>
                            <Button variant="outline-dark" onClick={this.onClickCancelPost} className="button">Cancel Post</Button>
                            <Post catrgories={["Rental", "Services", "Book Market", "Cars", "Careers"]} type="market"/>
                        </div> :
                        <Button variant="outline-dark" onClick={this.onClickOpenPost} className="button">Add Post</Button>
                    }
                    <Item userFace={avatar} userName={'Name'} postTitle={'test'} postCat={'ELEC5619'} postBody={'post body'} postLike={'0'}/>
                    <div className="postlist">
                        <div className="singlePost">
                            <div className="profileImage"></div>
                            <div className="profileUserName">Test</div>
                            <div className="profileTitle">Title</div>
                            <div className="profileDate">posted on 2022-10-09</div>
                        </div>
                        <div className="singlePost">
                            <div className="profileImage"></div>
                            <div className="profileUserName">Test</div>
                        </div>

                        <div className="singlePost">
                            <div className="profileImage"></div>
                            <div className="profileUserName">Test</div>
                            <div className="profileDate">posted on 2022-10-09</div>
                        </div>
                        {
                            //post.map((post) => <div className="singlePost"></div>)
                        }
                    </div>
                    <br/><br/><br/><br/>
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