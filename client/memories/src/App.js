import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import NavBar from './components/navbar/NavBar'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/home/Home'
import Auth from './components/auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'

const App = () => {
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <NavBar />
                <Switch>
                    <Route
                        path="/"
                        exact
                        component={() => <Redirect to="/posts" />}
                    />
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" component={PostDetails} />
                    <Route path="/auth" exact component={Auth} />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App
