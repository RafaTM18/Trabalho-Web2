import { Component } from "react";
import "../styles/ListaCard.css"
class ListaCards extends Component{

    render(){
        return (
            <div className='livros '>
                {this.props.listCards}
            </div>
        )
    }

}

export default ListaCards
