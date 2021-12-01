import { Component, Fragment } from "react";
import { ref, onValue } from "@firebase/database";

import { db, auth } from "../services/Firebase";

import Header from "../components/Header";
import HeaderLogin from "../components/HeaderLogin";
import CardBiblioteca from "../components/CardBiblioteca"
import Footer from "../components/Footer";
import ListaCardsBiblioteca from "../components/ListaCardsBiblioteca";

import "../styles/estilos.css"

const initialState = {
    user: null,
    dictBibliotecas: {},
    listCards: [],
    loading: (<div>Carregando conteúdo...</div>)
}

class Biblioteca extends Component{

    constructor(props){
        super(props)
        this.atualizaBibliotecas = this.atualizaBibliotecas.bind(this)
        this.renderHeader = this.renderHeader.bind(this)
        this.state = {...initialState}
    }

    componentDidMount(){
        this.atualizaBibliotecas()
        
        auth.onAuthStateChanged(usuario => {
            this.setState({user: usuario})
        })
    }
    
    renderHeader(){
        return this.state.user ? <HeaderLogin /> : <Header />
    }

    atualizaBibliotecas(){
        const novoListCards = []
        const novoDictBibliotecas = {}
        const bibliotecas = ref(db, 'bibliotecas/')
        onValue(bibliotecas, (snapshot) => {
            snapshot.forEach(
                (dado) => {
                    novoDictBibliotecas[dado.key] = dado.val()
                    novoListCards.push(<CardBiblioteca key={dado.key} link={dado.key} 
                                                       nome={dado.val().nome} 
                                                       cidade={dado.val().cidade}
                                                       estado={dado.val().estado}
                                                       urlMapa = {dado.val().urlMapa} />)

                }
            )
            this.setState({dictBibliotecas: novoDictBibliotecas})
            this.setState({listCards: novoListCards})
        })
    
    }



    render(){
        return (
            <Fragment>
                {this.renderHeader()}
                <main>
                    <div className="container">
                        <h2 className="text-center my-4">Bibliotecas Parceiras</h2>
                        <hr class="mt-2 mb-3 "/>
                        <ListaCardsBiblioteca listCards={this.state.listCards} />
                    </div>
                </main>
                <Footer />
            </Fragment>
        )
    }

}

export default Biblioteca