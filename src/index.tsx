import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Index from './container/Index/index'
import './styles/base.scss'


function AppRouter() {
    return (
        <Router>
            <Route path="/" exact component={Index} />
        </Router>
    )
}

ReactDOM.render(<AppRouter />, document.getElementById('app'))
