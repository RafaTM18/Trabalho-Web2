import { Component } from "react";
import { Link } from "react-router-dom"

import "../styles/cardBiblioteca.css"

class CardBiblioteca extends Component{

    render(){
        return (
            <div className="card mb-3 hover-shadow" >
                <div className="row g-0">
                    <div className="col-sm-6 mapa">
                   
                    <iframe title='mapa' src={this.props.urlMapa} width="85%" height="80%"  allowfullscreen="" loading="lazy"></iframe>
                            
                        
                    </div>
                    <div className="col-sm-6">
                        <div className="card-body alinhamento-card">
                        <h5 className="card-title">{this.props.nome}</h5>
                            <p className="card-text"> <i>{this.props.cidade}</i> <br/> {this.props.estado}</p>
                            
                            
                        </div>
                    </div>
                    <div className='btn-info'>
                        <Link to={'biblioteca/' + this.props.link}>
                                    <button className="btn btn-primary" type="button">Mais Informações</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

}

export default CardBiblioteca