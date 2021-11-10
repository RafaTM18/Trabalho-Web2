import React, {Fragment, useState, useEffect} from "react";

import { auth } from "../services/Firebase";

import Header from "../components/Header";
import HeaderLogin from "../components/HeaderLogin";
import Footer from "../components/Footer";

const Inicio = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user);
        })
    }, [])


    const renderHeader = () => {
        return user ? <HeaderLogin /> : <Header />
    }

    return (
        <Fragment>
            {renderHeader()}
            <main>
                <h1>Hello World!</h1>
            </main>
            <Footer />
        </Fragment>
    )

}

export default Inicio