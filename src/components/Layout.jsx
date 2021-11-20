import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import Header from './Header'

import Routes from '../routes/Routes'

const Layout = () => {
    return (
        <BrowserRouter>
            <Route render={props => (
                <div>
                    <Header {...props}/>
                    <div className="container">
                        <div className="main">
                            <Routes/>
                        </div>
                    </div>
                </div>
            )}/>
        </BrowserRouter>
    )
}

export default Layout
