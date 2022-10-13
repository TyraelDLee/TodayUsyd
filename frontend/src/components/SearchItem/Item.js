import '../../colour.css'
import './item.css'
import React from "react";

class Item extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    click(postId){
        const a = document.createElement("a");
        a.href = `./comment.html?postID=${postId}`;
        a.target = '_blank';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    render() {
        return(
            <div className={'post-item-host'} postID={this.props.postId} onClick={()=>{
                this.click(this.props.postId);
            }}>
                <div className={'post-item-body-host'}>
                    <div className={'post-item-title-host'}>
                        <div className={'post-item-title'}>{this.props.postTitle}</div>
                        {/*searched Title*/}
                        <div className={'post-item-cat'}>Category: {this.props.postCat} {typeof this.props.postDate==='undefined'?'':' Post Date: '+this.props.postDate}</div>
                        {/*category*/}
                    </div>
                    <div className={'post-item-body'}>
                        <div className={'post-context'}>
                            {this.props.postBody}
                        </div>
                        {/*result body*/}
                    </div>
                </div>
                {
                    !this.props.showLike?
                        <></>
                        :<div className={'post-item-like-host'}>
                            <div className={'post-like-add'} onClick={this.addLike}>+</div>
                            <div className={'post-like'}>
                                {this.props.postLike}
                            </div>
                            <div className={'post-like-minus'} onClick={this.minusLike}>-</div>
                            {/*like num*/}
                        </div>
                }
            </div>
        )
    }
}

export default Item;