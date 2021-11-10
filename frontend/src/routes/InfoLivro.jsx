import React, {Fragment, useState, useEffect} from "react";

import { auth } from "../services/Firebase";
import { getLivro } from "../utilities/OperDB";

import Header from "../components/Header";
import HeaderLogin from "../components/HeaderLogin";
import Footer from "../components/Footer";

const InfoLivro = () => {
    const [user, setUser] = useState(null)
    const [livro, setLivro] = useState(null)
    const loading = (<div>Carregando conteúdo...</div>)


    useEffect(() => {
        const promiseLivroData = getLivro(window.location.pathname.split('/')[2])
        
        auth.onAuthStateChanged(user => {
            setUser(user);
            if(user)
                user.getIdToken(true)
        })

        promiseLivroData
            .then((result) => {
                setLivro(result)
                console.log(result)
            })
            
    }, [])


    const renderHeader = () => {
        return user ? <HeaderLogin /> : <Header />
    }

    const renderLivro = () => {
        return (
            <p>
                Título: {livro.titulo}
                Autor: {livro.autor}
            </p>
        )
    }

    return (
        
        <Fragment>
            {renderHeader()}
            <main>
                <h1>Livro seila!</h1>
                <div className="container">
                    {livro ? renderLivro() : loading}
                </div>
            </main>
            <Footer />
        </Fragment>
    )


}

export default InfoLivro