import './colour.css'
import './dynamic.css'
import React from "react";
import Navbar from "./Navbar";
import Item from "./components/SearchItem/Item";
import ReactDOM from "react-dom/client";
import {compare} from "semver";
import avatar from "./avatar.svg";

class Dynamic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dynamic: []
        }
    }

    componentDidMount() {
        let followingID = [];
        fillPosts().then(posts=>{
            this.setState({
                dynamic: posts
            })
        });
        function getFollowing() {
            return fetch(`./Post/findTakeuser?userid=${getCookie('UID')}`, {
                method: 'GET',
                credentials: 'include',
                body: null
            }).then(r => r.json())
                .then(json => {
                    if (json['code'] === 200) {
                        return json['object'];
                    }
                    return [];
                }).catch(e => {
                    return [];
                });
        }

        function getPostById(id) {
            return fetch(`./Post/findPostById?userid=${id}`, {
                method: 'GET',
                credentials: 'include',
                body: null
            }).then(r => r.json())
                .then(json => {
                    if (json['code'] === 200) {
                        return json['object']
                    }
                    return []
                })
                .catch(e => {
                    return []
                })
        }

        async function fillPosts() {
            followingID = await getFollowing();
            //followingID = [1, 9, 21, 14]; test used only
            let posts = [];
            for (const id of followingID) {
                posts.push(await getPostById(id['takeuserid']));
            }
            return posts.reduce((prev, curr) => (prev.concat(curr)), []).sort(compare("createdTime"));
        }

        function compare(time){
            return function(m,n){
                let a = m[new Date(time).getTime()];
                let b = n[new Date(time).getTime()];
                return a - b;
            }
        }

        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
    }

    render() {
        return (
            <main className={'dynamic-body'}>
                <div className={'dynamic-host'}>
                    {
                        this.state.dynamic.length===0?<div>You didn't followed anybody yet.</div>:
                        this.state.dynamic.map((post)=> <Item postId={post['postID']} postTitle={post['title']} postCat={post['category']} postBody={post['details']} postDate={post['createdTime']}></Item>)
                    }
                </div>
            </main>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
root.render(
    <React.StrictMode>
        <Navbar/>
        <Dynamic/>
    </React.StrictMode>
);