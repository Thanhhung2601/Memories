import React from 'react'
import Post from './post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'

const Posts = ({ setCurrenId }) => {
    const classes = useStyles()
    const { posts, isLoading } = useSelector((state) => state.posts)
    console.log(posts)
    if (!posts.length && !isLoading) return 'NO POSTS'
    return isLoading ? (
        <CircularProgress />
    ) : (
        <Grid
            className={classes.mainContainer}
            container
            alignItems="stretch"
            spacing={2}
        >
            {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6}>
                    <Post post={post} setCurrenId={setCurrenId} />
                </Grid>
            ))}
        </Grid>
    )
}

export default Posts
