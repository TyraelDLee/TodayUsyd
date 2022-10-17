import React, { Component } from "react";
import './Favorite.css'
import Navbar from '../../Navbar'
import ReactDOM from "react-dom/client";
import Cookies from 'js-cookie';
import axios from 'axios';
import Item from "./../SearchItem/Item";
import avatar from './../../avatar.svg';
import { GoThumbsup } from 'react-icons/go';
import { Button } from 'react-bootstrap';

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

    onClickDirectPost(postID){
        window.location.href = `./comment.html?postID=${postID}`;
    }

    handleDeleteFavorite = (favid) => {
        axios.delete(`./Fav/deleteFav?favID=${favid}`)
        .then ((response) => {
            if (response.data.code === 200){
                window.alert("delete successfully");
                window.location.reload(false);
            }
        })
    }

    render() {
        const {favposts} = this.state;
        return(
            <div>
                <Navbar />
                <div className={'favorite-host'}>
                    <div className="topspace"></div>
                    <div className={'results'}>
                        {
                            favposts && favposts.map((post) => {
                                return  <div>
                                            <div onClick={() => this.onClickDirectPost(post.post.postID)} className="single-results">
                                                <div className="FavUserName">{post.post.userName}</div>
                                                <div className="FavTitle">{post.post.title}</div>
                                                <div className="FavLikes">{post.post.numOfLikes}</div>
                                                <GoThumbsup className="FavthumbUp" size={25}/>
                                            </div>
                                            <div className="deletebotton">
                                                <Button className="buttonlocation" size="lg" onClick={() => this.handleDeleteFavorite(post.favID)} variant="outline-dark">Delete This Favorite</Button>
                                            </div>
                                        </div>
                            })
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