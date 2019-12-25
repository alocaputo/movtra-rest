import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import All from './modules/components/All'
import MoviePage from './modules/components/MoviePage';

ReactDOM.render(
    <Router>
        <div>
            <App />
            <Route exact path="/" component={All} />
            <Route exact path="/all" component={All} />
            <Route exact path="/movie/:tmdb_id" component={MoviePage} />
        </div>
    </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
