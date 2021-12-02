import { Component } from "react";

class Comment extends Component{
    render(){
        return (
            <div className="card">
                <h4>{this.props.user}</h4>
                <p>
                    {this.props.comment}
                </p>
            </div>
        )
    }
}

export default Comment 