import { Component } from "react";
import "../styles/comment.css"
class Comment extends Component{
    render(){
        return (
            <div className="comment-card">
                <i><h6>{this.props.user}</h6></i>
                <p className="comment">
                    {this.props.comment}
                </p>
            </div>
        )
    }
}

export default Comment 