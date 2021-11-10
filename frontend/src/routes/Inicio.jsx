import React, {Fragment, useState, useEffect} from "react";

import { auth } from "../services/Firebase";
import { getsLivro } from "../utilities/OperDB";

import Header from "../components/Header";
import HeaderLogin from "../components/HeaderLogin";
import Card from "../components/Card";
import Footer from "../components/Footer";

const Inicio = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)
    const [livros, setLivros] = useState(null)

    useEffect(() => {
        const promiseLivroData = getsLivro()

        auth.onAuthStateChanged(user => {
            setUser(user);
            if(user)
                user.getIdToken(true)
        })

        promiseLivroData
            .then(result => setLivros(result))

    }, [])


    const renderHeader = () => {
        return user ? <HeaderLogin /> : <Header />
    }

    const renderListaLivros = () => {
        console.log(livros)
        const listCards = []

        for(const [key, values] of Object.entries(livros)){
            listCards.push(<Card key={key} link={key} urlCapa={values.urlCapa} titulo={values.titulo} autor={values.autor}/>)
        }

        return listCards 
    }

    return (
        <Fragment>
            {renderHeader()}
            <main>
                <h1>Hello World!</h1>
                <div className="container">
                    {livros ? renderListaLivros() : loading}
                </div>
            </main>
            <Footer />
        </Fragment>
    )

}

export default Inicio