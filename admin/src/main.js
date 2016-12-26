import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Login from './routes/Login'
import Logon from './routes/Logon'
import Hello from './components/Hello/Hello.jsx'

import 'antd/dist/antd.css'

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Hello}>
            <IndexRoute component={App}/>
        </Route>
        <Route path="/login" component={Login}/>
        <Route path="/logon" component={Logon}/>
    </Router>
), document.getElementById('root'))
