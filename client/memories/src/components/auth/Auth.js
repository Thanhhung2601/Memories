import React, { useState } from 'react'
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
    TextField,
} from '@material-ui/core'
import LockOutLinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const dispatch = useDispatch()
    const history = useHistory()
    console.log(formData)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignUp) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }
    const handleChange = (e) => {
        console.log('Change')
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const swithMode = () => {
        setIsSignUp(!isSignUp)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({ type: 'AUTH', payload: { result, token } })
            history.push('/')
        } catch (error) {}
    }
    const googleFailur = () => {
        console.log('Sign in wassuccessfull ,try again')
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    onChange={handleChange}
                                    autoFocus
                                    half="true"
                                />
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    onChange={handleChange}
                                    half="true"
                                />
                            </>
                        )}
                        <Input
                            name="email"
                            label="Email Address"
                            onChange={handleChange}
                            type="email"
                            autoFocus
                        />
                        <Input
                            name="password"
                            label="Password"
                            onChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && (
                            <Input
                                name="confirmPassword"
                                label="Repeat Password"
                                onChange={handleChange}
                                type="password"
                            />
                        )}
                    </Grid>
                    <Button fullWidth type="submit" className={classes.submit}>
                        {isSignUp ? 'SignUp' : 'SignIn'}
                    </Button>
                    <GoogleLogin
                        clientId="541495236336-qm7kuo4t0mk32vom12dcouiql7pe704c.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                fullWidth
                                onClick={renderProps.onClick}
                                startIcon={
                                    <svg
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                        }}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                                        />
                                    </svg>
                                }
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailur}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={swithMode}>
                                {isSignUp
                                    ? 'Already have an account ? sign in'
                                    : "Don't have ac account sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
