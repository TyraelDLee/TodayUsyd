import './colour.css'
import './search.css'
import Navbar from "./Navbar";
import Item from "./components/SearchItem/Item";
import React from "react";
import ReactDOM from "react-dom/client";
import avatar from './avatar.svg';

class Search extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            posts : []
        };
    }

    componentDidMount() {
        fetch(`./Post/findPostByTitle?title=${new URLSearchParams(window.location["search"]).get("keyword")}`, {
            method:"GET",
            credentials:"include",
            body:null
        }).then(r=>r.json())
            .then(json=>{
               if (json['code']===200){
                   if (json['object'].length>0){

                       this.setState({
                           posts: json['object']
                       });
                   }else{
                       document.getElementsByClassName('results')[0].innerHTML += `
                       <div class="no-result">There is no result for <b>${new URLSearchParams(window.location["search"]).get("keyword")}</b></div>`;
                       // no result found here.
                   }
               }
            })
    }

    render() {
        return(
            <main>

                <div className={'search-host'}>
                    <div className={'results'}>
                        {this.state.posts.map((post)=> <Item userFace={avatar} userName={post['userId']} postId={post['postID']} postTitle={post['title']} postCat={post['category']} postBody={post['details']} postLike={post['numOfLikes']}></Item>)}
                    </div>
                </div>
            </main>
        );
    }
}


const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
root.render(
    <React.StrictMode>
        <Navbar/>
        <Search/>
    </React.StrictMode>
);