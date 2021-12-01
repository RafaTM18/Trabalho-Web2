import { Component, Fragment } from "react"
import { ref, onValue } from "@firebase/database";

import { db, auth } from "../services/Firebase";

import Header from "../components/Header";
import HeaderLogin from "../components/HeaderLogin";
import Footer from "../components/Footer";

import "../styles/estilos.css"

const initialState = {
    user: null,
    livro: {}
}

class InfoLivro extends Component{

    constructor(props){
        super(props)
        this.getLivro = this.getLivro.bind(this)
        this.state = {...initialState}
    }

    componentDidMount(){        
        auth.onAuthStateChanged(usuario => {
            this.setState({user: usuario})
        })

        this.getLivro(window.location.pathname.split('/')[2])
    }

    renderHeader(){
        return this.state.user ? <HeaderLogin /> : <Header />
    }

    getLivro(id){
        let novoLivro = {}
        const livros = ref(db, 'livros/')
        onValue(livros, (snapshot) => {
            snapshot.forEach(
                (dado) => {
                    if(dado.key === id){
                        novoLivro = dado.val()
                    }
                }
            )
            this.setState({livro: novoLivro})
        })
    }

    render(){
        return(
            <Fragment>
                {this.renderHeader()}
                <main>
                    <h1 className="text-center my-3">{this.state.livro.titulo}</h1>
                    <h5 className="text-center text-grey"><i className="text-center wt-100">{this.state.livro.autor}</i></h5>
                    <div className="d-flex align-items-center">
                        <img src= {"../" + this.state.livro.urlCapa} className="img-fluid rounded-start"  alt={"Capa do livro: " + this.props.titulo}/>
                    </div>  
                    <div className="d-flex align-items-center justify-content-center my-3">                   
                        <a href={"../" + this.state.livro.urlArquivo} >
                                <button className="btn btn-primary" type="button">Ler Online</button>
                        </a>
                    </div>   
                    <hr class="mt-2 mb-3 "/>
                    <div className="container">
                        <h3>Detalhes </h3>
                        <p> <b> Ano Publicação: </b> <i>{this.state.livro.anoPublicacao}</i></p>
                        <p> <b> Quntidade de páginas: </b> <i>{this.state.livro.qtdPaginas}</i></p>
                        <p> <b> Edição: </b> <i>{this.state.livro.edicao}</i></p>
                        <p> <b> ISBN: </b> <i>{this.state.livro.isbn}</i></p>
                        <h5> <b> Descrição: </b> </h5>
                        
                        <p className="text-justify">{this.state.livro.descricao}</p>
                        
                        
                    </div>
                </main>
                <Footer />
            </Fragment>
        )
    }
}

export default InfoLivro