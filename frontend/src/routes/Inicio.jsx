import React, {Fragment, useState} from "react";

import Header from "../components/Header";
import HeaderLogin from "../components/HeaderLogin";
import Footer from "../components/Footer";

const Inicio = () => {
    const [usuAuth, setUsuAuth] = useState(false)

    function handleClick(e){
        e.preventDefault()
        setUsuAuth(!usuAuth)
    }

    function renderHeader(){
        return usuAuth ? <HeaderLogin /> : <Header />
    }

    return (
        <Fragment>
            {renderHeader()}
            <button type="button" onClick={(e) => handleClick(e)}>Clica em mim</button>
            <Footer></Footer>
        </Fragment>
    )

}

export default Inicio