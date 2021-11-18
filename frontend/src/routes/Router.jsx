import { Component } from "react";
import { Switch, Route, Redirect } from 'react-router'

import Inicio from './Inicio'
import InfoLivro from './InfoLivroClass'

class Router extends Component{

    render(){
        return (
            <Switch>
                <Route exact path="/" component={Inicio} />
                <Route path="/livro" component={InfoLivro} /> 
                <Redirect from="*" to="/" />
            </Switch>
        )
    }
}

export default Router