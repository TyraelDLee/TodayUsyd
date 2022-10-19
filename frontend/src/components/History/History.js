import React, { Component } from "react";
import './History.css'
import Navbar from '../../Navbar'
import ReactDOM from "react-dom/client";
import Cookies from 'js-cookie';
import axios from 'axios';

class History extends Component {
    constructor(props){
        super(props);
        this.state = {
            historyposts: null,
        }
    }

    componentDidMount() {
        axios.get(`./userProfile/history/historyList?userid=${Cookies.get('UID')}`)
        .then((response) => {
            if (response.data.code === 200){
                this.setState({
                    historyposts: response.data.object,
                });
            }
        })
    }

    render() {
        const {historyposts} = this.state;
        console.log(historyposts);
        return(
            <div>
                <Navbar />
                <div className={'favorite-host'}>
                    <div className="topspace"></div>
                    <div className={'results'}>
                        {
                            historyposts && historyposts.map((post) => {
                                console.log(post);
                                return  <div className="single-results">
                                            <div className="postname">{post.postsname}</div>
                                            <div className="posttime">posted at {(post.createtime).substr(11)} on {(post.createtime).substr(0, 10)}</div>
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
        <History/>
    </React.StrictMode>
);

export default History;