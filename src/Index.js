import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import { Router, Route, IndexRoute, IndexRedirect, Redirect, browserHistory } from 'react-router';

function initiateWebflow() {

    var $ = require('jquery/src/core');
    require('jquery/src/jquery');
    setTimeout(function () { $(Webflow.ready); }, 1);
}

function reInitiateWebflow() {
    $(Webflow.destroy);
}

/*
const mainPageAppElement = document.getElementById('react_main_page');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App} onEnter={initiateWebflow} onLeave={reInitiateWebflow}/>
       
    </Router>    
    ,mainPageAppElement) ; 
*/

const render = () => {
    const mainPageAppElement = document.getElementById('react_main_page');
    ReactDOM.render(

        <Router history={browserHistory}>
            <Route path="/*" component={App} onEnter={initiateWebflow} onLeave={reInitiateWebflow} />
        </Router>

        , mainPageAppElement
    );
};


render();
