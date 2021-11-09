import { Component } from "react";
import { Switch, Route, Redirect } from 'react-router'

import Inicio from './Inicio'

class Router extends Component{

    render(){
        return (
            <Switch>
                <Route exact path="/" component={Inicio} />
                {/* <Route exact path="/livro" component={Livros} />  */}
                <Redirect from="*" to="/" />
            </Switch>
        )
    }
}

export default Router