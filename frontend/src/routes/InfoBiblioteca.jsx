import { Component, Fragment } from "react"
import { ref, onValue } from "@firebase/database";

import { db, auth } from "../services/Firebase";

import Header from "../components/Header";
import HeaderLogin from "../components/HeaderLogin";
import Footer from "../components/Footer";
import "../styles/estilos.css"
const initialState = {
    user: null,
    biblioteca: {}
}

class InfoBiblioteca extends Component{

    constructor(props){
        super(props)
        this.getBiblioteca = this.getBiblioteca.bind(this)
        this.state = {...initialState}
    }

    componentDidMount(){        
        auth.onAuthStateChanged(usuario => {
            this.setState({user: usuario})
        })

        this.getBiblioteca(window.location.pathname.split('/')[2])
    }

    renderHeader(){
        return this.state.user ? <HeaderLogin /> : <Header />
    }

    getBiblioteca(id){
        let novaBiblioteca = {}
        const bibliotecas= ref(db, 'bibliotecas/')
        onValue(bibliotecas, (snapshot) => {
            snapshot.forEach(
                (dado) => {
                    if(dado.key === id){
                        novaBiblioteca = dado.val()
                    }
                }
            )
            this.setState({biblioteca: novaBiblioteca})
        })
    }

    render(){
        return(
            <Fragment>
                {this.renderHeader()}
                <main>
                    <h1 className="text-center my-3">{this.state.biblioteca.nome}</h1>
                    <h5 className="text-center my-3"><i>{this.state.biblioteca.tipo}</i></h5>
                    <hr class="mt-2 mb-3 "/>
                    
                    <div className="d-flex align-items-center justify-content-center my-3">
                        <img src= '../files/biblioteca-default.png' alt='Biblioteca'/>
                    </div> 
                    <div className="d-flex align-items-center justify-content-center my-3">                  
                        <a href={"tel:" + this.state.biblioteca.telefone} >
                                <button className="btn btn-primary" type="button">{this.state.biblioteca.telefone}</button>
                        </a>
                    </div>  
                     
    
                    <div className="container">
                        <h3 className="text-center my-3"> Localização</h3>
                        <hr class="mt-2 mb-3 "/>
                        <p> <b> Cidade: </b> <i>{this.state.biblioteca.cidade}</i> <b> Estado: </b> <i>{this.state.biblioteca.estado}</i> </p>
                        <p> <b> Endereço: </b> <i>{this.state.biblioteca.endereco}</i></p>
                        <p> <b> CEP: </b> <i>{this.state.biblioteca.cep}</i></p>
                        <div className="d-flex align-items-center">
                            <iframe title='mapa' src= {this.state.biblioteca.urlMapa} width="80%" height="100%"  allowfullscreen="" loading="lazy"> </iframe>
                        </div>  
                        
                        
                        
                    </div>
                </main>
                <Footer />
            </Fragment>
        )
    }
}

export default InfoBiblioteca