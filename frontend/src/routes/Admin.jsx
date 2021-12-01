import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router";

import { auth } from "../services/Firebase";

import Header from "../components/Header";
import HeaderLogin from "../components/HeaderLogin";
import Footer from "../components/Footer";

const Admin = () => {
    const [user, setUser] = useState(null)
    const [redirect, setRedirect] = useState(null)
    const history = useHistory()

    useEffect(() => {
        setRedirect(setTimeout(() => {
            history.push('/')
        }, 5000))

        auth.onAuthStateChanged(newUser => {
            setUser(newUser)
        })

    }, [user, history])

    const renderHeader = () => {
        return user ? <HeaderLogin /> : <Header />
    }

    const renderBody = () => {
        const adminEmails = ['admin@gmail.com','rafaeltmferreira18@gmail.com', 'rafael@gmail.com','lucase8350@gmail.com']
        if (user && adminEmails.includes(user.email)){
            clearTimeout(redirect)
            return (
            <main className="container mt-3">
                <h2>Opções do Admin</h2>
                <div className="card p-3 m-3" style={{width:"80vw"}}>
                    <button onClick={() => {history.push('/admin/add-livro')}} className="btn btn-primary col-12 mb-3" type="button">Adicionar um novo livro</button>
                    <button onClick={() => {history.push('/admin/edit-livro')}} className="btn btn-primary col-12 mb-3" type="button">Editar ou remover um livro</button>
                    <button onClick={() => {history.push('/admin/add-biblio')}} className="btn btn-primary col-12 mb-3" type="button">Adicionar uma nova biblioteca</button>
                    <button onClick={() => {history.push('/admin/edit-biblio')}} className="btn btn-primary col-12 mb-3" type="button">Editar ou remover uma biblioteca</button>
                </div>
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

export default Admin