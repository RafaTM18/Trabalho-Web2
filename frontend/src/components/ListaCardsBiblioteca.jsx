import { Component } from "react";
import "../styles/ListaCard.css"
class ListaCardsBiblioteca extends Component{

    render(){
        return (
            <div className='livros '>
                {this.props.listCards}
            </div>
        )
    }

}

export default ListaCardsBiblioteca