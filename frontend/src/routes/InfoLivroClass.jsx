import { Component, Fragment } from "react"

import { auth } from "../services/Firebase";
import { getLivro } from "../utilities/OperDB";

import Header from "../components/Header";
import HeaderLogin from "../components/HeaderLogin";
import Footer from "../components/Footer";

const initialState = {
    user: null,
    livro: null,
    loading: (<div>Carregando conteúdo...</div>)
}

class InfoLivroClass extends Component{

    constructor(props){
        super(props)
        this.state = {...initialState}
    }

    componentDidMount(){
        const promiseLivroData = getLivro(window.location.pathname.split('/')[2])
        
        auth.onAuthStateChanged(usuario => {
            this.setState({user: usuario})
        })

        promiseLivroData
            .then((result) => {
                this.setState({livro: result}, () => {
                    console.log(this.state.livro)
                })
            })
    }

    renderHeader(){
        return this.state.user ? <HeaderLogin /> : <Header />
    }

    renderLivro(){
        return (
            <p>
                Título: {this.state.livro.titulo}
                Autor: {this.state.livro.autor}
            </p>
        )
    }

    render(){
        return(
            <Fragment>
                {this.renderHeader()}
                <main>
                    <h1>Livro seila!</h1>
                    <div className="container">
                        {this.state.livro ? this.renderLivro() : this.state.loading}
                    </div>
                </main>
                <Footer />
            </Fragment>
        )
    }
}

export default InfoLivroClass