import { Component } from "react";
import { Switch, Route, Redirect } from 'react-router'

import Inicio from './Inicio'
import InfoLivro from './InfoLivro'

class Router extends Component{

    render(){
        return (
            <Switch>
                <Route exact path="/" component={Inicio} />
                <Route path="/livro" component={InfoLivro} /> 
                
            </Switch>
        )
    }
}

export default Router