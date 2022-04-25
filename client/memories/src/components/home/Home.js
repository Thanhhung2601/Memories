import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid } from '@material-ui/core'
import Posts from '../posts/Posts'
import Form from '../form/Form'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'

const Home = () => {
    const dispatch = useDispatch()
    const [currentId, setCurrenId] = useState(null)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    return (
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
                        <Form currentId={currentId} setCurrenId={setCurrenId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
