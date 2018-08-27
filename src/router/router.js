import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from '../components/Home.jsx';
import Page1 from '../components/Page1.jsx';

const getRouter = () => (
        <div>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/page1" component={Page1}/>
            </Switch>
        </div>
);
export default getRouter;

