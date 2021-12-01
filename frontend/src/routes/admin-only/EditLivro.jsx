import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router";

import { auth } from "../../services/Firebase";

import Header from "../../components/Header";
import HeaderLogin from "../../components/HeaderLogin";
import Footer from "../../components/Footer";

const EditLivro = () => {
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
        const adminEmails = ['admin@gmail.com','rafaeltmferreira18@gmail.com', 'rafael@gmail.com']
        if (user && adminEmails.includes(user.email)){
            clearTimeout(redirect)
            return (
            <main className="container mt-3">
                <h2>Editar livros</h2>
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

export default EditLivro