import React, { useState, useEffect } from 'react'
import {
    Container,
    Grow,
    Grid,
    Paper,
    AppBar,
    TextField,
    Button,
} from '@material-ui/core'
import Posts from '../posts/Posts'
import Form from '../form/Form'
import { useDispatch } from 'react-redux'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Paginate from '../Pagination'
import { useHistory, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import { mergeClasses } from '@material-ui/styles'
import useStyles from './styles'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const dispatch = useDispatch()
    const [currentId, setCurrenId] = useState(null)
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const classes = useStyles()
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost()
        }
    }
    console.log('tags ', tags)
    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
            history.push(
                `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(
                    ','
                )}`
            )
        } else {
            history.push('/')
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag])
    }
    const handleDelete = (tagDelete) => {
        setTags(tags.filter((tag) => tag !== tagDelete))
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={3}
                    className={classes.gridContainer}
                >
                    <Grid item xs={12} sm={6} md={8}>
                        <Posts setCurrenId={setCurrenId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppBar
                            className={classes.appBarSearch}
                            position="static"
                            color="inherit"
                        >
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: '10px 0 ' }}
                                value={tags}
                                onAdd={(chip) => handleAdd(chip)}
                                onDelete={(chip) => handleDelete(chip)}
                                label="Search tags"
                                variant="outlined"
                            />
                            <Button
                                onClick={searchPost}
                                className={classes.searchButton}
                            >
                                Search
                            </Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrenId={setCurrenId} />
                        <Paper elevation={6}>
                            <Paginate page={page} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
