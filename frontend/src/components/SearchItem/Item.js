import '../../colour.css'
import './item.css'
import React from "react";

class Item extends React.Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    addLike(){

    }

    minusLike(){

    }

    render() {
        return(
            <div className={'post-item-host'}>
                <div className={'post-item-head'}>
                    <div className={'post-owner'}>
                        <div className={'avatar-image'}><img src={this.props.userFace}/></div>
                        <div className={'avatar-name'}>{this.props.userName}</div>
                    </div>
                    {/*user avatar*/}
                </div>
                <div className={'post-item-body-host'}>
                    <div className={'post-item-title-host'}>
                        <div className={'post-item-title'}>{this.props.postTitle}</div>
                        {/*searched Title*/}
                        <div className={'post-item-cat'}>{this.props.postCat}</div>
                        {/*category*/}
                    </div>
                    <div className={'post-item-body'}>
                        <div className={'post-context'}>
                            {this.props.postBody}
                        </div>
                        {/*result body*/}

                    </div>
                </div>
                <div className={'post-item-like-host'}>
                    <div className={'post-like-add'} onClick={this.addLike}>+</div>
                    <div className={'post-like'}>
                        {this.props.postLike}
                    </div>
                    <div className={'post-like-minus'} onClick={this.minusLike}>-</div>
                    {/*like num*/}
                </div>
            </div>
        )
    }
}

export default Item;