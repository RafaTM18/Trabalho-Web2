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
        <header className="bg-dark d-flex justify-content-between align-items-baseline p-3">
            <h1 className="text-white m-0">Repositório do Conhecimento</h1>
            <div className="d-flex align-items-baseline">
                <p className="text-white me-3"><FaUserAlt/> {auth.currentUser.displayName}</p>
                <button type="button" className="btn btn-danger" onClick={sair}>Sair</button>
            </div>
        </header>
    )


}

export default HeaderLogin