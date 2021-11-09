import { Component } from "react";

class Header extends Component{

    render(){
        return (
            <header className="bg-dark d-flex justify-content-between align-items-baseline p-3">
                <h1 className="text-white m-0">Repositório do Conhecimento</h1>
                <h2 className="text-white m-0">Não logado</h2>
            </header>
        )
    }

}

export default Header