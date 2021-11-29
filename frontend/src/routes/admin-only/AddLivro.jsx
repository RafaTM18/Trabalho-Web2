import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router";
import { push, ref } from "@firebase/database";

import { auth, db } from "../../services/Firebase";

import Header from "../../components/Header";
import HeaderLogin from "../../components/HeaderLogin";
import Footer from "../../components/Footer";

const AddLivro = () => {
    const [user, setUser] = useState(null)
    const [redirect, setRedirect] = useState(null)
    const history = useHistory()

    const [anoPub, setAnoPub] = useState('')
    const [author, setAuthor] = useState('')
    const [desc, setDesc] = useState('')
    const [edit, setEdit] = useState('')
    const [ISBN, setISBN] = useState('')
    const [qtdPag, setQtdPag] = useState('')
    const [title, setTitle] = useState('')
    const [urlArq, setUrlArq] = useState('')
    const [urlCap, setUrlCap] = useState('')

    useEffect(() => {
        setRedirect(setTimeout(() => {
            history.push('/')
        }, 5000))

        auth.onAuthStateChanged(newUser => {
            setUser(newUser)
        })

    }, [user, history])

    const cleanInfo = () => {
        const fileFoto = document.getElementById('fotCapa')
        const filePDF = document.getElementById('arqPDF')
        setAnoPub('')
        setAuthor('')
        setDesc('')
        setEdit('')
        setISBN('')
        setQtdPag('')
        setTitle('')
        setUrlArq('')
        fileFoto.value = ''
        setUrlCap('')
        filePDF.value = ''
    }

    const addLivro = (e) => {
        e.preventDefault()

        push(ref(db, 'livros/'), {
            anoPublicacao: anoPub,
            autor: author,
            descricao: desc,
            edicao: edit,
            isbn: ISBN,
            qtdDownloads: 0,
            qtdPaginas: qtdPag,
            titulo: title,
            urlArquivo: urlArq,
            urlCapa: urlCap,
        })
            .then(resp => {
                alert('Livro adicionado com sucesso!')
                cleanInfo()
            })
            .catch(erro => {
                alert('Houve um erro ao adicionar um novo livro. Mensagem de erro:', erro)
            })
    }

    const renderHeader = () => {
        return user ? <HeaderLogin /> : <Header />
    }

    const buttonDis = () => {
        const fileFoto = document.getElementById('fotCapa')
        const filePDF = document.getElementById('arqPDF')
        return (!anoPub || !author || !desc || !edit || !ISBN || !qtdPag || !title || !fileFoto.value || !filePDF.value)
    }

    const renderBody = () => {
        const adminEmails = ['admin@gmail.com','rafaeltmferreira18@gmail.com', 'rafael@gmail.com']
        if (user && adminEmails.includes(user.email)){
            clearTimeout(redirect)
            return (
            <main className="container mt-3">
                <h2>Adicionar novo livro</h2>
                <form onSubmit={addLivro} className="card mt-3 p-3">
                    <div className="mb-3">
                        <label htmlFor="titulo" className="form-label">Título: </label>
                        <input value={title} type="text" name="titulo" id="titulo" className="form-control" onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="autor" className="form-label">Autor(es):</label>
                        <input value={author} type="text" name="autor" id="autor" className="form-control" onChange={(e) => setAuthor(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="anoPub" className="form-label">Ano de Publicação:</label>
                        <input value={anoPub} type="number" min="0" name="anoPub" id="anoPub" className="form-control" onChange={(e) => setAnoPub(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descricao" className="form-label">Descrição</label>
                        <input value={desc} type="text" name="descricao" id="descricao" className="form-control" onChange={(e) => setDesc(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="edicao" className="form-label">Edição:</label>
                        <input value={edit} type="text" name="edicao" id="edicao" className="form-control" onChange={(e) => setEdit(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="qtdPag" className="form-label">Quantidade de Páginas:</label>
                        <input value={qtdPag} type="number" min="0" name="qtdPag" id="qtdPag" className="form-control" onChange={(e) => setQtdPag(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="isbn" className="form-label">Código ISBN:</label>
                        <input value={ISBN} type="number" min="0" name="isbn" id="isbn" className="form-control" onChange={(e) => setISBN(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fotCapa" className="form-label">Foto da Capa:</label>
                        <input type="file" name="fotCapa" id="fotCapa" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="arqPDF" className="form-label">PDF do Livro:</label>
                        <input type="file" name="arqPDF" id="arqPDF" className="form-control" />
                    </div>
                    <button disabled={buttonDis()} type="submit" className="btn btn-primary">Adicionar</button>
                </form>
            </main>
            )
        } else {
            return (
                <main className="container mt-3">
                    <h2>Erro 403 - Acesso Proibido</h2>
                    <p>O usuário atual não tem permissão para acessar essa página! Retornando para a página inicial...</p>
                </main>
            )
        }
    }

    return (
        <Fragment>
            {renderHeader()}
            {renderBody()}
            <Footer />
        </Fragment>
    )
}

export default AddLivro