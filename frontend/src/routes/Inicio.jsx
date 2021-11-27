import { Component, Fragment } from "react";
import { ref, onValue } from "@firebase/database";

import { db, auth } from "../services/Firebase";

import Header from "../components/Header";
import HeaderLogin from "../components/HeaderLogin";
import Card from "../components/Card";
import Footer from "../components/Footer";
import ListaCards from "../components/ListaCards";

import "../styles/estilos.css"

const initialState = {
    user: null,
    dictLivros: {},
    listCards: [],
    loading: (<div>Carregando conteúdo...</div>)
}

class Inicio extends Component{

    constructor(props){
        super(props)
        this.atualizaLivros = this.atualizaLivros.bind(this)
        this.renderHeader = this.renderHeader.bind(this)
        this.state = {...initialState}
    }

    componentDidMount(){
        this.atualizaLivros()
        
        auth.onAuthStateChanged(usuario => {
            this.setState({user: usuario})
        })
    }
    
    renderHeader(){
        return this.state.user ? <HeaderLogin /> : <Header />
    }

    atualizaLivros(){
        const novoListCards = []
        const novoDictLivros = {}
        const livros = ref(db, 'livros/')
        onValue(livros, (snapshot) => {
            snapshot.forEach(
                (dado) => {
                    novoDictLivros[dado.key] = dado.val()
                    novoListCards.push(<Card key={dado.key} link={dado.key} urlCapa={dado.val().urlCapa} titulo={dado.val().titulo} autor={dado.val().autor}/>)

                }
            )
            this.setState({dictLivros: novoDictLivros})
            this.setState({listCards: novoListCards})
        })
    
    }



    render(){
        return (
            <Fragment>
                {this.renderHeader()}
                <main>
                    <div className="container">
                        <h2 className="text-center my-4">Livros em Destaques</h2>
                        <hr class="mt-2 mb-3 "/>
                        <ListaCards listCards={this.state.listCards} />
                    </div>
                </main>
                <Footer />
            </Fragment>
        )
    }

}

export default Inicio