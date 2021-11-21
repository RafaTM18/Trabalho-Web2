import { Component, Fragment } from "react"
import { ref, onValue } from "@firebase/database";

import { db, auth } from "../services/Firebase";

import Header from "../components/Header";
import HeaderLogin from "../components/HeaderLogin";
import Footer from "../components/Footer";

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
                    <h1>Livro seila!</h1>
                    <div className="container">
                        <p>{JSON.stringify(this.state.livro)}</p>
                    </div>
                </main>
                <Footer />
            </Fragment>
        )
    }
}

export default InfoLivro