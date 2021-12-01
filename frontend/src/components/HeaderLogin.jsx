import React from "react";
import { FaUserAlt } from "react-icons/fa"

import { auth } from "../services/Firebase"
import { funcSignOut } from "../utilities/OperAuth"

const HeaderLogin = () => {

    const sair = () => {
        funcSignOut()
            .then(() => {
                alert('O usuário foi deslogado!')
            })
            .catch((error) => {
                alert(`Houve um erro: ${error.message}`)
            });
    }

    return (
        <header className="bg-dark d-flex justify-content-between align-items-baseline p-3 sticky-top">
            <a href="/" className="h1 text-light m-0 text-decoration-none">Repositório do Conhecimento</a>
            <div className = "d-flex justify-content-around align-items-baseline col-4">
            <a href="/bibliotecas" className=" btn btn-success col-4 text-white border-0 text-decoration-none">Bibliotecas</a>
                <div className="d-flex align-items-baseline col-7">
                    
                    <p className="text-white text-center me-3 "><FaUserAlt/> {auth.currentUser.displayName}</p>
                    <button type="button" className="btn btn-danger" onClick={sair}>Sair</button>
                </div>
                
            </div>
        </header>
    )


}

export default HeaderLogin