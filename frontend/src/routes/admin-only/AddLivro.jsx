import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router";

import { push, ref } from "@firebase/database";
import { getDownloadURL, ref as sRef, uploadBytes } from "@firebase/storage";

import { auth, db, storage } from "../../services/Firebase";

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
        fileFoto.value = ''
        filePDF.value = ''
    }



    const addLivro = (e) => {
        e.preventDefault()  
        const fileFoto = document.getElementById('fotCapa')
        const filePDF = document.getElementById('arqPDF')
              
        if(fileFoto.value && filePDF.value){

            const imgFile = fileFoto.files[0]
            const imgMetadata = { contentType: imgFile.type }
            const imgStorage = sRef(storage, `images/${imgFile.name}`)

            const pdfFile = filePDF.files[0]
            const pdfMetadata = { contentType: pdfFile.type }
            const pdfStorage = sRef(storage, `pdf/${pdfFile.name}`)

            Promise.all([uploadBytes(imgStorage, imgFile, imgMetadata), uploadBytes(pdfStorage, pdfFile, pdfMetadata)])
                .then(() => {
                    Promise.all([getDownloadURL(imgStorage), getDownloadURL(pdfStorage)])
                        .then((resps) => {
                            push(ref(db, 'livros/'), {
                                anoPublicacao: anoPub,
                                autor: author,
                                descricao: desc,
                                edicao: edit,
                                isbn: ISBN,
                                qtdDownloads: 0,
                                qtdPaginas: qtdPag,
                                titulo: title,
                                urlFoto: resps[0],
                                urlPdf: resps[1]
                            })
                                .then(resp => {
                                    alert('Livro adicionado com sucesso!')
                                    cleanInfo()
                                })
                                .catch(erro => {
                                    alert('Houve um erro ao adicionar um novo livro. Mensagem de erro:', erro)
                                })
                        })
                })
                .catch(erro => {
                    alert('Houve um erro ao fazer o upload dos arquivos. Mensagem de erro:', erro)
                })


                
        } else {
            alert('Está faltando um arquivo!')
        }

        
    }

    const renderHeader = () => {
        return user ? <HeaderLogin /> : <Header />
    }

    const buttonDis = () => {
        return (!anoPub || !author || !desc || !edit || !ISBN || !qtdPag || !title)
    }

    const renderBody = () => {
        const adminEmails = ['admin@gmail.com']
        if (user && adminEmails.includes(user.email)){
            clearTimeout(redirect)
            return (
            <main className="container-xl mt-3">
                <h2>Adicionar novo livro</h2>
                <form onSubmit={addLivro} className=" mt-3 p-3">
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
                        <input type="file" name="fotCapa" id="fotCapa" className="form-control" accept="image/*"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="arqPDF" className="form-label">PDF do Livro:</label>
                        <input type="file" name="arqPDF" id="arqPDF" className="form-control" accept="application/pdf"/>
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