import { Component } from "react";

class ListaCards extends Component{

    render(){
        return (
            <div>
                {this.props.listCards}
            </div>
        )
    }

}

export default ListaCards