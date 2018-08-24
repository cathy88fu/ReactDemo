import React from 'react';
import ReactDOM from 'react-dom';
// import Hello from './components/Hello.jsx';
import {BrowserRouter as Router, Link } from 'react-router-dom';
import getRouter from './router/router';
import {Provider, observable, observer} from 'mobx-react'
import userStore from './stores/userStore'

@observer
export default class App extends React.Component {
    render() {
        return (<div>
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/page1">Page1</Link></li>
            </ul>
            {getRouter()}
        </div>)
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