import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

if(!haveSessionKey()){
    createSession();
}

function haveSessionKey(){
    let currentUrl = window.location.pathname;
    let uuidRegEx = new RegExp(/\/whiteboard\/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/);
    return uuidRegEx.test(currentUrl);
}

function createSession(){
    window.location.href = process.env.REACT_APP_WHITEBOARD_CREATE_URL;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
