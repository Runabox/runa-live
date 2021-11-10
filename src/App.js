import React from 'react';
import './App.css';

import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

class App extends React.Component {
    render() {
        return(
            <BrowserRouter>
                <div className="app">
                    <Switch>
                        <Route exact path="/">
                            <RunaLivePage />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}  

export default App;