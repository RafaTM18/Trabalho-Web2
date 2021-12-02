import { Component, Fragment } from "react"
import { push, ref, onValue } from "@firebase/database";

import { FaCommentAlt } from "react-icons/fa"

import { db, auth } from "../services/Firebase";

import Comment from "../components/Comment";
import Header from "../components/Header";
import HeaderLogin from "../components/HeaderLogin";
import Footer from "../components/Footer";

import "../styles/estilos.css"

const initialState = {
    user: null,
    livro: {},
    idLivro: null,
    comment: '',
    listComments: []
}

class InfoLivro extends Component{
    
    constructor(props){
        super(props)
        this.getLivro = this.getLivro.bind(this)
        this.addComment = this.addComment.bind(this)
        this.getComments = this.getComments.bind(this)
        this.state = {...initialState, idLivro: window.location.pathname.split('/')[2]}
    }

    componentDidMount(){        
        auth.onAuthStateChanged(usuario => {
            this.setState({user: usuario})
        })

        this.getLivro(this.state.idLivro)
        this.getComments()
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

    addComment(e){
        e.preventDefault()

        push(ref(db, `livros/${this.state.idLivro}/comentarios`), {
            user: auth.currentUser.displayName,
            comment: this.state.comment
          })
            .then(resp => {
              alert('Comentário publicado com sucesso!')
              this.setState({comment: ''})
              this.getComments()
            })
            .catch(error => {
              alert('Houve um erro!')
            })
    }

    getComments(){
        const comments = ref(db, `livros/${this.state.idLivro}/comentarios`)
        const newListComments = []
        const listKeys = []
        onValue(comments, (snapshot) => {
        snapshot.forEach(
            dado => {
            if (!listKeys.includes(dado.key)) {
                newListComments.push(<Comment key={dado.key} user={dado.val().user} comment={dado.val().comment}/>)
            }
            listKeys.push(dado.key)
            }
        )
        this.setState({listComments: newListComments})
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
                    <hr className="mt-2 mb-3 "/>
                    <div className="container">
                        <h3>Detalhes</h3>
                        <p>
                            <b>Ano Publicação: </b> <i>{this.state.livro.anoPublicacao}</i>
                        </p>
                        <p>
                            <b>Quntidade de páginas: </b> <i>{this.state.livro.qtdPaginas}</i>
                        </p>
                        <p>
                            <b>Edição: </b> <i>{this.state.livro.edicao}</i>
                        </p>
                        <p>
                            <b>ISBN: </b> <i>{this.state.livro.isbn}</i>
                        </p>
                        <h5><b> Descrição:</b></h5>
                        
                        <p className="text-justify">{this.state.livro.descricao}</p>
                    </div>

                    <hr className="mt-2 mb-3 "/>

                    <div className="container">
                        <h3>Comentários:</h3>

                        <div className="">
                            {this.state.listComments.length ? this.state.listComments : (auth.currentUser ? 'Seja o primeiro a comentar sobre esse livro!' : <p className="text-danger">É necessário logar para comentar</p>)}
                        </div>
                    </div>

                    <div className="container card p-3 mt-3" style={{width: "50rem"}}>
                        <h3 className="mt-2 mb-4">Adicionar comentário:</h3>
                        <form onSubmit={this.addComment} className="d-flex align-items-center">
                            <input className="col-9 p-2 me-2"type="text" placeholder="Escreva seu comentário" value={this.state.comment} onChange={(e) => this.setState({comment: e.target.value})}/>
                            <button className="col-3 btn btn-primary p-2" disabled={!this.state.comment || !auth.currentUser} type="submit" title="Enviar comentário">
                                <FaCommentAlt />
                            </button>
                        </form>
                    </div>
                </main>
                <Footer />
            </Fragment>
        )
    }
}

export default InfoLivro