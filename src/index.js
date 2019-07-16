import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link } from 'react-router-dom';
import getRouter from 'router/router';
import {Provider, observable, observer} from 'mobx-react'
import userStore from 'stores/userStore'
import VConsole from 'vconsole';
if(TESTING){
    const vconsole = new VConsole();
}

@observer
export default class App extends React.Component {
    render() {
        return (<Router><div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/page1/123">Page1</Link></li>
            </ul>
            
            <div className="content">
            {getRouter()}</div>
        </div></Router>)
    }
}

import './css/index.scss';

if (module.hot) {
    module.hot.accept();
}
const stores = {
    userStore
};
ReactDOM.render(<Provider {...stores}><Router><App/></Router></Provider>,document.getElementById('app'));