import React, {useState} from "react";
import { useHistory } from "react-router";
import { Modal, Tabs, Tab } from "react-bootstrap";
import { updateProfile } from "@firebase/auth";

import { auth } from "../services/Firebase";
import { funcCreateAuthMailPassword, funcSignAuthMailPassword } from "../utilities/OperAuth";

const Header = () => {
    const url = window.location.pathname.substring(window.location.pathname.indexOf('/') + 1)
    const [modal, setModal] = useState(false)
    const history = useHistory()
    const [input, setInput ] = useState({
        email: '',
        senha: '',
        user: ''
    })

    const handleChange = (e) => {
        setInput( {...input, [e.target.name]: e.target.value} )
    }

    const showModal = () => {
        setModal(!modal)
    }

    const cadastro = (e) => {
        e.preventDefault()
        funcCreateAuthMailPassword(input.email, input.senha)
            .then(() => {
                const user = auth.currentUser
                updateProfile(user, {
                    displayName : input.user
                }).then(() => {
                    alert('Usuário cadastro com sucesso!')
                    history.push(`/${url}`)
                })
            }).catch((error) => alert(`Houve um erro: ${error.message}`))
            .finally(showModal)
    }

    const login = (e) => {
        e.preventDefault()

        funcSignAuthMailPassword(input.email, input.senha)
            .then(() => {
                alert('Usuário logado com sucesso!')
            })
            .catch((error) => alert(`Houve um erro: ${error.message}`))
            .finally(showModal)
    }

    return (
        <header className="bg-dark d-flex justify-content-between align-items-baseline p-3 sticky-top">
            <a href="/" className="h1 text-white m-0 text-decoration-none">Repositório do Conhecimento</a>
            <div className = "d-flex justify-content-between align-items-baseline col-2">
                <a href="/bibliotecas/" className=" btn btn-success col-6 text-white border-0 text-decoration-none">Bibliotecas</a>
                <button onClick={showModal} className="btn btn-success col-5" type="button">Login</button>
            </div>
            <Modal show={modal} onHide={showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Informe seus dados:</Modal.Title>
                </Modal.Header>

                <Tabs defaultActiveKey="SignIn" className="mb-3">
                    <Tab eventKey="SignIn" title="Cadastro">        
                        <Modal.Body  className="d-flex align-items-center justify-content-center ">
                            <form id="cadastro" className="card m-3 p-3" onSubmit={cadastro}>
                                <div className="mb-">
                                    <label htmlFor="user" className="form-floating text-bold">Nome de usuário:</label>
                                    <input type="text" name="user" className="form-control" onChange={handleChange} required autoFocus/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-floating">E-mail:</label>
                                    <input type="email" name="email" className="form-control" onChange={handleChange} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="senha" className="form-floating">Senha:</label>
                                    <input type="password" name="senha" className="form-control" onChange={handleChange} required/>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" onClick={showModal}>Fechar</button>
                            <button type="submit" className="btn btn-primary" form="cadastro">Fazer Cadastro</button>
                        </Modal.Footer>
                    </Tab>

                    <Tab eventKey="Login" title="Entrar">
                        <Modal.Body className="d-flex align-items-center justify-content-center ">
                            <form id="login" className="card m-3 p-3 " onSubmit={login}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-floating">E-mail:</label>
                                    <input type="email" name="email" className="form-control" onChange={handleChange} required autoFocus/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="senha" className="form-floating">Senha:</label>
                                    <input type="password" name="senha" className="form-control" onChange={handleChange} required/>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" onClick={showModal}>Fechar</button>
                            <button type="submit" className="btn btn-primary" form="login">Entrar</button>
                        </Modal.Footer>
                    </Tab>

                </Tabs>
            </Modal>
        </header>
    )

}

export default Header