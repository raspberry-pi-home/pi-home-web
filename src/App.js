import React, {PureComponent} from 'react';

import logo from './logo.png';
import './App.css';

export default class App extends PureComponent {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Pi Home</h1>
                </header>
                <p className="App-intro">
                    Coming soon...
                </p>
            </div>
        );
    }
}
