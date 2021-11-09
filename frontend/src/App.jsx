import { Component, Fragment } from "react";
import { BrowserRouter } from "react-router-dom"

import Router from "./routes/Router";

class App extends Component{

    render(){
        return (
            <Fragment>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </Fragment>
        )
    }

}

export default App