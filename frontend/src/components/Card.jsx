import { Component } from "react";
import { Link } from "react-router-dom"

import "../styles/card.css"

class Card extends Component{

    render(){
        return (
            <div className="card mb-3 hover-shadow" >
                <div className="row g-0">
                    <div className="col-sm-6">
                        
                            <img src={this.props.urlCapa} className="img-fluid rounded-start" alt={"Capa do livro: " + this.props.titulo} />
                        
                    </div>
                    <div className="col-sm-6">
                        <div className="card-body alinhamento-card">
                            <h5 className="card-title">{this.props.titulo}</h5>
                            <p className="card-text">{this.props.autor}</p>
                            <Link to={'livro/' + this.props.link}>
                                <button className="btn btn-primary" type="button">Ver info</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Card