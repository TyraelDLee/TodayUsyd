import React, { Component } from "react";
import './Favorite.css'
import Navbar from '../../Navbar'
import ReactDOM from "react-dom/client";
import Cookies from 'js-cookie';
import axios from 'axios';
import Item from "./../SearchItem/Item";
import avatar from './../../avatar.svg';

class Favorite extends Component {
    constructor(props){
        super(props);
        this.state = {
            favposts: null,
        }
    }

    componentDidMount() {
        axios.get(`./Fav/getFav?userid=${Cookies.get('UID')}`)
        .then((response) => {
            if (response.data.code === 200){
                this.setState({
                    favposts: response.data.object,
                });
            }
        })
    }

    render() {
        const {favposts} = this.state;
        console.log(favposts);
        return(
            <div>
                <Navbar />
                <div className={'favorite-host'}>
                    <div className="topspace"></div>
                    <div className={'results'}>
                        {
                            favposts && favposts.map((post)=> 
                                <Item userFace={avatar} userName={post.userName} postId={post.postID} postTitle={post.title} postCat={post.category} postLike={post.numOfLikes} postDate={post.createdTime}>

                                </Item>
                            )
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
        <Favorite/>
    </React.StrictMode>
);

export default Favorite;