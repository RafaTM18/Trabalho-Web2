import { Component } from "react";
import { Switch, Route, Redirect } from 'react-router'

import Inicio from './Inicio'
import InfoLivro from './InfoLivro'
import Admin from "./Admin";
import AddLivro from "./admin-only/AddLivro";
import EditLivro from "./admin-only/EditLivro";
class Router extends Component{

    render(){
        return (
            <Switch>
                <Route exact path="/" component={Inicio} />
                <Route path="/livro" component={InfoLivro} /> 
                <Route exact path="/admin" component={Admin} />
                    <Route path="/admin/add-livro" component={AddLivro} />
                    <Route path="/admin/edit-livro" component={EditLivro} />
                <Redirect from="*" to="/" />
            </Switch>
        )
    }
}

export default Router