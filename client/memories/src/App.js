import React, { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import Posts from './components/posts/Posts'
import Form from './components/form/Form'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from './actions/posts'

const App = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [currentId, setCurrenId] = useState(null)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <Container maxWidth="lg">
            <AppBar
                className={classes.appBar}
                position="static"
                color="inherit"
            >
                <Typography
                    className={classes.heading}
                    variant="h2"
                    align="center"
                >
                    Memories
                </Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="stretch"
                        spacing={3}
                    >
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrenId={setCurrenId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form
                                currentId={currentId}
                                setCurrenId={setCurrenId}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App
