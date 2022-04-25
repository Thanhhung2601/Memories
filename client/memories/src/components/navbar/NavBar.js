import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import useStyles from './styles'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'

const NavBar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('profile'))
    )
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        history.push('/')
        setUser(null)
    }
    console.log('nav bar render')
    useEffect(() => {
        const token = user?.token
        if (token) {
            const decodeToken = decode(token)
            if (decodeToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography
                    className={classes.heading}
                    variant="h2"
                    align="center"
                    component={Link}
                    to="/"
                >
                    Memories
                </Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            src={user.result?.imageUrl}
                        ></Avatar>
                        <Typography className={classes?.userName} variant="h6">
                            {user.result?.name}
                        </Typography>
                        <Button variant="contained" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth">
                        SignIn
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
